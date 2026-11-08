import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHaptics } from '../src/lib/haptics.js';
function setup() {
  let time = 0, enabled = true, id = 0;
  const calls = [], timers = new Map();
  const h = createHaptics({ allowed: () => enabled, vibrate: v => { calls.push(v); return true; }, now: () => time,
    schedule: fn => { timers.set(++id, fn); return id; }, unschedule: key => timers.delete(key) });
  return {h,calls,timers,advance: n => time += n, disable: () => enabled = false, flush: () => { for (const fn of timers.values()) fn(); timers.clear(); }};
}
test('requires interaction and respects reduced-motion/reader gate', () => {
  const x=setup(); x.h.tap(); assert.deepEqual(x.calls,[]); x.h.activate(); x.h.tap(); x.advance(200); x.disable(); x.h.tap(); assert.deepEqual(x.calls,[4]);
});
test('rapid taps are suppressed and a hold does not cause a release double pulse', () => {
  const x=setup(); x.h.activate(); x.h.tap(); x.h.tap(); x.advance(600); x.h.hold(); x.advance(150); x.h.tap(); assert.deepEqual(x.calls,[4,7]);
});
test('section feedback coalesces and is cancelled by a direct action', () => {
  const x=setup(); x.h.activate(); x.h.section(); x.h.section(); assert.equal(x.timers.size,1); x.h.tap(); x.flush(); assert.deepEqual(x.calls,[4]);
});
test('stopping cancels pending feedback', () => {
  const x=setup(); x.h.activate(); x.h.section(); x.h.stop(); x.flush(); assert.deepEqual(x.calls,[0]);
});
