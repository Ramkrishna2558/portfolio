<script>
  import { onMount } from 'svelte';
  let dark = $state(false);
  let reader = $state(false);
  function apply() {
    document.documentElement.classList.toggle('dark-theme', dark);
    document.documentElement.classList.toggle('reader-mode', reader);
    document.dispatchEvent(new Event('viewchange'));
    try { localStorage.setItem('portfolio-view', JSON.stringify({ dark, reader })); } catch {}
  }
  onMount(() => {
    dark = matchMedia('(prefers-color-scheme: dark)').matches;
    try { const saved = JSON.parse(localStorage.getItem('portfolio-view')); if (saved) { dark = !!saved.dark; reader = !!saved.reader; } } catch {}
    apply();
  });
</script>

<div class="view-controls" aria-label="Display preferences">
  <button aria-pressed={dark} onclick={() => { dark = !dark; apply(); }} title="Switch color theme"><span aria-hidden="true">{dark ? '☀' : '☾'}</span>{dark ? 'Light' : 'Dark'}</button>
  <button aria-pressed={reader} onclick={() => { reader = !reader; apply(); }} title="Larger text, less motion and a simpler reading layout"><span aria-hidden="true">Aa</span>Reader</button>
</div>
