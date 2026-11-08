<script>
  import { onMount } from 'svelte';
  import Atropos from 'atropos';
  import 'atropos/css';
  let { children, class: className = '' } = $props();
  let element;
  onMount(() => {
    let instance;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => {
      const allowed = !reduced.matches && fine.matches && document.documentElement.classList.contains('motion-enabled');
      if(allowed && !instance) instance = Atropos({el:element, activeOffset:35, rotateXMax:10, rotateYMax:12, duration:700, rotateTouch:false, shadow:false, highlight:true});
      if(!allowed && instance) { instance.destroy(); instance = null; }
    };
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
    reduced.addEventListener('change',update); fine.addEventListener('change',update); update();
    return () => { observer.disconnect(); reduced.removeEventListener('change',update); fine.removeEventListener('change',update); instance?.destroy(); };
  });
</script>
<div bind:this={element} class={`atropos depth-card ${className}`}><div class="atropos-scale"><div class="atropos-rotate"><div class="atropos-inner">{@render children()}</div></div></div></div>
