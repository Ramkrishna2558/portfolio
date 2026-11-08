<script>
  import Words from './Words.svelte';
  import DepthCard from './DepthCard.svelte';
  import Sculpture from './Sculpture.svelte';
  import Motion from './Motion.svelte';
  import { onDestroy } from 'svelte';
  import { profile, projects, skills, experience } from '../lib/data.js';
  let filter = $state('All work');
  let selected = $state(null);
  let dialog;
  let copied = $state(false);
  let copyTimer;
  onDestroy(() => clearTimeout(copyTimer));
  let visibleProjects = $derived(filter === 'All work' ? projects : projects.filter(p => p.category === filter));
  function openProject(project) { selected = project; dialog.showModal(); }
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); copied = true; clearTimeout(copyTimer); copyTimer = setTimeout(() => copied = false, 2500); }
    catch { window.location.href = `mailto:${profile.email}`; }
  }
</script>

<svelte:head><title>Ramkrishna More — Full-stack Product Engineer</title></svelte:head>

<Motion />
<div id="top" class="portfolio">
  <a class="skip" href="#main">Skip to content</a>
  <header class="nav-shell">
    <a href="#top" class="identity">Ramkrishna More <span class="location">/ <span>{profile.location}</span></span></a>
    <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About me</a><a href={profile.resume} target="_blank" rel="noreferrer">Résumé <span>↗</span></a></nav>
  </header>

  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-heading"><p class="overline">RAMKRISHNA MORE / FULL-STACK PRODUCT ENGINEER</p><h1 id="hero-title"><Words text="Full-stack thinking."/><br/><span><Words text="Products that matter."/></span></h1><p class="hero-description">Full-stack engineering, informed by experience and accelerated by AI.</p><a class="pill hero-button" href="#work">Explore selected work <span>↘</span></a></div>
      <div class="portrait-stage">
        <div class="side-note note-left"><span class="blue-dot"></span><p>Thoughtful interfaces.<br/>Dependable engineering.</p><svg viewBox="0 0 100 65" aria-hidden="true"><path d="M5 10 Q25 55 85 36 M74 30 L87 36 L78 47"/></svg></div>
        <DepthCard class="portrait-depth"><div class="portrait-wrap"><img src={profile.photo} data-atropos-offset="3" alt="Ramkrishna More" width="400" height="400" fetchpriority="high"/><div class="photo-fade"></div><span class="portrait-caption" data-atropos-offset="12">THE PERSON BEHIND THE CODE <i>↗</i></span></div></DepthCard>
        <div class="side-note note-right"><span class="hello">hello, I’m Ramkrishna.</span><p>Building for the web.<br/>Making the complex feel simple.</p></div>
        <span class="outline-orbit orbit-left" aria-hidden="true"></span><span class="outline-orbit orbit-right" aria-hidden="true"></span>
      </div>
      <div class="hero-bottom"><span>ANGULAR · TYPESCRIPT · A LITTLE CURIOSITY</span><a href="#work" aria-label="Scroll to selected work">↓</a><span>BASED IN PUNE. BUILDING BEYOND.</span></div>
    </section>

    <section class="depth-interlude container" aria-label="Interactive 3D introduction"><div class="interlude-copy"><p class="overline">A LITTLE DEPTH. A DIFFERENT PERSPECTIVE.</p><h2><Words text="Expertise meets AI."/><br/><Words text="Built for people."/></h2><p>Harnessing AI with engineering judgment to create better product experiences.</p><a class="inline-link" href="#work">Discover the work ↓</a></div><Sculpture /></section>
    <section class="work container" id="work" aria-labelledby="work-title">
      <div class="section-heading"><div><p class="overline">01 / SELECTED WORK</p><h2 id="work-title"><Words text="Projects"/><br/><Words text="and engineering."/></h2></div><p>Commerce platforms, shared tooling,<br/>browser extensions and product interfaces.</p></div>
      <div class="project-grid">
        {#each visibleProjects as project}
          <article class="project"><DepthCard class="project-depth"><button class={`project-art ${project.color}`} onclick={() => openProject(project)} aria-label={`Read about ${project.name}`}>
            <div class="art-top" data-atropos-offset="3"><span>{project.short}<span class="tiny-dot">.</span></span><span>{project.number} / {project.kind}</span></div>
            {#if project.id === 'mtse'}
              <div class="architecture" data-atropos-offset="8"><div class="core"><span class="core-icon">&#123; &#125;</span><div><small>THE SHARED FOUNDATION</small><strong>One TypeScript core.</strong></div><span class="core-status">●</span></div><div class="connector-stem"></div><div class="connector-branches"></div><div class="platforms">{#each ['Storefront A','Storefront B','Admin console'] as name, i}<div class="platform"><div class="platform-bar"><i></i><i></i><i></i></div><div class="platform-inner"><span class="platform-symbol">{['▦','◈','▤'][i]}</span><b>{name}</b><div class="wire-lines"></div></div></div>{/each}</div></div>
              <div class="art-caption"><span>API · VALIDATION · ROUTING</span><span>ONE CORE. MANY POSSIBILITIES. ↗</span></div>
            {:else}
              <div class="commerce-art" data-atropos-offset="8"><div class="commerce-copy">Good experiences.<br/><em>On every screen.</em><div class="flow"><span>Discover</span>→<span>Cart</span>→<span>Checkout</span></div></div><div class="phone"><div class="phone-top">shop<span>◦ ◦</span></div><div class="phone-object"><div class="vase"></div></div><div class="phone-product">Everyday essentials<span>↗</span></div><div class="phone-lines"></div><div class="phone-button">Add to bag <span>+</span></div></div><div class="score"><strong>95<span>+</span></strong><span>LIGHTHOUSE<br/>PERFORMANCE</span></div></div><div class="art-caption"><span>MOBILE FIRST. PERFORMANCE ALWAYS.</span><span>↗</span></div>
            {/if}
            <span class="view-project">Explore project ↗</span>
          </button></DepthCard><div class="project-summary"><div class="project-meta"><span>{project.kind} / {project.year}</span><span>0{projects.indexOf(project)+1}</span></div><button class="project-title" onclick={() => openProject(project)}>{project.name}<span>↗</span></button><div class="tags">{#each project.stack.slice(0,3) as tech}<span>{tech}</span>{/each}</div></div></article>
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

    <section class="about container" id="about" aria-labelledby="about-title"><div class="section-heading"><div><p class="overline">02 / THE PERSON BEHIND THE CODE</p><h2 id="about-title"><Words text="Curiosity first."/><br/><Words text="Craft, always."/></h2></div><span class="asterisk" aria-hidden="true">✳</span></div><div class="about-grid"><div class="about-text"><p class="lead">I make complex things feel simple.</p><p>I bring full-stack experience and practical AI tools together to build useful products and thoughtful experiences. Based in Pune, building at Accenture.</p><a class="inline-link" href={profile.linkedin} target="_blank" rel="noreferrer">A little more about me on LinkedIn ↗</a></div><div class="about-facts"><p class="overline">THE TOOLS I REACH FOR</p><div class="skill-list">{#each skills.slice(0,6) as skill}<span>{skill}</span>{/each}</div><details class="education"><summary>Education <span>+</span></summary><h3>B.E. in Information Technology</h3><p>PVG College of Engineering, Nashik<br/>University of Pune · 2022</p><small>First Class with Distinction</small></details></div></div></section>

    <section class="experience container" id="experience" aria-labelledby="experience-title"><div class="section-heading"><div><p class="overline">03 / THE JOURNEY</p><h2 id="experience-title"><Words text="Built through experience."/><br/><Words text="Driven by curiosity."/></h2></div><a class="pill" href={profile.resume} download>Download résumé <span>↓</span></a></div><div class="journey-list"><article class="journey-step"><span>01 / THE FOUNDATION · 2023</span><h3>Start with people.</h3><p>At WNS, I learned to listen, investigate and solve real problems in technical support.</p></article><article class="journey-step"><span>02 / BUILDING INDEPENDENTLY · 2023—2024</span><h3>Ideas became products.</h3><p>As a freelance developer, I built Automart and two more e-commerce websites, turning business needs into working experiences.</p></article><article class="journey-step"><span>03 / GROWING AT ACCENTURE · 2024—PRESENT</span><h3>From Associate to Analyst.</h3><p>At Accenture, I grew from Associate to Analyst while building enterprise applications, reusable interfaces and dependable integrations.</p><details class="role-details"><summary>More about the work <span>+</span></summary><p>Working across Angular, TypeScript, APIs and enterprise systems, with a focus on performance, maintainability and solving difficult problems.</p></details></article><article class="journey-step"><span>04 / WHAT'S NEXT</span><h3>Experience, amplified by AI.</h3><p>I’m exploring how AI and sound engineering judgment can help turn ambitious ideas into products that matter.</p></article></div></section>

    <section class="contact" id="contact"><div class="container"><p class="overline">04 / GOOD THINGS START WITH A CONVERSATION</p><h2><Words text="Something in mind?"/><br/><span class="contact-word"><Words text="Let’s build it."/></span></h2><p>Hiring? Let’s have a conversation.<br/>Product owner? Let’s build your idea.<br/>Contributor or builder? Let’s build together.</p><div class="contact-actions"><a class="pill dark-pill" href={`mailto:${profile.email}`}>Say hello <span>↗</span></a><button class="copy-email" onclick={copyEmail} aria-label="Copy email address">{profile.email}<span>{copied ? '✓' : '⧉'}</span></button><span class="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span></div></div></section>
  </main>
  <footer class="container"><a class="footer-name" href="#top">Ramkrishna More<span>↗</span></a><span>Thoughtfully built. Always evolving.</span><div><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={profile.resume} target="_blank" rel="noreferrer">Résumé ↗</a></div><small>© {new Date().getFullYear()}</small></footer>
</div>

<dialog bind:this={dialog} onclose={() => selected = null} onclick={(event) => {if(event.target === dialog) dialog.close();}} onkeydown={(event) => {if(event.key === 'Escape') dialog.close();}} aria-labelledby="case-title">
  {#if selected}<div class="case"><button class="close-case" onclick={() => dialog.close()} aria-label="Close project details">✕</button><p class="overline">{selected.kind} / {selected.year}</p><h2 id="case-title">{selected.name}</h2><p class="case-headline">{selected.headline}</p><div class="case-result"><strong>{selected.metric}</strong><span>{selected.metricLabel}</span></div><h3>The build</h3><p>{selected.detail}</p>{#if selected.id === 'mtse'}<details class="engineering-note"><summary>Why a shared library?<span>+</span></summary><p>Storefront and admin applications need consistent API contracts and validation. The shared package centralizes typed CRUD helpers, roles and permissions, route configuration, and Zod schema building, so both frontends use the same rules.</p><a class="inline-link" href={`${profile.github}/mtse-shared`} target="_blank" rel="noreferrer">Inspect the shared library ↗</a></details>{/if}<h3>The outcome</h3><ul>{#each selected.outcomes as outcome}<li>{outcome}</li>{/each}</ul><div class="tags">{#each selected.stack as tech}<span>{tech}</span>{/each}</div><p class="case-note">{selected.note}</p><a class="inline-link" href={selected.id === 'mtse' ? `${profile.github}/mtse` : profile.github} target="_blank" rel="noreferrer">{selected.id === 'mtse' ? 'Explore the repository ↗' : 'Visit my GitHub ↗'}</a></div>{/if}
</dialog>
