import { MealReservation } from "../../model/MealReservation";
import { getDayAndHour } from "../../utils/getDayAndHour";
import { getMeal } from "../../utils/getMeal";
import { IMealHistoryRepository } from "../IMealHistoryRepository";
// import { Days } from "../../utils/types";
import { IAddNewReservation, IAddNewUnusualReservation, IMealAndDay, IMealReservationsRepository } from "../IMealReservationsRepository";
import { MealHistoryRepository } from "./MealHistoryRepository";

// const DAYS: Array<Days> = ["mon", "tue", "wed", "thu", "fri"];
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

    initializeDatabase(): void {
    }
    
    initializeVegsCounter({ day, meal }: IMealAndDay): void {
	}

    addNewReservation({ day, id, meal } : IAddNewReservation): void {
        // verifica se já existe uma reserva para o usuário no dia e na refeição
        const reservation = this.stupidDatabase.find(
            reservation => reservation.user_id === id && reservation.day === day && reservation.meal === meal
        )

        if (!reservation) {
            const newReservation = new MealReservation({
                user_id: id,
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

    addNewUnusualReservation({ user_id, will_come, meal, day}: IAddNewUnusualReservation): boolean {
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

    countActiveVegs(): number | null {
        // a hora de almoço é de 11:00 às 14:00
        // a hora do jantar é de 17:00 às 20:00
        // se não estiver dentro desses horários, retorna null
        const { day, hour } = getDayAndHour()
        const meal = getMeal(hour)
        // data que a refeição começou (11:00 de hoje ou 17:00 de hoje)
        const meal_start_date = new Date()
        meal_start_date.setHours(meal === "lunch" ? 11 : 17, 0, 0, 0)

        if (hour < meal_start_date.getHours() || hour > meal_start_date.getHours() + 3) return null

        const reservations = this.stupidDatabase.filter(
            reservation => reservation.day === day && reservation.meal === meal && reservation.will_come
        )

        // historico a partir da data que a refeição começou
        const meal_history = this.mealHistoryRepository.getHistoryAfterDateByDayAndMeal(
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

    checkIfVegWillComeInMeal({ day, id, meal }: IAddNewReservation): boolean | null {
        const reservation = this.stupidDatabase.find(
            reservation => reservation.user_id === id && reservation.day === day && reservation.meal === meal
        )

        if (!reservation) return null

        return reservation.will_come
    }
}