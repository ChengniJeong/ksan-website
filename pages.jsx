// pages.jsx — sub-page components: Settlement Guide, Business Hub, Community, Pass It On, Events, About

const { useState, useEffect, useRef, useMemo } = React;

/* ============================================================
   PageHero — shared hero for sub-pages (light theme)
   ============================================================ */
function PageHero({ eyebrow, title, sub, kicker }) {
  return (
    <section style={{ paddingTop: 160, paddingBottom: 80, position: 'relative', overflow: 'hidden', background: 'var(--bg-0)' }}>
      <div className="grid-bg" />
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: `radial-gradient(circle, var(--accent-glow), transparent 70%)`,
        filter: 'blur(60px)', left: '-100px', top: '-100px', opacity: 0.5 }} />
      <div className="container" style={{ position: 'relative', maxWidth: 1100 }}>
        {kicker && <div className="reveal" style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 16, letterSpacing: '0.02em' }}>{kicker}</div>}
        <div className="reveal"><div className="eyebrow">{eyebrow}</div></div>
        <h1 className="h-display reveal" data-delay="1" style={{ fontSize: 'clamp(48px, 6.4vw, 92px)' }}>
          {title}
        </h1>
        {sub && <p className="lead reveal" data-delay="2" style={{ marginTop: 28, fontSize: 19, maxWidth: 640 }}>{sub}</p>}
      </div>
    </section>
  );
}

/* ============================================================
   SETTLEMENT GUIDE — category landing + article view
   ============================================================ */
const SETTLEMENT_DATA = {
  '행정': {
    icon: '🏛️',
    color: '#FF6A2A',
    headline: '도착 후 첫 2주 안에 끝내야 하는 행정 절차',
    desc: 'BSN, DigiD, IND 거주허가증 — 모든 행정의 출발점.',
    items: [
      {
        slug: 'bsn',
        title: 'BSN 신청부터 수령까지 A to Z',
        excerpt: 'BSN(Burgerservicenummer)은 네덜란드의 주민등록번호입니다. 은행 개설, 취직, 보험 가입, 병원 진료 등 거의 모든 행정 절차에 필요해서 입국 후 가장 먼저 처리해야 할 일입니다.',
        views: 12345, updated: '2026.03.15', author: 'KSAN 기획총괄팀',
        helpFor: '네덜란드에 막 도착해서 BSN을 받아야 하는데 절차가 복잡해 보이는 분',
        toc: [
          { id: 'what', label: 'BSN이 무엇인가요?' },
          { id: 'process', label: '신청 절차', children: [
            { id: 'gemeente', label: 'Gemeente 예약' },
            { id: 'docs', label: '필요 서류' },
            { id: 'visit', label: '방문 등록' },
            { id: 'receive', label: '수령' },
          ]},
          { id: 'faq', label: '자주 묻는 질문' },
        ],
        related: ['은행 계좌 개설', '건강보험 가입', '비자 연장 절차'],
        sections: [
          { id: 'what', heading: 'BSN이 무엇인가요?', body: [
            'BSN은 Burgerservicenummer의 약자로, 네덜란드 정부가 모든 거주자에게 부여하는 고유 번호입니다. 한국의 주민등록번호와 비슷한 개념이지만, 숫자 9자리로 구성됩니다.',
            { type: 'subhead', text: 'BSN이 필요한 경우' },
            { type: 'list', items: ['은행 계좌 개설 (ING, ABN AMRO 등)', '취직 또는 인턴십 시작', '의료보험 가입', '병원/약국 이용', '대학 등록 및 학생 카드 발급', '핸드폰 통신사 계약'] },
            { type: 'callout', tone: 'orange', text: '입국 후 5일 이내에 거주지 시청(Gemeente)에 등록해야 BSN이 발급됩니다. 5일이 짧게 느껴지지만, Amsterdam 같은 대도시는 예약이 1-2주 밀리니 한국에서 미리 예약해두세요.' },
          ]},
          { id: 'process', heading: '신청 절차', body: [
            '신청 절차는 크게 4단계로 나뉩니다. 도시마다 세부 사항이 조금씩 다르지만 전체 흐름은 동일합니다.',
          ]},
          { id: 'gemeente', heading: 'Gemeente 예약', sub: true, body: [
            '거주지 도시의 Gemeente(시청) 웹사이트에서 "registreren" 또는 "first registration" 예약을 잡습니다.',
            { type: 'list', items: ['Amsterdam: amsterdam.nl/en/civil-affairs', 'Rotterdam: rotterdam.nl/loket/inschrijven', 'Den Haag: denhaag.nl/en/registering-with-the-municipality', 'Utrecht: utrecht.nl/wonen/inschrijven-bij-de-gemeente'] },
            { type: 'callout', tone: 'gray', text: '학교가 정해준 기숙사에 살게 된다면, 학교 측에서 group registration을 잡아주는 경우가 많습니다. 입학 전 안내메일을 꼼꼼히 확인하세요.' },
          ]},
          { id: 'docs', heading: '필요 서류', sub: true, body: [
            '예약 당일 다음 서류를 모두 지참해야 합니다. 한 가지라도 빠지면 재예약을 해야 합니다.',
            { type: 'numbered', items: [
              '여권 (원본)',
              '거주허가증(VVR) 또는 MVV 비자 스티커',
              '임대 계약서 (서명된 원본)',
              '집주인 동의서 (Verhuurderverklaring) — 룸쉐어/서브렛인 경우 필수',
              '출생증명서 (영문 또는 네덜란드어 공증, 발급일 6개월 이내)',
              '결혼/이혼증명서 — 해당자만',
            ] },
          ]},
          { id: 'visit', heading: '방문 등록', sub: true, body: [
            '예약 시간 10분 전까지 도착하세요. 늦으면 자동 취소되는 도시도 있습니다. 방문 자체는 15-30분이면 끝납니다. 직원이 서류를 확인하고, 시스템에 입력합니다.',
          ]},
          { id: 'receive', heading: 'BSN 수령', sub: true, body: [
            '신청이 완료되면 5영업일 이내에 우편으로 BSN이 적힌 편지가 도착합니다. 도시에 따라 그 자리에서 즉시 발급되기도 합니다.',
            { type: 'callout', tone: 'orange', text: 'BSN을 받으면 즉시 사진을 찍어서 스마트폰에 저장하세요. 은행 가입, 의료보험 등 곳곳에서 입력해야 합니다.' },
          ]},
          { id: 'faq', heading: '자주 묻는 질문', body: [
            { type: 'qa', q: 'BSN이 안 나와요. 우편이 늦는 건가요?', a: '10영업일이 지나도 안 오면 Gemeente에 직접 전화하세요. 주소를 잘못 입력했거나, 서류 누락으로 재심사 중일 수 있습니다.' },
            { type: 'qa', q: '학교 기숙사 주소로 등록해도 되나요?', a: '대부분 가능하지만, 단기 기숙사(3개월 이하)는 등록이 거부될 수 있습니다. 학교 international office에 문의하세요.' },
            { type: 'qa', q: 'BSN 없이 은행 계정 만들 수 있나요?', a: 'bunq, Revolut 같은 디지털 은행은 BSN 없이 임시 계정을 만들 수 있습니다. ING, ABN AMRO 같은 정식 은행은 반드시 BSN이 있어야 합니다.' },
          ]},
        ],
      },
      {
        slug: 'digid',
        title: 'DigiD 신청 가이드 — 모든 온라인 행정의 열쇠',
        excerpt: '정부, 세금, 의료보험, 학자금 신청 — 네덜란드 거의 모든 디지털 행정에는 DigiD가 필요합니다.',
        views: 8920, updated: '2026.02.20', author: 'KSAN 기획총괄팀',
      },
      {
        slug: 'ind',
        title: 'IND 거주허가증 픽업 & 갱신 절차',
        excerpt: 'MVV 비자로 입국한 학생이 도착 2주 내에 반드시 처리해야 하는 IND 픽업과, 매년 돌아오는 갱신 일정을 한 번에 정리했습니다.',
        views: 7124, updated: '2026.03.01', author: 'KSAN 기획총괄팀',
      },
      {
        slug: 'inschrijven',
        title: '시청 등록(Inschrijven) — 모든 것의 출발점',
        excerpt: 'BSN보다 먼저 시청 등록이 필요합니다. 도시별 예약 방법, 필수 서류, 그리고 자주 거절되는 이유를 정리했습니다.',
        views: 5678, updated: '2026.03.10', author: 'KSAN 기획총괄팀',
      },
    ],
  },
  '금융': {
    icon: '💳', color: '#FF8A5A',
    headline: '한국 카드만으로는 6개월을 버틸 수 없습니다',
    desc: 'ABN AMRO, ING 가입부터 의료보험까지.',
    items: [
      { slug: 'abn-amro', title: 'ABN AMRO 학생 계좌 개설하기', excerpt: 'KSAN 멤버 한정 우대 — 카드 발급비 무료. BSN + 거주증명 + 학생증으로 30분 면담 후 5일 내 카드 수령.', views: 6240, updated: '2026.03.05', author: 'Business Hub' },
      { slug: 'ing', title: 'ING Orange — 영어 지원이 가장 친절', excerpt: '앱 UX가 가장 우수한 ING. 비대면 신원 확인으로 2-3일 내 활성화 가능합니다.', views: 4810, updated: '2026.02.18', author: 'Business Hub' },
      { slug: 'insurance', title: '의료보험 의무 가입 — 월 €130~150', excerpt: 'EU 학생은 EHIC, 그 외는 BSN 발급 후 14일 내 의무 가입. Aon Student Insurance가 한인 학생 사이에서 가장 추천됩니다.', views: 5320, updated: '2026.03.12', author: 'KSAN 기획총괄팀' },
      { slug: 'tikkie', title: 'Tikkie / iDEAL — 더치 송금 문화', excerpt: '모르면 친구가 안 생기는 Tikkie. 전화번호로 송금 요청, QR 결제 어디서나 사용.', views: 3990, updated: '2026.01.30', author: 'KSAN 기획총괄팀' },
    ],
  },
  '주거': {
    icon: '🏠', color: '#E85A1F',
    headline: '입학 6개월 전부터 시작해야 하는 집 구하기',
    desc: '학교 기숙사부터 사기 매물 피하기까지.',
    items: [
      { slug: 'duwo-ssh', title: '학교 기숙사 (DUWO, SSH)', excerpt: '입학 합격 통보 직후 등록해야 하는 학교 기숙사. 대기명단 1년 이상도 흔합니다.', views: 9120, updated: '2026.03.20', author: 'KSAN 기획총괄팀' },
      { slug: 'kamernet', title: 'Kamernet / Pararius — 플랫폼 양대산맥', excerpt: '멤버십 €30/월. 프로필 + 자기소개 영상 필수. 주 50+ 메시지를 보내야 답이 옵니다.', views: 7890, updated: '2026.03.18', author: 'KSAN 기획총괄팀' },
      { slug: 'anti-kraak', title: 'Anti-kraak (Camelot) — 임시 거주', excerpt: '월 €350-600의 이례적 가격. 단점은 1달 통보로 나가야 할 수 있다는 것.', views: 4120, updated: '2026.02.10', author: 'KSAN 기획총괄팀' },
      { slug: 'huurtoeslag', title: 'Huurtoeslag — 주택 보조금', excerpt: '소득 낮은 학생 월 €200-400 환급. BSN + 임대계약서로 belastingdienst.nl에서 신청.', views: 3580, updated: '2026.02.25', author: 'KSAN 기획총괄팀' },
    ],
  },
  '교통': {
    icon: '🚆', color: '#FF6A2A',
    headline: '자전거 없이는 네덜란드 학생이 아닙니다',
    desc: 'OV-chipkaart, 무료 대중교통, 자전거 구입까지.',
    items: [
      { slug: 'ov-chipkaart', title: 'OV-chipkaart 발급과 활용', excerpt: '버스/지하철/기차 통합 카드. 익명 €7.50, Personal 카드는 학생 할인 적용.', views: 6750, updated: '2026.03.08', author: 'KSAN 기획총괄팀' },
      { slug: 'studentenreisproduct', title: 'EU 학생 무료 대중교통', excerpt: 'Studentenreisproduct — 평일 또는 주말 선택. 연 €1,200+ 절약 가능.', views: 8210, updated: '2026.03.14', author: 'KSAN 기획총괄팀' },
      { slug: 'bike-buy', title: '자전거 구입 — €100-300 중고', excerpt: 'Marktplaats 또는 KSAN Pass It On. 도난 대비 두 자물쇠 필수.', views: 5430, updated: '2026.02.28', author: 'KSAN 기획총괄팀' },
      { slug: 'ns-discount', title: 'NS 기차 할인 카드', excerpt: 'Dal Voordeel 카드 €5/월, 비피크 40% 할인. 주말여행 필수템.', views: 3290, updated: '2026.02.05', author: 'KSAN 기획총괄팀' },
    ],
  },
  '쇼핑': {
    icon: '🛒', color: '#FF8A5A',
    headline: '한국 식재료, 생각보다 가까이 있습니다',
    desc: 'AH 절약 팁부터 한인 마켓 위치까지.',
    items: [
      { slug: 'ah', title: 'Albert Heijn 100% 활용법', excerpt: '국민 슈퍼 AH. Bonus 카드로 20-30% 절약, 주간 할인 미리 확인.', views: 7100, updated: '2026.03.16', author: 'KSAN 기획총괄팀' },
      { slug: 'korean-mart', title: '신라마켓 / 한아름 — 한국 식재료', excerpt: 'Amsterdam Zuidoost 신라마켓, Rotterdam 한아름. KSAN 멤버 5% 할인 (신라).', views: 9450, updated: '2026.03.22', author: 'KSAN 기획총괄팀' },
      { slug: 'asian-mart', title: 'Toko Soei, Wah Nam Hong — 아시안 마트', excerpt: '주요 도시 차이나타운 인근. 쌀 20kg €25-30, 냉동 만두 다양.', views: 4380, updated: '2026.02.20', author: 'KSAN 기획총괄팀' },
      { slug: 'group-buy', title: 'KSAN 공동구매 가이드', excerpt: '월 €40-80 절약. 매월 1일 주문 오픈, 도시별 픽업 포인트 운영.', views: 6890, updated: '2026.03.25', author: 'KSAN 기획총괄팀' },
    ],
  },
  '비상연락': {
    icon: '🚨', color: '#E85A1F',
    headline: '저장해두면 언젠가 반드시 필요한 번호',
    desc: '응급 · 영사관 · 의료 · 정신건강.',
    items: [
      { slug: '112', title: '응급 / 경찰 — 112', excerpt: '응급 112, 비응급 0900-8844. 영어 가능, 위치 자동 추적, 문자 신고 가능 (112NL 앱).', views: 4120, updated: '2026.01.15', author: 'KSAN 기획총괄팀' },
      { slug: 'embassy', title: '주네덜란드 한국 대사관', excerpt: '여권 분실 · 사건사고 24시간 영사조력. +31-70-358-6076. Den Haag 위치.', views: 3890, updated: '2026.02.01', author: 'KSAN 기획총괄팀' },
      { slug: 'huisarts', title: '의료 — Huisarts(주치의) 등록', excerpt: '주치의 등록 필수. 응급실 직접 가면 €150+. 처방약은 huisarts 통해서만 가능.', views: 5670, updated: '2026.03.04', author: 'KSAN 기획총괄팀' },
      { slug: 'crisis', title: 'KSAN Crisis Line — 한국어 정신건강', excerpt: 'Alumni 자원봉사. 멤버 대시보드에서 익명 1-on-1 화상 상담 예약.', views: 2410, updated: '2026.03.20', author: 'KSAN Community' },
    ],
  },
};

function SettlementGuide() {
  const tabs = Object.keys(SETTLEMENT_DATA);
  const [active, setActive] = useState(tabs[0]);
  const [articleSlug, setArticleSlug] = useState(null);
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // Read URL hash like #행정 or #행정/bsn
  useEffect(() => {
    const parse = () => {
      const raw = decodeURIComponent(location.hash.replace('#', ''));
      if (!raw) return;
      const [cat, slug] = raw.split('/');
      if (cat && tabs.includes(cat)) setActive(cat);
      if (slug) setArticleSlug(slug); else setArticleSlug(null);
    };
    parse();
    window.addEventListener('hashchange', parse);
    return () => window.removeEventListener('hashchange', parse);
  }, []);

  useEffect(() => {
    const el = tabRefs.current[active];
    if (el) {
      const r = el.getBoundingClientRect();
      const parent = el.parentElement.getBoundingClientRect();
      setIndicator({ left: r.left - parent.left, width: r.width });
    }
  }, [active]);

  const data = SETTLEMENT_DATA[active];
  const article = articleSlug ? data.items.find((i) => i.slug === articleSlug) : null;

  // ARTICLE VIEW
  if (article) {
    return (
      <SettlementArticle
        category={active}
        article={article}
        onBack={() => { setArticleSlug(null); history.replaceState(null, '', `#${active}`); }}
      />
    );
  }

  return (
    <>
      <PageHero
        eyebrow="SETTLEMENT GUIDE"
        title={<><span className="split-line"><span>처음 오신 분을 위한</span></span><span className="split-line" data-delay="1"><span><span className="accent">정착 가이드</span></span></span></>}
        sub="BSN 발급부터 자전거 구매까지, 6가지 카테고리로 정리한 실전 매뉴얼."
      />

      <section style={{ padding: '40px 0 120px', background: 'var(--bg-0)' }}>
        <style>{`
          .guide-tabs {
            position: relative;
            display: flex; gap: 4px;
            background: #fff;
            border: 1px solid var(--line);
            border-radius: 16px;
            padding: 6px;
            margin-bottom: 56px;
            overflow-x: auto;
            scrollbar-width: none;
            box-shadow: 0 6px 20px rgba(0,0,0,0.04);
          }
          .guide-tabs::-webkit-scrollbar { display: none; }
          .guide-tab {
            position: relative; z-index: 1;
            padding: 14px 22px;
            background: transparent;
            border: 0;
            color: var(--ink-2);
            font-family: inherit;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            border-radius: 10px;
            white-space: nowrap;
            display: inline-flex; align-items: center; gap: 8px;
            transition: color 0.25s;
          }
          .guide-tab[data-active="1"] { color: #fff; }
          .guide-indicator {
            position: absolute;
            top: 6px; bottom: 6px;
            background: var(--accent);
            border-radius: 10px;
            transition: left 0.4s var(--ease-spring), width 0.4s var(--ease-spring);
            box-shadow: 0 4px 14px var(--accent-glow);
          }
          .guide-cat-head {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 32px;
            margin-bottom: 56px;
            align-items: end;
          }
          .guide-cat-head h2 {
            font-size: clamp(32px, 3.6vw, 52px);
            font-weight: 800;
            letter-spacing: -0.025em;
            line-height: 1.1;
            margin: 0;
            max-width: 800px;
          }
          .guide-cat-head .desc { color: var(--ink-2); font-size: 17px; margin: 16px 0 0; }
          .guide-cat-icon {
            width: 80px; height: 80px;
            border-radius: 22px;
            background: linear-gradient(135deg, var(--accent), var(--accent-deep));
            display: grid; place-items: center;
            font-size: 38px;
            box-shadow: 0 16px 40px var(--accent-glow);
            flex-shrink: 0;
          }
          .article-list { display: flex; flex-direction: column; gap: 16px; }
          .article-row {
            display: grid;
            grid-template-columns: auto 1fr auto;
            gap: 28px; align-items: center;
            background: #fff;
            border: 1px solid var(--line);
            border-radius: 18px;
            padding: 28px 32px;
            cursor: pointer;
            transition: all 0.3s var(--ease-out);
            text-decoration: none; color: inherit;
          }
          .article-row:hover {
            transform: translateY(-2px);
            border-color: var(--accent);
            box-shadow: 0 14px 30px rgba(0,0,0,0.05);
          }
          .article-num {
            font-family: var(--font-display);
            font-size: 32px; font-weight: 800;
            color: var(--accent);
            letter-spacing: -0.04em;
            line-height: 1; min-width: 48px;
          }
          .article-row h3 {
            font-size: 19px; font-weight: 700;
            margin: 0 0 6px; letter-spacing: -0.01em;
            color: var(--ink);
          }
          .article-row .excerpt {
            font-size: 14px; color: var(--ink-2);
            line-height: 1.55; margin: 0;
            display: -webkit-box; -webkit-line-clamp: 2;
            -webkit-box-orient: vertical; overflow: hidden;
          }
          .article-row .meta {
            margin-top: 10px;
            font-size: 12px; color: var(--ink-3);
            display: flex; gap: 14px; align-items: center;
          }
          .article-row .meta span { display: inline-flex; align-items: center; gap: 4px; }
          .article-arrow {
            width: 44px; height: 44px;
            border-radius: 50%;
            background: rgba(255,106,42,0.08);
            color: var(--accent);
            display: grid; place-items: center;
            font-size: 18px;
            transition: all 0.3s;
          }
          .article-row:hover .article-arrow {
            background: var(--accent); color: #fff; transform: rotate(-45deg);
          }
          @media (max-width: 720px) {
            .guide-cat-head { grid-template-columns: 1fr; }
            .article-row { grid-template-columns: 1fr; gap: 12px; padding: 22px; }
            .article-num { font-size: 24px; }
            .article-arrow { display: none; }
          }
        `}</style>

        <div className="container">
          <div className="guide-tabs reveal">
            <div className="guide-indicator" style={{ left: indicator.left, width: indicator.width }} />
            {tabs.map((tab) => (
              <button
                key={tab}
                ref={(el) => (tabRefs.current[tab] = el)}
                className="guide-tab"
                data-active={active === tab ? '1' : '0'}
                onClick={() => { setActive(tab); history.replaceState(null, '', `#${tab}`); }}
              >
                <span style={{ fontSize: 18 }}>{SETTLEMENT_DATA[tab].icon}</span>
                {tab}
              </button>
            ))}
          </div>

          <div key={active} style={{ animation: 'tabIn 0.5s var(--ease-out)' }}>
            <style>{`@keyframes tabIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>

            <div className="guide-cat-head">
              <div>
                <span className="tag" style={{ marginBottom: 16 }}>{data.icon} {active}</span>
                <h2>{data.headline}</h2>
                <p className="desc">{data.desc}</p>
              </div>
              <div className="guide-cat-icon">{data.icon}</div>
            </div>

            <div className="article-list">
              {data.items.map((item, i) => (
                <a
                  key={item.slug}
                  href={`#${active}/${item.slug}`}
                  className="article-row"
                  onClick={(e) => {
                    e.preventDefault();
                    setArticleSlug(item.slug);
                    history.pushState(null, '', `#${active}/${item.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="article-num">{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p className="excerpt">{item.excerpt}</p>
                    <div className="meta">
                      <span>👁 {item.views.toLocaleString()} views</span>
                      <span>📅 {item.updated}</span>
                      <span>✍ {item.author}</span>
                    </div>
                  </div>
                  <div className="article-arrow">→</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* Article view — based on screenshot 3 */
function SettlementArticle({ category, article, onBack }) {
  const [activeId, setActiveId] = useState(null);
  const data = SETTLEMENT_DATA[category];
  const sections = article.sections || [];
  const toc = article.toc || [];

  // Scroll spy
  useEffect(() => {
    if (!sections.length) return;
    const onScroll = () => {
      const headings = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
      const y = window.scrollY + 200;
      let cur = headings[0]?.id;
      for (const h of headings) {
        if (h.offsetTop <= y) cur = h.id;
      }
      setActiveId(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  if (!sections.length) {
    // Fallback for articles without full body — show coming-soon
    return (
      <section style={{ padding: '160px 0 120px', background: 'var(--bg-0)', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <button className="btn btn--ghost" onClick={onBack} style={{ marginBottom: 32 }}>
            ← {category} 목록으로
          </button>
          <span className="tag">{data.icon} {category}</span>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1, margin: '20px 0 24px' }}>
            {article.title}
          </h1>
          <p className="lead" style={{ fontSize: 18 }}>{article.excerpt}</p>
          <div style={{ marginTop: 64, padding: 40, background: '#fff', border: '1px solid var(--line)', borderRadius: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
            <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700 }}>곧 공개됩니다</h3>
            <p style={{ margin: 0, color: 'var(--ink-2)' }}>이 가이드는 KSAN 기획팀에서 작성 중입니다. 멤버십 가입 시 발행 즉시 알림을 보내드립니다.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '120px 0 120px', background: 'var(--bg-0)' }}>
      <style>{`
        .art-wrap {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 64px;
          max-width: 1100px;
          margin: 0 auto;
          align-items: start;
        }
        .art-breadcrumb {
          font-size: 13.5px; color: var(--ink-3);
          margin-bottom: 18px;
          display: flex; gap: 8px; align-items: center;
        }
        .art-breadcrumb a { color: var(--ink-3); transition: color 0.2s; cursor: pointer; }
        .art-breadcrumb a:hover { color: var(--accent); }
        .art-breadcrumb span.sep { color: var(--ink-3); }

        .art-cat-pill {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px;
          background: rgba(255,106,42,0.1);
          border: 1px solid rgba(255,106,42,0.2);
          border-radius: 999px;
          color: var(--accent);
          font-size: 13px; font-weight: 600;
          margin-bottom: 18px;
        }

        .art-title {
          font-size: clamp(34px, 4.4vw, 52px);
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin: 0 0 24px;
          color: var(--ink);
        }
        .art-meta {
          display: flex; gap: 22px; flex-wrap: wrap;
          padding-bottom: 28px;
          border-bottom: 1px solid var(--line);
          margin-bottom: 36px;
          font-size: 13.5px; color: var(--ink-3);
        }
        .art-meta span { display: inline-flex; align-items: center; gap: 6px; }

        .art-help {
          padding: 18px 22px;
          background: rgba(255,200,160,0.18);
          border-left: 3px solid var(--accent);
          border-radius: 8px;
          margin: 28px 0 32px;
        }
        .art-help .label { font-size: 13.5px; font-weight: 700; color: var(--ink); margin-bottom: 6px; display: flex; gap: 6px; align-items: center; }
        .art-help p { margin: 0; font-size: 14.5px; color: var(--ink-2); line-height: 1.6; }

        .art-body p { font-size: 16px; line-height: 1.75; color: var(--ink); margin: 0 0 16px; }
        .art-body p strong { font-weight: 700; }
        .art-body h2 {
          font-size: 28px; font-weight: 800;
          letter-spacing: -0.02em; line-height: 1.2;
          margin: 56px 0 18px; padding-bottom: 14px;
          border-bottom: 3px solid var(--accent);
          display: inline-block;
          color: var(--ink);
        }
        .art-body h2.sub-section { font-size: 22px; border-bottom: 0; padding-bottom: 0; margin: 36px 0 14px; }
        .art-body h3 { font-size: 17px; font-weight: 700; margin: 28px 0 12px; color: var(--ink); }
        .art-body ul, .art-body ol { padding-left: 0; margin: 0 0 20px; list-style: none; }
        .art-body ul li {
          padding: 6px 0 6px 22px; position: relative;
          font-size: 15.5px; line-height: 1.7; color: var(--ink-2);
        }
        .art-body ul li::before {
          content: ''; position: absolute;
          left: 4px; top: 16px;
          width: 6px; height: 6px;
          border-radius: 50%; background: var(--accent);
        }
        .art-body ol { counter-reset: olc; }
        .art-body ol li {
          counter-increment: olc;
          padding: 8px 0 8px 36px; position: relative;
          font-size: 15.5px; line-height: 1.7; color: var(--ink-2);
        }
        .art-body ol li::before {
          content: counter(olc);
          position: absolute; left: 0; top: 9px;
          width: 24px; height: 24px;
          border-radius: 6px; background: var(--accent);
          color: #fff; font-weight: 700; font-size: 12px;
          display: grid; place-items: center;
        }
        .art-callout {
          padding: 18px 22px;
          background: rgba(255,200,160,0.2);
          border-radius: 12px;
          margin: 24px 0;
          font-size: 14.5px; line-height: 1.6;
          color: var(--ink);
          display: flex; gap: 12px;
        }
        .art-callout::before { content: '💡'; font-size: 20px; flex-shrink: 0; }
        .art-callout[data-tone="gray"] {
          background: var(--bg-1);
        }
        .art-qa {
          padding: 20px 24px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
          margin-bottom: 12px;
        }
        .art-qa .q { font-size: 15.5px; font-weight: 700; color: var(--ink); margin: 0 0 8px; display: flex; gap: 10px; }
        .art-qa .q::before { content: 'Q'; color: var(--accent); }
        .art-qa .a { font-size: 14.5px; color: var(--ink-2); margin: 0; line-height: 1.65; padding-left: 20px; }

        /* Sidebar */
        .art-sidebar {
          position: sticky;
          top: 100px;
          align-self: start;
          display: flex; flex-direction: column; gap: 20px;
        }
        .art-toc-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 24px;
        }
        .art-toc-card h4 {
          margin: 0 0 14px;
          font-size: 14px; font-weight: 700;
          letter-spacing: -0.01em; color: var(--ink);
        }
        .toc-list { list-style: none; padding: 0; margin: 0; }
        .toc-list li a {
          display: block;
          padding: 7px 14px 7px 14px;
          font-size: 13.5px; color: var(--ink-2);
          border-left: 2px solid transparent;
          line-height: 1.5;
          transition: all 0.15s;
          cursor: pointer;
        }
        .toc-list li a:hover { color: var(--ink); }
        .toc-list li a[data-active="1"] {
          color: var(--accent); font-weight: 600;
          border-left-color: var(--accent);
          background: rgba(255,106,42,0.05);
        }
        .toc-list li.sub a { padding-left: 28px; font-size: 13px; color: var(--ink-3); }
        .toc-list li.sub a::before { content: '└ '; color: var(--ink-3); }

        .art-related h4 {
          margin: 0 0 14px; font-size: 14px;
          font-weight: 700; color: var(--ink);
        }
        .art-related a {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 0;
          font-size: 13.5px; color: var(--ink-2);
          transition: color 0.2s; cursor: pointer;
        }
        .art-related a:hover { color: var(--accent); }
        .art-related a::before { content: '→'; color: var(--accent); }

        @media (max-width: 980px) {
          .art-wrap { grid-template-columns: 1fr; gap: 40px; }
          .art-sidebar { position: static; order: -1; }
        }
      `}</style>

      <div className="container">
        <div className="art-wrap">
          <article>
            <div className="art-breadcrumb">
              <a onClick={() => { window.location.href = 'index.html'; }}>홈</a>
              <span className="sep">/</span>
              <a onClick={() => { onBack(); }}>정착 가이드</a>
              <span className="sep">/</span>
              <a onClick={() => { onBack(); }}>{category}</a>
            </div>

            <span className="art-cat-pill">{data.icon} {category} · 비자</span>

            <h1 className="art-title">{article.title}</h1>

            <div className="art-meta">
              <span>👁 {article.views.toLocaleString()} views</span>
              <span>📅 업데이트: {article.updated}</span>
              <span>✍ {article.author}</span>
            </div>

            {article.helpFor && (
              <div className="art-help">
                <div className="label">💡 이 글은 이런 분께 도움이 됩니다</div>
                <p>{article.helpFor}</p>
              </div>
            )}

            <div className="art-body">
              {sections.map((section) => (
                <React.Fragment key={section.id}>
                  <h2 id={section.id} className={section.sub ? 'sub-section' : ''}>
                    {section.heading}
                  </h2>
                  {section.body.map((block, bi) => {
                    if (typeof block === 'string') return <p key={bi}>{block}</p>;
                    if (block.type === 'subhead') return <h3 key={bi}>{block.text}</h3>;
                    if (block.type === 'list') return <ul key={bi}>{block.items.map((it, ii) => <li key={ii}>{it}</li>)}</ul>;
                    if (block.type === 'numbered') return <ol key={bi}>{block.items.map((it, ii) => <li key={ii}>{it}</li>)}</ol>;
                    if (block.type === 'callout') return <div key={bi} className="art-callout" data-tone={block.tone || 'orange'}>{block.text}</div>;
                    if (block.type === 'qa') return (
                      <div key={bi} className="art-qa">
                        <p className="q">{block.q}</p>
                        <p className="a">{block.a}</p>
                      </div>
                    );
                    return null;
                  })}
                </React.Fragment>
              ))}
            </div>

            <div style={{ marginTop: 80, padding: '32px 0', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <button className="btn btn--ghost" onClick={onBack}>← {category} 목록으로</button>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn--ghost">👍 도움됐어요</button>
                <button className="btn btn--ghost">🔗 공유</button>
              </div>
            </div>
          </article>

          <aside className="art-sidebar">
            <div className="art-toc-card">
              <h4>목차</h4>
              <ul className="toc-list">
                {toc.map((t) => (
                  <React.Fragment key={t.id}>
                    <li>
                      <a
                        data-active={activeId === t.id ? '1' : '0'}
                        onClick={() => document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                      >{t.label}</a>
                    </li>
                    {t.children?.map((c) => (
                      <li key={c.id} className="sub">
                        <a
                          data-active={activeId === c.id ? '1' : '0'}
                          onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                        >{c.label}</a>
                      </li>
                    ))}
                  </React.Fragment>
                ))}
              </ul>
            </div>

            {article.related && (
              <div className="art-toc-card art-related">
                <h4>관련 가이드</h4>
                {article.related.map((r) => <a key={r}>{r}</a>)}
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   BUSINESS HUB
   ============================================================ */
function BusinessHub() {
  const [filter, setFilter] = useState('전체');
  const filters = ['전체', 'Verified', '인턴십', '풀타임', '파트타임', '한인 기업'];
  const jobs = [
    { co: 'Samsung Electronics Benelux', logo: 'S', tag: 'Verified', type: '인턴십', role: 'UX Research Intern', loc: 'Amsterdam', salary: '€800/월', when: '2일 전', tone: '#1428A0' },
    { co: 'LG Electronics', logo: 'L', tag: 'Verified', type: '풀타임', role: 'Marketing Coordinator (KR/EN)', loc: 'Eindhoven', salary: '€42-48k', when: '5일 전', tone: '#A50034' },
    { co: 'Korean Air', logo: 'K', tag: 'Verified', type: '파트타임', role: 'Cabin Crew Recruiter', loc: 'Schiphol', salary: '€18/시', when: '1주 전', tone: '#0F2A52' },
    { co: '신라마켓', logo: '신', tag: '한인 기업', type: '파트타임', role: '주말 카운터 직원', loc: 'Amsterdam Zuidoost', salary: '€14/시', when: '3일 전', tone: '#FF6A2A' },
    { co: '네덜란드 한글학교', logo: '한', tag: '한인 기업', type: '파트타임', role: '주말 한국어 보조강사', loc: 'Den Haag', salary: '€20/시', when: '1일 전', tone: '#0F8A4A' },
    { co: 'KOTRA Amsterdam', logo: 'K', tag: 'Verified', type: '인턴십', role: 'Trade Assistant Intern', loc: 'Amsterdam', salary: '€600/월', when: '4일 전', tone: '#003876' },
    { co: 'Booking.com', logo: 'B', tag: 'Verified', type: '풀타임', role: 'Korean Market Specialist', loc: 'Amsterdam', salary: '€55-65k', when: '6일 전', tone: '#003580' },
    { co: 'Asics EU', logo: 'A', tag: 'Verified', type: '인턴십', role: 'Brand Marketing Intern', loc: 'Hoofddorp', salary: '€850/월', when: '1주 전', tone: '#0033A0' },
  ];
  const filtered = filter === '전체' ? jobs : jobs.filter((j) => j.tag === filter || j.type === filter);

  return (
    <>
      <PageHero
        eyebrow="BUSINESS HUB"
        title={<><span className="split-line"><span>검증된 기업과의</span></span><span className="split-line" data-delay="1"><span><span className="accent">커리어 브릿지.</span></span></span></>}
        sub="삼성, LG, Korean Air부터 한인 마켓까지 — KSAN이 직접 검증한 채용 정보만 모았습니다."
      />

      <section className="section" style={{ paddingTop: 40, background: 'var(--bg-0)' }}>
        <style>{`
          .biz-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 64px; }
          .biz-stat { background: #fff; border: 1px solid var(--line); border-radius: 18px; padding: 28px 24px; }
          .biz-stat .num { font-size: 38px; font-weight: 800; letter-spacing: -0.025em; line-height: 1; color: var(--ink); }
          .biz-stat .label { font-size: 13px; color: var(--ink-3); margin-top: 8px; }
          .biz-filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
          .biz-filter {
            padding: 10px 18px;
            background: #fff;
            border: 1px solid var(--line);
            border-radius: 999px;
            color: var(--ink-2);
            font-size: 13.5px; font-weight: 500; font-family: inherit;
            cursor: pointer; transition: all 0.2s;
          }
          .biz-filter:hover { color: var(--ink); border-color: var(--line-strong); }
          .biz-filter[data-active="1"] { background: var(--accent); color: #fff; border-color: var(--accent); }
          .jobs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .job-card {
            background: #fff;
            border: 1px solid var(--line);
            border-radius: 20px;
            padding: 28px;
            transition: all 0.3s var(--ease-out);
            cursor: pointer; position: relative; overflow: hidden;
          }
          .job-card:hover { transform: translateY(-3px); border-color: var(--accent); box-shadow: 0 16px 32px rgba(0,0,0,0.06); }
          .job-head { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
          .job-logo { width: 44px; height: 44px; border-radius: 10px; display: grid; place-items: center;
            color: #fff; font-weight: 800; font-size: 20px; font-family: var(--font-display); }
          .job-co { font-size: 14.5px; font-weight: 600; color: var(--ink); margin: 0; }
          .job-when { font-size: 12px; color: var(--ink-3); }
          .job-role { font-size: 19px; font-weight: 700; letter-spacing: -0.01em; margin: 0 0 16px; color: var(--ink); }
          .job-meta { display: flex; flex-wrap: wrap; gap: 8px; }
          .job-meta span {
            padding: 5px 10px; font-size: 12px;
            background: var(--bg-1); border: 1px solid var(--line);
            border-radius: 6px; color: var(--ink-2);
          }
          .job-meta span[data-tone="verified"] {
            background: rgba(255,106,42,0.12);
            border-color: rgba(255,106,42,0.3);
            color: var(--accent); font-weight: 600;
          }
          @media (max-width: 880px) { .biz-stats { grid-template-columns: repeat(2, 1fr); } .jobs-grid { grid-template-columns: 1fr; } }
        `}</style>

        <div className="container">
          <div className="biz-stats reveal">
            <div className="biz-stat"><div className="num"><AnimatedCounter to={62} /></div><div className="label">현재 활성 공고</div></div>
            <div className="biz-stat"><div className="num"><AnimatedCounter to={10} suffix="+" /></div><div className="label">파트너 기업</div></div>
            <div className="biz-stat"><div className="num"><AnimatedCounter to={340} suffix="+" /></div><div className="label">매칭된 멤버</div></div>
            <div className="biz-stat"><div className="num"><AnimatedCounter to={94} suffix="%" /></div><div className="label">Verified 비율</div></div>
          </div>

          <div className="biz-filters reveal">
            {filters.map((f) => (
              <button key={f} className="biz-filter" data-active={filter === f ? '1' : '0'} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>

          <div className="jobs-grid">
            {filtered.map((j, i) => (
              <a key={j.role} href="job-detail.html" className="job-card reveal" data-delay={(i % 4) + 1} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div className="job-head">
                  <div className="job-logo" style={{ background: j.tone }}>{j.logo}</div>
                  <div style={{ flex: 1 }}>
                    <h4 className="job-co">{j.co}</h4>
                    <span className="job-when">{j.when} · {j.loc}</span>
                  </div>
                </div>
                <h3 className="job-role">{j.role}</h3>
                <div className="job-meta">
                  <span data-tone={j.tag === 'Verified' ? 'verified' : ''}>{j.tag === 'Verified' ? '✓ ' : ''}{j.tag}</span>
                  <span>{j.type}</span>
                  <span>{j.salary}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* For Companies — 채용공고 등록 */}
      <div className="section-divider"><span className="mark"></span></div>
      <section className="section" style={{ background: 'var(--bg-cream)', color: 'var(--ink-dark)' }} id="post-job">
        <style>{`
          .post-job-grid {
            display: grid;
            grid-template-columns: 1fr 1.1fr;
            gap: 64px; align-items: start;
            max-width: 1100px; margin: 0 auto;
          }
          .post-job-grid .lhs h2 {
            font-size: clamp(36px, 4.4vw, 56px);
            font-weight: 800; letter-spacing: -0.03em;
            line-height: 1.05; margin: 16px 0 24px;
            color: var(--ink-dark);
          }
          .post-job-grid .lhs h2 .accent { color: var(--accent); }
          .post-job-grid .lhs p {
            font-size: 16px; line-height: 1.7;
            color: var(--ink-dark-2);
            max-width: 460px;
            margin: 0 0 32px;
          }
          .post-perks { display: flex; flex-direction: column; gap: 14px; }
          .post-perk {
            display: flex; align-items: flex-start; gap: 14px;
            padding: 16px 18px;
            background: #fff;
            border: 1px solid rgba(0,0,0,0.06);
            border-radius: 14px;
          }
          .post-perk .ic {
            width: 36px; height: 36px;
            flex-shrink: 0;
            background: rgba(255,106,42,0.10);
            border-radius: 10px;
            display: grid; place-items: center;
            color: var(--accent); font-size: 18px;
          }
          .post-perk h4 {
            margin: 0 0 4px; font-size: 14.5px;
            font-weight: 700; color: var(--ink-dark);
            letter-spacing: -0.005em;
          }
          .post-perk p { font-size: 13px; color: var(--ink-dark-2); margin: 0; line-height: 1.5; }

          .post-form {
            background: #fff;
            border: 1px solid rgba(0,0,0,0.06);
            border-radius: 24px;
            padding: 36px;
            box-shadow: 0 24px 60px rgba(24,24,28,0.08);
          }
          .post-form .form-eyebrow {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 6px 12px;
            background: rgba(255,106,42,0.08);
            border-radius: 999px;
            font-size: 11.5px; font-weight: 700;
            color: var(--accent);
            letter-spacing: 0.16em;
          }
          .post-form .form-eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
          .post-form h3 {
            margin: 14px 0 6px; font-size: 24px;
            font-weight: 800; letter-spacing: -0.025em;
            color: var(--ink-dark);
          }
          .post-form .desc { margin: 0 0 28px; font-size: 14px; color: var(--ink-dark-2); }
          .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
          .form-row { display: flex; flex-direction: column; gap: 6px; }
          .form-row.full { grid-column: 1 / -1; }
          .form-label {
            font-size: 12px; font-weight: 600;
            color: var(--ink-dark-2);
            letter-spacing: 0.02em;
          }
          .form-input, .form-select, .form-textarea {
            padding: 11px 14px;
            background: #fff;
            border: 1px solid rgba(0,0,0,0.12);
            border-radius: 10px;
            font-size: 14px; font-family: inherit;
            color: var(--ink-dark);
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          .form-input:focus, .form-select:focus, .form-textarea:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 3px rgba(255,106,42,0.15);
          }
          .form-textarea { resize: vertical; min-height: 90px; }
          .form-submit {
            margin-top: 8px;
            padding: 14px 22px;
            background: var(--ink-dark);
            color: #fff;
            border: 0; border-radius: 12px;
            font-size: 14.5px; font-weight: 600;
            font-family: inherit;
            cursor: pointer;
            transition: background 0.2s, transform 0.2s;
            display: inline-flex; align-items: center; justify-content: center; gap: 8px;
            grid-column: 1 / -1;
          }
          .form-submit:hover { background: var(--accent); }
          .form-fineprint {
            grid-column: 1 / -1;
            font-size: 12px;
            color: var(--ink-dark-3);
            line-height: 1.5;
          }
          .form-success {
            padding: 24px;
            background: rgba(34,197,94,0.10);
            border: 1px solid rgba(34,197,94,0.3);
            border-radius: 14px;
            color: #15803d;
            text-align: center;
          }
          @media (max-width: 980px) {
            .post-job-grid { grid-template-columns: 1fr; gap: 40px; }
            .form-grid { grid-template-columns: 1fr; }
          }
        `}</style>
        <div className="container">
          <div className="post-job-grid">
            <div className="lhs reveal">
              <span className="eyebrow">FOR COMPANIES</span>
              <h2>한인 인재 채용,<br/><span className="accent">KSAN과 함께.</span></h2>
              <p>
                네덜란드 6개 주요 대학에 분포된 1,000명+ 한국인 학생들에게 채용 공고를 직접 전달합니다. 검증된 KSAN 멤버십에 한해, 한국어/네덜란드어 이중 언어 인재를 빠르게 매칭해드립니다.
              </p>
              <div className="post-perks">
                <div className="post-perk">
                  <div className="ic">⚡</div>
                  <div>
                    <h4>1,000명+ 검증 멤버에게 직접 전달</h4>
                    <p>가입 인증 학생 한정 — 노출 정확도 100%</p>
                  </div>
                </div>
                <div className="post-perk">
                  <div className="ic">🎯</div>
                  <div>
                    <h4>전공·학교·학년별 타겟팅</h4>
                    <p>UvA, TU Delft, Erasmus 등 학과 단위로 필터링</p>
                  </div>
                </div>
                <div className="post-perk">
                  <div className="ic">✓</div>
                  <div>
                    <h4>KSAN Verified 배지</h4>
                    <p>심사 통과 공고는 별도 배지와 상단 노출</p>
                  </div>
                </div>
                <div className="post-perk">
                  <div className="ic">📊</div>
                  <div>
                    <h4>지원 현황 리포트</h4>
                    <p>지원자 수, 학교/학년별 분포 데이터 제공</p>
                  </div>
                </div>
              </div>
            </div>

            <JobPostForm />
          </div>
        </div>
      </section>
    </>
  );
}

function JobPostForm() {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  if (submitted) {
    return (
      <div className="post-form reveal" data-delay="2">
        <div className="form-success">
          <div style={{ fontSize: 36, marginBottom: 8 }}>✓</div>
          <h3 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 700, color: '#15803d' }}>접수 완료!</h3>
          <p style={{ margin: 0, fontSize: 13.5, color: '#166534' }}>
            영업일 기준 2-3일 내 KSAN Business 팀이 연락드립니다.<br/>
            biz@ksan.nl
          </p>
        </div>
      </div>
    );
  }
  return (
    <form className="post-form reveal" data-delay="2" onSubmit={onSubmit}>
      <span className="form-eyebrow"><span className="dot"></span>POST A JOB · 무료 등록</span>
      <h3>채용공고 등록 신청</h3>
      <p className="desc">아래 양식을 작성해주시면 영업일 기준 2-3일 내 검토 후 연락드립니다.</p>
      <div className="form-grid">
        <div className="form-row">
          <label className="form-label">회사명 *</label>
          <input className="form-input" required placeholder="예: Samsung Electronics Benelux" />
        </div>
        <div className="form-row">
          <label className="form-label">담당자명 *</label>
          <input className="form-input" required placeholder="홍길동" />
        </div>
        <div className="form-row">
          <label className="form-label">담당자 이메일 *</label>
          <input className="form-input" type="email" required placeholder="hr@company.com" />
        </div>
        <div className="form-row">
          <label className="form-label">연락처</label>
          <input className="form-input" placeholder="+31 6 XXXX XXXX" />
        </div>
        <div className="form-row full">
          <label className="form-label">포지션 *</label>
          <input className="form-input" required placeholder="예: UX Research Intern" />
        </div>
        <div className="form-row">
          <label className="form-label">고용 형태 *</label>
          <select className="form-select" required defaultValue="">
            <option value="" disabled>선택해주세요</option>
            <option>인턴십</option>
            <option>파트타임</option>
            <option>풀타임</option>
            <option>프리랜서</option>
          </select>
        </div>
        <div className="form-row">
          <label className="form-label">근무지 *</label>
          <input className="form-input" required placeholder="예: Amsterdam" />
        </div>
        <div className="form-row full">
          <label className="form-label">간단한 직무 설명 *</label>
          <textarea className="form-textarea" required placeholder="필요한 자격 요건, 주요 업무, 처우 등을 간략히 적어주세요." />
        </div>
        <p className="form-fineprint">
          제출 시 KSAN 비즈니스 운영진이 검토 후 정식 공고로 게시됩니다. 검증을 위해 회사 도메인 이메일을 권장합니다.
        </p>
        <button type="submit" className="form-submit">
          채용공고 등록 신청 <span>→</span>
        </button>
      </div>
    </form>
  );
}
function Community() {
  const threads = [
    { cat: '익명 고민', icon: '💭', title: '교환학생 6개월차, 한국 친구가 너무 그립습니다', author: '익명', replies: 23, likes: 47, time: '2시간 전', hot: true },
    { cat: '학업 Q&A', icon: '🎓', title: 'TU Delft Aerospace 1학년 — 수학 따라가기 너무 힘든데 조언', author: '재학생 답변 5', replies: 12, likes: 31, time: '5시간 전' },
    { cat: '진로 고민', icon: '🧭', title: '졸업 후 한국 vs 네덜란드 취업, 알럼나이 분들의 후회/만족은?', author: '익명', replies: 38, likes: 89, time: '1일 전', hot: true },
    { cat: '생활 팁', icon: '💡', title: 'Amsterdam 자전거 도난 5번 당하고 깨달은 것들', author: 'Minji K.', replies: 19, likes: 124, time: '2일 전' },
    { cat: '학업 Q&A', icon: '🎓', title: 'Erasmus 신청 GPA 컷오프 — 학과별 솔직한 후기', author: '익명', replies: 8, likes: 22, time: '3일 전' },
    { cat: '익명 고민', icon: '💭', title: '룸메이트가 자꾸 한국 음식 냄새난다고 합니다', author: '익명', replies: 56, likes: 203, time: '4일 전', hot: true },
  ];

  return (
    <>
      <PageHero
        eyebrow="COMMUNITY"
        title={<><span className="split-line"><span>안전한</span></span><span className="split-line" data-delay="1"><span>정보 공유의 장.</span></span></>}
        sub="익명 고민 상담부터 진로 토론까지. 학교 인증 한인 학생만 들어올 수 있는 닫힌 커뮤니티."
      />

      <section className="section" style={{ paddingTop: 40, background: 'var(--bg-0)' }}>
        <style>{`
          .comm-grid { display: grid; grid-template-columns: 280px 1fr; gap: 32px; }
          .comm-side { display: flex; flex-direction: column; gap: 12px; position: sticky; top: 100px; align-self: start; }
          .comm-side-card { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 20px; }
          .comm-cat-list { display: flex; flex-direction: column; gap: 4px; }
          .comm-cat-list a {
            padding: 10px 12px; border-radius: 8px;
            display: flex; align-items: center; justify-content: space-between;
            font-size: 14px; color: var(--ink-2);
            transition: background 0.2s; cursor: pointer;
          }
          .comm-cat-list a:hover, .comm-cat-list a[data-active="1"] { background: var(--bg-1); color: var(--ink); }
          .comm-cat-list a span:last-child { font-size: 12px; color: var(--ink-3); font-variant-numeric: tabular-nums; }
          .comm-rules li { font-size: 12.5px; color: var(--ink-2); padding: 8px 0; border-top: 1px solid var(--line); display: flex; gap: 8px; line-height: 1.5; }
          .comm-rules li:first-child { border-top: 0; padding-top: 0; }
          .comm-rules li::before { content: '·'; color: var(--accent); flex-shrink: 0; }
          .comm-main { display: flex; flex-direction: column; gap: 12px; }
          .comm-toolbar { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 16px; display: flex; gap: 12px; align-items: center; }
          .comm-toolbar input {
            flex: 1; padding: 10px 14px;
            background: var(--bg-1); border: 1px solid var(--line);
            border-radius: 10px; color: var(--ink);
            font-size: 14px; font-family: inherit; outline: none;
          }
          .comm-toolbar input:focus { border-color: var(--accent); background: #fff; }
          .thread {
            background: #fff; border: 1px solid var(--line); border-radius: 16px;
            padding: 24px 28px;
            display: flex; gap: 20px; align-items: center;
            transition: all 0.3s var(--ease-out); cursor: pointer;
          }
          .thread:hover { transform: translateX(4px); border-color: var(--accent); box-shadow: 0 8px 20px rgba(0,0,0,0.04); }
          .thread-icon { width: 44px; height: 44px; border-radius: 12px; background: var(--bg-1); display: grid; place-items: center; font-size: 20px; flex-shrink: 0; }
          .thread-body { flex: 1; min-width: 0; }
          .thread-cat { font-size: 11px; font-weight: 600; color: var(--accent); letter-spacing: 0.04em; }
          .thread-ttl { font-size: 16px; font-weight: 600; color: var(--ink); margin: 4px 0; letter-spacing: -0.005em; }
          .thread-meta { font-size: 12.5px; color: var(--ink-3); display: flex; gap: 12px; }
          .thread-stats { flex-shrink: 0; display: flex; gap: 18px; align-items: center; color: var(--ink-3); font-size: 13px; }
          .thread-stats .stat { display: flex; gap: 5px; align-items: center; font-variant-numeric: tabular-nums; }
          .hot-tag {
            display: inline-block; padding: 2px 8px;
            background: rgba(255,106,42,0.15); color: var(--accent);
            border-radius: 999px; font-size: 10px; font-weight: 700;
            letter-spacing: 0.06em; margin-left: 6px;
          }
          @media (max-width: 980px) {
            .comm-grid { grid-template-columns: 1fr; }
            .comm-side { position: static; }
            .thread-stats { display: none; }
          }
        `}</style>
        <div className="container comm-grid">
          <aside className="comm-side reveal">
            <div className="comm-side-card">
              <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.06em' }}>카테고리</h3>
              <div className="comm-cat-list">
                <a data-active="1"><span>전체</span><span>1,247</span></a>
                <a><span>💭 익명 고민</span><span>342</span></a>
                <a><span>🎓 학업 Q&A</span><span>289</span></a>
                <a><span>🧭 진로 고민</span><span>156</span></a>
                <a><span>💡 생활 팁</span><span>198</span></a>
                <a><span>🍱 모임/번개</span><span>134</span></a>
                <a><span>📦 자유게시판</span><span>128</span></a>
              </div>
            </div>
            <div className="comm-side-card">
              <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.06em' }}>커뮤니티 약속</h3>
              <ul className="comm-rules" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li>익명 게시글도 학교 인증 회원만</li>
                <li>실명/연락처 노출 즉시 차단</li>
                <li>광고·구인은 Business Hub로</li>
                <li>혐오 발언 영구 정지</li>
              </ul>
            </div>
          </aside>
          <div className="comm-main">
            <div className="comm-toolbar reveal">
              <input placeholder="제목, 내용으로 검색..." />
              <a href="community-write.html" className="btn" style={{ textDecoration: 'none' }}>새 글 쓰기</a>
            </div>
            {threads.map((th, i) => (
              <a key={th.title} href="community-thread.html" className="thread reveal" data-delay={(i % 4) + 1} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="thread-icon">{th.icon}</div>
                <div className="thread-body">
                  <div className="thread-cat">{th.cat}{th.hot && <span className="hot-tag">🔥 HOT</span>}</div>
                  <h4 className="thread-ttl">{th.title}</h4>
                  <div className="thread-meta">
                    <span>{th.author}</span>·<span>{th.time}</span>
                  </div>
                </div>
                <div className="thread-stats">
                  <div className="stat">💬 {th.replies}</div>
                  <div className="stat">❤ {th.likes}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   PASS IT ON
   ============================================================ */
function PassItOn() {
  const items = [
    { title: 'IKEA Malm 책상 + 의자', from: '졸업생 · Amsterdam', loc: 'Amstelveen', when: '5월 20일 픽업', tag: '가구', img: 'linear-gradient(135deg, #d4a574, #8B5E3C)' },
    { title: '자전거 (Gazelle, 2년 사용)', from: '졸업생 · Rotterdam', loc: 'Rotterdam Centrum', when: '협의', tag: '자전거', img: 'linear-gradient(135deg, #2a4a3a, #1a2e22)' },
    { title: '한국어 토픽 교재 일체', from: '재학생 · Den Haag', loc: 'Den Haag', when: '주말 픽업', tag: '책', img: 'linear-gradient(135deg, #FF6A2A, #E85A1F)' },
    { title: '냄비/팬/한식 식기 세트', from: '졸업생 · Utrecht', loc: 'Utrecht', when: '5월 말까지', tag: '주방', img: 'linear-gradient(135deg, #4a4a4a, #2a2a2a)' },
    { title: 'IKEA 1인용 매트리스', from: '졸업생 · Amsterdam', loc: 'Amsterdam West', when: '5월 25일', tag: '침구', img: 'linear-gradient(135deg, #b8c5d6, #6f7d92)' },
    { title: '겨울 패딩, 코트 (M)', from: '졸업생 · Eindhoven', loc: 'Eindhoven', when: '협의', tag: '의류', img: 'linear-gradient(135deg, #2d2d3a, #181822)' },
  ];
  return (
    <>
      <PageHero
        eyebrow="PASS IT ON"
        title={<><span className="split-line"><span>졸업이 가까워지면,</span></span><span className="split-line" data-delay="1"><span><span className="accent">물려주세요.</span></span></span></>}
        sub="돈이 오가지 않는 100% 무료 나눔. 학교 인증으로 신뢰는 보장합니다."
      />
      <section className="section" style={{ paddingTop: 40, background: 'var(--bg-0)' }}>
        <style>{`
          .pass-cta {
            background: linear-gradient(135deg, var(--accent), var(--accent-deep));
            border-radius: 24px;
            padding: 32px 40px;
            display: flex; align-items: center; justify-content: space-between;
            gap: 24px; margin-bottom: 56px; flex-wrap: wrap;
            box-shadow: 0 20px 50px var(--accent-glow);
          }
          .pass-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
          .pass-card {
            background: #fff; border: 1px solid var(--line);
            border-radius: 20px; overflow: hidden; cursor: pointer;
            transition: transform 0.4s var(--ease-out), box-shadow 0.4s;
          }
          .pass-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
          .pass-img { aspect-ratio: 4 / 3; position: relative; overflow: hidden; }
          .pass-img::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 60%); }
          .pass-tag {
            position: absolute; top: 16px; right: 16px;
            padding: 5px 10px;
            background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
            border-radius: 999px; color: #fff;
            font-size: 11px; font-weight: 600; letter-spacing: 0.04em;
          }
          .pass-body { padding: 24px; }
          .pass-card h3 { font-size: 17px; font-weight: 700; margin: 0 0 12px; letter-spacing: -0.01em; color: var(--ink); }
          .pass-meta { display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: var(--ink-3); }
          .pass-meta span::before { content: ''; display: inline-block; width: 4px; height: 4px; border-radius: 50%; background: var(--ink-3); margin-right: 8px; vertical-align: middle; }
          .pass-claim {
            margin-top: 16px; padding: 10px 14px;
            background: rgba(255,106,42,0.08);
            border: 1px solid rgba(255,106,42,0.25);
            border-radius: 10px; color: var(--accent);
            font-size: 13px; font-weight: 600; text-align: center;
            transition: all 0.2s;
          }
          .pass-card:hover .pass-claim { background: var(--accent); color: #fff; }
          @media (max-width: 880px) { .pass-grid { grid-template-columns: 1fr; } }
        `}</style>
        <div className="container">
          <div className="pass-cta reveal">
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: '#fff', letterSpacing: '-0.015em' }}>
                나눔할 물건이 있으세요?
              </h3>
              <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>
                30초 만에 등록하고 다음 학기 후배에게 전해주세요.
              </p>
            </div>
            <a href="pass-new.html" className="btn" style={{ background: '#fff', color: 'var(--accent)', borderColor: '#fff', textDecoration: 'none' }}>
              물건 등록하기 <span className="arrow">→</span>
            </a>
          </div>
          <div className="pass-grid">
            {items.map((it, i) => (
              <a key={it.title} href="pass-detail.html" className="pass-card reveal" data-delay={(i % 3) + 1} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div className="pass-img" style={{ background: it.img }}>
                  <span className="pass-tag">{it.tag}</span>
                </div>
                <div className="pass-body">
                  <h3>{it.title}</h3>
                  <div className="pass-meta">
                    <span>{it.from}</span>
                    <span>{it.loc}</span>
                    <span>{it.when}</span>
                  </div>
                  <div className="pass-claim">받아가기 신청</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   EVENTS PAGE
   ============================================================ */
function EventsPage() {
  const events = [
    { d: '2026.05.09', tag: 'D-SOON', cat: '체육대회', title: '폭싹 뛰었수다', loc: 'USC Universum · Rotterdam', img: 'linear-gradient(135deg, #FF6A2A, #2a1a1a)', size: 'feature' },
    { d: '2026.06.14', tag: 'NETWORKING', cat: '네트워킹 파티', title: 'Summer Night', loc: 'TBD · Amsterdam', img: 'linear-gradient(135deg, #1a2440, #0a0e1f)' },
    { d: '2026.09.05', tag: 'WELCOME', cat: '신입생', title: '신입생 환영회', loc: 'TBD · Amsterdam', img: 'linear-gradient(135deg, #2a3a1a, #0e1a0a)' },
    { d: '2026.10.12', tag: 'MONTHLY', cat: '포차나잇', title: '포차나잇 #14', loc: 'Korean BBQ · Den Haag', img: 'linear-gradient(135deg, #3a1a2a, #1f0a14)' },
    { d: '2026.11.20', tag: 'WORKSHOP', cat: 'Career', title: 'Samsung 채용 설명회', loc: 'Online + Eindhoven', img: 'linear-gradient(135deg, #1428A0, #0a142a)' },
    { d: '2026.12.06', tag: 'YEAR-END', cat: '송년회', title: '2026 송년회', loc: 'Amsterdam Centraal', img: 'linear-gradient(135deg, #FF6A2A, #1a0a0a)' },
  ];
  return (
    <>
      <PageHero
        eyebrow="EVENTS"
        title={<><span className="split-line"><span>네덜란드에서 열리는</span></span><span className="split-line" data-delay="1"><span><span className="accent">한인 학생 모든 행사.</span></span></span></>}
        sub="연 6회 대규모 행사 + 매월 정기 모임. 친구, 멘토, 커리어가 한 번에."
      />
      <section className="section" style={{ paddingTop: 40, background: 'var(--bg-0)' }}>
        <style>{`
          .ev-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: minmax(260px, auto);
            gap: 20px;
          }
          .ev-card {
            position: relative; border-radius: 24px; overflow: hidden;
            min-height: 320px; cursor: pointer;
            transition: transform 0.5s var(--ease-out), box-shadow 0.5s;
            display: flex; flex-direction: column; justify-content: space-between;
            padding: 28px; color: #fff;
          }
          .ev-card[data-size="feature"] {
            grid-column: span 2; grid-row: span 2;
            min-height: 540px; padding: 48px;
          }
          .ev-card .bg-img { position: absolute; inset: 0; z-index: 0; transition: transform 0.7s var(--ease-out); }
          .ev-card:hover { transform: translateY(-6px); box-shadow: 0 30px 60px rgba(0,0,0,0.25); }
          .ev-card:hover .bg-img { transform: scale(1.08); }
          .ev-card::before { content: ''; position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7)); }
          .ev-card > * { position: relative; z-index: 2; }
          .ev-card .d-tag {
            display: inline-flex; padding: 6px 12px;
            background: var(--accent); color: #fff;
            border-radius: 999px; font-size: 11px; font-weight: 700;
            letter-spacing: 0.08em; align-self: flex-start;
          }
          .ev-card .ev-cat { font-size: 13px; color: rgba(255,255,255,0.7); margin: 0 0 6px; }
          .ev-card .ev-ttl {
            font-size: clamp(22px, 2.2vw, 32px);
            font-weight: 800; letter-spacing: -0.025em;
            line-height: 1.05; margin: 0 0 8px;
          }
          .ev-card[data-size="feature"] .ev-ttl { font-size: clamp(48px, 5vw, 80px); }
          .ev-card .ev-meta { display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; color: rgba(255,255,255,0.7); }
          .ev-card .ev-arrow { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.15); backdrop-filter: blur(8px); display: grid; place-items: center; transition: all 0.3s; }
          .ev-card:hover .ev-arrow { background: var(--accent); transform: rotate(-45deg); }
          @media (max-width: 980px) {
            .ev-grid { grid-template-columns: 1fr 1fr; }
            .ev-card[data-size="feature"] { grid-column: span 2; }
          }
          @media (max-width: 600px) {
            .ev-grid { grid-template-columns: 1fr; }
            .ev-card[data-size="feature"] { grid-column: span 1; }
          }
        `}</style>
        <div className="container">
          <div className="ev-grid">
            {events.map((ev, i) => (
              <a key={ev.title} href="event-detail.html" className="ev-card reveal" data-size={ev.size} data-delay={(i % 4) + 1} style={{ textDecoration: 'none' }}>
                <div className="bg-img" style={{ background: ev.img }} />
                <div>
                  <div className="d-tag">{ev.tag}</div>
                  <p className="ev-cat" style={{ marginTop: 24 }}>{ev.cat}</p>
                  <h3 className="ev-ttl">{ev.title}</h3>
                </div>
                <div className="ev-meta">
                  <div>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{ev.d}</div>
                    <div>{ev.loc}</div>
                  </div>
                  <div className="ev-arrow">→</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   ABOUT PAGE
   ============================================================ */
function About() {
  const values = [
    { icon: '🤝', title: 'Connection', desc: '사람과 사람을 잇고, 기회와 기회를 연결합니다.' },
    { icon: '🔍', title: 'Transparency', desc: '운영의 모든 과정을 투명하게 공개합니다.' },
    { icon: '🌱', title: 'Growth', desc: '회원의 성장이 곧 KSAN의 성장입니다.' },
    { icon: '💚', title: 'Community', desc: '경쟁이 아닌 공동체로 서로를 응원합니다.' },
  ];

  const leadership = [
    { role: 'PRESIDENT', name: '나유성', school: 'University of Amsterdam', major: '경영학',
      quote: 'KSAN이 네덜란드 한인 유학생들에게 든든한 울타리가 될 수 있도록 노력하겠습니다.', initial: 'N' },
    { role: 'VICE PRESIDENT', name: '김성령', school: 'Erasmus University Rotterdam', major: 'IBA',
      quote: '외부 파트너십을 통해 KSAN의 가능성을 확장하는 데 집중하고 있습니다.', initial: 'K' },
  ];

  const teamSummary = [
    { icon: '👥', name: '기획총괄팀', desc: '행사의 컨셉부터 당일 진행까지, KSAN의 모든 이벤트를 기획하고 총괄합니다.', count: '10명' },
    { icon: '💼', name: '재무행정팀', desc: '예산 관리, 장소 섭외, 후원사 관리까지. KSAN의 모든 살림을 담당합니다.', count: '7명' },
    { icon: '📣', name: 'PR/마케팅팀', desc: 'KSAN의 얼굴. SNS 운영부터 포스터 디자인까지 브랜드를 만들어갑니다.', count: '9명' },
  ];

  const planningTeam = {
    icon: '👥', name: '기획총괄팀', sub: '행사 기획 및 당일 진행 총괄', lead: '정채연',
    members: [
      { initial: 'J', name: '정채연', role: '기획총괄팀장', isLead: true },
      { initial: 'H', name: '정희망', role: 'Event Coordinator' },
      { initial: 'C', name: '최익준', role: 'Event Coordinator' },
      { initial: 'K', name: '김종원', role: 'Event Coordinator' },
      { initial: 'S', name: '손예빈', role: 'Event Coordinator' },
      { initial: 'J', name: '조예은', role: 'Event Coordinator' },
      { initial: 'L', name: '이민서', role: 'Event Coordinator' },
      { initial: 'M', name: '문혜원', role: 'Event Coordinator' },
      { initial: 'K', name: '김소진', role: 'Event Coordinator' },
      { initial: 'J', name: '전민재', role: 'Event Coordinator' },
    ],
  };

  return (
    <>
      <style>{`
        .about-mission {
          padding: 140px 0 80px;
          background: var(--bg-0);
        }
        .about-mission h1 {
          font-size: clamp(56px, 8vw, 120px);
          font-weight: 800; letter-spacing: -0.04em;
          line-height: 0.98; margin: 24px 0 0;
          color: var(--ink);
        }
        .about-mission .body {
          margin-top: 40px; max-width: 720px;
          font-size: clamp(17px, 1.4vw, 19px);
          line-height: 1.75; color: var(--ink-2);
        }
        .about-mission .body p { margin: 0 0 18px; }
        .about-mission .body strong { color: var(--ink); font-weight: 700; }
        .about-mission .pull {
          display: inline-block;
          font-size: 21px; font-weight: 700;
          color: var(--ink); letter-spacing: -0.015em;
          padding: 10px 0;
          border-top: 2px solid var(--accent);
          margin-top: 8px;
        }

        .values-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 16px; margin-top: 56px;
        }
        .value-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 22px;
          padding: 32px 28px;
          text-align: center;
          transition: all 0.4s var(--ease-out);
        }
        .value-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,106,42,0.3);
          box-shadow: 0 18px 40px rgba(24,24,28,0.08);
        }
        .value-card .ic { font-size: 44px; margin-bottom: 18px; line-height: 1; }
        .value-card h4 {
          margin: 0 0 8px; font-size: 18px;
          font-weight: 700; letter-spacing: -0.015em;
          color: var(--ink);
        }
        .value-card p { margin: 0; font-size: 13.5px; color: var(--ink-2); line-height: 1.55; }

        .leadership-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 24px; margin-top: 56px;
        }
        .leader-card {
          background: #fff;
          border: 2px solid var(--accent);
          border-radius: 28px;
          padding: 48px 40px 40px;
          text-align: center;
          position: relative;
        }
        .leader-card .role {
          position: absolute; top: -16px; left: 50%;
          transform: translateX(-50%);
          padding: 8px 22px;
          background: var(--accent); color: #fff;
          font-size: 11.5px; font-weight: 700;
          letter-spacing: 0.16em;
          border-radius: 999px;
        }
        .leader-card .avatar {
          width: 130px; height: 130px;
          margin: 0 auto 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFE5D2, #FFC9A8);
          display: grid; place-items: center;
          font-family: var(--font-display);
          font-size: 56px; font-weight: 800;
          color: var(--accent);
          letter-spacing: -0.02em;
        }
        .leader-card h3 {
          margin: 0; font-size: 26px;
          font-weight: 800; letter-spacing: -0.025em;
          color: var(--ink);
        }
        .leader-card .school {
          margin-top: 8px;
          font-size: 14px; color: var(--ink-2);
        }
        .leader-card .quote {
          margin-top: 24px; padding-top: 24px;
          border-top: 1px solid var(--line);
          font-size: 14px; color: var(--ink-2);
          line-height: 1.6; font-style: italic;
        }

        .teams-summary {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 20px; margin-top: 56px;
        }
        .team-summary-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 36px 32px;
          text-align: center;
          transition: all 0.4s var(--ease-out);
        }
        .team-summary-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 44px rgba(24,24,28,0.08);
        }
        .team-summary-card .ic { font-size: 40px; margin-bottom: 16px; }
        .team-summary-card h4 {
          margin: 0 0 10px; font-size: 19px;
          font-weight: 700; letter-spacing: -0.015em;
        }
        .team-summary-card p {
          margin: 0 0 20px; font-size: 13.5px;
          color: var(--ink-2); line-height: 1.55;
        }
        .team-summary-card .count {
          display: inline-block;
          padding: 7px 18px;
          background: rgba(255,106,42,0.10);
          color: var(--accent);
          font-size: 13px; font-weight: 700;
          border-radius: 999px;
        }

        .team-detail-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 28px;
          padding: 36px;
          margin-top: 24px;
        }
        .team-detail-head {
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; margin-bottom: 28px; flex-wrap: wrap;
        }
        .team-detail-head .ttl {
          display: flex; align-items: center; gap: 16px;
        }
        .team-detail-head .ic {
          width: 52px; height: 52px;
          background: rgba(255,106,42,0.10);
          border-radius: 14px;
          display: grid; place-items: center;
          font-size: 26px;
        }
        .team-detail-head h3 {
          margin: 0; font-size: 22px;
          font-weight: 800; letter-spacing: -0.02em;
        }
        .team-detail-head .sub {
          margin-top: 4px; font-size: 13.5px;
          color: var(--ink-2);
        }
        .team-detail-head .lead-tag {
          padding: 8px 16px;
          background: var(--ink); color: #fff;
          font-size: 12.5px; font-weight: 600;
          border-radius: 999px;
        }

        .members-grid {
          display: grid; grid-template-columns: repeat(5, 1fr);
          gap: 14px;
        }
        .member-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 22px 16px;
          text-align: center;
          transition: all 0.3s var(--ease-out);
          position: relative;
        }
        .member-card:hover { transform: translateY(-2px); border-color: rgba(255,106,42,0.3); }
        .member-card.is-lead {
          background: rgba(255,106,42,0.04);
          border: 2px solid var(--accent);
        }
        .member-card .avatar {
          width: 56px; height: 56px;
          margin: 0 auto 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFE5D2, #FFC9A8);
          display: grid; place-items: center;
          font-family: var(--font-display);
          font-size: 22px; font-weight: 700;
          color: var(--accent);
        }
        .member-card .name {
          font-size: 14px; font-weight: 700;
          color: var(--ink); letter-spacing: -0.005em;
        }
        .member-card .role {
          margin-top: 4px;
          font-size: 11.5px; color: var(--ink-3);
        }
        .member-card .lead-badge {
          margin-top: 8px;
          display: inline-block;
          padding: 4px 10px;
          background: var(--accent); color: #fff;
          font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.1em;
          border-radius: 999px;
        }
        @media (max-width: 980px) {
          .values-grid, .teams-summary { grid-template-columns: repeat(2, 1fr); }
          .leadership-grid { grid-template-columns: 1fr; }
          .members-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      {/* MISSION */}
      <section className="about-mission" id="mission">
        <div className="container">
          <div className="reveal">
            <span className="eyebrow">OUR MISSION</span>
            <h1>혼자가 아닌<br/>유학, 함께 만들어요.</h1>
          </div>
          <div className="body reveal" data-delay="1">
            <p>
              KSAN은 2020년, 네덜란드 전역의 한인 유학생들을 연결하는 단체로 시작했습니다. 단순한 친목 모임이 아니라, 낯선 땅에서 같은 목표를 가진 사람들이 서로 돕고 성장하는 커뮤니티를 만들고자 했습니다.
            </p>
            <p>
              저희는 <strong>정보의 벽, 언어의 벽, 외로움의 벽</strong>을 허물고자 합니다. 네덜란드 생활에 필요한 실용적인 정보부터 커리어 기회, 그리고 진짜 연결까지.
            </p>
            <span className="pull">"KSAN이 있으니까 안심된다" — 이 말이 저희의 목표입니다.</span>
          </div>
        </div>
      </section>

      <div className="section-divider"><span className="mark"></span></div>

      {/* VALUES */}
      <section className="section" id="values" style={{ background: 'var(--bg-0)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
            <div className="eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>OUR VALUES</div>
            <h2 className="h-section" style={{ marginTop: 8 }}>KSAN이 믿는 것들</h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={v.title} className="value-card reveal" data-delay={(i % 4) + 1}>
                <div className="ic">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><span className="mark"></span></div>

      {/* LEADERSHIP */}
      <section className="section" id="leadership" style={{ background: 'var(--bg-0)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
            <div className="eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>LEADERSHIP</div>
            <h2 className="h-section" style={{ marginTop: 8 }}>2025-2026 회장단</h2>
          </div>
          <div className="leadership-grid">
            {leadership.map((l, i) => (
              <div key={l.name} className="leader-card reveal" data-delay={i + 1}>
                <div className="role">{l.role}</div>
                <div className="avatar">{l.initial}</div>
                <h3>{l.name}</h3>
                <div className="school">{l.school} · {l.major}</div>
                <p className="quote">"{l.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><span className="mark"></span></div>

      {/* TEAMS OVERVIEW */}
      <section className="section section--light" id="teams">
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
            <div className="eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>OUR TEAMS</div>
            <h2 className="h-section" style={{ marginTop: 8, color: 'var(--ink-dark)' }}>KSAN을 움직이는 팀들</h2>
          </div>
          <div className="teams-summary">
            {teamSummary.map((t, i) => (
              <div key={t.name} className="team-summary-card reveal" data-delay={i + 1}>
                <div className="ic">{t.icon}</div>
                <h4 style={{ color: 'var(--ink-dark)' }}>{t.name}</h4>
                <p style={{ color: 'var(--ink-dark-2)' }}>{t.desc}</p>
                <span className="count">{t.count}</span>
              </div>
            ))}
          </div>

          {/* TEAM DETAIL: 기획총괄팀 */}
          <div className="team-detail-card reveal" style={{ marginTop: 56 }}>
            <div className="team-detail-head">
              <div className="ttl">
                <div className="ic">{planningTeam.icon}</div>
                <div>
                  <h3 style={{ color: 'var(--ink-dark)' }}>{planningTeam.name}</h3>
                  <div className="sub">{planningTeam.sub}</div>
                </div>
              </div>
              <div className="lead-tag">팀장: {planningTeam.lead}</div>
            </div>
            <div className="members-grid">
              {planningTeam.members.map((m, i) => (
                <div key={i} className={`member-card ${m.isLead ? 'is-lead' : ''}`}>
                  <div className="avatar">{m.initial}</div>
                  <div className="name">{m.name}</div>
                  <div className="role">{m.role}</div>
                  {m.isLead && <span className="lead-badge">TEAM LEAD</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider on-light"><span className="mark"></span></div>

      {/* FOR BUSINESS PARTNERS */}
      <section className="section" id="partner" style={{ background: 'var(--bg-0)' }}>
        <style>{`
          .partner-hero-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 64px; align-items: start;
            max-width: 1140px; margin: 0 auto;
          }
          .partner-hero-grid .lhs { position: sticky; top: 110px; }
          .partner-hero-grid .lhs .num {
            font-family: var(--font-display);
            font-size: 13px; font-weight: 700;
            color: var(--accent);
            letter-spacing: 0.18em;
            margin-bottom: 12px;
            display: inline-block;
          }
          .partner-hero-grid .lhs h2 {
            font-size: clamp(40px, 4.6vw, 64px);
            font-weight: 800; letter-spacing: -0.03em;
            line-height: 1.02; margin: 0 0 28px;
            color: var(--ink);
          }
          .partner-hero-grid .lhs h2 .accent { color: var(--accent); }
          .partner-hero-grid .lhs p {
            font-size: 16px; line-height: 1.7;
            color: var(--ink-2);
            max-width: 460px;
            margin: 0 0 28px;
          }
          .partner-stats-row {
            display: grid; grid-template-columns: repeat(3, 1fr);
            gap: 20px; padding: 22px 0;
            border-top: 1px solid var(--line);
            border-bottom: 1px solid var(--line);
            margin-bottom: 28px;
          }
          .partner-stat .num {
            font-family: var(--font-display);
            font-size: 32px; font-weight: 800;
            color: var(--ink); letter-spacing: -0.025em;
            line-height: 1;
          }
          .partner-stat .label {
            margin-top: 6px;
            font-size: 12px; color: var(--ink-3);
            letter-spacing: 0.04em;
          }

          .partner-offer {
            display: flex; flex-direction: column;
            gap: 12px;
          }
          .partner-offer-card {
            background: #fff;
            border: 1px solid var(--line);
            border-radius: 20px;
            padding: 28px;
            position: relative;
            transition: all 0.4s var(--ease-out);
          }
          .partner-offer-card:hover {
            border-color: rgba(255,106,42,0.35);
            box-shadow: 0 18px 40px rgba(24,24,28,0.08);
            transform: translateX(4px);
          }
          .partner-offer-card .head {
            display: flex; align-items: center; gap: 14px;
            margin-bottom: 14px;
          }
          .partner-offer-card .ic {
            width: 44px; height: 44px;
            border-radius: 12px;
            background: rgba(255,106,42,0.10);
            color: var(--accent);
            display: grid; place-items: center;
            font-size: 22px; font-weight: 700;
            font-family: var(--font-display);
          }
          .partner-offer-card h4 {
            margin: 0; font-size: 18px;
            font-weight: 700; letter-spacing: -0.015em;
            color: var(--ink);
          }
          .partner-offer-card .sub {
            margin-top: 3px; font-size: 12.5px;
            color: var(--accent); font-weight: 600;
            letter-spacing: 0.04em;
          }
          .partner-offer-card p {
            margin: 0; font-size: 14px;
            color: var(--ink-2); line-height: 1.6;
          }
          .partner-offer-card .features {
            margin-top: 16px;
            display: flex; flex-wrap: wrap; gap: 6px;
          }
          .partner-offer-card .features span {
            padding: 5px 11px;
            background: var(--bg-cream);
            border-radius: 999px;
            font-size: 11.5px; font-weight: 600;
            color: var(--ink-dark-2);
          }

          .partner-cta-band {
            margin-top: 56px;
            padding: 36px;
            background: linear-gradient(135deg, #FFE5D2 0%, #FFB587 100%);
            border-radius: 24px;
            display: flex; align-items: center; justify-content: space-between;
            gap: 24px; flex-wrap: wrap;
          }
          .partner-cta-band h3 {
            margin: 0; font-size: 22px;
            font-weight: 800; letter-spacing: -0.02em;
            color: #1A0E08;
          }
          .partner-cta-band p {
            margin: 6px 0 0; font-size: 14px;
            color: #4A2A18; line-height: 1.5;
          }
          .partner-cta-band .btn {
            background: #1A0E08; color: #fff;
            padding: 14px 24px; border-radius: 999px;
            font-size: 14.5px; font-weight: 600;
            display: inline-flex; align-items: center; gap: 8px;
            transition: background 0.2s, transform 0.2s;
            cursor: pointer; border: 0; font-family: inherit;
          }
          .partner-cta-band .btn:hover { background: var(--accent); transform: translateY(-2px); }

          @media (max-width: 980px) {
            .partner-hero-grid { grid-template-columns: 1fr; gap: 40px; }
            .partner-hero-grid .lhs { position: static; }
            .partner-stats-row { grid-template-columns: repeat(3, 1fr); gap: 12px; }
          }
        `}</style>
        <div className="container">
          <div className="partner-hero-grid">
            <div className="lhs reveal">
              <span className="num">FOR BUSINESS PARTNERS</span>
              <h2>기업과 학생을<br/><span className="accent">잇는 다리.</span></h2>
              <p>
                KSAN은 단순한 학생회를 넘어, 네덜란드 한인 인재 풀과 기업을 직접 연결하는 플랫폼입니다. 1,000명+ 검증된 멤버십을 기반으로, 기업이 한국어/현지어 이중언어 인재에 접근할 수 있는 가장 빠른 채널을 제공합니다.
              </p>
              <div className="partner-stats-row">
                <div className="partner-stat">
                  <div className="num"><AnimatedCounter to={1000} suffix="+" /></div>
                  <div className="label">활성 멤버</div>
                </div>
                <div className="partner-stat">
                  <div className="num">6</div>
                  <div className="label">주요 대학 커버</div>
                </div>
                <div className="partner-stat">
                  <div className="num">10+</div>
                  <div className="label">기업 파트너</div>
                </div>
              </div>
              <a href="business-hub.html#post-job" className="btn btn--lg">
                채용공고 등록하기 <span className="arrow">→</span>
              </a>
            </div>

            <div className="partner-offer">
              <div className="partner-offer-card reveal">
                <div className="head">
                  <div className="ic">01</div>
                  <div>
                    <h4>채용 공고 게시</h4>
                    <div className="sub">RECRUITMENT</div>
                  </div>
                </div>
                <p>1,000명+ 검증 멤버에게 직접 채용 공고를 노출합니다. 학교·전공·학년별 타겟팅 지원.</p>
                <div className="features">
                  <span>KSAN Verified 배지</span>
                  <span>전공별 필터링</span>
                  <span>지원 데이터 리포트</span>
                </div>
              </div>

              <div className="partner-offer-card reveal" data-delay="1">
                <div className="head">
                  <div className="ic">02</div>
                  <div>
                    <h4>이벤트 스폰서십</h4>
                    <div className="sub">SPONSORSHIP</div>
                  </div>
                </div>
                <p>체육대회, 송년회, 신입생 환영회 등 연 30회+ 행사에 브랜드 노출 및 부스 운영 기회 제공.</p>
                <div className="features">
                  <span>로고·부스 노출</span>
                  <span>연 30+ 행사</span>
                  <span>오프라인 전환</span>
                </div>
              </div>

              <div className="partner-offer-card reveal" data-delay="2">
                <div className="head">
                  <div className="ic">03</div>
                  <div>
                    <h4>브랜드 협업</h4>
                    <div className="sub">BRAND COLLAB</div>
                  </div>
                </div>
                <p>한인 학생 커뮤니티 대상 마케팅 캠페인, 신제품 체험단, 설문조사 등 맞춤형 협업.</p>
                <div className="features">
                  <span>SNS 캠페인</span>
                  <span>설문 / 인사이트</span>
                  <span>체험단 운영</span>
                </div>
              </div>

              <div className="partner-offer-card reveal" data-delay="3">
                <div className="head">
                  <div className="ic">04</div>
                  <div>
                    <h4>인재 풀 액세스</h4>
                    <div className="sub">TALENT POOL</div>
                  </div>
                </div>
                <p>채용 시즌 외에도 정기적인 KSAN 인재 풀 데이터베이스 접근권으로 잠재 인재 발굴.</p>
                <div className="features">
                  <span>이력서 DB</span>
                  <span>학교별 통계</span>
                  <span>커리어 파이프라인</span>
                </div>
              </div>
            </div>
          </div>

          <div className="partner-cta-band reveal">
            <div>
              <h3>지금 KSAN과 함께하세요.</h3>
              <p>biz@ksan.nl로 연락주시면, 영업일 기준 2-3일 내 운영진이 회신드립니다.</p>
            </div>
            <a href="mailto:biz@ksan.nl" className="btn">파트너십 문의 →</a>
          </div>
        </div>
      </section>

      <div className="section-divider"><span className="mark"></span></div>

      {/* CONTACT */}
      <section className="section" id="contact" style={{ background: 'var(--bg-0)' }}>
        <div className="container">
          <div className="reveal" style={{ maxWidth: 720, marginBottom: 56, textAlign: 'center', margin: '0 auto 56px' }}>
            <div className="eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>CONTACT</div>
            <h2 className="h-section" style={{ marginTop: 8 }}>연락처</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, maxWidth: 980, margin: '0 auto' }}>
            {[
              { ttl: 'General', mail: 'info@ksan.nl', desc: '문의·제휴 일반' },
              { ttl: 'Business Hub', mail: 'biz@ksan.nl', desc: '채용·기업 파트너' },
              { ttl: 'Press', mail: 'press@ksan.nl', desc: '언론·미디어 문의' },
            ].map((c, i) => (
              <a key={c.ttl} className="card reveal" data-delay={i + 1} href={`mailto:${c.mail}`}>
                <p style={{ margin: 0, color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{c.ttl}</p>
                <h4 style={{ margin: '12px 0 6px', fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em' }}>{c.mail}</h4>
                <p style={{ margin: 0, color: 'var(--ink-3)', fontSize: 13.5 }}>{c.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { PageHero, SettlementGuide, SettlementArticle, BusinessHub, Community, PassItOn, EventsPage, About });
