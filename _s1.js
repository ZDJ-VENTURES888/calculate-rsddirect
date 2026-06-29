      (function(){
        "use strict";
        var mount = document.getElementById("google-reviews-widget");
        if (!mount) return;
        var cfg = {
          placeId: (mount.dataset.placeId || "").trim(),
          apiKey: (mount.dataset.apiKey || "").trim(),
          theme: ((mount.dataset.theme || "dark").toLowerCase() === "light" ? "light" : "dark"),
          minRating: Math.max(0, Math.min(5, parseFloat(mount.dataset.minRating || "1"))),
          maxReviews: Math.max(1, parseInt(mount.dataset.maxReviews || "8", 10)),
          showHeader: (mount.dataset.showHeader || "true").toLowerCase() !== "false",
          autoplay: (mount.dataset.autoplay || "true").toLowerCase() !== "false",
          interval: Math.max(2500, parseInt(mount.dataset.interval || "5200", 10)),
          reviewUrl: (mount.dataset.reviewUrl || "").trim()
        };
        function esc(s){ return String(s || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"); }
        function stars(r){ var n = Math.max(0, Math.min(5, Math.round(Number(r) || 0))); return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n); }
        function trunc(text, max){ var t = String(text || "").trim(); return t.length <= max ? t : t.slice(0, max - 1).trimEnd() + "…"; }
        function fmtDate(input){ if (!input) return ""; var d = input instanceof Date ? input : new Date(input); if (Number.isNaN(d.getTime())) return ""; return d.toLocaleDateString(undefined, { year:"numeric", month:"short", day:"numeric" }); }
        function initials(name){ var safe = String(name || "G").trim(); var parts = safe.split(/\s+/).slice(0,2); return parts.map(function(p){ return p.charAt(0).toUpperCase(); }).join("") || "G"; }
        function reviewTimeValue(r){ if (typeof r.time === "number") return r.time; if (r.time) { var parsed = new Date(r.time).getTime(); if (!Number.isNaN(parsed)) return Math.floor(parsed / 1000); } return 0; }
        function setStatus(msg){ var el = mount.querySelector("#rsdStatus"); if (el) el.textContent = msg; }
        function setNavState(){ var prev = mount.querySelector("#rsdPrev"); var next = mount.querySelector("#rsdNext"); var track = mount.querySelector("#rsdTrack"); if (!prev || !next || !track) return; prev.disabled = track.scrollLeft <= 4; next.disabled = (track.scrollLeft + track.clientWidth) >= (track.scrollWidth - 4); }
        if (!cfg.placeId || !cfg.apiKey || cfg.apiKey.indexOf("YOUR_") === 0) {
          mount.innerHTML = '<section class="rsd-grev rsd-grev--'+cfg.theme+'"><div class="rsd-wrap"><div class="rsd-rail"><div class="rsd-status">Missing Place ID or API key. Add both values to the data attributes, then refresh.</div></div></div></section>';
          return;
        }
        mount.innerHTML =
          '<section class="rsd-grev rsd-grev--'+cfg.theme+'"><div class="rsd-wrap">'+
            (cfg.showHeader ? '<div class="rsd-head"><div><div class="rsd-kicker">Real Space Digital • Google Reviews</div><div class="rsd-title">What people have said about working with us</div><p class="rsd-sub">Real, verified Google reviews from the businesses we build always-on systems for — proof you can see before you ever book a call.</p></div><a class="rsd-cta" href="'+esc(cfg.reviewUrl || "#")+'" target="_blank" rel="noopener noreferrer">Leave a Review →</a></div>' : "")+
            '<div class="rsd-rail"><div class="rsd-summary" id="rsdSum"><div><div class="rsd-place">Loading place data…</div><div class="rsd-rateRow"><span class="rsd-rate">—</span><span class="rsd-stars">☆☆☆☆☆</span></div></div><div class="rsd-summary-right"><div class="rsd-badge">Live Google review feed</div><div class="rsd-navWrap"><button class="rsd-nav" type="button" id="rsdPrev" aria-label="Previous reviews">‹</button><button class="rsd-nav" type="button" id="rsdNext" aria-label="Next reviews">›</button></div></div></div>'+
            '<div class="rsd-track" id="rsdTrack" aria-live="polite"><div class="rsd-loading" style="display:contents;"><div class="rsd-skel"></div><div class="rsd-skel"></div><div class="rsd-skel"></div></div></div>'+
            '<div class="rsd-status" id="rsdStatus">Loading Google reviews…</div></div></div></section>';
        var track = mount.querySelector("#rsdTrack");
        var sumEl = mount.querySelector("#rsdSum");
        var prevBtn = mount.querySelector("#rsdPrev");
        var nextBtn = mount.querySelector("#rsdNext");
        var ctaEl = mount.querySelector(".rsd-cta");
        function cardWidth(){ var card = track.querySelector(".rsd-card"); return card ? card.getBoundingClientRect().width + 14 : 360; }
        prevBtn.addEventListener("click", function(){ track.scrollBy({ left: -cardWidth(), behavior: "smooth" }); });
        nextBtn.addEventListener("click", function(){ track.scrollBy({ left: cardWidth(), behavior: "smooth" }); });
        track.addEventListener("scroll", setNavState, { passive:true });
        window.addEventListener("resize", setNavState);
        var timer = null;
        function stopAuto(){ if (timer) clearInterval(timer); timer = null; }
        function startAuto(){ if (!cfg.autoplay) return; stopAuto(); timer = setInterval(function(){ var endReached = (track.scrollLeft + track.clientWidth) >= (track.scrollWidth - 10); track.scrollTo({ left: endReached ? 0 : (track.scrollLeft + cardWidth()), behavior: "smooth" }); }, cfg.interval); }
        ["pointerdown","wheel","touchstart","mouseenter","focusin"].forEach(function(evt){ track.addEventListener(evt, stopAuto, { passive:true }); });
        track.addEventListener("mouseleave", startAuto, { passive:true });
        function render(place){
          var name = place.name || "Google Reviews";
          var rating = Number(place.rating || 0);
          var total = Number(place.user_ratings_total || 0);
          var url = cfg.reviewUrl || place.url || "";
          if (ctaEl && url) { ctaEl.setAttribute("href", url); }
          sumEl.innerHTML = '<div><div class="rsd-place">'+esc(name)+'</div><div class="rsd-rateRow"><span class="rsd-rate">'+(rating ? rating.toFixed(1) : "—")+'</span><span class="rsd-stars">'+stars(rating)+'</span><span class="rsd-count">'+(total ? "("+total.toLocaleString()+" reviews)" : "")+'</span></div></div><div class="rsd-summary-right"><div class="rsd-badge">Live Google review feed</div><div class="rsd-navWrap"><button class="rsd-nav" type="button" id="rsdPrev" aria-label="Previous reviews">‹</button><button class="rsd-nav" type="button" id="rsdNext" aria-label="Next reviews">›</button></div></div>';
          prevBtn = mount.querySelector("#rsdPrev");
          nextBtn = mount.querySelector("#rsdNext");
          prevBtn.addEventListener("click", function(){ track.scrollBy({ left: -cardWidth(), behavior: "smooth" }); });
          nextBtn.addEventListener("click", function(){ track.scrollBy({ left: cardWidth(), behavior: "smooth" }); });
          var all = Array.isArray(place.reviews) ? place.reviews.slice() : [];
          all.sort(function(a, b){ return reviewTimeValue(b) - reviewTimeValue(a); });
          var filtered = all.filter(function(r){ return Number(r.rating || 0) >= cfg.minRating; }).slice(0, cfg.maxReviews);
          if (!filtered.length) { track.innerHTML = ""; setStatus('No matching reviews returned. For testing, keep data-min-rating="1".'); setNavState(); return; }
          track.innerHTML = filtered.map(function(r){
            var author = esc(r.author_name || "Google User");
            var photo = r.profile_photo_url || "";
            var date = esc(fmtDate(r.time ? new Date(r.time * 1000) : ""));
            var text = esc(trunc(r.text || "", 320));
            var rate = Number(r.rating || 0);
            var init = esc(initials(r.author_name || "Google User"));
            return '<article class="rsd-card" aria-label="Review by '+author+'"><div class="rsd-row">'+
              (photo ? '<img class="rsd-avatar" src="'+esc(photo)+'" alt="'+author+'" loading="lazy" referrerpolicy="no-referrer">' : '<div class="rsd-avatar rsd-avatar-fallback" aria-hidden="true">'+init+'</div>')+
              '<div><div class="rsd-name">'+author+'</div><div class="rsd-date">'+date+'</div></div></div>'+
              '<div class="rsd-stars">'+stars(rate)+'</div><p class="rsd-text">'+(text || "—")+'</p></article>';
          }).join("");
          setStatus("Showing live Google reviews. Reviews are sorted newest-first from the Google response.");
          setNavState(); startAuto();
        }
        function showFail(status){ setStatus("Could not load reviews. Places status: " + status + "\nCheck browser console for the exact Google Maps error."); }
        window.__rsdMapsReady = function(){
          try{
            var mapAnchor = document.getElementById("rsd-map-anchor");
            var dummyMap = new google.maps.Map(mapAnchor, { center:{ lat:0, lng:0 }, zoom:1, disableDefaultUI:true });
            var svc = new google.maps.places.PlacesService(dummyMap);
            svc.getDetails({ placeId: cfg.placeId, fields:["name","rating","user_ratings_total","reviews","url"] }, function(place, status){
              if (status === google.maps.places.PlacesServiceStatus.OK && place) { render(place); }
              else { console.error("[RSD Reviews] PlacesService status:", status); showFail(status); }
            });
          } catch(err){ console.error("[RSD Reviews] init error:", err); setStatus("Google Maps init error: " + err.message); }
        };
        function loadMaps(){
          if (window.google && window.google.maps && window.google.maps.places) { return window.__rsdMapsReady(); }
          if (document.querySelector('script[data-rsd-maps="1"]')) return;
          var s = document.createElement("script");
          s.async = true; s.dataset.rsdMaps = "1";
          s.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(cfg.apiKey) + "&libraries=places&callback=__rsdMapsReady";
          s.onerror = function(){ setStatus("Failed to load Google Maps script."); };
          document.head.appendChild(s);
        }
        loadMaps();
        setTimeout(loadMaps, 600);
      })();
      