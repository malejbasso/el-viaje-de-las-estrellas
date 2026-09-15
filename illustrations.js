/* ============================================================
   Ilustraciones vectoriales originales — "El viaje de las estrellas"
   Todas usan el mismo viewBox 0 0 600 800 y la misma paleta que
   el resto del libro, para que se vean como parte de una sola obra.
   ============================================================ */
(function (global) {
  'use strict';

  var GOLD = '#F8CE60';
  var GOLD_SOFT = '#FCE7C2';
  var CREAM = '#F5F3EC';
  var SIL = '#050914';
  var SIL2 = '#0A1226';
  var BLUE = '#6FA8E8';
  var PINK = '#E9A8C9';

  /* ---------- helpers geométricos ---------- */

  function starPath(cx, cy, rOuter, innerRatio, points, rotDeg) {
    innerRatio = innerRatio === undefined ? 0.45 : innerRatio;
    points = points || 5;
    rotDeg = rotDeg === undefined ? -90 : rotDeg;
    var rInner = rOuter * innerRatio;
    var step = Math.PI / points;
    var rot = (rotDeg * Math.PI) / 180;
    var d = '';
    for (var i = 0; i < points * 2; i++) {
      var r = i % 2 === 0 ? rOuter : rInner;
      var a = rot + i * step;
      var x = cx + r * Math.cos(a);
      var y = cy + r * Math.sin(a);
      d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1) + ' ';
    }
    return d + 'Z';
  }

  function star(cx, cy, r, opts) {
    opts = opts || {};
    var fill = opts.fill || GOLD;
    var op = opts.opacity === undefined ? 1 : opts.opacity;
    var glow = opts.glow;
    var face = opts.face;
    var pts = opts.points || 5;
    var out = '';
    if (glow) {
      out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 3.2).toFixed(1) + '" fill="url(#softGlow)" opacity="' + (op * 0.9).toFixed(2) + '"/>';
    }
    out += '<path d="' + starPath(cx, cy, r, 0.45, pts, -90) + '" fill="' + fill + '" opacity="' + op + '"/>';
    if (face) {
      var ey = cy - r * 0.05, ex = r * 0.32;
      out += '<circle cx="' + (cx - ex).toFixed(1) + '" cy="' + ey.toFixed(1) + '" r="' + (r * 0.09).toFixed(1) + '" fill="' + SIL + '"/>';
      out += '<circle cx="' + (cx + ex).toFixed(1) + '" cy="' + ey.toFixed(1) + '" r="' + (r * 0.09).toFixed(1) + '" fill="' + SIL + '"/>';
      out += '<path d="M' + (cx - r * 0.22).toFixed(1) + ',' + (cy + r * 0.22).toFixed(1) + ' Q' + cx.toFixed(1) + ',' + (cy + r * 0.42).toFixed(1) + ' ' + (cx + r * 0.22).toFixed(1) + ',' + (cy + r * 0.22).toFixed(1) + '" stroke="' + SIL + '" stroke-width="' + (r * 0.07).toFixed(1) + '" fill="none" stroke-linecap="round"/>';
    }
    return out;
  }

  function sparkle(cx, cy, r, opacity, fill) {
    return '<path d="' + starPath(cx, cy, r, 0.28, 4, -90) + '" fill="' + (fill || CREAM) + '" opacity="' + (opacity === undefined ? 0.8 : opacity) + '"/>';
  }

  // campo de estrellas pequeño determinístico (mismas semillas => mismo patrón en toda ilustración)
  function scatter(seed, count, opts) {
    opts = opts || {};
    var minY = opts.minY === undefined ? 0 : opts.minY;
    var maxY = opts.maxY === undefined ? 800 : opts.maxY;
    var out = '';
    var s = seed;
    function rnd() { s = (s * 9301 + 49297) % 233280; return s / 233280; }
    for (var i = 0; i < count; i++) {
      var x = rnd() * 600;
      var y = minY + rnd() * (maxY - minY);
      var r = 1.4 + rnd() * 2.6;
      var op = 0.35 + rnd() * 0.55;
      out += sparkle(x, y, r, op, rnd() > 0.82 ? GOLD : CREAM);
    }
    return out;
  }

  function hill(y, amp, tone, opacity) {
    var d = 'M0,' + (y + amp) + ' C 100,' + (y - amp) + ' 200,' + (y + amp * 1.4) + ' 300,' + y +
      ' C 400,' + (y - amp * 1.2) + ' 500,' + (y + amp) + ' 600,' + (y - amp * 0.4) +
      ' L600,800 L0,800 Z';
    return '<path d="' + d + '" fill="' + (tone || SIL) + '" opacity="' + (opacity === undefined ? 1 : opacity) + '"/>';
  }

  function moon(cx, cy, r) {
    return '' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 2.6).toFixed(1) + '" fill="url(#moonGlow)"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + GOLD_SOFT + '"/>' +
      '<circle cx="' + (cx + r * 0.38).toFixed(1) + '" cy="' + (cy - r * 0.28).toFixed(1) + '" r="' + (r * 0.82).toFixed(1) + '" fill="' + SIL2 + '" opacity=".9"/>';
  }

  // silueta simple de niño/a. facing: 1 = derecha, -1 = izquierda. pose: 'stand'|'step'|'sit'|'armsUp'
  function child(x, y, scale, facing, pose, opacity) {
    facing = facing || 1;
    opacity = opacity === undefined ? 1 : opacity;
    var g = '<g transform="translate(' + x + ',' + y + ') scale(' + (scale * facing) + ',' + scale + ')" opacity="' + opacity + '" fill="' + SIL + '">';
    // cabeza
    g += '<circle cx="0" cy="-58" r="11"/>';
    if (pose === 'sit') {
      g += '<path d="M-13,-47 C-16,-20 -14,0 -10,10 L10,10 C14,0 16,-20 13,-47 C8,-42 -8,-42 -13,-47 Z"/>';
      g += '<path d="M-10,8 C-14,16 -22,18 -30,16 L-28,8 C-20,8 -14,4 -10,-2 Z"/>';
      g += '<path d="M10,8 C14,16 22,18 30,16 L28,8 C20,8 14,4 10,-2 Z"/>';
    } else if (pose === 'step') {
      g += '<path d="M-12,-47 C-15,-25 -13,-5 -9,14 L4,14 C6,-4 6,-24 9,-47 Z"/>';
      g += '<path d="M-9,12 C-13,26 -18,34 -26,40 L-19,46 C-9,38 -2,28 2,14 Z"/>'; // pierna atrás
      g += '<path d="M4,12 C10,22 18,26 26,22 L23,13 C17,15 10,12 6,4 Z"/>'; // pierna adelante
      g += '<path d="M-11,-44 C-18,-38 -22,-28 -20,-16 L-13,-18 C-14,-27 -12,-35 -7,-40 Z"/>'; // brazo
    } else if (pose === 'armsUp') {
      g += '<path d="M-12,-47 C-15,-22 -13,0 -9,14 L9,14 C13,0 15,-22 12,-47 Z"/>';
      g += '<path d="M-10,-44 C-20,-50 -26,-62 -25,-74 L-18,-72 C-18,-62 -14,-54 -6,-48 Z"/>';
      g += '<path d="M10,-44 C20,-50 26,-62 25,-74 L18,-72 C18,-62 14,-54 6,-48 Z"/>';
      g += '<path d="M-9,12 C-11,24 -11,34 -9,42 L-1,42 C-2,32 -1,22 0,12 Z"/>';
      g += '<path d="M9,12 C11,24 11,34 9,42 L1,42 C2,32 1,22 0,12 Z"/>';
    } else { // stand
      g += '<path d="M-12,-47 C-16,-22 -14,4 -10,20 L10,20 C14,4 16,-22 12,-47 Z"/>';
      g += '<path d="M-10,18 C-12,28 -12,36 -10,42 L-2,42 C-3,34 -2,26 -1,18 Z"/>';
      g += '<path d="M10,18 C12,28 12,36 10,42 L2,42 C3,34 2,26 1,18 Z"/>';
      g += '<path d="M-11,-44 C-19,-38 -22,-26 -19,-14 L-12,-17 C-13,-26 -11,-34 -6,-40 Z"/>';
      g += '<path d="M11,-44 C17,-36 18,-24 14,-12 L8,-15 C10,-24 9,-33 6,-40 Z"/>';
    }
    g += '</g>';
    return g;
  }

  function bg(defsExtra) {
    return '' +
      '<defs>' +
      '<radialGradient id="softGlow" cx="50%" cy="50%" r="50%">' +
      '<stop offset="0%" stop-color="' + GOLD + '" stop-opacity=".55"/>' +
      '<stop offset="100%" stop-color="' + GOLD + '" stop-opacity="0"/>' +
      '</radialGradient>' +
      '<radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">' +
      '<stop offset="0%" stop-color="' + GOLD_SOFT + '" stop-opacity=".45"/>' +
      '<stop offset="100%" stop-color="' + GOLD_SOFT + '" stop-opacity="0"/>' +
      '</radialGradient>' +
      (defsExtra || '') +
      '</defs>';
  }

  function frame(inner) {
    return '<svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  }

  /* ---------- las 13 escenas ---------- */

  var scenes = {};

  // I1 — Escuela y cielo (apertura)
  scenes.escuela = function () {
    var s = bg();
    s += scatter(11, 46, { maxY: 620 });
    s += moon(430, 150, 46);
    s += hill(560, 30, '#060a18', 1);
    s += hill(600, 22, SIL, 1);
    // escuela simple
    s += '<g transform="translate(300,690)">';
    s += '<rect x="-95" y="-70" width="190" height="90" rx="4" fill="' + SIL2 + '"/>';
    s += '<path d="M-105,-70 L0,-118 L105,-70 Z" fill="' + SIL + '"/>';
    s += '<path d="M-28,-46 a28,28 0 0 1 56,0 v46 h-56 Z" fill="' + GOLD_SOFT + '" opacity=".85"/>';
    s += '<rect x="-72" y="-28" width="26" height="26" fill="' + GOLD_SOFT + '" opacity=".55"/>';
    s += '<rect x="46" y="-28" width="26" height="26" fill="' + GOLD_SOFT + '" opacity=".55"/>';
    s += '</g>';
    s += star(150, 210, 14, { face: true, glow: true });
    s += star(470, 300, 8, { glow: true, opacity: .9 });
    return frame(s);
  };

  // I2 — Una pequeña estrella
  scenes.pequenaEstrella = function () {
    var s = bg();
    s += scatter(22, 55);
    s += star(150, 180, 7, { opacity: .8 });
    s += star(460, 230, 9, { opacity: .85 });
    s += star(500, 520, 6, { opacity: .7 });
    s += star(120, 520, 8, { opacity: .75 });
    s += star(300, 400, 30, { face: true, glow: true });
    return frame(s);
  };

  // I3 — Cada uno tiene su luz (diversidad de tamaños)
  scenes.diversidad = function () {
    var s = bg();
    s += scatter(33, 40);
    var arr = [
      [110, 190, 22], [300, 140, 12], [470, 210, 30],
      [200, 350, 9], [400, 400, 17], [90, 460, 26],
      [520, 470, 11], [300, 560, 20], [140, 620, 8], [430, 620, 14]
    ];
    for (var i = 0; i < arr.length; i++) {
      s += star(arr[i][0], arr[i][1], arr[i][2], { glow: arr[i][2] > 15, opacity: .95 });
    }
    return frame(s);
  };

  // I4 — Puedes seguir (niño en la ventana)
  scenes.ventana = function () {
    var s = bg('<linearGradient id="winSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#22306a"/><stop offset="100%" stop-color="#0A112B"/></linearGradient>');
    s += '<rect x="0" y="0" width="600" height="800" fill="' + SIL2 + '"/>';
    s += '<g transform="translate(300,330)">';
    s += '<path d="M-160,120 L-160,-40 A160,160 0 0 1 160,-40 L160,120 Z" fill="url(#winSky)"/>';
    s += sparkle(-95, 45, 3.2, .8, CREAM);
    s += sparkle(75, 70, 2.6, .7, CREAM);
    s += sparkle(-35, -12, 2.8, .8, GOLD);
    s += sparkle(112, -8, 2.4, .7, CREAM);
    s += sparkle(-8, 90, 2.2, .6, CREAM);
    s += star(55, -55, 22, { face: true, glow: true });
    s += '<path d="M-172,132 L-172,-46 A172,172 0 0 1 172,-46 L172,132 Z" fill="none" stroke="' + GOLD + '" stroke-width="10" opacity=".8"/>';
    s += '<rect x="-172" y="118" width="344" height="26" fill="' + GOLD + '" opacity=".8"/>';
    s += '</g>';
    s += child(300, 700, 2, 1, 'stand');
    return frame(s);
  };

  // I5 — Las estrellas (manos sosteniendo una estrella de papel)
  scenes.manos = function () {
    var s = bg();
    s += scatter(66, 40, { maxY: 480 });
    s += star(300, 330, 70, { glow: true, opacity: 1 });
    s += sparkle(210, 230, 10, .9, GOLD);
    s += sparkle(400, 210, 8, .8, CREAM);
    s += sparkle(420, 400, 9, .85, GOLD);
    // manos (formas simples tipo mitones) sosteniendo desde abajo
    s += '<path d="M170,560 C150,500 175,450 230,440 C250,436 265,450 268,470 L272,560 Z" fill="' + SIL + '"/>';
    s += '<path d="M430,560 C450,500 425,450 370,440 C350,436 335,450 332,470 L328,560 Z" fill="' + SIL + '"/>';
    s += '<path d="M150,560 L450,560 L430,650 L170,650 Z" fill="' + SIL2 + '"/>';
    return frame(s);
  };

  // I6 — Valentía (paso sobre camino de estrellas)
  scenes.valentia = function () {
    var s = bg();
    s += scatter(77, 42, { maxY: 500 });
    // camino curvo de puntos
    var path = [[80, 700], [160, 640], [230, 600], [300, 545], [370, 480], [440, 400], [500, 300], [545, 200]];
    for (var i = 0; i < path.length; i++) {
      s += star(path[i][0], path[i][1], 5 + i * 0.6, { opacity: .55 + i * 0.05, glow: i > 4 });
    }
    s += child(230, 660, 2.6, 1, 'step');
    s += star(555, 165, 20, { face: true, glow: true });
    return frame(s);
  };

  // I7 — Nadie queda atrás (caminando juntos)
  scenes.juntosCamino = function () {
    var s = bg();
    s += scatter(88, 40, { maxY: 460 });
    s += hill(560, 18, SIL2, .6);
    s += hill(610, 24, SIL, 1);
    var xs = [130, 230, 320, 410, 500];
    var scales = [2.0, 2.5, 2.2, 1.7, 2.3];
    for (var i = 0; i < xs.length; i++) {
      s += child(xs[i], 690, scales[i], 1, i === 2 ? 'armsUp' : 'stand');
    }
    s += star(300, 150, 16, { glow: true });
    return frame(s);
  };

  // I8 — Las 25 estrellas (constelación circular)
  scenes.veinticinco = function () {
    var s = bg();
    s += scatter(99, 20, { maxY: 200 });
    s += scatter(100, 20, { minY: 620 });
    var cx = 300, cy = 420;
    for (var i = 0; i < 25; i++) {
      var ring = i < 8 ? 1 : (i < 17 ? 2 : 3);
      var count = ring === 1 ? 8 : (ring === 2 ? 9 : 8);
      var idx = ring === 1 ? i : (ring === 2 ? i - 8 : i - 17);
      var radius = ring === 1 ? 70 : (ring === 2 ? 140 : 205);
      var ang = (idx / count) * Math.PI * 2 + ring * 0.3;
      var x = cx + radius * Math.cos(ang);
      var y = cy + radius * Math.sin(ang) * 0.82;
      s += star(x, y, ring === 1 ? 14 : (ring === 2 ? 10 : 8), { opacity: .95, glow: ring === 1 });
    }
    s += star(cx, cy, 26, { face: true, glow: true });
    return frame(s);
  };

  // I9 — Nuestro cielo (vista amplia)
  scenes.nuestroCielo = function () {
    var s = bg();
    s += scatter(111, 70, { maxY: 560 });
    s += moon(140, 130, 38);
    s += hill(600, 26, '#070b1a', 1);
    s += hill(650, 20, SIL, 1);
    s += '<g transform="translate(420,680)"><path d="M-70,0 L-70,-46 L-40,-70 L-10,-46 L-10,0 Z" fill="' + SIL2 + '"/><path d="M20,0 L20,-30 L45,-48 L70,-30 L70,0 Z" fill="' + SIL + '"/></g>';
    s += star(300, 200, 12, { glow: true });
    s += star(480, 340, 9, { opacity: .85 });
    s += star(120, 320, 8, { opacity: .8 });
    return frame(s);
  };

  // I10 — Cada paso cuenta (sendero ascendente)
  scenes.senda = function () {
    var s = bg();
    s += scatter(122, 40, { maxY: 420 });
    s += hill(560, 40, SIL2, 1);
    var path = [[90, 730], [150, 680], [220, 650], [260, 590], [330, 560], [370, 500], [440, 470], [470, 400], [520, 340]];
    for (var i = 0; i < path.length; i++) {
      s += sparkle(path[i][0], path[i][1], 7, .8, i % 2 ? GOLD : CREAM);
    }
    s += star(540, 300, 22, { face: true, glow: true });
    return frame(s);
  };

  // I11 — Juntos (círculo alrededor de una luz)
  scenes.circulo = function () {
    var s = bg();
    s += scatter(133, 45, { maxY: 380 });
    s += star(300, 430, 34, { glow: true, opacity: 1 });
    var n = 6, r = 150;
    for (var i = 0; i < n; i++) {
      var ang = (i / n) * Math.PI * 2 - Math.PI / 2;
      var x = 300 + r * Math.cos(ang);
      var y = 480 + r * 0.55 * Math.sin(ang) + 40;
      s += child(x, y, 2.1, ang > Math.PI / 2 || ang < -Math.PI / 2 ? -1 : 1, 'sit');
    }
    return frame(s);
  };

  // I12 — Cada uno su luz (niños con su propia estrella)
  scenes.propiaLuz = function () {
    var s = bg();
    s += scatter(144, 30, { maxY: 300 });
    var data = [
      [110, 700, 1.9, 1], [230, 650, 2.4, 1], [350, 690, 2.1, -1],
      [470, 640, 2.6, -1], [545, 700, 1.8, 1]
    ];
    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      var headTop = d[1] - 69 * d[2];
      s += star(d[0], headTop - 34, 9 + i * 1.2, { glow: true, opacity: .95 });
      s += child(d[0], d[1], d[2], d[3], 'stand');
    }
    return frame(s);
  };

  // I13 — Cierre (gran constelación en forma de estrella)
  scenes.cierre = function () {
    var s = bg();
    s += scatter(155, 55, { maxY: 560 });
    var outerPts = [];
    var cx = 300, cy = 340, R = 190;
    for (var i = 0; i < 5; i++) {
      var a = -Math.PI / 2 + i * (Math.PI * 2 / 5);
      outerPts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]);
    }
    var d = 'M';
    for (var j = 0; j < 5; j++) {
      d += outerPts[j][0].toFixed(1) + ',' + outerPts[j][1].toFixed(1) + ' L' + cx + ',' + cy + ' ';
    }
    s += '<path d="' + d + 'Z" stroke="' + GOLD + '" stroke-width="1.4" fill="none" opacity=".35"/>';
    for (var k = 0; k < 5; k++) {
      s += star(outerPts[k][0], outerPts[k][1], 16, { glow: true, opacity: 1 });
    }
    s += star(cx, cy, 30, { face: true, glow: true });
    s += hill(660, 22, SIL, 1);
    s += '<g transform="translate(300,700)"><path d="M-90,0 L-90,-60 L0,-100 L90,-60 L90,0 Z" fill="' + SIL2 + '"/><path d="M-22,-40 a22,22 0 0 1 44,0 v40 h-44 Z" fill="' + GOLD_SOFT + '" opacity=".8"/></g>';
    return frame(s);
  };

  global.STAR_ILLUSTRATIONS = scenes;
})(window);
