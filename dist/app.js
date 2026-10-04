const buttons=[...document.querySelectorAll('[data-filter]')];
const courses=[...document.querySelectorAll('[data-board]')];
function filterClasses(board){buttons.forEach(button=>{const active=button.dataset.filter===board;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});courses.forEach(course=>{course.hidden=board!=='all'&&course.dataset.board!==board;});}
buttons.forEach(button=>button.addEventListener('click',()=>filterClasses(button.dataset.filter)));
document.querySelectorAll('[data-select]').forEach(link=>link.addEventListener('click',()=>filterClasses(link.dataset.select)));

// Progressive enhancement: content is always visible without JavaScript.
(()=>{
 const root=document.documentElement;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
 const control=document.createElement('button');control.type='button';control.className='motion-toggle';
 const progress=document.createElement('div');progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');
 document.body.append(progress,control);
 let paused=false;try{paused=localStorage.getItem('prosper-motion')==='paused';}catch{}
 const running=()=>!paused&&!reduced.matches;
 const animations=new Set();
 function animate(el,frames,options={}){
  if(!running()||typeof el.animate!=='function')return;
  const a=el.animate(frames,{duration:900,easing:'cubic-bezier(.16,1,.3,1)',...options});
  animations.add(a);a.finished.then(()=>animations.delete(a),()=>animations.delete(a));
 }
 function sync(){
  root.classList.toggle('motion-on',running());root.classList.toggle('motion-paused',!running());
  control.textContent=reduced.matches?'Reduced motion on':paused?'▶ Enable motion':'Ⅱ Pause motion';
  control.setAttribute('aria-label',reduced.matches?'Reduced motion follows your device setting':paused?'Enable website animations':'Pause website animations');
  control.setAttribute('aria-pressed',String(!running()));control.disabled=reduced.matches;
  if(!running()){animations.forEach(a=>a.cancel());document.querySelectorAll('.teacher-card,.button').forEach(el=>{el.style.removeProperty('--tilt-x');el.style.removeProperty('--tilt-y');el.style.removeProperty('translate');});}
 }
 control.addEventListener('click',()=>{paused=!paused;try{localStorage.setItem('prosper-motion',paused?'paused':'enabled');}catch{}sync();});
 reduced.addEventListener('change',sync);sync();
 const h1=document.querySelector('h1');
 if(h1){h1.setAttribute('aria-label',h1.textContent.replace(/\./g,'. '));h1.innerHTML=['Your potential.','Your people.','Your next chapter.'].map(text=>`<span class="headline-line" aria-hidden="true"><span>${text}</span></span>`).join('');h1.querySelectorAll('.headline-line>span').forEach((line,i)=>animate(line,[{transform:'translateY(115%) rotate(3deg)'},{transform:'translateY(0) rotate(0)'}],{duration:1200,delay:i*150,fill:'backwards'}));}
 document.querySelectorAll('.hero-copy>.eyebrow,.hero-copy>p,.hero-copy>.actions,.hero-note').forEach((el,i)=>animate(el,[{opacity:0,transform:'translateY(28px)'},{opacity:1,transform:'translateY(0)'}],{delay:200+i*130,fill:'backwards'}));
 const hero=document.querySelector('.hero-art');if(hero)animate(hero,[{opacity:0,clipPath:'inset(20% 15% 20% 15% round 120px)'},{opacity:1,clipPath:'inset(0% 0% 0% 0% round 15px)'}],{duration:1500});
 if('IntersectionObserver' in window){
  const reveal=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(!isIntersecting)return;animate(target,[{opacity:0,transform:'translateY(55px) scale(.97)'},{opacity:1,transform:'translateY(0) scale(1)'}],{delay:Number(target.dataset.motionDelay||0)});reveal.unobserve(target);}),{threshold:.12});
  document.querySelectorAll('.section-top,.teacher-card,.course,.consult,.future>div,.visit>div,.faq>div,.subject-strip>.wrap,footer').forEach((el,i)=>{el.dataset.motionDelay=String(el.classList.contains('teacher-card')?(i%2)*130:0);reveal.observe(el);});
  const visibility=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('motion-offscreen',!e.isIntersecting)),{rootMargin:'100px'});
  document.querySelectorAll('.hero-art,.future-art,.consult,.visit').forEach(el=>visibility.observe(el));
 }
 let scheduled=false;
 function scrollUpdate(){scheduled=false;const range=root.scrollHeight-innerHeight;progress.style.transform=`scaleX(${range>0?Math.min(1,Math.max(0,scrollY/range)):0})`;}
 addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(scrollUpdate);}},{passive:true});addEventListener('resize',scrollUpdate);scrollUpdate();
 document.querySelectorAll('.teacher-card').forEach(card=>{
  card.addEventListener('pointermove',e=>{if(!running()||!finePointer.matches)return;const r=card.getBoundingClientRect();card.style.setProperty('--tilt-x',`${-(e.clientY-r.top-r.height/2)/r.height*5}deg`);card.style.setProperty('--tilt-y',`${(e.clientX-r.left-r.width/2)/r.width*6}deg`);});
  card.addEventListener('pointerleave',()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');});
 });
 document.querySelectorAll('.button').forEach(button=>{
  button.addEventListener('pointermove',e=>{if(!running()||!finePointer.matches)return;const r=button.getBoundingClientRect();button.style.translate=`${(e.clientX-r.left-r.width/2)*.1}px ${(e.clientY-r.top-r.height/2)*.15}px`;});button.addEventListener('pointerleave',()=>button.style.removeProperty('translate'));
 });
 buttons.forEach(button=>button.addEventListener('click',()=>courses.filter(c=>!c.hidden).forEach((c,i)=>animate(c,[{opacity:0,transform:'translateX(-24px)'},{opacity:1,transform:'translateX(0)'}],{duration:500,delay:i*70}))));
 document.querySelectorAll('details').forEach(details=>details.addEventListener('toggle',()=>{if(details.open)animate(details.querySelector('p'),[{opacity:0,transform:'translateY(-8px)'},{opacity:1,transform:'translateY(0)'}],{duration:400});}));
 document.addEventListener('visibilitychange',()=>root.classList.toggle('motion-paused',document.hidden||!running()));
})();
