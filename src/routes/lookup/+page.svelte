<script>
  import { onMount } from 'svelte';
  import cjMap from '../../cjMap';
  import Card from '../../components/Card.svelte';

  let inputText = '';
  let cangjieChars;
  let isClient = false;

  // 生成英文拼写字符串
  const enString = (zhString) => zhString.split('')
    .map((char) => cangjieChars[char]?.toUpperCase() || '?')
    .join(' ');

  // 生成仓颉字符串
  const cjString = (string) => string.toUpperCase().split('')
    .map((char) => cjMap[char] || char)
    .join('');

  // 加载仓颉字典
  onMount(async () => {
    isClient = true;
    const response = await fetch('/data/all_chars.json');
    cangjieChars = await response.json();
  });

  // 处理输入变化
  const handleInput = (event) => {
    inputText = event.target.value;
  };

  // 生成结果列表
  $: results = inputText ? inputText.split('').map(char => ({
    char,
    en: cangjieChars?.[char]?.toUpperCase() || '?',
    cj: cjString(cangjieChars?.[char] || '?')
  })) : [];
</script>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  .input-area {
    margin-bottom: 20px;
  }

  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    font-size: 18px;
    border: 2px solid #333;
    border-radius: 4px;
    resize: vertical;
  }

  .results {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-start;
  }

  .char-card {
    background: white;
    border: 2px solid #333;
    padding: 15px;
    border-radius: 4px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 20px;
    align-items: center;
    width: calc(33.33% - 7px);
    min-width: 180px;
    flex: 1 1 auto;
    max-width: calc(33.33% - 7px);
    box-sizing: border-box;
  }

  .chinese-char {
    font-size: 48px;
    font-weight: 100;
  }

  .spelling {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .en-spelling {
    font-family: monospace;
    font-size: 18px;
    color: #666;
  }

  .cj-spelling {
    font-size: 24px;
    color: #333;
  }

  h1 {
    margin-bottom: 20px;
    font-weight: 100;
    font-size: 32px;
  }

  .placeholder {
    text-align: center;
    color: #666;
    font-size: 18px;
    margin-top: 40px;
  }

  @media (max-width: 600px) {
    .char-card {
      width: calc(50% - 5px);
      max-width: calc(50% - 5px);
    }
  }

  @media (max-width: 400px) {
    .char-card {
      width: 100%;
      max-width: 100%;
    }
  }
</style>

<svelte:head>
  <title>倉頡拼寫查詢</title>
  <meta name="title" content="倉頡拼寫查詢">
  <meta property="og:title" content="倉頡拼寫查詢">
  <meta name="twitter:title" content="倉頡拼寫查詢" />
</svelte:head>

<div class="container">
  <h1>倉頡拼寫查詢</h1>
  
  <div class="input-area">
    <textarea 
      placeholder="請輸入要查詢的文字..."
      value={inputText}
      on:input={handleInput}
    ></textarea>
  </div>

  {#if results.length > 0}
    <div class="results">
      {#each results as { char, en, cj }}
        <div class="char-card">
          <div class="chinese-char">{char}</div>
          <div class="spelling">
            <div class="en-spelling">{en}</div>
            <div class="cj-spelling">{cj}</div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="placeholder">
      在上方輸入文字以查詢倉頡拼寫方式
    </div>
  {/if}
</div> 