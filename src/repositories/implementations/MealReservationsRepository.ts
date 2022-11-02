import { VegsRepository } from "./VegsRepository";
import { MealReservation } from "../../model/MealReservation";
import { Veg } from "../../model/Veg";
import { Days } from "../../utils/types";
import { IMealAndDay, IMealReservationsRepository } from "../IMealReservationsRepository";

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
            // podia ser só for ( const day of DAYS ) mas assim fica mo bonitão kkkkkk
            // ( quando eu a versão final tiver pronta eu boto esse )
            for (const day of Object.keys(veg.scheduleTable) as Array<keyof (typeof veg.scheduleTable)>) {
                for (const meal of MEALS) {
                    veg.scheduleTable[day][meal] && this.stupidDatabase[day][meal].addNewCard(veg.card)
                }
            }
        }
    }
    
    initializeVegsCounter({ day, meal }: IMealAndDay): void {
        this.stupidDatabase[day][meal].initializeWillComeToday();
        this.remainingVegs = this.stupidDatabase[day][meal].willComeToday.length;
	}

    addNewCard(veg: Veg): void {
        for (const day of DAYS) {
            for (const meal of MEALS) {
                // se o usuário tiver feito uma reserva para esse dia, seu cartão é adicionado à lista fixa do dia
                veg.scheduleTable[day][meal] && this.stupidDatabase[day][meal].addNewCard(veg.card)
            }
        }
    }

	reset({day, meal}: IMealAndDay): void {
		this.remainingVegs = null;
        this.stupidDatabase[day][meal].reset()
	}	

	countActiveVegs(): number | null {
		return this.remainingVegs;
	}

	increaseCounter(): void {
		if (this.remainingVegs) {
			this.remainingVegs++;
        }
	}

	decreaseCounter(card: number, { day, meal }: IMealAndDay): boolean {
		if (!(this.remainingVegs && this.stupidDatabase[day][meal].removeOne(card))) {
			return false
        }

        this.remainingVegs--;
        
        return true
	}
}