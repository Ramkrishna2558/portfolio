<script>
  import Words from './Words.svelte';
  import DepthCard from './DepthCard.svelte';
  import Motion from './Motion.svelte';
  import PersonalHub from './PersonalHub.svelte';
  import ViewControls from './ViewControls.svelte';
  import { onDestroy, onMount } from 'svelte';
  let compact = $state(false);
  let menuOpen = $state(false);
  let activeJourney = $state(-1);
  let introRevealed = $state(false);
  onMount(() => {
    const controller = new AbortController();
    const update = () => { const next = compact ? window.scrollY > 48 : window.scrollY > 120; if (!next) menuOpen = false; compact = next; if (window.scrollY > 12) introRevealed = true; };
    const reveal = () => { introRevealed = true; };
    const keyboard = (event) => { if (['ArrowDown', 'PageDown', ' '].includes(event.key)) reveal(); };
    window.addEventListener('scroll', update, { passive: true, signal: controller.signal });
    window.addEventListener('wheel', reveal, { passive: true, once: true, signal: controller.signal });
    window.addEventListener('touchmove', reveal, { passive: true, once: true, signal: controller.signal });
    window.addEventListener('keydown', keyboard, { signal: controller.signal });
    update();
    const anchorFrame = requestAnimationFrame(() => { const id = window.location.hash.slice(1); if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }); });
    return () => { controller.abort(); cancelAnimationFrame(anchorFrame); };
  });
  import { profile, projects } from '../lib/data.js';
  let selected = $state(null);
  let dialog;
  let copied = $state(false);
  let copyTimer;
  onDestroy(() => clearTimeout(copyTimer));
  function openProject(project) { selected = project; dialog.showModal(); }
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); copied = true; clearTimeout(copyTimer); copyTimer = setTimeout(() => copied = false, 2500); }
    catch { window.location.href = `mailto:${profile.email}`; }
  }
</script>

<svelte:head><title>Ramkrishna More — Product Engineer</title></svelte:head>

<Motion />
<ViewControls />
<div id="top" class="portfolio">
  <a class="skip" href="#main">Skip to content</a>
  <header class:compact class:expanded={menuOpen} class="nav-shell">
    <button class="nav-monogram" inert={!compact} aria-hidden={!compact} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onclick={() => menuOpen = !menuOpen}>R</button>
    <div class="nav-content" inert={compact && !menuOpen} aria-hidden={compact && !menuOpen}><a href="#top" class="identity">Ramkrishna More <span class="location">/ <span>{profile.location}</span></span></a>
    <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About me</a><a href={profile.resume} target="_blank" rel="noreferrer">Résumé <span>↗</span></a></nav></div>
  </header>

  <main id="main">
    <section class:revealed={introRevealed} class="hero" aria-labelledby="hero-title">
      <div class="hero-heading"><p class="overline">PRODUCT ENGINEER</p><h1 id="hero-title"><Words text="Products. Interfaces."/><br/><span><Words text="The systems behind them."/></span></h1><p class="hero-description">Building web applications and shared systems with Angular and TypeScript. Exploring applied AI with engineering judgment.</p><a class="pill hero-button" href="#work"><span class="launch-label">Explore selected work</span><span class="launch-orbit" aria-hidden="true"><span>↓</span></span></a></div>
      <div class="portrait-stage">
        <div class="side-note note-left"><span class="blue-dot"></span><p>Thoughtful interfaces.<br/>Dependable engineering.</p><svg viewBox="0 0 100 65" aria-hidden="true"><path d="M5 10 Q25 55 85 36 M74 30 L87 36 L78 47"/></svg></div>
        <DepthCard class="portrait-depth"><div class="portrait-wrap"><img src={profile.photo} data-atropos-offset="3" alt="Ramkrishna More" width="400" height="400" fetchpriority="high"/><div class="photo-fade"></div><span class="portrait-caption" data-atropos-offset="12">THE PERSON BEHIND THE CODE <i>↗</i></span></div></DepthCard>
        <div class="side-note note-right"><span class="hello">hello, glad you’re here.</span><p>Building for the web.<br/>Making the complex feel simple.</p></div>
        <span class="outline-orbit orbit-left" aria-hidden="true"></span><span class="outline-orbit orbit-right" aria-hidden="true"></span>
      </div>
      <div class="hero-bottom"><span>ANGULAR · TYPESCRIPT · A LITTLE CURIOSITY</span><a href="#work" aria-label="Scroll to selected work">↓</a><span>BASED IN PUNE. BUILDING BEYOND.</span></div>
    </section>

    <section class="work container" id="work" aria-labelledby="work-title">
      <div class="section-heading"><div><p class="overline">01 / SELECTED WORK</p><h2 id="work-title"><Words text="Projects"/><br/><Words text="and engineering."/></h2></div><p>Commerce platforms, shared tooling,<br/>browser extensions and product interfaces.</p></div>
      <div class="project-grid">
        {#each projects as project}
          <article class="project"><div class="project-depth"><button class={`project-art ${project.color}`} onclick={() => openProject(project)} aria-label={`Read about ${project.name}`}>
            <div class="art-top" data-atropos-offset="3"><span>{project.short}<span class="tiny-dot">.</span></span><span>{project.number} / {project.kind}</span></div>
            {#if project.id === 'mtse'}
              <div class="architecture" data-atropos-offset="8"><div class="core"><span class="core-icon">&#123; &#125;</span><div><small>THE SHARED FOUNDATION</small><strong>One TypeScript core.</strong></div><span class="core-status">●</span></div><div class="connector-stem"></div><div class="connector-branches"></div><div class="platforms">{#each ['Storefront A','Storefront B','Admin console'] as name, i}<div class="platform"><div class="platform-bar"><i></i><i></i><i></i></div><div class="platform-inner"><span class="platform-symbol">{['▦','◈','▤'][i]}</span><b>{name}</b><div class="wire-lines"></div></div></div>{/each}</div></div>
              <div class="art-caption"><span>API · VALIDATION · ROUTING</span><span>ONE CORE. MANY POSSIBILITIES. ↗</span></div>
            {:else}
              <div class="delivery-map" data-atropos-offset="4">
                <span class="delivery-kicker">AUTOMART + TWO E-COMMERCE BUILDS</span>
                <strong>A shopping journey,<br/>built end to end.</strong>
                <div class="delivery-steps"><span><b>01</b>Product catalog</span><span><b>02</b>Cart workflows</span><span><b>03</b>Mobile performance</span></div>
                <small>Delivery scope · Aug 2023–Aug 2024</small>
              </div>
              <div class="art-caption"><span>FREELANCE DEVELOPMENT</span><span>READ THE DELIVERY STORY ↗</span></div>
            {/if}
            <span class="view-project">Explore project ↗</span>
          </button></div><div class="project-summary"><div class="project-meta"><span>{project.kind} / {project.year}</span><span>0{projects.indexOf(project)+1}</span></div><button class="project-title" onclick={() => openProject(project)}>{project.name}<span>↗</span></button><p>{project.description}</p><div class="tags">{#each project.stack.slice(0,3) as tech}<span>{tech}</span>{/each}</div></div></article>
        {/each}
      </div>
      <div class="code-index"><div class="code-index-title">More projects <span>Explore the code ↗</span></div><div class="code-index-heading"><p class="overline">OPEN THE CODE</p><span>Selected public repositories / GitHub</span></div>
        {#each [
          {name:'CurrencyLens',label:'02 / BROWSER EXTENSION',description:'Automatic price detection and inline currency conversion, including dynamically loaded content.',tech:'JavaScript · Manifest V3',url:'CurrencyLens'},
          {name:'ShetiBuddy',label:'03 / PRODUCT DEVELOPMENT',description:'An agriculture group management frontend with member workflows and English / Marathi interfaces.',tech:'React · Vite',url:'shetibuddy'}
        ] as repo}<a class="repo-row" href={`${profile.github}/${repo.url}`} target="_blank" rel="noreferrer"><div><small>{repo.label}</small><h3>{repo.name}</h3></div><p>{repo.description}</p><span>{repo.tech}</span><i>↗</i></a>{/each}
      </div>
      <a class="github-link" href={profile.github} target="_blank" rel="noreferrer">More of the making on GitHub <span>↗</span></a>
    </section>

    <section class="about container" id="about" aria-labelledby="about-title"><div class="section-heading"><div><p class="overline">02 / THE PERSON BEHIND THE CODE</p><h2 id="about-title"><Words text="Curiosity first."/><br/><Words text="Craft, always."/></h2></div><span class="asterisk" aria-hidden="true">✳</span></div><div class="about-grid"><div class="about-text"><p class="lead">I make complex things feel simple.</p><p>I connect real business problems with working software. My next chapter is forward-deployed engineering: working closely with users, shaping solutions and carrying them through to delivery.</p><a class="inline-link" href={profile.linkedin} target="_blank" rel="noreferrer">A little more about me on LinkedIn ↗</a></div><div class="about-facts"><p class="overline">FROM PROBLEM TO PRODUCTION</p><div class="capability-list"><div><h3>Understand & shape</h3><p>Technical problem-solving, user workflows, reusable architecture and product thinking.</p></div><div><h3>Build & connect</h3><p>Angular, React, TypeScript, RxJS, REST APIs and shared application tooling.</p></div><div><h3>Test & deliver</h3><p>Vitest, Git, performance profiling, dependency audits and reliable integrations.</p></div><div><h3>Explore the next frontier</h3><p>AI-assisted development with GPT, Claude and Copilot. Growing toward applied AI and forward-deployed delivery.</p></div></div><details class="education"><summary>Education <span>+</span></summary><h3>B.E. in Information Technology</h3><p>PVG College of Engineering, Nashik<br/>University of Pune · 2022</p><small>First Class with Distinction</small></details></div></div></section>

    <section class="experience container" id="experience" aria-labelledby="experience-title"><div class="section-heading"><div><p class="overline">03 / THE JOURNEY</p><h2 id="experience-title"><Words text="Built through experience."/><br/><Words text="Driven by curiosity."/></h2></div><a class="pill" href={profile.resume} download>Download résumé <span>↓</span></a></div><div class="journey-list">{#each [
      {label:'01 / THE FOUNDATION · 2023',title:'Learn to diagnose.',summary:'WNS · Technical support',body:'L2 support at WNS meant diagnosing escalated issues across phone, email and chat while meeting SLAs. The starting point was understanding what had gone wrong for the person using the system.'},
      {label:'02 / BUILDING INDEPENDENTLY · AUG 2023—AUG 2024',title:'Own the build.',summary:'Freelance · E-commerce',body:'From August 2023 to August 2024, I developed Automart and two more e-commerce websites. My scope moved from resolving issues to building product catalogs, cart workflows and mobile-first experiences.'},
      {label:'03 / GROWING AT ACCENTURE · 2024—PRESENT',title:'From Associate to Analyst.',summary:'Accenture · Enterprise engineering',body:'At Accenture, I progressed from Associate to Analyst. My work includes reusable Angular UI patterns, REST integrations and fixes for authentication, routing and permission redirects. The scope shifted from individual screens to patterns other features could reuse.'},
      {label:"04 / WHAT'S NEXT",title:'Get closer to the problem.',summary:'What I’m exploring',body:'My next step is forward-deployed engineering—working directly with users, understanding their constraints and carrying a solution through delivery. I’m developing my applied AI skills alongside that goal.'}
    ] as step, index}<article class="journey-step" class:open={activeJourney === index}><button class="journey-toggle" aria-expanded={activeJourney === index} onclick={() => activeJourney = activeJourney === index ? -1 : index}><span class="journey-label">{step.label}</span><span class="journey-title">{step.title}</span><span class="journey-summary">{step.summary}</span><i aria-hidden="true">↗</i></button><div class="journey-content" aria-hidden={activeJourney !== index} inert={activeJourney !== index}><div><p>{step.body}</p></div></div></article>{/each}</div></section>

    <PersonalHub />

    <section class="contact" id="contact"><div class="container"><p class="overline">05 / GOOD THINGS START WITH A CONVERSATION</p><h2><Words text="Something in mind?"/><br/><span class="contact-word"><Words text="Let’s build it."/></span></h2><p>Hiring? Let’s have a conversation.<br/>Product owner? Let’s build your idea.<br/>Contributor or builder? Let’s build together.</p><div class="contact-actions"><a class="pill dark-pill" href={`mailto:${profile.email}`}>Say hello <span>↗</span></a><button class="copy-email" onclick={copyEmail} aria-label="Copy email address">{profile.email}<span>{copied ? '✓' : '⧉'}</span></button><span class="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span></div></div></section>
  </main>
  <div class="build-credit container"><p>Imagined, designed and built with intent.</p><span>Built with GPT Astra and Claude Opus models.</span></div>
  <footer class="container"><a class="footer-name" href="#top">Back to top<span>↗</span></a><span>Made with Madness.</span><div><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={profile.resume} target="_blank" rel="noreferrer">Résumé ↗</a></div><small>© {new Date().getFullYear()}</small></footer>
</div>

<dialog bind:this={dialog} onclose={() => selected = null} onclick={(event) => {if(event.target === dialog) dialog.close();}} onkeydown={(event) => {if(event.key === 'Escape') dialog.close();}} aria-labelledby="case-title">
  {#if selected}
    <div class="case">
      <button class="close-case" onclick={() => dialog.close()} aria-label="Close project details">✕</button>
      <p class="overline">{selected.kind} / {selected.year}</p>
      <h2 id="case-title">{selected.name}</h2>
      <p class="case-headline">{selected.headline}</p>
      <p>{selected.detail}</p>
      {#if selected.id === 'mtse'}
        <div class="case-facts"><span>Focus<strong>Shared frontend infrastructure</strong></span><span>Evidence<strong>Public TypeScript source</strong></span></div>
        <h3>The problem</h3>
        <p>Storefront and admin applications need consistent API behavior, field validation and access checks. Implementing those separately gives each application another place for the same rules to drift.</p>
        <h3>The implementation</h3>
        <ol class="case-walkthrough">
          <li><strong>Centralize requests.</strong><p>An Axios factory sets a default timeout, attaches the access token and emits an unauthorized event on a 401 response. Typed helpers return the response data.</p><a href={`${profile.github}/mtse-shared/blob/master/src/api/client.ts`} target="_blank" rel="noreferrer">Read the API client ↗</a></li>
          <li><strong>Describe rules once.</strong><p>Field configuration becomes a Zod schema. Validation returns errors keyed by field name, keeping forms connected to a common rule definition.</p><a href={`${profile.github}/mtse-shared/blob/master/src/validation/index.ts`} target="_blank" rel="noreferrer">Read the schema builder ↗</a></li>
          <li><strong>Keep navigation consistent.</strong><p>Route helpers flatten nested routes and evaluate authentication and role guards. These client checks guide the interface; server-side authorization must enforce access.</p><a href={`${profile.github}/mtse-shared/blob/master/src/routing/index.ts`} target="_blank" rel="noreferrer">Read the route helpers ↗</a></li>
        </ol>
        <h3>The tradeoff</h3>
        <p>A shared package reduces duplicate definitions but couples its consumers to the same contracts. Changes need compatibility checks across both apps. The routing module currently uses React types, so it is not framework-neutral.</p>
        <details class="engineering-note"><summary>Scope and measurement notes <span>+</span></summary><p>My résumé reports 40% less boilerplate and 85%+ test coverage. A reproducible before-and-after baseline and coverage report are not published in these repositories, so those figures are not presented as verified benchmarks here.</p><p>The umbrella README describes React/Vite frontends, while the current public storefront is an Angular scaffold. The code walkthrough above is specifically for the shared library, not a demonstration of a deployed end-to-end platform.</p></details>
        <a class="inline-link" href={`${profile.github}/mtse`} target="_blank" rel="noreferrer">Architecture and setup documentation ↗</a>
      {:else}
        <div class="case-facts"><span>Role<strong>Freelance developer</strong></span><span>Delivered<strong>Automart + 2 e-commerce sites</strong></span></div>
        <h3>The delivery scope</h3>
        <ol class="case-walkthrough">
          <li><strong>Discover the product.</strong><p>Product catalogs formed the entry point to the shopping experience. Automart focused on automobile commerce.</p></li>
          <li><strong>Build the shopping flow.</strong><p>Cart workflows connected product discovery with the next step in the buying journey, across mobile-first layouts.</p></li>
          <li><strong>Reduce the loading cost.</strong><p>Rendering optimization, lazy loading and asset compression were part of the performance work described in my résumé.</p></li>
        </ol>
        <h3>What this work demonstrates</h3>
        <p>Independent implementation across three commerce websites, with attention to the customer journey and mobile performance.</p>
        <p class="case-note">This delivery summary is based on my freelance experience and résumé. Original screenshots, client URLs and a reproducible Lighthouse report are not available here. The project card is a scope diagram, not a product screenshot.</p>
        <a class="inline-link" href={`mailto:${profile.email}?subject=Let%E2%80%99s%20talk%20about%20Automart`}>Let’s discuss the delivery ↗</a>
      {/if}
      <div class="tags">{#each selected.stack as tech}<span>{tech}</span>{/each}</div>
    </div>
  {/if}
</dialog>
