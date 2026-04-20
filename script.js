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
  // 4. Hover frame — top-right of cursor, only at scroll = 0
  // --------------------------------------------------------------
  var hoverFrame = document.getElementById('hero-hover');
  var heroTitleEl = document.getElementById('hero-title');

  if (hoverFrame && heroTitleEl) {
    var mx = 0, my = 0;

    function placeFrame() {
      var fw = hoverFrame.offsetWidth  || 340;
      var fh = hoverFrame.offsetHeight || 130;
      // Top-right: frame sits above and to the right of cursor
      var x = (mx + 20 + fw > window.innerWidth)  ? mx - fw - 16 : mx + 20;
      var y = (my - fh - 16 < 0)                  ? my + 16      : my - fh - 16;
      hoverFrame.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    }

    window.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      if (hoverFrame.classList.contains('visible')) placeFrame();
    });

    heroTitleEl.addEventListener('mouseenter', function () {
      // Don't show if title is already shrinking
      if (scrollProgress > 0.04) return;
      placeFrame();
      hoverFrame.classList.add('visible');
    });

    heroTitleEl.addEventListener('mouseleave', function () {
      hoverFrame.classList.remove('visible');
    });
  }

  // --------------------------------------------------------------
  // 5. Scroll story — title shrinks, CTAs out, copy in
  //    CTAs + copy are position:absolute → JS drives their top
  // --------------------------------------------------------------
  var story      = document.getElementById('scroll-story');
  var titleEl    = document.getElementById('hero-title');
  var ctasEl     = document.getElementById('hero-ctas');
  var copyEl     = document.getElementById('about-copy');

  if (story && titleEl) {
    var stickyEl = titleEl.parentElement; // .scroll-sticky

    // Mirror CSS clamp values
    function clampPx(mn, vwF, mx2) {
      return Math.min(Math.max(window.innerWidth * vwF, mn), mx2);
    }
    var H = { mn: 60,  vw: 0.105, mx: 152 };
    var S = { mn: 44,  vw: 0.075, mx: 108 };

    var curSz = clampPx(H.mn, H.vw, H.mx);
    var tgtSz = curSz;
    var raf   = null;

    // Read container padding-top (338px desktop, 180px mobile)
    function padTop() {
      return parseFloat(getComputedStyle(stickyEl).paddingTop) || 338;
    }

    function getProgress() {
      var r      = story.getBoundingClientRect();
      var travel = story.offsetHeight - window.innerHeight;
      return travel > 0 ? Math.max(0, Math.min(1, -r.top / travel)) : 0;
    }

    function tick() {
      var p     = getProgress();
      scrollProgress = p;

      var hSz = clampPx(H.mn, H.vw, H.mx);
      var sSz = clampPx(S.mn, S.vw, S.mx);

      tgtSz  = hSz + (sSz - hSz) * p;
      curSz += (tgtSz - curSz) * 0.12;
      titleEl.style.fontSize = curSz.toFixed(1) + 'px';

      // Position CTAs and copy directly below the shrinking title
      // title visual bottom = paddingTop + fontSize × lineHeight(0.93)
      var titleBottom = padTop() + curSz * 0.93;
      var gap         = 44;
      var subTop      = titleBottom + gap;

      // CTAs stay full size, fade out over first 35% of travel
      if (ctasEl) {
        ctasEl.style.top       = subTop + 'px';
        ctasEl.style.transform = '';
        ctasEl.style.opacity   = Math.max(0, 1 - p / 0.35).toFixed(3);
      }

      // Copy sits below the full-height CTAs
      var ctaH = ctasEl ? ctasEl.offsetHeight + 28 : 0;
      if (copyEl) copyEl.style.top = (subTop + ctaH) + 'px';

      // Copy appears after 60%
      if (copyEl) copyEl.classList.toggle('visible', p >= 0.6);

      // Kill hover frame the moment scrolling starts
      if (hoverFrame && p > 0.04) hoverFrame.classList.remove('visible');

      // Keep animating until settled
      if (Math.abs(curSz - tgtSz) > 0.15) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    }

    window.addEventListener('scroll', function () {
      if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: true });

    window.addEventListener('resize', function () {
      curSz = clampPx(H.mn, H.vw, H.mx);
      titleEl.style.fontSize = '';
      if (!raf) raf = requestAnimationFrame(tick);
    });

    // Run immediately to set initial positions
    requestAnimationFrame(tick);
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

}); // end window.load
