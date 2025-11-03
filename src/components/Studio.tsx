import { Zap, Users, Award, Sparkles } from 'lucide-react';
import { useLanguage, type Language } from '../context/LanguageContext';

type StudioCard = {
  title: string;
  description: string;
};

type StudioStat = {
  label: string;
  value: string;
  detail: string;
};

type StudioContent = {
  heading: {
    white: string;
    yellow: string;
    subtitle: string;
  };
  cards: StudioCard[];
  marquee: {
    badge: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
  summary: {
    label: string;
    heading: string;
  };
  stats: StudioStat[];
  verify: {
    label: string;
    body: string;
  };
  footer: string;
};

const STUDIO_CONTENT: Record<Language, StudioContent> = {
  mn: {
    heading: {
      white: 'Bones',
      yellow: 'Студи',
      subtitle: 'Албан ёсны мэдээлэл // Gachiakuta аниме хөрвүүлэлт',
    },
    cards: [
      {
        title: 'Bones студи',
        description:
          '1998 онд байгуулагдсан Токио төвтэй анимейшн студи; Fullmetal Alchemist, My Hero Academia зэрэг бүтээлээрээ танигдсан.',
      },
      {
        title: 'Бүтээлийн баг',
        description:
          'Мангаг зохиолч, зураач Кей Урана болон түүний хамтрагч Хидэёши Андо бүтээсэн бөгөөд Kodansha хэвлэн нийтэлдэг.',
      },
      {
        title: 'Нээлтийн төлөвлөгөө',
        description:
          'Bones студи 2025 онд телевизийн цуврал аниме нээхээр бэлтгэж буйгаа 2024 оны албан мэдэгдлээр баталгаажуулсан.',
      },
    ],
    marquee: {
      badge: 'Албан ёсны мэдээний товчоо',
      body:
        'Gachiakuta бол Кей Уранагийн манга бөгөөд Bones студи 2025 онд аниме болгон хүргэхээр бэлтгэж байна. Албан ёсны шинэчлэлтийг Weekly Shonen Magazine болон Kodansha-ийн мэдэгдлээс баталгаажуулна уу.',
      primaryCta: 'Kodansha мэдээ',
      secondaryCta: 'Bones студийн сайт',
    },
    summary: {
      label: 'Шинэчлэлтийн тойм',
      heading: 'Үйлдвэрлэлийн мэдээлэл',
    },
    stats: [
      {
        label: 'Нээлтийн жил',
        value: '2025',
        detail: 'Bones студи аниме 2025 онд цацагдахыг 2024 оны албан мэдэгдлээр баталгаажуулсан.',
      },
      {
        label: 'Студийн байршил',
        value: 'Токио',
        detail: 'Bones нь Токио хотод төвтэй, Fullmetal Alchemist, Mob Psycho 100 зэрэг төсөл дээр ажилласан туршлагатай.',
      },
      {
        label: 'Эх сурвалж',
        value: 'Манга',
        detail: 'Gachiakuta манга 2022 оноос Weekly Shonen Magazine-д үргэлжилж хэвлэгдэж байна.',
      },
    ],
    verify: {
      label: 'Эх сурвалж шалгах',
      body: 'Албан ёсны мэдээлэл гармагц Bones болон Kodansha-ийн мэдэгдлийг дагаж шинэчилнэ үү.',
    },
    footer: '© 2025 DevCraft. Бүх эрх хуулиар хамгаалагдсан.',
  },
  en: {
    heading: {
      white: 'Bones',
      yellow: 'Studio',
      subtitle: 'Official brief // Gachiakuta anime adaptation',
    },
    cards: [
      {
        title: 'Bones Studio',
        description:
          'Tokyo-based animation studio founded in 1998, known for series such as Fullmetal Alchemist and My Hero Academia.',
      },
      {
        title: 'Creative Team',
        description:
          'The manga is created by writer-artist Kei Urana with collaborator Hideyoshi Ando and is published by Kodansha.',
      },
      {
        title: 'Release Plan',
        description:
          'Studio Bones confirmed in a 2024 statement that the TV anime is slated to premiere in 2025.',
      },
    ],
    marquee: {
      badge: 'Official intel bulletin',
      body:
        'Gachiakuta, the manga by Kei Urana, is being adapted into an anime by Studio Bones for a planned 2025 debut. Verify announcements via Weekly Shonen Magazine and Kodansha press releases.',
      primaryCta: 'Kodansha updates',
      secondaryCta: 'Visit Bones site',
    },
    summary: {
      label: 'Update summary',
      heading: 'Production intel',
    },
    stats: [
      {
        label: 'Target year',
        value: '2025',
        detail: 'Studio Bones reaffirmed a 2025 broadcast in their 2024 official announcement.',
      },
      {
        label: 'Studio HQ',
        value: 'Tokyo',
        detail: 'Bones operates out of Tokyo with a portfolio that includes Fullmetal Alchemist and Mob Psycho 100.',
      },
      {
        label: 'Source',
        value: 'Manga',
        detail: 'Gachiakuta has been serialized in Weekly Shonen Magazine since 2022.',
      },
    ],
    verify: {
      label: 'Verify sources',
      body: 'Monitor official statements from Bones and Kodansha for the latest confirmations.',
    },
    footer: '© 2025 DevCraft. All rights reserved.',
  },
  ja: {
    heading: {
      white: 'ボンズ',
      yellow: 'スタジオ',
      subtitle: '公式ブリーフ // ガチアクタ アニメ化情報',
    },
    cards: [
      {
        title: 'ボンズ',
        description: '1998年設立の東京拠点アニメスタジオ。『鋼の錬金術師』『僕のヒーローアカデミア』などで知られる。',
      },
      {
        title: '制作チーム',
        description: '漫画は浦菜ケイと安藤英由樹による共同制作で、講談社が刊行している。',
      },
      {
        title: '放送計画',
        description: 'ボンズは2024年の公式発表で、テレビアニメを2025年放送予定と確認した。',
      },
    ],
    marquee: {
      badge: '公式インテル速報',
      body:
        '『ガチアクタ』は浦菜ケイによる漫画で、ボンズが2025年放送を目標にアニメ化を進行中。最新情報は週刊少年マガジンおよび講談社のリリースで確認しよう。',
      primaryCta: '講談社アップデート',
      secondaryCta: 'ボンズ公式サイト',
    },
    summary: {
      label: 'アップデート概要',
      heading: '制作情報',
    },
    stats: [
      {
        label: '放送予定年',
        value: '2025',
        detail: '2024年の公式発表で2025年放送予定であることが再確認された。',
      },
      {
        label: 'スタジオ所在地',
        value: '東京',
        detail: 'ボンズは東京に拠点を置き、『鋼の錬金術師』『モブサイコ100』などを手掛けてきた。',
      },
      {
        label: '原作',
        value: '漫画',
        detail: '『ガチアクタ』は2022年から週刊少年マガジンで連載中。',
      },
    ],
    verify: {
      label: '情報確認',
      body: 'ボンズと講談社の公式発表を随時チェックして最新情報を把握しよう。',
    },
    footer: '© 2025 DevCraft. All rights reserved.',
  },
};

export default function Studio() {
  const { language } = useLanguage();
  const content = STUDIO_CONTENT[language];
  const cardIcons = [Zap, Users, Award] as const;

  return (
    <section id="studio" className="relative bg-gradient-to-b from-black via-slate-950 to-black py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.18),_transparent_70%)]"></div>
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-yellow-400"></div>
            <Sparkles size={28} className="text-yellow-400" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-yellow-400"></div>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-5 text-glow-yellow">
            <span className="text-white">{content.heading.white}</span>{' '}
            <span className="text-yellow-400">{content.heading.yellow}</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-400 tagline-track">
            {content.heading.subtitle}
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-3 mb-16 sm:mb-20">
          {content.cards.map((item, idx) => {
            const Icon = cardIcons[idx];
            return (
            <div
              key={item.title}
              className="group relative glass-panel rounded-3xl border border-yellow-400/25 p-6 sm:p-8 shadow-[0_0_45px_rgba(250,204,21,0.18)] transition-all duration-300 hover:border-yellow-400/60"
            >
              <div className="absolute -top-16 right-0 h-32 w-32 rounded-full bg-yellow-400/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-80"></div>

              <div className="relative z-10">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/15 transition-all duration-300 group-hover:scale-110 group-hover:bg-yellow-400/25">
                  <Icon size={30} className="text-yellow-300" />
                </div>
                <h3 className="mt-5 sm:mt-6 text-xl sm:text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">{item.description}</p>
              </div>

              <div className="absolute inset-0 rounded-3xl border border-yellow-400/10 opacity-0 transition duration-300 group-hover:opacity-100"></div>
            </div>
            );
          })}
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 items-stretch">
          <div className="relative overflow-hidden rounded-3xl border border-red-500/35 bg-black/40 p-8 sm:p-10 lg:p-12 text-center shadow-[0_0_55px_rgba(239,68,68,0.22)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/12 via-transparent to-yellow-400/12"></div>
            <div className="relative z-10">
              <div className="mb-8">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 glitch-text" data-text="GACHIUKUTA">
                  <span className="text-red-500">GACHI</span>
                  <span className="text-yellow-400">UKUTA</span>
                </div>
                <p className="mt-3 sm:mt-4 text-[0.7rem] sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.35em] text-gray-500">
                  {content.marquee.badge}
                </p>
              </div>

              <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
                {content.marquee.body}
              </p>

              <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
                <a
                  href="https://kodansha.us/series/gachiakuta/"
                  className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-red-500/40 bg-red-500/20 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] sm:tracking-[0.35em] transition-all duration-300 hover:bg-red-500 hover:text-black"
                >
                  {content.marquee.primaryCta}
                  <Zap size={16} />
                </a>
                <a
                  href="https://bones.co.jp"
                  className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-yellow-400/40 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] sm:tracking-[0.35em] text-yellow-300 transition-all duration-300 hover:bg-yellow-400 hover:text-black"
                >
                  {content.marquee.secondaryCta}
                  <Sparkles size={16} />
                </a>
              </div>
            </div>

            <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-red-500/15 blur-3xl"></div>
            <div className="absolute -top-16 -right-8 h-40 w-40 rounded-full bg-yellow-400/15 blur-3xl"></div>
          </div>

          <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 lg:p-10 shadow-[0_0_45px_rgba(15,23,42,0.55)] space-y-6 sm:space-y-8">
            <div>
              <p className="text-[0.7rem] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-gray-500">{content.summary.label}</p>
              <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-white">{content.summary.heading}</h3>
            </div>

            <div className="space-y-6">
              {content.stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-black/35 p-4 sm:p-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-[0.7rem] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-gray-500">{item.label}</p>
                    <span className="text-2xl sm:text-3xl font-bold text-yellow-400 text-glow-yellow">{item.value}</span>
                  </div>
                  <p className="mt-3 text-sm text-gray-300 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/35 p-4 sm:p-5">
              <p className="text-[0.7rem] sm:text-xs uppercase tracking-[0.32em] sm:tracking-[0.4em] text-gray-500">{content.verify.label}</p>
              <p className="mt-3 text-base sm:text-lg font-semibold text-white">{content.verify.body}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 text-center text-gray-600 text-xs sm:text-sm">
          <p>{content.footer}</p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>
    </section>
  );
}
