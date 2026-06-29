/* ====================== SHARED CONFIG (cloned from live) ====================== */
var RSD_CONFIG = {
  LEAD_WEBHOOK_URL: "https://services.leadconnectorhq.com/hooks/LjdaKqrcYOPlIye3j9O6/webhook-trigger/e48376b4-3b34-4c61-824e-6426e39ba2fc",
  CTA_URL: "https://calendly.com/realspacedigital/30min",
  AUDIT_URL: "https://calendly.com/realspacedigital/business-audit-discovery",
  EMAILJS: { PUBLIC_KEY:"6OzKpW_yrm-g1htg4", SERVICE_ID:"service_bgsc5fk", TEMPLATE_ID:"template_3uf5wsr", RSD_EMAIL:"info@realspacedigital.net" }
};

/* ===== Demo page wiring — each "See demo" button deep-links to its focus anchor on the demo page.
   Anchors mirror the Genie Vee Demo Page Story Scripts (one hero + ten service scripts).
   Where the calculator has no exact demo yet, we point to the closest anchor as a HOLDING ZONE
   so every button is live; the demo page makes the unclear clear. ===== */
var DEMO_BASE = "https://demo.rsddirect.com";
var DEMO_ANCHORS = {
  /* calculator service keys -> demo anchors */
  "virtualtour":"#tour-to-booking",
  "tour2booking":"#tour-to-booking",
  "authority":"#always-on-authority",
  "flywheel":"#reputation-flywheel",
  "avatar-social":"#social-avatar",
  "twin":"#digital-twin",
  "social":"#social-avatar",
  "photo":"#product-photo",
  "seasonal":"#seasonal-shoots",
  "rapid":"#always-on-authority",      /* live web booking agent demo */
  "rapid-voice":"#always-on-operations", /* after-hours phone receptionist — holding zone */
  /* package keys -> demo anchors */
  "pkg_t2b":"#tour-to-booking",
  "pkg_ao":"#always-on-authority",
  "pkg_os":"#conversion-os",
  "store_first":"#always-on-operations"
};
function demoUrl(key){ return DEMO_BASE + (DEMO_ANCHORS[key] || "/"); }
/* Build a "See demo" button. key=anchor key, label optional, small=compact. */
function demoBtn(key, label, small){
  return '<a class="btn btn-demo'+(small?" sm":"")+'" href="'+demoUrl(key)+'" target="_blank" rel="noopener">▶ '+(label||"See the demo")+'</a>';
}

var PHASE1_NAMES = {
  "virtualtour":"Matterport Virtual Tour",
  "tour2booking":"Tour2Booking™ — 24/7 capture & booking",
  "authority":"AlwaysOn Authority Page",
  "flywheel":"Reputation Flywheel Video Package",
  "avatar-social":"Social Avatar Presence Program"
};

/* ===== Single source of pricing truth — mirrors qualify.rsddirect.com /public/pricing.js ===== */
var PRICING = {
  note:"Pricing mirrors the canonical RSD funnel table. One-time package prices shown.",
  tiers:[
    { key:"pkg_t2b", name:"Tour2Booking", sub:"Turn your virtual tour into a 24/7 booking machine.",
      price:5549, includes:["Tour2Booking™ — book inside the tour","AlwaysOn Authority Page","Instant lead capture & alerts","Review & reputation basics"] },
    { key:"pkg_ao", name:"AlwaysOn Tour2Booking", sub:"Answer, qualify and book on its own — day or night.",
      price:6549, includes:["Everything in Tour2Booking","RSD Rapid Response live web booking agent (Afterhours & Weekends phone optional)","AlwaysOn answering & qualifying","Reputation Flywheel video","Automated follow-up"] },
    { key:"pkg_os", name:"AlwaysOn Digital Twin Conversion OS", sub:"The full stack — capture, convert, retain, on autopilot.",
      price:9549, includes:["Everything in AlwaysOn Tour2Booking","RSD Rapid Response live web booking agent included (toggle on Afterhours & Weekends phone)","Social Avatar Presence Program","Reactivation & nurture engine","Priority build + quarterly strategy"] }
  ],
  /* Premium add-on — flashing-green upgrade. Price hidden until the pricing page. */
  twin:{ key:"dt_avatar", name:"True Digital Twin Avatar Clone", price:9000, downPct:25,
    videos:6,
    sub:"A true-voice, true-likeness digital clone of you, your spokesperson, or a company rep — for infinite scale. Comes with 6 featured True Avatar Videos produced and ready to deploy." },
  /* AlwaysOn RSD Rapid Response — live web booking & FAQ agent (standalone), with an optional
     after-hours & weekends phone-receptionist upgrade toggled on top. INCLUDED with AlwaysOn packages (pkg_ao, pkg_os). */
  rapid:{
    inPackages:["pkg_ao","pkg_os"],
    base:{ key:"rr_web", name:"AlwaysOn RSD Rapid Response — Live Web Booking & FAQ Agent",
      monthly:497,
      sub:"A 24/7 live web agent that answers your FAQs, qualifies visitors, and books appointments right on your existing business page — trained on your pricing, your services, your company culture, and how you want it to handle inquiries. Booking to one calendar or a shared calendar is included.",
      usage:"Up to $50/mo of per-text and per-call usage is included; anything beyond is billed to the card on file." },
    voice:{ key:"rr_voice", name:"Afterhours & Weekends AlwaysOn Phone Support & Bookings Receptionist",
      monthly:250,
      sub:"Pair the web agent with a full phone receptionist — 24/7 extended hours, availability, and booking for after-hours, when you're unavailable, and weekends — so you capture the 53% of leads shopping while you're closed." },
    setupFee:450,
    setupNote:"AlwaysOn systems include a one-time setup commitment: on average 3 dedicated setup meetings with the RSD team and a $450 setup fee." },
  /* Social Avatar Presence Program — 3 levels, priced from the funnel social rates (soc1/2/3).
     Post counts are sensible defaults — confirm against the funnel's social page. */
  social:{ key:"social", name:"Social Avatar Presence Program",
    sub:"Your company's mascot — on 24/7, like a real person, without the video shoots, makeup, or hours out of your week. Send us your existing footage; we turn it into polished, planned content for launches, events, and special campaigns.",
    levels:[
      { key:"soc1", name:"Essentials", posts:"2 posts / week (~8 / mo)",  monthly:750 },
      { key:"soc2", name:"Growth",     posts:"4 posts / week (~16 / mo)", monthly:1500 },
      { key:"soc3", name:"Dominate",   posts:"6 posts / week (~26 / mo)", monthly:2250 }
    ] },
  /* Founder Lock tiers (from canonical table) */
  founder:{ gf1:0.05, gf2:0.10, gf3:0.15, priorityFee:497 },

  /* Seasonal Campaign Boosters — optional one-time upgrades (funnel seas_* rates) */
  seasonal:{ name:"Seasonal Campaign Boosters",
    sub:"Optional, on-trend campaign shoots that keep your brand fresh through the year — capture the moment, post all season.",
    items:[
      { key:"seas_spring",  name:"Spring Campaign",        price:1850 },
      { key:"seas_summer",  name:"Summer Campaign",        price:1850 },
      { key:"seas_harvest", name:"Harvest / Fall Campaign", price:2150 },
      { key:"seas_winter",  name:"Winter Campaign",        price:1650 },
      { key:"seas_annual",  name:"All-Season Annual (all four, save)", price:6800 }
    ] },

  /* ===== Storefront-only add-ons (show only when the Storefront path is selected) ===== */
  store:{
    online:{ key:"store_first", name:"Online Store — First Phase", price:4450,
      benefits:"In-store pickup with pickup-store selected at checkout — convenient online ordering first, more foot traffic into the store, and built to scale into shipping later.",
      sub:"Phase one of your digital storefront — one-time build." },
    support:{ name:"Online Store Support & Management",
      sub:"Storefront upkeep, SKU updates, and order-flow refinement — handled for you.",
      base:747, /* +33% per doubling of volume */
      levels:[
        { key:"store_20", name:"Up to 20 SKUs / 10 services" },
        { key:"store_40", name:"Up to 40 SKUs / 20 services" },
        { key:"store_80", name:"Up to 80 SKUs / 40 services" }
      ] }
  },
  photo:{ name:"Product Photo Shoot",
    sub:"Scroll-stopping product imagery — your catalog shot, styled, and retouched to sell, so every SKU looks worth its price online.",
    benefits:"Professional, conversion-ready product photography that makes your storefront look the part and lifts every listing.",
    levels:[
      { key:"photo_1_3",  name:"1–3 products",        price:350 },
      { key:"photo_6_9",  name:"6–9 products",        price:850 },
      { key:"photo_9_12", name:"9–12 products",       price:1300 },
      { key:"photo_vol",  name:"20+ products (volume)", price:2200 }
    ] }
};
/* Derive store-support monthly prices: base, then +33% per doubling. */
(function(){
  var b=PRICING.store.support.base, lv=PRICING.store.support.levels;
  lv[0].monthly=b;
  lv[1].monthly=Math.round(b*1.33);
  lv[2].monthly=Math.round(lv[1].monthly*1.33);
})();
/* Plain-language context for each recommended service (shown on the pre-pricing page). */
var SERVICE_DESC = {
  "virtualtour":"An immersive 3D Matterport walkthrough of your space — the foundation that lets prospects explore and book 24/7, even after hours.",
  "tour2booking":"Your virtual tour becomes a booking tool — visitors book right inside it, 24/7, even after hours and on weekends.",
  "authority":"An always-on page that answers, qualifies, and captures every inquiry automatically, so nothing slips when you're not there.",
  "flywheel":"A reputation video package that turns your happy clients into a steady stream of trust, proof, and referrals.",
  "avatar-social":"Your social presence on autopilot — a branded avatar tells your story consistently without you posting every day."
};
/* band -> package key (higher rank wins across lanes) */
var BAND_TIER = {
  "Focused start":"pkg_t2b","Booking-first":"pkg_ao","Momentum":"pkg_os",
  "Trust-first":"pkg_t2b","Reputation":"pkg_ao","Leverage":"pkg_os",
  "Streamline start":"pkg_t2b","Automate":"pkg_ao","Always-On Ops":"pkg_os"
};
var TIER_RANK = { pkg_t2b:1, pkg_ao:2, pkg_os:3 };

/* Range-driven recommendation per profile (cloned + storefront added). */
var RECOMMEND = {
  designbuild:[
    { min:0,      band:"Trust-first", consider:"authority",     also:["flywheel"] },
    { min:200000, band:"Reputation",  consider:"flywheel",      also:["authority"] },
    { min:500000, band:"Leverage",    consider:"avatar-social", also:["authority","flywheel"] }
  ],
  venues:[
    { min:0,      band:"Focused start", consider:"authority",    also:["virtualtour"] },
    { min:80000,  band:"Booking-first", consider:"tour2booking", also:["virtualtour","authority"] },
    { min:250000, band:"Momentum",      consider:"flywheel",     also:["tour2booking","virtualtour","authority"] }
  ],
  storefront:[
    { min:0,      band:"Streamline start", consider:"authority",     also:[] },
    { min:60000,  band:"Automate",         consider:"tour2booking",  also:["authority"] },
    { min:150000, band:"Always-On Ops",    consider:"avatar-social", also:["tour2booking","authority"] }
  ]
};

/* ====================== THREE ICP PROFILES ====================== */
/* toggle key -> profile id. Each lane has its own lane color. */
var PROFILES = {
  /* TOGGLE: revenue (Lost Revenue Prevention) */
  designbuild:{
    id:"designbuild", toggle:"revenue", lane:"var(--green)", color:"#5FD08A",
    label:"Design-Build", icp:"Lost revenue",
    title:"Revenue sitting in your past-client list & lost leads",
    inputs:[
      { key:"pastClients", label:"Past clients in your database", min:0, max:2000, step:5, default:120, format:"number" },
      { key:"reactivationRate", label:"Realistic annual reactivation", min:0, max:50, step:1, default:6, format:"percent" },
      { key:"avgProjectValue", label:"Average project value", min:0, max:1000000, step:5000, default:85000, format:"currency" },
      { key:"estimatesPerMonth", label:"Estimates / site visits per month", min:0, max:60, step:1, default:8, format:"number" },
      { key:"deadEstimatePct", label:"Estimates that never close", min:0, max:100, step:1, default:70, format:"percent" },
      { key:"hoursPerEstimate", label:"Hours per estimate", min:0, max:20, step:0.5, default:4, format:"number" },
      { key:"ownerHourValue", label:"Your hour is worth", min:0, max:1000, step:25, default:200, format:"currency" }
    ],
    compute:function(s){
      var reactivated=s.pastClients*(s.reactivationRate/100);
      var idleRevenue=reactivated*s.avgProjectValue;
      var deadEst=s.estimatesPerMonth*(s.deadEstimatePct/100);
      var wastedHrs=deadEst*s.hoursPerEstimate*12;
      var timeLeak=wastedHrs*s.ownerHourValue;
      return { hero:idleRevenue+timeLeak,
        breakdown:"≈ "+reactivated.toFixed(1)+" past clients would build again — plus the cost of time lost to bids that never close.",
        metrics:[ {label:"Revenue waiting in your list",value:fmt(idleRevenue)},
                  {label:"Value of time lost bidding",value:fmt(timeLeak)} ] };
    }
  },
  /* TOGGLE: time (Save Time & Win Bookings) */
  venues:{
    id:"venues", toggle:"time", lane:"var(--amber)", color:"#F2A93B",
    label:"Event Venue", icp:"Time & bookings",
    title:"What slow replies cost your venue",
    inputs:[
      { key:"monthlyInquiries", label:"Monthly inquiries", min:0, max:500, step:1, default:50, format:"number" },
      { key:"afterHoursPct", label:"After-hours share", min:0, max:100, step:1, default:65, format:"percent" },
      { key:"slowResponseLossPct", label:"Lost to late replies", min:0, max:100, step:1, default:20, format:"percent" },
      { key:"tourToBookingPct", label:"Tour-to-booking rate", min:0, max:100, step:1, default:25, format:"percent" },
      { key:"avgBookingValue", label:"Average booking value", min:0, max:100000, step:500, default:10000, format:"currency" }
    ],
    compute:function(s){
      var afterHours=s.monthlyInquiries*(s.afterHoursPct/100);
      var lost=afterHours*(s.slowResponseLossPct/100);
      var lostBookings=lost*(s.tourToBookingPct/100);
      var annual=lostBookings*s.avgBookingValue*12;
      return { hero:annual,
        breakdown:"≈ "+lostBookings.toFixed(1)+" bookings a month slip away → "+fmt(annual)+" a year.",
        metrics:[ {label:"Bookings slipping away monthly",value:lostBookings.toFixed(1)},
                  {label:"Prime dates are invaluable",value:"~52 / yr"} ] };
    }
  },
  /* TOGGLE: hassle (Reduce Hassle, Manual Workflows & Stress) */
  storefront:{
    id:"storefront", toggle:"hassle", lane:"var(--violet)", color:"#B79CFF",
    label:"Storefront / Service", icp:"Hassle & stress",
    title:"The cost of manual work and missed walk-in demand",
    inputs:[
      { key:"weeklyManualHours", label:"Hours a week on manual admin & repeat tasks", min:0, max:80, step:1, default:15, format:"number" },
      { key:"teamHourValue", label:"What an hour of that time is worth", min:0, max:500, step:5, default:75, format:"currency" },
      { key:"monthlyInquiries", label:"Calls, messages & online inquiries a month", min:0, max:1000, step:5, default:80, format:"number" },
      { key:"missedResponsePct", label:"Share missed or answered too late", min:0, max:100, step:1, default:30, format:"percent" },
      { key:"inquiryToSalePct", label:"Share of answered inquiries that buy", min:0, max:100, step:1, default:35, format:"percent" },
      { key:"avgTicket", label:"Average sale value", min:0, max:50000, step:100, default:1200, format:"currency" }
    ],
    compute:function(s){
      var wastedHrs=s.weeklyManualHours*52;
      var timeCost=wastedHrs*s.teamHourValue;
      var missed=s.monthlyInquiries*(s.missedResponsePct/100);
      var lostSalesMo=missed*(s.inquiryToSalePct/100);
      var lostSalesYr=lostSalesMo*s.avgTicket*12;
      return { hero:timeCost+lostSalesYr,
        breakdown:"≈ "+Math.round(wastedHrs).toLocaleString()+" hours a year on manual work, plus "+fmt(lostSalesYr)+" in missed sales.",
        metrics:[ {label:"Hours a year you could reclaim",value:Math.round(wastedHrs).toLocaleString()},
                  {label:"Missed sales a year",value:fmt(lostSalesYr)} ] };
    }
  }
};

/* Toggle definitions in display order */
var TOGGLES = [
  { key:"revenue", profile:"designbuild", title:"Lost revenue prevention", sub:"Leads & jobs slipping away that you never recover.", icp:"Design-Build" },
  { key:"time",    profile:"venues",      title:"Save time & win bookings", sub:"Slow replies and after-hours inquiries that book elsewhere.", icp:"Event Venue" },
  { key:"hassle",  profile:"storefront",  title:"Reduce hassle & stress",  sub:"Manual workflows and missed demand draining your team.", icp:"Storefront / Service" }
];

/* Headline label for a profile = the FOCUS the visitor switched on (first-page selection),
   not the internal ICP archetype. Keeps reco/calculator headings in line with what they picked. */
function focusTitle(pid){
  for(var i=0;i<TOGGLES.length;i++){ if(TOGGLES[i].profile===pid) return TOGGLES[i].title; }
  return PROFILES[pid] ? PROFILES[pid].label : pid;
}

/* ICP dropdown — every business RSD fits, each pre-selecting its primary focus */
var ICP_OPTIONS = [
  { label:"Event venue / event space", on:["time"] },
  { label:"Vineyard / winery", on:["time"] },
  { label:"Wedding venue", on:["time"] },
  { label:"Hotel / resort / retreat", on:["time"] },
  { label:"Museum / attraction / tour", on:["time"] },
  { label:"Design-build firm", on:["revenue"] },
  { label:"Custom home builder", on:["revenue"] },
  { label:"Remodeler / renovation", on:["revenue"] },
  { label:"Deck, fence & outdoor living", on:["revenue"] },
  { label:"Landscape / hardscape", on:["revenue"] },
  { label:"Pool & spa builder", on:["revenue"] },
  { label:"Dive shop / scuba center", on:["hassle"] },
  { label:"Stone & countertop showroom", on:["hassle"] },
  { label:"Specialty / luxury retail", on:["hassle"] },
  { label:"Auto / marine / powersports", on:["hassle"] },
  { label:"Med spa / aesthetics clinic", on:["hassle"] },
  { label:"Other high-ticket local business", on:["revenue","time","hassle"] }
];

/* ====================== STATE ====================== */
var state = {
  icp:"",
  toggles:{ revenue:false, time:false, hassle:false },
  upgradeTwin:false,
  social:{ added:false, level:"soc2" },
  rapid:{ webAdded:false, voiceAdded:false }, // standalone web agent toggle + after-hours phone toggle
  seasonal:{},              // key -> true (multi-select boosters)
  store:{ online:false, supportLevel:null },  // storefront online store + support tier
  photo:{ level:null },     // product photo shoot tier
  selectedPkg:null,
  values:{}, // profileId -> {key:val}
  results:{} // profileId -> compute result
};
// seed input defaults
Object.keys(PROFILES).forEach(function(pid){
  state.values[pid]={};
  PROFILES[pid].inputs.forEach(function(i){ state.values[pid][i.key]=i.default; });
});

/* ====================== HELPERS ====================== */
function fmt(n){ n=Math.round(n||0); return "$"+n.toLocaleString("en-US"); }
function fmtInput(v,format){
  if(format==="currency") return "$"+Number(v).toLocaleString("en-US");
  if(format==="percent") return v+"%";
  return Number(v).toLocaleString("en-US");
}
function activeProfiles(){
  return TOGGLES.filter(function(t){return state.toggles[t.key];}).map(function(t){return t.profile;});
}
function recommend(profileId, hero){
  var bands=RECOMMEND[profileId]; var pick=bands[0];
  for(var i=0;i<bands.length;i++){ if(hero>=bands[i].min) pick=bands[i]; }
  return pick;
}
function $(id){ return document.getElementById(id); }

/* ====================== SCREEN NAV ====================== */
function showScreen(id, step){
  ["screen-intro","screen-calc","screen-reco","screen-pricing","screen-audit"].forEach(function(s){
    $(s).classList.toggle("active", s===id);
  });
  // stepper
  [1,2,3,4].forEach(function(n){ var el=document.querySelector(".stepper .s"+n); if(el) el.classList.toggle("on", n<=step); });
  window.scrollTo({top:0,behavior:"smooth"});
}

/* ====================== SCREEN 1: build toggles + dropdown ====================== */
function buildIntro(){
  var sel=$("icp");
  ICP_OPTIONS.forEach(function(o,idx){
    var opt=document.createElement("option"); opt.value=idx; opt.textContent=o.label; sel.appendChild(opt);
  });
  sel.addEventListener("change", function(){
    var o=ICP_OPTIONS[this.value];
    state.toggles={revenue:false,time:false,hassle:false};
    if(o){ o.on.forEach(function(k){ state.toggles[k]=true; }); }
    state.icp = o ? o.label : "";
    renderToggles(); refreshIntroCTA();
  });

  var grid=$("toggles");
  TOGGLES.forEach(function(t){
    var p=PROFILES[t.profile];
    var b=document.createElement("button");
    b.className="tog"; b.type="button"; b.setAttribute("aria-pressed","false");
    b.style.setProperty("--lane",p.color);
    b.dataset.key=t.key;
    b.innerHTML =
      '<span class="check">✓</span>'+
      '<span class="t-top"><span class="dot"></span><span class="t-icp">'+t.icp+'</span></span>'+
      '<span class="t-title">'+t.title+'</span>'+
      '<span class="t-sub">'+t.sub+'</span>';
    b.addEventListener("click", function(){
      state.toggles[t.key]=!state.toggles[t.key];
      renderToggles(); refreshIntroCTA();
    });
    grid.appendChild(b);
  });
  renderToggles(); refreshIntroCTA();
}
function renderToggles(){
  Array.prototype.forEach.call(document.querySelectorAll(".tog"),function(b){
    b.setAttribute("aria-pressed", state.toggles[b.dataset.key] ? "true":"false");
  });
}
function refreshIntroCTA(){
  var any=activeProfiles().length>0;
  $("openCalc").disabled=!any;
  $("introHint").textContent = any ? "We'll open "+activeProfiles().length+" calculator"+(activeProfiles().length>1?"s":"")+" for you." : "Switch on at least one focus above to continue.";
}

/* ====================== SCREEN 2: lanes ====================== */
function buildLanes(){
  var host=$("lanes"); host.innerHTML="";
  activeProfiles().forEach(function(pid){
    var p=PROFILES[pid];
    var lane=document.createElement("div");
    lane.className="lane"; lane.style.setProperty("--lane",p.color);
    var rows="";
    p.inputs.forEach(function(inp){
      var v=state.values[pid][inp.key];
      rows+='<div class="row">'+
        '<div class="rl"><span class="name">'+inp.label+'</span><span class="val" id="v-'+pid+'-'+inp.key+'">'+fmtInput(v,inp.format)+'</span></div>'+
        '<input type="range" min="'+inp.min+'" max="'+inp.max+'" step="'+inp.step+'" value="'+v+'" '+
        'data-pid="'+pid+'" data-key="'+inp.key+'" data-format="'+inp.format+'"></div>';
    });
    lane.innerHTML =
      '<div class="lane-icp">'+p.icp+'</div>'+
      '<h3>'+focusTitle(pid)+' calculator</h3>'+
      '<div class="lane-num" id="num-'+pid+'">$0</div>'+
      '<div class="lane-break" id="break-'+pid+'"></div>'+
      rows+
      '<div class="metrics" id="metrics-'+pid+'"></div>';
    host.appendChild(lane);
  });
  Array.prototype.forEach.call(host.querySelectorAll('input[type=range]'),function(r){
    r.addEventListener("input", function(){
      var pid=this.dataset.pid, key=this.dataset.key;
      state.values[pid][key]=parseFloat(this.value);
      $("v-"+pid+"-"+key).textContent=fmtInput(this.value,this.dataset.format);
      computeLane(pid); updateTotal();
    });
  });
  activeProfiles().forEach(computeLane);
  updateTotal();
}
function computeLane(pid){
  var p=PROFILES[pid];
  var r=p.compute(state.values[pid]);
  state.results[pid]=r;
  $("num-"+pid).textContent=fmt(r.hero);
  $("break-"+pid).textContent=r.breakdown;
  var m=$("metrics-"+pid); m.innerHTML="";
  r.metrics.forEach(function(x){
    var d=document.createElement("div"); d.className="m";
    d.innerHTML='<div class="ml">'+x.label+'</div><div class="mv">'+x.value+'</div>';
    m.appendChild(d);
  });
}
function totalLeak(){
  return activeProfiles().reduce(function(sum,pid){ return sum + (state.results[pid]?state.results[pid].hero:0); },0);
}
function updateTotal(){
  var banner=$("totalBanner");
  if(activeProfiles().length>1){ banner.style.display="flex"; $("totalNum").textContent=fmt(totalLeak()); }
  else { banner.style.display="none"; }
}

/* Concise "what problem this path solves" per focus — shown on the reco cards. */
var PATH_SOLVES = {
  designbuild: "Stops the quiet bleed of jobs lost to slow replies and dead estimates — and turns your past-client list and missed leads back into booked, high-ticket work.",
  venues: "Captures the after-hours and weekend inquiries you're missing and books them on the spot, so prime dates stop slipping to whoever answered first.",
  storefront: "Removes the manual busywork and answers every call, message, and walk-in lead automatically — so missed demand and wasted hours stop draining your team."
};
/* ====================== SCREEN 3: recommendation ====================== */
function buildReco(){
  var host=$("stacks"); host.innerHTML="";
  activeProfiles().forEach(function(pid){
    var p=PROFILES[pid]; var r=state.results[pid]||p.compute(state.values[pid]);
    var rec=recommend(pid, r.hero);
    var card=document.createElement("div");
    card.className="stack"; card.style.setProperty("--lane",p.color);
    card.innerHTML=
      '<div class="band">'+p.icp+' · '+rec.band+'</div>'+
      '<h3>'+focusTitle(pid)+' — '+fmt(r.hero)+' at stake</h3>'+
      '<p class="path-solves">'+(PATH_SOLVES[pid]||"")+'</p>'+
      '<div class="demo-row">'+demoBtn(rec.consider, "See this in the demo", true)+'</div>';
    host.appendChild(card);
  });
  // reflect twin upgrade state (no price here)
  var tu=$("twinUp"), btn=$("twinToggle");
  tu.classList.toggle("added", state.upgradeTwin);
  btn.textContent = state.upgradeTwin ? "✓ True Digital Twin added — tap to remove" : "⚡ Add the True Digital Twin →";
  // layout: move "What this is" under the path cards; drop the storefront reco section
  var _ov=$("recoOverview"), _st=$("stacks"); if(_ov&&_st&&_st.parentNode){ _st.parentNode.insertBefore(_ov, _st.nextSibling); }
  var _sf=$("storefrontReco"); if(_sf) _sf.parentNode.removeChild(_sf);
  // reflect social add-on state (no price here)
  var su=$("socialUp"), sbtn=$("socialToggle");
  su.classList.toggle("added", state.social.added);
  sbtn.textContent = state.social.added ? "✓ Social Avatar added — tap to remove" : "＋ Add Social Avatar — pick your level next";
}

/* ====================== SCREEN 4: pricing ====================== */
function topTierKey(){
  var rank=0, key="pkg_t2b";
  activeProfiles().forEach(function(pid){
    var r=state.results[pid]||PROFILES[pid].compute(state.values[pid]);
    var rec=recommend(pid,r.hero); var tk=BAND_TIER[rec.band]||"pkg_t2b";
    if(TIER_RANK[tk]>rank){ rank=TIER_RANK[tk]; key=tk; }
  });
  return key;
}
function buildPricing(){
  var host=$("tiers"); host.innerHTML=""; var reco=topTierKey();
  if(!state.selectedPkg) state.selectedPkg=reco;     // default selection = recommended
  PRICING.tiers.forEach(function(t){
    var isSel=(t.key===state.selectedPkg), isReco=(t.key===reco);
    var div=document.createElement("div");
    div.className="tier"+(isSel?" reco":"");
    var lis=t.includes.map(function(x){return '<li>'+x+'</li>';}).join("");
    div.innerHTML=
      (isReco?'<span class="pin">Recommended for you</span>':'')+
      '<h3>'+t.name+'</h3>'+
      '<p class="p-sub">'+t.sub+'</p>'+
      '<div class="p-price">'+fmt(t.price)+'<small> one-time</small></div>'+
      '<div class="p-setup">Founder Lock pricing available</div>'+
      '<ul>'+lis+'</ul>'+
      '<button class="btn '+(isSel?"btn-amber":"btn-ghost")+'" data-pkg="'+t.key+'">'+(isSel?"✓ Selected":"Select "+t.name)+'</button>';
    host.appendChild(div);
  });
  Array.prototype.forEach.call(host.querySelectorAll("button[data-pkg]"), function(b){
    b.addEventListener("click", function(){ state.selectedPkg=this.dataset.pkg; buildPricing(); });
  });
  var ah=$("addonHost"); ah.innerHTML="";

  // ---- AlwaysOn RSD Rapid Response — live web booking agent + after-hours/weekends phone toggle ----
  // Included free with AlwaysOn packages (pkg_ao, pkg_os); $497/mo standalone otherwise.
  var rr=PRICING.rapid;
  var rrPkg=PRICING.tiers.filter(function(t){return t.key===state.selectedPkg;})[0]||{};
  var isAO=rr.inPackages.indexOf(state.selectedPkg)!==-1;   // package bundles the web agent
  var webOn=isAO||state.rapid.webAdded;                     // web agent present at all?
  if(state.rapid.voiceAdded && !webOn){ state.rapid.webAdded=true; webOn=true; } // phone needs the base
  var rrEl=document.createElement("div");
  rrEl.className="rr-card"+(webOn?" added":"");
  var baseLine=isAO
    ? '<span class="rr-incl">✓ Included with your '+(rrPkg.name||"AlwaysOn")+' package</span>'
    : '<div class="rr-price">'+fmt(rr.base.monthly)+'<small> /mo</small></div>';
  var baseBtn=isAO
    ? '<div class="btn-row" style="margin-top:12px;">'+demoBtn("rapid","See the demo",true)+'</div>'
    : '<div class="btn-row" style="margin-top:14px;">'+
        '<button class="btn '+(state.rapid.webAdded?"btn-ghost":"btn-social")+'" id="rrWebToggle">'+(state.rapid.webAdded?"Remove Rapid Response agent":"＋ Add Rapid Response agent — "+fmt(rr.base.monthly)+"/mo")+'</button>'+
        demoBtn("rapid","See the demo",true)+
      '</div>';
  rrEl.innerHTML=
    '<div class="rr-ey">AlwaysOn · Rapid Response receptionist'+(webOn?" · Active":"")+'</div>'+
    '<h3>'+rr.base.name+'</h3>'+
    '<p class="p-sub" style="max-width:66ch;">'+rr.base.sub+'</p>'+
    baseLine+
    baseBtn+
    '<div class="rr-switch'+(state.rapid.voiceAdded?" on":"")+'" id="rrVoiceSwitch">'+
      '<button class="sw" type="button" role="switch" aria-checked="'+(state.rapid.voiceAdded?"true":"false")+'" aria-label="Turn on Afterhours and Weekends phone receptionist"></button>'+
      '<span class="sw-label"><b>Add Afterhours &amp; Weekends Phone Support &amp; Bookings Receptionist — +'+fmt(rr.voice.monthly)+'/mo</b>'+
        '<span class="sw-sub">'+rr.voice.sub+'</span></span>'+
    '</div>'+
    '<div class="rr-fine">'+rr.base.usage+' '+rr.setupNote+(webOn?'':' (Setup &amp; monthly activate when you add the agent or choose an AlwaysOn package.)')+'</div>';
  ah.appendChild(rrEl);
  var rwt=$("rrWebToggle");
  if(rwt) rwt.addEventListener("click", function(){ state.rapid.webAdded=!state.rapid.webAdded; if(!state.rapid.webAdded) state.rapid.voiceAdded=false; buildPricing(); });
  var rvs=$("rrVoiceSwitch");
  if(rvs){
    var toggleVoice=function(){ state.rapid.voiceAdded=!state.rapid.voiceAdded; buildPricing(); };
    var swEl=rvs.querySelector(".sw"); if(swEl) swEl.addEventListener("click", toggleVoice);
    var lblEl=rvs.querySelector(".sw-label"); if(lblEl) lblEl.addEventListener("click", toggleVoice);
  }

  // ---- Social Avatar Presence Program (3 levels) — True Twin sits directly below this ----
  var soc=PRICING.social;
  var lvlHtml=soc.levels.map(function(l){
    var sel = state.social.added && state.social.level===l.key;
    return '<div class="lvl'+(sel?" sel":"")+'" data-lvl="'+l.key+'">'+
      '<div class="l-name">'+l.name+'</div>'+
      '<div class="l-posts">'+l.posts+'</div>'+
      '<div class="l-price">'+fmt(l.monthly)+'<small> /mo</small></div></div>';
  }).join("");
  var socEl=document.createElement("div");
  socEl.className="addon gold"+(state.social.added?" reco":"");
  socEl.innerHTML=
    '<div class="a-ey gold">Add-on · Always-on presence'+(state.social.added?" · Added":"")+'</div>'+
    '<h3>'+soc.name+'</h3>'+
    '<p class="p-sub" style="max-width:66ch;">'+soc.sub+'</p>'+
    '<div class="lvls">'+lvlHtml+'</div>'+
    '<div class="btn-row" style="margin-top:14px;">'+
      '<button class="btn '+(state.social.added?"btn-ghost":"btn-social")+'" id="socialPriceToggle">'+(state.social.added?"Remove Social Avatar":"＋ Add Social Avatar")+'</button>'+
      demoBtn("social","See the demo",true)+
    '</div>';
  ah.appendChild(socEl);
  Array.prototype.forEach.call(socEl.querySelectorAll(".lvl"), function(el){
    el.addEventListener("click", function(){ state.social.added=true; state.social.level=this.dataset.lvl; buildPricing(); });
  });
  var spt=$("socialPriceToggle");
  if(spt) spt.addEventListener("click", function(){ state.social.added=!state.social.added; buildPricing(); });

  // ---- True Digital Twin Avatar Clone — directly BELOW Social Avatar (price + 25% down, 6 featured videos) ----
  var tw=PRICING.twin, down=Math.round(tw.price*tw.downPct/100);
  var twEl=document.createElement("div");
  twEl.className="addon"+(state.upgradeTwin?" reco":"");
  twEl.innerHTML=
    '<div class="a-ey">Premium add-on · Infinite scale'+(state.upgradeTwin?" · Added":"")+'</div>'+
    '<h3>'+tw.name+'</h3>'+
    '<p class="p-sub" style="max-width:64ch;">'+tw.sub+'</p>'+
    '<div class="a-price">'+fmt(tw.price)+' <small style="font-size:.5em;color:var(--muted);font-family:Outfit;">one-time add-on · includes '+tw.videos+' featured True Avatar Videos</small></div>'+
    '<div class="a-down">'+tw.downPct+'% down to add it on — '+fmt(down)+' to start.</div>'+
    '<div class="btn-row" style="margin-top:14px;">'+
      '<button class="btn '+(state.upgradeTwin?"btn-twin":"btn-ghost")+'" id="twinPriceToggle">'+(state.upgradeTwin?"✓ Added to your plan":"⚡ Add the True Digital Twin")+'</button>'+
      demoBtn("twin","See the demo",true)+
    '</div>';
  ah.appendChild(twEl);
  var tpt=$("twinPriceToggle");
  if(tpt) tpt.addEventListener("click", function(){ state.upgradeTwin=!state.upgradeTwin; buildPricing(); });

  // ---- Seasonal Campaign Boosters (optional, multi-select) ----
  var sea=PRICING.seasonal;
  var seaHtml=sea.items.map(function(it){
    var on=!!state.seasonal[it.key];
    return '<div class="lvl'+(on?" sel":"")+'" data-seas="'+it.key+'">'+
      '<div class="l-name">'+it.name+'</div>'+
      '<div class="l-price">'+fmt(it.price)+'<small> one-time</small></div></div>';
  }).join("");
  var seaEl=document.createElement("div");
  seaEl.className="addon gold";
  seaEl.innerHTML=
    '<div class="a-ey gold">Optional upgrade · Seasonal campaign booster</div>'+
    '<h3>'+sea.name+'</h3>'+
    '<p class="p-sub" style="max-width:66ch;">'+sea.sub+'</p>'+
    '<div class="lvls" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr));">'+seaHtml+'</div>';
  ah.appendChild(seaEl);
  Array.prototype.forEach.call(seaEl.querySelectorAll(".lvl"), function(el){
    el.addEventListener("click", function(){ var k=this.dataset.seas; if(state.seasonal[k]) delete state.seasonal[k]; else state.seasonal[k]=true; buildPricing(); });
  });

  // ---- Storefront-only add-ons (Online Store + Support + Product Photo Shoot) ----
  if(state.toggles.hassle){
    var st=PRICING.store;
    // Online Store — First Phase (one-time)
    var osEl=document.createElement("div");
    osEl.className="addon"+(state.store.online?" reco":"");
    osEl.innerHTML=
      '<div class="a-ey" style="color:var(--violet);">Storefront · Digital store'+(state.store.online?" · Added":"")+'</div>'+
      '<h3>'+st.online.name+'</h3>'+
      '<p class="p-sub" style="max-width:66ch;">'+st.online.benefits+'</p>'+
      '<div class="a-price">'+fmt(st.online.price)+' <small style="font-size:.5em;color:var(--muted);font-family:Outfit;">one-time</small></div>'+
      '<div class="btn-row" style="margin-top:14px;">'+
        '<button class="btn '+(state.store.online?"btn-ghost":"btn-social")+'" id="storeOnlineToggle">'+(state.store.online?"Remove Online Store":"＋ Add Online Store")+'</button>'+
      '</div>';
    ah.appendChild(osEl);
    var sot=$("storeOnlineToggle");
    if(sot) sot.addEventListener("click", function(){ state.store.online=!state.store.online; buildPricing(); });

    // Online Store Support & Management (monthly tiers)
    var supHtml=st.support.levels.map(function(l){
      var on=state.store.supportLevel===l.key;
      return '<div class="lvl'+(on?" sel":"")+'" data-sup="'+l.key+'">'+
        '<div class="l-name">'+l.name+'</div>'+
        '<div class="l-price">'+fmt(l.monthly)+'<small> /mo</small></div></div>';
    }).join("");
    var supEl=document.createElement("div");
    supEl.className="addon"+(state.store.supportLevel?" reco":"");
    supEl.innerHTML=
      '<div class="a-ey" style="color:var(--violet);">Storefront · Ongoing support'+(state.store.supportLevel?" · Added":"")+'</div>'+
      '<h3>'+st.support.name+'</h3>'+
      '<p class="p-sub" style="max-width:66ch;">'+st.support.sub+' Volume doubles each tier; pricing rises 33% per step.</p>'+
      '<div class="lvls">'+supHtml+'</div>'+
      '<div class="btn-row" style="margin-top:14px;">'+
        (state.store.supportLevel?'<button class="btn btn-ghost" id="supportClear">Remove Store Support</button>':'')+
      '</div>';
    ah.appendChild(supEl);
    Array.prototype.forEach.call(supEl.querySelectorAll(".lvl"), function(el){
      el.addEventListener("click", function(){ state.store.supportLevel=this.dataset.sup; buildPricing(); });
    });
    var sclr=$("supportClear");
    if(sclr) sclr.addEventListener("click", function(){ state.store.supportLevel=null; buildPricing(); });

    // Product Photo Shoot (tiers)
    var ph=PRICING.photo;
    var phHtml=ph.levels.map(function(l){
      var on=state.photo.level===l.key;
      return '<div class="lvl'+(on?" sel":"")+'" data-photo="'+l.key+'">'+
        '<div class="l-name">'+l.name+'</div>'+
        '<div class="l-price">'+fmt(l.price)+'<small> one-time</small></div></div>';
    }).join("");
    var phEl=document.createElement("div");
    phEl.className="addon gold"+(state.photo.level?" reco":"");
    phEl.innerHTML=
      '<div class="a-ey gold">Storefront add-on · Product imagery'+(state.photo.level?" · Added":"")+'</div>'+
      '<h3>'+ph.name+'</h3>'+
      '<p class="p-sub" style="max-width:66ch;">'+ph.sub+'</p>'+
      '<div class="lvls">'+phHtml+'</div>'+
      '<div class="btn-row" style="margin-top:14px;">'+
        (state.photo.level?'<button class="btn btn-ghost" id="photoClear">Remove Product Photo Shoot</button>':'')+
      '</div>';
    ah.appendChild(phEl);
    Array.prototype.forEach.call(phEl.querySelectorAll(".lvl"), function(el){
      el.addEventListener("click", function(){ state.photo.level=this.dataset.photo; buildPricing(); });
    });
    var pclr=$("photoClear");
    if(pclr) pclr.addEventListener("click", function(){ state.photo.level=null; buildPricing(); });
  } else {
    // not storefront — clear any stale storefront selections so they don't affect the total
    state.store.online=false; state.store.supportLevel=null; state.photo.level=null;
  }

  // ---- Live total + 25% deposit + monthly note ----
  var pkg=PRICING.tiers.filter(function(t){return t.key===state.selectedPkg;})[0]||PRICING.tiers[0];
  var rows='<div class="pt-row"><span class="pt-lab">'+pkg.name+' (one-time)</span><span class="pt-val">'+fmt(pkg.price)+'</span></div>';
  var oneTime=pkg.price;
  // True Twin (one-time)
  if(state.upgradeTwin){ oneTime+=PRICING.twin.price; rows+='<div class="pt-row"><span class="pt-lab">True Digital Twin Avatar Clone — incl. '+PRICING.twin.videos+' featured videos (one-time)</span><span class="pt-val">'+fmt(PRICING.twin.price)+'</span></div>'; }
  // Online Store (one-time, storefront)
  if(state.toggles.hassle && state.store.online){ oneTime+=PRICING.store.online.price; rows+='<div class="pt-row"><span class="pt-lab">'+PRICING.store.online.name+' (one-time)</span><span class="pt-val">'+fmt(PRICING.store.online.price)+'</span></div>'; }
  // Product Photo Shoot (one-time, storefront)
  var phLvl=(state.toggles.hassle&&state.photo.level)?PRICING.photo.levels.filter(function(l){return l.key===state.photo.level;})[0]:null;
  if(phLvl){ oneTime+=phLvl.price; rows+='<div class="pt-row"><span class="pt-lab">Product Photo Shoot — '+phLvl.name+' (one-time)</span><span class="pt-val">'+fmt(phLvl.price)+'</span></div>'; }
  // Seasonal boosters (one-time, multi)
  var seaSel=PRICING.seasonal.items.filter(function(it){return state.seasonal[it.key];});
  seaSel.forEach(function(it){ oneTime+=it.price; rows+='<div class="pt-row"><span class="pt-lab">'+it.name+' (one-time)</span><span class="pt-val">'+fmt(it.price)+'</span></div>'; });
  // AlwaysOn setup (3 meetings + $450) — applies whenever any AlwaysOn system is active
  var alwaysOnActive = isAO || webOn || state.rapid.voiceAdded;
  if(alwaysOnActive){ oneTime+=PRICING.rapid.setupFee; rows+='<div class="pt-row"><span class="pt-lab">AlwaysOn setup — 3 meetings + setup fee (one-time)</span><span class="pt-val">'+fmt(PRICING.rapid.setupFee)+'</span></div>'; }
  // One-time subtotal + deposit
  rows+='<div class="pt-row"><span class="pt-lab"><b>One-time investment</b></span><span class="pt-val">'+fmt(oneTime)+'</span></div>';
  var deposit=Math.round(oneTime*0.25);
  // Monthly: social + store support + rapid response
  var monthly=0, monthlyLines="";
  var socLvl=state.social.added?PRICING.social.levels.filter(function(l){return l.key===state.social.level;})[0]:null;
  if(socLvl){ monthly+=socLvl.monthly; monthlyLines+='<div class="pt-row pt-monthly"><span class="pt-lab">Social Avatar — '+socLvl.name+' (monthly)</span><span class="pt-val">'+fmt(socLvl.monthly)+' /mo</span></div>'; }
  var supLvl=(state.toggles.hassle&&state.store.supportLevel)?PRICING.store.support.levels.filter(function(l){return l.key===state.store.supportLevel;})[0]:null;
  if(supLvl){ monthly+=supLvl.monthly; monthlyLines+='<div class="pt-row pt-monthly"><span class="pt-lab">Online Store Support — '+supLvl.name+' (monthly)</span><span class="pt-val">'+fmt(supLvl.monthly)+' /mo</span></div>'; }
  // AlwaysOn Rapid Response — web booking agent (included with AlwaysOn packages, else $497/mo) + optional after-hours phone (+$250/mo)
  if(isAO){ monthlyLines+='<div class="pt-row pt-monthly"><span class="pt-lab">RSD Rapid Response — Live Web Booking Agent</span><span class="pt-val">Included</span></div>'; }
  else if(state.rapid.webAdded){ monthly+=PRICING.rapid.base.monthly; monthlyLines+='<div class="pt-row pt-monthly"><span class="pt-lab">RSD Rapid Response — Live Web Booking Agent (monthly)</span><span class="pt-val">'+fmt(PRICING.rapid.base.monthly)+' /mo</span></div>'; }
  if(state.rapid.voiceAdded){ monthly+=PRICING.rapid.voice.monthly; monthlyLines+='<div class="pt-row pt-monthly"><span class="pt-lab">Afterhours &amp; Weekends Phone Receptionist (monthly)</span><span class="pt-val">'+fmt(PRICING.rapid.voice.monthly)+' /mo</span></div>'; }
  rows+=monthlyLines;
  if(monthly){ rows+='<div class="pt-row pt-monthly"><span class="pt-lab"><b>Monthly total</b></span><span class="pt-val">'+fmt(monthly)+' /mo</span></div>'; }
  rows+='<div class="pt-row pt-deposit"><span class="pt-lab">Deposit to begin (25%)</span><span class="pt-val">'+fmt(deposit)+'</span></div>';
  var fine="To begin, your 25% deposit reserves your build and sets the project in motion. We keep a card securely on file for any monthly service retainer, activated the moment your deposit clears — so your always-on systems launch on schedule and never go dark."+
    (monthly?" Your monthly services bill at "+fmt(monthly)+"/mo from project start.":"")+
    (alwaysOnActive?" AlwaysOn Rapid Response includes up to $50/mo of per-text and per-call usage; anything beyond bills to the card on file. AlwaysOn setup is a one-time commitment of, on average, 3 dedicated meetings with our RSD team plus a $450 setup fee.":"");
  $("pricingTotal").innerHTML=
    '<div class="ptotal">'+
      '<div style="font-weight:700;font-size:1.05rem;margin-bottom:6px;">Your selection</div>'+
      rows+
      '<div class="pt-fine">'+fine+'</div>'+
    '</div>';
}

/* ====================== MODAL: lead capture ====================== */
function openModal(){ $("overlay").classList.add("open"); $("f-first").focus(); }
function closeModal(){ $("overlay").classList.remove("open"); }

function buildLeadPayload(){
  var profs=activeProfiles();
  var total=totalLeak();
  var first=$("f-first").value.trim(); var last=$("f-last").value.trim(); var name=(first+" "+last).trim();
  var lanes=profs.map(function(pid){
    var r=state.results[pid]; var rec=recommend(pid,r.hero);
    return { profile:pid, label:PROFILES[pid].label, estimate:Math.round(r.hero),
             band:rec.band, recommended:[rec.consider].concat(rec.also) };
  });
  var primary=lanes.slice().sort(function(a,b){return b.estimate-a.estimate;})[0]||{};
  var allRec=[]; lanes.forEach(function(l){ l.recommended.forEach(function(k){ if(allRec.indexOf(k)===-1) allRec.push(k); }); });
  var rapidIncluded = PRICING.rapid.inPackages.indexOf(state.selectedPkg)!==-1;
  return {
    source:"RSD Always-On Revenue Calculator",
    profile:profs.join("+"),
    submitted_at:new Date().toISOString(),
    name:name, first_name: first, last_name: last,
    company:$("f-company").value.trim(), email:$("f-email").value.trim(), phone:$("f-phone").value.trim(),
    sms_optin: $("f-sms").checked ? "yes":"no",
    upgrade_true_twin: state.upgradeTwin ? "yes":"no",
    upgrade_true_twin_price: state.upgradeTwin ? fmt(PRICING.twin.price) : "",
    rapid_response_web: rapidIncluded ? "included_with_package" : (state.rapid.webAdded ? "standalone_497" : "no"),
    rapid_response_voice: state.rapid.voiceAdded ? "yes":"no",
    rapid_response_voice_price: state.rapid.voiceAdded ? fmt(PRICING.rapid.voice.monthly)+"/mo" : "",
    alwayson_setup_fee: (rapidIncluded || state.rapid.webAdded || state.rapid.voiceAdded) ? fmt(PRICING.rapid.setupFee) : "",
    social_addon: state.social.added ? "yes":"no",
    social_level: state.social.added ? state.social.level : "",
    social_level_name: state.social.added ? (function(){var L=PRICING.social.levels.filter(function(x){return x.key===state.social.level;})[0];return L?L.name:"";})() : "",
    social_monthly: state.social.added ? (function(){var L=PRICING.social.levels.filter(function(x){return x.key===state.social.level;})[0];return L?fmt(L.monthly)+"/mo":"";})() : "",
    email_optin: $("f-email-optin").checked ? "yes":"no",
    estimate: Math.round(total), estimate_formatted: fmt(total),
    breakdown: lanes.map(function(l){return l.label+": "+fmt(l.estimate);}).join(" · "),
    recommended_phase: primary.recommended?primary.recommended[0]:"",
    recommended_phase_name: primary.recommended?PHASE1_NAMES[primary.recommended[0]]:"",
    recommended_paths: allRec.join(","),
    recommended_paths_names: allRec.map(function(k){return PHASE1_NAMES[k];}).join(", "),
    range_band: primary.band||"",
    icp: state.icp,
    lanes_json: JSON.stringify(lanes),
    inputs_json: JSON.stringify(state.values)
  };
}
function sendEmails(p){
  try{
    emailjs.init({ publicKey: RSD_CONFIG.EMAILJS.PUBLIC_KEY });
    var tp={
      to_name:p.first_name, to_email:p.email,
      client_first:p.first_name||p.name, client_email:p.email,
      company:p.company||"your business",
      profile_label:p.profile, estimate_formatted:p.estimate_formatted,
      breakdown:p.breakdown, range_band:p.range_band,
      recommended_phase_name:p.recommended_phase_name,
      recommended_paths_names:p.recommended_paths_names,
      qualify_url:"https://calculate.rsddirect.com",
      package_url:"https://calculate.rsddirect.com",
      calendly_url:RSD_CONFIG.CTA_URL,
      rsd_email:RSD_CONFIG.EMAILJS.RSD_EMAIL
    };
    return emailjs.send(RSD_CONFIG.EMAILJS.SERVICE_ID, RSD_CONFIG.EMAILJS.TEMPLATE_ID, (function(o){var r={};for(var k in o){var v=o[k];r[k]=(v===undefined||v===null)?'':(typeof v==='object'?JSON.stringify(v):v);}return r;})(tp));
  }catch(e){ console.error("EmailJS error",e); return Promise.resolve(); }
}
function pushGHL(p){
  var url=RSD_CONFIG.LEAD_WEBHOOK_URL;
  if(!url || url.indexOf("example.com")!==-1) return;
  var body=JSON.stringify(p);
  try{
    if(navigator && typeof navigator.sendBeacon==="function"){
      if(navigator.sendBeacon(url, new Blob([body],{type:"text/plain;charset=UTF-8"}))) return;
    }
  }catch(e){ console.error("sendBeacon",e); }
  fetch(url,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:body,mode:"no-cors",keepalive:true})
    .catch(function(err){ console.error("GHL fetch",err); });
}
/* ====================== NAV HISTORY + STATE CACHE (v2) ====================== */
var screenHist=[], hi=-1;
function rebuildFor(id){
  if(id==="screen-calc"){ buildLanes(); }
  else if(id==="screen-reco"){ buildReco(); }
  else if(id==="screen-pricing"){ buildPricing(); }
}
function syncNav(){
  var b=$("navBack"), f=$("navFwd");
  if(b) b.disabled = hi<=0;
  if(f) f.disabled = hi>=screenHist.length-1;
}
function go(id, step){
  if(hi<screenHist.length-1) screenHist=screenHist.slice(0,hi+1);
  if(!screenHist.length || screenHist[hi].id!==id){ screenHist.push({id:id,step:step}); hi=screenHist.length-1; }
  else { screenHist[hi]={id:id,step:step}; }
  showScreen(id,step); syncNav(); saveState();
  try{ history.pushState({id:id,step:step},""); }catch(e){}
}
function navTo(i){
  if(i<0||i>=screenHist.length) return;
  hi=i; var h=screenHist[hi]; rebuildFor(h.id); showScreen(h.id,h.step); syncNav(); saveState();
  try{ history.pushState({id:h.id,step:h.step},""); }catch(e){}
}
function goBack(){ if(hi>0) navTo(hi-1); }
function goForward(){ if(hi<screenHist.length-1) navTo(hi+1); }
function onPopState(e){
  if(e && e.state && e.state.id){
    var idx=-1, i; for(i=screenHist.length-1;i>=0;i--){ if(screenHist[i].id===e.state.id){ idx=i; break; } }
    if(idx>=0) hi=idx;
    var h=screenHist[hi]||{id:e.state.id,step:e.state.step||1};
    rebuildFor(h.id); showScreen(h.id,h.step||1); syncNav();
  }
}
function wireNav(){ var b=$("navBack"), f=$("navFwd"); if(b) b.addEventListener("click",goBack); if(f) f.addEventListener("click",goForward); syncNav(); }
function saveState(){ try{ sessionStorage.setItem("rsd_calc_v2", JSON.stringify({state:state, hi:hi, hist:screenHist})); }catch(e){} }
function loadState(){
  var raw=null; try{ raw=sessionStorage.getItem("rsd_calc_v2"); }catch(e){}
  if(!raw) return false;
  var data=null; try{ data=JSON.parse(raw); }catch(e){ return false; }
  if(!data || !data.state || !data.hist || !data.hist.length) return false;
  try{
    var s=data.state;
    state.icp=s.icp||""; if(s.toggles) state.toggles=s.toggles; state.upgradeTwin=!!s.upgradeTwin;
    if(s.social) state.social=s.social; if(s.rapid) state.rapid=s.rapid; state.seasonal=s.seasonal||{};
    if(s.store) state.store=s.store; if(s.photo) state.photo=s.photo; state.selectedPkg=s.selectedPkg||null;
    if(s.values) state.values=s.values; if(s.results) state.results=s.results;
    renderToggles(); refreshIntroCTA();
    var sel=$("icp"); if(sel){ for(var i=0;i<ICP_OPTIONS.length;i++){ if(ICP_OPTIONS[i].label===state.icp){ sel.value=i; break; } } }
    screenHist=data.hist; hi=(typeof data.hi==="number"&&data.hi>=0&&data.hi<screenHist.length)?data.hi:screenHist.length-1;
    var h=screenHist[hi]; rebuildFor(h.id); showScreen(h.id,h.step); syncNav();
    try{ history.replaceState({id:h.id,step:h.step},""); }catch(e){}
    return true;
  }catch(e){ return false; }
}

/* ====================== FORM HARDENING (v2) ====================== */
var NAME_RE=/^[A-Za-zÀ-ɏ’' \-]+$/;
function onlyLetters(v){ return String(v).replace(/[^A-Za-zÀ-ɏ’' \-]/g,""); }
function fmtPhone(v){ var d=String(v).replace(/\D/g,"").slice(0,10); if(d.length<=3) return d; if(d.length<=6) return "("+d.slice(0,3)+") "+d.slice(3); return "("+d.slice(0,3)+") "+d.slice(3,6)+"-"+d.slice(6); }
function validEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v)); }
function hardenForm(){
  ["f-first","f-last"].forEach(function(id){ var el=$(id); if(!el) return;
    el.setAttribute("maxlength","40"); el.setAttribute("autocapitalize","words"); el.setAttribute("inputmode","text");
    el.addEventListener("input", function(){ var p=this.selectionStart; this.value=onlyLetters(this.value); try{ this.setSelectionRange(p,p); }catch(e){} });
  });
  var ph=$("f-phone"); if(ph){ ph.setAttribute("inputmode","tel"); ph.setAttribute("maxlength","16"); ph.addEventListener("input", function(){ this.value=fmtPhone(this.value); }); }
  var em=$("f-email"); if(em){ em.setAttribute("inputmode","email"); em.setAttribute("autocapitalize","off"); em.setAttribute("spellcheck","false"); }
}
function validateForm(){
  var first=$("f-first").value.trim(), last=$("f-last").value.trim(), email=$("f-email").value.trim(), phone=$("f-phone").value.trim();
  if(!first) return {ok:false,msg:"Please enter your first name."};
  if(!NAME_RE.test(first)) return {ok:false,msg:"First name should contain letters only — no numbers or symbols."};
  if(last && !NAME_RE.test(last)) return {ok:false,msg:"Last name should contain letters only — no numbers or symbols."};
  if(!email) return {ok:false,msg:"Please enter your email address."};
  if(!validEmail(email)) return {ok:false,msg:"That email doesn't look right. Please check and try again."};
  if(phone){ var d=phone.replace(/\D/g,""); if(d.length!==10) return {ok:false,msg:"Please enter a 10-digit US phone number, or leave it blank."}; }
  return {ok:true};
}

/* ====================== WIRING ====================== */
document.addEventListener("DOMContentLoaded", function(){
  buildIntro();
  $("bookCall").href=RSD_CONFIG.CTA_URL;
  $("bookAudit").href=RSD_CONFIG.AUDIT_URL;
  $("openCalc").addEventListener("click", function(){
    if(!activeProfiles().length) return;
    buildLanes(); go("screen-calc",2);
  });
  $("backToIntro").addEventListener("click", function(){ go("screen-intro",1); });
  $("toReport").addEventListener("click", openModal);
  $("twinToggle").addEventListener("click", function(){ state.upgradeTwin=!state.upgradeTwin; buildReco(); });
  $("socialToggle").addEventListener("click", function(){ state.social.added=!state.social.added; buildReco(); });
  $("modalX").addEventListener("click", closeModal);
  $("overlay").addEventListener("click", function(e){ if(e.target===this) closeModal(); });
  $("leadForm").addEventListener("submit", function(e){
    e.preventDefault();
    var _v=validateForm();
    if(!_v.ok){ $("formMsg").style.color="var(--amber)"; $("formMsg").textContent=_v.msg; return; }
    var btn=$("leadSubmit"); btn.disabled=true; btn.textContent="Sending…";
    var payload=buildLeadPayload();
    sendEmails(payload);
    pushGHL(payload);
    $("formMsg").style.color="var(--green)";
    $("formMsg").textContent="Sent — your report is on its way to your inbox.";
    setTimeout(function(){
      btn.disabled=false; btn.textContent="See my recommended plan →";
      closeModal(); buildReco(); go("screen-reco",4);
    }, 650);
  });
  $("toPricing").addEventListener("click", function(){ buildPricing(); go("screen-pricing",4); });
  $("toAudit").addEventListener("click", function(){ go("screen-audit",4); });
  $("toAudit2").addEventListener("click", function(){ go("screen-audit",4); });
  $("auditBackPricing").addEventListener("click", function(){ buildPricing(); go("screen-pricing",4); });
  document.addEventListener("keydown", function(e){ if(e.key==="Escape") closeModal(); });
  wireNav(); hardenForm();
  var _pdf=$("downloadPdf"); if(_pdf) _pdf.addEventListener("click", function(){ window.print(); });
  window.addEventListener("popstate", onPopState);
  window.addEventListener("beforeunload", saveState);
  setInterval(saveState, 1500);
  if(!loadState()){ go("screen-intro",1); }
});