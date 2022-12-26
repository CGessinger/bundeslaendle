<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let options: string[] = [];
    export let placeholder = "";

    function onSubmitGuess(e) {
        const formData = new FormData(e.target);
        const name = formData.get("name").toString();

        e.target.reset();

        if (!options.includes(name)) return;

        dispatch("guess", {
            text: name,
        });
    }

    export function showSearchOptions() {
        const searchOptions = document.getElementById("searchOptions");
        searchOptions.style.display = "inline-block";
    }

    export function hideSearchOptions() {
        const searchOptions = document.getElementById("searchOptions");
        searchOptions.style.display = "none";
    }

    export function filterOptions(e) {
        const text = e.target.value;
        const searchOptions = document.getElementById("searchOptions");
        const options = searchOptions.children;
        for (const _option of options) {
            const option = _option as HTMLLIElement;
            const value = option.dataset.value.toUpperCase();
            if (value.startsWith(text.toUpperCase())) {
                option.style.display = "block";
            } else {
                option.style.display = "none";
            }
        }
    }

    function optionClicked(event) {
        const input = document.getElementById(
            "state-input"
        ) as HTMLInputElement;
        input.value = event.target.dataset.value;
        hideSearchOptions();
    }
</script>

<form
    class="input-form"
    on:submit|preventDefault={onSubmitGuess}
    autocomplete="off"
>
    <ul id="searchOptions">
        {#each options as option}
            <li data-value={option} on:mousedown={optionClicked}>{option}</li>
        {/each}
    </ul>
    <input
        name="name"
        type="text"
        id="state-input"
        {placeholder}
        on:focus={showSearchOptions}
        on:focusout={hideSearchOptions}
        on:input={filterOptions}
    />
    <button class="row" type="submit" id="guess-button"> Guess </button>
</form>

<style>
    .input-form {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    #searchOptions {
        display: none;
        list-style: none;
        padding: 0;
        margin: 0;
        width: 100%;

        position: absolute;
        overflow-y: scroll;
        bottom: 4.75rem;
        max-height: 14rem;
        border-radius: 0.25rem;
    }

    #searchOptions > li {
        padding: 0.25rem;
        background: #111111;
        border: 2px solid white;
        border-radius: 0.25rem;
        line-height: 1.5rem;
        font-weight: lighter;
    }

    #searchOptions > li:hover {
        font-weight: bold;
        cursor: pointer;
    }

    #state-input {
        width: 100%;
        height: 2.125rem;
        padding-left: 10px;
        background: transparent;
        border: 2px solid white;
        border-radius: 0.25rem;
        color: white;
        font-size: large;
    }

    #guess-button {
        height: 2.125rem;
        background: transparent;
        color: white;
        border: 2px solid white;
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: large;
    }

    #guess-button:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    .row {
        width: 100%;
        min-height: 2rem;
        text-align: center;
        border-radius: 0.25rem;
    }
</style>
