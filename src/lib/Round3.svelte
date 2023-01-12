<script lang="ts">
    import { onMount } from "svelte";
    import * as utils from "../utils/utils";
    import shuffle from "../utils/shuffle";

    export let states = [];
    export let stateToday;

    const maxFlags = 4;
    let gameState = utils.GameState.PLAYING;
    let choices = getChoices();

    type guess = {
        state: string;
        hit: boolean;
    };
    const ls = localStorage.getItem("flag-guesses");
    let guesses: guess[] = ls ? JSON.parse(ls) : [];

    onMount(() => {
        if (guesses.length == 0) return;
        if (guesses.at(-1)?.hit) {
            gameState = utils.GameState.WON;
        } else if (guesses.length >= maxFlags) {
            gameState = utils.GameState.LOST;
        }
    });

    function getChoices(): typeof stateToday[] {
        const indizes = Array.from(states.keys());
        const solutionIndex = states.indexOf(stateToday);
        indizes.slice(solutionIndex, 1);
        const choices = [solutionIndex];

        const shuffledIndizes = shuffle(indizes);
        for (let i = 0; i < 3; i++) {
            choices.push(shuffledIndizes[i]);
        }

        return choices.map((i) => states[i]);
    }

    function guessFlag(guessedName) {
        if (gameState != utils.GameState.PLAYING) return;
        if (guesses.find((g) => g.state == guessedName)) return;

        let correct = false;
        if (guessedName == stateToday.name) {
            correct = true;
        }

        const g = { state: guessedName, hit: correct };
        guesses = [...guesses, g];
        localStorage.setItem("flag-guesses", JSON.stringify(guesses));

        if (correct) {
            utils.win();
            gameState = utils.GameState.WON;
        } else if (guesses.length >= maxFlags) {
            utils.loose();
            gameState = utils.GameState.LOST;
        }
    }
</script>

<div>
    <div class="flags-wrapper">
        {#each choices as state}
            <button
                class="flag-btn"
                data-state={state.name}
                on:click={(_) => guessFlag(state.name)}
                class:wrong={guesses.find((g) => g.state == state.name)?.hit ==
                    false}
                ><img
                    class="flag"
                    src={`/flags/${state.name}.jpeg`}
                    alt="flag-option"
                /></button
            >
        {/each}
        <div><b>Guess the flag!</b></div>
    </div>
    {#if gameState == utils.GameState.WON}
        <img
            id="result-flag"
            src={`/flags/${stateToday.name}.jpeg`}
            alt="correct-flag"
        />
    {/if}
</div>

<style>
    .flags-wrapper {
        width: 100%;
        margin: 2rem 0 2rem 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 0.5rem;
    }

    .flag-btn {
        position: relative;
        width: 100%;
        height: 100%;
        border: none;
        background: none;
        cursor: pointer;
    }

    .flag {
        position: relative;
        background: gray;
        width: 100%;
    }

    .flag-btn.wrong > img {
        filter: opacity(0.2);
    }

    .flag-btn.wrong::before {
        content: "❌";
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
        font-size: 3rem;
        line-height: 0;
        background: white;
    }

    #result-flag {
        display: block;
        width: 50%;
        margin: auto;
    }
</style>
