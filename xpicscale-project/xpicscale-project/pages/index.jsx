import { useState, useRef, useCallback, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════
// xPicScale v3 — "Des images pro qui convertissent"
// ═══════════════════════════════════════════════════════════════════

const C = {
  white: "#FFFFFF",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  surfaceAlt: "#F4F7F5",
  cream: "#FAFAF7",
  green: "#16A34A",
  greenDark: "#15803D",
  greenDeep: "#0D6B30",
  greenLight: "#DCFCE7",
  greenMuted: "#BBF7D0",
  greenAccent: "#22C55E",
  greenGlow: "rgba(22, 163, 74, 0.08)",
  greenGlow2: "rgba(22, 163, 74, 0.15)",
  red: "#EF4444",
  redLight: "#FEE2E2",
  redMuted: "#FCA5A5",
  orange: "#F97316",
  dark: "#0F1A12",
  text: "#1A2E1F",
  textMid: "#3D5A44",
  textMuted: "#6B8A72",
  textLight: "#9BB5A1",
  border: "#E2EBE5",
  borderLight: "#EEF3F0",
  shadow: "0 1px 3px rgba(15,26,18,0.06), 0 1px 2px rgba(15,26,18,0.04)",
  shadowMd: "0 4px 16px rgba(15,26,18,0.08), 0 2px 6px rgba(15,26,18,0.04)",
  shadowLg: "0 12px 40px rgba(15,26,18,0.1), 0 4px 12px rgba(15,26,18,0.06)",
};

const font = "'Outfit', sans-serif";
const fontMono = "'JetBrains Mono', monospace";
const CALENDLY_URL = "https://calendly.com/YOUR_LINK";

// ═══════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: ${C.bg}; overflow-x: hidden; }
      
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      @keyframes float2 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-12px) rotate(3deg); } }
      @keyframes pulse { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.05); } }
      @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      @keyframes drawLine { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
      @keyframes countUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes slideRight { from { transform: translateX(-100%); } to { transform: translateX(0); } }
      @keyframes wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-2deg); } 75% { transform: rotate(2deg); } }
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      @keyframes breathe { 0%, 100% { box-shadow: 0 0 0 0 rgba(22,163,74,0.15); } 50% { box-shadow: 0 0 0 20px rgba(22,163,74,0); } }
      @keyframes barGrow { from { height: 0; } }
      
      .fu { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
      .fu1 { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.08s forwards; opacity: 0; }
      .fu2 { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.16s forwards; opacity: 0; }
      .fu3 { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.24s forwards; opacity: 0; }
      .fu4 { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.32s forwards; opacity: 0; }
      .fu5 { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s forwards; opacity: 0; }
      .si { animation: scaleIn 0.5s cubic-bezier(0.22,1,0.36,1) forwards; }
      
      ::selection { background: ${C.greenLight}; color: ${C.greenDark}; }
      input::placeholder, textarea::placeholder { color: ${C.textLight}; }
    `}</style>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SHARED
// ═══════════════════════════════════════════════════════════════════

function XLogo({ size = 28, light = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: size + 8, height: size + 8, borderRadius: 10, background: light ? "rgba(255,255,255,0.15)" : `linear-gradient(135deg, ${C.green}, ${C.greenAccent})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: light ? "none" : `0 2px 12px ${C.greenGlow2}`, border: light ? "1.5px solid rgba(255,255,255,0.2)" : "none" }}>
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none"><path d="M4 4L20 20M20 4L4 20" stroke="white" strokeWidth="3.5" strokeLinecap="round" /></svg>
      </div>
      <span style={{ fontSize: size * 0.72, fontWeight: 800, color: light ? "#fff" : C.text, fontFamily: font, letterSpacing: "-0.5px" }}>xPicScale</span>
    </div>
  );
}

function Btn({ children, variant = "primary", size = "md", onClick, disabled, loading, style: s, full }) {
  const base = {
    primary: { background: `linear-gradient(135deg, ${C.green}, ${C.greenAccent})`, color: "#fff", border: "none", boxShadow: `0 2px 12px ${C.greenGlow2}` },
    outline: { background: "transparent", color: C.green, border: `1.5px solid ${C.green}` },
    ghost: { background: "transparent", color: C.textMid, border: `1.5px solid ${C.border}` },
    white: { background: "#fff", color: C.green, border: "none", boxShadow: C.shadow },
    dark: { background: C.dark, color: "#fff", border: "none" },
  };
  const sizes = {
    sm: { padding: "8px 16px", fontSize: 13 },
    md: { padding: "12px 24px", fontSize: 14 },
    lg: { padding: "16px 32px", fontSize: 16 },
    xl: { padding: "18px 40px", fontSize: 17 },
  };
  return (
    <button onClick={onClick} disabled={disabled || loading} style={{ ...base[variant], ...sizes[size], borderRadius: 11, fontWeight: 600, fontFamily: font, cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.2s ease", opacity: disabled ? 0.5 : 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, width: full ? "100%" : "auto", letterSpacing: "-0.2px", ...s }}>
      {loading && <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />}
      {children}
    </button>
  );
}

function Input({ label, type = "text", value, onChange, placeholder, icon }) {
  const [f, setF] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6, fontFamily: font }}>{label}</label>}
      <div style={{ position: "relative" }}>
        {icon && <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 15, opacity: 0.45 }}>{icon}</span>}
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} onFocus={() => setF(true)} onBlur={() => setF(false)} style={{ width: "100%", padding: icon ? "12px 16px 12px 42px" : "12px 16px", borderRadius: 10, border: `1.5px solid ${f ? C.green : C.border}`, background: C.white, color: C.text, fontSize: 14, fontFamily: font, outline: "none", transition: "all 0.2s ease", boxShadow: f ? `0 0 0 3px ${C.greenGlow}` : "none" }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ANIMATED COUNTER
// ═══════════════════════════════════════════════════════════════════

function AnimatedNumber({ target, suffix = "", prefix = "", duration = 2000, color = C.green }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) { setStarted(true); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const inc = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return (
    <span ref={ref} style={{ fontFamily: font, fontWeight: 900, fontSize: 48, color, letterSpacing: "-2px", lineHeight: 1 }}>
      {prefix}{val}{suffix}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CONVERSION GRAPH COMPONENT
// ═══════════════════════════════════════════════════════════════════

function ConversionGraph({ type }) {
  const isBad = type === "bad";
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Data points for the curves
  const badData = [1.2, 1.1, 1.3, 0.9, 1.0, 1.1, 0.8, 0.9, 1.0, 0.7, 0.8, 0.9];
  const goodData = [1.5, 2.1, 2.8, 3.2, 3.9, 4.5, 5.2, 5.8, 6.5, 7.1, 7.8, 8.4];
  const data = isBad ? badData : goodData;
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

  const w = 320, h = 160, padL = 30, padB = 24, padT = 10, padR = 10;
  const chartW = w - padL - padR;
  const chartH = h - padB - padT;
  const maxVal = isBad ? 2 : 10;

  const points = data.map((v, i) => {
    const x = padL + (i / (data.length - 1)) * chartW;
    const y = padT + chartH - (v / maxVal) * chartH;
    return { x, y };
  });

  const linePath = points.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cpx1 = prev.x + (p.x - prev.x) * 0.4;
    const cpx2 = p.x - (p.x - prev.x) * 0.4;
    return `C ${cpx1} ${prev.y}, ${cpx2} ${p.y}, ${p.x} ${p.y}`;
  }).join(" ");

  const areaPath = linePath + ` L ${points[points.length - 1].x} ${padT + chartH} L ${points[0].x} ${padT + chartH} Z`;
  const color = isBad ? C.red : C.green;
  const colorLight = isBad ? C.redLight : C.greenLight;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
          const y = padT + chartH * (1 - pct);
          return <line key={i} x1={padL} y1={y} x2={w - padR} y2={y} stroke={C.borderLight} strokeWidth="1" />;
        })}

        {/* Y-axis labels */}
        {[0, 0.5, 1].map((pct, i) => {
          const y = padT + chartH * (1 - pct);
          const label = (maxVal * pct).toFixed(1) + "%";
          return <text key={i} x={padL - 4} y={y + 4} textAnchor="end" fontSize="9" fill={C.textLight} fontFamily={fontMono}>{label}</text>;
        })}

        {/* X-axis labels */}
        {months.map((m, i) => {
          const x = padL + (i / (months.length - 1)) * chartW;
          return <text key={i} x={x} y={h - 6} textAnchor="middle" fontSize="9" fill={C.textLight} fontFamily={fontMono}>{m}</text>;
        })}

        {/* Area fill */}
        <path
          d={areaPath}
          fill={`url(#grad-${type})`}
          opacity={visible ? 0.6 : 0}
          style={{ transition: "opacity 1s ease 0.3s" }}
        />

        {/* Gradient def */}
        <defs>
          <linearGradient id={`grad-${type}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1000"
          strokeDashoffset={visible ? 0 : 1000}
          style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s" }}
        />

        {/* End dot */}
        {visible && (
          <circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r="5"
            fill={color}
            opacity={visible ? 1 : 0}
            style={{ transition: "opacity 0.3s ease 2s", animation: "breathe 2s ease infinite" }}
          />
        )}
      </svg>

      {/* Value badge */}
      {visible && (
        <div style={{
          position: "absolute",
          top: isBad ? "auto" : 4,
          bottom: isBad ? 30 : "auto",
          right: 8,
          padding: "4px 10px",
          borderRadius: 8,
          background: isBad ? C.redLight : C.greenLight,
          color: isBad ? C.red : C.greenDark,
          fontSize: 13,
          fontWeight: 800,
          fontFamily: fontMono,
          animation: "countUp 0.5s ease 2.2s both",
        }}>
          {isBad ? "0.9%" : "8.4%"}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FLOATING PARTICLES
// ═══════════════════════════════════════════════════════════════════

function Particles({ count = 12, color = C.greenAccent }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 3 + Math.random() * 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 4,
    opacity: 0.1 + Math.random() * 0.2,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: color,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// GALLERY DATA
// ═══════════════════════════════════════════════════════════════════

const galleryItems = [
  { before: "📱 Photo iPhone", after: "Studio pro fond blanc", category: "Cosmétique", prompt: "Studio photo fond blanc immaculé, éclairage 3 points, reflets subtils", color: "#FDE8E8", icon: "🧴" },
  { before: "📱 Photo bureau", after: "Lifestyle premium", category: "Tech", prompt: "Bureau minimaliste chêne, lumière dorée, plante verte floue en arrière-plan", color: "#E0F2FE", icon: "🎧" },
  { before: "📱 Photo main", after: "Packshot e-commerce", category: "Sneakers", prompt: "Fond dégradé gris clair, ombre portée nette, vue 3/4, qualité magazine", color: "#F3F4F6", icon: "👟" },
  { before: "📱 Photo cuisine", after: "Food photography", category: "Food", prompt: "Flat lay vue du dessus, marbre blanc, herbes fraîches, lumière naturelle", color: "#FEF3C7", icon: "🍶" },
  { before: "📱 Photo table", after: "Luxe & raffiné", category: "Bijoux", prompt: "Fond velours noir, éclairage dramatique latéral, reflets dorés", color: "#1A1A2E", textLight: true, icon: "💍" },
  { before: "📱 Photo rapide", after: "Shopify-ready", category: "Mode", prompt: "Fond transparent, ombre portée douce, haute définition, e-commerce ready", color: "#F0FDF4", icon: "👜" },
];

// ═══════════════════════════════════════════════════════════════════
// LANDING PAGE
// ═══════════════════════════════════════════════════════════════════

function LandingPage({ onNavigate }) {
  const [ag, setAg] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setAg((p) => (p + 1) % galleryItems.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: C.white, minHeight: "100vh", fontFamily: font }}>

      {/* ── NAV ── */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <XLogo />
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Btn variant="ghost" size="sm" onClick={() => onNavigate("login")}>Connexion</Btn>
          <Btn variant="primary" size="sm" onClick={() => onNavigate("signup")}>Essayer gratuitement</Btn>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════
           HERO
         ══════════════════════════════════════════════════════════════ */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 40px 40px", textAlign: "center", position: "relative" }}>
        <Particles count={15} />

        <div className="fu" style={{ marginBottom: 24 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px 5px 6px", borderRadius: 100, background: C.greenLight, color: C.greenDark, fontSize: 13, fontWeight: 600 }}>
            <span style={{ padding: "2px 8px", borderRadius: 100, background: C.green, color: "#fff", fontSize: 11, fontWeight: 700 }}>NEW</span>
            Photos produit IA en 10 secondes
          </div>
        </div>

        <h1 className="fu1" style={{ fontSize: 58, fontWeight: 900, color: C.dark, lineHeight: 1.05, letterSpacing: "-2.5px", maxWidth: 820, margin: "0 auto 22px" }}>
          Transforme tes photos en{" "}
          <span style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenAccent}, #34D399)`, backgroundSize: "200% auto", animation: "gradientShift 4s ease infinite", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline" }}>
            images pro qui convertissent
          </span>
        </h1>

        <p className="fu2" style={{ fontSize: 19, color: C.textMuted, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 40px", fontWeight: 400 }}>
          Tes photos produit font la différence entre un visiteur qui scroll et un client qui achète. 
          Donne à ta boutique le look qu'elle mérite — en 10 secondes.
        </p>

        <div className="fu3" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn size="xl" onClick={() => onNavigate("signup")}>
            Commencer gratuitement →
          </Btn>
          <Btn variant="dark" size="xl" onClick={() => window.open(CALENDLY_URL, "_blank")}>
            📅 Booker une démo (30 min)
          </Btn>
        </div>
        <p className="fu4" style={{ fontSize: 13, color: C.textLight, marginTop: 14 }}>
          Gratuit • Aucune carte bancaire • Résultats en 10 secondes
        </p>

        {/* Trusted by bar */}
        <div className="fu5" style={{ marginTop: 48, display: "flex", alignItems: "center", justifyContent: "center", gap: 32, opacity: 0.45 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: "1.5px", fontFamily: fontMono }}>Utilisé par des e-commerçants sur</span>
          {["Shopify", "WooCommerce", "Amazon", "Etsy"].map((b, i) => (
            <span key={i} style={{ fontSize: 14, fontWeight: 700, color: C.textMid, fontFamily: font }}>{b}</span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
           GALLERY SHOWCASE
         ══════════════════════════════════════════════════════════════ */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 40px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 100, background: C.greenLight, color: C.greenDark, fontSize: 12, fontWeight: 700, fontFamily: fontMono, letterSpacing: "0.5px", marginBottom: 16 }}>EXEMPLES</span>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: C.dark, letterSpacing: "-1.5px" }}>
            Avant → Après en un prompt
          </h2>
        </div>

        <div style={{ background: C.surfaceAlt, borderRadius: 24, padding: "40px 40px 48px", border: `1px solid ${C.borderLight}`, position: "relative", overflow: "hidden" }}>
          <Particles count={6} color="rgba(22,163,74,0.2)" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 24, alignItems: "center", marginBottom: 36, position: "relative" }}>
            {/* Before */}
            <div style={{ borderRadius: 18, background: "#F8F8FA", border: `2px dashed ${C.border}`, padding: "44px 28px", textAlign: "center", position: "relative", transition: "all 0.4s ease" }}>
              <div style={{ position: "absolute", top: 12, left: 14, padding: "3px 10px", borderRadius: 6, background: C.white, border: `1px solid ${C.border}`, fontSize: 11, fontWeight: 600, color: C.textMuted, fontFamily: fontMono }}>AVANT</div>
              <div style={{ fontSize: 64, marginBottom: 12, animation: "wiggle 3s ease-in-out infinite" }}>{galleryItems[ag].icon}</div>
              <p style={{ fontSize: 14, fontWeight: 500, color: C.textMuted }}>{galleryItems[ag].before}</p>
              <p style={{ fontSize: 12, color: C.textLight, marginTop: 4, fontFamily: fontMono }}>{galleryItems[ag].category}</p>
            </div>

            {/* Arrow */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "float 3s ease-in-out infinite" }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: `linear-gradient(135deg, ${C.green}, ${C.greenAccent})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 24px ${C.greenGlow2}`, fontSize: 24, color: "#fff", animation: "breathe 2s ease infinite" }}>→</div>
              <span style={{ fontSize: 10, fontWeight: 700, color: C.green, fontFamily: fontMono, letterSpacing: "1.5px" }}>10 SEC</span>
            </div>

            {/* After */}
            <div style={{ borderRadius: 18, background: galleryItems[ag].color, border: `2px solid ${galleryItems[ag].textLight ? "rgba(255,255,255,0.1)" : C.greenMuted}`, padding: "44px 28px", textAlign: "center", position: "relative", boxShadow: C.shadowMd, transition: "all 0.5s ease" }}>
              <div style={{ position: "absolute", top: 12, left: 14, padding: "3px 10px", borderRadius: 6, background: C.green, fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: fontMono }}>APRÈS ✦</div>
              <div style={{ fontSize: 64, marginBottom: 12, animation: "float2 4s ease-in-out infinite" }}>{galleryItems[ag].icon}</div>
              <p style={{ fontSize: 14, fontWeight: 600, color: galleryItems[ag].textLight ? "#fff" : C.greenDark }}>{galleryItems[ag].after}</p>
              <p style={{ fontSize: 12, color: galleryItems[ag].textLight ? "rgba(255,255,255,0.6)" : C.green, marginTop: 4, fontFamily: fontMono }}>studio quality • HD</p>
            </div>
          </div>

          {/* Prompt */}
          <div style={{ padding: "14px 20px", borderRadius: 12, background: C.white, border: `1px solid ${C.border}`, marginBottom: 24, transition: "all 0.4s ease", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.green, fontFamily: fontMono }}>PROMPT UTILISÉ</span>
              <div style={{ flex: 1, height: 1, background: C.borderLight }} />
            </div>
            <p style={{ fontSize: 14, color: C.text, lineHeight: 1.5, fontStyle: "italic" }}>"{galleryItems[ag].prompt}"</p>
          </div>

          {/* Gallery selector */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, position: "relative" }}>
            {galleryItems.map((item, i) => (
              <button key={i} onClick={() => setAg(i)} style={{ padding: "14px 10px", borderRadius: 12, border: `1.5px solid ${i === ag ? C.green : C.border}`, background: i === ag ? C.greenGlow : C.white, cursor: "pointer", textAlign: "center", transition: "all 0.2s ease", position: "relative", overflow: "hidden" }}>
                {i === ag && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: C.green, animation: "slideRight 3.5s linear" }} />}
                <div style={{ fontSize: 24, marginBottom: 4 }}>{item.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: i === ag ? C.green : C.textMuted }}>{item.category}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
           WHY PHOTOS MATTER — Conversion Data Section
         ══════════════════════════════════════════════════════════════ */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px", position: "relative" }}>
        <Particles count={8} color="rgba(22,163,74,0.3)" />

        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 100, background: C.greenLight, color: C.greenDark, fontSize: 12, fontWeight: 700, fontFamily: fontMono, letterSpacing: "0.5px", marginBottom: 16 }}>
            POURQUOI C'EST IMPORTANT
          </span>
          <h2 style={{ fontSize: 42, fontWeight: 900, color: C.dark, letterSpacing: "-2px", lineHeight: 1.1, maxWidth: 700, margin: "0 auto 16px" }}>
            Tes photos produit font<br />
            <span style={{ color: C.green }}>+93% de tes ventes</span>
          </h2>
          <p style={{ fontSize: 17, color: C.textMuted, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            93% des acheteurs en ligne considèrent les visuels comme le facteur n°1 dans leur décision d'achat. 
            Des photos pro = plus de confiance = plus de conversions.
          </p>
        </div>

        {/* Two graphs side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 900, margin: "0 auto 48px" }}>
          {/* BAD photos graph */}
          <div style={{
            padding: "28px 24px",
            borderRadius: 22,
            background: C.white,
            border: `1.5px solid ${C.redMuted}`,
            boxShadow: "0 4px 20px rgba(239,68,68,0.06)",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.red}, ${C.orange})` }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 28 }}>😬</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: C.red, letterSpacing: "-0.3px" }}>Photos amateur</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>Fond moche, mauvaise lumière, flou</div>
              </div>
            </div>
            <ConversionGraph type="bad" />
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              {[
                { icon: "📉", label: "Taux de conversion", val: "0.9%" },
                { icon: "😒", label: "Confiance", val: "Faible" },
                { icon: "💸", label: "Panier moyen", val: "Bas" },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, padding: "10px 8px", borderRadius: 10, background: C.redLight, textAlign: "center" }}>
                  <div style={{ fontSize: 14 }}>{s.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.red }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: "#B91C1C", fontFamily: fontMono }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* GOOD photos graph */}
          <div style={{
            padding: "28px 24px",
            borderRadius: 22,
            background: C.white,
            border: `1.5px solid ${C.greenMuted}`,
            boxShadow: `0 4px 20px ${C.greenGlow}`,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.green}, ${C.greenAccent})` }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 28 }}>🔥</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: C.greenDark, letterSpacing: "-0.3px" }}>Photos pro xPicScale</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>Studio quality, HD, qui convertit</div>
              </div>
            </div>
            <ConversionGraph type="good" />
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              {[
                { icon: "📈", label: "Taux de conversion", val: "8.4%" },
                { icon: "🤩", label: "Confiance", val: "Élevée" },
                { icon: "💰", label: "Panier moyen", val: "+47%" },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, padding: "10px 8px", borderRadius: 10, background: C.greenLight, textAlign: "center" }}>
                  <div style={{ fontSize: 14 }}>{s.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.greenDark }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: C.greenDeep, fontFamily: fontMono }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact numbers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 800, margin: "0 auto" }}>
          {[
            { target: 93, suffix: "%", label: "des acheteurs jugent sur les visuels", icon: "👁" },
            { target: 67, suffix: "%", label: "de taux de conversion en plus avec des photos pro", icon: "📈" },
            { target: 22, suffix: "%", label: "de retours en moins grâce à des images fidèles", icon: "📦" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "32px 24px",
                borderRadius: 20,
                background: C.surfaceAlt,
                border: `1px solid ${C.borderLight}`,
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = C.shadowMd; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
              <AnimatedNumber target={item.target} suffix={item.suffix} color={C.green} />
              <p style={{ fontSize: 14, color: C.textMid, marginTop: 8, lineHeight: 1.5 }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════
           TRUST SECTION — Why your shop needs this
         ══════════════════════════════════════════════════════════════ */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 80px" }}>
        <div style={{
          background: `linear-gradient(135deg, #FAFFF5, ${C.greenLight}, #F0FFF4)`,
          borderRadius: 28,
          padding: "60px 48px",
          border: `1px solid ${C.greenMuted}`,
          position: "relative",
          overflow: "hidden",
        }}>
          <Particles count={10} color={C.greenAccent} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", position: "relative" }}>
            <div>
              <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 100, background: C.white, color: C.greenDark, fontSize: 12, fontWeight: 700, fontFamily: fontMono, marginBottom: 20 }}>
                💎 LA CONFIANCE SE CONSTRUIT PAR L'IMAGE
              </span>
              <h2 style={{ fontSize: 34, fontWeight: 900, color: C.dark, letterSpacing: "-1.5px", lineHeight: 1.15, marginBottom: 18 }}>
                Des photos pro = un shop qui inspire confiance
              </h2>
              <p style={{ fontSize: 16, color: C.textMid, lineHeight: 1.8, marginBottom: 24 }}>
                Un visiteur met <strong>50 millisecondes</strong> pour juger ton site. 
                Tes photos produit sont la première chose qu'il voit — et la raison n°1 pour laquelle il achète ou quitte.
              </p>
              <p style={{ fontSize: 16, color: C.textMid, lineHeight: 1.8, marginBottom: 32 }}>
                Les boutiques avec des visuels pro ont un <strong>taux de retour 22% plus bas</strong> et un 
                <strong> panier moyen 47% plus élevé</strong>. C'est pas du branding, c'est du chiffre d'affaires.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "Rend ton shop sérieux et professionnel instantanément",
                  "Augmente la confiance et réduit les hésitations à l'achat",
                  "Diminue les retours grâce à des images fidèles au produit",
                  "Booste ton taux de conversion sur toutes tes pages produit",
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 7, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ fontSize: 15, color: C.text, fontWeight: 500 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual side */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ padding: "24px", borderRadius: 20, background: C.white, boxShadow: C.shadowMd, animation: "float 5s ease-in-out infinite" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: C.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🛒</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Taux de conversion</div>
                    <div style={{ fontSize: 12, color: C.textMuted }}>Avec photos pro vs amateur</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "end", gap: 16, padding: "8px 0" }}>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ height: 60, background: `linear-gradient(to top, ${C.redLight}, ${C.red}22)`, borderRadius: "8px 8px 0 0", margin: "0 auto", width: "70%", animation: "barGrow 1s ease" }} />
                    <div style={{ fontSize: 18, fontWeight: 900, color: C.red, marginTop: 8 }}>0.9%</div>
                    <div style={{ fontSize: 10, color: C.textMuted, fontFamily: fontMono }}>Sans xPicScale</div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ height: 140, background: `linear-gradient(to top, ${C.greenLight}, ${C.green}44)`, borderRadius: "8px 8px 0 0", margin: "0 auto", width: "70%", animation: "barGrow 1.5s ease" }} />
                    <div style={{ fontSize: 18, fontWeight: 900, color: C.green, marginTop: 8 }}>8.4%</div>
                    <div style={{ fontSize: 10, color: C.textMuted, fontFamily: fontMono }}>Avec xPicScale</div>
                  </div>
                </div>
              </div>

              <div style={{ padding: "20px 24px", borderRadius: 16, background: C.white, boxShadow: C.shadow, display: "flex", alignItems: "center", gap: 14, animation: "float2 6s ease-in-out infinite" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${C.green}, ${C.greenAccent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#fff", fontWeight: 800 }}>+</div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: C.green }}>x9.3</div>
                  <div style={{ fontSize: 13, color: C.textMuted }}>conversion rate avec photos pro</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
           HOW IT WORKS
         ══════════════════════════════════════════════════════════════ */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 100, background: C.greenLight, color: C.greenDark, fontSize: 12, fontWeight: 700, fontFamily: fontMono, letterSpacing: "0.5px", marginBottom: 16 }}>COMMENT ÇA MARCHE</span>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: C.dark, letterSpacing: "-1.5px" }}>Simple comme 1, 2, 3</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 960, margin: "0 auto" }}>
          {[
            { step: "01", icon: "📸", title: "Photographie", desc: "Prends ton produit en photo avec ton téléphone. Pas besoin de studio, de lumière ou de fond." },
            { step: "02", icon: "✍️", title: "Décris le rendu", desc: "Écris ce que tu veux en texte libre. \"Fond blanc studio\", \"lifestyle table en bois\" — toi tu décides." },
            { step: "03", icon: "⚡", title: "Télécharge", desc: "En quelques secondes ta photo pro est prête. Télécharge-la et mets-la directement sur ta boutique." },
          ].map((item, i) => (
            <div key={i} style={{ padding: "36px 28px", borderRadius: 20, background: C.white, border: `1px solid ${C.borderLight}`, boxShadow: C.shadow, transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)", cursor: "default", position: "relative", overflow: "hidden" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = C.shadowMd; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = C.greenMuted; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = C.shadow; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = C.borderLight; }}
            >
              <div style={{ position: "absolute", top: 16, right: 16, fontSize: 52, fontWeight: 900, color: C.surfaceAlt, lineHeight: 1 }}>{item.step}</div>
              <div style={{ fontSize: 36, marginBottom: 18 }}>{item.icon}</div>
              <h3 style={{ fontSize: 19, fontWeight: 700, color: C.text, marginBottom: 10 }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.75 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
           TESTIMONIALS
         ══════════════════════════════════════════════════════════════ */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: C.dark, letterSpacing: "-1px" }}>Ce qu'ils en disent</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 960, margin: "0 auto" }}>
          {[
            { name: "Thomas R.", role: "E-commerçant Shopify", text: "Mon taux de conversion est passé de 1.2% à 4.8% en changeant juste mes photos produit. xPicScale m'a fait gagner des milliers d'euros.", avatar: "T", metric: "+300% conversion" },
            { name: "Sarah M.", role: "Dropshipper", text: "J'économise le budget photographe et je sors mes produits 10x plus vite. Le prompt libre c'est un game changer total pour scaler.", avatar: "S", metric: "10x plus rapide" },
            { name: "Kevin L.", role: "Brand owner", text: "Mes clients me demandent quel photographe je paie. Quand je leur dis que c'est de l'IA ils n'y croient pas. La qualité est dingue.", avatar: "K", metric: "-60% de retours" },
          ].map((t, i) => (
            <div key={i} style={{ padding: "28px 24px", borderRadius: 20, background: C.white, border: `1px solid ${C.borderLight}`, boxShadow: C.shadow, transition: "all 0.3s ease", position: "relative" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = C.shadowMd; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = C.shadow; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ position: "absolute", top: 16, right: 16, padding: "4px 10px", borderRadius: 6, background: C.greenLight, color: C.greenDark, fontSize: 11, fontWeight: 700, fontFamily: fontMono }}>{t.metric}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${C.green}, ${C.greenAccent})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 17, fontWeight: 700 }}>{t.avatar}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>{t.role}</div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.7, fontStyle: "italic", marginBottom: 12 }}>"{t.text}"</p>
              <div style={{ color: "#FBBF24", fontSize: 14, letterSpacing: "2px" }}>★★★★★</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
           FINAL CTA
         ══════════════════════════════════════════════════════════════ */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 100px" }}>
        <div style={{ background: `linear-gradient(135deg, ${C.dark}, #162B1C, #1A3320)`, borderRadius: 28, padding: "72px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <Particles count={12} color="rgba(34,197,94,0.3)" />
          <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(22,163,74,0.08)" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(22,163,74,0.05)" }} />

          <div style={{ position: "relative" }}>
            <XLogo size={28} light />
            <h2 style={{ fontSize: 40, fontWeight: 900, color: "#fff", letterSpacing: "-2px", margin: "24px 0 14px", lineHeight: 1.15 }}>
              Tes photos produit méritent mieux
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
              Rejoins les e-commerçants qui utilisent l'IA pour créer des visuels qui convertissent.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Btn variant="white" size="lg" onClick={() => onNavigate("signup")}>Créer mon compte gratuit →</Btn>
              <Btn variant="outline" size="lg" onClick={() => window.open(CALENDLY_URL, "_blank")} style={{ borderColor: "rgba(255,255,255,0.25)", color: "#fff" }}>📅 Booker une démo</Btn>
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 16 }}>Gratuit • Sans engagement • Sans carte bancaire</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${C.borderLight}`, padding: "28px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <XLogo size={20} />
          <p style={{ fontSize: 13, color: C.textLight }}>© 2026 xPicScale — Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════════════

function AuthPage({ mode, onNavigate, onAuth }) {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  const isLogin = mode === "login";
  const handleSubmit = async () => {
    if (!email || !password) { setError("Remplis tous les champs"); return; }
    if (!email.includes("@")) { setError("Email invalide"); return; }
    if (password.length < 6) { setError("Min 6 caractères"); return; }
    setLoading(true); setError(""); await new Promise((r) => setTimeout(r, 1200)); onAuth({ email }); setLoading(false);
  };
  return (
    <div style={{ minHeight: "100vh", background: C.white, display: "flex", fontFamily: font }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div className="si" style={{ width: "100%", maxWidth: 400 }}>
          <div style={{ cursor: "pointer", display: "inline-block", marginBottom: 36 }} onClick={() => onNavigate("landing")}><XLogo size={28} /></div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: C.dark, letterSpacing: "-0.5px", marginBottom: 8 }}>{isLogin ? "Content de te revoir" : "Crée ton compte"}</h1>
          <p style={{ fontSize: 15, color: C.textMuted, marginBottom: 32 }}>{isLogin ? "Connecte-toi pour accéder à ton espace" : "Commence à générer des photos pro gratuitement"}</p>
          <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="ton@email.com" icon="✉" />
          <Input label="Mot de passe" type="password" value={password} onChange={setPassword} placeholder={isLogin ? "••••••••" : "Min. 6 caractères"} icon="🔒" />
          {error && <div style={{ padding: "10px 14px", borderRadius: 8, background: "#FEF2F2", color: "#DC2626", fontSize: 13, marginBottom: 16 }}>{error}</div>}
          <Btn full size="lg" onClick={handleSubmit} loading={loading} disabled={loading}>{isLogin ? "Se connecter" : "Créer mon compte"}</Btn>
          <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: C.textMuted }}>{isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}<span style={{ color: C.green, fontWeight: 600, cursor: "pointer" }} onClick={() => onNavigate(isLogin ? "signup" : "login")}>{isLogin ? "S'inscrire" : "Se connecter"}</span></p>
        </div>
      </div>
      <div style={{ flex: 1, background: `linear-gradient(135deg, ${C.dark}, #162B1C)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 40, position: "relative", overflow: "hidden" }}>
        <Particles count={10} color="rgba(34,197,94,0.4)" />
        <div style={{ position: "relative", textAlign: "center" }}>
          <div style={{ fontSize: 80, marginBottom: 24, animation: "float 4s ease-in-out infinite" }}>📸</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: 12, lineHeight: 1.2 }}>Photos produit<br /><span style={{ color: C.greenAccent }}>qui convertissent</span></h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", maxWidth: 300, margin: "0 auto", lineHeight: 1.6 }}>Upload → Prompt → Télécharge. Simple.</p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DASHBOARD — Two tabs: Photo Produit + Creative Meta
// ═══════════════════════════════════════════════════════════════════

// ── REPLACE THIS WITH YOUR NEW API KEY (not the one shared in chat!) ──
const GEMINI_API_KEY = typeof window !== "undefined" && process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const GEMINI_MODEL = "gemini-2.5-flash-image";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// System prompts per mode
const SYSTEM_PROMPTS = {
  photo: (userPrompt) =>
    `Transform this product photo into a professional product image. Keep the product exactly as it is — do not alter, distort, or reimagine the product itself. Only change the background, lighting, and presentation.\n\n${userPrompt}\n\nOutput a single high-quality product photograph. Maintain product identity perfectly. Generate the image.`,
  creative: (userPrompt, format) =>
    `Create a ${format === "story" ? "vertical 9:16 story" : "square 1:1"} promotional ad creative featuring this exact product. Do not change the product.\n\n${userPrompt}\n\nThe output must be a single finished ad image ready to use on Meta/Instagram. Bold, eye-catching, scroll-stopping. Generate the image.`,
};

const PHOTO_PRESETS = [
  "Photo studio fond blanc, éclairage 3 points, ombres douces",
  "Lifestyle sur table en bois, lumière naturelle dorée",
  "Fond dégradé pastel rose, ombres portées, e-commerce premium",
  "Ambiance luxe, fond marbre noir, éclairage dramatique doré",
  "Flat lay vue du dessus, fond beige, éléments déco",
  "Packshot fond neutre gris, ombre portée, prêt Shopify",
];

const CREATIVE_PRESETS = [
  "Promo -30%, fond gradient violet-rose, texte bold blanc, style Meta ad",
  "Offre limitée, fond noir premium, texte doré, ambiance luxe",
  "Nouveau produit, fond gradient bleu-vert, CTA 'Acheter maintenant'",
  "Flash sale -50%, fond rouge vif, texte blanc impact, urgence",
  "Best-seller, fond gradient orange-jaune, badge étoile, social proof",
  "Free shipping, fond vert menthe, texte clean, style minimal",
];

function TabButton({ active, icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "10px 20px", borderRadius: 10,
        border: `1.5px solid ${active ? C.green : C.border}`,
        background: active ? C.greenGlow : C.white,
        color: active ? C.green : C.textMuted,
        fontSize: 14, fontWeight: 600, fontFamily: font,
        cursor: "pointer", transition: "all 0.2s ease",
      }}
    >
      <span style={{ fontSize: 16 }}>{icon}</span>
      {label}
    </button>
  );
}

function FormatSelector({ format, onChange }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>Format</label>
      <div style={{ display: "flex", gap: 8 }}>
        {[
          { id: "square", label: "Carré 1:1", sub: "Feed Meta", icon: "⬜" },
          { id: "story", label: "Story 9:16", sub: "Story / Reels", icon: "📱" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => onChange(f.id)}
            style={{
              flex: 1, padding: "12px 14px", borderRadius: 12,
              border: `1.5px solid ${format === f.id ? C.green : C.border}`,
              background: format === f.id ? C.greenGlow : C.white,
              cursor: "pointer", textAlign: "center",
              transition: "all 0.2s ease",
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 4 }}>{f.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: format === f.id ? C.green : C.text }}>{f.label}</div>
            <div style={{ fontSize: 11, color: C.textMuted, fontFamily: fontMono }}>{f.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Dashboard({ user, onLogout }) {
  const [tab, setTab] = useState("photo"); // "photo" | "creative"
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [format, setFormat] = useState("square");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const fileRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const r = new FileReader();
    r.onload = (e) => { setImage(e.target.result); setResult(null); setError(""); };
    r.readAsDataURL(file);
  }, []);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setPrompt("");
    setResult(null);
    setError("");
  };

  const handleGenerate = async () => {
    if (!image || !prompt.trim()) return;
    setLoading(true); setError(""); setResult(null);

    try {
      const b64 = image.split(",")[1];
      const mime = image.split(";")[0].split(":")[1];

      const fullPrompt = tab === "photo"
        ? SYSTEM_PROMPTS.photo(prompt)
        : SYSTEM_PROMPTS.creative(prompt, format);

      const res = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [
              { inlineData: { mimeType: mime, data: b64 } },
              { text: fullPrompt },
            ],
          }],
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"],
          },
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `Erreur API (${res.status})`);
      }

      const data = await res.json();
      let found = false;

      if (data.candidates?.[0]?.content?.parts) {
        for (const part of data.candidates[0].content.parts) {
          if (part.inlineData) {
            const src = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            setResult(src);
            setHistory((h) => [{ id: Date.now(), prompt, result: src, tab, format }, ...h]);
            found = true;
            break;
          }
        }
      }

      if (!found) throw new Error("L'IA n'a pas généré d'image. Reformule ton prompt.");
    } catch (e) {
      setError(e.message || "Erreur lors de la génération");
    } finally {
      setLoading(false);
    }
  };

  const dl = (src) => {
    const a = document.createElement("a");
    a.href = src;
    a.download = `xpicscale-${tab}-${Date.now()}.png`;
    a.click();
  };

  const presets = tab === "photo" ? PHOTO_PRESETS : CREATIVE_PRESETS;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: font }}>
      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 28px", background: C.white, borderBottom: `1px solid ${C.borderLight}`, position: "sticky", top: 0, zIndex: 10 }}>
        <XLogo size={24} />
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 8, background: C.greenLight }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: C.greenDark, fontFamily: fontMono }}>{user.email}</span>
          </div>
          <Btn variant="ghost" size="sm" onClick={onLogout}>Déconnexion</Btn>
        </div>
      </nav>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {/* Tab Selector */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24, maxWidth: result ? 1100 : 640, margin: "0 auto 24px" }}>
          <TabButton active={tab === "photo"} icon="📸" label="Photo Produit" onClick={() => handleTabChange("photo")} />
          <TabButton active={tab === "creative"} icon="🎨" label="Creative Meta" onClick={() => handleTabChange("creative")} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: result ? "1fr 1fr" : "1fr", gap: 28, maxWidth: result ? 1100 : 640, margin: "0 auto" }}>
          {/* ── LEFT: Input Panel ── */}
          <div className="fu">
            <div style={{ background: C.white, borderRadius: 20, border: `1px solid ${C.border}`, padding: 28, boxShadow: C.shadow }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 20 }}>
                {tab === "photo" ? "✦ Nouvelle photo produit" : "🎨 Nouvelle creative Meta"}
              </h2>

              {/* Upload */}
              {image ? (
                <div style={{ position: "relative", marginBottom: 20 }}>
                  <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${C.border}` }}>
                    <img src={image} alt="" style={{ width: "100%", maxHeight: 260, objectFit: "contain", display: "block", background: C.surfaceAlt }} />
                  </div>
                  <button onClick={() => { setImage(null); setResult(null); }} style={{ position: "absolute", top: 8, right: 8, width: 30, height: 30, borderRadius: 8, border: "none", background: "rgba(0,0,0,0.55)", color: "#fff", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                  <div style={{ position: "absolute", bottom: 8, left: 8, padding: "4px 10px", borderRadius: 6, background: C.greenLight, color: C.greenDark, fontSize: 11, fontWeight: 600, fontFamily: fontMono }}>✓ Photo uploadée</div>
                </div>
              ) : (
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                  onClick={() => fileRef.current?.click()}
                  style={{ borderRadius: 14, border: `2px dashed ${dragOver ? C.green : C.border}`, background: dragOver ? C.greenGlow : C.surfaceAlt, padding: "44px 24px", textAlign: "center", cursor: "pointer", transition: "all 0.2s ease", marginBottom: 20 }}
                >
                  <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: C.greenLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 24 }}>
                    {tab === "photo" ? "📸" : "🖼"}
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 4 }}>Dépose ta photo produit ici</p>
                  <p style={{ fontSize: 13, color: C.textMuted }}>ou clique pour prendre / sélectionner</p>
                </div>
              )}

              {/* Format selector (creative only) */}
              {tab === "creative" && <FormatSelector format={format} onChange={setFormat} />}

              {/* Prompt */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>
                  {tab === "photo" ? "Décris le rendu que tu veux" : "Décris ta creative"}
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={loading}
                  placeholder={tab === "photo"
                    ? "Ex: Photo studio fond blanc, éclairage doux, ombres portées..."
                    : "Ex: Promo -30%, fond gradient violet, texte bold blanc, style Meta ad..."
                  }
                  style={{ width: "100%", minHeight: 90, padding: "14px 16px", borderRadius: 12, border: `1.5px solid ${C.border}`, background: C.white, color: C.text, fontSize: 14, fontFamily: font, resize: "vertical", outline: "none", lineHeight: 1.6, boxSizing: "border-box" }}
                  onFocus={(e) => (e.target.style.borderColor = C.green)}
                  onBlur={(e) => (e.target.style.borderColor = C.border)}
                />
                {!prompt && (
                  <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {presets.map((ex, i) => (
                      <button key={i} onClick={() => setPrompt(ex)} disabled={loading}
                        style={{ padding: "5px 11px", borderRadius: 7, border: `1px solid ${C.border}`, background: C.white, color: C.textMuted, fontSize: 12, cursor: "pointer", fontFamily: font, transition: "all 0.15s ease" }}
                        onMouseEnter={(e) => { e.target.style.borderColor = C.green; e.target.style.color = C.text; e.target.style.background = C.greenGlow; }}
                        onMouseLeave={(e) => { e.target.style.borderColor = C.border; e.target.style.color = C.textMuted; e.target.style.background = C.white; }}
                      >
                        {ex.length > 45 ? ex.slice(0, 45) + "…" : ex}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Generate */}
              <Btn full size="lg" onClick={handleGenerate} loading={loading} disabled={!image || !prompt.trim() || loading}>
                {loading ? "Génération en cours…" : tab === "photo" ? "✦ Générer la photo" : "🎨 Générer la creative"}
              </Btn>

              {error && (
                <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 10, background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626", fontSize: 13 }}>
                  ⚠️ {error}
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: Result Panel ── */}
          {result && (
            <div className="si">
              <div style={{ background: C.white, borderRadius: 20, border: `1px solid ${C.border}`, padding: 28, boxShadow: C.shadow }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ padding: "4px 10px", borderRadius: 6, background: C.greenLight, color: C.greenDark, fontSize: 11, fontWeight: 700, fontFamily: fontMono }}>
                      {tab === "photo" ? "PHOTO ✦" : "CREATIVE ✦"}
                    </div>
                    {tab === "creative" && (
                      <div style={{ padding: "4px 8px", borderRadius: 6, background: C.surfaceAlt, color: C.textMuted, fontSize: 11, fontWeight: 600, fontFamily: fontMono }}>
                        {format === "square" ? "1:1" : "9:16"}
                      </div>
                    )}
                  </div>
                  <Btn variant="outline" size="sm" onClick={() => dl(result)}>↓ Télécharger HD</Btn>
                </div>

                <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${C.borderLight}`, background: C.surfaceAlt }}>
                  <img src={result} alt="" style={{ width: "100%", maxHeight: 480, objectFit: "contain", display: "block" }} />
                </div>

                <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 10, background: C.surfaceAlt, border: `1px solid ${C.borderLight}` }}>
                  <p style={{ margin: 0, color: C.textMuted, fontSize: 12, fontFamily: fontMono, lineHeight: 1.5 }}>
                    <span style={{ color: C.textLight }}>Prompt →</span> {prompt}
                  </p>
                </div>

                <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                  <Btn variant="ghost" size="sm" full onClick={handleGenerate} loading={loading}>↻ Regénérer</Btn>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div style={{ marginTop: 40, maxWidth: 1100, margin: "40px auto 0" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 16 }}>Historique récent</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
              {history.map((h) => (
                <div key={h.id} onClick={() => dl(h.result)}
                  style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}`, background: C.white, cursor: "pointer", boxShadow: C.shadow, transition: "all 0.2s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = C.shadowMd)}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = C.shadow)}
                >
                  <img src={h.result} alt="" style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
                  <div style={{ padding: "8px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: 11, color: C.textMuted, fontFamily: fontMono, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{h.prompt}</p>
                    <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: h.tab === "photo" ? C.greenLight : "#EDE9FE", color: h.tab === "photo" ? C.greenDark : "#7C3AED", fontWeight: 600, fontFamily: fontMono, marginLeft: 6, flexShrink: 0 }}>
                      {h.tab === "photo" ? "PHOTO" : "AD"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ROUTER
// ═══════════════════════════════════════════════════════════════════

export default function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  return (
    <>
      <GlobalStyles />
      {page === "landing" && <LandingPage onNavigate={setPage} />}
      {(page === "login" || page === "signup") && <AuthPage mode={page} onNavigate={setPage} onAuth={(u) => { setUser(u); setPage("dashboard"); }} />}
      {page === "dashboard" && user && <Dashboard user={user} onLogout={() => { setUser(null); setPage("landing"); }} />}
    </>
  );
}
