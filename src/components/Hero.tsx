import { ArrowUpRight, ChevronDown, Flame } from 'lucide-react';
import SmokeEffect from './SmokeEffect';
import heroImage from '../img/Gachiakuta_World_Takeover.webp';
import { useLanguage } from '../context/LanguageContext';

const HERO_STATS = {
  mn: [
    { label: 'Сүйрсэн дүүргүүд', value: '07' },
    { label: 'Эргүүлд гарсан цэвэрлэгчид', value: '312' },
    { label: 'Хогийн араатнууд', value: '∞' },
  ],
  en: [
    { label: 'Districts in Ruin', value: '07' },
    { label: 'Cleaners Hunting', value: '312' },
    { label: 'Trash Beasts', value: '∞' },
  ],
  ja: [
    { label: '崩壊した区画', value: '07' },
    { label: '出動中のクリーナー', value: '312' },
    { label: 'トラッシュビースト', value: '∞' },
  ],
} as const;

const HERO_COPY = {
  mn: {
    tagline: 'Хогийн хотод тавтай морил — энд шүүлт булшлагдаж, хаягдлаас төрсөн баатрууд гэрэл рүү тэмцэн гардаг.',
    enter: 'Ертөнцөд нэвтрэх',
    trailer: 'Трейлер үзэх',
    alt: 'Gachiakuta - World Takeover бүтээлийн арт',
    liveReadout: 'Асар гүнзгий "Pit"-ээс шууд дамжуулалт (зохиолын ертөнцийн мэдээлэл)',
  },
  en: {
    tagline: 'Welcome to the City of Trash—where justice is buried and scrap-born legends claw their way back to the light.',
    enter: 'Enter the World',
    trailer: 'Watch Trailer',
    alt: 'Gachiakuta - World Takeover key art',
    liveReadout: 'Live readouts from the Pit (in-universe data)',
  },
  ja: {
    tagline: 'ゴミの街へようこそ――正義が埋もれ、廃材から生まれた伝説が光へ爪を立てる。',
    enter: '世界へ飛び込む',
    trailer: 'トレーラーを見る',
    alt: 'ガチアクタ World Takeover キーアート',
    liveReadout: 'ピットからのライブデータ（劇中設定）',
  },
} as const;

interface HeroProps {
  scrollY: number;
}

export default function Hero({ scrollY }: HeroProps) {
  const { language } = useLanguage();
  const heroCopy = HERO_COPY[language];
  const heroStats = HERO_STATS[language];

  return (
    <section
      id="hero"
      className="relative min-h-[640px] sm:min-h-[680px] lg:min-h-screen flex items-start justify-center overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20"
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.25}px)`,
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.25),_transparent_55%)]"></div>
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2088205/pexels-photo-2088205.jpeg')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black"></div>
        </div>
      </div>

      <SmokeEffect />

      <div className="absolute inset-0 bg-gradient-radial from-red-500/15 via-transparent to-transparent"></div>

      <div
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl lg:max-w-6xl"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
          opacity: Math.max(0, 1 - scrollY / 450),
        }}
      >
        <div className="mt-6 sm:mt-8 mb-10 overflow-hidden animate-slide-up">
          <img
            src={heroImage}
            alt={heroCopy.alt}
            className="mx-auto w-full max-w-3xl sm:max-w-4xl rounded-2xl border border-red-500/40 object-cover shadow-[0_0_45px_rgba(239,68,68,0.45)] backdrop-blur-sm"
          />
        </div>

        <div className="overflow-hidden mb-10">
          <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-gray-300 font-light tracking-wide animate-slide-up-delay italic max-w-2xl sm:max-w-3xl mx-auto">
            {heroCopy.tagline}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay">
          <a
            href="#story"
            className="group inline-flex items-center gap-3 px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-red-500 via-red-600 to-yellow-400 hover:via-red-500 transition-all duration-300 uppercase tracking-[0.3em] sm:tracking-[0.4em] font-semibold sm:font-bold shadow-[0_0_28px_rgba(239,68,68,0.5)] hover:shadow-[0_0_45px_rgba(239,68,68,0.9)] rounded-full text-sm sm:text-base"
          >
            {heroCopy.enter}
            <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
          <a
            href="#media"
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-3 sm:py-4 border border-yellow-400/60 hover:border-yellow-300 transition-all duration-300 uppercase tracking-[0.25em] sm:tracking-[0.35em] font-semibold sm:font-bold rounded-full text-yellow-300 hover:text-black hover:bg-yellow-400/90 backdrop-blur-sm text-sm sm:text-base"
          >
            {heroCopy.trailer}
            <Flame size={20} />
          </a>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 animate-fade-in-delay">
          <div className="text-[0.6rem] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gray-500">{heroCopy.liveReadout}</div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                 className="flex flex-col items-center rounded-2xl border border-white/5 bg-white/5 px-5 sm:px-6 py-4 sm:py-5 shadow-[0_0_25px_rgba(255,255,255,0.05)] backdrop-blur-sm min-w-[120px]"
              >
                 <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-[0_0_20px_rgba(239,68,68,0.35)]">
                  {stat.value}
                </span>
                 <span className="mt-2 text-[0.6rem] sm:text-xs md:text-sm uppercase tracking-[0.25em] sm:tracking-[0.35em] text-gray-400 text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#story"
         className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-20"
      >
         <ChevronDown size={32} className="text-red-500 sm:hidden" />
         <ChevronDown size={40} className="hidden sm:block text-red-500" />
      </a>
    </section>
  );
}
