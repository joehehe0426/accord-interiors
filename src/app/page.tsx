"use client";

import { useEffect, useRef, useState } from "react";
import {
  Envelope,
  Phone,
  Building,
  CheckCircle,
  ArrowRight,
  SpeakerHigh,
  SpeakerSimpleX,
} from "@phosphor-icons/react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─── Music Player ─── */
function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function toggle() {
    if (!audioRef.current) {
      audioRef.current = new Audio("/music/classical.mp3");
      audioRef.current.onended = () => setPlaying(false);
    }

    if (playing) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "關閉音樂" : "播放音樂"}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-charcoal/90 text-white shadow-lg transition-all duration-300 hover:bg-charcoal active:scale-90"
    >
      {playing ? (
        <SpeakerHigh size={18} weight="bold" />
      ) : (
        <SpeakerSimpleX size={18} weight="bold" />
      )}
    </button>
  );
}

/* ─── Data ─── */

const PROJECTS = [
  {
    name: "昇御門",
    nameEn: "Chatham Gate",
    location: "Hung Hom 紅磡",
    type: "住宅",
    size: "1,600 sq ft",
    slides: [9, 10, 11, 12],
    desc: "現代奢華住宅，盡覽維港景色。",
  },
  {
    name: "貝沙灣",
    nameEn: "Residence Bel-Air",
    location: "Southern District 香港南區",
    type: "住宅",
    size: "1,600 sq ft",
    slides: [13, 14, 15],
    desc: "當代海岸生活，飾面精緻。",
  },
  {
    name: "貝沙灣",
    nameEn: "Residence Bel-Air",
    location: "Southern District 香港南區",
    type: "住宅",
    size: "1,700 sq ft",
    slides: [16, 17, 18, 19, 20, 21],
    desc: "寬敞家庭住宅，全屋訂造木作。",
  },
  {
    name: "貝沙灣",
    nameEn: "Residence Bel-Air",
    location: "Southern District 香港南區",
    type: "住宅",
    size: "1,600 sq ft",
    slides: [22, 23, 24, 25],
    desc: "極簡美學，暖色天然石材點綴。",
  },
  {
    name: "畢架山峰",
    nameEn: "Mount Beacon",
    location: "Kowloon Tong 九龍塘",
    type: "住宅",
    size: "1,600 sq ft",
    slides: [26, 27, 28, 29, 30, 31, 32],
    desc: "優雅山居單位，訂製燈光設計。",
  },
  {
    name: "畢架山峰",
    nameEn: "Mount Beacon",
    location: "Kowloon Tong 九龍塘",
    type: "住宅",
    size: "1,600 sq ft",
    slides: [33, 34, 35, 36, 37, 38],
    desc: "古典與當代交融，精選藝術品。",
  },
  {
    name: "寶馬山花園",
    nameEn: "Pacific Palisades",
    location: "North Point 北角",
    type: "住宅",
    size: "1,200 sq ft",
    slides: [39, 40, 41, 42, 43, 44],
    desc: "精緻奢華，最大化空間與自然光。",
  },
  {
    name: "星堤",
    nameEn: "Starry In The Sky",
    location: "Tuen Mun 屯門",
    type: "住宅",
    size: "3,700 sq ft",
    slides: [45, 46, 47, 48, 49, 50, 51],
    desc: "大尺度住宅，開闊景觀軸線。",
  },
  {
    name: "嘉文花園",
    nameEn: "Carmen's Garden",
    location: "Ho Man Tin 何文田",
    type: "住宅",
    size: "1,000 sq ft",
    slides: [52, 53, 54, 55, 56, 57],
    desc: "溫暖宜人的家，層次豐富的物料組合。",
  },
  {
    name: "帝琴灣",
    nameEn: "Symphony Bay",
    location: "Sai Kung 西貢",
    type: "住宅",
    size: "1,300 sq ft",
    slides: [58, 59, 60, 61, 62, 63, 64, 65],
    desc: "海濱居所，室內外流動自然。",
  },
  {
    name: "IRad",
    nameEn: "",
    location: "香港",
    type: "商業",
    size: "3,500 sq ft",
    slides: [66, 67, 68],
    desc: "以病人為本的醫療中心裝修。",
  },
  {
    name: "君匯港",
    nameEn: "Harbour Green",
    location: "Tai Kok Tsui 大角咀",
    type: "住宅",
    size: "1,400 sq ft",
    slides: [69, 70, 71, 72],
    desc: "海濱生活，進口大理石無縫銜接。",
  },
  {
    name: "信裕大廈",
    nameEn: "",
    location: "Mong Kok 旺角",
    type: "商業",
    size: "700 sq ft",
    slides: [73, 74, 75, 76, 77],
    desc: "精巧辦公室改造，智能收納。",
  },
  {
    name: "漣山",
    nameEn: "",
    location: "Clear Water Bay 清水灣",
    type: "住宅",
    size: "900 sq ft",
    slides: [78, 79, 80, 81],
    desc: "自然啟發的室內，有機物料。",
  },
  {
    name: "逸樺園",
    nameEn: "",
    location: "Quarry Bay 鰂魚涌",
    type: "住宅",
    size: "1,000 sq ft",
    slides: [82, 83, 84, 85, 86, 87],
    desc: "都市靜所，層次燈光營造寧靜。",
  },
  {
    name: "君帕",
    nameEn: "",
    location: "香港",
    type: "住宅",
    size: "2,800 sq ft",
    slides: [88, 89],
    desc: "開闊頂層單位，雕塑感特色牆。",
  },
];

const CLIENTS = [
  "卓智醫學掃描診斷中心",
  "Parkway Health Hong Kong",
  "shop9restaurant&bar",
  "麗姐廚房",
  "金城營造集團",
  "羅氏律師行",
];

const PROCESS = [
  {
    phase: "01",
    title: "設計大綱",
    subtitle: "概念與平面",
    items: [
      "現場度呎及提供設計建議",
      "繪畫單位平面圖、傢俱佈置及整體設計",
      "根據客方意見修改有關圖紙及設計",
    ],
  },
  {
    phase: "02",
    title: "圖紙與報價",
    subtitle: "效果與造價",
    items: [
      "提供工程合約造價",
      "提供彩色效果圖及有關物料",
    ],
  },
  {
    phase: "03",
    title: "現場施工",
    subtitle: "監工至入伙",
    items: [
      "繪畫整套施工圖",
      "展開裝修工程及現場監工",
      "完成工程及入伙後跟進",
      "專業攝影師現場拍照以作存檔",
      "提供長達一年之工程保養",
    ],
  },
];

/* ─── Components ─── */

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay }}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "關於", href: "#about" },
    { label: "流程", href: "#process" },
    { label: "作品", href: "#portfolio" },
    { label: "圖庫", href: "#gallery" },
    { label: "商城", href: "/products" },
    { label: "聯絡", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.04)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-3">
          <img src="/images/logo.png" alt="Accord Interiors" className="h-10 w-auto md:h-12" />
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-charcoal/70 transition-colors duration-300 hover:text-charcoal"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-gold/50 bg-gold/5 px-5 py-2 text-sm font-medium text-gold-dark transition-all duration-300 hover:bg-gold/10 hover:border-gold"
          >
            聯絡我們
          </a>
        </div>
        <button
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="開啟選單"
        >
          <span
            className={`h-[1.5px] w-5 bg-charcoal transition-all duration-300 ${
              mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-5 bg-charcoal transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-5 bg-charcoal transition-all duration-300 ${
              mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
            className="absolute inset-x-0 top-0 border-b border-stone/30 bg-background/95 backdrop-blur-lg px-6 pb-8 pt-20 md:hidden"
          >
            <div className="flex flex-col gap-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg text-charcoal/70 transition-colors hover:text-charcoal"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-gold/50 bg-gold/5 px-5 py-2.5 text-sm font-medium text-gold-dark transition-all hover:bg-gold/10"
              >
                聯絡我們 <ArrowRight size={14} weight="bold" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-stone/30" />
      <div className="absolute top-1/2 -right-32 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-gold/5 blur-[120px]" />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-12 px-6 pt-32 pb-16 md:flex-row md:items-center md:gap-20 md:pt-0">
        {/* Left — Text */}
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            className="mb-4 text-xs font-medium tracking-[0.2em] uppercase text-gold-dark"
          >
            室內設計 · 工程承造 · 項目管理
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex flex-col items-start gap-4"
          >
            <img
              src="/images/logo.png"
              alt="Accord Interiors"
              className="h-24 w-auto md:h-40"
            />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="mt-6 max-w-[55ch] text-base leading-relaxed text-charcoal/60 md:text-lg"
          >
            <strong>我們讓空間活起來</strong>——由概念到完工。作為香港的設計及建造工作室，我們以精準、用心與對細節的堅持，打造住宅、商業與酒店室內空間。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-charcoal/85 active:scale-[0.98]"
            >
              查看作品 <ArrowRight size={14} weight="bold" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-6 py-3 text-sm font-medium text-charcoal/70 transition-all duration-300 hover:border-charcoal/40 hover:text-charcoal active:scale-[0.98]"
            >
              聯絡我們
            </a>
          </motion.div>
        </div>

        {/* Right — Image grid */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-1 flex-col gap-3 md:gap-4"
        >
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
              <img
                src="/images/projects/slide9.jpg"
                alt="Chatham Gate living room interior design by Accord Interiors"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
              <img
                src="/images/projects/slide13.jpg"
                alt="Residence Bel-Air luxury home interior by Accord Interiors"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            <div className="overflow-hidden rounded-[1.5rem] md:rounded-[2rem] col-span-2">
              <img
                src="/images/projects/slide16.jpg"
                alt="Modern residential interior design Hong Kong"
                className="aspect-[16/9] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
              <img
                src="/images/projects/slide26.jpg"
                alt="Mount Beacon luxury apartment design by Accord Interiors"
                className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid items-start gap-16 md:grid-cols-2 md:gap-24">
          <FadeUp>
            <div className="relative">
              <div
                className="absolute inset-0 -top-12 -bottom-12 -left-6 -right-6 rounded-[2.5rem] bg-cover bg-center opacity-40"
                style={{ backgroundImage: "url(/images/about-bg.jpg)" }}
              />
              <div className="relative">
                <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-gold-dark">
                  關於
                </p>
                <h2 className="text-3xl font-semibold leading-tight tracking-tighter text-charcoal md:text-4xl">
                  把構想
                  <br />
                  帶進每一個空間
                </h2>
                <div className="mt-2 h-[2px] w-12 bg-gold/60" />
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="space-y-5 text-base leading-relaxed text-charcoal/65 md:text-lg">
              <p>
                <strong>Accord Interiors Company</strong>
                {" "}
                把創意構想與技術精準結合。立足香港，我們設計並建造既實用又令人嚮往的住宅與商業空間。
              </p>
              <p>
                從家居到示範單位、辦公室到餐廳，每個項目都配合客戶品牌、營運與品味。沒有兩個空間是一樣的。
              </p>
              <p>
                我們不只裝飾——而是構築完整環境。燈光、聲學、傢俱、藝術與影音一氣呵成，預算透明、準時交付。
              </p>
            </div>
          </FadeUp>
        </div>

      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="relative py-24 md:py-36">
      {/* Background accent */}
      <div className="absolute top-1/3 left-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gold/5 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <FadeUp>
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-gold-dark">
            我們的流程
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tighter text-charcoal md:text-4xl">
            由概念
            <br />
            到完工
          </h2>
          <div className="mt-2 h-[2px] w-12 bg-gold/60" />
        </FadeUp>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PROCESS.map((p, i) => (
            <FadeUp key={p.phase} delay={i * 0.12}>
              <div className="group rounded-[2rem] border border-stone/40 bg-white/70 p-8 transition-all duration-500 hover:border-gold/30 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)]">
                <span className="text-5xl font-light tracking-tighter text-gold/30 md:text-6xl">
                  {p.phase}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-charcoal">{p.title}</h3>
                <p className="mt-1 text-sm text-gold-dark/70">{p.subtitle}</p>
                <ul className="mt-6 space-y-3">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal/60">
                      <CheckCircle size={14} weight="fill" className="mt-0.5 shrink-0 text-gold/60" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const [typeFilter, setTypeFilter] = useState("全部");
  const [selected, setSelected] = useState(PROJECTS[0]);
  const [detail, setDetail] = useState<(typeof PROJECTS)[0] | null>(null);

  const types = ["全部", ...new Set(PROJECTS.map((p) => p.type))];
  const filtered =
    typeFilter === "全部"
      ? PROJECTS
      : PROJECTS.filter((p) => p.type === typeFilter);

  const projectKey = (p: (typeof PROJECTS)[0]) => `${p.name}-${p.size}-${p.location}`;

  return (
    <section id="portfolio" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6">
        <FadeUp>
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-gold-dark">
            作品集
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tighter text-charcoal md:text-4xl">
            精選項目
          </h2>
          <div className="mt-2 h-[2px] w-12 bg-gold/60" />
        </FadeUp>

        {/* Filters */}
        <FadeUp delay={0.05}>
          <div className="mt-8 flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                  typeFilter === t
                    ? "border-gold bg-gold/10 text-gold-dark"
                    : "border-stone/50 text-charcoal/40 hover:border-charcoal/20 hover:text-charcoal/70"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Project pills */}
        <FadeUp delay={0.1}>
          <div className="mt-4 flex flex-wrap gap-2">
            {filtered.map((p) => (
              <button
                key={projectKey(p)}
                onClick={() => setSelected(p)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                  projectKey(selected) === projectKey(p)
                    ? "border-gold bg-gold/10 text-gold-dark"
                    : "border-stone/50 text-charcoal/50 hover:border-charcoal/20 hover:text-charcoal/70"
                }`}
              >
                {p.name}{" "}
                <span className="opacity-60">{p.location}</span>
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Info bar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={projectKey(selected)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="mt-8 mb-6 flex flex-wrap items-baseline justify-between gap-2"
          >
            <div>
              <p className="text-sm font-medium text-charcoal">
                {selected.name}
                {selected.nameEn ? ` · ${selected.nameEn}` : ""}
              </p>
              <p className="text-xs text-charcoal/40">
                {selected.location} &middot; {selected.size}
                {selected.desc && ` · ${selected.desc}`}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Gallery grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={projectKey(selected)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {selected.slides.map((slideIdx) => (
                <motion.button
                  key={slideIdx}
                  onClick={() => setDetail(selected)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group overflow-hidden rounded-[1.5rem]"
                >
                  <img
                    src={`/images/projects/slide${slideIdx}.jpg`}
                    alt={`${selected.name} interior`}
                    className="h-48 w-full object-cover transition-all duration-500 group-hover:scale-105 md:h-64"
                    loading="lazy"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {detail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDetail(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 cursor-pointer overflow-y-auto"
          >
            <motion.div
              key={projectKey(detail)}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full rounded-[2rem] bg-white p-6 md:p-10 shadow-2xl"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-charcoal">
                    {detail.name}
                    {detail.nameEn ? ` · ${detail.nameEn}` : ""}
                  </h3>
                  <p className="mt-1 text-sm text-charcoal/50">
                    {detail.location} &middot; {detail.size}
                  </p>
                  {detail.desc && (
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/60 max-w-[50ch]">
                      {detail.desc}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setDetail(null)}
                  className="shrink-0 rounded-full border border-stone/30 p-2 text-charcoal/40 transition-colors hover:border-charcoal/30 hover:text-charcoal"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
                {detail.slides.map((slideIdx) => (
                  <div key={slideIdx} className="overflow-hidden rounded-[1.25rem]">
                    <img
                      src={`/images/projects/slide${slideIdx}.jpg`}
                      alt={`${detail.name} interior`}
                      className="w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Gallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const images = [
    "WhatsApp Image 2026-07-28 at 21.16.17.jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.18 (1).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.18 (2).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.18.jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.19 (1).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.19 (2).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.19.jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.21 (1).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.21 (2).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.21 (3).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.21.jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.22 (1).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.22 (2).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.22 (3).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.22.jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.23 (1).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.23.jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.24 (1).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.24.jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.25.jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.26 (1).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.26 (2).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.26 (3).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.26 (4).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.26.jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.27 (1).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.27 (2).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.27 (3).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.27 (4).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.27.jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.28 (1).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.28 (2).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.28 (3).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.28 (4).jpeg",
    "WhatsApp Image 2026-07-28 at 21.16.28.jpeg",
  ];

  return (
    <section id="gallery" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6">
        <FadeUp>
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-gold-dark">
            圖庫
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tighter text-charcoal md:text-4xl">
            項目相冊
          </h2>
          <div className="mt-2 h-[2px] w-12 bg-gold/60" />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-10 columns-2 gap-4 md:columns-3 md:gap-6">
            {images.map((img, i) => (
              <motion.button
                key={img}
                onClick={() => setSelectedImg(img)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 12) * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                className="mb-4 w-full overflow-hidden rounded-[1.5rem] md:mb-6"
              >
                <img
                  src={`/images/whatsapp/${encodeURIComponent(img)}`}
                  alt="Interior project"
                  className="w-full object-cover transition-all duration-500 hover:scale-105"
                  loading="lazy"
                />
              </motion.button>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 cursor-pointer"
          >
            <motion.img
              key={selectedImg}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              src={`/images/whatsapp/${encodeURIComponent(selectedImg)}`}
              alt="Interior project"
              className="max-h-[90vh] max-w-[90vw] rounded-[1.5rem] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Clients() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <FadeUp>
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-gold-dark">
            客戶信賴
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tighter text-charcoal md:text-4xl">
            合作客戶
          </h2>
          <div className="mt-2 h-[2px] w-12 bg-gold/60" />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-3">
            {CLIENTS.map((c) => (
              <span
                key={c}
                className="rounded-full border border-stone/40 bg-white/60 px-5 py-2.5 text-sm font-medium text-charcoal/60 transition-all duration-300 hover:border-gold/30 hover:text-charcoal"
              >
                {c}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-36">
      <div className="absolute bottom-0 inset-x-0 h-[400px] bg-gradient-to-t from-charcoal to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="rounded-[2.5rem] bg-charcoal p-8 md:p-16 md:pb-20">
          <FadeUp>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold-light">
              聯絡
            </p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tighter text-white md:text-4xl">
              談談你的
              <br />
              空間
            </h2>
            <div className="mt-2 h-[2px] w-12 bg-gold/60" />
          </FadeUp>

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
            <FadeUp delay={0.1}>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Building size={18} className="mt-0.5 text-gold/70" weight="duotone" />
                  <div>
                    <p className="text-sm font-medium text-white">Accord Interiors Company</p>
                    <p className="mt-0.5 text-sm text-white/50">
                      將軍澳尚德邨尚禮樓 14 樓 1413 室
                      <br />
                      香港
                    </p>
                    <p className="mt-0.5 text-sm text-white/50">商業登記號碼 25453531</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone size={18} className="mt-0.5 text-gold/70" weight="duotone" />
                  <div>
                    <p className="text-sm text-white/50">董事</p>
                    <a
                      href={"tel:+852" + "4485 6645".replace(" ", "")}
                      className="text-sm font-medium text-white transition-colors hover:text-gold-light"
                    >
                      +852 4485 6645
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Envelope size={18} className="mt-0.5 text-gold/70" weight="duotone" />
                  <div>
                    <p className="text-sm text-white/50">一般查詢</p>
                    <a
                      href="mailto:accordinteriorscompanys@gmail.com"
                      className="text-sm font-medium text-white transition-colors hover:text-gold-light"
                    >
                      accordinteriorscompanys@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="space-y-5 text-sm leading-relaxed text-white/50">
                <p>
                  <span className="font-semibold text-white">Chan Chun Wai</span>
                  <br />
                  董事
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative mx-auto max-w-[1400px] px-6 pt-8">
        <p className="text-center text-xs text-charcoal/30">
          &copy; {new Date().getFullYear()} Accord Interiors Company. 版權所有。
        </p>
        <p className="mt-1 text-center text-xs text-charcoal/30">商業登記號碼 25453531</p>
        <p className="mt-2 text-center text-xs text-charcoal/40">
          <a href="/terms" className="hover:text-gold-dark">條款及細則</a>
          {" · "}
          <a href="/privacy" className="hover:text-gold-dark">私隱政策</a>
        </p>
      </div>
    </section>
  );
}

/* ─── Page ─── */

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Process />
        <Portfolio />
        <Gallery />
        <Clients />
        <Contact />
      </main>
      <MusicToggle />
    </>
  );
}
