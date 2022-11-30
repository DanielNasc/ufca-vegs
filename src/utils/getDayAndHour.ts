import { Days } from "./types";

export function getDayAndHour() {
    const newDate = new Date();
    const hour = newDate.getHours();
    const day = newDate.toLocaleDateString("en", {weekday: "short"}).toLocaleLowerCase() as Days;

    // const pei: Days = "mon"
    return {day, hour};
}
