<script lang="ts">
  let globaltime = 1800;
  let interval = 120;
  let status = false;
  let startStopBtn: HTMLButtonElement;
  let alertSound: HTMLAudioElement;

  setInterval(() => {
    if (status) {
      globaltime -= 1;
    }
  }, 1000);

  function startStop() {
    status = !status;
    startStopBtn.innerText = status ? 'Stop' : 'Start';
  }

  function reset() {
    globaltime = 1800;
    status = false;
    startStopBtn.innerText = 'Start';
  }

  $: globalTimeText = `${
    Math.floor(globaltime / 60) < 10
      ? '0' + Math.floor(globaltime / 60)
      : Math.floor(globaltime / 60)
  }:${globaltime % 60 < 10 ? '0' + (globaltime % 60) : globaltime % 60}`;

  $: intervalSc = globaltime % interval;

  $: intervalText = `${
    Math.floor(intervalSc / 60) < 10
      ? '0' + Math.floor(intervalSc / 60)
      : Math.floor(intervalSc / 60)
  }:${intervalSc % 60 < 10 ? '0' + (intervalSc % 60) : intervalSc % 60}`;

  $: {
    if (globaltime <= 0) {
      globaltime = 0;
      status = false;
      startStopBtn.innerText = 'Start';
    }
  }

  $: {
    if (intervalSc == 1 && status) {
      alertSound.play();
    }
  }
</script>

<main class="container">
  <article>
    <header>
      <hgroup>
        <h1>EggsTimer</h1>
        <p>Simple timer for your eggs</p>
      </hgroup>
    </header>
    <p>Global time remaning: <span>{globalTimeText}</span></p>
    <p>Next call: <span>{intervalText}</span></p>
    <footer>
      <button bind:this={startStopBtn} on:click={startStop}>Start</button>
      <button on:click={reset}>Reset</button>
    </footer>
  </article>

  <article>
    <header>
      <hgroup>
        <h2>Settings</h2>
        <p>Configure your eggs timer</p>
      </hgroup>
    </header>
    <form>
      <label>
        <span>Call every X seconds</span>
        <input
          type="number"
          min="30"
          max="180"
          step="30"
          bind:value={interval}
        />
      </label>
    </form>
  </article>

  <audio bind:this={alertSound} src="./sound.mp3" />
</main>
