<script lang="ts">
  import germanyFlag from "./assets/germany.svg";
  import shuffle from "./utils/shuffle";
  import statesJson from "./assets/bundesländer.json";
  import citiesJson from "./assets/städte.json";

  import Round1 from "./lib/Round1.svelte";
  import Round2 from "./lib/Round2.svelte";
  import Round3 from "./lib/Round3.svelte";

  const date = new Date();
  const seed = date.getMonth() + date.getFullYear() * 100;

  const reset = () => {
    localStorage.clear();
    localStorage.setItem("date", date.toDateString());
    window.location.reload();
  };
  // @ts-ignore
  window.reset = reset;

  // Check if new day
  const oldDate = localStorage.getItem("date");
  const newDate = date.toDateString();
  if (!oldDate || oldDate != newDate) {
    reset();
  }

  const states = shuffle(statesJson.states, seed);
  const stateToday = states[date.getDate() % 16];
  const cities = citiesJson.cities;

  let round = 1;
</script>

<canvas id="canvas" />
<header>
  <img src={germanyFlag} alt="germany-flag" />
  <h1>Bundesl<span style="color: green">ä</span>ndle</h1>
</header>
<main>
  {#if round == 1}
    <Round1 {states} {stateToday} on:next={(_) => (round += 1)} />
  {:else if round == 2}
    <Round2 {cities} {stateToday} on:next={(_) => (round += 1)} />
  {:else}
    <Round3 {states} {stateToday} />
  {/if}
</main>
<footer>
  <p>
    This App is highly inspired but not associated to
    <a rel="noreferrer" target="_blank" href="https://worldle.teuteuf.fr/"
      >Worldle</a
    >
    and
    <a rel="noreferrer" target="_blank" href="https://statele.teuteuf.fr/"
      >Statele</a
    >
  </p>
  <p>
    Created by <a
      rel="noreferrer"
      target="_blank"
      href="https://github.com/CGessinger">Christian Gessinger</a
    >
  </p>
</footer>
