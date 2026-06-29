const fs=require('fs');const {JSDOM}=require('jsdom');
const sends=[];
const dom=new JSDOM(fs.readFileSync('calc/index.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'https://calculate.rsddirect.com/',
  beforeParse(w){ w.HTMLElement.prototype.scrollIntoView=function(){}; w.scrollTo=function(){}; w.print=function(){w.__p=true;}; }});
const w=dom.window;
w.emailjs={init(){}, send(s,t,p){ sends.push(p); return Promise.resolve(); }};
w.navigator.sendBeacon=()=>true;
w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
const $=id=>w.document.getElementById(id);
const errs=[];const ok=(n,c)=>{console.log((c?'OK  ':'FAIL ')+n);if(!c)errs.push(n);};
// flow to pricing with a captured lead
$('icp').value='0'; $('icp').dispatchEvent(new w.Event('change'));
$('openCalc').click(); w.buildReco();
$('f-first').value='Zackary'; $('f-last').value='Jackson'; $('f-email').value='communications@zdj-ventures.com'; $('f-phone').value='4342154276';
$('leadForm').dispatchEvent(new w.Event('submit',{cancelable:true,bubbles:true}));
const afterSubmit=sends.length; // estimate email
w.go('screen-pricing',4); w.buildPricing();
// 1. Book walkthrough fires pricing email
$('bookCall').dispatchEvent(new w.Event('click',{bubbles:true}));
ok('Book-walkthrough fires pricing email', sends.length===afterSubmit+1 && /YOUR SELECTED PLAN/.test(sends[sends.length-1].pricing_summary||''));
// 2. Download PDF with same plan -> deduped (no duplicate)
$('downloadPdf').click();
ok('Download PDF deduped identical pricing (no spam)', sends.length===afterSubmit+1 && w.__p===true);
// 3. change plan -> Free audit fires a new pricing email
w.state.selectedPkg='pkg_os'; w.buildPricing();
$('toAudit2').click();
ok('Free-audit fires pricing email after plan change', sends.length===afterSubmit+2);
ok('latest pricing email has CC to RSD', sends[sends.length-1].cc_email==='info@realspacedigital.net');
ok('latest pricing email reflects chosen plan name', (sends[sends.length-1].plan_name||'').length>0);
console.log('\nERRORS:',errs.length);process.exit(errs.length?1:0);
