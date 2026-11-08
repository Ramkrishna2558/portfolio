<script>
  let { text } = $props();
</script>

<span class="scroll-words" aria-label={text}
  >{#each text.split(" ") as word, i}<span class="word-space" aria-hidden="true"
      ><span
        class="depth-word"
        style={`--word-index:${i};--word-count:${text.split(" ").length}`}
        >{word}</span
      ></span
    >{/each}</span
>
