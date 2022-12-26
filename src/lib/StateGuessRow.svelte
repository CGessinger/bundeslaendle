<script lang="ts">
    export let guess = undefined;

    function getBearingEmoji(bearing) {
        if (bearing == 0) {
            return "bi bi-check-square";
        } else if (bearing < 22.5) {
            return "bi bi-arrow-up-square";
        } else if (bearing < 67.5) {
            return "bi bi-arrow-up-right-square";
        } else if (bearing < 112.5) {
            return "bi bi-arrow-right-square";
        } else if (bearing < 157.5) {
            return "bi bi-arrow-down-right-square";
        } else if (bearing < 202.5) {
            return "bi bi-arrow-down-square";
        } else if (bearing < 247.5) {
            return "bi bi-arrow-down-left-square";
        } else if (bearing < 292.5) {
            return "bi bi-arrow-left-square";
        } else if (bearing < 337.5) {
            return "bi bi-arrow-up-left-square";
        } else {
            return "bi bi-arrow-up-square";
        }
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min(
                (timestamp - startTimestamp) / duration,
                1
            );
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
</script>

<div class="row guess-row">
    {#if guess}
        <div class="name">{guess.state}</div>
        <div class="distance">{guess.distance}</div>
        <div class="bearing">
            <i class={getBearingEmoji(guess.bearing)} />
        </div>
        <div class="score">{guess.score}</div>
    {/if}
</div>

<style>
    .guess-row:empty {
        background: gray;
    }

    .guess-row {
        width: 100%;
        min-height: 2rem;
        text-align: center;
        border-radius: 0.25rem;

        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 0.25rem;
    }

    .guess-row > * {
        white-space: nowrap;
        border-radius: 0.25rem;
        border: 2px solid white;
        background: #111111;
        padding: 5px;
    }

    .guess-row > .name {
        grid-column: span 3 / span 3;
    }

    .guess-row > .city-name {
        grid-column: span 5 / span 5;
    }

    .guess-row > .city-hit {
        grid-column: span 2 / span 2;
    }

    .guess-row > .distance {
        grid-column: span 2 / span 2;
    }

    .guess-row > .distance::after {
        content: "km";
    }

    .guess-row > .score::after {
        content: "%";
    }

    .guess-row > .bearing > i::before {
        background: #3c88c3;
        border-radius: 0.15em;
        font-weight: bold;
    }
</style>
