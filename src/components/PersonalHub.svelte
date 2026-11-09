<script>
  import Words from './Words.svelte';
  import { profile } from '../lib/data.js';
  let musicLoaded = $state(false);
  let selectedTrack = $state(0);
  const tracks = [
    { name: 'Mad World', artist: 'Riverdale Cast · KJ Apa, Camila Mendes & Lili Reinhart', type: 'track', id: '1Q2z1qC6C0Db6nDFkwr9wd' },
    { name: 'Magic', artist: 'Coldplay', type: 'album', id: '4cCfFozyo6JC8acN8uIP7u' },
  ];
  let track = $derived(tracks[selectedTrack]);
  const links = [
    { name: 'LinkedIn', handle: 'Ramkrishna More', bio: 'Product engineering. A forward-deployed mindset.', icon: 'in', url: profile.linkedin, tone: 'linkedin', action: 'View my profile', stat: 'Explore my professional network' },
    { name: 'X', handle: '@ramkrishna_more', bio: 'Code, finance, tech. Views are my own.', icon: '𝕏', url: 'https://x.com/ramkrishna_more', tone: 'social-x', action: 'Follow on X', stat: '225 followers', snapshot: true },
    { name: 'Instagram', handle: '@the_ramkrishna_more_', bio: 'A little more life beyond the code.', icon: '◎', url: 'https://www.instagram.com/the_ramkrishna_more_/', tone: 'instagram', action: 'View on Instagram', stat: '302 followers', snapshot: true },
    { name: 'Linktree', handle: 'Techstar363', bio: 'The rest of my corner of the internet.', icon: '✳', url: 'https://linktr.ee/Techstar363', tone: 'linktree', action: 'Explore my links', stat: 'All my links, together' },
  ];
</script>

<section class="personal-hub container" id="beyond" aria-labelledby="beyond-title">
  <div class="section-heading"><div><p class="overline">04 / BEYOND THE BUILD</p><h2 id="beyond-title"><Words text="Me."/><br/><Words text="A few more sides."/></h2></div><p>Code, finance, tech.<br/>And everything in between.</p></div>
  <div class="hub-grid">
    <article class="hub-profile hub-tile">
      <img src={profile.photo} alt="Ramkrishna More" width="400" height="400" loading="lazy"/>
      <div><span class="hub-eyebrow">THE HUMAN, TOO</span><h3>Me, off the clock.</h3><p>Tech enthusiast. Part builder.<br/>Developer by profession.<br/>Curious by default.</p></div>
    </article>
    {#each links as link}
      <a class={`hub-tile hub-social ${link.tone}`} href={link.url} target="_blank" rel="noreferrer" aria-label={`${link.name}: ${link.handle}. ${link.stat}.${link.snapshot ? ' Own.page snapshot from 9 November 2026.' : ''} Opens in a new tab.`}>
        <span class="social-rest"><span class="hub-icon" aria-hidden="true">{link.icon}</span><span class="hub-link-copy"><strong>{link.name}</strong><small>{link.handle}</small></span><span class="social-stat">{link.stat}</span><span class="hub-arrow" aria-hidden="true">↗</span></span>
        <span class="social-preview"><span class="profile-banner"><span aria-hidden="true">{link.icon}</span><small>{link.name}</small></span><span class="profile-preview-body"><img class="social-avatar" src={profile.photo} alt="" width="44" height="44" loading="lazy"/><strong>Ramkrishna More</strong><span class="preview-handle">{link.handle}</span><span class="preview-bio">{link.bio}</span><span class="preview-count">{link.stat}</span><span class="profile-action">{link.action} <span aria-hidden="true">↗</span></span></span></span>
        {#if link.snapshot}<span class="count-source">Own.page snapshot · 9 Nov 2026</span>{/if}
      </a>
    {/each}
    <article class="hub-tile hub-music" aria-label="My soundtrack">
      <div class="track-picker" aria-label="Choose a song">{#each tracks as song, index}<button aria-pressed={selectedTrack === index} onclick={() => { selectedTrack = index; }}>{song.name}</button>{/each}</div>
      {#if musicLoaded}
        {#key track.id}<iframe title={`Spotify player: ${track.name}`} src={`https://open.spotify.com/embed/${track.type}/${track.id}?theme=0`} width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>{/key}
        <button class="hub-music-close" onclick={() => musicLoaded = false}>Close player ×</button>
      {:else}
        <div class="music-disc" aria-hidden="true"><span>♪</span></div><div class="music-copy"><span class="hub-eyebrow">MY SOUNDTRACK</span><h3>{track.name}</h3><p>{track.artist}</p><button class="music-play" onclick={() => musicLoaded = true}><span aria-hidden="true">▶</span> Load Spotify player</button></div>
      {/if}
      <div class="music-links">
        <a href="https://open.spotify.com/user/31tplpw6zssxidcjr67wfp4nffqa" target="_blank" rel="noreferrer">My Spotify ↗</a>
        <a href={`https://open.spotify.com/${track.type}/${track.id}`} target="_blank" rel="noreferrer">Open track ↗</a>
      </div>
    </article>
    <a class="hub-tile hub-coffee" href="https://buymeacoffee.com/Ram_more" target="_blank" rel="noreferrer"><span class="coffee-cup" aria-hidden="true">☕</span><div><span class="hub-eyebrow">A LITTLE SUPPORT</span><h3>Enjoyed the work?</h3><p>You can buy me a coffee.</p></div><span class="hub-arrow" aria-hidden="true">↗</span></a>
  </div>
</section>
