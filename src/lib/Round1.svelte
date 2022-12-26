<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    import { getStateSvg } from "../utils/svg";
    import * as utils from "../utils/utils";
    import StateGuessRow from "./StateGuessRow.svelte";
    import InputForm from "./InputForm.svelte";
    import { onMount } from "svelte";

    export let states = [];
    export let stateToday;

    const maxGuesses = 6;
    let gameState = utils.GameState.PLAYING;

    type guess = {
        state: any;
        distance: number;
        bearing: number;
        score: number;
    };
    const ls = localStorage.getItem("guesses");
    let guesses: guess[] = ls ? JSON.parse(ls) : [];

    onMount(() => {
        if (guesses.length == 0) return;
        if (guesses.at(-1)?.state == stateToday.name) {
            gameState = utils.GameState.WON;
        } else if (guesses.length >= maxGuesses) {
            gameState = utils.GameState.LOST;
        }
    });

    let svg = getStateSvg(stateToday).outerHTML;

    function evaluateWrongGuess(state): Partial<guess> {
        const wlat = utils.degToRad(state.latitude);
        const wlon = utils.degToRad(state.longitude);
        const rlat = utils.degToRad(stateToday.latitude);
        const rlon = utils.degToRad(stateToday.longitude);

        const distance = utils.getDistance(wlat, wlon, rlat, rlon);
        const bearing = utils.getBearing(wlat, wlon, rlat, rlon);
        const score = utils.calcScore(distance);
        return { distance, bearing, score };
    }

    function guessState(inputName: string) {
        if (guesses.find((g) => g.state == inputName)) return;

        let g: guess = {
            state: inputName,
            distance: 0,
            bearing: 0,
            score: 100,
        };
        if (inputName != stateToday.name) {
            const s = states.find((s) => s.name == inputName);
            g = { ...g, ...evaluateWrongGuess(s) };
        }
        guesses = [...guesses, g];
        localStorage.setItem("guesses", JSON.stringify(guesses));

        if (g.distance === 0) {
            utils.win();
            gameState = utils.GameState.WON;
        } else if (guesses.length >= maxGuesses) {
            gameState = utils.GameState.LOST;
        }
    }

    function nextRound() {
        dispatch("next");
    }
</script>

<div id="round1">
    <div id="bundesland">
        {@html svg}
    </div>
    <div class="rows-wrapper">
        {#each Array(maxGuesses) as _, index (index)}
            <StateGuessRow guess={guesses[index]} />
        {/each}
        {#if gameState == utils.GameState.PLAYING}
            <InputForm
                placeholder="Bundesland..."
                options={states.map((s) => s.name)}
                on:guess={(e) => guessState(e.detail.text)}
            />
        {/if}
    </div>
</div>
{#if gameState == utils.GameState.WON}
    <button id="next-button" on:click={nextRound}>Next Round</button>
{/if}

<style>
    .rows-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    #bundesland {
        width: 50%;
        aspect-ratio: 1;
        margin: 2rem auto 2rem auto;
    }
</style>
