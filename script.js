/* ================================================================
   PENTAGON STUDIOS — script.js
   ================================================================ */

document.documentElement.classList.add('js');

window.addEventListener('load', function () {

  // ── shared state ─────────────────────────────────────────────
  var scrollProgress = 0; // 0 = top, 1 = fully scrolled through story

  // --------------------------------------------------------------
  // 1. Nav scroll border
  // --------------------------------------------------------------
  var nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // --------------------------------------------------------------
  // 2. Hamburger menu
  // --------------------------------------------------------------
  var burger = document.querySelector('.nav-burger');
  var mobileNav = document.querySelector('.nav-mobile');
  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      burger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --------------------------------------------------------------
  // 3. Scroll reveal
  // --------------------------------------------------------------
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        var d = el.classList.contains('reveal-delay-3') ? 320
              : el.classList.contains('reveal-delay-2') ? 200
              : el.classList.contains('reveal-delay-1') ? 100 : 0;
        setTimeout(function () { el.classList.add('in'); }, d);
      } else {
        io.observe(el);
      }
    });
  }

  // --------------------------------------------------------------
  // 4. Hover frame — trails the cursor, only at scroll = 0
  //    Activates anywhere in a wide band around the title (not just
  //    the glyphs), skipping the CTAs. Appear delay + blur live in CSS.
  // --------------------------------------------------------------
  var hoverFrame = document.getElementById('hero-hover');
  var heroTitleEl = document.getElementById('hero-title');
  var ZONE_PAD = 140; // px above/below the title that still count

  if (hoverFrame && heroTitleEl) {
    var mx = 0, my = 0, fx = 0, fy = 0, followRaf = null;

    function frameTarget() {
      var fw = hoverFrame.offsetWidth  || 340;
      var fh = hoverFrame.offsetHeight || 130;
      // Top-right: frame sits above and to the right of cursor
      return {
        x: (mx + 20 + fw > window.innerWidth) ? mx - fw - 16 : mx + 20,
        y: (my - fh - 16 < 0)                 ? my + 16      : my - fh - 16
      };
    }

    function follow() {
      var t = frameTarget();
      fx += (t.x - fx) * 0.14;
      fy += (t.y - fy) * 0.14;
      hoverFrame.style.transform = 'translate(' + fx.toFixed(1) + 'px,' + fy.toFixed(1) + 'px)';
      if (hoverFrame.classList.contains('visible') &&
          (Math.abs(t.x - fx) > 0.3 || Math.abs(t.y - fy) > 0.3)) {
        followRaf = requestAnimationFrame(follow);
      } else {
        followRaf = null;
      }
    }

    function inZone(e) {
      if (scrollProgress > 0.04) return false;
      if (e.target.closest && e.target.closest('.hero-ctas, nav, .nav-mobile')) return false;
      var r = heroTitleEl.getBoundingClientRect();
      return e.clientY >= r.top - ZONE_PAD && e.clientY <= r.bottom + ZONE_PAD;
    }

    window.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      var on = inZone(e);
      var wasOn = hoverFrame.classList.contains('visible');
      if (on && !wasOn) {
        // Start at the target so it fades in place instead of flying in
        var t = frameTarget(); fx = t.x; fy = t.y;
        hoverFrame.style.transform = 'translate(' + fx + 'px,' + fy + 'px)';
      }
      hoverFrame.classList.toggle('visible', on);
      document.body.classList.toggle('hover-zone', on);
      if (on && !followRaf) followRaf = requestAnimationFrame(follow);
    });

    document.addEventListener('mouseleave', function () {
      hoverFrame.classList.remove('visible');
      document.body.classList.remove('hover-zone');
    });
  }

  // --------------------------------------------------------------
  // 5. Scroll story — title shrinks, CTAs out, copy in
  //    One small scroll triggers the whole transition as a timed
  //    tween (not tied to scroll distance); scrolling back to the
  //    top reverses it. CTAs + copy are position:absolute → JS
  //    drives their top.
  // --------------------------------------------------------------
  var story      = document.getElementById('scroll-story');
  var titleEl    = document.getElementById('hero-title');
  var ctasEl     = document.getElementById('hero-ctas');
  var copyEl     = document.getElementById('about-copy');

  if (story && titleEl) {
    var isMobile = window.matchMedia('(max-width: 640px)').matches;

    if (isMobile) {
      // Static layout on mobile — CSS handles positioning, just reveal the copy
      if (copyEl) copyEl.classList.add('visible');
    } else {
      var stickyEl = titleEl.parentElement; // .scroll-sticky
      var TRIGGER  = 24;   // px of scroll that flips the state
      var DUR      = 900;  // ms for the full transition
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Mirror CSS clamp values
      function clampPx(mn, vwF, mx2) {
        return Math.min(Math.max(window.innerWidth * vwF, mn), mx2);
      }
      var H = { mn: 60,  vw: 0.105, mx: 152 };
      var S = { mn: 44,  vw: 0.075, mx: 108 };

      var anim = 0, from = 0, to = 0, t0 = 0, raf = null;

      function ease(t) { // easeInOutCubic
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      // Read container padding-top (338px desktop)
      function padTop() {
        return parseFloat(getComputedStyle(stickyEl).paddingTop) || 338;
      }

      function render(p) {
        var hSz = clampPx(H.mn, H.vw, H.mx);
        var sSz = clampPx(S.mn, S.vw, S.mx);
        var sz  = hSz + (sSz - hSz) * p;
        titleEl.style.fontSize = sz.toFixed(1) + 'px';

        // title visual bottom = paddingTop + fontSize × lineHeight(0.93)
        var subTop = padTop() + sz * 0.93 + 44;

        // CTAs fade out over the first half of the transition
        if (ctasEl) {
          ctasEl.style.top     = subTop + 'px';
          ctasEl.style.opacity = Math.max(0, 1 - p / 0.5).toFixed(3);
          ctasEl.style.pointerEvents = p > 0.5 ? 'none' : '';
        }

        // Copy slides up into the space the CTAs vacate
        var ctaH = ctasEl ? ctasEl.offsetHeight + 28 : 0;
        if (copyEl) {
          copyEl.style.top = (subTop + ctaH * (1 - p)) + 'px';
          copyEl.classList.toggle('visible', p >= 0.45);
        }
      }

      function tick(now) {
        var k = reduceMotion ? 1 : Math.min(1, (now - t0) / DUR);
        anim = from + (to - from) * ease(k);
        render(anim);
        raf = k < 1 ? requestAnimationFrame(tick) : null;
      }

      // ── Step gate ──
      // The first scroll down from the top parks on the copy (REST) and
      // holds there for the rest of that gesture, so a hard flick or
      // trackpad momentum can't carry past it. Scrolling up past REST
      // steps back to the top the same way. Once a gesture ends, scroll
      // is free. Enforced on 'scroll' (momentum wheel events can't always
      // be cancelled) and on 'wheel'/keys where possible, to avoid jitter.
      var REST     = TRIGGER + 16; // px — just past the trigger, still pinned
      var QUIET    = 180;          // ms of no input = gesture over
      var MAX_LOCK = 2000;         // ms — never hold the page longer than this
      var lockStart = 0, lastInput = 0, locked = false;
      var lastY = window.scrollY - story.offsetTop;

      function jump(y) {
        // 'instant' — html has scroll-behavior: smooth, which would animate this
        window.scrollTo({ top: story.offsetTop + y, behavior: 'instant' });
      }

      function holding(now) {
        if (!locked) return false;
        var busy = now - lockStart < DUR || now - lastInput < QUIET;
        if (busy && now - lockStart < MAX_LOCK) return true;
        locked = false;
        return false;
      }

      function stepTo(state) {
        locked = true;
        lockStart = lastInput = performance.now();
        from = anim; to = state; t0 = lockStart;
        scrollProgress = Math.max(anim, state);
        if (hoverFrame && state) hoverFrame.classList.remove('visible');
        if (!raf) raf = requestAnimationFrame(tick);
        jump(state ? REST : 0);
        lastY = state ? REST : 0;
      }

      function update() {
        var y   = window.scrollY - story.offsetTop;
        var now = performance.now();

        if (holding(now)) {
          var want = to ? REST : 0;
          if (Math.abs(y - want) > 1) { lastInput = now; jump(want); }
          return;
        }
        if (to === 0 && y > TRIGGER && lastY <= TRIGGER) { stepTo(1); return; }
        if (to === 1 && y < REST - 1 && lastY >= REST - 1) { stepTo(0); return; }
        lastY = y;

        // No gate involved (e.g. page reloaded mid-scroll): plain state sync
        var target = y > TRIGGER ? 1 : 0;
        scrollProgress = Math.max(anim, target);
        if (target === to) return;
        from = anim; to = target; t0 = now;
        if (!raf) raf = requestAnimationFrame(tick);
      }

      window.addEventListener('scroll', update, { passive: true });

      function gate(dir, e) {
        var now = performance.now();
        if (holding(now)) { lastInput = now; e.preventDefault(); return; }
        var y = window.scrollY - story.offsetTop;
        if (dir > 0 && to === 0 && y <= TRIGGER)                 { e.preventDefault(); stepTo(1); }
        else if (dir < 0 && to === 1 && y >= 0 && y <= REST + 4) { e.preventDefault(); stepTo(0); }
      }

      window.addEventListener('wheel', function (e) {
        if (e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return; // pinch-zoom / sideways
        gate(e.deltaY, e);
      }, { passive: false });

      window.addEventListener('keydown', function (e) {
        if (e.target.closest && e.target.closest('input, textarea, select, [contenteditable]')) return;
        var k = e.key;
        var dir = (k === 'ArrowDown' || k === 'PageDown' || (k === ' ' && !e.shiftKey)) ? 1
                : (k === 'ArrowUp' || k === 'PageUp' || (k === ' ' && e.shiftKey)) ? -1 : 0;
        if (dir) gate(dir, e);
      });

      window.addEventListener('resize', function () {
        titleEl.style.fontSize = '';
        render(anim);
      });

      // Set initial positions (handles reloads mid-page too)
      render(0);
      update();
    }
  }

  // --------------------------------------------------------------
  // 6. Pentagon SVG
  // --------------------------------------------------------------
  function buildPentagon(container, opts) {
    var size  = (opts && opts.size)  || 260;
    var rings = (opts && opts.rings) || 20;
    var color = (opts && opts.color) || '#3DBE4A';
    var glow  = !(opts && opts.glow === false);
    var NS    = 'http://www.w3.org/2000/svg';
    var cx = size / 2, cy = size / 2;
    var rMin = size * 0.062, rMax = size * 0.47;

    function pts(r) {
      var o = [];
      for (var i = 0; i < 5; i++) {
        var a = ((-90) + i * 72) * Math.PI / 180;
        o.push((cx + r * Math.cos(a)).toFixed(2) + ',' + (cy + r * Math.sin(a)).toFixed(2));
      }
      return o.join(' ');
    }

    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + size + ' ' + size);
    svg.setAttribute('width', size); svg.setAttribute('height', size);
    svg.setAttribute('aria-hidden', 'true');

    var fid = null;
    if (glow) {
      fid = 'pg-' + Math.random().toString(36).slice(2, 7);
      var defs = document.createElementNS(NS, 'defs');
      var filt = document.createElementNS(NS, 'filter');
      filt.setAttribute('id', fid);
      filt.setAttribute('x', '-30%'); filt.setAttribute('y', '-30%');
      filt.setAttribute('width', '160%'); filt.setAttribute('height', '160%');
      var blur = document.createElementNS(NS, 'feGaussianBlur');
      blur.setAttribute('stdDeviation', '2.5'); blur.setAttribute('result', 'blurred');
      var mg = document.createElementNS(NS, 'feMerge');
      var m1 = document.createElementNS(NS, 'feMergeNode'); m1.setAttribute('in', 'blurred');
      var m2 = document.createElementNS(NS, 'feMergeNode'); m2.setAttribute('in', 'SourceGraphic');
      mg.appendChild(m1); mg.appendChild(m2);
      filt.appendChild(blur); filt.appendChild(mg);
      defs.appendChild(filt); svg.appendChild(defs);
    }

    for (var i = 0; i < rings; i++) {
      var t = i / (rings - 1), r = rMin + (rMax - rMin) * t;
      var poly = document.createElementNS(NS, 'polygon');
      poly.setAttribute('points', pts(r));
      poly.setAttribute('fill', 'none');
      poly.setAttribute('stroke', color);
      poly.setAttribute('stroke-width', (0.4 + t * 0.7).toFixed(2));
      poly.setAttribute('opacity', (0.12 + t * 0.78).toFixed(2));
      if (glow && i < 4 && fid) poly.setAttribute('filter', 'url(#' + fid + ')');
      svg.appendChild(poly);
    }
    container.innerHTML = '';
    container.appendChild(svg);
  }

  document.querySelectorAll('[data-pentagon]').forEach(function (el) {
    buildPentagon(el, { size: parseInt(el.dataset.size) || 120, rings: 14, color: '#3DBE4A' });
  });

  // --------------------------------------------------------------
  // 7. Adam image — slide two halves in from opposite sides
  // --------------------------------------------------------------
  var adamWrap = document.getElementById('footer-adam');
  if (adamWrap) {
    var adamIO = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          setTimeout(function() { adamWrap.classList.add('visible'); }, 100);
          adamIO.disconnect();
        }
      });
    }, { threshold: 0.15 });
    adamIO.observe(adamWrap);
  }

  // --------------------------------------------------------------
  // 7b. Footer logo — unfold once when it scrolls into view
  // --------------------------------------------------------------
  var footerLogo = document.querySelector('.footer-logo');
  if (footerLogo) {
    var logoIO = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        footerLogo.classList.add('in');
        logoIO.disconnect();
      }
    }, { threshold: 0.35 });
    logoIO.observe(footerLogo);
  }

  // --------------------------------------------------------------
  // 8. Contact form (Formspree)
  // --------------------------------------------------------------
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var btn = form.querySelector('.form-submit');
      var note = form.querySelector('.form-note');
      var orig = btn.textContent;
      btn.textContent = 'Sending…'; btn.disabled = true;
      try {
        var res = await fetch(form.action, {
          method: 'POST', body: new FormData(form),
          headers: { 'Accept': 'application/json' },
        });
        if (res.ok) {
          form.reset(); btn.textContent = 'Sent ✓';
          if (note) { note.textContent = "Message received. We'll be in touch."; note.style.opacity = '1'; }
        } else { throw new Error(); }
      } catch (_) {
        btn.textContent = orig; btn.disabled = false;
        if (note) { note.textContent = 'Something went wrong — try emailing directly.'; note.style.opacity = '1'; }
      }
    });
  }

  // --------------------------------------------------------------
  // 9. FAQ accordion
  // --------------------------------------------------------------
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (el) {
        el.classList.remove('open');
      });
      if (!isOpen) item.classList.add('open');
    });
  });

}); // end window.load
