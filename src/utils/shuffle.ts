const date = new Date();

export const seed = date.getFullYear() * 1000 + date.getMonth() * 10 + Math.floor(date.getDate() / 16);

export default function shuffle<Type>(array: Type[]): Type[] {
    let currentIndex = array.length, temporaryValue, randomIndex;
    let s = seed;
    let random = function () {
        var x = Math.sin(s++) * 10000;
        return x - Math.floor(x);
    };
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
