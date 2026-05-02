// detail-pages.jsx
// MyPage, EventDetail, JobDetail, CommunityWrite, CommunityThread, PassNew, PassDetail

const DPState = (typeof window !== 'undefined' && window.React)
  ? window.React.useState : null;

/* ============================================================
   MY PAGE
   ============================================================ */
function MyPage() {
  const tabs = [
    { id: 'jobs',     label: '채용 활동',    icon: '💼', count: 12 },
    { id: 'posts',    label: '내가 쓴 글',   icon: '✍️', count: 8 },
    { id: 'comments', label: '내 댓글',      icon: '💬', count: 47 },
    { id: 'pass',     label: '내 나눔',      icon: '🤝', count: 5 },
    { id: 'events',   label: '신청한 이벤트', icon: '🎟', count: 6 },
    { id: 'guides',   label: '저장한 가이드', icon: '🔖', count: 14 },
    { id: 'membership', label: '멤버십',     icon: '✦', count: null },
    { id: 'settings', label: '설정',         icon: '⚙', count: null },
  ];
  const [active, setActive] = React.useState('jobs');

  return (
    <>
      <style>{`
        .mypage-shell {
          padding: 130px 0 80px;
          background: var(--bg-0);
          min-height: 100vh;
        }
        .mypage-greet {
          display: flex; align-items: center; gap: 18px;
          margin-bottom: 36px;
        }
        .mypage-greet .avatar {
          width: 60px; height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), #FFB587);
          color: #fff;
          display: grid; place-items: center;
          font-weight: 800; font-size: 22px;
          font-family: var(--font-display);
        }
        .mypage-greet h1 {
          margin: 0; font-size: 26px;
          font-weight: 800; letter-spacing: -0.02em;
          color: var(--ink);
        }
        .mypage-greet .greet-meta {
          font-size: 13px; color: var(--ink-3);
          margin-top: 3px;
        }
        .mypage-greet .greet-meta .verified {
          color: var(--accent); font-weight: 600;
        }
        .mypage-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 32px;
          align-items: start;
        }
        .mypage-side {
          position: sticky; top: 100px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 8px;
          display: flex; flex-direction: column; gap: 2px;
        }
        .mypage-side button {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px;
          border: 0; background: transparent;
          border-radius: 10px;
          font-family: inherit;
          font-size: 13.5px; font-weight: 500;
          color: var(--ink-2);
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
          text-align: left;
        }
        .mypage-side button:hover { background: rgba(255,106,42,0.06); color: var(--ink); }
        .mypage-side button[data-active="1"] {
          background: var(--ink); color: #fff;
        }
        .mypage-side button[data-active="1"] .badge { background: rgba(255,255,255,0.18); color: #fff; }
        .mypage-side .ic { font-size: 14px; width: 18px; text-align: center; }
        .mypage-side .label { flex: 1; }
        .mypage-side .badge {
          padding: 2px 7px;
          background: rgba(0,0,0,0.06);
          border-radius: 999px;
          font-size: 11px; font-weight: 600;
          color: var(--ink-3);
        }
        .mypage-side .divider {
          height: 1px;
          background: var(--line);
          margin: 6px 4px;
        }

        .mypage-main {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 22px;
          padding: 32px;
          min-height: 540px;
        }
        .mypage-main h2 {
          margin: 0 0 4px;
          font-size: 22px; font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--ink);
        }
        .mypage-main .h-sub {
          margin: 0 0 24px;
          font-size: 13.5px; color: var(--ink-3);
        }
        .mp-tabs {
          display: flex; gap: 6px;
          padding: 4px;
          background: var(--bg-cream);
          border-radius: 12px;
          margin-bottom: 24px;
          width: fit-content;
        }
        .mp-tab {
          padding: 8px 14px;
          background: transparent;
          border: 0; border-radius: 8px;
          font-size: 13px; font-weight: 600;
          font-family: inherit;
          color: var(--ink-3);
          cursor: pointer;
          transition: all 0.18s;
        }
        .mp-tab:hover { color: var(--ink); }
        .mp-tab[data-active="1"] { background: #fff; color: var(--ink); box-shadow: 0 2px 8px rgba(0,0,0,0.04); }

        .mp-list { display: flex; flex-direction: column; gap: 10px; }
        .mp-item {
          display: flex; align-items: center; gap: 16px;
          padding: 16px;
          background: var(--bg-0);
          border: 1px solid var(--line);
          border-radius: 14px;
          transition: all 0.2s;
          cursor: pointer;
        }
        .mp-item:hover { border-color: var(--line-strong); transform: translateX(3px); }
        .mp-item .logo {
          width: 44px; height: 44px;
          border-radius: 10px;
          display: grid; place-items: center;
          color: #fff; font-weight: 700; font-size: 16px;
          flex-shrink: 0;
        }
        .mp-item .body { flex: 1; min-width: 0; }
        .mp-item .body .ttl {
          font-size: 14.5px; font-weight: 700; color: var(--ink);
          letter-spacing: -0.01em;
          margin-bottom: 3px;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .mp-item .body .meta {
          font-size: 12px; color: var(--ink-3);
          display: flex; gap: 10px; flex-wrap: wrap;
        }
        .mp-item .status {
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11.5px; font-weight: 700;
          letter-spacing: 0.02em;
          flex-shrink: 0;
        }
        .mp-item .status[data-tone="active"]   { background: rgba(34,197,94,0.10); color: #15803d; }
        .mp-item .status[data-tone="pending"]  { background: rgba(255,106,42,0.10); color: var(--accent); }
        .mp-item .status[data-tone="saved"]    { background: rgba(99,102,241,0.10); color: #4f46e5; }
        .mp-item .status[data-tone="rejected"] { background: rgba(0,0,0,0.06); color: var(--ink-3); }
        .mp-item .status[data-tone="done"]     { background: rgba(0,0,0,0.06); color: var(--ink-2); }

        .mp-membership {
          padding: 32px;
          border-radius: 18px;
          background: linear-gradient(135deg, #1A0E08 0%, #3a2014 100%);
          color: #fff; position: relative; overflow: hidden;
        }
        .mp-membership::before {
          content: ''; position: absolute;
          inset: -50% -20% auto auto; width: 60%; height: 200%;
          background: radial-gradient(circle, rgba(255,106,42,0.4), transparent 60%);
          pointer-events: none;
        }
        .mp-membership .tier {
          font-size: 11px; font-weight: 700;
          color: var(--accent); letter-spacing: 0.16em;
        }
        .mp-membership h3 {
          margin: 8px 0 6px;
          font-size: 28px; font-weight: 800;
          letter-spacing: -0.02em;
        }
        .mp-membership .meta {
          font-size: 13px; color: rgba(255,255,255,0.7);
          margin-bottom: 24px;
        }
        .mp-membership .perks {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .mp-membership .perk {
          padding: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
        }
        .mp-membership .perk .lbl {
          font-size: 11.5px; color: rgba(255,255,255,0.6);
          letter-spacing: 0.04em;
        }
        .mp-membership .perk .val {
          margin-top: 4px;
          font-size: 16px; font-weight: 700;
        }
        .mp-membership .perk .val.accent { color: var(--accent); }

        .mp-checklist { display: grid; gap: 10px; margin-top: 18px; }
        .mp-check {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px;
          background: var(--bg-0);
          border: 1px solid var(--line);
          border-radius: 12px;
        }
        .mp-check input[type="checkbox"] {
          width: 18px; height: 18px;
          accent-color: var(--accent);
          cursor: pointer;
        }
        .mp-check .label {
          flex: 1; font-size: 13.5px; color: var(--ink);
        }
        .mp-check[data-done="1"] .label {
          text-decoration: line-through;
          color: var(--ink-3);
        }
        .mp-check .cat {
          font-size: 11px; color: var(--ink-3);
          padding: 3px 8px;
          background: var(--bg-cream);
          border-radius: 999px;
          font-weight: 600;
        }
        .mp-progress {
          display: flex; align-items: center; gap: 14px;
          padding: 18px;
          background: var(--bg-cream);
          border-radius: 14px;
          margin-bottom: 18px;
        }
        .mp-progress .ring {
          width: 60px; height: 60px;
          border-radius: 50%;
          background: conic-gradient(var(--accent) 0% 64%, var(--line-strong) 64%);
          display: grid; place-items: center;
          flex-shrink: 0;
        }
        .mp-progress .ring::before {
          content: ''; position: absolute;
          width: 46px; height: 46px;
          background: var(--bg-cream);
          border-radius: 50%;
        }
        .mp-progress .ring span {
          position: relative;
          font-weight: 800; font-size: 13px;
          color: var(--ink-dark);
        }
        .mp-progress .body { flex: 1; }
        .mp-progress h4 { margin: 0 0 3px; font-size: 14px; color: var(--ink-dark); font-weight: 700; }
        .mp-progress p { margin: 0; font-size: 12.5px; color: var(--ink-dark-2); }

        .mp-settings { display: flex; flex-direction: column; gap: 16px; }
        .mp-set-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px;
          background: var(--bg-0);
          border: 1px solid var(--line);
          border-radius: 12px;
        }
        .mp-set-row .lhs h4 { margin: 0 0 3px; font-size: 14px; font-weight: 700; color: var(--ink); }
        .mp-set-row .lhs p { margin: 0; font-size: 12.5px; color: var(--ink-3); }
        .mp-toggle {
          width: 42px; height: 24px;
          border-radius: 999px;
          background: var(--line-strong);
          position: relative;
          cursor: pointer; border: 0;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .mp-toggle::after {
          content: ''; position: absolute;
          left: 2px; top: 2px;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #fff;
          transition: transform 0.2s;
        }
        .mp-toggle[data-on="1"] { background: var(--accent); }
        .mp-toggle[data-on="1"]::after { transform: translateX(18px); }

        .mp-empty {
          padding: 40px 20px;
          text-align: center;
          color: var(--ink-3);
          font-size: 13.5px;
        }
        .mp-empty .ic { font-size: 32px; margin-bottom: 10px; }

        @media (max-width: 980px) {
          .mypage-grid { grid-template-columns: 1fr; }
          .mypage-side { position: static; flex-direction: row; overflow-x: auto; }
        }
      `}</style>

      <section className="mypage-shell">
        <div className="container">
          <div className="mypage-greet reveal">
            <div className="avatar">민</div>
            <div>
              <h1>안녕하세요, 김민지님 👋</h1>
              <div className="greet-meta">
                University of Amsterdam · 경영학 3학년 ·
                <span className="verified"> ✓ Verified Member</span> ·
                가입일 2024.09.15
              </div>
            </div>
          </div>

          <div className="mypage-grid">
            <aside className="mypage-side reveal">
              {tabs.slice(0, 6).map((tab) => (
                <button key={tab.id} data-active={active === tab.id ? '1' : '0'} onClick={() => setActive(tab.id)}>
                  <span className="ic">{tab.icon}</span>
                  <span className="label">{tab.label}</span>
                  {tab.count != null && <span className="badge">{tab.count}</span>}
                </button>
              ))}
              <div className="divider"></div>
              {tabs.slice(6).map((tab) => (
                <button key={tab.id} data-active={active === tab.id ? '1' : '0'} onClick={() => setActive(tab.id)}>
                  <span className="ic">{tab.icon}</span>
                  <span className="label">{tab.label}</span>
                </button>
              ))}
            </aside>

            <main className="mypage-main reveal" data-delay="1">
              {active === 'jobs' && <MPJobs />}
              {active === 'posts' && <MPPosts />}
              {active === 'comments' && <MPComments />}
              {active === 'pass' && <MPPass />}
              {active === 'events' && <MPEvents />}
              {active === 'guides' && <MPGuides />}
              {active === 'membership' && <MPMembership />}
              {active === 'settings' && <MPSettings />}
            </main>
          </div>
        </div>
      </section>
    </>
  );
}

function MPJobs() {
  const [tab, setTab] = React.useState('saved');
  const data = {
    saved: [
      { co: 'Samsung Electronics Benelux', logo: 'S', tone: '#1428A0', role: 'UX Research Intern', meta: ['인턴십', 'Amsterdam', '€800/월'], status: 'saved', statusLbl: '찜' },
      { co: 'Booking.com', logo: 'B', tone: '#003580', role: 'Korean Market Specialist', meta: ['풀타임', 'Amsterdam', '€55-65k'], status: 'saved', statusLbl: '찜' },
      { co: 'KOTRA Amsterdam', logo: 'K', tone: '#003876', role: 'Trade Assistant Intern', meta: ['인턴십', 'Amsterdam', '€600/월'], status: 'saved', statusLbl: '찜' },
    ],
    applied: [
      { co: 'LG Electronics', logo: 'L', tone: '#A50034', role: 'Marketing Coordinator (KR/EN)', meta: ['풀타임', '지원일 2026.04.20', '서류 검토중'], status: 'pending', statusLbl: '검토중' },
      { co: 'Korean Air', logo: 'K', tone: '#0F2A52', role: 'Cabin Crew Recruiter', meta: ['파트타임', '지원일 2026.04.10', '면접 예정'], status: 'active', statusLbl: '면접' },
      { co: '신라마켓', logo: '신', tone: '#FF6A2A', role: '주말 카운터 직원', meta: ['파트타임', '지원일 2026.03.28'], status: 'rejected', statusLbl: '불합격' },
    ],
  };
  return (
    <>
      <h2>채용 활동</h2>
      <p className="h-sub">관심 있는 공고와 지원 현황을 한눈에.</p>
      <div className="mp-tabs">
        <button className="mp-tab" data-active={tab === 'saved' ? '1' : '0'} onClick={() => setTab('saved')}>찜 ({data.saved.length})</button>
        <button className="mp-tab" data-active={tab === 'applied' ? '1' : '0'} onClick={() => setTab('applied')}>지원 ({data.applied.length})</button>
      </div>
      <div className="mp-list">
        {data[tab].map((j, i) => (
          <a key={i} className="mp-item" href="job-detail.html">
            <div className="logo" style={{ background: j.tone }}>{j.logo}</div>
            <div className="body">
              <div className="ttl">{j.role}</div>
              <div className="meta"><span style={{ fontWeight: 600, color: 'var(--ink-2)' }}>{j.co}</span>{j.meta.map((m) => <span key={m}>· {m}</span>)}</div>
            </div>
            <span className="status" data-tone={j.status}>{j.statusLbl}</span>
          </a>
        ))}
      </div>
    </>
  );
}

function MPPosts() {
  const posts = [
    { cat: '학업 Q&A', title: 'TU Delft Aerospace 1학년 — 수학 따라가기 너무 힘든데 조언', when: '5일 전', stats: { views: 412, replies: 12, likes: 31 } },
    { cat: '생활 팁', title: 'Amsterdam 자전거 도난 5번 당하고 깨달은 것들', when: '2주 전', stats: { views: 1280, replies: 19, likes: 124 } },
    { cat: '익명 고민', title: '졸업 후 한국 vs 네덜란드 취업', when: '1달 전', stats: { views: 890, replies: 38, likes: 89 } },
  ];
  return (
    <>
      <h2>내가 쓴 글</h2>
      <p className="h-sub">Community에 작성한 글입니다.</p>
      <div className="mp-list">
        {posts.map((p, i) => (
          <a key={i} className="mp-item" href="community-thread.html">
            <div className="logo" style={{ background: 'var(--bg-cream)', color: 'var(--ink)', fontSize: 18 }}>{p.cat[0]}</div>
            <div className="body">
              <div className="ttl">{p.title}</div>
              <div className="meta"><span style={{ color: 'var(--accent)', fontWeight: 600 }}>{p.cat}</span><span>· {p.when}</span><span>· 조회 {p.stats.views}</span><span>· 댓글 {p.stats.replies}</span><span>· 좋아요 {p.stats.likes}</span></div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

function MPComments() {
  const comments = [
    { on: 'Amsterdam 자전거 도난 5번 당하고 깨달은 것들', mine: '저는 Kryptonite + Abus 조합 쓰는데 1년째 무사고예요. 진짜 두 자물쇠는 필수인 듯', when: '3일 전', likes: 12 },
    { on: 'TU Delft Aerospace 1학년 — 수학 따라가기 너무 힘든데 조언', mine: '저도 처음에 그랬는데, KSAN 스터디 그룹 추천드려요. 같이 풀면 훨씬 빨라요.', when: '1주 전', likes: 8 },
    { on: '룸메이트가 자꾸 한국 음식 냄새난다고 합니다', mine: '본인 집에서 본인 음식 해먹는 건 당당하셔도 돼요. 환기 대화는 따로 하시고요.', when: '2주 전', likes: 34 },
  ];
  return (
    <>
      <h2>내 댓글</h2>
      <p className="h-sub">최근 작성한 댓글 47개</p>
      <div className="mp-list">
        {comments.map((c, i) => (
          <div key={i} className="mp-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600 }}>↳ {c.on}</div>
            <div style={{ fontSize: 14, color: 'var(--ink), lineHeight: 1.5' }}>{c.mine}</div>
            <div className="meta" style={{ fontSize: 12, color: 'var(--ink-3)' }}>
              <span>{c.when}</span><span>· 좋아요 {c.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function MPPass() {
  const [tab, setTab] = React.useState('listed');
  const listed = [
    { title: 'IKEA Malm 책상 + 의자', status: 'done', statusLbl: '나눔 완료', loc: 'Amstelveen', date: '2026.04.20', img: 'linear-gradient(135deg, #d4a574, #8B5E3C)' },
    { title: '미니 냉장고 (45L)', status: 'active', statusLbl: '진행중', loc: 'Den Haag', date: '진행중', img: 'linear-gradient(135deg, #c0c5cb, #6c757d)' },
    { title: '겨울 패딩 (M)', status: 'done', statusLbl: '나눔 완료', loc: 'Eindhoven', date: '2026.03.15', img: 'linear-gradient(135deg, #2d2d3a, #181822)' },
  ];
  const reviews = [
    { from: 'Hyejin K.', rating: 5, msg: '책상 상태가 사진보다 훨씬 좋았어요! 픽업도 친절하셨고 다음에 또 만나요 :)', when: '2026.04.21' },
    { from: 'Sungho L.', rating: 5, msg: '시간 약속 잘 지키시고, 깨끗하게 사용한 것 알려주셔서 안심하고 받았습니다.', when: '2026.03.16' },
  ];
  return (
    <>
      <h2>내 나눔</h2>
      <p className="h-sub">Pass It On 활동 내역</p>
      <div className="mp-tabs">
        <button className="mp-tab" data-active={tab === 'listed' ? '1' : '0'} onClick={() => setTab('listed')}>등록 ({listed.length})</button>
        <button className="mp-tab" data-active={tab === 'reviews' ? '1' : '0'} onClick={() => setTab('reviews')}>받은 후기 ({reviews.length})</button>
      </div>
      {tab === 'listed' && (
        <div className="mp-list">
          {listed.map((it, i) => (
            <a key={i} className="mp-item" href="pass-detail.html">
              <div className="logo" style={{ background: it.img, fontSize: 0 }}></div>
              <div className="body">
                <div className="ttl">{it.title}</div>
                <div className="meta"><span>{it.loc}</span><span>· {it.date}</span></div>
              </div>
              <span className="status" data-tone={it.status}>{it.statusLbl}</span>
            </a>
          ))}
        </div>
      )}
      {tab === 'reviews' && (
        <div className="mp-list">
          {reviews.map((r, i) => (
            <div key={i} className="mp-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)' }}>{r.from}</div>
                <div style={{ color: 'var(--accent)', fontSize: 13 }}>{'★'.repeat(r.rating)}</div>
              </div>
              <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.5 }}>"{r.msg}"</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{r.when}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function MPEvents() {
  const events = [
    { title: '2026 KSAN 봄 체육대회', date: '2026.05.18', loc: 'Sportcomplex Amstelveen', status: 'active', statusLbl: '신청완료' },
    { title: '5월 비즈니스 네트워킹 나이트', date: '2026.05.10', loc: 'WeWork Amsterdam', status: 'pending', statusLbl: '대기열' },
    { title: '4월 K-pop 댄스 클래스', date: '2026.04.20', loc: 'Studio H Den Haag', status: 'done', statusLbl: '참석완료' },
    { title: '봄맞이 나들이 (Keukenhof)', date: '2026.04.05', loc: 'Lisse', status: 'done', statusLbl: '참석완료' },
  ];
  return (
    <>
      <h2>신청한 이벤트</h2>
      <p className="h-sub">올해 6개 이벤트에 참여 중</p>
      <div className="mp-list">
        {events.map((e, i) => (
          <a key={i} className="mp-item" href="event-detail.html">
            <div className="logo" style={{ background: 'linear-gradient(135deg, var(--accent), #FFB587)' }}>🎟</div>
            <div className="body">
              <div className="ttl">{e.title}</div>
              <div className="meta"><span style={{ fontWeight: 600, color: 'var(--ink-2)' }}>{e.date}</span><span>· {e.loc}</span></div>
            </div>
            <span className="status" data-tone={e.status}>{e.statusLbl}</span>
          </a>
        ))}
      </div>
    </>
  );
}

function MPGuides() {
  const [tab, setTab] = React.useState('saved');
  const saved = [
    { cat: '행정', title: 'BSN 신청부터 수령까지 A to Z', when: '2026.04.18 저장' },
    { cat: '주거', title: 'Kamernet / Pararius — 플랫폼 양대산맥', when: '2026.04.10 저장' },
    { cat: '금융', title: 'ABN AMRO 학생 계좌 개설하기', when: '2026.03.30 저장' },
    { cat: '교통', title: '자전거 구입 — €100-300 중고', when: '2026.03.22 저장' },
    { cat: '쇼핑', title: '신라마켓 / 한아름 — 한국 식재료', when: '2026.03.15 저장' },
  ];
  const checklist = [
    { cat: '행정', label: '시청 등록 (Inschrijven) 완료', done: true },
    { cat: '행정', label: 'BSN 발급 받기', done: true },
    { cat: '행정', label: 'IND 거주허가증 픽업', done: true },
    { cat: '행정', label: 'DigiD 신청', done: true },
    { cat: '금융', label: '학생 계좌 개설 (ABN/ING)', done: true },
    { cat: '금융', label: '의료보험 가입 (의무)', done: true },
    { cat: '주거', label: '임대 계약서 시청 등록', done: false },
    { cat: '주거', label: 'Huurtoeslag 신청', done: false },
    { cat: '교통', label: 'OV-chipkaart 발급', done: true },
    { cat: '교통', label: 'Studentenreisproduct 신청', done: false },
    { cat: '쇼핑', label: 'AH Bonus 카드 발급', done: false },
  ];
  const doneCount = checklist.filter((c) => c.done).length;
  const pct = Math.round((doneCount / checklist.length) * 100);

  return (
    <>
      <h2>저장한 가이드 & 체크리스트</h2>
      <p className="h-sub">정착 진행 상황을 추적하세요.</p>
      <div className="mp-tabs">
        <button className="mp-tab" data-active={tab === 'saved' ? '1' : '0'} onClick={() => setTab('saved')}>저장 ({saved.length})</button>
        <button className="mp-tab" data-active={tab === 'checklist' ? '1' : '0'} onClick={() => setTab('checklist')}>체크리스트</button>
      </div>
      {tab === 'saved' && (
        <div className="mp-list">
          {saved.map((s, i) => (
            <a key={i} className="mp-item" href="settlement-guide.html">
              <div className="logo" style={{ background: 'var(--bg-cream)', color: 'var(--ink-dark)', fontSize: 13, fontWeight: 700 }}>{s.cat}</div>
              <div className="body">
                <div className="ttl">{s.title}</div>
                <div className="meta"><span>{s.when}</span></div>
              </div>
            </a>
          ))}
        </div>
      )}
      {tab === 'checklist' && (
        <>
          <div className="mp-progress">
            <div className="ring" style={{ background: `conic-gradient(var(--accent) 0% ${pct}%, var(--line-strong) ${pct}%)` }}>
              <span>{pct}%</span>
            </div>
            <div className="body">
              <h4>정착 진행도 {doneCount} / {checklist.length}</h4>
              <p>나머지 {checklist.length - doneCount}개를 마치면 완료!</p>
            </div>
          </div>
          <div className="mp-checklist">
            {checklist.map((c, i) => (
              <label key={i} className="mp-check" data-done={c.done ? '1' : '0'}>
                <input type="checkbox" defaultChecked={c.done} />
                <span className="label">{c.label}</span>
                <span className="cat">{c.cat}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function MPMembership() {
  return (
    <>
      <h2>멤버십</h2>
      <p className="h-sub">현재 KSAN Verified 멤버십을 이용 중입니다.</p>
      <div className="mp-membership">
        <div className="tier">KSAN VERIFIED</div>
        <h3>Active 멤버</h3>
        <div className="meta">2024.09.15 가입 · 갱신일 2026.09.15</div>
        <div className="perks">
          <div className="perk"><div className="lbl">정착 가이드 풀 액세스</div><div className="val accent">활성</div></div>
          <div className="perk"><div className="lbl">공동구매 참여</div><div className="val accent">활성</div></div>
          <div className="perk"><div className="lbl">검증 채용 정보</div><div className="val accent">활성</div></div>
          <div className="perk"><div className="lbl">Crisis Line</div><div className="val accent">활성</div></div>
          <div className="perk"><div className="lbl">이번 해 절약</div><div className="val">€340</div></div>
          <div className="perk"><div className="lbl">참여 이벤트</div><div className="val">6회</div></div>
        </div>
      </div>
      <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
        <button className="btn btn--primary">갱신하기</button>
        <button className="btn btn--ghost">멤버십 관리</button>
      </div>
    </>
  );
}

function MPSettings() {
  const [vals, setVals] = React.useState({
    push: true, email: true, sms: false,
    weekly: true, eventReminder: true,
    lang: 'ko', visibility: 'members',
  });
  const toggle = (k) => setVals((v) => ({ ...v, [k]: !v[k] }));
  return (
    <>
      <h2>설정</h2>
      <p className="h-sub">계정과 알림 환경설정.</p>
      <div className="mp-settings">
        <div className="mp-set-row">
          <div className="lhs"><h4>앱 푸시 알림</h4><p>새 채용공고, 댓글, 메시지</p></div>
          <button className="mp-toggle" data-on={vals.push ? '1' : '0'} onClick={() => toggle('push')} aria-label="Toggle push" />
        </div>
        <div className="mp-set-row">
          <div className="lhs"><h4>이메일 알림</h4><p>주간 다이제스트 및 중요 공지</p></div>
          <button className="mp-toggle" data-on={vals.email ? '1' : '0'} onClick={() => toggle('email')} aria-label="Toggle email" />
        </div>
        <div className="mp-set-row">
          <div className="lhs"><h4>이벤트 리마인더</h4><p>참석 이벤트 24시간 전 알림</p></div>
          <button className="mp-toggle" data-on={vals.eventReminder ? '1' : '0'} onClick={() => toggle('eventReminder')} aria-label="Toggle reminder" />
        </div>
        <div className="mp-set-row">
          <div className="lhs"><h4>주간 뉴스레터</h4><p>매주 일요일 오전</p></div>
          <button className="mp-toggle" data-on={vals.weekly ? '1' : '0'} onClick={() => toggle('weekly')} aria-label="Toggle weekly" />
        </div>
        <div className="mp-set-row">
          <div className="lhs"><h4>프로필 공개 범위</h4><p>다른 멤버에게 보이는 정보</p></div>
          <select className="form-select" style={{ minWidth: 140 }} value={vals.visibility} onChange={(e) => setVals({...vals, visibility: e.target.value})}>
            <option value="public">모두 공개</option>
            <option value="members">멤버에게만</option>
            <option value="private">비공개</option>
          </select>
        </div>
        <div className="mp-set-row">
          <div className="lhs"><h4>언어</h4><p>인터페이스 언어</p></div>
          <select className="form-select" style={{ minWidth: 140 }} value={vals.lang} onChange={(e) => setVals({...vals, lang: e.target.value})}>
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="nl">Nederlands</option>
          </select>
        </div>
      </div>
      <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
        <button className="btn btn--ghost" style={{ color: '#dc2626', borderColor: '#fca5a5' }}>로그아웃</button>
        <button className="btn btn--ghost" style={{ color: 'var(--ink-3)' }}>계정 삭제</button>
      </div>
    </>
  );
}

/* ============================================================
   EVENT DETAIL
   ============================================================ */
function EventDetail() {
  return (
    <>
      <style>{`
        .event-d {
          padding: 110px 0 80px;
          background: var(--bg-0);
        }
        .event-d .crumb {
          font-size: 12.5px; color: var(--ink-3);
          margin-bottom: 24px;
        }
        .event-d .crumb a { color: var(--ink-3); }
        .event-d .crumb a:hover { color: var(--accent); }
        .event-d-hero {
          position: relative;
          height: 360px;
          border-radius: 28px;
          overflow: hidden;
          margin-bottom: 36px;
          background: linear-gradient(135deg, var(--accent) 0%, #FF9466 50%, #1A0E08 100%);
          display: flex; align-items: flex-end;
          padding: 36px;
          color: #fff;
        }
        .event-d-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.2), transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1), transparent 40%);
          pointer-events: none;
        }
        .event-d-hero .badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 12px;
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(8px);
          border-radius: 999px;
          font-size: 11.5px; font-weight: 700;
          letter-spacing: 0.16em;
        }
        .event-d-hero h1 {
          margin: 14px 0 12px;
          font-size: clamp(36px, 4.4vw, 56px);
          font-weight: 800; letter-spacing: -0.03em;
          line-height: 1.05;
          max-width: 700px;
        }
        .event-d-hero .meta {
          display: flex; gap: 20px; flex-wrap: wrap;
          font-size: 14px;
          opacity: 0.92;
        }
        .event-d-hero .meta span { display: inline-flex; align-items: center; gap: 6px; }
        .event-d-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 40px;
          align-items: start;
        }
        .event-d-body h2 {
          font-size: 22px; font-weight: 800;
          letter-spacing: -0.02em;
          margin: 32px 0 14px;
          color: var(--ink);
        }
        .event-d-body h2:first-child { margin-top: 0; }
        .event-d-body p {
          margin: 0 0 14px;
          font-size: 15px; line-height: 1.75;
          color: var(--ink-2);
        }
        .event-d-body ul { margin: 0; padding-left: 20px; }
        .event-d-body ul li { font-size: 15px; line-height: 1.85; color: var(--ink-2); }
        .schedule-list { display: flex; flex-direction: column; gap: 1px; background: var(--line); border-radius: 14px; overflow: hidden; }
        .schedule-row {
          display: flex; align-items: center; gap: 18px;
          padding: 14px 18px;
          background: #fff;
        }
        .schedule-row .time {
          font-family: var(--font-mono);
          font-size: 13px; font-weight: 600;
          color: var(--accent);
          min-width: 80px;
        }
        .schedule-row .body { flex: 1; }
        .schedule-row .body .ttl { font-size: 14.5px; font-weight: 700; color: var(--ink); }
        .schedule-row .body .desc { font-size: 12.5px; color: var(--ink-3); margin-top: 2px; }

        .event-d-side {
          position: sticky; top: 100px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 22px;
          padding: 28px;
          box-shadow: 0 12px 28px rgba(0,0,0,0.04);
        }
        .event-d-side .price {
          font-family: var(--font-display);
          font-size: 32px; font-weight: 800;
          color: var(--ink); letter-spacing: -0.02em;
          line-height: 1;
        }
        .event-d-side .price small {
          font-family: inherit;
          font-size: 13px; font-weight: 500;
          color: var(--ink-3);
          margin-left: 6px;
        }
        .event-d-side .progress {
          margin: 20px 0;
        }
        .event-d-side .progress .lbls {
          display: flex; justify-content: space-between;
          font-size: 12px; color: var(--ink-3);
          margin-bottom: 8px;
        }
        .event-d-side .progress .lbls strong { color: var(--ink); font-weight: 700; }
        .event-d-side .progress .bar {
          height: 6px;
          background: var(--line);
          border-radius: 999px;
          overflow: hidden;
        }
        .event-d-side .progress .bar span {
          display: block; height: 100%;
          background: linear-gradient(90deg, var(--accent), #FFB587);
          border-radius: 999px;
        }
        .event-d-side .info-row {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 0;
          border-top: 1px solid var(--line);
          font-size: 13.5px;
        }
        .event-d-side .info-row .ic { color: var(--accent); font-size: 14px; }
        .event-d-side .info-row .lbl { color: var(--ink-3); flex: 1; }
        .event-d-side .info-row .val { color: var(--ink); font-weight: 600; }
        .event-d-side .btn {
          display: block; width: 100%;
          margin-top: 16px;
        }
        .event-d-side .share {
          margin-top: 12px;
          display: flex; gap: 6px;
        }
        .event-d-side .share button {
          flex: 1;
          padding: 9px;
          background: var(--bg-cream);
          border: 0; border-radius: 10px;
          font-size: 12px; font-weight: 600;
          color: var(--ink-dark);
          cursor: pointer; transition: background 0.2s;
        }
        .event-d-side .share button:hover { background: var(--accent); color: #fff; }

        .attendees {
          display: flex; align-items: center; gap: 12px;
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid var(--line);
        }
        .attendees .pile {
          display: flex;
        }
        .attendees .pile .av {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 2px solid #fff;
          display: grid; place-items: center;
          color: #fff; font-size: 11px; font-weight: 700;
          margin-left: -8px;
        }
        .attendees .pile .av:first-child { margin-left: 0; }
        .attendees .text { font-size: 13px; color: var(--ink-2); }
        .attendees .text strong { color: var(--ink); font-weight: 700; }

        @media (max-width: 980px) {
          .event-d-grid { grid-template-columns: 1fr; }
          .event-d-side { position: static; }
        }
      `}</style>

      <section className="event-d">
        <div className="container">
          <div className="crumb reveal"><a href="events.html">← 이벤트</a></div>

          <div className="event-d-hero reveal">
            <div>
              <span className="badge">⚡ FLAGSHIP · 봄 시즌</span>
              <h1>2026 KSAN 봄 체육대회</h1>
              <div className="meta">
                <span>📅 2026년 5월 18일 (토)</span>
                <span>🕐 09:00 - 18:00</span>
                <span>📍 Sportcomplex Amstelveen</span>
              </div>
            </div>
          </div>

          <div className="event-d-grid">
            <main className="event-d-body reveal" data-delay="1">
              <h2>이벤트 소개</h2>
              <p>
                매년 200명+ 참여하는 KSAN의 대표 행사. 축구, 농구, 발리볼, 줄다리기까지 — 학교별 팀으로 출전해 우승을 가립니다. 운동 못해도 환영! 응원단, 도시락 부스, 한복 포토존도 함께합니다.
              </p>
              <p>
                작년 우승 학교는 University of Amsterdam이었습니다. 올해는 어디가 차지할까요?
              </p>

              <h2>당일 일정</h2>
              <div className="schedule-list">
                <div className="schedule-row">
                  <div className="time">09:00</div>
                  <div className="body"><div className="ttl">집결 & 등록</div><div className="desc">팀 티셔츠 수령, 간단한 스트레칭</div></div>
                </div>
                <div className="schedule-row">
                  <div className="time">10:00</div>
                  <div className="body"><div className="ttl">개회식 & 학교별 입장</div><div className="desc">학생회장 인사말, 선수 선서</div></div>
                </div>
                <div className="schedule-row">
                  <div className="time">10:30</div>
                  <div className="body"><div className="ttl">예선 경기 시작</div><div className="desc">축구 / 농구 / 발리볼 동시 진행</div></div>
                </div>
                <div className="schedule-row">
                  <div className="time">12:30</div>
                  <div className="body"><div className="ttl">점심 (한식 도시락)</div><div className="desc">신라마켓 후원 — 잡채김밥, 김치볶음밥</div></div>
                </div>
                <div className="schedule-row">
                  <div className="time">14:00</div>
                  <div className="body"><div className="ttl">결승 경기 & 줄다리기</div><div className="desc">학교 대항 결승, 단체 줄다리기 토너먼트</div></div>
                </div>
                <div className="schedule-row">
                  <div className="time">16:30</div>
                  <div className="body"><div className="ttl">시상식 & 단체 사진</div><div className="desc">우승 트로피 수여, 한복 포토존 운영</div></div>
                </div>
                <div className="schedule-row">
                  <div className="time">17:00</div>
                  <div className="body"><div className="ttl">뒷풀이 (자유)</div><div className="desc">근처 한식당 단체 예약 — 추가 €15</div></div>
                </div>
              </div>

              <h2>준비물</h2>
              <ul>
                <li>운동복, 운동화 (실외/실내 모두)</li>
                <li>물병, 수건</li>
                <li>학생증 (등록 시 확인)</li>
                <li>응원할 마음 ❤️</li>
              </ul>

              <h2>유의사항</h2>
              <p>
                <strong>취소 정책:</strong> 행사 7일 전까지 100% 환불, 7일 이내 50%, 24시간 이내 환불 불가.<br/>
                <strong>날씨:</strong> 우천 시 실내 종목으로 변경, 행사 자체는 진행됩니다.<br/>
                <strong>기념품:</strong> 모든 참가자에게 KSAN 로고 티셔츠 + 양말 제공.
              </p>
            </main>

            <aside className="event-d-side reveal" data-delay="2">
              <div className="price">€15<small>/ 멤버 (€25 비멤버)</small></div>
              <div className="progress">
                <div className="lbls"><span><strong>147</strong> / 200명 신청</span><span>53석 남음</span></div>
                <div className="bar"><span style={{ width: '73%' }}></span></div>
              </div>

              <div className="info-row">
                <span className="ic">📅</span>
                <span className="lbl">날짜</span>
                <span className="val">5월 18일 (토)</span>
              </div>
              <div className="info-row">
                <span className="ic">📍</span>
                <span className="lbl">장소</span>
                <span className="val">Amstelveen</span>
              </div>
              <div className="info-row">
                <span className="ic">⏱</span>
                <span className="lbl">소요 시간</span>
                <span className="val">9시간</span>
              </div>
              <div className="info-row">
                <span className="ic">👥</span>
                <span className="lbl">대상</span>
                <span className="val">전 멤버</span>
              </div>
              <div className="info-row">
                <span className="ic">🚌</span>
                <span className="lbl">셔틀</span>
                <span className="val">Centraal 출발</span>
              </div>

              <button className="btn btn--primary">신청하기 — €15</button>
              <div className="share">
                <button>📋 복사</button>
                <button>📷 IG</button>
                <button>💬 KKT</button>
              </div>

              <div className="attendees">
                <div className="pile">
                  {['#FF6A2A', '#1428A0', '#A50034', '#0F8A4A', '#003876'].map((c, i) => (
                    <div key={i} className="av" style={{ background: c }}>{['민','준','지','현','수'][i]}</div>
                  ))}
                </div>
                <div className="text"><strong>김민지님 외 146명</strong>이 신청했어요</div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   JOB DETAIL
   ============================================================ */
function JobDetail() {
  return (
    <>
      <style>{`
        .job-d { padding: 110px 0 80px; background: var(--bg-0); }
        .job-d .crumb {
          font-size: 12.5px; color: var(--ink-3);
          margin-bottom: 24px;
        }
        .job-d .crumb a:hover { color: var(--accent); }
        .job-d-head {
          display: flex; gap: 24px; align-items: flex-start;
          padding: 32px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 24px;
          margin-bottom: 32px;
        }
        .job-d-head .logo {
          width: 72px; height: 72px;
          border-radius: 16px;
          background: #1428A0;
          color: #fff;
          display: grid; place-items: center;
          font-size: 32px; font-weight: 800;
          font-family: var(--font-display);
          flex-shrink: 0;
        }
        .job-d-head .body { flex: 1; }
        .job-d-head .co {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 600;
          color: var(--ink-2);
          margin-bottom: 6px;
        }
        .job-d-head .verified-badge {
          padding: 3px 9px;
          background: rgba(34,197,94,0.10);
          color: #15803d;
          border-radius: 999px;
          font-size: 10.5px; font-weight: 700;
        }
        .job-d-head h1 {
          margin: 0 0 14px;
          font-size: clamp(28px, 3vw, 38px);
          font-weight: 800; letter-spacing: -0.025em;
          line-height: 1.15;
          color: var(--ink);
        }
        .job-d-head .chips { display: flex; gap: 8px; flex-wrap: wrap; }
        .job-d-head .chip {
          padding: 6px 12px;
          background: var(--bg-cream);
          border-radius: 999px;
          font-size: 12.5px; font-weight: 600;
          color: var(--ink-dark-2);
        }
        .job-d-head .chip[data-tone="accent"] { background: rgba(255,106,42,0.10); color: var(--accent); }
        .job-d-head .actions {
          display: flex; flex-direction: column; gap: 8px;
          flex-shrink: 0;
        }
        .job-d-head .actions .save {
          padding: 10px 14px;
          background: transparent;
          border: 1px solid var(--line-strong);
          border-radius: 10px;
          font-family: inherit;
          font-size: 13px; font-weight: 600;
          color: var(--ink-2);
          cursor: pointer; transition: all 0.2s;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .job-d-head .actions .save:hover { color: var(--accent); border-color: var(--accent); }
        .job-d-head .actions .save[data-saved="1"] {
          background: rgba(255,106,42,0.10); border-color: var(--accent); color: var(--accent);
        }

        .job-d-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 40px;
          align-items: start;
        }
        .job-d-body section { margin-bottom: 32px; }
        .job-d-body h2 {
          font-size: 18px; font-weight: 800;
          letter-spacing: -0.015em;
          margin: 0 0 14px;
          color: var(--ink);
        }
        .job-d-body p, .job-d-body li {
          font-size: 14.5px; line-height: 1.75;
          color: var(--ink-2);
        }
        .job-d-body ul { margin: 0; padding-left: 20px; }
        .job-d-body .req-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .job-d-body .req-item {
          padding: 14px 16px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 12px;
          font-size: 13.5px;
          color: var(--ink-2);
        }
        .job-d-body .req-item strong { display: block; color: var(--ink); font-size: 12px; letter-spacing: 0.04em; margin-bottom: 4px; }

        .job-d-side {
          position: sticky; top: 100px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 22px;
          padding: 24px;
        }
        .job-d-side h3 {
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--ink-3);
          margin: 0 0 14px;
        }
        .job-d-side .stat {
          display: flex; justify-content: space-between;
          padding: 12px 0;
          border-top: 1px solid var(--line);
          font-size: 13.5px;
        }
        .job-d-side .stat:first-of-type { border-top: 0; }
        .job-d-side .stat .lbl { color: var(--ink-3); }
        .job-d-side .stat .val { color: var(--ink); font-weight: 700; }
        .job-d-side .btn { display: block; width: 100%; margin-top: 16px; }
      `}</style>

      <section className="job-d">
        <div className="container">
          <div className="crumb reveal"><a href="business-hub.html">← Business Hub</a></div>

          <div className="job-d-head reveal">
            <div className="logo">S</div>
            <div className="body">
              <div className="co">
                Samsung Electronics Benelux
                <span className="verified-badge">✓ KSAN Verified</span>
              </div>
              <h1>UX Research Intern</h1>
              <div className="chips">
                <span className="chip">인턴십</span>
                <span className="chip">Amsterdam</span>
                <span className="chip" data-tone="accent">€800/월</span>
                <span className="chip">한국어 우대</span>
                <span className="chip">2일 전 등록</span>
              </div>
            </div>
            <div className="actions">
              <button className="save" data-saved="1">♥ 찜 됨</button>
              <button className="btn btn--primary">지원하기 →</button>
            </div>
          </div>

          <div className="job-d-grid">
            <main className="job-d-body reveal" data-delay="1">
              <section>
                <h2>회사 소개</h2>
                <p>
                  Samsung Electronics Benelux는 네덜란드/벨기에/룩셈부르크 시장을 담당하는 삼성전자 유럽 본부의 핵심 거점입니다. Amsterdam Zuidas에 위치한 본사에서 가전/모바일/B2B 제품 전 라인을 다룹니다.
                </p>
              </section>

              <section>
                <h2>주요 업무</h2>
                <ul>
                  <li>UX 리서치 프로젝트 기획 및 실행 (사용자 인터뷰, 설문, 사용성 테스트)</li>
                  <li>한국 본사와 네덜란드 현지 팀 간 리서치 결과 공유 및 번역</li>
                  <li>경쟁사 제품 분석 및 트렌드 리포트 작성</li>
                  <li>월간 인사이트 리포트 발행 — 경영진 대상 영문 작성</li>
                  <li>제품 출시 전 컨셉 테스트 보조</li>
                </ul>
              </section>

              <section>
                <h2>자격 요건</h2>
                <div className="req-grid">
                  <div className="req-item"><strong>전공</strong>심리학, HCI, 디자인, 마케팅, 또는 관련 분야 학사/석사 재학</div>
                  <div className="req-item"><strong>학년</strong>3-4학년 또는 석사 1-2년차</div>
                  <div className="req-item"><strong>언어</strong>한국어 모국어, 영어 비즈니스 가능 (네덜란드어 우대)</div>
                  <div className="req-item"><strong>기간</strong>최소 6개월 풀타임 (주 40시간)</div>
                  <div className="req-item"><strong>시작일</strong>2026년 7월 또는 9월</div>
                  <div className="req-item"><strong>비자</strong>네덜란드 학생/취업 비자 보유</div>
                </div>
              </section>

              <section>
                <h2>우대 사항</h2>
                <ul>
                  <li>UX 리서치 또는 마케팅 리서치 인턴 경험</li>
                  <li>Figma, Notion, Miro 등 협업 도구 능숙</li>
                  <li>SPSS, R, Python 중 하나 이상 사용 가능</li>
                  <li>가전/모바일 제품에 대한 관심과 이해</li>
                </ul>
              </section>

              <section>
                <h2>혜택</h2>
                <ul>
                  <li>월 €800 수당 (full-time 환산)</li>
                  <li>점심 식대 보조 (€10/일)</li>
                  <li>대중교통 100% 환급</li>
                  <li>삼성 제품 직원 할인 (최대 30%)</li>
                  <li>인턴 종료 시 정식 채용 가능성 (작년 70% 전환율)</li>
                </ul>
              </section>

              <section>
                <h2>지원 방법</h2>
                <p>
                  하단 "지원하기" 버튼을 통해 KSAN 프로필이 자동 첨부됩니다. 추가 자료(이력서, 포트폴리오)는 양식 내에서 업로드 가능합니다. 제출 후 영업일 5일 내 1차 회신을 드립니다.
                </p>
              </section>
            </main>

            <aside className="job-d-side reveal" data-delay="2">
              <h3>JOB STATS</h3>
              <div className="stat"><span className="lbl">조회수</span><span className="val">2,847</span></div>
              <div className="stat"><span className="lbl">지원자</span><span className="val">42명</span></div>
              <div className="stat"><span className="lbl">KSAN 매칭률</span><span className="val">92%</span></div>
              <div className="stat"><span className="lbl">마감</span><span className="val">5월 31일</span></div>
              <div className="stat"><span className="lbl">서류 답변</span><span className="val">평균 5일</span></div>
              <button className="btn btn--primary">지원하기 →</button>
              <button className="btn btn--ghost" style={{ marginTop: 8 }}>회사 소식 받기</button>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   COMMUNITY WRITE
   ============================================================ */
function CommunityWrite() {
  const [cat, setCat] = React.useState('학업 Q&A');
  const [anon, setAnon] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');

  const cats = [
    { name: '학업 Q&A', icon: '🎓' },
    { name: '진로 고민', icon: '🧭' },
    { name: '생활 팁', icon: '💡' },
    { name: '익명 고민', icon: '💭' },
    { name: '자유 게시판', icon: '☕' },
    { name: '리뷰', icon: '⭐' },
  ];

  return (
    <>
      <style>{`
        .cw { padding: 110px 0 80px; background: var(--bg-0); min-height: 100vh; }
        .cw .crumb {
          font-size: 12.5px; color: var(--ink-3);
          margin-bottom: 24px;
        }
        .cw .crumb a:hover { color: var(--accent); }
        .cw-shell {
          max-width: 800px; margin: 0 auto;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 24px;
          overflow: hidden;
        }
        .cw-shell header {
          padding: 24px 32px;
          border-bottom: 1px solid var(--line);
          display: flex; align-items: center; justify-content: space-between;
        }
        .cw-shell header h1 {
          margin: 0; font-size: 18px;
          font-weight: 800; letter-spacing: -0.015em;
          color: var(--ink);
        }
        .cw-shell header .stats {
          font-size: 12px; color: var(--ink-3);
        }
        .cw-shell .body { padding: 24px 32px; }
        .cw-cats {
          display: flex; gap: 8px; flex-wrap: wrap;
          margin-bottom: 24px;
        }
        .cw-cats button {
          padding: 8px 14px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 999px;
          font-family: inherit;
          font-size: 13px; font-weight: 500;
          color: var(--ink-2);
          cursor: pointer;
          transition: all 0.18s;
        }
        .cw-cats button:hover { color: var(--ink); border-color: var(--line-strong); }
        .cw-cats button[data-active="1"] {
          background: var(--accent); color: #fff;
          border-color: var(--accent);
        }
        .cw-title {
          width: 100%;
          padding: 14px 0;
          border: 0;
          border-bottom: 1px solid var(--line);
          font-family: inherit;
          font-size: 22px; font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.02em;
          margin-bottom: 18px;
          background: transparent;
          outline: none;
        }
        .cw-title:focus { border-bottom-color: var(--accent); }
        .cw-toolbar {
          display: flex; gap: 4px;
          padding: 10px 0;
          margin-bottom: 8px;
          border-bottom: 1px solid var(--line);
        }
        .cw-toolbar button {
          width: 32px; height: 32px;
          background: transparent;
          border: 0; border-radius: 8px;
          font-family: inherit;
          font-size: 14px; font-weight: 700;
          color: var(--ink-2);
          cursor: pointer; transition: background 0.18s;
        }
        .cw-toolbar button:hover { background: var(--bg-cream); color: var(--ink); }
        .cw-body {
          width: 100%;
          min-height: 260px;
          padding: 14px 0;
          border: 0;
          font-family: inherit;
          font-size: 15.5px; line-height: 1.75;
          color: var(--ink);
          resize: vertical;
          outline: none;
          background: transparent;
        }
        .cw-body::placeholder { color: var(--ink-3); }
        .cw-attach {
          display: flex; gap: 10px; flex-wrap: wrap;
          padding: 14px 0;
          border-top: 1px solid var(--line);
        }
        .cw-chip {
          padding: 8px 12px;
          background: var(--bg-cream);
          border-radius: 999px;
          font-size: 12.5px; color: var(--ink-dark-2);
          display: inline-flex; align-items: center; gap: 6px;
          cursor: pointer; border: 0;
          font-family: inherit; font-weight: 500;
        }
        .cw-chip:hover { background: rgba(255,106,42,0.10); color: var(--accent); }
        .cw-foot {
          padding: 18px 32px;
          background: var(--bg-cream);
          display: flex; align-items: center; justify-content: space-between;
          gap: 18px; flex-wrap: wrap;
        }
        .cw-foot .left {
          display: flex; align-items: center; gap: 14px;
        }
        .cw-anon {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 13px; color: var(--ink-dark-2); cursor: pointer;
        }
        .cw-anon input { width: 16px; height: 16px; accent-color: var(--accent); }
        .cw-foot .right {
          display: flex; gap: 10px;
        }
        .cw-tip {
          margin-top: 24px;
          padding: 14px 18px;
          background: rgba(255,106,42,0.05);
          border-left: 3px solid var(--accent);
          border-radius: 0 12px 12px 0;
          font-size: 13px; color: var(--ink-2);
          line-height: 1.6;
        }
        .cw-tip strong { color: var(--accent); font-weight: 700; }
      `}</style>

      <section className="cw">
        <div className="container">
          <div className="crumb reveal"><a href="community.html">← Community</a></div>

          <div className="cw-shell reveal">
            <header>
              <h1>새 글 쓰기</h1>
              <span className="stats">{body.length} 자 · 자동 임시저장</span>
            </header>

            <div className="body">
              <div className="cw-cats">
                {cats.map((c) => (
                  <button key={c.name} data-active={cat === c.name ? '1' : '0'} onClick={() => setCat(c.name)}>
                    {c.icon} {c.name}
                  </button>
                ))}
              </div>

              <input
                className="cw-title"
                placeholder="제목을 입력하세요 (50자 이내)"
                maxLength={50}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="cw-toolbar">
                <button title="굵게"><strong>B</strong></button>
                <button title="기울임"><em>I</em></button>
                <button title="밑줄" style={{ textDecoration: 'underline' }}>U</button>
                <button title="목록">≡</button>
                <button title="번호 목록">1.</button>
                <button title="인용">"</button>
                <button title="링크">🔗</button>
                <button title="코드">{'</>'}</button>
              </div>

              <textarea
                className="cw-body"
                placeholder={cat === '익명 고민' ? '편하게 적어주세요. 익명으로 게시됩니다 — 댓글은 검토 후 노출됩니다.' : '커뮤니티에 공유하고 싶은 이야기를 적어주세요.\n\n· 도움이 되는 정보, 질문, 경험 공유 모두 환영해요\n· 욕설/비방/차별 발언은 즉시 삭제됩니다\n· 신원 노출이 우려된다면 익명 옵션을 선택해주세요'}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />

              <div className="cw-attach">
                <button className="cw-chip">📎 파일 첨부</button>
                <button className="cw-chip">📷 사진</button>
                <button className="cw-chip">🔗 링크</button>
                <button className="cw-chip">#태그</button>
              </div>

              <div className="cw-tip">
                <strong>💡 KSAN 커뮤니티 가이드라인:</strong> 서로 존중하는 대화를 부탁드립니다. 학교명, 실명 등 개인정보 노출에 주의하시고, 도움이 되는 정보는 적극 공유해주세요. 신고 누적 3회 시 자동 비공개 처리됩니다.
              </div>
            </div>

            <div className="cw-foot">
              <div className="left">
                <label className="cw-anon">
                  <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} />
                  익명으로 게시 ({cat === '익명 고민' ? '권장' : '선택'})
                </label>
              </div>
              <div className="right">
                <button className="btn btn--ghost">임시저장</button>
                <button className="btn btn--primary" disabled={!title || !body}>게시하기 →</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   COMMUNITY THREAD (article + comments)
   ============================================================ */
function CommunityThread() {
  const [reply, setReply] = React.useState('');
  const [liked, setLiked] = React.useState(false);
  const comments = [
    { author: 'Hyeonu P.', school: 'TU Delft', when: '1시간 전', content: '저도 1년 차에 똑같이 느꼈어요. 결론은 — 시간 들이면 됩니다. 처음 두 학기는 진짜 죽을 맛인데 3학기부터 갑자기 보이기 시작해요.', likes: 24, isReply: false },
    { author: 'Minji K.', school: 'UvA · 작성자 답변', when: '54분 전', content: '@Hyeonu P. 위로가 됩니다 ㅠㅠ 혹시 2학기 때 어떤 식으로 공부 패턴 잡으셨는지 여쭤봐도 될까요?', likes: 8, isReply: true },
    { author: '익명', when: '2시간 전', content: 'KSAN 학업 스터디 그룹 추천드려요. 매주 일요일 화상 모임 있는데 멤버 페이지에서 신청 가능합니다. 저는 거기서 만난 선배한테 거의 1:1 과외 수준으로 도움받고 있어요.', likes: 17, isReply: false },
    { author: 'Sunghyun L.', school: 'TU Delft Aerospace · 알럼나이', when: '4시간 전', content: 'Calculus → Linear Algebra → Differential Equations 순서로 책 한 권씩 끝까지 풀어보세요. Stewart, Strang, Boyce 책 추천합니다. 강의 듣는 것보다 손으로 직접 푸는 게 핵심이에요.', likes: 42, isReply: false },
  ];

  return (
    <>
      <style>{`
        .ct { padding: 110px 0 80px; background: var(--bg-0); }
        .ct .crumb { font-size: 12.5px; color: var(--ink-3); margin-bottom: 20px; }
        .ct .crumb a:hover { color: var(--accent); }

        .ct-grid {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 40px;
          align-items: start;
          max-width: 1100px;
          margin: 0 auto;
        }

        .ct-article {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 40px;
        }
        .ct-article .cat-row {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 20px;
        }
        .ct-article .cat-pill {
          padding: 5px 11px;
          background: rgba(255,106,42,0.10);
          color: var(--accent);
          border-radius: 999px;
          font-size: 12px; font-weight: 700;
        }
        .ct-article .hot {
          padding: 5px 11px;
          background: linear-gradient(135deg, #FF4444, #FF6A2A);
          color: #fff;
          border-radius: 999px;
          font-size: 11px; font-weight: 700;
        }
        .ct-article h1 {
          margin: 0 0 20px;
          font-size: clamp(24px, 2.6vw, 32px);
          font-weight: 800; letter-spacing: -0.025em;
          line-height: 1.2;
          color: var(--ink);
        }
        .ct-article .author-row {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          margin-bottom: 32px;
        }
        .ct-article .author-row .av {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: grid; place-items: center;
          color: #fff; font-weight: 700; font-size: 14px;
          flex-shrink: 0;
        }
        .ct-article .author-row .body { flex: 1; }
        .ct-article .author-row .body .name {
          font-size: 13.5px; font-weight: 700; color: var(--ink);
        }
        .ct-article .author-row .body .meta {
          font-size: 12px; color: var(--ink-3);
        }
        .ct-article .author-row .views {
          font-size: 12px; color: var(--ink-3);
        }
        .ct-article .article-body { font-size: 15.5px; line-height: 1.85; color: var(--ink-2); }
        .ct-article .article-body p { margin: 0 0 18px; }
        .ct-article .article-body strong { color: var(--ink); font-weight: 700; }
        .ct-article .article-body em { color: var(--accent); font-style: normal; font-weight: 600; }
        .ct-article .reactions {
          display: flex; align-items: center; gap: 12px;
          margin-top: 36px;
          padding-top: 24px;
          border-top: 1px solid var(--line);
        }
        .ct-article .reactions button {
          padding: 9px 16px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 999px;
          font-family: inherit;
          font-size: 13px; font-weight: 600;
          color: var(--ink-2);
          cursor: pointer; transition: all 0.18s;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .ct-article .reactions button:hover { color: var(--accent); border-color: var(--accent); }
        .ct-article .reactions button[data-on="1"] {
          background: rgba(255,106,42,0.10);
          border-color: var(--accent);
          color: var(--accent);
        }
        .ct-article .tags {
          display: flex; gap: 6px; flex-wrap: wrap;
          margin-top: 24px;
        }
        .ct-article .tags span {
          padding: 4px 10px;
          background: var(--bg-cream);
          border-radius: 999px;
          font-size: 11.5px; color: var(--ink-dark-2);
        }

        .ct-comments {
          margin-top: 32px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 32px 40px;
        }
        .ct-comments h2 {
          margin: 0 0 24px;
          font-size: 16px; font-weight: 800;
          letter-spacing: -0.015em;
          color: var(--ink);
        }
        .ct-comment {
          display: flex; gap: 14px;
          padding: 18px 0;
          border-top: 1px solid var(--line);
        }
        .ct-comment.is-reply {
          margin-left: 36px;
          padding-left: 18px;
          border-left: 2px solid var(--line);
          border-top: 0;
          padding-top: 0;
          padding-bottom: 0;
          margin-top: 6px;
          margin-bottom: 14px;
        }
        .ct-comment .av {
          width: 32px; height: 32px;
          border-radius: 50%;
          flex-shrink: 0;
          display: grid; place-items: center;
          color: #fff; font-weight: 700; font-size: 12px;
        }
        .ct-comment .body { flex: 1; }
        .ct-comment .meta {
          display: flex; gap: 10px; align-items: baseline;
          margin-bottom: 6px;
          font-size: 12.5px;
        }
        .ct-comment .meta .name { font-weight: 700; color: var(--ink); }
        .ct-comment .meta .school { color: var(--accent); font-size: 11.5px; font-weight: 600; }
        .ct-comment .meta .when { color: var(--ink-3); }
        .ct-comment .content {
          font-size: 14px; line-height: 1.7;
          color: var(--ink-2);
        }
        .ct-comment .actions {
          margin-top: 8px;
          display: flex; gap: 14px;
          font-size: 12px;
          color: var(--ink-3);
        }
        .ct-comment .actions button {
          background: 0; border: 0; padding: 0;
          font: inherit; color: inherit;
          cursor: pointer;
        }
        .ct-comment .actions button:hover { color: var(--accent); }

        .ct-reply-box {
          padding: 18px 0;
          border-top: 1px solid var(--line);
          margin-top: 12px;
          display: flex; gap: 12px;
          align-items: flex-start;
        }
        .ct-reply-box .av {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), #FFB587);
          color: #fff; display: grid; place-items: center;
          font-size: 12px; font-weight: 700;
          flex-shrink: 0;
        }
        .ct-reply-box .input {
          flex: 1;
          display: flex; flex-direction: column; gap: 10px;
        }
        .ct-reply-box textarea {
          width: 100%; min-height: 80px;
          padding: 12px 14px;
          background: var(--bg-0);
          border: 1px solid var(--line);
          border-radius: 12px;
          font-family: inherit; font-size: 14px;
          color: var(--ink);
          resize: vertical;
        }
        .ct-reply-box textarea:focus {
          outline: none; border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(255,106,42,0.15);
        }
        .ct-reply-box .actions {
          display: flex; justify-content: space-between; align-items: center;
        }
        .ct-reply-box .actions .anon {
          font-size: 12.5px; color: var(--ink-3);
          display: inline-flex; gap: 6px; align-items: center; cursor: pointer;
        }

        .ct-side {
          position: sticky; top: 100px;
          display: flex; flex-direction: column; gap: 18px;
        }
        .ct-side h3 {
          font-size: 12.5px; font-weight: 700;
          color: var(--ink-3); letter-spacing: 0.06em;
          margin: 0 0 12px;
        }
        .ct-side .author-card, .ct-side .related-card {
          padding: 18px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
        }
        .ct-side .author-card .name {
          font-size: 15px; font-weight: 700; color: var(--ink);
        }
        .ct-side .author-card .meta { font-size: 12px; color: var(--ink-3); margin-top: 3px; }
        .ct-side .author-card .stats {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 8px; margin: 14px 0;
          padding: 12px 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .ct-side .author-card .stats div { text-align: center; }
        .ct-side .author-card .stats .num { font-size: 16px; font-weight: 800; color: var(--ink); }
        .ct-side .author-card .stats .lbl { font-size: 10.5px; color: var(--ink-3); margin-top: 1px; letter-spacing: 0.04em; }

        .ct-side .related-item {
          display: block;
          padding: 8px 0;
          font-size: 13px;
          color: var(--ink-2);
          border-top: 1px solid var(--line);
          line-height: 1.5;
        }
        .ct-side .related-item:first-child { border-top: 0; }
        .ct-side .related-item:hover { color: var(--accent); }
        .ct-side .related-item .meta { font-size: 11px; color: var(--ink-3); margin-top: 2px; }

        @media (max-width: 980px) {
          .ct-grid { grid-template-columns: 1fr; }
          .ct-side { position: static; }
        }
      `}</style>

      <section className="ct">
        <div className="container">
          <div className="crumb reveal"><a href="community.html">← Community</a></div>

          <div className="ct-grid">
            <main>
              <article className="ct-article reveal">
                <div className="cat-row">
                  <span className="cat-pill">🎓 학업 Q&A</span>
                  <span className="hot">🔥 HOT</span>
                </div>
                <h1>TU Delft Aerospace 1학년 — 수학 따라가기 너무 힘든데, 선배님들 어떻게 하셨나요?</h1>
                <div className="author-row">
                  <div className="av">M</div>
                  <div className="body">
                    <div className="name">Minji K.</div>
                    <div className="meta">UvA · 경영학 · 가입 1년차 · 5시간 전</div>
                  </div>
                  <span className="views">조회 412</span>
                </div>

                <div className="article-body">
                  <p>
                    안녕하세요, TU Delft Aerospace 신입생입니다. 한국에서 자연계 잘 했다고 자신 있게 왔는데... <strong>완전히 무너지는 중입니다.</strong>
                  </p>
                  <p>
                    Calculus 1, Linear Algebra, Mechanics 동시에 듣는데 매주 양이 미친 것 같아요. 강의는 영어로 빠르게 진행되고, 교재는 두꺼운데 페이스가 한국이랑 너무 달라요. 옆에 있는 더치/유럽 친구들은 다 따라가는 것 같은데 저만 헤매는 느낌이에요.
                  </p>
                  <p>
                    <em>특히 어려운 부분:</em>
                  </p>
                  <ul>
                    <li>강의 속도 — 한 시간에 챕터 하나 끝나는 페이스</li>
                    <li>증명 위주 시험 — 한국식 문제 풀이로는 답이 안 나옴</li>
                    <li>Group assignment 때 의견 못 따라가서 묻어가는 느낌</li>
                  </ul>
                  <p>
                    혹시 비슷한 경험 있으시거나, 적응하신 선배님 계시면 조언 부탁드립니다. <strong>특히 Group work에서 살아남는 법, 시험 준비 어떻게 하셨는지 궁금해요.</strong> 한 학기 반 만에 이미 너무 지친 상태라 약간 패닉입니다 ㅠㅠ
                  </p>
                  <p>
                    KSAN 스터디 그룹은 이미 신청해뒀습니다. 다음 주부터 시작이라네요.
                  </p>
                </div>

                <div className="reactions">
                  <button data-on={liked ? '1' : '0'} onClick={() => setLiked(!liked)}>♥ {liked ? 32 : 31}</button>
                  <button>💬 12 댓글</button>
                  <button>🔖 저장</button>
                  <button>↗ 공유</button>
                  <button style={{ marginLeft: 'auto', color: 'var(--ink-3)' }}>⋯</button>
                </div>

                <div className="tags">
                  <span>#TUDelft</span>
                  <span>#Aerospace</span>
                  <span>#1학년</span>
                  <span>#수학</span>
                  <span>#스터디</span>
                </div>
              </article>

              <section className="ct-comments reveal" data-delay="1">
                <h2>댓글 12개</h2>

                <div className="ct-reply-box">
                  <div className="av">민</div>
                  <div className="input">
                    <textarea
                      placeholder="댓글을 입력하세요. 따뜻한 한마디가 누군가에겐 큰 힘이 됩니다."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                    />
                    <div className="actions">
                      <label className="anon"><input type="checkbox" /> 익명으로 댓글</label>
                      <button className="btn btn--primary" disabled={!reply.trim()}>댓글 등록</button>
                    </div>
                  </div>
                </div>

                {comments.map((c, i) => (
                  <div key={i} className={`ct-comment ${c.isReply ? 'is-reply' : ''}`}>
                    <div className="av" style={{ background: c.author === '익명' ? 'var(--ink-3)' : ['#1428A0','#0F8A4A','#A50034','#003876','#6366f1'][i % 5] }}>
                      {c.author === '익명' ? '?' : c.author[0]}
                    </div>
                    <div className="body">
                      <div className="meta">
                        <span className="name">{c.author}</span>
                        {c.school && <span className="school">{c.school}</span>}
                        <span className="when">{c.when}</span>
                      </div>
                      <div className="content">{c.content}</div>
                      <div className="actions">
                        <button>♥ {c.likes}</button>
                        <button>↩ 답글</button>
                        <button>🚩 신고</button>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </main>

            <aside className="ct-side">
              <div className="author-card reveal" data-delay="1">
                <h3>작성자</h3>
                <div className="name">Minji K.</div>
                <div className="meta">UvA · 경영학 3학년</div>
                <div className="stats">
                  <div><div className="num">8</div><div className="lbl">글</div></div>
                  <div><div className="num">47</div><div className="lbl">댓글</div></div>
                  <div><div className="num">412</div><div className="lbl">받은 ♥</div></div>
                </div>
                <button className="btn btn--ghost" style={{ width: '100%' }}>프로필 보기</button>
              </div>

              <div className="related-card reveal" data-delay="2">
                <h3>비슷한 글</h3>
                <a className="related-item" href="community-thread.html">Erasmus 신청 GPA 컷오프 — 학과별 솔직한 후기<div className="meta">학업 Q&A · 8 댓글</div></a>
                <a className="related-item" href="community-thread.html">UvA 1학년 Statistics — 영어 강의 따라가기<div className="meta">학업 Q&A · 16 댓글</div></a>
                <a className="related-item" href="community-thread.html">TU Eindhoven CS — 첫 학기 생존기<div className="meta">학업 Q&A · 23 댓글</div></a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   PASS IT ON — NEW ITEM
   ============================================================ */
function PassNew() {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({
    title: '', cat: '', condition: '', loc: '', when: '', desc: '', priceFree: true,
  });
  const cats = ['가구', '가전', '주방용품', '의류', '책', '자전거', '기타'];
  const conds = [
    { v: 'new', t: '새것' },
    { v: 'good', t: '상태 좋음' },
    { v: 'ok', t: '사용감 있음' },
    { v: 'worn', t: '낡았지만 사용 가능' },
  ];

  return (
    <>
      <style>{`
        .pn { padding: 110px 0 80px; background: var(--bg-0); min-height: 100vh; }
        .pn .crumb { font-size: 12.5px; color: var(--ink-3); margin-bottom: 24px; }
        .pn-shell {
          max-width: 720px; margin: 0 auto;
        }
        .pn-progress {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 32px;
        }
        .pn-progress .step {
          flex: 1;
          height: 4px;
          background: var(--line);
          border-radius: 999px;
          overflow: hidden;
        }
        .pn-progress .step span {
          display: block; height: 100%;
          background: var(--accent);
          width: 0%;
          transition: width 0.5s var(--ease-out);
        }
        .pn-progress .step[data-active="1"] span { width: 100%; }
        .pn-progress .lbl {
          font-size: 12px; font-weight: 700;
          color: var(--ink-3); letter-spacing: 0.06em;
          flex-shrink: 0;
        }
        .pn-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 40px;
        }
        .pn-card h1 {
          margin: 0 0 8px;
          font-size: 24px; font-weight: 800;
          letter-spacing: -0.025em;
          color: var(--ink);
        }
        .pn-card .h-sub {
          margin: 0 0 28px;
          font-size: 14px; color: var(--ink-3);
        }

        .upload {
          padding: 36px 24px;
          background: var(--bg-cream);
          border: 2px dashed var(--line-strong);
          border-radius: 16px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 16px;
        }
        .upload:hover { border-color: var(--accent); background: rgba(255,106,42,0.04); }
        .upload .ic { font-size: 36px; margin-bottom: 10px; }
        .upload .ttl { font-size: 14px; font-weight: 700; color: var(--ink-dark); margin-bottom: 4px; }
        .upload .desc { font-size: 12.5px; color: var(--ink-dark-2); }

        .uploaded-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 8px; margin-bottom: 24px;
        }
        .uploaded-grid .ph {
          aspect-ratio: 1;
          border-radius: 10px;
          background: linear-gradient(135deg, #d4a574, #8B5E3C);
          position: relative;
          overflow: hidden;
        }
        .uploaded-grid .ph .x {
          position: absolute; top: 6px; right: 6px;
          width: 22px; height: 22px;
          background: rgba(0,0,0,0.6);
          color: #fff;
          border-radius: 50%;
          display: grid; place-items: center;
          font-size: 12px; font-weight: 700;
          cursor: pointer;
        }
        .uploaded-grid .ph .main {
          position: absolute; bottom: 6px; left: 6px;
          padding: 3px 8px;
          background: var(--accent);
          border-radius: 999px;
          color: #fff;
          font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.04em;
        }

        .field { margin-bottom: 18px; }
        .field label {
          display: block;
          font-size: 12px; font-weight: 700;
          color: var(--ink-2); letter-spacing: 0.04em;
          margin-bottom: 6px;
        }
        .field .hint { font-size: 11.5px; color: var(--ink-3); margin-top: 4px; font-weight: 400; }
        .field input, .field textarea, .field select {
          width: 100%;
          padding: 11px 14px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 10px;
          font-family: inherit; font-size: 14px;
          color: var(--ink);
        }
        .field input:focus, .field textarea:focus, .field select:focus {
          outline: none; border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(255,106,42,0.15);
        }
        .field textarea { resize: vertical; min-height: 90px; }

        .chip-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .chip-row button {
          padding: 8px 14px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 999px;
          font-family: inherit;
          font-size: 13px; font-weight: 500;
          color: var(--ink-2);
          cursor: pointer; transition: all 0.18s;
        }
        .chip-row button[data-active="1"] {
          background: var(--accent); color: #fff; border-color: var(--accent);
        }
        .chip-row button:hover:not([data-active="1"]) { color: var(--ink); border-color: var(--line-strong); }

        .price-row {
          display: flex; gap: 8px;
          padding: 14px;
          background: var(--bg-cream);
          border-radius: 12px;
          margin-bottom: 18px;
        }
        .price-row label {
          flex: 1;
          padding: 12px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 10px;
          text-align: center;
          cursor: pointer; transition: all 0.18s;
          font-size: 13px; font-weight: 600;
          color: var(--ink-2);
        }
        .price-row label[data-on="1"] {
          background: var(--accent); color: #fff;
          border-color: var(--accent);
        }
        .price-row input[type="radio"] { display: none; }

        .pn-foot {
          display: flex; justify-content: space-between;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--line);
        }

        .pn-tip {
          padding: 14px 16px;
          background: rgba(34,197,94,0.06);
          border-left: 3px solid #22c55e;
          border-radius: 0 10px 10px 0;
          font-size: 12.5px; line-height: 1.6;
          color: var(--ink-2);
          margin-top: 16px;
        }
        .pn-tip strong { color: #15803d; font-weight: 700; }
      `}</style>

      <section className="pn">
        <div className="container">
          <div className="crumb reveal"><a href="pass-it-on.html">← Pass It On</a></div>

          <div className="pn-shell">
            <div className="pn-progress reveal">
              <span className="lbl">{step}/3</span>
              <div className="step" data-active={step >= 1 ? '1' : '0'}><span></span></div>
              <div className="step" data-active={step >= 2 ? '1' : '0'}><span></span></div>
              <div className="step" data-active={step >= 3 ? '1' : '0'}><span></span></div>
            </div>

            <div className="pn-card reveal">
              {step === 1 && (
                <>
                  <h1>물건 사진 등록</h1>
                  <p className="h-sub">최소 1장, 최대 8장. 첫 번째 사진이 메인 썸네일이 됩니다.</p>
                  <div className="upload">
                    <div className="ic">📷</div>
                    <div className="ttl">사진을 드래그하거나 클릭해서 업로드</div>
                    <div className="desc">JPG, PNG · 최대 10MB · 1장 이상 필요</div>
                  </div>
                  <div className="uploaded-grid">
                    <div className="ph"><span className="main">메인</span><span className="x">×</span></div>
                    <div className="ph" style={{ background: 'linear-gradient(135deg, #c8a47e, #6e3a1d)' }}><span className="x">×</span></div>
                    <div className="ph" style={{ background: 'linear-gradient(135deg, #b89072, #5a2f10)' }}><span className="x">×</span></div>
                  </div>
                  <div className="pn-tip">
                    <strong>📸 좋은 사진 가이드:</strong> 자연광, 정면 + 다각도, 흠집/오염 부분도 솔직하게. 받는 분이 안심하고 결정할 수 있게요.
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h1>물건 정보</h1>
                  <p className="h-sub">정확하게 적을수록 빨리 새 주인이 나타납니다.</p>

                  <div className="field">
                    <label>제목 *</label>
                    <input placeholder="예: IKEA Malm 책상 + 의자 세트" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} />
                  </div>

                  <div className="field">
                    <label>카테고리 *</label>
                    <div className="chip-row">
                      {cats.map((c) => (
                        <button key={c} data-active={data.cat === c ? '1' : '0'} onClick={() => setData({...data, cat: c})}>{c}</button>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <label>상태 *</label>
                    <div className="chip-row">
                      {conds.map((c) => (
                        <button key={c.v} data-active={data.condition === c.v ? '1' : '0'} onClick={() => setData({...data, condition: c.v})}>{c.t}</button>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <label>설명 *</label>
                    <textarea placeholder="구입 시기, 사용 빈도, 특이사항, 픽업 시 유의점 등을 자유롭게 적어주세요." value={data.desc} onChange={(e) => setData({...data, desc: e.target.value})} />
                    <div className="hint">200자 이상 권장</div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h1>거래 정보</h1>
                  <p className="h-sub">픽업 장소와 시간을 알려주세요.</p>

                  <div className="field">
                    <label>거래 방식 *</label>
                    <div className="price-row">
                      <label data-on={data.priceFree ? '1' : '0'}>
                        <input type="radio" checked={data.priceFree} onChange={() => setData({...data, priceFree: true})} />
                        🤝 무료 나눔
                      </label>
                      <label data-on={!data.priceFree ? '1' : '0'}>
                        <input type="radio" checked={!data.priceFree} onChange={() => setData({...data, priceFree: false})} />
                        💶 소정의 비용
                      </label>
                    </div>
                  </div>

                  {!data.priceFree && (
                    <div className="field">
                      <label>희망 가격 (€)</label>
                      <input type="number" placeholder="예: 25" />
                      <div className="hint">시세보다 저렴하게 책정해주세요. 협의 가능 옵션도 가능합니다.</div>
                    </div>
                  )}

                  <div className="field">
                    <label>픽업 도시 *</label>
                    <select value={data.loc} onChange={(e) => setData({...data, loc: e.target.value})}>
                      <option value="">선택해주세요</option>
                      <option>Amsterdam</option>
                      <option>Rotterdam</option>
                      <option>Den Haag</option>
                      <option>Utrecht</option>
                      <option>Eindhoven</option>
                      <option>Delft</option>
                      <option>Groningen</option>
                      <option>Maastricht</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>픽업 가능 시기 *</label>
                    <input placeholder="예: 5월 20일 이후 평일 저녁, 또는 협의" value={data.when} onChange={(e) => setData({...data, when: e.target.value})} />
                  </div>

                  <div className="pn-tip">
                    <strong>🛡 안전 거래 팁:</strong> 첫 만남은 공공장소(카페, 학교 로비)에서. 큰 물건은 친구와 동행하세요. KSAN은 거래 중재자가 아닌 플랫폼입니다.
                  </div>
                </>
              )}

              <div className="pn-foot">
                <button className="btn btn--ghost" disabled={step === 1} onClick={() => setStep(step - 1)}>이전</button>
                {step < 3 ? (
                  <button className="btn btn--primary" onClick={() => setStep(step + 1)}>다음 →</button>
                ) : (
                  <button className="btn btn--primary">등록 완료 →</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   PASS DETAIL
   ============================================================ */
function PassDetail() {
  const [imgIdx, setImgIdx] = React.useState(0);
  const imgs = [
    'linear-gradient(135deg, #d4a574, #8B5E3C)',
    'linear-gradient(135deg, #c8a47e, #6e3a1d)',
    'linear-gradient(135deg, #b89072, #5a2f10)',
    'linear-gradient(135deg, #a08060, #4a2710)',
  ];
  return (
    <>
      <style>{`
        .pd { padding: 110px 0 80px; background: var(--bg-0); }
        .pd .crumb { font-size: 12.5px; color: var(--ink-3); margin-bottom: 24px; }
        .pd .crumb a:hover { color: var(--accent); }
        .pd-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 48px;
          align-items: start;
          max-width: 1100px;
          margin: 0 auto;
        }

        .pd-gallery .main {
          aspect-ratio: 4/3;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 10px;
          position: relative;
          background: var(--bg-cream);
        }
        .pd-gallery .main .img-fill {
          position: absolute; inset: 0;
        }
        .pd-gallery .main .free-badge {
          position: absolute; top: 16px; left: 16px;
          padding: 7px 14px;
          background: rgba(34,197,94,0.95);
          color: #fff;
          border-radius: 999px;
          font-size: 12.5px; font-weight: 700;
          letter-spacing: 0.04em;
        }
        .pd-gallery .thumbs {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        .pd-gallery .thumbs button {
          aspect-ratio: 1;
          border-radius: 10px;
          border: 2px solid transparent;
          background: var(--bg-cream);
          cursor: pointer;
          padding: 0;
          overflow: hidden;
          position: relative;
          transition: all 0.18s;
        }
        .pd-gallery .thumbs button[data-active="1"] { border-color: var(--accent); }
        .pd-gallery .thumbs button .img-fill { position: absolute; inset: 0; }

        .pd-info .title-row {
          display: flex; gap: 8px; flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .pd-info .chip {
          padding: 5px 11px;
          background: rgba(255,106,42,0.10);
          color: var(--accent);
          border-radius: 999px;
          font-size: 12px; font-weight: 700;
        }
        .pd-info .chip.cond {
          background: rgba(34,197,94,0.10);
          color: #15803d;
        }
        .pd-info h1 {
          margin: 0 0 8px;
          font-size: clamp(26px, 3vw, 36px);
          font-weight: 800; letter-spacing: -0.025em;
          line-height: 1.15;
          color: var(--ink);
        }
        .pd-info .price {
          font-family: var(--font-display);
          font-size: 32px; font-weight: 800;
          color: var(--accent);
          letter-spacing: -0.02em;
          margin-bottom: 24px;
        }
        .pd-info .price small {
          font-family: inherit;
          font-size: 13px; font-weight: 500;
          color: var(--ink-3); margin-left: 8px;
        }
        .pd-info .meta-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--line);
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 24px;
        }
        .pd-info .meta-row {
          padding: 14px 18px;
          background: #fff;
        }
        .pd-info .meta-row .lbl {
          font-size: 11.5px; color: var(--ink-3);
          letter-spacing: 0.04em;
        }
        .pd-info .meta-row .val {
          font-size: 14px; font-weight: 700;
          color: var(--ink);
          margin-top: 3px;
        }

        .pd-info .desc-section { margin-bottom: 28px; }
        .pd-info .desc-section h3 {
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--ink-3);
          margin: 0 0 10px;
        }
        .pd-info .desc-section p {
          margin: 0; font-size: 14.5px; line-height: 1.75;
          color: var(--ink-2);
        }

        .pd-actions {
          display: flex; gap: 8px;
          margin-top: 24px;
        }
        .pd-actions .btn { flex: 1; }
        .pd-actions .icon-btn {
          width: 50px; height: 50px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 12px;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.18s;
        }
        .pd-actions .icon-btn:hover { border-color: var(--accent); color: var(--accent); }
        .pd-actions .icon-btn[data-on="1"] {
          background: rgba(255,106,42,0.10); border-color: var(--accent); color: var(--accent);
        }

        .pd-owner {
          padding: 18px;
          background: var(--bg-cream);
          border-radius: 14px;
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 18px;
        }
        .pd-owner .av {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          display: grid; place-items: center;
          font-weight: 700; font-size: 16px;
          flex-shrink: 0;
        }
        .pd-owner .body { flex: 1; }
        .pd-owner .name { font-size: 14px; font-weight: 700; color: var(--ink-dark); }
        .pd-owner .stats {
          font-size: 12px; color: var(--ink-dark-2);
          margin-top: 3px;
        }

        .pd-safety {
          padding: 16px 18px;
          background: rgba(255,106,42,0.05);
          border-left: 3px solid var(--accent);
          border-radius: 0 10px 10px 0;
          font-size: 13px; line-height: 1.6;
          color: var(--ink-2);
        }
        .pd-safety strong { color: var(--accent); font-weight: 700; }

        @media (max-width: 980px) {
          .pd-grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>

      <section className="pd">
        <div className="container">
          <div className="crumb reveal"><a href="pass-it-on.html">← Pass It On</a></div>

          <div className="pd-grid">
            <div className="pd-gallery reveal">
              <div className="main">
                <div className="img-fill" style={{ background: imgs[imgIdx] }}></div>
                <span className="free-badge">🤝 무료 나눔</span>
              </div>
              <div className="thumbs">
                {imgs.map((img, i) => (
                  <button key={i} data-active={imgIdx === i ? '1' : '0'} onClick={() => setImgIdx(i)}>
                    <div className="img-fill" style={{ background: img }}></div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pd-info reveal" data-delay="1">
              <div className="title-row">
                <span className="chip">가구</span>
                <span className="chip cond">상태 좋음</span>
              </div>
              <h1>IKEA Malm 책상 + 의자 세트</h1>
              <div className="price">무료 <small>· 픽업만 가능</small></div>

              <div className="meta-grid">
                <div className="meta-row">
                  <div className="lbl">픽업 도시</div>
                  <div className="val">📍 Amstelveen</div>
                </div>
                <div className="meta-row">
                  <div className="lbl">픽업 가능 시기</div>
                  <div className="val">5월 20일 (월) 이후</div>
                </div>
                <div className="meta-row">
                  <div className="lbl">사용 기간</div>
                  <div className="val">2년 6개월</div>
                </div>
                <div className="meta-row">
                  <div className="lbl">등록일</div>
                  <div className="val">3일 전 등록</div>
                </div>
              </div>

              <div className="desc-section">
                <h3>상세 설명</h3>
                <p>
                  졸업해서 한국으로 돌아갑니다. 2년 반 동안 잘 쓴 책상이라 미세한 사용감은 있어요. 의자는 IKEA Markus 모델이고 등받이 메시 부분 멀쩡합니다.
                </p>
                <p>
                  큰 물건이라 꼭 차나 큰 자전거 트레일러 가지고 와주세요. 1층까지는 들고 내려다 드릴 수 있어요. 만나면 따뜻하게 인사할 준비됐습니다 :)
                </p>
              </div>

              <div className="desc-section">
                <h3>거래 방식</h3>
                <p>대면 픽업만 가능 · 동행자 환영 · 시간 협의 가능</p>
              </div>

              <div className="pd-owner">
                <div className="av">소</div>
                <div className="body">
                  <div className="name">Sora L. · 졸업생 · UvA</div>
                  <div className="stats">⭐ 4.9 (12개 거래) · KSAN 멤버 2년차</div>
                </div>
                <button className="btn btn--ghost" style={{ padding: '8px 14px', fontSize: 12 }}>프로필</button>
              </div>

              <div className="pd-safety">
                <strong>🛡 안전 가이드:</strong> 첫 만남은 공공장소에서, 큰 물건은 친구와 동행하세요. 분쟁 시 KSAN 운영진(safety@ksan.nl)에 신고해주세요.
              </div>

              <div className="pd-actions">
                <button className="btn btn--primary">💬 문의하기</button>
                <button className="icon-btn" data-on="1">♥</button>
                <button className="icon-btn">↗</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, {
  MyPage, EventDetail, JobDetail,
  CommunityWrite, CommunityThread,
  PassNew, PassDetail,
});
