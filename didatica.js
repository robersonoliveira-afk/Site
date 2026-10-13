/* Peças didáticas das partes I a VI. Cada parte chama as funções com o próprio conteúdo. */
(function(){
  var D = window.Didatica = {};
  var reais = function(v){ return (v < 0 ? '- ' : '') + 'R$ ' + Math.abs(Math.round(v)).toLocaleString('pt-BR'); };
  D.reais = reais;

  /* elementos com data-anima ganham .on quando aparecem na tela (inclusive ao abrir uma aula) */
  function animar(){
    var els = document.querySelectorAll('[data-anima]');
    if (!('IntersectionObserver' in window)){ els.forEach(function(e){ e.classList.add('on'); }); return; }
    var io = new IntersectionObserver(function(ents){
      ents.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add('on'); io.unobserve(en.target); } });
    }, {threshold:.3});
    els.forEach(function(e){ io.observe(e); });
  }
  document.addEventListener('DOMContentLoaded', animar);

  /* ===== Cascata: parte de um valor e desconta itens, um por toque =====
     cfg: {inicio:{t, v}, itens:[{t, v}], fim:'texto do total', msgs:[...]} */
  D.cascata = function(el, cfg){
    var itens = [cfg.inicio].concat(cfg.itens), passo = 0;
    var mx = cfg.inicio.v, mn = 0, acc = cfg.inicio.v;
    cfg.itens.forEach(function(i){ acc -= i.v; mn = Math.min(mn, acc); });
    var span = mx - mn, pos = function(v){ return (v - mn) / span * 100; };
    var lista = el.querySelector('.lista'), h = '';
    itens.forEach(function(it, k){
      h += '<div class="linha' + (k === 0 ? ' vis' : '') + '"><div class="rot"><span>' + it.t + '</span><b>' + (k === 0 ? reais(it.v) : '- ' + reais(it.v)) + '</b></div>' +
           '<div class="trilho"><span class="zero" style="left:' + pos(0) + '%"></span><span class="barra"></span></div></div>';
    });
    lista.innerHTML = h;
    var linhas = lista.querySelectorAll('.linha'), tot = el.querySelector('.total'), totv = tot.querySelector('b'), msg = el.querySelector('.msg');
    var bt = el.querySelector('[data-passo]'), br = el.querySelector('[data-recomeca]');
    function desenha(){
      var saldo = cfg.inicio.v;
      linhas.forEach(function(l, k){
        var b = l.querySelector('.barra');
        if (k > passo){ l.classList.remove('vis'); b.style.width = '0'; b.style.left = pos(0) + '%'; return; }
        l.classList.add('vis');
        if (k === 0){ b.style.left = pos(0) + '%'; b.style.width = (pos(saldo) - pos(0)) + '%'; b.style.background = 'var(--olive)'; }
        else {
          var antes = saldo; saldo -= itens[k].v;
          b.style.left = pos(saldo) + '%'; b.style.width = (pos(antes) - pos(saldo)) + '%'; b.style.background = 'var(--terra)';
        }
      });
      totv.textContent = reais(saldo);
      tot.classList.toggle('neg', saldo < 0);
      msg.textContent = cfg.msgs[passo] || '';
      bt.disabled = passo >= itens.length - 1;
    }
    bt.addEventListener('click', function(){ if (passo < itens.length - 1){ passo++; desenha(); } });
    br.addEventListener('click', function(){ passo = 0; desenha(); });
    desenha();
  };

  /* ===== Classificador: um item por vez, o aluno escolhe a categoria =====
     cfg: {categorias:[{id, t}], itens:[{t, c, e}], aoAcertar:fn(item), fim:'texto'} */
  D.classificador = function(el, cfg){
    var i = 0, ac = 0, g = function(s){ return el.querySelector(s); };
    var itens = cfg.itens.slice();
    for (var k = itens.length - 1; k > 0; k--){ var r = Math.floor(Math.random() * (k + 1)), t = itens[k]; itens[k] = itens[r]; itens[r] = t; }
    var ops = g('.opcoes');
    ops.style.gridTemplateColumns = 'repeat(' + Math.min(cfg.categorias.length, cfg.colunas || 3) + ',1fr)';
    ops.innerHTML = cfg.categorias.map(function(c){ return '<button type="button" data-c="' + c.id + '">' + c.t + '</button>'; }).join('');
    var bts = ops.querySelectorAll('button');
    g('.tot').textContent = itens.length;
    function mostra(){
      var it = g('.item'), txt = itens[i].t; it.classList.add('troca');
      setTimeout(function(){ it.textContent = txt; it.classList.remove('troca'); }, 180);
      g('.pos').textContent = i + 1;
      g('.resp').className = 'resp';
      bts.forEach(function(b){ b.disabled = false; b.className = ''; });
    }
    bts.forEach(function(b){
      b.addEventListener('click', function(){
        var it = itens[i], certo = b.getAttribute('data-c') === it.c;
        if (certo){ ac++; if (cfg.aoAcertar) cfg.aoAcertar(it); }
        bts.forEach(function(x){ x.disabled = true; if (x.getAttribute('data-c') === it.c) x.className = 'certa'; });
        if (!certo) b.className = 'errada';
        g('.ac').textContent = ac;
        g('.resp-txt').textContent = (certo ? 'Certo. ' : 'Não exatamente. ') + it.e;
        g('.prox').textContent = i < itens.length - 1 ? 'Próximo' : 'Ver resultado';
        g('.resp').className = 'resp on';
      });
    });
    g('.prox').addEventListener('click', function(){
      i++;
      if (i < itens.length){ mostra(); return; }
      g('.item').style.display = 'none'; ops.style.display = 'none'; g('.resp').className = 'resp';
      g('.fim b').textContent = ac + ' de ' + itens.length + ' acertos';
      g('.fim span').textContent = cfg.fim || '';
      g('.fim').className = 'fim on';
    });
    mostra();
  };
  D.htmlClassificador = function(){
    return '<div class="placar"><span>Item <b class="pos">1</b> de <b class="tot"></b></span><span>Acertos <b class="ac">0</b></span></div>' +
      '<div class="item"></div><div class="opcoes"></div>' +
      '<div class="resp"><span class="resp-txt"></span><br><button type="button" class="dd-btn prox">Próximo</button></div>' +
      '<div class="fim"><b></b><span></span></div>';
  };

  /* ===== Curva de resposta a um insumo: máximo técnico x ótimo econômico =====
     Y = a + b·x − c·x²  ;  ótimo econômico onde a produção a mais por unidade de insumo (b − 2c·x) = preço do insumo / preço do produto */
  D.curva = function(el, cfg){
    var a = cfg.a, b = cfg.b, c = cfg.c, xmax = cfg.xmax, svg = el.querySelector('svg');
    var W = 340, H = 220, L = 44, R = 12, T = 14, B = 34;
    var xMaxTec = b / (2 * c), ymax = a + b * xMaxTec - c * xMaxTec * xMaxTec, ymin = cfg.ymin;
    var X = function(x){ return L + x / xmax * (W - L - R); }, Y = function(y){ return T + (ymax * 1.06 - y) / (ymax * 1.06 - ymin) * (H - T - B); };
    var NS = 'http://www.w3.org/2000/svg', h = '';
    var pts = []; for (var x = 0; x <= xmax; x += xmax / 60){ var y = a + b * x - c * x * x; pts.push(X(x).toFixed(1) + ',' + Y(y).toFixed(1)); }
    h += '<line x1="' + L + '" y1="' + (H - B) + '" x2="' + (W - R) + '" y2="' + (H - B) + '" stroke="#9B9890"/>';
    h += '<line x1="' + L + '" y1="' + T + '" x2="' + L + '" y2="' + (H - B) + '" stroke="#9B9890"/>';
    [0, xmax / 2, xmax].forEach(function(v){ h += '<text x="' + X(v) + '" y="' + (H - B + 16) + '" font-size="11" fill="#6B6960" text-anchor="middle">' + Math.round(v) + '</text>'; });
    h += '<text x="' + ((W + L) / 2) + '" y="' + (H - 4) + '" font-size="11.5" fill="#6B6960" text-anchor="middle">' + cfg.eixoX + '</text>';
    h += '<text x="12" y="' + ((H - B + T) / 2) + '" font-size="11.5" fill="#6B6960" text-anchor="middle" transform="rotate(-90 12 ' + ((H - B + T) / 2) + ')">' + cfg.eixoY + '</text>';
    h += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="#3D4A2A" stroke-width="2.6"/>';
    h += '<g><line x1="' + X(xMaxTec) + '" x2="' + X(xMaxTec) + '" y1="' + Y(ymax) + '" y2="' + (H - B) + '" stroke="#6B6960" stroke-dasharray="4 3"/>' +
         '<circle cx="' + X(xMaxTec) + '" cy="' + Y(ymax) + '" r="5" fill="#6B6960"/>' +
         '<text x="' + (X(xMaxTec) + 7) + '" y="' + (Y(ymax) - 6) + '" font-size="11.5" fill="#3A3833">máximo técnico</text></g>';
    h += '<g class="marca" id="' + el.id + '-ot"><line class="ln" x1="0" x2="0" y1="0" y2="0" stroke="#A8552E" stroke-width="2"/><circle class="pt" r="6" fill="#A8552E"/>' +
         '<text class="tx" font-size="11.5" fill="#A8552E" font-weight="600" text-anchor="end">ótimo econômico</text></g>';
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.innerHTML = h;
    var g = function(s){ return el.querySelector(s); };
    var mk = g('#' + el.id + '-ot');
    function calc(){
      var pi = +g('[data-pi]').value, pp = +g('[data-pp]').value;
      g('[data-pi-v]').textContent = 'R$ ' + pi.toLocaleString('pt-BR', {minimumFractionDigits:2}) + cfg.uIns;
      g('[data-pp-v]').textContent = 'R$ ' + pp.toLocaleString('pt-BR') + cfg.uProd;
      var r = pi / pp, xo = Math.max(0, Math.min(xMaxTec, (b - r) / (2 * c))), yo = a + b * xo - c * xo * xo;
      mk.querySelector('.ln').setAttribute('x1', X(xo)); mk.querySelector('.ln').setAttribute('x2', X(xo));
      mk.querySelector('.ln').setAttribute('y1', Y(yo)); mk.querySelector('.ln').setAttribute('y2', H - B);
      mk.querySelector('.pt').setAttribute('cx', X(xo)); mk.querySelector('.pt').setAttribute('cy', Y(yo));
      var tx = mk.querySelector('.tx'); tx.setAttribute('x', X(xo) - 8); tx.setAttribute('y', Y(yo) + 22);
      g('[data-xo]').textContent = Math.round(xo) + ' ' + cfg.uX;
      g('[data-xm]').textContent = Math.round(xMaxTec) + ' ' + cfg.uX;
      var dif = (xMaxTec - xo) * pi - (ymax - yo) * pp;
      g('[data-msg]').textContent = 'Ir do ótimo econômico até o máximo técnico custaria ' + Math.round(xMaxTec - xo) + ' ' + cfg.uX + ' a mais de insumo para colher ' + (ymax - yo).toLocaleString('pt-BR', {maximumFractionDigits:1}) + ' ' + cfg.uY + ' a mais: ' + (dif > 0 ? 'o insumo a mais custa ' + reais(dif) + ' por hectare além do que a produção a mais paga.' : 'a diferença é pequena com esses preços.');
    }
    el.querySelectorAll('input[type=range]').forEach(function(i){ i.addEventListener('input', calc); });
    calc();
  };
})();
