// landing.jsx — KSAN homepage (light/ivory theme + scroll-driven hero)

const { useState, useEffect, useRef, useMemo } = React;

/* ============================================================
   Hero — scroll-pinned animated headline + parallax
   The big number / word grows and then transforms as you scroll.
   ============================================================ */
function Hero({ showStats, onOpenSignup }) {
  const ref = useRef(null);

  // mouse parallax
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--px', `${x * 18}px`);
      el.style.setProperty('--py', `${y * 18}px`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section className="hero" ref={ref}>
      <style>{`
        .hero {
          position: relative;
          min-height: 92vh;
          isolation: isolate;
          padding: 140px 0 100px;
          display: flex; align-items: center;
          overflow: hidden;
          --px: 0px; --py: 0px;
          background: var(--bg-0);
        }
        .hero-photo {
          position: absolute; inset: 0;
          background-image: url('images/amsterdam-canal.jpg');
          background-size: cover;
          background-position: center 60%;
          opacity: 0.55;
          transform: scale(1.04) translate(calc(var(--px) * -0.3), calc(var(--py) * -0.3));
          transition: transform 0.8s var(--ease-out);
          z-index: -2;
        }
        .hero-veil {
          position: absolute; inset: 0;
          background:
            linear-gradient(180deg, rgba(255,247,240,0.45) 0%, rgba(255,247,240,0.15) 35%, rgba(255,247,240,0.85) 100%),
            linear-gradient(90deg, rgba(255,247,240,0.85) 0%, rgba(255,247,240,0.2) 50%, rgba(255,247,240,0.1) 100%);
          z-index: -1;
        }

        .hero-inner {
          position: relative; z-index: 2;
          width: 100%;
        }
        .hero-text { max-width: 880px; }
        .hero-eyebrow {
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--accent);
          display: inline-flex; align-items: center; gap: 10px;
          padding: 8px 14px;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,106,42,0.2);
          border-radius: 999px;
        }
        .hero-eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 10px var(--accent); }
        .hero-title {
          font-size: clamp(56px, 8.4vw, 132px);
          font-weight: 800;
          line-height: 0.98;
          letter-spacing: -0.04em;
          margin: 0;
          color: var(--ink);
          text-shadow: 0 1px 0 rgba(255,255,255,0.4);
        }
        .hero-title .accent { color: var(--accent); }
        .hero-sub {
          margin: 32px 0 44px;
          font-size: clamp(17px, 1.5vw, 21px);
          line-height: 1.6;
          color: var(--ink-1);
          max-width: 580px;
          font-weight: 500;
        }
        .hero-sub strong { color: var(--ink); font-weight: 700; }
        .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }

        .scroll-hint {
          position: absolute;
          bottom: 32px; left: 50%;
          transform: translateX(-50%);
          color: var(--ink-2);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          z-index: 3;
        }
        .scroll-hint::after {
          content: ''; width: 1px; height: 32px;
          background: linear-gradient(to bottom, var(--accent), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>

      <div className="hero-photo" />
      <div className="hero-veil" />

      <div className="container hero-inner">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="split-line"><span>네덜란드</span></span>
            <span className="split-line" data-delay="1"><span>생활의 모든</span></span>
            <span className="split-line" data-delay="2"><span className="accent">연결.</span></span>
          </h1>

          <p className="hero-sub reveal" data-delay="3">
            비즈니스 네트워킹부터 <strong>중고 나눔</strong>, 고민 상담까지.<br/>
            네덜란드 한인 유학생의 모든 것, 한 번에.
          </p>

          <div className="hero-ctas reveal" data-delay="4">
            <button className="btn btn--lg" onClick={onOpenSignup}>
              멤버십 가입하기 <span className="arrow">→</span>
            </button>
            <a href="#features" className="btn btn--lg btn--ghost">
              둘러보기 <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="scroll-hint">SCROLL</div>
    </section>
  );
}

function HeroStatsCard() {
  return (
    <div className="reveal" data-delay="3" style={{
      background: 'var(--bg-2)',
      border: '1px solid var(--line)',
      borderRadius: 24,
      padding: 28,
      boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
    }}>
      <style>{`
        .stat-cell {
          background: var(--bg-1);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 18px 20px;
          transition: all 0.3s var(--ease-out);
        }
        .stat-cell:hover {
          background: rgba(255,106,42,0.08);
          border-color: rgba(255,106,42,0.4);
          transform: translateY(-2px);
        }
        .stat-num {
          font-size: 34px; font-weight: 800;
          letter-spacing: -0.025em; line-height: 1;
          color: var(--ink); font-feature-settings: 'tnum';
        }
        .stat-label { margin-top: 8px; font-size: 12.5px; color: var(--ink-3); }
        .pill-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 18px; }
        .pill {
          padding: 7px 12px; font-size: 12px; font-weight: 500;
          background: var(--bg-1); border: 1px solid var(--line);
          border-radius: 999px;
          display: inline-flex; align-items: center; gap: 6px;
          color: var(--ink-2);
        }
        .pill[data-tone="orange"] { background: rgba(255,106,42,0.1); border-color: rgba(255,106,42,0.3); color: var(--accent); }
      `}</style>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '0.16em', color: 'var(--accent)' }}>
          KSAN 디지털 허브 현황
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: 'var(--ink-3)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
          LIVE
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div className="stat-cell"><div className="stat-num"><AnimatedCounter to={1000} suffix="+" /></div><div className="stat-label">네덜란드 한인 학생</div></div>
        <div className="stat-cell"><div className="stat-num"><AnimatedCounter to={10} suffix="+" /></div><div className="stat-label">파트너 기업</div></div>
        <div className="stat-cell"><div className="stat-num"><AnimatedCounter to={6} suffix="개" /></div><div className="stat-label">주요 도시 커버</div></div>
        <div className="stat-cell"><div className="stat-num"><AnimatedCounter to={24} suffix="/7" /></div><div className="stat-label">커뮤니티 운영</div></div>
      </div>
      <div className="pill-row" style={{ display: 'none' }}>
        <span className="pill" data-tone="orange">💼 Business Hub</span>
        <span className="pill">💬 Community</span>
        <span className="pill" data-tone="orange">🎁 Pass It On</span>
        <span className="pill">🛒 공동구매</span>
      </div>
    </div>
  );
}

/* ============================================================
   Marquee text strip — moves with scroll
   ============================================================ */
function ScrollMarquee() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const v = (window.innerHeight - r.top) * 0.5;
      el.style.setProperty('--mx', `${-v}px`);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const words = ['CONNECT', 'BUSINESS', 'COMMUNITY', 'PASS IT ON', 'GROW TOGETHER', 'AMSTERDAM', 'ROTTERDAM', 'DEN HAAG'];
  const repeated = [...words, ...words, ...words];

  return (
    <section ref={ref} style={{
      padding: '40px 0',
      background: 'var(--bg-1)',
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      overflow: 'hidden',
      '--mx': '0px',
    }}>
      <div style={{
        display: 'flex', gap: 64, whiteSpace: 'nowrap',
        transform: 'translateX(var(--mx))',
        willChange: 'transform',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(56px, 8vw, 112px)',
        fontWeight: 800,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        color: 'var(--ink)',
      }}>
        {repeated.map((w, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 64 }}>
            <span style={{ color: i % 3 === 1 ? 'var(--accent)' : (i % 3 === 2 ? 'transparent' : 'var(--ink)'),
              WebkitTextStroke: i % 3 === 2 ? '2px var(--ink)' : 'none' }}>{w}</span>
            <span style={{ color: 'var(--accent)' }}>✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Features — 3 pillars
   ============================================================ */
function Features() {
  const items = [
    { num: '01', title: 'Business Hub', sub: '검증된 파트너십을 통한 커리어 브릿지', kr: '비즈니스 허브',
      bullets: ['KSAN Verified 공고 — 검증된 채용 정보', '삼성, LG 등 현지 파트너 기업과의 공식 연결', '한국어학교 알바, 네덜란드 한인 기업 구인'],
      stat: { num: '62', label: '활성 공고' },
      href: 'business-hub.html' },
    { num: '02', title: 'Community', sub: '안전한 정보 공유의 장', kr: '커뮤니티',
      bullets: ['익명 고민 상담 — 사소한 질문부터 진로 고민까지', '유학 준비생 Q&A (재학생/Alumni 답변)', '자유게시판 및 팁 아카이브'],
      stat: { num: '1,247', label: '게시글' },
      href: 'community.html' },
    { num: '03', title: 'Pass It On', sub: '졸업생 → 신입생 무료 나눔', kr: '나눔',
      bullets: ['학교 인증 기반 안전한 나눔 커뮤니티', '이사 · 졸업 나눔으로 정착 비용 절감', '돈 거래 없는 100% 무료 나눔'],
      stat: { num: '340+', label: '나눔된 물품' },
      href: 'pass-it-on.html' },
  ];
  return (
    <section className="section" id="features" style={{ background: 'var(--bg-0)' }}>
      <style>{`
        .features-head { max-width: 780px; margin-bottom: 56px; }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .feature-card {
          position: relative;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 28px;
          padding: 36px 32px 32px;
          color: var(--ink);
          display: flex; flex-direction: column;
          gap: 18px;
          overflow: hidden;
          transition: transform 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out), border-color 0.4s;
        }
        .feature-card::before {
          content: ''; position: absolute;
          inset: 0;
          background: radial-gradient(circle at 100% 0%, rgba(255,106,42,0.10), transparent 55%);
          opacity: 0; transition: opacity 0.5s; pointer-events: none;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(24,24,28,0.10);
          border-color: rgba(255,106,42,0.35);
        }
        .feature-card:hover::before { opacity: 1; }
        .feature-top {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 16px;
        }
        .feature-num {
          font-family: var(--font-display);
          font-size: 13px; font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.16em;
          padding: 6px 12px;
          background: rgba(255,106,42,0.08);
          border-radius: 999px;
        }
        .feature-stat {
          text-align: right;
          line-height: 1;
        }
        .feature-stat .num {
          font-family: var(--font-display);
          font-size: 30px; font-weight: 800;
          color: var(--ink);
          letter-spacing: -0.025em;
        }
        .feature-stat .label {
          margin-top: 4px;
          font-size: 11.5px; color: var(--ink-3);
          letter-spacing: 0.04em;
        }
        .feature-headline h3 {
          font-size: clamp(26px, 2.4vw, 34px);
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin: 0;
        }
        .feature-headline .kr {
          margin-top: 8px;
          font-size: 13.5px; color: var(--ink-2);
          line-height: 1.5;
        }
        .feature-body ul {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 10px;
          padding-top: 18px; border-top: 1px solid var(--line);
        }
        .feature-body ul li {
          font-size: 13.5px; color: var(--ink-2);
          padding-left: 18px; position: relative;
          line-height: 1.5;
        }
        .feature-body ul li::before {
          content: ''; position: absolute;
          left: 0; top: 8px;
          width: 8px; height: 1px;
          background: var(--accent);
        }
        .feature-cta {
          margin-top: auto;
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 13.5px; font-weight: 600;
          color: var(--ink);
          padding-top: 6px;
        }
        .feature-cta .arrow {
          display: inline-grid; place-items: center;
          width: 28px; height: 28px;
          border-radius: 50%;
          background: var(--ink);
          color: #fff;
          font-size: 14px;
          transition: all 0.3s var(--ease-out);
        }
        .feature-card:hover .feature-cta .arrow {
          background: var(--accent);
          transform: translateX(4px);
        }
        @media (max-width: 980px) {
          .features-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="container">
        <div className="features-head">
          <div className="reveal">
            <div className="eyebrow">WHAT WE DO</div>
            <h2 className="h-section">생활 · 커리어 · 연결,<br/>세 개의 축.</h2>
          </div>
        </div>
        <div className="features-grid">
          {items.map((item, i) => (
            <a key={item.title} href={item.href} className="feature-card reveal" data-delay={(i % 3) + 1}>
              <div className="feature-top">
                <span className="feature-num">{item.num}</span>
                <div className="feature-stat">
                  <div className="num">{item.stat.num}</div>
                  <div className="label">{item.stat.label}</div>
                </div>
              </div>
              <div className="feature-headline">
                <h3>{item.title}</h3>
                <div className="kr">{item.kr} — {item.sub}</div>
              </div>
              <div className="feature-body">
                <ul>{item.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              </div>
              <div className="feature-cta">자세히 보기 <span className="arrow">→</span></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}



/* ============================================================
   Settlement Guide preview
   ============================================================ */
function SettlementPreview() {
  const tiles = [
    { label: '행정', icon: '🏛️', desc: 'BSN · DigiD · 등록' },
    { label: '금융', icon: '💳', desc: 'ABN AMRO · ING' },
    { label: '주거', icon: '🏠', desc: '집 구하기 · 계약' },
    { label: '교통', icon: '🚆', desc: 'OV-chipkaart · 자전거' },
    { label: '쇼핑', icon: '🛒', desc: 'AH · Jumbo · 한인마켓' },
    { label: '비상연락', icon: '🚨', desc: '응급 · 영사관' },
  ];
  return (
    <section className="section section--light">
      <style>{`
        .settle-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: center; }
        .tile-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .settle-tile {
          background: #fff; border: 1px solid rgba(0,0,0,0.05);
          border-radius: 18px; padding: 28px 18px; text-align: center;
          transition: all 0.3s var(--ease-out);
          position: relative; overflow: hidden;
        }
        .settle-tile::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--accent), var(--accent-soft));
          opacity: 0; transition: opacity 0.3s; z-index: 0;
        }
        .settle-tile:hover { transform: translateY(-4px); box-shadow: 0 18px 36px rgba(255,106,42,0.18); }
        .settle-tile:hover::before { opacity: 1; }
        .settle-tile:hover .tile-icon, .settle-tile:hover .tile-label, .settle-tile:hover .tile-desc { color: #fff; }
        .tile-icon { font-size: 36px; margin-bottom: 14px; position: relative; z-index: 1; transition: color 0.3s; }
        .tile-label { font-size: 15px; font-weight: 700; color: var(--ink-dark); position: relative; z-index: 1; transition: color 0.3s; }
        .tile-desc { font-size: 11.5px; color: var(--ink-dark-3); margin-top: 4px; position: relative; z-index: 1; transition: color 0.3s; }
        @media (max-width: 980px) { .settle-grid { grid-template-columns: 1fr; gap: 48px; } }
      `}</style>
      <div className="container settle-grid">
        <div className="reveal">
          <div className="eyebrow">NEWCOMER?</div>
          <h2 className="h-section">네덜란드에<br/>처음 오셨나요?</h2>
          <p className="lead" style={{ marginTop: 24 }}>
            BSN 발급부터 집 구하기까지,<br/>유학생이 꼭 알아야 할 정보를 한 곳에 정리했습니다.
          </p>
          <a href="settlement-guide.html" className="btn btn--lg" style={{ marginTop: 36 }}>
            가이드 전체 보기 <span className="arrow">→</span>
          </a>
        </div>
        <div className="tile-grid">
          {tiles.map((t, i) => (
            <a key={t.label} href={`settlement-guide.html#${t.label}`} className="settle-tile reveal" data-delay={i + 1}>
              <div className="tile-icon">{t.icon}</div>
              <div className="tile-label">{t.label}</div>
              <div className="tile-desc">{t.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Events
   ============================================================ */
function EventsSection() {
  return (
    <section className="section" style={{ background: 'var(--bg-0)' }}>
      <style>{`
        .events-head {
          display: flex; align-items: end; justify-content: space-between;
          margin-bottom: 48px; gap: 24px; flex-wrap: wrap;
        }
        .events-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 24px; align-items: stretch; }
        .event-feature {
          background: linear-gradient(155deg, #FFE5D2 0%, #FFC9A8 45%, #FF9A66 100%);
          border-radius: 28px; padding: 40px;
          position: relative; overflow: hidden;
          min-height: 460px;
          display: flex; flex-direction: column; justify-content: space-between;
          color: #2A1810;
          box-shadow: 0 24px 60px rgba(255,106,42,0.18);
        }
        .event-feature::before {
          content: ''; position: absolute;
          right: -80px; top: -80px;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.5), transparent 65%);
          filter: blur(20px); pointer-events: none;
        }
        .event-feature::after {
          content: ''; position: absolute;
          left: -60px; bottom: -60px;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232,80,31,0.25), transparent 70%);
          filter: blur(28px); pointer-events: none;
        }
        .event-meta {
          position: absolute; right: 40px; top: 40px;
          font-size: 13px; font-weight: 700;
          color: #6B3A1A;
          letter-spacing: 0.04em; z-index: 2;
          font-family: var(--font-display);
        }
        .event-d {
          display: inline-flex; padding: 8px 16px;
          background: #2A1810; color: #FFE5D2;
          font-size: 11.5px; font-weight: 700;
          letter-spacing: 0.12em; border-radius: 999px;
          align-self: flex-start; z-index: 1; position: relative;
        }
        .event-cat { font-size: 14px; color: #6B3A1A; margin: 24px 0 8px; z-index: 1; position: relative; font-weight: 600; }
        .event-title {
          font-size: clamp(48px, 5.5vw, 88px);
          font-weight: 800; letter-spacing: -0.035em;
          line-height: 0.95; margin: 0 0 24px;
          z-index: 1; position: relative;
          color: #1A0E08;
        }
        .event-where { font-size: 15px; color: #4A2A18; margin: 0 0 28px; z-index: 1; position: relative; font-weight: 500; }
        .event-feature .btn { background: #1A0E08; color: #fff; border-color: #1A0E08; }
        .event-feature .btn:hover { background: var(--accent); border-color: var(--accent); }
        .event-list { display: flex; flex-direction: column; gap: 14px; }
        .event-row {
          background: var(--bg-2); border: 1px solid var(--line);
          border-radius: 18px; padding: 24px 28px;
          display: flex; align-items: center; gap: 20px;
          color: var(--ink-dark);
          transition: all 0.3s var(--ease-out);
          position: relative; overflow: hidden; flex: 1;
        }
        .event-row::before {
          content: ''; position: absolute;
          left: 0; top: 0; bottom: 0; width: 0;
          background: var(--accent); transition: width 0.3s var(--ease-out);
        }
        .event-row:hover { transform: translateX(6px); box-shadow: 0 12px 28px rgba(0,0,0,0.08); }
        .event-row:hover::before { width: 4px; }
        .event-date { flex-shrink: 0; width: 60px; text-align: center; font-family: var(--font-display); }
        .event-date .month { font-size: 11px; font-weight: 700; color: var(--ink-dark-3); letter-spacing: 0.12em; text-transform: uppercase; }
        .event-date .day { font-size: 26px; font-weight: 800; color: var(--ink-dark); letter-spacing: -0.02em; line-height: 1; }
        .event-info { flex: 1; }
        .event-info .ttl { font-size: 17px; font-weight: 700; color: var(--ink-dark); margin: 0; letter-spacing: -0.01em; }
        .event-info .desc { font-size: 13px; color: var(--ink-dark-3); margin: 4px 0 0; }
        .event-arrow {
          flex-shrink: 0; width: 36px; height: 36px;
          border-radius: 50%; background: rgba(0,0,0,0.04);
          display: grid; place-items: center;
          color: var(--ink-dark-2); transition: all 0.3s;
        }
        .event-row:hover .event-arrow { background: var(--accent); color: #fff; transform: rotate(-45deg); }
        @media (max-width: 980px) { .events-grid { grid-template-columns: 1fr; } }
      `}</style>
      <div className="container">
        <div className="events-head reveal">
          <div>
            <div className="eyebrow">UPCOMING EVENTS</div>
            <h2 className="h-section">다가오는 이벤트</h2>
          </div>
          <a href="events.html" style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 600 }}>모든 이벤트 →</a>
        </div>
        <div className="events-grid">
          <article className="event-feature reveal">
            <div>
              <div className="event-d">D-SOON</div>
              <div className="event-cat">제6회 KSAN 체육대회</div>
              <h3 className="event-title">폭싹<br/>뛰었수다</h3>
              <p className="event-where">USC Universum Science Park · Rotterdam</p>
            </div>
            <div className="event-meta">2026.05.09</div>
            <a href="events.html" className="btn" style={{ alignSelf: 'flex-start', position: 'relative', zIndex: 1 }}>
              신청하기 <span className="arrow">→</span>
            </a>
          </article>
          <div className="event-list reveal" data-delay="2">
            <a href="events.html" className="event-row">
              <div className="event-date"><div className="month">JUN</div><div className="day">TBD</div></div>
              <div className="event-info"><h4 className="ttl">Summer Night</h4><p className="desc">네트워킹 파티 · 장소 미정</p></div>
              <div className="event-arrow">→</div>
            </a>
            <a href="events.html" className="event-row">
              <div className="event-date"><div className="month">SEP</div><div className="day">TBD</div></div>
              <div className="event-info"><h4 className="ttl">신입생 환영회</h4><p className="desc">신규 멤버 우선 · 곧 공개</p></div>
              <div className="event-arrow">→</div>
            </a>
            <a href="events.html" className="event-row">
              <div className="event-info"><h4 className="ttl" style={{ color: 'var(--accent)' }}>전체 일정 보기</h4><p className="desc">포차나잇 · Language Buddy · 더보기</p></div>
              <div className="event-arrow">→</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Partners marquee
   ============================================================ */
function Partners() {
  const partners = [
    { name: '대한항공', icon: '✈️' }, { name: '네덜란드 한글학교', icon: '📚' },
    { name: '네덜란드 한인회', icon: '🏘️' }, { name: '신라마켓', icon: '🛒' },
    { name: 'LG Electronics', icon: '🔌' }, { name: 'Samsung', icon: '📱' },
    { name: 'NordVPN', icon: '🛡️' }, { name: 'Korean Air', icon: '✈️' },
    { name: 'KOTRA', icon: '🌐' }, { name: '주네덜란드 대사관', icon: '🇰🇷' },
  ];
  const doubled = [...partners, ...partners];
  return (
    <section className="section section--light" style={{ paddingTop: 'calc(var(--space-section) * 0.7)', paddingBottom: 'calc(var(--space-section) * 0.7)' }}>
      <style>{`
        .partners-head { max-width: 720px; margin-bottom: 56px; }
        .marquee {
          position: relative; overflow: hidden;
          mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
        }
        .marquee-track { display: flex; gap: 14px; width: max-content; animation: scroll 40s linear infinite; }
        .marquee:hover .marquee-track { animation-play-state: paused; }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        [data-motion="off"] .marquee-track { animation: none; }
        .partner-pill {
          flex-shrink: 0; padding: 14px 22px;
          background: #fff; border: 1px solid rgba(0,0,0,0.06);
          border-radius: 999px; font-size: 14.5px; font-weight: 600;
          color: var(--ink-dark);
          display: inline-flex; align-items: center; gap: 10px;
          transition: all 0.25s var(--ease-out);
        }
        .partner-pill:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(0,0,0,0.1); }
      `}</style>
      <div className="container partners-head reveal">
        <div className="eyebrow">PARTNERS</div>
        <h2 className="h-section">함께하는 파트너사</h2>
        <p className="lead" style={{ marginTop: 20 }}>
          KSAN과 함께 네덜란드 한인 유학생을 지원하는 기업·기관들입니다.
        </p>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {doubled.map((p, i) => (
            <div key={i} className="partner-pill"><span style={{ fontSize: 18 }}>{p.icon}</span>{p.name}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Newsletter — compact, inline
   ============================================================ */
function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return (
    <section style={{ padding: '64px 0', background: 'var(--bg-0)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <style>{`
        .news-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 32px; flex-wrap: wrap;
        }
        .news-form {
          display: flex; gap: 8px;
          background: var(--bg-2);
          border: 1px solid var(--line);
          border-radius: 12px; padding: 5px;
          transition: border-color 0.3s;
          min-width: 380px;
        }
        .news-form:focus-within { border-color: var(--accent); }
        .news-form input {
          flex: 1; background: transparent; border: 0;
          padding: 12px 14px; font-size: 14.5px;
          font-family: inherit; color: var(--ink); outline: none;
        }
        .news-form input::placeholder { color: var(--ink-3); }
        .news-form button {
          padding: 10px 18px; background: var(--accent);
          color: #fff; font-weight: 600; font-size: 13.5px;
          border: 0; border-radius: 8px; cursor: pointer;
          transition: background 0.2s;
        }
        .news-form button:hover { background: var(--accent-deep); }
        @media (max-width: 720px) { .news-form { min-width: 0; width: 100%; } }
      `}</style>
      <div className="container news-row">
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: 6 }}>NEWSLETTER</div>
          <h3 style={{ margin: 0, fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            매월 첫째 주, 한 통의 큐레이션
          </h3>
          <p style={{ margin: '6px 0 0', color: 'var(--ink-2)', fontSize: 14 }}>
            새 채용 공고, 다가오는 이벤트, 정착 팁을 한 번에.
          </p>
        </div>
        {submitted ? (
          <div style={{ padding: '14px 20px', background: 'rgba(74, 222, 128, 0.12)', border: '1px solid rgba(74, 222, 128, 0.35)', borderRadius: 12, color: '#15803D', fontSize: 14, fontWeight: 500 }}>
            ✓ 구독 완료! 곧 첫 메일을 받아보세요.
          </div>
        ) : (
          <form className="news-form" onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}>
            <input type="email" placeholder="이메일 주소" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">구독하기</button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   Final CTA
   ============================================================ */
function FinalCTA({ onOpenSignup }) {
  return (
    <section className="section" style={{
      textAlign: 'center',
      paddingTop: 'calc(var(--space-section) * 0.8)',
      background: 'linear-gradient(165deg, #FFE4D2 0%, #FFD4B8 50%, #FFC299 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.6), transparent 65%)',
        filter: 'blur(60px)', left: '-100px', top: '-200px', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,106,42,0.25), transparent 65%)',
        filter: 'blur(50px)', right: '-50px', bottom: '-200px', pointerEvents: 'none',
      }} />
      <div className="container" style={{ position: 'relative' }}>
        <div className="reveal" style={{ maxWidth: 880, margin: '0 auto' }}>
          <div className="eyebrow" style={{ justifyContent: 'center', display: 'inline-flex', color: 'var(--accent-deep)' }}>JOIN KSAN</div>
          <h2 className="h-display" style={{ marginTop: 16, color: 'var(--ink)' }}>
            <span className="split-line"><span>네덜란드 생활,</span></span>
            <span className="split-line" data-delay="1"><span>혼자 시작하지 마세요.</span></span>
          </h2>
          <p className="lead reveal" data-delay="2" style={{ margin: '32px auto 40px', textAlign: 'center', color: 'var(--ink-2)' }}>
            <strong style={{ color: 'var(--ink)' }}>1,000명+</strong>의 한인 유학생이 이미 함께하고 있습니다. 멤버십은 무료입니다.
          </p>
          <div className="reveal" data-delay="3" style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn--lg" onClick={onOpenSignup}>멤버십 가입하기 <span className="arrow">→</span></button>
            <a href="about.html" className="btn btn--lg btn--ghost">KSAN 알아보기</a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  Hero, Features, SettlementPreview, EventsSection, Partners, Newsletter, FinalCTA, ScrollMarquee,
});
