import { PrismaClient } from "@prisma/client";
import { getDayAndHour } from "../../../utils/getDayAndHour";
import { getMeal } from "../../../utils/getMeal";
import { Days } from "../../../utils/types";

import { IAddNewReservation, IAddNewUnusualReservation, IMealAndDay, IMealReservationsRepository, ScheduleTable } from "../../IMealReservationsRepository";

const prisma = new PrismaClient();

const DAYS: Days[] = ["mon", "tue", "wed", "thu", "fri"];

export class MealReservationsRepository implements IMealReservationsRepository {
    // useless code
    async initializeDatabase(): Promise<void> { }
    async initializeVegsCounter(props: IMealAndDay): Promise<void> { }


    async addNewReservation({ day, meal, user_id }: IAddNewReservation): Promise<void> {
        // verifica se já existe uma reserva para o usuário no dia e na refeição
        const reservation = await prisma.mealReservation.findFirst({
            where: {
                day, meal, user_id
            }
        })

        if (reservation) {
            // se já existe uma reserva, verifica se ela já está fixa
            if (reservation.will_come && reservation.is_fixed) return

            // se não estiver fixa, atualiza a reserva
            await prisma.mealReservation.update({
                where: {
                    id: reservation.id
                },
                data: {
                    is_fixed: true,
                    will_come: true
                }
            })

            return
        }

        // se não existir uma reserva, cria uma nova
        await prisma.mealReservation.create({
            data: {
                day,
                meal,
                user_id
            }
        })
    }

    async addNewUnusualReservation({ day, meal, user_id, will_come }: IAddNewUnusualReservation): Promise<boolean> {
        const reservation = await prisma.mealReservation.findFirst({
            where: {
                meal, day, user_id
            }
        })

        // se não existir uma reserva, cria uma nova se o usuário for comer
        if (!reservation) {
            if (will_come) {
                await prisma.mealReservation.create({
                    data: {
                        day,
                        meal,
                        user_id,
                        is_fixed: false,
                        will_come: true
                    }
                })
            }
        } else {
            if (will_come === reservation.will_come) return false // se o usuário já tiver feito a reserva, retorna false

            await prisma.mealReservation.update({
                where: {
                    id: reservation.id
                },
                data: {
                    is_fixed: false,
                    will_come
                }
            })
        }

        return true
    }

    async countActiveVegs(props: IMealAndDay): Promise<number | null> // conta quantos vegetarianos irão comer
    {
        // a hora de almoço é de 11:00 às 14:00
        // a hora do jantar é de 17:00 às 20:00
        // se não estiver dentro desses horários, retorna null
        const { day, hour } = getDayAndHour()
        const meal = getMeal(hour)
        // data que a refeição começou (11:00 de hoje ou 17:00 de hoje)
        const meal_start_date = new Date()
        meal_start_date.setHours(meal === "lunch" ? 1 : 17, 0, 0, 0)

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

        return await prisma.$queryRaw`
            SELECT COUNT(*) FROM "MealReservation"
            WHERE "day" = ${day} AND "meal" = ${meal} AND "will_come" = true AND "user_id" NOT IN (
                SELECT "user_id" FROM "MealHistoryElement"
                WHERE "day" = ${day} AND "meal" = ${meal} AND "did_come" = true AND "date" >= ${meal_start_date}
            )
        `
    }

    async checkIfVegWillComeInMeal({ day, meal, user_id }: IAddNewReservation): Promise<boolean | null> // verifica se o veg irá comer
    {
        const reservation = await prisma.mealReservation.findFirst({
            where: {
                day, meal, user_id
            }
        })

        if (!reservation) return null

        return reservation.will_come
    }

    async sendScheduleTableOfVeg(id: string): Promise<ScheduleTable> {
        const schedule_table: ScheduleTable = {} as ScheduleTable
        const user_reservations = await prisma.mealReservation.findMany({
            where: {
                user_id: id
            }
        })

        for (const day of DAYS) {
            schedule_table[day] = {
                lunch: !!user_reservations.find(reservation => reservation.day === day && reservation.meal === "lunch"),
                dinner: !!user_reservations.find(reservation => reservation.day === day && reservation.meal === "dinner")
            }
        }

        return schedule_table
    }

    async saveToHistory(user_id: string, meal: "lunch" | "dinner", day: Days, did_come: boolean): Promise<void> {
        const reservation = await prisma.mealReservation.findFirst({
            where: {
                day, user_id, meal
            }
        })

        if (!reservation) return

        await prisma.mealHistoryElement.create({
            data: {
                day,
                did_come,
                is_fixed: reservation.is_fixed,
                meal,
                respected_the_reservation: reservation.will_come === did_come,
                user_id
            }
        })

        if (!reservation.is_fixed) {
            await prisma.mealReservation.delete({
                where: {
                    id: reservation.id,
                }
            })
        }
    }
}