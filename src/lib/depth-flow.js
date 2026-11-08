export function createDepthFlow(options) {
  const root=document.documentElement;
  const wordGroups=[...document.querySelectorAll('.scroll-words')];
  const exitItems=[...document.querySelectorAll('.project,.journey-step,.side-note')];
  const themes=[['.hero',[255,255,255]],['.depth-interlude',[240,237,255]],['#work',[235,240,255]],['#about',[244,248,242]],['#experience',[255,240,230]],['#contact',[239,231,255]]].map(([selector,color])=>({el:document.querySelector(selector),color}));
  const clamp=v=>Math.min(1,Math.max(0,v));
  function update(){
    const allowed=options.allowed();
    for(const group of wordGroups){const rect=group.getBoundingClientRect();const progress=allowed?Math.min(clamp((innerHeight*.94-rect.top)/(innerHeight*.42)),clamp((rect.bottom+innerHeight*.05)/(innerHeight*.3))):1;group.style.setProperty('--word-progress',String(progress));}
    for(const item of exitItems){const rect=item.getBoundingClientRect();const exit=allowed?clamp((rect.bottom)/(innerHeight*.25)):1;item.style.setProperty('--exit',String(exit));}
    if(!allowed){root.style.setProperty('--page-bg','#fff');return;}
    const center=scrollY+innerHeight*.6;
    let color=themes[0].color;
    for(let i=1;i<themes.length;i++){const t=themes[i];if(!t.el)continue;const top=t.el.getBoundingClientRect().top+scrollY;const progress=clamp((center-top+innerHeight*.25)/(innerHeight*.65));if(progress>0) color=color.map((v,j)=>v+(t.color[j]-v)*progress);}
    root.style.setProperty('--page-bg',`rgb(${color.map(Math.round).join(' ')})`);
  }
  update();return{update,destroy(){root.style.removeProperty('--page-bg');wordGroups.forEach(g=>g.style.removeProperty('--word-progress'));exitItems.forEach(g=>g.style.removeProperty('--exit')); }};
}
