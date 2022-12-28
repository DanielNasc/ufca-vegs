import { MealReservation } from "../../model/MealReservation";
// import { Days } from "../../utils/types";
import { IAddNewReservation, IAddNewUnusualReservation, IMealAndDay, IMealReservationsRepository } from "../IMealReservationsRepository";

// const DAYS: Array<Days> = ["mon", "tue", "wed", "thu", "fri"];
// const MEALS: Array<"lunch" | "dinner"> = ["lunch", "dinner"];

export class MealReservationsRepository implements IMealReservationsRepository {
    private static INSTANCE: MealReservationsRepository;
    private stupidDatabase: MealReservation[];
    
    constructor() {
        this.stupidDatabase = [];
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

    addNewUnusualReservation({ user_id, will_come, meal, day}: IAddNewUnusualReservation): void {
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
            if (will_come === reservation.will_come) return

            reservation.will_come = will_come
            reservation.is_fixed = false
        }
    }

    countActiveVegs({ day, meal }: IMealAndDay): number | null {
        const reservations = this.stupidDatabase.filter(
            reservation => reservation.day === day && reservation.meal === meal && reservation.will_come
        )

        return reservations.length
    }
}