<script lang="ts">
    export let guess = undefined;
</script>

<div class="row guess-row">
    {#if guess}
        <div class="name">{guess.city}</div>
        <div class="hit">{guess.hit ? "✅" : "❌"}</div>
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
        grid-column: span 5 / span 5;
    }

    .guess-row > .hit {
        grid-column: span 2 / span 2;
    }
</style>
