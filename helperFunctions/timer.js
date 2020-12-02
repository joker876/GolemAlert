export default function makeTimer(seconds, charsFromStart, amountOfChars) {
    return new Date(seconds * 1000).toISOString().substr(charsFromStart ?? 14, amountOfChars ?? 5);
}