const fs=require('fs');const {JSDOM}=require('jsdom');
const html=fs.readFileSync('calc/index.html','utf8');
const sends=[];
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://calculate.rsddirect.com/',
  beforeParse(w){ w.HTMLElement.prototype.scrollIntoView=function(){}; w.scrollTo=function(){}; w.print=function(){w.__printed=true;};
    }});
const w=dom.window;
w.emailjs={init(){}, send(svc,tpl,params){ sends.push({svc,tpl,params}); return Promise.resolve(); }};
w.navigator.sendBeacon=()=>true;
w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
const $=id=>w.document.getElementById(id);
const errs=[];const ok=(n,c)=>{console.log((c?'OK  ':'FAIL ')+n);if(!c)errs.push(n);};

// Leave a review removed
ok('Leave-a-Review CTA removed from reviews widget', !/Leave a Review/.test(html) || !w.document.querySelector('#google-reviews-widget .rsd-cta'));
// phone formatting
ok('fmtPhone US -> +1 (434) 215-4276', w.fmtPhone('4342154276')==='+1 (434) 215-4276');
ok('fmtPhone keeps US with leading 1', w.fmtPhone('14342154276')==='+1 (434) 215-4276');
ok('fmtPhone intl +44 keeps country code', /^\+44/.test(w.fmtPhone('+447700900123')));
ok('normPhone -> E.164', w.normPhone('(434) 215-4276')==='+14342154276');
ok('validatePhone accepts US 10-digit', w.validatePhone('+1 (434) 215-4276')===true);
ok('validatePhone rejects short', w.validatePhone('12345')===false);

// drive flow to submit
$('icp').value='0'; $('icp').dispatchEvent(new w.Event('change'));
$('openCalc').click(); w.buildReco();
// open modal + fill + submit
$('toReport') && $('toReport').click ? null : null;
$('f-first').value='Hans'; $('f-last').value='Raj'; $('f-email').value='hans@example.com'; $('f-phone').value='4342154276';
$('leadForm').dispatchEvent(new w.Event('submit',{cancelable:true,bubbles:true}));
ok('estimate email sent on submit', sends.length>=1);
const est=sends[0]||{params:{}};
ok('estimate email has CC to RSD', est.params.cc_email==='info@realspacedigital.net');
ok('estimate email uses correct service/template', est.svc==='service_bgsc5fk' && est.tpl==='template_3uf5wsr');
ok('estimate email phone normalized', est.params.phone==='+14342154276');
ok('estimate email has default pricing_summary', /Build your plan/.test(est.params.pricing_summary||''));

// go to pricing, build, click download pdf -> second email with pricing data
w.go('screen-pricing',4); w.buildPricing();
$('downloadPdf').click();
ok('PDF triggers a second EmailJS send', sends.length>=2);
const pr=sends[sends.length-1].params;
ok('pricing email carries plan investment breakdown', /YOUR SELECTED PLAN/.test(pr.pricing_summary||''));
ok('pricing email has CC to RSD', pr.cc_email==='info@realspacedigital.net');
ok('PDF still calls window.print()', w.__printed===true);

console.log('\nERRORS:',errs.length); process.exit(errs.length?1:0);
