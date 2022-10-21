export function getDayAndHour() {
    const newDate = new Date();
    const hour = newDate.getHours();
    const day = newDate.toLocaleDateString("en", {weekday: "short"}).toLocaleLowerCase();

    return {day, hour};
}