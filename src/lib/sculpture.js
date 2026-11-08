import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export function createSculpture(host) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.1;
  renderer.domElement.setAttribute('aria-label', 'Interactive polished violet knot. Move your pointer or use the rotation buttons.');
  renderer.domElement.setAttribute('role', 'img'); host.prepend(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, .1, 50); camera.position.set(0, 0, 8);
  const environment = new RoomEnvironment(); const pmrem = new THREE.PMREMGenerator(renderer); const env = pmrem.fromScene(environment, .04); scene.environment = env.texture; environment.dispose(); pmrem.dispose();
  const geometry = new THREE.TorusKnotGeometry(1.45, .46, 180, 28, 2, 3);
  const material = new THREE.MeshPhysicalMaterial({ color: 0x7775f5, metalness: .65, roughness: .21, clearcoat: 1, clearcoatRoughness: .12 });
  const knot = new THREE.Mesh(geometry, material); scene.add(knot); knot.rotation.set(.3, -.4, .15);
  const ringGeometry = new THREE.TorusGeometry(2.55, .012, 8, 120); const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x9291bc, transparent: true, opacity: .32 });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial); ring.rotation.set(1, .4, .2); scene.add(ring);
  const light = new THREE.DirectionalLight(0xffffff, 3); light.position.set(-3, 4, 5); scene.add(light);
  let frame = 0, visible = false, last = 0, tx = -.4, ty = .3, turn = 0, phase = 0;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const allowed = () => !reduced.matches && document.documentElement.classList.contains('motion-enabled');
  function render(time) {
    frame = 0; if (!visible || document.hidden) return; const dt = Math.min((time - last) / 1000 || .016, .05); last = time;
    if (allowed()) { phase += dt; knot.rotation.x += (ty + Math.sin(phase * .25) * .12 - knot.rotation.x) * .055; knot.rotation.y += (tx + turn + Math.sin(phase * .18) * .22 - knot.rotation.y) * .055; knot.position.y = Math.sin(phase * .7) * .08; ring.rotation.z += dt * .035; }
    renderer.render(scene, camera); if (allowed()) frame = requestAnimationFrame(render);
  }
  function wake() { if (!frame && visible && !document.hidden) { last = performance.now(); frame = requestAnimationFrame(render); } }
  function resize() { const w = host.clientWidth, h = host.clientHeight; if (!w || !h) return; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); wake(); }
  const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(host);
  const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) wake(); else { cancelAnimationFrame(frame); frame = 0; } }, { rootMargin: '100px' }); visibility.observe(host);
  const abort = new AbortController();
  host.addEventListener('pointermove', e => { if (e.pointerType === 'touch' || !allowed()) return; const r = host.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width * 1.6 - .8; ty = (e.clientY - r.top) / r.height * .9 - .45; wake(); }, { passive: true, signal: abort.signal });
  host.querySelectorAll('[data-rotate]').forEach(button => button.addEventListener('click', () => { turn += Number(button.dataset.rotate) * .65; if (!allowed()) { knot.rotation.y = tx + turn; renderer.render(scene, camera); } else wake(); }, { signal: abort.signal }));
  const update = () => { cancelAnimationFrame(frame); frame = 0; wake(); };
  const mutation = new MutationObserver(update); mutation.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  reduced.addEventListener('change', update); document.addEventListener('visibilitychange', update, { signal: abort.signal }); resize();
  const loss = e => { e.preventDefault(); cancelAnimationFrame(frame); frame = 0; host.classList.add('context-lost'); }; renderer.domElement.addEventListener('webglcontextlost', loss);
  return () => { cancelAnimationFrame(frame); abort.abort(); resizeObserver.disconnect(); visibility.disconnect(); mutation.disconnect(); reduced.removeEventListener('change', update); renderer.domElement.removeEventListener('webglcontextlost', loss); geometry.dispose(); material.dispose(); ringGeometry.dispose(); ringMaterial.dispose(); env.dispose(); renderer.dispose(); renderer.domElement.remove(); };
}
