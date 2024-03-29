import { MealReservation } from "../../../model/MealReservation";
import { MealProvider } from "../../../utils/MealProvider";
import { Days } from "../../../utils/types";
import { IMealHistoryRepository } from "../../IMealHistoryRepository";
// import { Days } from "../../utils/types";
import { IAddNewReservation, IAddNewUnusualReservation, IMealReservationsRepository, ISendScheduleTableOfVeg, ScheduleTable } from "../../IMealReservationsRepository";
import { MealHistoryRepository } from "./MealHistoryRepository";

const DAYS: Array<Days> = ["mon", "tue", "wed", "thu", "fri"];
// const MEALS: Array<"lunch" | "dinner"> = ["lunch", "dinner"];

export class MealReservationsRepository implements IMealReservationsRepository {
  private static INSTANCE: MealReservationsRepository;
  private stupidDatabase: MealReservation[];
  private mealHistoryRepository: IMealHistoryRepository;

  constructor() {
    this.stupidDatabase = [];
    this.mealHistoryRepository = MealHistoryRepository.getInstance();
  }

  public static getInstance() {
    !this.INSTANCE && (() => this.INSTANCE = new MealReservationsRepository())()

    return this.INSTANCE
  }

  async addNewReservation({ day, user_id, meal }: IAddNewReservation): Promise<void> {
    // verifica se já existe uma reserva para o usuário no dia e na refeição
    const reservation = this.stupidDatabase.find(
      reservation => reservation.user_id === user_id && reservation.day === day && reservation.meal === meal
    )

    if (!reservation) {
      const newReservation = new MealReservation({
        user_id,
        meal,
        day,
        is_fixed: true,
        will_come: true
      })

      this.stupidDatabase.push(newReservation)

      return
    }

    if (reservation.will_come && reservation.is_fixed) return

    reservation.will_come = true
    reservation.is_fixed = true
  }

  async addNewUnusualReservation({ user_id, will_come, meal, day }: IAddNewUnusualReservation): Promise<boolean> {
    // verifica se já existe uma reserva para o usuário no dia e na refeição
    const reservation = this.stupidDatabase.find(
      reservation => reservation.user_id === user_id && reservation.day === day && reservation.meal === meal
    )

    if (!reservation) {
      if (will_come) {
        const newReservation = new MealReservation({
          user_id,
          meal,
          day,
          is_fixed: false,
          will_come
        })

        this.stupidDatabase.push(newReservation)
      }
    } else {
      if (will_come === reservation.will_come) return false

      reservation.will_come = will_come
      reservation.is_fixed = false
    }

    return true
  }

  async countActiveVegs(): Promise<number | null> {
    const currentMeal = MealProvider.getInstance().getMeal();

    if (!currentMeal) return null

    const { day, meal, meal_start_date } = currentMeal;

    const reservations = this.stupidDatabase.filter(
      reservation => reservation.day === day && reservation.meal === meal && reservation.will_come
    )

    // historico a partir da data que a refeição começou
    const meal_history = await this.mealHistoryRepository.getHistoryAfterDateByDayAndMeal(
      meal_start_date,
      day,
      meal
    )

    // se a refeição já começou, descartar as reservas que já foram atendidas
    if (meal_history) {
      const meal_history_ids = meal_history.map(reservation => reservation.user_id)

      return reservations.filter(reservation => !meal_history_ids.includes(reservation.user_id)).length
    }

    return reservations.length
  }

  async checkIfVegWillComeInMeal({ day, user_id, meal }: IAddNewReservation): Promise<boolean | null> {
    const reservation = this.stupidDatabase.find(
      reservation => reservation.user_id === user_id && reservation.day === day && reservation.meal === meal
    )

    if (!reservation) return null

    return reservation.will_come
  }

  async sendScheduleTableOfVeg(id: string): Promise<ISendScheduleTableOfVeg> {
    const scheduleTable = {} as ScheduleTable
    const reservations = this.stupidDatabase.filter(reservation => reservation.user_id === id)

    for (const day of DAYS) {
      scheduleTable[day] = {
        lunch: !!reservations.find(reservation => reservation.day === day && reservation.meal === "lunch" && reservation.will_come),
        dinner: !!reservations.find(reservation => reservation.day === day && reservation.meal === "dinner" && reservation.will_come)
      }
    }

    return {} as ISendScheduleTableOfVeg
  }

  async clearDatabase(): Promise<void> {
    const currentMeal = MealProvider.getInstance().getMeal();

    if (!currentMeal) return

    const { day, meal } = currentMeal;

    this.stupidDatabase = this.stupidDatabase
      // joga fora as reservas temporarias da refeição atual que o usuario não fixo disse que iria
      .filter(
        reservation => !(
          reservation.day === day &&
          reservation.meal === meal &&
          !reservation.is_fixed &&
          reservation.will_come
        )
      )
    // voltar as reservas canceladas temporariamente para o estado normal (is_fixed = true, will_come = true)
    this.stupidDatabase = this.stupidDatabase.map(
      reservation => {
        if (
          reservation.day === day &&
          reservation.meal === meal &&
          !reservation.is_fixed &&
          !reservation.will_come
        ) {
          reservation.is_fixed = true
          reservation.will_come = true
        }

        return reservation
      }
    )
  }

  async saveToHistory(id: string, meal: "lunch" | "dinner", day: string, did_come: boolean): Promise<void> {
    const reservation = this.stupidDatabase.find(
      reservation => reservation.user_id === id && reservation.day === day && reservation.meal === meal
    )

    if (!reservation) return

    this.mealHistoryRepository.addNewHistoryElement({
      day,
      meal,
      user_id: id,
      did_come: did_come,
      is_fixed: reservation.is_fixed,
      respected_the_reservation: reservation.will_come === did_come
    })
  }

  async getAllReservations(): Promise<MealReservation[]> {
    return this.stupidDatabase
  }
}
