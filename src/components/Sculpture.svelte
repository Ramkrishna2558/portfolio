<script>
  import { onMount } from "svelte";
  let host;
  let fallback = $state(false);
  onMount(() => {
    let disposed = false,
      dispose;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      import("../lib/sculpture.js")
      .then(({ createSculpture }) => {
        if (disposed) return;
        try {
          dispose = createSculpture(host);
        } catch {
          fallback = true;
        }
      })
      .catch(() => {
        if (!disposed) fallback = true;
      });
    }, { rootMargin: "250px" });
    observer.observe(host);
    return () => {
      disposed = true;
      observer.disconnect();
      dispose?.();
    };
  });
</script>

<div class="sculpture-stage" bind:this={host}>
  <div class="sculpture-fallback" class:active={fallback} aria-hidden="true">
    <i></i><i></i><i></i>
  </div>
  <div class="sculpture-controls">
    <button data-rotate="-1" aria-label="Rotate sculpture left">←</button><span
      >EXPLORE THE FORM</span
    ><button data-rotate="1" aria-label="Rotate sculpture right">→</button>
  </div>
</div>
