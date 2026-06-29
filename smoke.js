const fs=require('fs');const {JSDOM}=require('jsdom');
const html=fs.readFileSync('calc/index.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://calculate.rsddirect.com/',
  beforeParse(w){ w.HTMLElement.prototype.scrollIntoView=function(){}; w.scrollTo=function(){}; w.print=function(){w.__printed=true;}; w.emailjs={init(){},send(){return Promise.resolve();}}; }});
const w=dom.window;
w.navigator.sendBeacon=()=>true;
w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
const $=id=>w.document.getElementById(id);
const errs=[];const ok=(n,c)=>{console.log((c?'OK  ':'FAIL ')+n);if(!c)errs.push(n);};

// 1. nav bar present, back disabled at intro
ok('navbar + back/forward buttons exist', !!$('navBack') && !!$('navFwd'));
ok('back disabled on intro', $('navBack').disabled===true);
// 2. pick storefront ICP, open calc
$('icp').value='11'; $('icp').dispatchEvent(new w.Event('change')); // dive shop -> hassle
$('openCalc').click();
ok('moved to calc screen', $('screen-calc').classList.contains('active'));
ok('back enabled after navigating', $('navBack').disabled===false);
// 3. build reco directly and inspect
w.buildReco(); w.go('screen-reco',4);
const stacks=$('stacks');
ok('reco cards have path-solves', stacks.querySelectorAll('.path-solves').length>=1);
ok('reco cards have NO service <ul> list', stacks.querySelectorAll('ul').length===0);
const demoLinks=[...stacks.querySelectorAll('a.btn-demo')].map(a=>a.getAttribute('href'));
ok('reco demo button deep-links to demo page anchor', demoLinks.some(h=>/demo\.rsddirect\.com#/.test(h)));
// 4. "What this is" moved under the stacks; storefront removed
const reco=$('screen-reco');
const ovAfterStacks = $('stacks').nextElementSibling && $('stacks').nextElementSibling.id==='recoOverview';
ok('What-this-is moved directly under path cards', ovAfterStacks);
ok('storefront reco removed', $('storefrontReco')===null);
// 5. social proof present
ok('Hans Raj success quote present', !!reco.querySelector('.success-quote') && /Hans Raj/.test(reco.querySelector('.success-quote').textContent));
ok('Google reviews widget mounted', !!$('google-reviews-widget') && /rsd-grev/.test($('google-reviews-widget').innerHTML));
// 6. form hardening
ok('onlyLetters strips digits/symbols', w.onlyLetters('Jo3hn!@')==='John');
ok('fmtPhone formats US number', w.fmtPhone('4342154276')==='(434) 215-4276');
ok('validateForm rejects numeric name', (function(){$('f-first').value='Bob123';$('f-email').value='a@b.com';return w.validateForm().ok===false;})());
ok('validateForm rejects bad email', (function(){$('f-first').value='Bob';$('f-email').value='nope';return w.validateForm().ok===false;})());
ok('validateForm accepts clean input', (function(){$('f-first').value='Bob';$('f-last').value="O'Brien";$('f-email').value='a@b.com';$('f-phone').value='(434) 215-4276';return w.validateForm().ok===true;})());
// 7. pricing + PDF + print header
w.buildPricing(); w.go('screen-pricing',4);
ok('Download PDF button exists', !!$('downloadPdf'));
ok('print header exists', !!$('printHeader'));
$('downloadPdf').click(); ok('PDF button calls window.print()', w.__printed===true);
// 8. cached state: saveState writes, loadState restores
w.saveState();
ok('sessionStorage has cached state', !!w.sessionStorage.getItem('rsd_calc_v2'));
// 9. back/forward navigation
w.goBack(); ok('goBack returns to reco', $('screen-reco').classList.contains('active'));
w.goForward(); ok('goForward returns to pricing', $('screen-pricing').classList.contains('active'));
console.log('\nERRORS:',errs.length);process.exit(errs.length?1:0);
