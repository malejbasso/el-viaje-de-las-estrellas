(function () {
  'use strict';

  var intro = document.getElementById('intro');
  var start = document.getElementById('start');
  var reader = document.getElementById('reader');
  var nextBtn = document.getElementById('next');
  var prevBtn = document.getElementById('prev');
  var fsBtn = document.getElementById('fullscreen');
  var counter = document.getElementById('counter');

  var leftFace = document.getElementById('leftFace');
  var rightFace = document.getElementById('rightFace');
  var turnLeaf = document.getElementById('turnLeaf');
  var leafFront = document.getElementById('leafFront');
  var leafBack = document.getElementById('leafBack');

  var CONTENT = window.BOOK_CONTENT || [];
  var ART = window.STAR_ILLUSTRATIONS || {};
  var DURATION = 900;

  /* -------- construir spreads -------- */
  // spreads[0] = { left: 'cover', right: CONTENT[0] }
  // spreads[k] = { left: CONTENT[2k-1], right: CONTENT[2k] }  (k>=1)
  var spreads = [];
  spreads.push({ left: 'cover', right: CONTENT[0], leftNum: null, rightNum: 1 });
  for (var i = 1; i < CONTENT.length; i += 2) {
    spreads.push({
      left: CONTENT[i],
      right: CONTENT[i + 1] !== undefined ? CONTENT[i + 1] : null,
      leftNum: i + 1,
      rightNum: (i + 2 <= CONTENT.length) ? i + 2 : null
    });
  }

  var total = spreads.length;
  var s = 0, busy = false, started = false;

  /* -------- render de contenido -------- */
  function esc(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function faceHTML(item, pageNum) {
    if (item === 'cover') {
      return '' +
        '<div class="cover-face">' +
        '<div class="frame1"></div><div class="frame2"></div>' +
        '<div class="emblem">★</div>' +
        '<h1>El viaje<br>de las estrellas</h1>' +
        '<p class="sub">Una narración para celebrar nuestras voces, aprendizajes y caminos</p>' +
        '<div class="school">Escuela Los Lirios</div>' +
        '</div>';
    }
    if (!item) {
      return '<div class="face-section"><div class="emblem">✦</div></div>';
    }
    if (item.type === 'art') {
      var svg = ART[item.key] ? ART[item.key]() : '';
      return '<div class="face-art">' + svg + '</div>';
    }
    if (item.type === 'section') {
      var lines = item.lines.map(function (l) { return '<p>' + esc(l) + '</p>'; }).join('');
      return '' +
        '<div class="face-section">' +
        '<div class="emblem">✦ ✧ ✦</div>' +
        '<h1>' + esc(item.heading) + '</h1>' +
        '<div class="lines">' + lines + '</div>' +
        '</div>' +
        (pageNum ? '<div class="page-num">' + pageNum + '</div>' : '');
    }
    // story
    return '' +
      '<div class="face-story">' +
      '<div class="label">' + esc(item.label) + '</div>' +
      '<div class="body">' + esc(item.body) + '</div>' +
      '</div>' +
      (pageNum ? '<div class="page-num">' + pageNum + '</div>' : '');
  }

  function renderStatic(idx) {
    var sp = spreads[idx];
    leftFace.innerHTML = faceHTML(sp.left, sp.leftNum);
    rightFace.innerHTML = faceHTML(sp.right, sp.rightNum);
  }

  function updateUI() {
    if (s === 0) {
      counter.textContent = 'Portada';
    } else {
      var sp = spreads[s];
      var a = sp.leftNum, b = sp.rightNum;
      counter.textContent = b ? ('Páginas ' + a + '–' + b) : ('Página ' + a);
    }
    prevBtn.disabled = (s === 0) || busy;
    nextBtn.disabled = (s >= total - 1) || busy;
  }

  /* -------- animación de vuelta de página -------- */
  function resetLeaf() {
    turnLeaf.classList.remove('showing', 'animate', 'shadowed');
    turnLeaf.style.transition = 'none';
  }

  function next() {
    if (!started || busy || s >= total - 1) return;
    busy = true; updateUI();

    var cur = spreads[s], nxt = spreads[s + 1];

    resetLeaf();
    turnLeaf.style.left = '50%';
    turnLeaf.style.right = 'auto';
    turnLeaf.style.transformOrigin = 'left center';
    leafFront.className = 'leaf-face leaf-front page-face';
    leafBack.className = 'leaf-face leaf-back page-face';
    leafFront.innerHTML = faceHTML(cur.right, cur.rightNum);
    leafBack.innerHTML = faceHTML(nxt.left, nxt.leftNum);
    turnLeaf.style.transform = 'rotateY(0deg)';
    turnLeaf.classList.add('showing', 'shadowed');
    // forzar reflow antes de animar
    void turnLeaf.offsetWidth;
    turnLeaf.classList.add('animate');
    turnLeaf.style.transform = 'rotateY(-180deg)';

    setTimeout(function () {
      leftFace.innerHTML = faceHTML(nxt.left, nxt.leftNum);
      rightFace.innerHTML = faceHTML(nxt.right, nxt.rightNum);
    }, DURATION * 0.5);

    setTimeout(function () {
      resetLeaf();
      s++;
      busy = false;
      updateUI();
    }, DURATION + 20);
  }

  function prev() {
    if (!started || busy || s <= 0) return;
    busy = true; updateUI();

    var cur = spreads[s], prv = spreads[s - 1];

    resetLeaf();
    turnLeaf.style.left = '0';
    turnLeaf.style.right = 'auto';
    turnLeaf.style.transformOrigin = 'right center';
    leafFront.className = 'leaf-face leaf-front page-face';
    leafBack.className = 'leaf-face leaf-back page-face';
    leafFront.innerHTML = faceHTML(cur.left, cur.leftNum);
    leafBack.innerHTML = faceHTML(prv.right, prv.rightNum);
    leafFront.style.borderRadius = '8px 2px 2px 8px';
    leafBack.style.borderRadius = '2px 8px 8px 2px';
    leafBack.style.transform = 'rotateY(-180deg)';
    turnLeaf.style.transform = 'rotateY(0deg)';
    turnLeaf.classList.add('showing', 'shadowed');
    void turnLeaf.offsetWidth;
    turnLeaf.classList.add('animate');
    turnLeaf.style.transform = 'rotateY(180deg)';

    setTimeout(function () {
      leftFace.innerHTML = faceHTML(prv.left, prv.leftNum);
      rightFace.innerHTML = faceHTML(prv.right, prv.rightNum);
    }, DURATION * 0.5);

    setTimeout(function () {
      resetLeaf();
      leafBack.style.transform = '';
      leafBack.style.borderRadius = '';
      leafFront.style.borderRadius = '';
      s--;
      busy = false;
      updateUI();
    }, DURATION + 20);
  }

  function begin() {
    if (started || busy) return;
    busy = true; started = true;
    intro.classList.add('zoom');
    renderStatic(0);
    setTimeout(function () {
      intro.classList.add('done');
      reader.classList.add('active');
      reader.setAttribute('aria-hidden', 'false');
      busy = false;
      updateUI();
    }, 1300);
  }

  start.addEventListener('click', function (e) { e.stopPropagation(); begin(); });
  intro.addEventListener('click', begin);

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); started ? next() : begin(); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
    if (e.key === ' ') { e.preventDefault(); started ? next() : begin(); }
    if (e.key.toLowerCase() === 'f') toggleFullscreen();
  });

  document.getElementById('book').addEventListener('click', function (e) {
    if (e.target.closest('button')) return;
    var r = this.getBoundingClientRect();
    if (e.clientX > r.left + r.width / 2) next(); else prev();
  });

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen && document.exitFullscreen();
    }
  }
  fsBtn.addEventListener('click', toggleFullscreen);

  updateUI();
})();
