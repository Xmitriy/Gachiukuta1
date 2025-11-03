import storyGrid from '../img/Gachiakuta_Teaser_Visual_1.webp';
import { useLanguage, type Language } from '../context/LanguageContext';

interface StoryWorldProps {
  scrollY: number;
}

type StoryHighlight = {
  heading: string;
  detail: string;
};
type StoryTimelineEntry = {
  year: string;
  title: string;
  summary: string;
};
type StoryContent = {
  titleRed: string;
  titleWhite: string;
  subtitle: string;
  quote: string;
  paragraphs: string[];
  highlights: StoryHighlight[];
  conflictLine: string;
  timeline: StoryTimelineEntry[];
  closingLine: string;
  imageAlt: string;
  badgeLeft: string;
  badgeRight: string;
  missionLabel: string;
  missionBody: string;
  missionIntel: string;
};

const STORY_CONTENT: Record<Language, StoryContent> = {
  mn: {
    titleRed: 'Түүхийн',
    titleWhite: 'тэмдэглэл',
    subtitle: 'Хяналтын бүртгэл // 06-р түвшний зөвшөөрөл шаардана',
    quote: '"Гүн харанхуйд гэрэл хүртэл болгоомжилдог..."',
    paragraphs: [
      'Хот хоёр туйлд хуваагдсан. Дээр нь хиймэл амлалтаар гялалзах цэвэрхэн цамхагууд. Доор нь, хаягдсан гүн дэх Pit оршино — орхигдсон мөрөөдөл, хагарсан сэтгэлүүдийн цөлөрхөг. Хог бол валют, нууц бол хүч.',
      'Рүдо үйлдээгүй хэргийнхээ төлөө цаазаар тогтоогдсон ч нурсан эд ангид нуугдмал чичиргээг олж харна. Боолт, хэлхээ, зэвтэй хоолой бүр унтарсан хилэнгээр доргиж, шударга ёсны зэвсэг болохыг хүлээнэ.',
    ],
    highlights: [
      {
        heading: 'Дээд хот',
        detail: 'Толиор бүрхэгдсэн цамхаг, толботойд дургүй гудамжууд, хүйтэн хайлшаар сийлсэн хууль дүрэм.',
      },
      {
        heading: 'Pit',
        detail: 'Хаягдлын лабиринт; цөллөг нь үхэл, амьд үлдэх нь урлаг болдог доод ертөнц.',
      },
      {
        heading: 'Хогийн цохилт',
        detail: 'Энергийн мэдрэгчүүд хэтрэлт заана — хаягдал нуугдмал чадварт хариу үйлдэл үзүүлж буй шинж.',
      },
    ],
    conflictLine:
      'Цэвэрлэгчид айдасаар ноёрхоно. Хогийн араатнууд өлсгөлөн тэнүүчлэнэ. Тэдний дунд бослого дөл болон асна.',
    timeline: [
      {
        year: '1-р үе',
        title: 'Уналт',
        summary: 'Рүдо гүнлэг рүү цөлөгдөн, урвагч гэж тамгалагдан, эсэргүүцлээс өөр зэвсэггүй үлдэнэ.',
      },
      {
        year: '2-р үе',
        title: 'Сэргэлт',
        summary: 'Түүний уур хилэн хогийг сэрээж, зэвсэгжсэн хаягдал неон улаан цахилгаантай цохилно.',
      },
      {
        year: '3-р үе',
        title: 'Үл мэдэгдэх оч',
        summary: 'Үнснээс хамтран зүтгэгчид мэндэлнэ — Энджин, Энжин болон мартагдсан босогчдын бүлэг.',
      },
    ],
    closingLine: 'Энэ бол баатрын домог биш. Энэ бол амьд үлдэхийн тухай өгүүлэмж.',
    imageAlt: 'Pit-ийн тандалтын сүлжээ',
    badgeLeft: 'Pit тандалт',
    badgeRight: 'Зөвшөөрөл: Redline',
    missionLabel: 'Даалгаврын товчоон',
    missionBody: 'Цэвэрлэгчид доод түвшинг цэвэрлэхээс өмнө олдворын цөмийг хамгаал.',
    missionIntel: 'Тагнуулын зэрэглэл: тогтворгүй',
  },
  en: {
    titleRed: 'The',
    titleWhite: 'Story',
    subtitle: 'Surveillance log // Level 06 clearance required',
    quote: '"In the depths of the abyss, where light fears to tread..."',
    paragraphs: [
      'The city stands divided. Above, pristine towers gleam with false promise. Below, in the forgotten depths, lies the Pit — a wasteland of discarded dreams and broken souls. Trash is currency. Secrets are power.',
      'Rudo, condemned for a crime he did not commit, discovers a resonance hidden inside the wreckage. Every bolt, circuit, and rusted pipe hums with dormant fury, waiting to be forged into justice.',
    ],
    highlights: [
      {
        heading: 'Upper City',
        detail: 'Sterile towers, spotless streets, and laws carved in cold alloy.',
      },
      {
        heading: 'The Pit',
        detail: 'A labyrinth of refuse where exile is a sentence and survival an art.',
      },
      {
        heading: 'Trash Pulse',
        detail: 'Energy readings spike — scrap reacting to latent abilities.',
      },
    ],
    conflictLine:
      'The Cleaners rule through fear. The Trash Beasts prowl in hunger. Between them, rebellion catches fire.',
    timeline: [
      {
        year: 'Cycle 1',
        title: 'The Fall',
        summary: 'Rudo is cast into the depths, branded a traitor, armed with nothing but defiance.',
      },
      {
        year: 'Cycle 2',
        title: 'Awakening',
        summary: 'The trash answers his rage; weaponized scraps arc with neon-red lightning.',
      },
      {
        year: 'Cycle 3',
        title: 'Embers Rise',
        summary: 'Allies emerge from ash — Engine, Enjin, and the forsaken rebel cells.',
      },
    ],
    closingLine: 'This is not a story of heroes. This is a story of survival.',
    imageAlt: 'Pit surveillance grid',
    badgeLeft: 'Pit Recon',
    badgeRight: 'Clearance: Redline',
    missionLabel: 'Mission Brief',
    missionBody: 'Secure the artifact core before the Cleaners purge the lower levels.',
    missionIntel: 'Intel rating: volatile',
  },
  ja: {
    titleRed: 'ストーリー',
    titleWhite: '記録',
    subtitle: '監視ログ // レベル06の許可が必要',
    quote: '「光さえ踏み入ることを恐れる深淵で…」',
    paragraphs: [
      '街は二つに分断されている。上層には偽りの希望で輝く清潔な塔。下層の忘れられた深部にはピットがあり、捨てられた夢と砕けた魂の荒野が広がる。ゴミは通貨であり、秘密は力だ。',
      '濡れ衣を着せられたルドは、瓦礫の中に眠る共鳴を見つける。ボルトも回路も錆びた配管も潜む怒りで唸り、正義の武器となる瞬間を待っている。',
    ],
    highlights: [
      {
        heading: '上層都市',
        detail: '無菌の塔、汚れ知らずの街路、冷たい合金に刻まれた法律。',
      },
      {
        heading: 'ピット',
        detail: '追放が宣告であり、生存が芸術となる廃棄物の迷宮。',
      },
      {
        heading: 'トラッシュパルス',
        detail: 'エネルギー値が急上昇。潜在能力に反応するスクラップが鼓動する。',
      },
    ],
    conflictLine:
      'クリーナーは恐怖で支配し、トラッシュビーストは飢えに駆られて徘徊する。その狭間で反乱の炎が燃え上がる。',
    timeline: [
      {
        year: 'サイクル1',
        title: '堕落',
        summary: 'ルドは深淵へ投げ込まれ、裏切り者の烙印を押され、反抗心だけを武器に残される。',
      },
      {
        year: 'サイクル2',
        title: '覚醒',
        summary: '怒りに応えたスクラップが赤いネオンを帯び、武器として雷光を走らせる。',
      },
      {
        year: 'サイクル3',
        title: '燻る火種',
        summary: '灰の中から仲間が現れる――エンジン、エンジン、そして見捨てられた反乱細胞たちだ。',
      },
    ],
    closingLine: 'これは英雄譚ではない。生き延びるための物語だ。',
    imageAlt: 'ピット監視グリッド',
    badgeLeft: 'ピット偵察',
    badgeRight: '許可: レッドライン',
    missionLabel: '任務概要',
    missionBody: 'クリーナーが下層を粛清する前にアーティファクトのコアを確保せよ。',
    missionIntel: '諜報評価: 不安定',
  },
};

export default function StoryWorld({ scrollY }: StoryWorldProps) {
  const { language } = useLanguage();
  const content = STORY_CONTENT[language];
  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 768;
  const rawParallax = (scrollY - 800) * 0.18;
  const parallaxOffset = isSmallScreen ? 0 : Math.max(Math.min(rawParallax, 160), -120);

  return (
    <section id="story" className="relative bg-black py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.2),_transparent_62%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-gray-950"></div>
      </div>

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-14 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-glow-red">
            <span className="text-red-500">{content.titleRed}</span>{' '}
            <span className="text-white">{content.titleWhite}</span>
          </h2>
          <div className="mx-auto w-40 divider-line"></div>
          <p className="mt-4 sm:mt-6 text-[0.65rem] sm:text-sm md:text-base uppercase tracking-[0.32em] sm:tracking-[0.4em] text-gray-500">
            {content.subtitle}
          </p>
        </div>

        <div className="grid gap-12 sm:gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 items-start">
          <div className="space-y-8 sm:space-y-10 text-gray-300 leading-relaxed">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light italic text-red-400 animate-slide-up">
              {content.quote}
            </p>

            {content.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-sm sm:text-base md:text-lg">
                {paragraph}
              </p>
            ))}

            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
              {content.highlights.map((highlight) => (
                <div
                  key={highlight.heading}
                  className="rounded-2xl border border-red-500/15 bg-white/5 p-5 sm:p-6 shadow-[0_0_35px_rgba(239,68,68,0.12)] backdrop-blur-sm animate-fade-in-delay"
                >
                  <h3 className="text-xs sm:text-sm uppercase tracking-[0.28em] sm:tracking-[0.35em] text-red-400 mb-2 sm:mb-3">
                    {highlight.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{highlight.detail}</p>
                </div>
              ))}
            </div>

            <p className="text-base sm:text-lg font-semibold text-white">
              {content.conflictLine}
            </p>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
              {content.timeline.map((entry, index) => (
                <div
                  key={entry.title}
                  className="glass-panel rounded-2xl p-5 sm:p-6 border border-white/5 shadow-[0_0_25px_rgba(15,23,42,0.5)]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-[0.65rem] sm:text-xs uppercase tracking-[0.34em] sm:tracking-[0.45em] text-gray-400">{entry.year}</span>
                  <h4 className="mt-3 text-lg sm:text-xl font-bold text-white">{entry.title}</h4>
                  <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed">{entry.summary}</p>
                </div>
              ))}
            </div>

            <p className="text-lg sm:text-xl font-bold text-white mt-8">
              {content.closingLine}
            </p>
          </div>

          <div className="relative">
            <div
              className="hidden md:block absolute -top-20 -right-20 h-72 w-72 rounded-full bg-red-500/20 blur-3xl opacity-70 animate-drift"
              style={{ transform: `translateY(${parallaxOffset * 0.7}px)` }}
            ></div>
            <div
              className="hidden md:block absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-yellow-400/20 blur-3xl opacity-60 animate-drift"
              style={{ transform: `translateY(${-parallaxOffset * 0.6}px)` }}
            ></div>

            <div
              className="relative z-10 overflow-hidden rounded-3xl border border-red-500/25 shadow-[0_0_45px_rgba(239,68,68,0.23)]"
              style={{ transform: `translateY(${parallaxOffset}px)` }}
            >
              <img
                src={storyGrid}
                alt={content.imageAlt}
                className="h-[360px] sm:h-[420px] lg:h-[520px] w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/40 to-transparent"></div>

              <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-2 text-[0.65rem] sm:text-xs uppercase tracking-[0.32em] sm:tracking-[0.4em] text-gray-400">
                <span className="whitespace-nowrap">{content.badgeLeft}</span>
                <span className="whitespace-nowrap">{content.badgeRight}</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5 sm:p-6">
                <p className="text-[0.7rem] sm:text-sm uppercase tracking-[0.28em] sm:tracking-[0.35em] text-red-400">{content.missionLabel}</p>
                <p className="mt-3 text-base sm:text-lg font-semibold text-white">
                  {content.missionBody}
                </p>
                <p className="mt-2 text-[0.7rem] sm:text-xs text-gray-400 uppercase tracking-[0.28em] sm:tracking-[0.35em]">
                  {content.missionIntel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent"></div>
    </section>
  );
}
