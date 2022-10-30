export function getMeal(hour: number) {
    return hour < 14 ? "lunch" : "dinner";
}