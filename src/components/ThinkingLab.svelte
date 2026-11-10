<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  const scenarios = [
    {
      name: 'Find an answer', brief: 'Help a team find answers in its own knowledge.',
      proposal: 'Retrieve relevant documents and draft an answer with AI.',
      decision: 'A plausible answer is not enough. Check permissions, show the sources and allow “I don’t know”.',
      outcome: 'An answer you can inspect.', artifact: 'A source-backed assistant',
      layers: ['Team knowledge', 'Retrieval + generation', 'Sources + access checks'],
      checks: ['Source citations', 'Permission-aware retrieval', 'An explicit unknown state'],
      test: 'Evaluate on known questions, missing answers and documents the user must not access.'
    },
    {
      name: 'Simplify a workflow', brief: 'Help a support team turn incoming requests into next steps.',
      proposal: 'Classify the request and suggest a response and route.',
      decision: 'Urgency is contextual. Let a person review sensitive requests and override the suggested route.',
      outcome: 'Less repetition. More control.', artifact: 'A reviewable support queue',
      layers: ['Incoming requests', 'Classification + drafting', 'Review + override'],
      checks: ['Suggested next action', 'Human review for sensitive cases', 'An editable decision trail'],
      test: 'Test ambiguous messages and incorrect routes. Measure correction effort, not just automation rate.'
    },
    {
      name: 'Explore a product', brief: 'Turn an uncertain idea into something people can try.',
      proposal: 'Generate interface directions and scaffold a working prototype.',
      decision: 'A polished screen can solve the wrong problem. Choose a direction, test the task with people and revise.',
      outcome: 'An idea that earns its next iteration.', artifact: 'A testable product prototype',
      layers: ['A real user need', 'Variants + scaffolding', 'User testing + refinement'],
      checks: ['A focused user task', 'A working interaction', 'Feedback before more features'],
      test: 'Observe whether someone can finish the task without guidance. Use the friction to shape the next build.'
    }
  ];
  let index = $state(0);
  let resolved = $state(false);
  let still = $state(true);
  let scenario = $derived(scenarios[index]);

  onMount(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => still = reduced.matches || document.documentElement.classList.contains('reader-mode');
    update();
    reduced.addEventListener('change', update);
    document.addEventListener('viewchange', update);
    return () => {
      reduced.removeEventListener('change', update);
      document.removeEventListener('viewchange', update);
    };
  });

  function choose(next) {
    if (next === index) return;
    index = next;
    resolved = false;
  }
</script>

<section class="thinking-lab container" id="thinking" aria-labelledby="thinking-title">
  <div class="lab-heading">
    <div><p class="overline">HUMAN × AI / AN INTERACTIVE EXPLORATION</p><h2 id="thinking-title">Human intent.<br/><span>Machine possibility.</span></h2></div>
    <p>AI expands what we can explore.<br/>Our imagination, context and judgment<br/>shape what is worth building.</p>
  </div>

  <div class="lab-options" role="group" aria-label="Choose an AI use case">
    {#each scenarios as item, i}
      <button aria-pressed={index === i} onclick={() => choose(i)}><span>0{i + 1}</span>{item.name}</button>
    {/each}
  </div>

  <div class="lab-workbench" class:resolved>
    <div class="lab-narrative">
      {#key index}
        <div in:fade={{ duration: still ? 0 : 240 }} out:fade={{ duration: still ? 0 : 140 }}>
          <p class="lab-step">01 / THE HUMAN BRIEF</p><h3>{scenario.brief}</h3>
          <div class="lab-proposal"><span class="lab-step">02 / WHAT AI CAN HELP WITH</span><p>{scenario.proposal}</p></div>
          <div class="lab-decision"><span class="lab-step">03 / WHERE JUDGMENT MATTERS</span><p>{scenario.decision}</p></div>
        </div>
      {/key}
      <button class="lab-apply" aria-pressed={resolved} aria-controls="lab-result" onclick={() => resolved = !resolved}>
        {resolved ? 'Reopen the possibilities' : 'Bring it together'}<span aria-hidden="true">{resolved ? '↺' : '↗'}</span>
      </button>
    </div>

    <div class="lab-visual" aria-hidden="true">
      <div class="lab-coordinate">IDEA SPACE <span>{resolved ? 'ALIGNED' : 'EXPLORING'}</span></div>
      <div class="lab-scene">
        <div class="lab-plane plane-intent"><span class="plane-number">01 / HUMAN</span><strong>{scenario.layers[0]}</strong><div class="intent-mark">✳</div><span class="plane-bottom">CONTEXT SETS THE DIRECTION</span></div>
        <div class="lab-plane plane-ai"><span class="plane-number">02 / AI</span><strong>{scenario.layers[1]}</strong><div class="possibility-grid">{#each Array(12) as _, i}<i style={`--cell:${i}`}></i>{/each}</div><span class="plane-bottom">EXPLORE THE POSSIBILITIES</span></div>
        <div class="lab-plane plane-judgment"><span class="plane-number">03 / TOGETHER</span><strong>{scenario.layers[2]}</strong><div class="judgment-lines"><i></i><i></i><i></i></div><span class="plane-bottom">{resolved ? 'A DIRECTION WORTH TESTING ✓' : 'MAKE A DELIBERATE CHOICE'}</span></div>
      </div>
      <p class="lab-visual-caption">{resolved ? 'Different strengths. One considered direction.' : 'Intent → exploration → judgment'}</p>
    </div>
  </div>

  <div id="lab-result" class="lab-result" class:ready={resolved} aria-live="polite" aria-atomic="true">
    {#if resolved}
      <div><span class="lab-step">THE DIRECTION / {scenario.artifact}</span><h3>{scenario.outcome}</h3><ul>{#each scenario.checks as check}<li>{check}</li>{/each}</ul></div>
      <div class="lab-test"><span class="lab-step">HOW I WOULD TEST IT</span><p>{scenario.test}</p></div>
    {:else}
      <p>Choose a use case, then bring the layers together to see a direction and how I would test it.</p>
    {/if}
  </div>
  <p class="lab-footnote">Interactive concept study · Curated scenarios, no live AI calls. A demonstration of how I think about building with AI.</p>
</section>
