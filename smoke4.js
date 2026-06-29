const fs=require('fs');const {JSDOM}=require('jsdom');
const dom=new JSDOM(fs.readFileSync('calc/index.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'https://calculate.rsddirect.com/',
  beforeParse(w){ w.HTMLElement.prototype.scrollIntoView=function(){}; w.scrollTo=function(){}; }});
const w=dom.window; w.emailjs={init(){},send(){return Promise.resolve();}}; w.navigator.sendBeacon=()=>true;
w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
const $=id=>w.document.getElementById(id);
// enable all three focuses
$('icp').value='16'; $('icp').dispatchEvent(new w.Event('change'));
$('openCalc').click();
$('f-first').value='Zackary'; $('f-email').value='z@example.com';
$('leadForm').dispatchEvent(new w.Event('submit',{cancelable:true,bubbles:true}));
const p=w.buildLeadPayload();
console.log('breakdown:\n'+p.breakdown);
console.log('profile_label_human:', p.profile_label_human);
const ok = /Lost revenue prevention/.test(p.breakdown) && /Save time & win bookings/.test(p.breakdown) && /Reduce hassle & stress/.test(p.breakdown) && !/Design-Build|Event Venue|Storefront/.test(p.breakdown);
console.log(ok ? 'OK breakdown uses focus labels (no ICP archetypes)':'FAIL');
process.exit(ok?0:1);
