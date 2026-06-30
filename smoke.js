const fs=require('fs');const {JSDOM}=require('jsdom');
const html=fs.readFileSync('calc_final.html','utf8');
const errs=[];
const dom=new JSDOM(html,{runScripts:"dangerously",pretendToBeVisual:false,url:"https://calculate.rsddirect.com/",
  beforeParse(w){ w.scrollTo=()=>{}; w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});
    w.fetch=()=>new Promise(()=>{}); w.emailjs={init(){},send(){return Promise.resolve({status:200});}};
    w.print=()=>{}; w.setInterval=()=>0; w.requestAnimationFrame=cb=>0; }});
const w=dom.window,d=w.document;
w.addEventListener('error',e=>errs.push('win:'+e.message));
setTimeout(()=>{
 const $=id=>d.getElementById(id);
 try{
   const st=w.state;
   if(st&&st.toggles){ st.toggles.revenue=true; st.toggles.time=true; st.toggles.hassle=true; }
   w.buildLanes&&w.buildLanes();
   (w.activeProfiles?w.activeProfiles():[]).forEach(pid=>{ st.results[pid]=w.PROFILES[pid].compute(st.values[pid]); });
   w.buildReco&&w.buildReco();
 }catch(e){errs.push('flow:'+e.message);}
 const out={};
 out.recoTotal=$('recoTotal')?$('recoTotal').textContent.trim():'(none)';
 out.demoBtns=[...d.querySelectorAll('#stacks .demo-row a')].map(a=>a.getAttribute('href'));
 out.pathSolves=[...d.querySelectorAll('#stacks .path-solves')].map(p=>p.textContent.slice(0,30));
 try{ w.buildPricing&&w.buildPricing(); }catch(e){errs.push('pricing:'+e.message);}
 out.tiers=[...d.querySelectorAll('#tiers .tier')].map(t=>({
   name:t.querySelector('h3')?.textContent,
   pins:[...t.querySelectorAll('.pin')].map(p=>p.textContent),
   eyebrow:t.querySelector('.p-eyebrow')?.textContent||'',
   who:[...t.querySelectorAll('.p-who')].map(x=>x.textContent.slice(0,28)),
   bullet1:t.querySelector('li')?.textContent
 }));
 out.osBullets=[...d.querySelectorAll('#tiers .tier')].pop();
 out.osBulletsTxt = out.osBullets?[...out.osBullets.querySelectorAll('li')].map(li=>li.textContent.slice(0,50)):[];
 delete out.osBullets;
 out.addonDemo=[...d.querySelectorAll('#addonHost a.btn-demo')].map(a=>a.getAttribute('href'));
 console.log(JSON.stringify(out,null,1));
 console.log("ERRORS:",errs.length?errs:"none");
 process.exit(0);
},120);
