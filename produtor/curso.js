/* Curso de gestão para produtores · comportamento comum
   - progresso dos módulos (gpr_progresso), caderno da propriedade (gpr_caderno) e perfil (gpr_perfil) no localStorage
   - revelação ao rolar, barra de leitura, teste rápido, botão concluir */
(function(){
  var KEY_PROG = 'gpr_progresso', KEY_CAD = 'gpr_caderno', KEY_PERFIL = 'gpr_perfil';

  function ler(k){ try{ return JSON.parse(localStorage.getItem(k)) || {}; }catch(e){ return {}; } }
  function gravar(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); return true; }catch(e){ return false; } }

  var Curso = window.Curso = {
    progresso: function(){ return ler(KEY_PROG); },
    concluir: function(n){ var p = ler(KEY_PROG); p['m' + n] = new Date().toISOString().slice(0,10); gravar(KEY_PROG, p); },
    concluido: function(n){ return !!ler(KEY_PROG)['m' + n]; },
    caderno: function(){ return ler(KEY_CAD); },
    salvarCaderno: function(secao, dados){ var c = ler(KEY_CAD); c[secao] = dados; return gravar(KEY_CAD, c); },
    /* perfil: 'ja' (já produz) ou 'novo' (quer começar) */
    perfil: function(){ try{ return localStorage.getItem(KEY_PERFIL) || 'ja'; }catch(e){ return 'ja'; } },
    definirPerfil: function(p){
      try{ localStorage.setItem(KEY_PERFIL, p); }catch(e){}
      aplicarPerfil(p);
      document.dispatchEvent(new CustomEvent('perfil', {detail:p}));
    },
    reais: function(v){
      if (!isFinite(v)) return 'R$ 0';
      var s = Math.round(Math.abs(v)).toLocaleString('pt-BR');
      return (v < 0 ? '- ' : '') + 'R$ ' + s;
    },
    num: function(str){
      if (typeof str === 'number') return str;
      str = String(str || '').replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.');
      var v = parseFloat(str); return isFinite(v) ? v : 0;
    },
    /* formata o campo com separador de milhar enquanto digita */
    mascara: function(inp){
      inp.addEventListener('input', function(){
        var d = inp.value.replace(/\D/g, '');
        inp.value = d ? parseInt(d, 10).toLocaleString('pt-BR') : '';
      });
    }
  };

  function aplicarPerfil(p){
    document.body.classList.toggle('perfil-novo', p === 'novo');
    document.querySelectorAll('[data-perfil]').forEach(function(b){
      b.classList.toggle('on', b.getAttribute('data-perfil') === p);
    });
  }
  function perfil(){
    aplicarPerfil(Curso.perfil());
    document.querySelectorAll('[data-perfil]').forEach(function(b){
      b.addEventListener('click', function(){ Curso.definirPerfil(b.getAttribute('data-perfil')); });
    });
  }

  /* revelação ao rolar */
  function revelar(){
    var els = document.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window)){ els.forEach(function(e){ e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function(ents){
      ents.forEach(function(en){
        if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function(e){ io.observe(e); });
  }

  /* gatilho genérico: elementos com data-anima recebem .on quando aparecem */
  function animar(){
    var els = document.querySelectorAll('[data-anima]');
    if (!('IntersectionObserver' in window)){ els.forEach(function(e){ e.classList.add('on'); }); return; }
    var io = new IntersectionObserver(function(ents){
      ents.forEach(function(en){
        if (en.isIntersecting){ en.target.classList.add('on'); io.unobserve(en.target); }
      });
    }, { threshold: 0.35 });
    els.forEach(function(e){ io.observe(e); });
  }

  /* barra de leitura */
  function barraLeitura(){
    var bar = document.querySelector('.readbar'); if (!bar) return;
    function upd(){
      var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    }
    window.addEventListener('scroll', upd, { passive: true }); upd();
  }

  /* teste rápido: .q com botões .alt; a certa tem data-certa */
  function teste(){
    document.querySelectorAll('.q').forEach(function(q){
      var alts = q.querySelectorAll('button.alt');
      alts.forEach(function(b){
        b.addEventListener('click', function(){
          if (q.classList.contains('respondida')) return;
          q.classList.add('respondida');
          alts.forEach(function(x){
            x.disabled = true;
            if (x.hasAttribute('data-certa')) x.classList.add('certa');
          });
          if (!b.hasAttribute('data-certa')) b.classList.add('errada');
          var fb = q.querySelector('.fb');
          if (fb){
            var pre = b.hasAttribute('data-certa') ? 'Isso mesmo. ' : 'Não é bem assim. ';
            fb.insertAdjacentText('afterbegin', pre);
          }
        });
      });
    });
  }

  /* botão concluir: data-modulo="N" */
  function concluir(){
    var btn = document.querySelector('[data-concluir]'); if (!btn) return;
    var n = btn.getAttribute('data-concluir');
    function marcar(){ btn.classList.add('feito'); btn.textContent = 'Módulo concluído'; }
    if (Curso.concluido(n)) marcar();
    btn.addEventListener('click', function(){ Curso.concluir(n); marcar(); });
  }

  document.addEventListener('DOMContentLoaded', function(){
    perfil(); revelar(); animar(); barraLeitura(); teste(); concluir();
  });
})();
