// shared.jsx — Nav, Footer, Cursor, Reveal hooks, Modal, shared UI primitives

const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* ============================================================
   Cursor — magnetic dot + ring
   ============================================================ */
function MagneticCursor({ enabled = true }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('cursor-on', 'cursor-hover');
      return;
    }
    document.body.classList.add('cursor-on');
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf;
    const onMove = (e) => { mx = e.clientX; my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    const onOver = (e) => {
      const t = e.target;
      if (t.closest('a, button, .magnetic, [data-cursor="hover"]')) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
      document.body.classList.remove('cursor-on', 'cursor-hover');
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}

/* ============================================================
   Reveal hook
   ============================================================ */
function useReveal(rootRef) {
  useEffect(() => {
    const motion = document.documentElement.dataset.motion;
    if (motion === 'off') {
      // Mark everything visible
      const els = (rootRef?.current || document).querySelectorAll('.reveal, .split-line');
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const els = (rootRef?.current || document).querySelectorAll('.reveal, .split-line');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}

/* ============================================================
   AnimatedCounter
   ============================================================ */
function AnimatedCounter({ to, suffix = '', duration = 1800, prefix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const motion = document.documentElement.dataset.motion;
    if (motion === 'off') { setVal(to); return; }
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

/* ============================================================
   Logo (placeholder)
   ============================================================ */
function Logo({ light = false }) {
  const ink = light ? '#fff' : '#18181C';
  return (
    <a href="index.html" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
      <svg viewBox="0 0 380 130" style={{ height: 44, width: 'auto', display: 'block' }} aria-label="KSAN — 네덜란드 한국 학생회">
        {/* K-mark box with triangles */}
        <rect x="4" y="4" width="80" height="80" fill="none" stroke={ink} strokeWidth="5" />
        {/* yellow corner triangle */}
        <polygon points="4,4 30,4 4,42" fill="#F5C631" />
        {/* orange triangles */}
        <polygon points="4,4 84,4 44,44" fill="#FF6A2A" />
        <polygon points="4,84 84,84 44,44" fill="#FF8A4A" />
        {/* X-cross lines on top of triangles */}
        <line x1="4" y1="4" x2="84" y2="84" stroke={ink} strokeWidth="3" />
        <line x1="84" y1="4" x2="4" y2="84" stroke={ink} strokeWidth="3" />
        {/* KSA text */}
        <text x="98" y="68" fontFamily="var(--font-display), Georgia, serif" fontSize="78" fontWeight="700" fill={ink} letterSpacing="-2">KSA</text>
        {/* N in orange */}
        <text x="312" y="68" fontFamily="var(--font-display), Georgia, serif" fontSize="78" fontWeight="700" fill="#FF6A2A" letterSpacing="-2">N</text>
        {/* Korean subtitle */}
        <text x="4" y="118" fontFamily="var(--font-display), Georgia, serif" fontSize="18" fontWeight="500" fill={ink} letterSpacing="2">
          <tspan fill="#FF6A2A">네 덜 란 드</tspan>
          <tspan fill={ink} dx="6">한 국 학 생 회</tspan>
        </text>
      </svg>
    </a>
  );
}

/* ============================================================
   Nav
   ============================================================ */
function Nav({ current = 'home', onOpenSignup, onOpenLogin, loggedIn = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'home', label: '홈', href: 'index.html' },
    { id: 'guide', label: '정착가이드', href: 'settlement-guide.html' },
    { id: 'business', label: 'Business Hub', href: 'business-hub.html' },
    { id: 'community', label: 'Community', href: 'community.html' },
    { id: 'pass', label: 'Pass It On', href: 'pass-it-on.html' },
    { id: 'events', label: '이벤트', href: 'events.html' },
    { id: 'about', label: 'About', href: 'about.html', sub: [
      { label: 'About KSAN', href: 'about.html#mission' },
      { label: '파트너십', href: 'about.html#partner' },
      { label: 'Contact', href: 'about.html#contact' },
    ] },
  ];

  return (
    <header className="nav" data-scrolled={scrolled ? '1' : '0'}>
      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 18px 0;
          transition: background 0.3s var(--ease-out), backdrop-filter 0.3s, padding 0.3s, border-color 0.3s;
          border-bottom: 1px solid transparent;
        }
        .nav[data-scrolled="1"] {
          background: rgba(251, 248, 242, 0.85);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border-bottom-color: var(--line);
          padding: 12px 0;
        }
        .nav-inner {
          display: flex; align-items: center; justify-content: space-between;
          gap: 24px;
        }
        .nav-links {
          display: flex; gap: 4px; align-items: center;
          background: rgba(255,255,255,0.6);
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 4px;
          backdrop-filter: blur(8px);
        }
        .nav-link {
          padding: 9px 16px;
          font-size: 14px;
          font-weight: 500;
          color: var(--ink-2);
          border-radius: 999px;
          transition: color 0.2s, background 0.2s;
          position: relative;
        }
        .nav-link:hover { color: var(--ink); }
        .nav-link[data-active="1"] {
          color: var(--ink);
          background: rgba(24,24,28,0.06);
        }
        .nav-link:hover { background: rgba(24,24,28,0.04); }
        .nav-item { position: relative; }
        .nav-item .nav-link { display: inline-flex; align-items: center; gap: 4px; }
        .nav-item .caret {
          width: 8px; height: 8px;
          border-right: 1.5px solid currentColor;
          border-bottom: 1.5px solid currentColor;
          transform: rotate(45deg) translateY(-1px);
          opacity: 0.5;
          transition: transform 0.25s var(--ease-out);
        }
        .nav-item:hover .caret { transform: rotate(225deg) translateY(2px); }
        .nav-dropdown {
          position: absolute;
          top: calc(100% + 10px); right: 0;
          min-width: 160px;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 6px;
          box-shadow: 0 16px 40px rgba(24,24,28,0.10);
          opacity: 0; visibility: hidden;
          transform: translateY(-6px);
          transition: opacity 0.25s var(--ease-out), transform 0.25s var(--ease-out), visibility 0.25s;
          z-index: 50;
        }
        .nav-item:hover .nav-dropdown,
        .nav-item:focus-within .nav-dropdown {
          opacity: 1; visibility: visible;
          transform: translateY(0);
        }
        .nav-dropdown::before {
          content: ''; position: absolute;
          top: -10px; left: 0; right: 0; height: 14px;
        }
        .nav-dropdown a {
          display: block;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink-2);
          transition: background 0.18s, color 0.18s;
        }
        .nav-dropdown a:hover { background: rgba(255,106,42,0.08); color: var(--ink); }
        .nav-actions { display: flex; gap: 8px; align-items: center; }
        .nav-cta {
          padding: 10px 18px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s;
        }
        .nav-cta--ghost {
          background: transparent;
          color: var(--ink);
          border-color: var(--line-strong);
        }
        .nav-cta--ghost:hover { background: rgba(24,24,28,0.05); }
        .nav-cta--primary {
          background: var(--accent);
          color: #fff;
        }
        .nav-cta--primary:hover {
          background: var(--accent-deep);
          transform: translateY(-1px);
          box-shadow: 0 6px 16px var(--accent-glow);
        }
        .nav-burger {
          display: none;
          width: 40px; height: 40px;
          background: rgba(255,255,255,0.6);
          border: 1px solid var(--line);
          border-radius: 10px;
          align-items: center; justify-content: center;
          cursor: pointer;
        }
        .nav-burger svg { width: 18px; height: 18px; }
        .mobile-menu {
          position: fixed;
          top: 64px; left: 0; right: 0; bottom: 0;
          background: rgba(251,248,242,0.98);
          backdrop-filter: blur(20px);
          z-index: 99;
          padding: 32px 24px;
          display: flex; flex-direction: column; gap: 4px;
          transform: translateY(-20px);
          opacity: 0; pointer-events: none;
          transition: all 0.3s var(--ease-out);
        }
        .mobile-menu[data-open="1"] {
          transform: translateY(0); opacity: 1; pointer-events: all;
        }
        .mobile-menu a {
          padding: 18px 12px;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.02em;
          border-bottom: 1px solid var(--line);
        }
        @media (max-width: 980px) {
          .nav-links, .nav-actions { display: none; }
          .nav-burger { display: flex; }
        }
      `}</style>
      <div className="container nav-inner">
        <Logo />
        <nav className="nav-links">
          {links.map((l) => (
            <div key={l.id} className="nav-item">
              <a href={l.href} className="nav-link" data-active={current === l.id ? '1' : '0'} data-cursor="hover">
                {l.label}
                {l.sub && <span className="caret" />}
              </a>
              {l.sub && (
                <div className="nav-dropdown">
                  {l.sub.map((s) => (
                    <a key={s.href} href={s.href} data-cursor="hover">
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="nav-actions">
          {loggedIn ? (
            <>
              <a href="mypage.html" className="nav-cta nav-cta--ghost" data-cursor="hover" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #FFB587)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700 }}>민</span>
                마이페이지
              </a>
            </>
          ) : (
            <>
              <button className="nav-cta nav-cta--ghost" onClick={onOpenLogin} data-cursor="hover">로그인</button>
              <button className="nav-cta nav-cta--primary" onClick={onOpenSignup} data-cursor="hover">멤버십 가입</button>
            </>
          )}
        </div>
        <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <><path d="M3 7h18M3 12h18M3 17h18" /></>}
          </svg>
        </button>
      </div>
      <div className="mobile-menu" data-open={menuOpen ? '1' : '0'}>
        {links.map((l) => (
          <a key={l.id} href={l.href}>{l.label}</a>
        ))}
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button className="nav-cta nav-cta--ghost" onClick={onOpenLogin} style={{ flex: 1 }}>로그인</button>
          <button className="nav-cta nav-cta--primary" onClick={onOpenSignup} style={{ flex: 1 }}>멤버십 가입</button>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   Footer
   ============================================================ */
function Footer() {
  const cols = [
    { title: 'SERVICES', links: [
      { label: '정착 가이드', href: 'settlement-guide.html' },
      { label: 'Business Hub', href: 'business-hub.html' },
      { label: 'Community', href: 'community.html' },
      { label: 'Pass It On', href: 'pass-it-on.html' },
    ]},
    { title: 'KSAN', links: [
      { label: 'About KSAN', href: 'about.html' },
      { label: '이벤트', href: 'events.html' },
      { label: '파트너', href: 'about.html#partners' },
      { label: '연락처', href: 'about.html#contact' },
    ]},
    { title: 'CONTACT', links: [
      { label: 'info@ksan.nl', href: 'mailto:info@ksan.nl' },
      { label: '@ksan.nl (Instagram)', href: '#' },
      { label: '이용약관', href: '#' },
      { label: '개인정보처리방침', href: '#' },
    ]},
  ];
  return (
    <footer style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--line)', padding: '80px 0 40px', color: 'var(--ink)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(3, 1fr)', gap: 40, alignItems: 'start' }}>
          <div>
            <Logo />
            <p style={{ marginTop: 18, color: 'var(--ink-3)', fontSize: 13.5, lineHeight: 1.6, maxWidth: 280 }}>
              The Korean Student Association in the Netherlands.<br/>
              네덜란드 한인 유학생을 위한 모든 것.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', color: 'var(--accent)', marginBottom: 18 }}>
                {c.title}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} style={{ fontSize: 14, color: 'var(--ink-2)', transition: 'color 0.2s' }}
                       onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
                       onMouseLeave={(e) => e.target.style.color = 'var(--ink-2)'}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 64, paddingTop: 24, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>© 2026 KSAN. All rights reserved.</span>
          <span style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>Made with ♥ in Amsterdam · Rotterdam · The Hague</span>
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          footer .container > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          footer .container > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

/* ============================================================
   Modal
   ============================================================ */
function Modal({ open, onClose, children, maxWidth = 480 }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <style>{`
        .modal-backdrop {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          display: grid; place-items: center;
          padding: 24px;
          animation: backdropIn 0.3s var(--ease-out);
        }
        @keyframes backdropIn { from { opacity: 0; } to { opacity: 1; } }
        .modal-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 24px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.25);
          padding: 40px;
          width: 100%;
          color: var(--ink);
          position: relative;
          animation: modalIn 0.4s var(--ease-out);
        }
        @keyframes modalIn { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .modal-close {
          position: absolute; top: 20px; right: 20px;
          width: 36px; height: 36px;
          background: rgba(24,24,28,0.05);
          border: 1px solid var(--line);
          border-radius: 10px;
          color: var(--ink-2);
          cursor: pointer;
          display: grid; place-items: center;
          transition: all 0.2s;
        }
        .modal-close:hover { background: rgba(24,24,28,0.1); color: var(--ink); }
      `}</style>
      <div className="modal-card" style={{ maxWidth }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

/* ============================================================
   Signup / Login content
   ============================================================ */
function SignupForm({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: '', name: '', school: '', city: 'Amsterdam', year: 'Bachelor 1' });
  const upd = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  if (step === 3) {
    return (
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <div style={{ width: 72, height: 72, margin: '0 auto 20px', borderRadius: '50%', background: 'rgba(255,106,42,0.15)', display: 'grid', placeItems: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>환영합니다, {form.name}님</h2>
        <p style={{ color: 'var(--ink-2)', margin: '0 0 28px' }}>
          이메일 인증 링크를 <strong style={{ color: 'var(--ink)' }}>{form.email}</strong>로 보냈어요.
        </p>
        <button className="btn btn--lg" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>완료</button>
      </div>
    );
  }

  return (
    <>
      <div className="tag" style={{ marginBottom: 16 }}>JOIN KSAN · STEP {step}/2</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.025em' }}>
        {step === 1 ? '멤버십 가입하기' : '한 가지만 더'}
      </h2>
      <p style={{ color: 'var(--ink-2)', margin: '0 0 28px', fontSize: 15 }}>
        {step === 1 ? '평생 무료. 30초면 끝나요.' : '맞춤 정보를 위해 학교 정보를 알려주세요.'}
      </p>
      {step === 1 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label="이름" value={form.name} onChange={(v) => upd('name', v)} placeholder="홍길동" />
          <Field label="이메일" type="email" value={form.email} onChange={(v) => upd('email', v)} placeholder="you@example.com" />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label="학교" value={form.school} onChange={(v) => upd('school', v)} placeholder="University of Amsterdam" />
          <Select label="도시" value={form.city} onChange={(v) => upd('city', v)} options={['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Leiden', 'Groningen', '기타']} />
          <Select label="학적" value={form.year} onChange={(v) => upd('year', v)} options={['Bachelor 1', 'Bachelor 2', 'Bachelor 3', 'Master', 'PhD', 'Exchange', 'Alumni']} />
        </div>
      )}
      <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
        {step === 2 && (
          <button className="btn btn--ghost" onClick={() => setStep(1)} style={{ flex: 1, justifyContent: 'center' }}>이전</button>
        )}
        <button
          className="btn btn--lg"
          style={{ flex: 2, justifyContent: 'center' }}
          disabled={step === 1 ? (!form.name || !form.email) : !form.school}
          onClick={() => step === 1 ? setStep(2) : setStep(3)}
        >
          {step === 1 ? '다음' : '가입 완료'} <span className="arrow">→</span>
        </button>
      </div>
      <p style={{ marginTop: 20, fontSize: 12, color: 'var(--ink-3)', textAlign: 'center' }}>
        가입 시 <a href="#" style={{ color: 'var(--ink-2)', textDecoration: 'underline' }}>이용약관</a> 및 <a href="#" style={{ color: 'var(--ink-2)', textDecoration: 'underline' }}>개인정보처리방침</a>에 동의합니다.
      </p>
    </>
  );
}

function LoginForm({ onClose, onSwitchToSignup }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const upd = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <>
      <div className="tag" style={{ marginBottom: 16 }}>WELCOME BACK</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.025em' }}>로그인</h2>
      <p style={{ color: 'var(--ink-2)', margin: '0 0 28px', fontSize: 15 }}>KSAN 멤버십으로 계속하기</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field label="이메일" type="email" value={form.email} onChange={(v) => upd('email', v)} placeholder="you@example.com" />
        <Field label="비밀번호" type="password" value={form.password} onChange={(v) => upd('password', v)} placeholder="••••••••" />
      </div>
      <button className="btn btn--lg" style={{ width: '100%', justifyContent: 'center', marginTop: 24 }} onClick={onClose}>
        로그인 <span className="arrow">→</span>
      </button>
      <p style={{ marginTop: 20, fontSize: 13, color: 'var(--ink-3)', textAlign: 'center' }}>
        아직 회원이 아니신가요?{' '}
        <button onClick={onSwitchToSignup} style={{ background: 'none', border: 0, color: 'var(--accent)', cursor: 'pointer', fontWeight: 600, padding: 0 }}>
          멤버십 가입
        </button>
      </p>
    </>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', letterSpacing: '0.02em' }}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          padding: '14px 16px',
          background: '#FBF8F2',
          border: '1px solid var(--line)',
          borderRadius: 10,
          color: 'var(--ink)',
          fontSize: 15,
          fontFamily: 'inherit',
          outline: 'none',
          transition: 'all 0.2s',
        }}
        onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.background = 'rgba(255,106,42,0.06)'; }}
        onBlur={(e) => { e.target.style.borderColor = 'var(--line)'; e.target.style.background = '#FBF8F2'; }}
      />
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', letterSpacing: '0.02em' }}>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: '14px 16px',
          background: '#FBF8F2',
          border: '1px solid var(--line)',
          borderRadius: 10,
          color: 'var(--ink)',
          fontSize: 15,
          fontFamily: 'inherit',
          outline: 'none',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='rgba(0,0,0,0.4)' d='M0 0h12L6 8z'/></svg>")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 16px center',
          paddingRight: 40,
        }}
      >
        {options.map((o) => <option key={o} value={o} style={{ background: '#fff' }}>{o}</option>)}
      </select>
    </label>
  );
}

/* ============================================================
   Apply tweaks helper
   ============================================================ */
function applyTweaks(t) {
  const root = document.documentElement;
  root.style.setProperty('--accent', t.accent);
  // derive accent variants
  root.style.setProperty('--accent-deep', shade(t.accent, -0.15));
  root.style.setProperty('--accent-soft', shade(t.accent, 0.2));
  root.style.setProperty('--accent-glow', hexToRgba(t.accent, 0.35));
  if (t.fontPair === 'pretendard') {
    root.style.setProperty('--font-sans', "'Pretendard', 'Inter', system-ui, sans-serif");
    root.style.setProperty('--font-display', "'Pretendard', 'Inter', system-ui, sans-serif");
  } else if (t.fontPair === 'serif') {
    root.style.setProperty('--font-sans', "'Pretendard', 'Inter', system-ui, sans-serif");
    root.style.setProperty('--font-display', "'Fraunces', 'Pretendard', serif");
  } else if (t.fontPair === 'mono') {
    root.style.setProperty('--font-display', "'JetBrains Mono', 'Pretendard', monospace");
    root.style.setProperty('--font-sans', "'Pretendard', 'Inter', system-ui, sans-serif");
  } else if (t.fontPair === 'classic') {
    root.style.setProperty('--font-sans', "'Inter', system-ui, sans-serif");
    root.style.setProperty('--font-display', "'Inter', system-ui, sans-serif");
  }
  // Section bg tone
  if (t.sectionTone === 'cream') {
    root.style.setProperty('--bg-cream', '#FFF6EC');
    root.style.setProperty('--bg-cream-2', '#FBEFE2');
  } else if (t.sectionTone === 'paper') {
    root.style.setProperty('--bg-cream', '#F5F5F0');
    root.style.setProperty('--bg-cream-2', '#EDEDE4');
  } else if (t.sectionTone === 'white') {
    root.style.setProperty('--bg-cream', '#FFFFFF');
    root.style.setProperty('--bg-cream-2', '#F4F4F4');
  } else if (t.sectionTone === 'sand') {
    root.style.setProperty('--bg-cream', '#F0E7D8');
    root.style.setProperty('--bg-cream-2', '#E5D9C2');
  } else if (t.sectionTone === 'ivory') {
    root.style.setProperty('--bg-cream', '#FBF8F2');
    root.style.setProperty('--bg-cream-2', '#F4EFE5');
  }
  root.dataset.density = t.density;
  root.dataset.motion = t.motion;
}

function shade(hex, amt) {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0,2), 16);
  const g = parseInt(c.slice(2,4), 16);
  const b = parseInt(c.slice(4,6), 16);
  const adj = (v) => Math.max(0, Math.min(255, Math.round(amt > 0 ? v + (255-v)*amt : v + v*amt)));
  return `rgb(${adj(r)}, ${adj(g)}, ${adj(b)})`;
}
function hexToRgba(hex, a) {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0,2), 16);
  const g = parseInt(c.slice(2,4), 16);
  const b = parseInt(c.slice(4,6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/* ============================================================
   KSAN Tweaks Panel (shared across pages)
   ============================================================ */
function KsanTweaks({ t, setTweak, extra }) {
  return (
    <TweaksPanel title="KSAN Tweaks">
      <TweakSection label="Brand" />
      <TweakColor label="Accent" value={t.accent} onChange={(v) => setTweak('accent', v)} />
      <TweakSelect label="Font pair" value={t.fontPair} onChange={(v) => setTweak('fontPair', v)}
        options={[
          { value: 'pretendard', label: 'Pretendard (default)' },
          { value: 'classic', label: 'Inter only' },
          { value: 'serif', label: 'Pretendard + Fraunces' },
          { value: 'mono', label: 'Pretendard + Mono headings' },
        ]} />
      <TweakSelect label="Section tone" value={t.sectionTone} onChange={(v) => setTweak('sectionTone', v)}
        options={[
          { value: 'ivory', label: 'Ivory (default)' },
          { value: 'cream', label: 'Cream (warm)' },
          { value: 'paper', label: 'Paper (neutral)' },
          { value: 'white', label: 'White (clean)' },
          { value: 'sand', label: 'Sand (deep)' },
        ]} />
      <TweakSection label="Layout" />
      <TweakRadio label="Density" value={t.density}
        options={['compact', 'regular', 'spacious']}
        onChange={(v) => setTweak('density', v)} />
      <TweakSection label="Motion" />
      <TweakRadio label="Motion" value={t.motion}
        options={['off', 'subtle', 'full']}
        onChange={(v) => setTweak('motion', v)} />
      {extra}
    </TweaksPanel>
  );
}

/* ============================================================
   Default tweaks (shared)
   ============================================================ */
const KSAN_DEFAULT_TWEAKS = {
  accent: '#FF6A2A',
  fontPair: 'pretendard',
  sectionTone: 'ivory',
  density: 'regular',
  motion: 'full',
  showStats: true,
};

Object.assign(window, {
  MagneticCursor, Logo, Nav, Footer, Modal,
  SignupForm, LoginForm, Field, Select,
  AnimatedCounter, useReveal,
  applyTweaks, KsanTweaks, KSAN_DEFAULT_TWEAKS,
  shade, hexToRgba,
});
