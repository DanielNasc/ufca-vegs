import { PrismaClient } from "@prisma/client";
import { MealProvider } from "../../../utils/MealProvider";
import { Days } from "../../../utils/types";

import {
  IAddNewReservation,
  IAddNewUnusualReservation,
  IMealReservationsRepository,
  ScheduleTable,
} from "../../IMealReservationsRepository";

const prisma = new PrismaClient();

const DAYS: Days[] = ["mon", "tue", "wed", "thu", "fri"];

export class MealReservationsRepository implements IMealReservationsRepository {
  async addNewReservation({
    day,
    meal,
    user_id,
  }: IAddNewReservation): Promise<void> {
    // verifica se já existe uma reserva para o usuário no dia e na refeição
    const reservation = await prisma.mealReservation.findFirst({
      where: {
        day,
        meal,
        user_id,
      },
    });

    if (reservation) {
      // se já existe uma reserva, verifica se ela já está fixa
      if (reservation.will_come && reservation.is_fixed) return;

      // se não estiver fixa, atualiza a reserva
      await prisma.mealReservation.update({
        where: {
          id: reservation.id,
        },
        data: {
          is_fixed: true,
          will_come: true,
        },
      });

      return;
    }

    // se não existir uma reserva, cria uma nova
    await prisma.mealReservation.create({
      data: {
        day,
        meal,
        user_id,
      },
    });
  }

  async addNewUnusualReservation({
    day,
    meal,
    user_id,
    will_come,
    is_permanent,
  }: IAddNewUnusualReservation): Promise<boolean> {
    const reservation = await prisma.mealReservation.findFirst({
      where: {
        meal,
        day,
        user_id,
      },
    });

    // se não existir uma reserva, cria uma nova se o usuário for comer
    if (!reservation) {
      if (will_come) {
        await prisma.mealReservation.create({
          data: {
            day,
            meal,
            user_id,
            is_fixed: is_permanent,
            will_come: true,
          },
        });
      }
    } else if (is_permanent) {
      // o usuário disse que não vai mais comer naquele dia, então deleta-se qualquer reserva que ele tenha
      if (!will_come) {
        await prisma.mealReservation.delete({
          where: {
            id: reservation.id,
          },
        });
      } else if (!reservation.is_fixed) {
        await prisma.mealReservation.update({
          where: {
            id: reservation.id,
          },
          data: {
            is_fixed: true,
            will_come: true,
          },
        });

        if (reservation.will_come) return false; // não fez alterações em will_come
      } else return false;
    } else {
      if (will_come === reservation.will_come) return false; // se o usuário já tiver feito a reserva, retorna false

      if (reservation.will_come) {
        // will_come = false e reservation.will_come = true
        if (reservation.is_fixed) {
          await prisma.mealReservation.update({
            where: {
              id: reservation.id,
            },
            data: {
              is_fixed: false,
              will_come: false,
            },
          });
        } else {
          await prisma.mealReservation.delete({
            where: {
              id: reservation.id,
            },
          });
        }
      } else {
        // will_come = true e reservation.will_come = false
        await prisma.mealReservation.update({
          where: {
            id: reservation.id,
          },
          data: {
            is_fixed: true,
            will_come: true,
          },
        });
      }
    }

    // só retorna true se o veg não tiver um registro no histórico dessa refeição
    const meal_start_date = new Date();
    meal_start_date.setHours(meal === "lunch" ? 11 : 17, 0, 0, 0);

    return !(await prisma.mealHistoryElement.findFirst({
      where: {
        user_id,
        meal,
        day,
        date: {
          gte: meal_start_date,
        },
      },
    }));
  }

  async countActiveVegs(): Promise<number | null> {
    // conta quantos vegetarianos irão comer
    // a hora de almoço é de 11:00 às 14:00
    // a hora do jantar é de 17:00 às 20:00
    // se não estiver dentro desses horários, retorna null
    const currentMeal = MealProvider.getInstance().getMeal();

    if (!currentMeal) return null;
    const { day, meal, meal_start_date } = currentMeal;

    // if (hour < meal_start_date.getHours() || hour > meal_start_date.getHours() + 3) return null


    // se estiver dentro do horário, conta quantos vegetarianos irão comer
    // não conta os vegetarianos que já comeram (histórico)

    // sorry for that....
    // mas só vai ter 30 usuários mesmo
    // return await prisma.mealReservation.count({
    //     where: {
    //         day,
    //         meal,
    //         will_come: true,
    //         user_id: {
    //             notIn: (await prisma.mealHistoryElement.findMany({
    //                 where: {
    //                     day,
    //                     meal,
    //                     did_come: true,
    //                     date: {
    //                         gte: meal_start_date
    //                     }
    //                 },
    //                 select: {
    //                     user_id: true
    //                 }
    //             })).map(element => element.user_id)
    //         }
    //     }
    // })
    //

    return await prisma.vegetarian.count({
      where: {
        MealReservations: {
          some: {
            day,
            meal,
            will_come: true,
          },
        },
        MealHistory: {
          none: {
            day,
            meal,
            did_come: true,
            date: {
              gt: meal_start_date,
            },
          },
        },
      },
    });

    // const count = await prisma.$queryRaw`
    //     SELECT COUNT(*) FROM "MealReservation"
    //         WHERE day = ${day} AND meal = ${meal} AND will_come = true  AND user_id NOT IN (
    //             SELECT user_id FROM "MealHistoryElement"
    //             WHERE day = ${day}  AND meal = ${meal} AND did_come = true AND "date" >= ${meal_start_date_sql_string}::date
    //         )
    // `  as any

    // return parseInt(count[0].count)
  }

  async checkIfVegWillComeInMeal(props: IAddNewReservation | null): Promise<boolean | null> {
    if (!props) return null;

    const { user_id, day, meal } = props;

    // verifica se o veg irá comer
    const reservation = await prisma.mealReservation.findFirst({
      where: {
        day,
        meal,
        user_id,
      },
    });

    if (!reservation) return null;

    return reservation.will_come;
  }

  async sendScheduleTableOfVeg(id: string): Promise<ScheduleTable> {
    const schedule_table: ScheduleTable = {} as ScheduleTable;
    const user_reservations = await prisma.mealReservation.findMany({
      where: {
        user_id: id,
      },
    });

    for (const day of DAYS) {
      schedule_table[day] = {
        lunch: !!user_reservations.find(
          (reservation) =>
            reservation.day === day &&
            reservation.meal === "lunch" &&
            reservation.will_come
        ),
        dinner: !!user_reservations.find(
          (reservation) =>
            reservation.day === day &&
            reservation.meal === "dinner" &&
            reservation.will_come
        ),
      };
    }

    return schedule_table;
  }

  async saveToHistory(
    user_id: string,
    meal: string,
    day: string,
    did_come: boolean
  ): Promise<void> {
    const reservation = await prisma.mealReservation.findFirst({
      where: {
        day,
        user_id,
        meal,
      },
    });

    if (!reservation) return;

    await prisma.mealHistoryElement.create({
      data: {
        day,
        did_come,
        is_fixed: reservation.is_fixed,
        meal,
        respected_the_reservation: reservation.will_come === did_come,
        user_id,
      },
    });

    if (!reservation.is_fixed) {
      await prisma.mealReservation.delete({
        where: {
          id: reservation.id,
        },
      });
    }
  }

  async incrementAbsences(): Promise<void> {
    const currentMeal = MealProvider.getInstance().getMeal();

    if (!currentMeal) return;
    const { day, meal, meal_start_date } = currentMeal;

    // if (hour < meal_start_date.getHours() || hour > meal_start_date.getHours() + 3)

    await prisma.vegetarian.updateMany({
      data: {
        absences: {
          increment: 1,
        },
      },
      where: {
        MealReservations: {
          some: {
            day,
            meal,
            will_come: true,
          },
        },
        MealHistory: {
          none: {
            day,
            meal,
            did_come: true,
            date: {
              gt: meal_start_date,
            },
          },
        },
      },
    });
  }

  async clearDatabase(): Promise<void> {
    const currentMeal = MealProvider.getInstance().getMeal();

    if (!currentMeal) return;
    const { day, meal } = currentMeal;

    await this.incrementAbsences();

    // joga fora as reservas temporarias da refeição atual que o usuario não fixo disse que iria
    await prisma.mealReservation.deleteMany({
      where: {
        day,
        meal,
        is_fixed: false,
        will_come: true,
      },
    });

    // voltar as reservas canceladas temporariamente para o estado normal (is_fixed = true, will_come = true)
    await prisma.mealReservation.updateMany({
      where: {
        day,
        meal,
        is_fixed: false,
        will_come: false,
      },
      data: {
        is_fixed: true,
        will_come: true,
      },
    });
  }
}
