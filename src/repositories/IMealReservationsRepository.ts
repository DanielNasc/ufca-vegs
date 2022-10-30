import { Veg } from "../model/Veg";
import { Days } from "../utils/types";

export interface IMealReservationsRepository {
    initializeDatabase(): void;
    initializeVegsCounter(): void
    addNewCard(veg: Veg): void;
    clearCounter(): void;
    increaseCounter(): void;
    decreaseCounter(): void;
    countActiveVegs(): number | null; // conta quantos vegetarianos irão comer
}