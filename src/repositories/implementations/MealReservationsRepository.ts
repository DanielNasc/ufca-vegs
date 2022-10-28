import { MealReservation } from "../../model/MealReservation";
import { Days } from "../../utils/types";
import { IMealReservationsRepository } from "../IMealReservationsRepository";
import { VegsRepository } from "./VegsRepository";

type Reservation = {
    [k in ("lunch" | "dinner")]:  MealReservation
};

type StupidDatabase = {
    [key in Days]: Reservation
}


const DAYS: Days[] = ["mon", "tue", "wed", "thu", "fri"];

export class MealReservationsRepository implements IMealReservationsRepository {
    private stupidDatabase: StupidDatabase;
    vegsRepository: VegsRepository;

    private static INSTANCE: MealReservationsRepository;

    
    constructor() {
        this.vegsRepository = VegsRepository.getInstance()
        this.stupidDatabase = {} as StupidDatabase;

        for (const day of DAYS) {
            this.stupidDatabase[day] = {} as Reservation
            for (const meal of ["lunch", "dinner"] as ("lunch" | "dinner")[]) {
                this.stupidDatabase[day][meal] = new MealReservation();
            }
        }
    }

    public static getInstance() {
        !this.INSTANCE && (() => this.INSTANCE = new MealReservationsRepository())()

        return this.INSTANCE
    }

    initializeDatabase(): void {
        const allVegs = this.vegsRepository.listAllVegs()

        for (const veg of allVegs) {
            for (const day of Object.keys(veg.scheduleTable) as Array<keyof (typeof veg.scheduleTable)>) {
                for (const meal of ["lunch", "dinner"] as ("lunch" | "dinner")[]) {
                    veg.scheduleTable[day][meal] && this.stupidDatabase[day][meal].addNewCard(veg.card)
                }
            }
        }

        console.dir(this.stupidDatabase, {depth: null});
        
    }
    
}