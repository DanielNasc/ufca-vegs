import { AppError } from "../../errors/AppError";
import { MealReservationsRepository } from "../../repositories/implementations/in-memory/MealReservationsRepository";
import { VegsRepository } from "../../repositories/implementations/in-memory/VegsRepository";
import { MealProvider } from "../../utils/MealProvider";
import { CreateVegUseCase } from "./CreateVegUseCase";

let createVegUseCase: CreateVegUseCase;
let vegsRepositoryInMemory: VegsRepository;
let mealReservationsRepositoryInMemory: MealReservationsRepository;
let willComeToday: boolean;

describe("CreateVegUseCase", () => {
    beforeEach(() => {
        vegsRepositoryInMemory = new VegsRepository();
        mealReservationsRepositoryInMemory = new MealReservationsRepository();
        createVegUseCase = new CreateVegUseCase(
            vegsRepositoryInMemory,
            mealReservationsRepositoryInMemory
        );
    })

    it("should be able to create a new veg", async () => {
        await createVegUseCase.execute({
            card: 123456,
            name: "John Doe",
            schedule: []
        })

        const veg = await vegsRepositoryInMemory.getById(String(await vegsRepositoryInMemory.getIdByCard(123456)));

        expect(veg).toHaveProperty("id");
    })

    it("should not be able to create a new veg with an already used card", async () => {
        await createVegUseCase.execute({
            card: 123456,
            name: "John Doe",
            schedule: []
        })

        await expect(
            createVegUseCase.execute({
                card: 123456,
                name: "John Doe",
                schedule: []
            })
        ).rejects.toBeInstanceOf(AppError);
    })

    it("should be able to create a new veg with a schedule", async () => {
        await createVegUseCase.execute({
            card: 123456,
            name: "John Doe",
            schedule: [
                {
                    day: "mon",
                    meal: "lunch"
                },
                {
                    day: "tue",
                    meal: "dinner"
                }
            ]
        })

        const schedule = await mealReservationsRepositoryInMemory.sendScheduleTableOfVeg(String(await vegsRepositoryInMemory.getIdByCard(123456)));

        // schedule['mon'].lunch should be true
        expect(schedule['mon'].lunch).toBe(true);
    })

    it("should be able to create a new veg with a schedule and return true if the veg will come today", async () => {
        // mock MealProvider.getInstance().getMeal() to return a meal that is in the schedule
        jest.spyOn(MealProvider.prototype, "getMeal").mockImplementation(
            () => {
                return {
                    day: "mon",
                    meal: "lunch",
                    meal_start_date: new Date("2021-01-01 11:00:00"),
                }
            }
        )

        willComeToday = await createVegUseCase.execute({
            card: 123456,
            name: "John Doe",
            schedule: [
                {
                    day: "mon",
                    meal: "lunch"
                },
            ]})

        expect(willComeToday).toBe(true);

    })

    it("should be able to create a new veg with a schedule and return false if the veg will not come today", async () => {
        // mock MealProvider.getInstance().getMeal() to return a meal that is not in the schedule
        jest.spyOn(MealProvider.prototype, "getMeal").mockImplementation(
            () => {
                return {
                    day: "mon",
                    meal: "dinner",
                    meal_start_date: new Date("2021-01-01 18:00:00"),
                }
            }
        )

        willComeToday = await createVegUseCase.execute({
            card: 123456,
            name: "John Doe",
            schedule: [
                {
                    day: "mon",
                    meal: "lunch"
                },
            ]})

        expect(willComeToday).toBe(false);

    })
})