<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  import cjMap from '../cjMap';
  import Card from '../components/Card.svelte';
  import SettingsIcon from '../components/svg/SettingsIcon.svelte';

  // Boolean for whether we are on the client (we only want to load data on the client)
  let isClient = false;

  // Current practice level
  let currentLevel = '1';

  // Current vocab index
  let currentVocab = 0;

  // The current input string
  let inputValue = '';

  // The current set of characters, shuffled into a random order
  let currentLevelList;

  // The variable that will contain chinese words mapped to their cangjie characters (en)
  // after loaded
  let cangjieChars;

  // Checkboxes for showing or hiding the en / cj hints
  let showEn = false;
  let showCj = true;
  let randomOrder = true;

  // Show the settings dialog
  let showSettings = false;

  // 添加显示模式选项
  let displayMode = 'traditional'; // 'traditional', 'simplified', 'mixed'

  // 根据显示模式获取要显示的文字
  const getDisplayText = (item) => {
    if (displayMode === 'traditional') return item.Traditional;
    if (displayMode === 'simplified') return item.Simplified;
    // mixed 模式随机选择繁体或简体
    return Math.random() > 0.5 ? item.Traditional : item.Simplified;
  };

  // Sets the shuffled list in the local variable
  const setLevelList = (list) => {
    currentVocab = 0;
    currentLevelList = randomOrder ? d3.shuffle(JSON.parse(JSON.stringify(list))) : list;
    return currentLevelList;
  }

  // Generates the en string given a chinese character or phrase
  const enString = (zhString) => zhString.split('')
    .map((char) => cangjieChars[char].toUpperCase())
    .join(' ');

  // Generates the cj string given the en characters
  const cjString = (string) => string.toUpperCase().split('')
    .map((char) => cjMap[char] || char)
    .join('');

  // Sets the local cangjie dictionary
  const setCangjieChars = (chars) => {
    cangjieChars = chars;
    return '';
  }

  // Load the cangjie dictionary on client
  $: cangjieCharsPromise = isClient && d3.json('data/all_chars.json');

  // Load the current level list
  $: currentLevelListPromise = isClient && d3.csv(`data/mandarin-${currentLevel}000.csv`);

  // If we change levels, set the current vocab index to 0
  $: { if (currentLevel) currentVocab = 0 }

  // When input is updated, we want to check if the word is complete
  $: {
    if (
      // First check if we've loaded a level
      currentLevelList
        // Check if the text is right
        && (inputValue === cjString(enString(currentLevelList[currentVocab].Traditional)))
    ) {
      // Go to the next vocab word
      currentVocab += 1;
      // Go back to 0 index if we've seen them all
      currentVocab %= currentLevelList.length;
      // reset input value
      inputValue = '';
    }
  }

  onMount(() => {
    isClient = true;
  });

  const inputCallback = (input) => { inputValue = cjString(input) };
</script>

<style>
  .controls {
    font-size: 12px;
    position: absolute;
    background-color: #fff7f4;
    padding: 5px 10px;
    border: 2px solid black;
    right: -65px;
    top: 40px;
    z-index: 1;
  }

  h1 {
    margin: 0;
    font-size: 72px;
    font-weight: 100;
  }

  p {
    margin: 0;
    font-weight: 400;
  }

  .cj-zh {
    word-spacing: 10px;
  }

  .cj-en {
    letter-spacing: 2px;
    word-spacing: 10px;
  }

  .settingsButton {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 20px;
    cursor: pointer;
  }

  .option {
    margin: 5px 0;
  }

  .next, .prev {
    position: absolute;
    top: 40%;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    font-size: 32px;
    padding: 0 10px;
  }

  .prev:disabled {
    color: #AAA;
  }

  .next {
    right: 0;
  }

  .prev {
    left: 0;
  }

  .keyboard-hint {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.1);
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    color: #666;
    pointer-events: none;
    user-select: none;
  }

  .keyboard-hint kbd {
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 2px 6px;
    margin: 0 2px;
    font-family: monospace;
  }

  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .radio-option {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .settings {
    position: fixed;
    top: 80px;
    right: 20px;
    background-color: #fff7f4;
    padding: 15px 20px;
    border: 2px solid black;
    border-radius: 4px;
    font-size: 14px;
    z-index: 1;
  }

  .settings-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    color: #333;
  }

  .option {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  .option:last-child {
    margin-bottom: 0;
  }

  .option label {
    margin-right: 10px;
    min-width: 70px;
  }

  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .radio-option {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  select {
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 14px;
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
  }

  input[type="radio"] {
    width: 16px;
    height: 16px;
  }
</style>

<svelte:head>
  <title>倉頡練習</title>
  <meta name="title" content="倉頡練習">
  <meta property="og:title" content="倉頡練習">
  <meta name="twitter:title" content="倉頡練習" />
  <meta property="og:url" content="https://www.oiargrmbc.com/" />
</svelte:head>

<svelte:window
  on:click={() => { showSettings = false }}
  on:keydown={(evt) => {
    // 只有在按住 Shift 键时才切换词
    if (evt.shiftKey) {
      if (evt.key === 'ArrowRight') {
        currentVocab += 1;
        currentVocab %= currentLevelList.length;
      }
      if (evt.key === 'ArrowLeft' && currentVocab > 0) {
        currentVocab -= 1;
      }
    }
  }}
/>

<Card inputTextCallback={inputCallback} inputText={inputValue} color="#9c88ff">
  <div class="wrap">
    <div class="settings">
      <div class="settings-title">設置</div>
      <div class="option">
        <label for="level">程度</label>
        <select name="level" id="level" bind:value={currentLevel}>
          {#each [...Array(10).keys()] as level}
            <option value={level + 1}>{level + 1}</option>
          {/each}
        </select>
      </div>

      <div class="option">
        <label for="en">英文字幕</label>
        <input id="en" type="checkbox" bind:checked={showEn} />
      </div>

      <div class="option">
        <label for="cj">中文字幕</label>
        <input id="cj" type="checkbox" bind:checked={showCj} />
      </div>

      <div class="option">
        <label for="order">隨機順序</label>
        <input id="order" type="checkbox" bind:checked={randomOrder} />
      </div>

      <div class="option">
        <label>顯示模式</label>
        <div class="radio-group">
          <div class="radio-option">
            <input 
              type="radio" 
              id="traditional" 
              name="displayMode" 
              value="traditional"
              bind:group={displayMode}
            >
            <label for="traditional">繁體</label>
          </div>
          <div class="radio-option">
            <input 
              type="radio" 
              id="simplified" 
              name="displayMode" 
              value="simplified"
              bind:group={displayMode}
            >
            <label for="simplified">簡體</label>
          </div>
          <div class="radio-option">
            <input 
              type="radio" 
              id="mixed" 
              name="displayMode" 
              value="mixed"
              bind:group={displayMode}
            >
            <label for="mixed">混合</label>
          </div>
        </div>
      </div>
    </div>

    {#await Promise.all([cangjieCharsPromise, currentLevelListPromise])}
      <h1>...</h1>
    {:then [chars, levelist]}
      {setCangjieChars(chars)}
      {#await Promise.resolve(setLevelList(levelist, randomOrder)) then list}
        <h1>{getDisplayText(list[currentVocab])}</h1>
        {#if showCj}
          <p class="cj-zh">
            {cjString(enString(list[currentVocab].Traditional))}
          </p>
        {/if}
        {#if showEn}
          <p class="cj-en">
            {enString(list[currentVocab].Traditional)}
          </p>
        {/if}
        <button
          class="prev"
          disabled={currentVocab === 0}
          on:click={() => { if (currentVocab > 0) currentVocab -= 1 }}
        >ᐸ</button>
        <button
          class="next"
          on:click={() => {
            currentVocab += 1;
            currentVocab %= currentLevelList.length;
          }}
        >ᐳ</button>
      {/await}
    {/await}
  </div>
</Card>

<div class="keyboard-hint">
  按 <kbd>Shift</kbd> + <kbd>←</kbd> / <kbd>→</kbd> 切換詞語
</div> 