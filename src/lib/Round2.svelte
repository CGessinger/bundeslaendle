<script lang="ts">
    import { getStateSvg } from "../utils/svg";
    import * as utils from "../utils/utils";
    import InputForm from "./InputForm.svelte";
    import CityGuessRow from "./CityGuessRow.svelte";

    import { onMount, createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let cities = [];
    export let stateToday;
    $: cityToday = stateToday.capital;

    const maxGuesses = 3;
    let gameState = utils.GameState.PLAYING;

    type guess = {
        city: string;
        hit: boolean;
    };
    const ls = localStorage.getItem("city-guesses");
    let guesses: guess[] = ls ? JSON.parse(ls) : [];

    onMount(() => {
        if (guesses.length == 0) return;
        if (guesses.at(-1)?.hit) {
            gameState = utils.GameState.WON;
        } else if (guesses.length >= maxGuesses) {
            gameState = utils.GameState.LOST;
        }
    });

    let svg = getStateSvg(stateToday).outerHTML;

    function guessCity(inputCity: string) {
        if (guesses.find((g) => g.city == inputCity)) return;

        const g = { city: inputCity, hit: inputCity === cityToday };
        guesses = [...guesses, g];
        localStorage.setItem("city-guesses", JSON.stringify(guesses));

        if (g.hit) {
            utils.win();
            gameState = utils.GameState.WON;
        } else if (guesses.length >= maxGuesses) {
            utils.loose();
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
            <CityGuessRow guess={guesses[index]} />
        {/each}
        {#if gameState == utils.GameState.PLAYING}
            <InputForm
                placeholder="Hauptstadt..."
                options={cities}
                on:guess={(e) => guessCity(e.detail.text)}
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
