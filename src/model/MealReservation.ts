import { v4 as uuidV4 } from "uuid";
import { Days } from "../utils/types";

interface IMealReservationProps {
    user_id: string;
    meal: string;
    day: string;
    is_fixed: boolean;
    will_come: boolean;
}

/*
    Essa classe representa uma reserva de refeição. Ela é responsável por armazenar
    os dados de quem irá comer uma determinada refeição em um determinado dia.

    Dados armazenados:
    * id: identificador único da reserva
    * user_id: identificador do usuário que fez a reserva
    * meal: refeição reservada
    * day: dia reservado
    * is_fixed: se a reserva é fixa ou não
    * will_come: se o usuário irá comer ou não
*/

export class MealReservation {
    readonly id: string;
    public user_id: string;
    public meal: string;
    public day: string;
    public is_fixed: boolean;
    public will_come: boolean;

    constructor(
    {
        user_id,
        meal,
        day,
        is_fixed,
        will_come
    }: IMealReservationProps    
    ) {
        this.id = uuidV4();
        this.user_id = user_id;
        this.meal = meal;
        this.day = day;
        this.is_fixed = is_fixed;
        this.will_come = will_come;
        
    }
}