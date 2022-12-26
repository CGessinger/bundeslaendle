import confetti from "canvas-confetti";

export enum GameState {
    LOST,
    PLAYING,
    WON,
}

// Parameters have to be in Radians!
export function getBearing(lat1, lon1, lat2, lon2) {
    const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    const theta = Math.atan2(y, x);
    const brng = (theta * 180 / Math.PI + 360) % 360; // in degrees
    return Math.round(brng);
}

// Calculate the score based on the distance
export function calcScore(distance) {
    const maxDistance = 800;
    const minDistance = 0;
    const maxScore = 100;
    const minScore = 0;
    const score = 100 - ((distance - minDistance) * (maxScore - minScore) / (maxDistance - minDistance) + minScore);
    return Math.round(score);
}

// Parameters have to be in Radians!
export function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // metres
    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return Math.round(d);
}

export function degToRad(deg) {
    return deg * (Math.PI / 180)
}

export function win() {
    const canvas = document.getElementById("canvas");
    const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true
    });
    myConfetti({
        particleCount: 150,
        spread: 110,
        origin: { y: 0.65 }
    });
}

export function loose() {
    const main = document.querySelector("main");
    main.classList.add("loose");
}