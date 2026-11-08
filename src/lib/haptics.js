// Browsers expose pulse duration, not motor intensity or native haptic envelopes.
export function createHaptics({ allowed, vibrate, now = () => performance.now(), schedule = setTimeout, unschedule = clearTimeout }) {
  let activated = false, lastPulse = -Infinity, lastHold = -Infinity, lastSection = -Infinity, pending;
  const durations = { tap: 4, hold: 7, section: 3 };
  function pulse(kind) {
    const time = now();
    if (!activated || !allowed() || time - lastPulse < 140) return;
    if (kind === 'tap' && time - lastHold < 400) return;
    if (kind === 'section' && time - lastSection < 1000) return;
    try {
      if (vibrate(durations[kind]) === false) return;
      lastPulse = time;
      if (kind === 'hold') lastHold = time;
      if (kind === 'section') lastSection = time;
    } catch { /* Unsupported or denied vibration is silent. */ }
  }
  function cancel() { unschedule(pending); pending = undefined; }
  return {
    activate() { activated = true; },
    tap() { cancel(); pulse('tap'); },
    hold() { cancel(); pulse('hold'); },
    section() { cancel(); pending = schedule(() => { pending = undefined; pulse('section'); }, 160); },
    cancel,
    stop() { cancel(); try { vibrate(0); } catch {} },
  };
}
