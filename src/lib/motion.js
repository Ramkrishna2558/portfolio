import { createDepthFlow } from './depth-flow.js';
import { createHaptics } from './haptics.js';
// Native scrolling and pointer input remain browser-owned. Effects never cancel input.
export function enhanceMotion(options) {
  const root = document.documentElement;
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const aura = document.querySelector('.cursor-aura');
  const pulse = document.querySelector('.touch-pulse');
  const progress = document.querySelector('.reading-progress span');
  const abort = new AbortController();
  const listen = (target, type, handler, extra = {}) => target.addEventListener(type, handler, { signal: abort.signal, ...extra });
  let frame = 0, scrollFrame = 0, holdTimer, down, hovered, x = 0, y = 0, tx = 0, ty = 0, vx = 0, vy = 0, lastTime = 0, sectionId = 'top', pulseAnimation;
  const animations = new Set();
  const track = animation => { animations.add(animation); animation.finished.catch(() => { }).finally(() => animations.delete(animation)); return animation; };
  const haptics = createHaptics({ allowed: () => !document.hidden && options.haptic() && options.allowed(), vibrate: duration => navigator.vibrate?.(duration) ?? false });
  let sectionPending = false, settleTimer;
  function burst(px, py, hold = false) {
    if (!options.allowed()) return;
    pulseAnimation?.cancel();
    pulse.style.left = `${px}px`; pulse.style.top = `${py}px`;
    pulseAnimation = track(pulse.animate([{ opacity: .13, transform: 'translate(-50%,-50%) scale(.4)' }, { opacity: 0, transform: `translate(-50%,-50%) scale(${hold ? 1.25 : .85})` }], { duration: hold ? 700 : 550, easing: 'cubic-bezier(.16,1,.3,1)' }));

  }
  function spring(time) {
    frame = 0;
    if (!options.allowed() || !fine.matches) return;
    const dt = Math.min((time - lastTime) / 16.67 || 1, 2); lastTime = time;
    vx = (vx + (tx - x) * .15 * dt) * Math.pow(.68, dt); vy = (vy + (ty - y) * .15 * dt) * Math.pow(.68, dt);
    x += vx * dt; y += vy * dt;
    aura.style.transform = `translate3d(${x}px,${y}px,0)`;
    if (Math.abs(tx - x) + Math.abs(ty - y) + Math.abs(vx) + Math.abs(vy) > .15) frame = requestAnimationFrame(spring);
  }
  function resetHover() { if (hovered) { hovered.style.removeProperty('--mx'); hovered.style.removeProperty('--my'); hovered.style.removeProperty('--rx'); hovered.style.removeProperty('--ry'); hovered = null; } }
  listen(document, 'pointermove', e => {
    if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 12) { clearTimeout(holdTimer); down = null; }
    if (!options.allowed() || !fine.matches || e.pointerType === 'touch') return;
    tx = e.clientX; ty = e.clientY;
    if (!aura.classList.contains('visible')) { x = tx; y = ty; }
    aura.classList.add('visible');
    const control = e.target.closest('a,button'); aura.classList.toggle('interactive', !!control);
    const next = e.target.closest('.pill');
    if (next !== hovered) resetHover();
    if (next) { hovered = next; const r = next.getBoundingClientRect(); const dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.height - .5; next.style.setProperty('--mx', `${dx * 9}px`); next.style.setProperty('--my', `${dy * 7}px`); next.style.setProperty('--rx', `${-dy * 3}deg`); next.style.setProperty('--ry', `${dx * 3}deg`); }
    if (!frame) { lastTime = performance.now(); frame = requestAnimationFrame(spring); }
  }, { passive: true });
  function release() { clearTimeout(holdTimer); down = null; root.classList.remove('pointer-held'); }
  listen(document, 'pointerdown', e => {
    haptics.activate();
    if (e.button !== 0 || !e.target.closest('button,a,summary')) return;
    down = { x: e.clientX, y: e.clientY };
    root.classList.add('pointer-held'); burst(e.clientX, e.clientY);
    holdTimer = setTimeout(() => { if (down) { burst(down.x, down.y, true); haptics.hold(); } }, 600);
  }, { passive: true });
  listen(document, 'click', e => { if (e.target.closest('button,a,summary')) { haptics.activate(); haptics.tap(); } });
  listen(document, 'pointerup', release, { passive: true }); listen(document, 'pointercancel', release, { passive: true });
  listen(document, 'pointerout', e => { if (!e.relatedTarget) { aura.classList.remove('visible'); resetHover(); release(); } });
  listen(window, 'blur', () => { aura.classList.remove('visible'); resetHover(); release(); haptics.stop(); });
  const depthFlow = createDepthFlow(options);
  const sections = ['top', 'work', 'thinking', 'about', 'experience', 'beyond', 'contact'].map(id => document.getElementById(id));
  function scrollUpdate() {
    scrollFrame = 0; depthFlow.update();
    const total = root.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${total > 0 ? Math.min(1, scrollY / total) : 0})`;
    let current = 'top';
    for (const section of sections.slice(1)) if (section && section.getBoundingClientRect().top < innerHeight * .45) current = section.id;
    if (current !== sectionId) { sectionId = current; options.section(current); if (options.allowed()) { track(progress.animate([{ filter: 'brightness(1.8)' }, { filter: 'brightness(1)' }], { duration: 500 })); sectionPending = true; haptics.section(); } }
  }
  listen(window, 'scroll', () => { release(); if (sectionPending) haptics.section(); clearTimeout(settleTimer); settleTimer = setTimeout(() => { sectionPending = false; }, 180); if (!scrollFrame) scrollFrame = requestAnimationFrame(scrollUpdate); }, { passive: true });
  listen(window, 'resize', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(scrollUpdate); }, { passive: true });
  const seen = new WeakSet();
  // Fade containers without moving their hit targets during a first click or tap.
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if (options.allowed()) {
        track(entry.target.animate([{ opacity: .45 }, { opacity: 1 }], {
          duration: 450, easing: 'ease-out'
        }));
      }
    }
  }, { threshold: .02, rootMargin: '0px 0px 80px 0px' });
  const scan = () => { document.querySelectorAll('.project,.about-text,.about-facts,.job,.repo-row,.hub-tile').forEach(el => { if (!seen.has(el)) { seen.add(el); observer.observe(el); } }); };
  const mutation = new MutationObserver(scan); mutation.observe(document.querySelector('main'), { childList: true, subtree: true }); scan();
  function refresh() { root.classList.toggle('motion-enabled', options.allowed()); if (!options.allowed()) haptics.stop(); depthFlow.update(); if (!options.allowed()) { animations.forEach(a => a.cancel()); cancelAnimationFrame(frame); frame = 0; aura.classList.remove('visible'); resetHover(); release(); } }
  listen(document, 'visibilitychange', () => { if (document.hidden) { haptics.stop(); cancelAnimationFrame(frame); frame = 0; release(); aura.classList.remove('visible'); } });
  refresh(); scrollUpdate();
  return { refresh, destroy() { haptics.stop(); depthFlow.destroy(); abort.abort(); observer.disconnect(); mutation.disconnect(); cancelAnimationFrame(frame); cancelAnimationFrame(scrollFrame); clearTimeout(holdTimer); clearTimeout(settleTimer); animations.forEach(a => a.cancel()); resetHover(); root.classList.remove('motion-enabled', 'pointer-held'); } };
}
