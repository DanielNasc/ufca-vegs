import { MealReservation } from "../../model/MealReservation";
import { Veg } from "../../model/Veg";
import { getDayAndHour } from "../../utils/getDayAndHour";
import { getMeal } from "../../utils/getMeal";
import { Days } from "../../utils/types";
import { IMealReservationsRepository } from "../IMealReservationsRepository";
import { VegsRepository } from "./VegsRepository";

type Reservation = {
    [k in ("lunch" | "dinner")]:  MealReservation
};

type StupidDatabase = {
    [key in Days]: Reservation
}


const DAYS: Array<Days> = ["mon", "tue", "wed", "thu", "fri"];
const MEALS: Array<"lunch" | "dinner"> = ["lunch", "dinner"];

export class MealReservationsRepository implements IMealReservationsRepository {
    private static INSTANCE: MealReservationsRepository;
    private stupidDatabase: StupidDatabase;
    private vegsRepository: VegsRepository;
    
    protected remainingVegs: number | null;
    protected day: Days | undefined;
    
    constructor() {
        this.vegsRepository = VegsRepository.getInstance()
        this.stupidDatabase = {} as StupidDatabase;
        this.remainingVegs = null;

        for (const day of DAYS) {
            this.stupidDatabase[day] = {} as Reservation
            for (const meal of MEALS) {
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
                for (const meal of MEALS) {
                    veg.scheduleTable[day][meal] && this.stupidDatabase[day][meal].addNewCard(veg.card)
                }
            }
        }   
    }
    
    initializeVegsCounter(): void {
        const { day, hour } = getDayAndHour();
        const meal = getMeal(hour);

        this.remainingVegs = this.stupidDatabase[day][meal].cards.length;
	}

    addNewCard(veg: Veg): void {
        for (const day of DAYS) {
            for (const meal of MEALS) {
                veg.scheduleTable[day][meal] && this.stupidDatabase[day][meal].addNewCard(veg.card)
            }
        }
    }

	clearCounter(): void {
		this.remainingVegs = null;
	}	

	countActiveVegs(): number | null {
		return this.remainingVegs;
	}

	increaseCounter(): void {
		if (this.remainingVegs) {
			this.remainingVegs++;
        }
	}

	decreaseCounter(): void {
		if (this.remainingVegs)
			this.remainingVegs--;
	}
}