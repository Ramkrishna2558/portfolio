<script>
  import Words from './Words.svelte';
  import { profile } from '../lib/data.js';
  let musicLoaded = $state(false);
  const links = [
    { name: 'LinkedIn', handle: 'The professional chapter', icon: 'in', url: profile.linkedin, tone: 'linkedin' },
    { name: 'X', handle: '@ramkrishna_more', icon: '𝕏', url: 'https://x.com/ramkrishna_more', tone: 'social-x' },
    { name: 'Instagram', handle: '@the_ramkrishna_more_', icon: '◎', url: 'https://www.instagram.com/the_ramkrishna_more_/', tone: 'instagram' },
    { name: 'Linktree', handle: 'Techstar363 · More of my world', icon: '✳', url: 'https://linktr.ee/Techstar363', tone: 'linktree' },
  ];
</script>

<section class="personal-hub container" id="beyond" aria-labelledby="beyond-title">
  <div class="section-heading"><div><p class="overline">04 / BEYOND THE BUILD</p><h2 id="beyond-title"><Words text="Same Ram."/><br/><Words text="A few more sides."/></h2></div><p>Code, finance, tech.<br/>And everything in between.</p></div>
  <div class="hub-grid">
    <article class="hub-profile hub-tile">
      <img src={profile.photo} alt="Ramkrishna More" width="400" height="400" loading="lazy"/>
      <div><span class="hub-eyebrow">THE HUMAN, TOO</span><h3>Ram, off the clock.</h3><p>Tech enthusiast. Part builder.<br/>Developer by profession.<br/>Curious by default.</p></div>
    </article>
    {#each links as link}
      <a class={`hub-tile hub-social ${link.tone}`} href={link.url} target="_blank" rel="noreferrer"><span class="hub-icon" aria-hidden="true">{link.icon}</span><span class="hub-link-copy"><strong>{link.name}</strong><small>{link.handle}</small></span><span class="hub-arrow" aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>
    {/each}
    <article class="hub-tile hub-music" aria-label="Music: Magic by Coldplay">
      {#if musicLoaded}
        <iframe title="Spotify player: Magic by Coldplay" src="https://open.spotify.com/embed/album/4cCfFozyo6JC8acN8uIP7u?utm_source=generator&theme=0" width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <button class="hub-music-close" onclick={() => musicLoaded = false}>Close player ×</button>
      {:else}
        <div class="music-disc" aria-hidden="true"><span>♪</span></div><div class="music-copy"><span class="hub-eyebrow">ON THE SOUNDTRACK</span><h3>Magic</h3><p>Coldplay</p><button class="music-play" onclick={() => musicLoaded = true}><span aria-hidden="true">▶</span> Load Spotify player</button></div>
      {/if}
      <a class="music-external" href="https://open.spotify.com/album/4cCfFozyo6JC8acN8uIP7u" target="_blank" rel="noreferrer">Open in Spotify ↗</a>
    </article>
    <a class="hub-tile hub-coffee" href="https://buymeacoffee.com/Ram_more" target="_blank" rel="noreferrer"><span class="coffee-cup" aria-hidden="true">☕</span><div><span class="hub-eyebrow">A LITTLE SUPPORT</span><h3>Enjoyed the work?</h3><p>You can buy me a coffee.</p></div><span class="hub-arrow" aria-hidden="true">↗</span></a>
  </div>
</section>
