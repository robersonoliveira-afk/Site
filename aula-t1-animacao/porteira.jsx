// A porteira — animação da aula T1 (A propriedade como empresa + SWOT).
// Cenas dirigidas pelo relógio de cena (useScene); base persistente = masthead + porteira.
// Globais de animations-v2.jsx: Easing, clamp, interpolate, SceneStage, useScene.
// Globais de tweaks-panel.jsx: useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakRadio.

const SERIF = "'Source Serif 4', Georgia, 'Times New Roman', serif";
const C = {
  paper: '#f3f2f2', ink: '#201e1d', sub: '#6f6a63',
  cyan: '#0088b0', mag: '#d6006c', line: '#c9c6c1', gray: '#8f8a82',
};

const ap = (p, s, d = 0.25) => Easing.easeOutCubic(clamp((p - s) / d, 0, 1));
const osc = (lt, per) => Math.sin((lt * Math.PI * 2) / per);

const TweaksCtx = React.createContext(null);
function useTw() {
  const t = React.useContext(TweaksCtx) || {};
  const lead = t.accentLead === 'magenta';
  return {
    captions: t.captions !== false,
    A: lead ? C.mag : C.cyan,
    B: lead ? C.cyan : C.mag,
  };
}

function bodyFade(p) {
  const i = Easing.easeOutCubic(clamp(p / 0.08, 0, 1));
  const o = Easing.easeInCubic(clamp((p - 0.92) / 0.08, 0, 1));
  return i * (1 - o);
}
function SceneBody(props) {
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: bodyFade(props.p) }}>
      {props.children}
    </div>
  );
}

// ── Base: masthead + porteira (idêntica em toda cena → cortes casam) ──────────
function Base() {
  return (
    <React.Fragment>
      <svg width="1280" height="720" viewBox="0 0 1280 720"
           style={{ position: 'absolute', inset: 0 }}>
        <line x1="80" y1="54" x2="1200" y2="54" stroke={C.ink} strokeWidth="1.2" />
        <rect x="80" y="60" width="1120" height="4" fill={C.ink} />
        <g stroke={C.ink} strokeWidth="3" strokeLinecap="round" fill="none">
          <line x1="505" y1="466" x2="505" y2="620" />
          <line x1="775" y1="466" x2="775" y2="620" />
          <line x1="505" y1="483" x2="775" y2="483" />
          <line x1="505" y1="528" x2="775" y2="528" />
          <line x1="505" y1="573" x2="775" y2="573" />
          <line x1="505" y1="610" x2="775" y2="610" />
          <line x1="505" y1="610" x2="775" y2="483" />
        </g>
        <line x1="360" y1="624" x2="920" y2="624" stroke={C.ink} strokeWidth="2" />
        <circle cx="505" cy="492" r="4" fill={C.ink} />
        <circle cx="505" cy="600" r="4" fill={C.ink} />
      </svg>
      <div style={{ position: 'absolute', left: 80, top: 30, fontFamily: SERIF,
        fontSize: 13, letterSpacing: '0.16em', fontWeight: 600, color: C.ink }}>
        T1 · A PROPRIEDADE COMO EMPRESA
      </div>
      <div style={{ position: 'absolute', right: 80, top: 22, fontFamily: SERIF,
        fontSize: 13, letterSpacing: '0.16em', fontWeight: 600, color: C.ink, textAlign: 'right' }}>
        COLÉGIO POLITÉCNICO DA UFSM
      </div>
      <div style={{ position: 'absolute', right: 80, top: 40, fontFamily: SERIF,
        fontSize: 11, letterSpacing: '0.14em', fontWeight: 600, color: C.sub, textAlign: 'right' }}>
        PROF. RÓBERSON MACEDO DE OLIVEIRA
      </div>
      <img src="colegio-banner.png" alt="" style={{ position: 'absolute', left: 80, top: 632,
        width: 250, height: 'auto' }} />
    </React.Fragment>
  );
}

function Kicker(props) {
  const tw = useTw();
  return (
    <div style={{ position: 'absolute', left: 80, top: 92, fontFamily: SERIF,
      fontSize: 14, letterSpacing: '0.16em', fontWeight: 600, color: tw.A }}>
      {props.text}
    </div>
  );
}
function Caption(props) {
  const tw = useTw();
  if (!tw.captions || !props.text) return null;
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 674, textAlign: 'center',
      fontFamily: SERIF, fontStyle: 'italic', fontSize: 19, color: tw.A, padding: '0 150px',
      lineHeight: 1.3 }}>
      {props.text}
    </div>
  );
}

// ── Cena 1 · A pergunta ───────────────────────────────────────────────────────
function Cover(props) {
  const p = props.progress, s = props.scene, tw = useTw();
  return (
    <React.Fragment>
      <Base />
      <SceneBody p={p}>
        <Kicker text={s.kicker} />
        <div style={{ position: 'absolute', left: 110, top: 152, width: 800, fontFamily: SERIF, color: C.ink }}>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.05,
            transform: `translateY(${(1 - ap(p, 0.05)) * 22}px)` }}>
            Por que <span style={{ fontStyle: 'italic', color: tw.A }}>projeto</span>
          </div>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.05,
            transform: `translateY(${(1 - ap(p, 0.13)) * 22}px)` }}>
            vem antes de <span style={{ fontStyle: 'italic', color: tw.B }}>planilha</span>?
          </div>
          <div style={{ marginTop: 26, fontSize: 23, fontStyle: 'italic', color: C.sub, maxWidth: 660,
            transform: `translateY(${(1 - ap(p, 0.28)) * 16}px)` }}>
            Quem calcula sem planejar responde com precisão à pergunta errada.
          </div>
        </div>
      </SceneBody>
    </React.Fragment>
  );
}

// ── Cena 2 · As três porteiras ────────────────────────────────────────────────
function Cadeia(props) {
  const p = props.progress, lt = props.localTime, s = props.scene, tw = useTw();
  const cols = [
    { x: 96, w: 300, head: 'ANTES · A MONTANTE', color: C.sub,
      items: ['Sementes, adubo, defensivos', 'Máquinas · crédito · pesquisa'], d: 0.1 },
    { x: 490, w: 300, head: 'DENTRO', color: tw.A,
      items: ['A produção na porteira:', 'plantio, tratos, colheita, rebanho'], d: 0.22 },
    { x: 884, w: 300, head: 'DEPOIS · A JUSANTE', color: C.sub,
      items: ['Indústria · abate · logística', 'Varejo · mesa do consumidor'], d: 0.34 },
  ];
  return (
    <React.Fragment>
      <Base />
      <SceneBody p={p}>
        <Kicker text={s.kicker} />
        <svg width="1280" height="720" viewBox="0 0 1280 720"
             style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <defs>
            <marker id="ah" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
              <path d="M0,0 L7,3 L0,6 Z" fill={C.ink} />
            </marker>
          </defs>
          <line x1="150" y1="300" x2="1130" y2="300" stroke={C.line} strokeWidth="10" />
          <line x1="150" y1="300" x2="1120" y2="300" stroke={tw.A} strokeWidth="3"
            strokeDasharray="8 14" strokeDashoffset={-lt * 46} markerEnd="url(#ah)"
            opacity={ap(p, 0.15, 0.4)} />
          <circle cx="246" cy="300" r="7" fill={C.ink} />
          <circle cx="640" cy="300" r="9" fill={tw.A} />
          <circle cx="1034" cy="300" r="7" fill={C.ink} />
        </svg>
        {cols.map((c, i) => (
          <div key={i} style={{ position: 'absolute', left: c.x, top: 150, width: c.w,
            transform: `translateY(${(1 - ap(p, c.d)) * 16}px)`, opacity: ap(p, c.d) }}>
            <div style={{ fontFamily: SERIF, fontSize: 15, letterSpacing: '0.1em',
              fontWeight: 700, color: c.color }}>{c.head}</div>
            {c.items.map((it, j) => (
              <div key={j} style={{ fontFamily: SERIF, fontSize: j === 0 ? 21 : 18,
                color: C.ink, marginTop: j === 0 ? 12 : 4, lineHeight: 1.3,
                fontWeight: j === 0 ? 600 : 400 }}>{it}</div>
            ))}
          </div>
        ))}
        <div style={{ position: 'absolute', left: 490, top: 340, width: 300, textAlign: 'center',
          fontFamily: SERIF, fontStyle: 'italic', fontSize: 15, color: C.sub, opacity: ap(p, 0.5) }}>
          a menor fatia fica com quem produz
        </div>
        <Caption text={s.caption} />
      </SceneBody>
    </React.Fragment>
  );
}

// ── Cena 3 · Apertada entre dois preços ───────────────────────────────────────
function Squeeze(props) {
  const p = props.progress, lt = props.localTime, s = props.scene, tw = useTw();
  const press = 6 + 9 * Math.abs(osc(lt, 2.2));
  const glow = 8 + 7 * (0.5 + 0.5 * osc(lt, 2.2));
  const side = (label) => (
    <React.Fragment>
      <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: C.ink }}>{label}</div>
      <div style={{ fontFamily: SERIF, fontSize: 17, fontStyle: 'italic', color: C.sub, marginTop: 4 }}>
        não controla
      </div>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <Base />
      <SceneBody p={p}>
        <Kicker text={s.kicker} />
        <svg width="1280" height="720" viewBox="0 0 1280 720"
             style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <g transform={`translate(${press},0)`} opacity={ap(p, 0.15, 0.35)}>
            <line x1="120" y1="238" x2="452" y2="238" stroke={C.ink} strokeWidth="7" strokeLinecap="round" />
            <path d="M452,238 L436,228 M452,238 L436,248" stroke={C.ink} strokeWidth="7" strokeLinecap="round" />
          </g>
          <g transform={`translate(${-press},0)`} opacity={ap(p, 0.22, 0.35)}>
            <line x1="1160" y1="238" x2="828" y2="238" stroke={C.ink} strokeWidth="7" strokeLinecap="round" />
            <path d="M828,238 L844,228 M828,238 L844,248" stroke={C.ink} strokeWidth="7" strokeLinecap="round" />
          </g>
        </svg>
        <div style={{ position: 'absolute', left: 120, top: 148, opacity: ap(p, 0.12) }}>{side('PREÇO DO INSUMO')}</div>
        <div style={{ position: 'absolute', right: 120, top: 148, textAlign: 'right', opacity: ap(p, 0.2) }}>{side('PREÇO DE VENDA')}</div>
        <div style={{ position: 'absolute', left: 490, top: 186, width: 300, height: 104,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          border: `2.5px solid ${tw.A}`, borderRadius: 3, background: C.paper,
          boxShadow: `0 0 ${glow}px ${tw.A}55`, opacity: ap(p, 0.3) }}>
          <div style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 700, color: C.ink,
            textAlign: 'center', lineHeight: 1.2 }}>CUSTOS DENTRO<br />DA PORTEIRA</div>
          <div style={{ fontFamily: SERIF, fontSize: 22, fontStyle: 'italic', color: tw.A, marginTop: 6 }}>
            controla
          </div>
        </div>
        <Caption text={s.caption} />
      </SceneBody>
    </React.Fragment>
  );
}

// ── Cena 4 · Controlar × monitorar ────────────────────────────────────────────
function Controla(props) {
  const p = props.progress, s = props.scene, tw = useTw();
  const trackX = 140, trackW = 940;
  const Bar = (o) => {
    const grow = ap(p, o.d, 0.5);
    const val = Math.round(o.pct * grow);
    return (
      <div style={{ position: 'absolute', left: trackX, top: o.y, width: trackW, opacity: ap(p, o.d) }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 700, letterSpacing: '0.08em', color: o.color }}>{o.label}</div>
          <div style={{ fontFamily: SERIF, fontSize: 18, fontStyle: 'italic', color: C.sub }}>{o.note}</div>
        </div>
        <div style={{ position: 'relative', height: 46, border: `1.5px solid ${C.line}` }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0,
            width: `${o.pct * grow}%`, background: o.color }} />
          <div style={{ position: 'absolute', left: `calc(${o.pct * grow}% + 16px)`, top: 0, height: 46,
            display: 'flex', alignItems: 'center', fontFamily: SERIF, fontSize: 38, fontWeight: 700,
            color: o.color }}>{val}%</div>
        </div>
      </div>
    );
  };
  return (
    <React.Fragment>
      <Base />
      <SceneBody p={p}>
        <Kicker text={s.kicker} />
        {Bar({ y: 168, pct: 59, d: 0.12, color: tw.A, label: 'SOB DECISÃO HUMANA', note: 'manejo 31% + genética 27%' })}
        {Bar({ y: 300, pct: 41, d: 0.26, color: C.gray, label: 'AMBIENTE: SÓ MONITORAR', note: 'clima entre anos · N do solo' })}
        <div style={{ position: 'absolute', left: trackX, top: 404, fontFamily: SERIF, fontSize: 15,
          fontStyle: 'italic', color: C.sub, opacity: ap(p, 0.5) }}>
          Decomposição da dose econômica ótima de N no milho, Baum et al., 2024 (EUA). Princípio, não receita.
        </div>
        <Caption text={s.caption} />
      </SceneBody>
    </React.Fragment>
  );
}

// ── Matriz reutilizável (Swot + Dairy) ────────────────────────────────────────
const MX = 640, MY = 292, ML = 250, MR = 1040, MT = 152, MB = 432;
function Quad(props) {
  const { x, y, w, title, color, items, p, delay, muted } = props;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w }}>
      <div style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 700, letterSpacing: '0.04em',
        color, opacity: ap(p, delay - 0.02) }}>{title}</div>
      {items && items.map((it, i) => (
        <div key={i} style={{ fontFamily: SERIF, fontSize: muted ? 16 : 17,
          fontStyle: muted ? 'italic' : 'normal', color: muted ? C.sub : C.ink,
          marginTop: i === 0 ? 10 : 6, lineHeight: 1.25,
          opacity: ap(p, delay + i * 0.07), transform: `translateY(${(1 - ap(p, delay + i * 0.07)) * 10}px)` }}>
          {muted ? it : `› ${it}`}
        </div>
      ))}
    </div>
  );
}
function Matrix(props) {
  const { p, tw, items, muted, connectGate } = props;
  return (
    <React.Fragment>
      <svg width="1280" height="720" viewBox="0 0 1280 720"
           style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <line x1={MX} y1={MT} x2={MX} y2={MB} stroke={C.ink} strokeWidth="1.6"
          strokeDasharray={MB - MT} strokeDashoffset={(MB - MT) * (1 - ap(p, 0.05, 0.4))} />
        <line x1={ML} y1={MY} x2={MR} y2={MY} stroke={C.ink} strokeWidth="1.6"
          strokeDasharray={MR - ML} strokeDashoffset={(MR - ML) * (1 - ap(p, 0.12, 0.45))} />
        {connectGate && (
          <line x1={MX} y1={MB} x2={MX} y2="466" stroke={tw.A} strokeWidth="1.4"
            strokeDasharray="3 6" opacity={0.4 * ap(p, 0.55)} />
        )}
      </svg>
      <div style={{ position: 'absolute', left: ML, top: MT - 30, width: MX - ML, textAlign: 'center',
        fontFamily: SERIF, fontSize: 13, letterSpacing: '0.12em', fontWeight: 600, color: tw.A,
        opacity: ap(p, 0.2) }}>INTERNO · CONTROLA</div>
      <div style={{ position: 'absolute', left: MX, top: MT - 30, width: MR - MX, textAlign: 'center',
        fontFamily: SERIF, fontSize: 13, letterSpacing: '0.12em', fontWeight: 600, color: tw.B,
        opacity: ap(p, 0.28) }}>EXTERNO · MONITORA</div>
      <Quad x={ML + 22} y={MT + 16} w={MX - ML - 44} title="FORÇAS" color={tw.A} items={items.f} muted={muted} p={p} delay={0.28} />
      <Quad x={MX + 22} y={MT + 16} w={MR - MX - 44} title="OPORTUNIDADES" color={tw.B} items={items.o} muted={muted} p={p} delay={0.36} />
      <Quad x={ML + 22} y={MY + 16} w={MX - ML - 44} title="FRAQUEZAS" color={C.ink} items={items.w} muted={muted} p={p} delay={0.44} />
      <Quad x={MX + 22} y={MY + 16} w={MR - MX - 44} title="AMEAÇAS" color={C.ink} items={items.a} muted={muted} p={p} delay={0.52} />
    </React.Fragment>
  );
}

// ── Cena 5 · SWOT (conceito) ──────────────────────────────────────────────────
function Swot(props) {
  const p = props.progress, s = props.scene, tw = useTw();
  const items = {
    f: ['o que temos de melhor'], w: ['o que nos freia'],
    o: ['o que o ambiente abre'], a: ['o que precisamos enfrentar'],
  };
  return (
    <React.Fragment>
      <Base />
      <SceneBody p={p}>
        <Kicker text={s.kicker} />
        <Matrix p={p} tw={tw} items={items} muted={true} connectGate={true} />
        <Caption text={s.caption} />
      </SceneBody>
    </React.Fragment>
  );
}

// ── Cena 6 · Exemplo leite Santa Maria ────────────────────────────────────────
function Dairy(props) {
  const p = props.progress, s = props.scene, tw = useTw();
  const items = {
    f: ['Mão de obra familiar', 'Cooperativa próxima'],
    w: ['Sem registro de custos', 'Ordenha antiga'],
    o: ['Pronaf Mais Alimentos', 'Queijo artesanal · PNAE'],
    a: ['Preço volátil', 'Estiagens recorrentes'],
  };
  return (
    <React.Fragment>
      <Base />
      <SceneBody p={p}>
        <Kicker text={s.kicker} />
        <div style={{ position: 'absolute', right: 80, top: 92, fontFamily: SERIF, fontSize: 14,
          fontStyle: 'italic', color: C.sub, opacity: ap(p, 0.1) }}>
          25 ha · 35 vacas · ~450 L/dia
        </div>
        <Matrix p={p} tw={tw} items={items} muted={false} connectGate={false} />
        <Caption text={s.caption} />
      </SceneBody>
    </React.Fragment>
  );
}

// ── Cena 7 · Fecho ────────────────────────────────────────────────────────────
function Fecho(props) {
  const p = props.progress, s = props.scene, tw = useTw();
  return (
    <React.Fragment>
      <Base />
      <SceneBody p={p}>
        <Kicker text={s.kicker} />
        <div style={{ position: 'absolute', left: 110, top: 156, width: 900, fontFamily: SERIF, color: C.ink }}>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.05,
            transform: `translateY(${(1 - ap(p, 0.06)) * 20}px)` }}>
            Primeiro a <span style={{ fontStyle: 'italic', color: tw.A }}>fotografia</span>.
          </div>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.05,
            transform: `translateY(${(1 - ap(p, 0.16)) * 20}px)` }}>
            Depois o <span style={{ fontStyle: 'italic', color: tw.B }}>número</span>.
          </div>
          <div style={{ marginTop: 24, fontSize: 22, fontStyle: 'italic', color: C.sub, maxWidth: 720,
            transform: `translateY(${(1 - ap(p, 0.3)) * 16}px)` }}>
            Cada item da SWOT vira número nas próximas aulas.
          </div>
        </div>
        <div style={{ position: 'absolute', right: 80, top: 384, fontFamily: SERIF, fontSize: 18,
          fontWeight: 600, color: tw.A, opacity: ap(p, 0.45) }}>
          T2 · Receita: da bruta à líquida →
        </div>
      </SceneBody>
    </React.Fragment>
  );
}

// ── Play com narração — trava a animação em t=0 até o clique; o clique
// remonta o SceneStage (chave nova) e dispara o áudio no mesmo instante,
// dando o melhor sincronismo possível sem um relógio compartilhado real. ──
function PlayGate(props) {
  const { onPlay } = props;
  return (
    <button onClick={onPlay} aria-label="Assistir com narração" style={{
      position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 16,
      background: 'rgba(243,242,242,0.95)', border: 'none', cursor: 'pointer', padding: 0,
    }}>
      <div style={{ width: 76, height: 76, borderRadius: '50%', background: C.cyan,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 20px rgba(0,136,176,0.35)' }}>
        <div style={{ width: 0, height: 0, marginLeft: 6,
          borderTop: '15px solid transparent', borderBottom: '15px solid transparent',
          borderLeft: '24px solid #fff' }} />
      </div>
      <div style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 600, color: C.ink,
        letterSpacing: '0.02em' }}>
        Assistir com narração
      </div>
      <div style={{ fontFamily: SERIF, fontSize: 14, fontStyle: 'italic', color: C.sub }}>
        ~1 minuto · áudio necessário
      </div>
    </button>
  );
}

function ReplayButton(props) {
  return (
    <button onClick={props.onPlay} aria-label="Assistir de novo" style={{
      position: 'absolute', right: 24, bottom: 24, display: 'flex', alignItems: 'center', gap: 8,
      fontFamily: SERIF, fontSize: 14, fontWeight: 600, color: C.ink, letterSpacing: '0.04em',
      background: C.paper, border: `1.5px solid ${C.line}`, borderRadius: 3,
      padding: '8px 14px', cursor: 'pointer',
    }}>
      ↺ assistir de novo
    </button>
  );
}

// ── Raiz ──────────────────────────────────────────────────────────────────────
function PorteiraVideo() {
  const defaults = window.TWEAK_DEFAULTS || { motionEditor: false, captions: true, accentLead: 'cyan' };
  const [t] = useTweaks(defaults);
  const map = { Cover, Cadeia, Squeeze, Controla, Swot, Dairy, Fecho };

  const [started, setStarted] = React.useState(false);
  const [ended, setEnded] = React.useState(false);
  const [runKey, setRunKey] = React.useState(0);
  const audioRef = React.useRef(null);

  const handlePlay = React.useCallback(() => {
    setStarted(true);
    setEnded(false);
    setRunKey((k) => k + 1);
    const a = audioRef.current;
    if (a) {
      a.currentTime = 0;
      a.play().catch(() => {});
    }
  }, []);

  return (
    <React.Fragment>
      <TweaksCtx.Provider value={t}>
        <SceneStage key={runKey} width={1280} height={720} bg={C.paper}
          scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} transition="cut"
          autoplay={started}>
          {map}
        </SceneStage>
      </TweaksCtx.Provider>
      <audio ref={audioRef} src="narracao-t1.mp4" preload="auto"
        onEnded={() => setEnded(true)} />
      {!started && <PlayGate onPlay={handlePlay} />}
      {started && ended && <ReplayButton onPlay={handlePlay} />}
    </React.Fragment>
  );
}
window.PorteiraVideo = PorteiraVideo;
