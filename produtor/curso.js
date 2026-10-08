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
    salvarCaderno: function(secao, dados){
      var c = ler(KEY_CAD); c[secao] = dados; return gravar(KEY_CAD, c);
    },
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

  /* ===== Cópia do caderno: baixar e carregar ===== */
  var KEY_BKP = 'gpr_copia';
  function temDados(){ var c = ler(KEY_CAD); return Object.keys(c).length > 0; }
  function pacote(){
    var perfil; try{ perfil = localStorage.getItem(KEY_PERFIL); }catch(e){}
    return {curso:'gestao-propriedade-rural', versao:1, data:new Date().toISOString(), perfil:perfil || 'ja', progresso:ler(KEY_PROG), caderno:ler(KEY_CAD)};
  }
  /* .txt abre em qualquer aparelho e passa pelo WhatsApp e pelo e-mail; o conteúdo continua em JSON */
  function nomeArquivo(){ return 'caderno-propriedade-' + new Date().toISOString().slice(0,10) + '.txt'; }
  function marcarCopia(){ try{ localStorage.setItem(KEY_BKP, new Date().toISOString()); }catch(e){} }
  function arquivo(){ return new Blob([JSON.stringify(pacote(), null, 1)], {type:'text/plain'}); }
  function toast(msg){
    var t = document.getElementById('toast-copia');
    if (!t){ t = document.createElement('div'); t.id = 'toast-copia'; t.className = 'toast-copia'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('on');
    clearTimeout(t._h); t._h = setTimeout(function(){ t.classList.remove('on'); }, 6000);
  }

  Curso.baixar = function(){
    var url = URL.createObjectURL(arquivo()), a = document.createElement('a');
    a.href = url; a.download = nomeArquivo(); document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(url); a.remove(); }, 1000);
    marcarCopia(); avisoCopia();
    toast('Cópia salva como ' + a.download + ', na pasta de downloads do aparelho.');
  };
  Curso.carregar = function(file){
    var r = new FileReader();
    r.onload = function(){
      var d;
      try{ d = JSON.parse(r.result); }catch(e){ d = null; }
      if (!d || d.curso !== 'gestao-propriedade-rural' || typeof d.caderno !== 'object'){
        alert('Este arquivo não é um caderno do curso. Procure o arquivo que começa com "caderno-propriedade".'); return;
      }
      var quando = new Date(d.data).toLocaleDateString('pt-BR');
      if (temDados() && !confirm('Substituir os números deste aparelho pelos do caderno de ' + quando + '?')) return;
      gravar(KEY_CAD, d.caderno); gravar(KEY_PROG, d.progresso || {});
      try{ localStorage.setItem(KEY_PERFIL, d.perfil || 'ja'); }catch(e){}
      marcarCopia();
      alert('Caderno de ' + quando + ' carregado.');
      location.reload();
    };
    r.readAsText(file);
  };

  /* monta os botões em qualquer elemento com data-copia */
  function botoesCopia(){
    document.querySelectorAll('[data-copia]').forEach(function(box){
      var inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.txt,.json,text/plain,application/json'; inp.hidden = true;
      inp.addEventListener('change', function(){ if (inp.files[0]) Curso.carregar(inp.files[0]); inp.value = ''; });
      var h = '<button type="button" class="cp-b" data-a="baixar">Baixar meu caderno</button>';
      h += '<button type="button" class="cp-b" data-a="carregar">Carregar caderno</button>';
      box.classList.add('copia'); box.innerHTML = h; box.appendChild(inp);
      box.querySelectorAll('.cp-b').forEach(function(b){
        b.addEventListener('click', function(){
          var a = b.getAttribute('data-a');
          if (a === 'carregar') return inp.click();
          if (!temDados()){ alert('O caderno ainda está vazio. Preencha a conta "Na sua propriedade" de algum módulo primeiro.'); return; }
          Curso.baixar();
        });
      });
    });
  }

  /* lembrete quando há números e nenhuma cópia nos últimos 7 dias */
  function avisoCopia(aoConcluir){
    var bar = document.getElementById('aviso-copia');
    var ult; try{ ult = localStorage.getItem(KEY_BKP); }catch(e){}
    var idade = ult ? Date.now() - new Date(ult).getTime() : Infinity;
    var precisa = aoConcluir === true ? idade > 864e5 : idade > 7 * 864e5;
    var fechado; try{ fechado = sessionStorage.getItem('gpr_aviso_fechado'); }catch(e){}
    if (!temDados() || !precisa || (fechado && aoConcluir !== true)){ if (bar) bar.remove(); return; }
    if (bar) bar.remove();
    bar = document.createElement('div'); bar.id = 'aviso-copia'; bar.className = 'aviso-copia';
    bar.innerHTML = '<span>' + (aoConcluir === true ? 'Módulo concluído. ' : '') + 'Seus números estão guardados só neste aparelho. Guarde uma cópia do caderno para não perder.</span>' +
      '<button type="button" class="ac-b" data-a="baixar">Baixar cópia</button><button type="button" class="ac-x" aria-label="fechar">×</button>';
    bar.querySelector('.ac-b').addEventListener('click', Curso.baixar);
    bar.querySelector('.ac-x').addEventListener('click', function(){ try{ sessionStorage.setItem('gpr_aviso_fechado', '1'); }catch(e){} bar.remove(); });
    document.body.appendChild(bar);
  }
  Curso.avisoCopia = avisoCopia;

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
    btn.addEventListener('click', function(){ Curso.concluir(n); marcar(); avisoCopia(true); });
  }

  document.addEventListener('DOMContentLoaded', function(){
    perfil(); revelar(); animar(); barraLeitura(); teste(); concluir(); botoesCopia();
    setTimeout(avisoCopia, 1500);
  });
})();
