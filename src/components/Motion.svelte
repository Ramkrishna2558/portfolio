<script>
  import { onMount } from 'svelte';
  import { enhanceMotion } from '../lib/motion.js';
  let systemReduced = $state(false);
  let active = $state('top');
  let controller;
  onMount(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    systemReduced = media.matches;
    controller = enhanceMotion({ allowed: () => !systemReduced && !document.documentElement.classList.contains('reader-mode'), haptic: () => !systemReduced && !document.documentElement.classList.contains('reader-mode'), section: (id) => active = id });
    const change = () => { systemReduced = media.matches; controller.refresh(); };
    media.addEventListener('change', change);
    document.addEventListener('viewchange', change);
    return () => { document.removeEventListener('viewchange', change); media.removeEventListener('change', change); controller.destroy(); };
  });
</script>

<div class="reading-progress" aria-hidden="true"><span></span></div>
<div class="cursor-aura" aria-hidden="true"></div>
<div class="touch-pulse" aria-hidden="true"></div>
<nav class="chapter-nav" aria-label="Page chapters">
  {#each [['top','Introduction'],['work','Selected work'],['about','About'],['experience','Experience'],['beyond','Beyond the build'],['contact','Contact']] as [id,label]}
    <a href={`#${id}`} class:current={active === id} aria-current={active === id ? 'location' : undefined} aria-label={label}><span>{label}</span><i></i></a>
  {/each}
</nav>
