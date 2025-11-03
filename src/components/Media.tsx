import { ArrowRight, Disc3, Film, Music, Play, Waves } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage, type Language } from '../context/LanguageContext';
import heroImage from '../img/Gachiakuta_World_Takeover.webp';
import enjinShot from '../img/TSUTAYA_Store_Chibi_Merch.webp';
import volume06Cover from '../img/Volume_06.webp';
import volume07Cover from '../img/Volume_07.webp';
import volume08Cover from '../img/Volume_08.webp';

type MediaTrack = {
  id: string;
  title: string;
  duration: string;
  note: string;
  audioId?: keyof typeof AUDIO_SEQUENCES;
};

type AudioSegment = {
  frequency: number;
  length: number;
  gain?: number;
};

const AUDIO_SEQUENCES = {
  trashAndThunder: [
    { frequency: 82, length: 0.8, gain: 0.7 },
    { frequency: 196, length: 0.6, gain: 0.55 },
    { frequency: 131, length: 0.5, gain: 0.6 },
    { frequency: 262, length: 0.6, gain: 0.5 },
    { frequency: 98, length: 0.7, gain: 0.65 },
  ],
  pitPulse: [
    { frequency: 55, length: 1.1, gain: 0.65 },
    { frequency: 73, length: 0.9, gain: 0.6 },
    { frequency: 110, length: 0.8, gain: 0.55 },
    { frequency: 146, length: 0.7, gain: 0.5 },
    { frequency: 184, length: 0.6, gain: 0.45 },
  ],
} satisfies Record<string, AudioSegment[]>;

const createAudioBuffer = (ctx: AudioContext, sequenceId: keyof typeof AUDIO_SEQUENCES) => {
  const segments = AUDIO_SEQUENCES[sequenceId];
  if (!segments) {
    return null;
  }

  const sampleRate = ctx.sampleRate;
  const totalLengthSeconds = segments.reduce((acc, segment) => acc + segment.length, 0);
  const totalSamples = Math.max(1, Math.floor(totalLengthSeconds * sampleRate));
  const buffer = ctx.createBuffer(1, totalSamples, sampleRate);
  const channel = buffer.getChannelData(0);
  const twoPi = Math.PI * 2;
  let offset = 0;
  let phase = 0;

  segments.forEach((segment) => {
    const segmentSamples = Math.max(1, Math.floor(segment.length * sampleRate));
    for (let i = 0; i < segmentSamples && offset + i < totalSamples; i++) {
      const attack = Math.min(1, i / (sampleRate * 0.05));
      const release = Math.min(1, (segmentSamples - i) / (sampleRate * 0.08));
      const envelope = Math.min(attack, release);
      phase += (twoPi * segment.frequency) / sampleRate;
      const tone = Math.sin(phase);
      const noise = Math.random() * 2 - 1;
      channel[offset + i] = (tone * 0.7 + noise * 0.12) * (segment.gain ?? 0.5) * envelope;
    }
    offset += segmentSamples;
  });

  return buffer;
};

type MusicCard = {
  label: string;
  value: string;
};

type StudioLogEntry = {
  title: string;
  detail: string;
};

type MediaContent = {
  heading: {
    red: string;
    white: string;
    subtitle: string;
  };
  video: {
    heading: string;
    imageAlt: string;
    ariaLabel: string;
    badge: string;
    metaTitle: string;
    metaTags: string[];
  };
  gallery: {
    altPrefix: string;
    labelPrefix: string;
  };
  music: {
    heading: string;
    badge: string;
    statusTitle: string;
    statusSubtitle: string;
    featureCards: MusicCard[];
    trackList: MediaTrack[];
    trackInfoLabel: string;
    button: {
      play: string;
      pause: string;
    };
    albumAlt: string;
  };
  aside: {
    label: string;
    heading: string;
    logs: StudioLogEntry[];
    logPrefix: string;
    logSuffix: string;
    statsLabel: string;
    statsDescription: string;
    statsChannelsTitle: string;
    statsChannelsList: string;
    linksLabel: string;
    linksBody: string;
    ctaLabel: string;
  };
};

const MEDIA_CONTENT: Record<Language, MediaContent> = {
  mn: {
    heading: {
      red: 'Медиа',
      white: 'архив',
      subtitle: 'Дамжуулалт // баталгаатай мэдээллүүдийг эндээс шалгана уу',
    },
    video: {
      heading: 'Gachiakuta - Албан ёсны тизер (YouTube)',
      imageAlt: 'Gachiakuta тизерийн постер',
      ariaLabel: 'Албан ёсны Gachiakuta тизерийг YouTube дээр үзэх',
      badge: 'YouTube тизер',
      metaTitle: 'GACHIUKUTA Албан ёсны тизер',
      metaTags: ['Төрөл: Teaser PV', 'Эх сурвалж: YouTube'],
    },
    gallery: {
      altPrefix: 'Үзэгдэл',
      labelPrefix: 'Үзэгдэл',
    },
    music: {
      heading: 'Дуу хөгжмийн мэдээлэл',
      badge: 'OST // Мэдээлэл шинэчлэгдэнэ',
      statusTitle: 'Албан ёсны OST хараахан гараагүй',
      statusSubtitle: 'Зохиогчийн нэрсийг Bones студи дараа нь зарлана',
      featureCards: [
        {
          label: 'Уур амьсгал',
          value: 'Фэнүүдийн төсөөлсөн нео-ноир өнгө',
        },
        {
          label: 'Ашиглах хөгжим',
          value: 'Оркестр + синт (таамаг)',
        },
      ],
      trackList: [
        {
          id: 'official-placeholder',
          title: 'Албан ёсны дуу хөгжмийн жагсаалт хараахан нийтлэгдээгүй',
          duration: 'TBA',
          note: 'Мэдээллийн түвшин 1 — Студиас мэдээлэл гараагүй тул шинэчлэхийг хүлээнэ үү.',
        },
        {
          id: 'trash-and-thunder',
          title: 'Фэн найруулга - "Trash & Thunder"',
          duration: 'Concept',
          note: 'Мэдээллийн түвшин 2 — Аянгат хэмнэл бүхий синт рок туршилт.',
          audioId: 'trashAndThunder',
        },
        {
          id: 'pit-pulse',
          title: 'Фэн найруулга - "Pit Pulse"',
          duration: 'Concept',
          note: 'Мэдээллийн түвшин 3 — Pit-ийн гүн хэмнэл, амьсгалтай андуурсан амбиент.',
          audioId: 'pitPulse',
        },
      ],
      trackInfoLabel: 'Мэдээллийн түвшин',
      button: {
        play: 'Фэн найруулгыг сонсох',
        pause: 'Тоглуулалтыг түр зогсоох',
      },
      albumAlt: 'Альбомын хавтас',
    },
    aside: {
      label: 'Баталгаатай мэдээлэл',
      heading: 'Студийн мэдээллийн тэмдэглэл',
      logs: [
        {
          title: 'Эх сурвалж',
          detail: 'Gachiakuta нь зохиолч, зураач Кей Уранагийн бүтээл бөгөөд 2022 оноос Weekly Shonen Magazine-д хэвлэгдэж байна.',
        },
        {
          title: 'Аниме хөрвүүлэлт',
          detail: 'Bones студи 2025 онд цуврал аниме гаргахаар ажиллаж буйг албан ёсоор зарласан.',
        },
        {
          title: 'Албан ёсны эх сурвалж',
          detail: 'Шинэ мэдээг Kodansha-ийн вэбсайт болон албан ёсны сүлжээ суваг дээрээс баталгаажуулна уу.',
        },
      ],
      logPrefix: 'Тэмдэглэл',
      logSuffix: 'Эх сурвалжийг шалгана уу',
      statsLabel: 'Статистик',
      statsDescription: 'Албан ёсны тоон мэдээлэл зарлагдаагүй',
      statsChannelsTitle: 'Баталгаажуулах сувгууд',
      statsChannelsList: 'Kodansha, Bones',
      linksLabel: 'Албан ёсны холбоос',
      linksBody: 'Баталгаатай мэдээллийг Kodansha болон Bones студийн албан ёсны хэвлэл мэдээллийн сувгуудаас, мөн ирээдүйн трейлерүүдээс тогтмол шалгана уу.',
      ctaLabel: 'Студи хэсэг рүү шилжих',
    },
  },
  en: {
    heading: {
      red: 'Media',
      white: 'Archive',
      subtitle: 'Transmission // Verify official intel here',
    },
    video: {
      heading: 'Gachiakuta - Official Teaser (YouTube)',
      imageAlt: 'Gachiakuta teaser poster',
      ariaLabel: 'Watch the official Gachiakuta teaser on YouTube',
      badge: 'YouTube Teaser',
      metaTitle: 'GACHIUKUTA Official Teaser',
      metaTags: ['Type: Teaser PV', 'Source: YouTube'],
    },
    gallery: {
      altPrefix: 'Scene',
      labelPrefix: 'Scene',
    },
    music: {
      heading: 'Soundtrack Intel',
      badge: 'OST // Updates Pending',
      statusTitle: 'Official OST not yet released',
      statusSubtitle: 'Composer credits will be announced by Studio Bones.',
      featureCards: [
        {
          label: 'Tone',
          value: 'Fan-imagined neo-noir hues',
        },
        {
          label: 'Instrumentation',
          value: 'Orchestra + synth (speculative)',
        },
      ],
      trackList: [
        {
          id: 'official-placeholder',
          title: 'Official soundtrack listing not yet published',
          duration: 'TBA',
          note: 'Intel Level 1 — Awaiting official release notes from the studio.',
        },
        {
          id: 'trash-and-thunder',
          title: 'Fan mix - "Trash & Thunder"',
          duration: 'Concept',
          note: 'Intel Level 2 — Fan-built synth rock with industrial thunder accents.',
          audioId: 'trashAndThunder',
        },
        {
          id: 'pit-pulse',
          title: 'Fan mix - "Pit Pulse"',
          duration: 'Concept',
          note: 'Intel Level 3 — Underground ambience inspired by the Pit heartbeat.',
          audioId: 'pitPulse',
        },
      ],
      trackInfoLabel: 'Intel level',
      button: {
        play: 'Play fan mix',
        pause: 'Pause playback',
      },
      albumAlt: 'Album cover',
    },
    aside: {
      label: 'Verified Intel',
      heading: 'Studio briefing log',
      logs: [
        {
          title: 'Source',
          detail: 'Gachiakuta is a manga by creator Kei Urana, serialized in Weekly Shonen Magazine since 2022.',
        },
        {
          title: 'Anime adaptation',
          detail: 'Studio Bones officially announced an anime adaptation slated for 2025.',
        },
        {
          title: 'Official channels',
          detail: 'Confirm fresh updates via Kodansha\'s site and official social accounts.',
        },
      ],
      logPrefix: 'Log',
      logSuffix: 'Verify sources',
      statsLabel: 'Statistics',
      statsDescription: 'Official metrics pending',
      statsChannelsTitle: 'Verification channels',
      statsChannelsList: 'Kodansha, Bones',
      linksLabel: 'Official links',
      linksBody: 'Check Kodansha and Studio Bones official channels and upcoming trailers for verified updates.',
      ctaLabel: 'Jump to Studio section',
    },
  },
  ja: {
    heading: {
      red: 'メディア',
      white: 'アーカイブ',
      subtitle: 'トランスミッション // 公式情報はこちらで確認',
    },
    video: {
      heading: 'ガチアクタ - 公式ティザー (YouTube)',
      imageAlt: 'ガチアクタ ティザーポスター',
      ariaLabel: 'YouTubeでガチアクタ公式ティザーを見る',
      badge: 'YouTube ティザー',
      metaTitle: 'GACHIUKUTA 公式ティザー',
      metaTags: ['種別: ティザーPV', '出典: YouTube'],
    },
    gallery: {
      altPrefix: 'シーン',
      labelPrefix: 'シーン',
    },
    music: {
      heading: 'サウンドトラック情報',
      badge: 'OST // 情報更新予定',
      statusTitle: '公式OSTは未公開',
      statusSubtitle: '作曲者クレジットは後日ボンズが発表予定。',
      featureCards: [
        {
          label: 'トーン',
          value: 'ファンが想像するネオノワールの色彩',
        },
        {
          label: '編成',
          value: 'オーケストラ＋シンセ（予想）',
        },
      ],
      trackList: [
        {
          id: 'official-placeholder',
          title: '公式サウンドトラック曲目は未公開',
          duration: 'TBA',
          note: '情報レベル1 — スタジオ公式発表を待機中。',
        },
        {
          id: 'trash-and-thunder',
          title: 'ファンメイドミックス - "Trash & Thunder"',
          duration: 'Concept',
          note: '情報レベル2 — ファン制作の雷鳴シンセロック実験。',
          audioId: 'trashAndThunder',
        },
        {
          id: 'pit-pulse',
          title: 'ファンメイドミックス - "Pit Pulse"',
          duration: 'Concept',
          note: '情報レベル3 — ピットの鼓動をイメージしたアンビエントトラック。',
          audioId: 'pitPulse',
        },
      ],
      trackInfoLabel: '情報レベル',
      button: {
        play: 'ファンミックスを再生',
        pause: '再生を一時停止',
      },
      albumAlt: 'アルバムカバー',
    },
    aside: {
      label: '検証済み情報',
      heading: 'スタジオブリーフィングログ',
      logs: [
        {
          title: 'ソース',
          detail: 'ガチアクタは浦菜ケイによる漫画で、2022年から週刊少年マガジンで連載中。',
        },
        {
          title: 'アニメ化',
          detail: 'ボンズが2025年放送予定のアニメ化を正式発表。',
        },
        {
          title: '公式チャンネル',
          detail: '最新情報は講談社公式サイトと公式SNSで確認を。',
        },
      ],
      logPrefix: 'ログ',
      logSuffix: 'ソースを確認',
      statsLabel: '統計',
      statsDescription: '公式数値は未発表',
      statsChannelsTitle: '確認チャネル',
      statsChannelsList: '講談社、ボンズ',
      linksLabel: '公式リンク',
      linksBody: '講談社とボンズの公式メディア、および今後のティザーを定期的にチェックしてください。',
      ctaLabel: 'スタジオセクションへ',
    },
  },
};

export default function Media() {
  const { language } = useLanguage();
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const content = MEDIA_CONTENT[language];
  const galleryShots = useMemo(
    () => [
      { src: volume06Cover, label: 6 },
      { src: volume07Cover, label: 7 },
      { src: volume08Cover, label: 8 },
    ],
    []
  );
  const ambientGlow = activeTrackId
    ? 'shadow-[0_0_35px_rgba(239,68,68,0.55)]'
    : 'shadow-[0_0_20px_rgba(239,68,68,0.3)]';

  const stopPlayback = useCallback(() => {
    if (sourceRef.current) {
      try {
        sourceRef.current.stop();
      } catch (error) {
        console.warn('Failed to stop audio source', error);
      }
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      audioContextRef.current.suspend().catch(() => undefined);
    }

    setActiveTrackId(null);
  }, []);

  const playTrack = useCallback(
    async (audioId: keyof typeof AUDIO_SEQUENCES) => {
      stopPlayback();

      let ctx = audioContextRef.current;
      if (!ctx) {
        ctx = new AudioContext();
        audioContextRef.current = ctx;
      }

      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const buffer = createAudioBuffer(ctx, audioId);
      if (!buffer) {
        return;
      }

      const source = ctx.createBufferSource();
      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.9;

      source.buffer = buffer;
      source.connect(gainNode).connect(ctx.destination);
      source.start();

      sourceRef.current = source;
      setActiveTrackId(audioId);

      source.onended = () => {
        sourceRef.current = null;
        setActiveTrackId((current) => (current === audioId ? null : current));
      };
    },
    [stopPlayback]
  );

  useEffect(() => {
    return () => {
      stopPlayback();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => undefined);
        audioContextRef.current = null;
      }
    };
  }, [stopPlayback]);

  const handleTrackToggle = async (track: MediaTrack) => {
    if (!track.audioId) {
      return;
    }

    if (activeTrackId === track.audioId) {
      stopPlayback();
      return;
    }

    await playTrack(track.audioId);
  };

  const handlePrimaryButton = () => {
    const firstPlayable = content.music.trackList.find((track) => track.audioId);
    if (!firstPlayable?.audioId) {
      return;
    }

    if (activeTrackId) {
      stopPlayback();
    } else {
      void playTrack(firstPlayable.audioId);
    }
  };

  return (
    <section id="media" className="relative bg-black py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.12),_transparent_68%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-slate-950"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-14 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-5">
            <span className="text-red-500 text-glow-red">{content.heading.red}</span>{' '}
            <span className="text-white">{content.heading.white}</span>
          </h2>
          <div className="mx-auto w-48 divider-line"></div>
          <p className="mt-4 sm:mt-6 text-[0.7rem] sm:text-sm md:text-base uppercase tracking-[0.32em] sm:tracking-[0.45em] text-gray-500">
            {content.heading.subtitle}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 items-start">
          <div className="space-y-10 sm:space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <Film size={28} className="text-yellow-400" />
                <h3 className="text-2xl sm:text-3xl font-bold">{content.video.heading}</h3>
              </div>
              <div className={`relative aspect-[16/9] overflow-hidden rounded-3xl border border-yellow-400/35 glass-panel ${ambientGlow} transition-shadow duration-500`}>
                <img
                  src={heroImage}
                  alt={content.video.imageAlt}
                  className="h-full w-full object-cover brightness-[0.85]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/45 to-black"></div>

                <a
                  href="https://youtu.be/hQjGJJ23BCE?si=DumVIjSs-vKggJdm"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={content.video.ariaLabel}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-full border border-red-500/40 bg-red-500/70 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-red-500">
                    <Play size={28} className="text-white sm:ml-1" fill="white" />
                  </div>
                </a>

                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-2 sm:gap-3 rounded-full border border-white/15 bg-black/50 px-3 sm:px-5 py-1.5 sm:py-2 text-[0.65rem] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.35em] text-gray-200">
                  {content.video.badge}
                  <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent p-5 sm:p-6">
                  <p className="text-white text-xl sm:text-2xl font-semibold">{content.video.metaTitle}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gray-400">
                    {content.video.metaTags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {galleryShots.map((shot) => (
                <div
                  key={shot.src}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-sm transition-all duration-500 hover:border-red-500/45"
                >
                  <img
                    src={shot.src}
                    alt={`${content.gallery.altPrefix} ${shot.label}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="absolute bottom-3 left-3 text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-gray-300">
                    {content.gallery.labelPrefix} {shot.label}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <Music size={28} className="text-red-500" />
                <h3 className="text-2xl sm:text-3xl font-bold">{content.music.heading}</h3>
              </div>
              <div className="glass-panel rounded-3xl border border-red-500/25 p-6 sm:p-8 lg:p-10 shadow-[0_0_55px_rgba(239,68,68,0.22)]">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8 mb-8 lg:mb-10">
                  <div className="relative w-full max-w-[200px] sm:max-w-[220px] aspect-square overflow-hidden rounded-2xl border border-yellow-400/40 shadow-[0_0_40px_rgba(250,204,21,0.22)] mx-auto lg:mx-0">
                    <img src={enjinShot} alt={content.music.albumAlt} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent"></div>
                    <span className="absolute bottom-3 left-3 text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-yellow-300">
                      {content.music.badge}
                    </span>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h4 className="text-2xl sm:text-3xl font-bold text-yellow-400">{content.music.statusTitle}</h4>
                    <p className="mt-3 text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.35em] text-gray-400">
                      {content.music.statusSubtitle}
                    </p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {content.music.featureCards.map((card) => (
                        <div key={card.label} className="rounded-2xl border border-white/10 p-4 backdrop-blur-sm">
                          <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-gray-400">{card.label}</p>
                          <p className="mt-2 text-base sm:text-lg font-semibold text-white">{card.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {content.music.trackList.map((track, index) => {
                    const isActive = track.audioId ? track.audioId === activeTrackId : false;
                    const isDisabled = !track.audioId;
                    const buttonClasses = isDisabled
                      ? 'flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-gray-700 bg-gray-900 text-gray-600 cursor-not-allowed'
                      : isActive
                        ? 'flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-red-500 bg-red-500 text-black transition-all duration-300 hover:bg-red-400'
                        : 'flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-300 transition-all duration-300 hover:bg-red-500 hover:text-black';

                    return (
                      <div
                        key={track.id}
                        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 rounded-2xl border px-4 py-3 transition-all duration-300 ${
                          isActive ? 'border-red-500/60 bg-red-500/15' : 'border-white/10 bg-black/40 hover:border-red-500/45 hover:bg-red-500/10'
                        }`}
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <button
                            type="button"
                            onClick={() => handleTrackToggle(track)}
                            disabled={isDisabled}
                            aria-pressed={isActive}
                            className={buttonClasses}
                          >
                            {isActive ? (
                              <Waves size={14} className="text-black" />
                            ) : (
                              <Play size={14} className={isDisabled ? 'text-gray-600' : 'text-current'} />
                            )}
                          </button>
                          <div>
                            <p className="text-white text-sm sm:text-base font-medium uppercase tracking-[0.2em]">{track.title}</p>
                            <p className="text-[0.65rem] sm:text-xs text-gray-500 uppercase tracking-[0.3em] sm:tracking-[0.35em]">
                              {content.music.trackInfoLabel} {index + 1} · {track.duration}
                            </p>
                            <p className="mt-1 text-[0.65rem] sm:text-xs text-gray-400 leading-relaxed">{track.note}</p>
                          </div>
                        </div>
                        <span className="text-gray-400 text-[0.7rem] sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.35em]">
                          {track.audioId ? 'Audio' : '—'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={handlePrimaryButton}
                  className={`mt-8 lg:mt-10 flex w-full items-center justify-center gap-3 rounded-full border border-red-500/40 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] sm:tracking-[0.35em] transition-all duration-300 ${
                    activeTrackId
                      ? 'bg-red-500 text-black hover:bg-red-400'
                      : 'bg-red-500/20 text-red-200 hover:bg-red-500 hover:text-black'
                  }`}
                >
                  {activeTrackId ? (
                    <>
                      <Waves size={18} />
                      {content.music.button.pause}
                    </>
                  ) : (
                    <>
                      <Disc3 size={18} />
                      {content.music.button.play}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <aside className="glass-panel rounded-3xl border border-white/10 px-6 sm:px-8 py-8 sm:py-12 shadow-[0_0_45px_rgba(15,23,42,0.55)]">
            <div className="space-y-8 sm:space-y-10">
              <div>
                <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-gray-500">{content.aside.label}</p>
                <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-white">{content.aside.heading}</h3>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {content.aside.logs.map((entry, index) => (
                  <div
                    key={entry.title}
                    className="relative rounded-2xl border border-white/10 bg-black/35 p-5 sm:p-6 transition-all duration-300 hover:border-red-500/45 hover:bg-red-500/10"
                  >
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[0.65rem] sm:text-xs uppercase tracking-[0.26em] sm:tracking-[0.3em] text-gray-500">
                      <span>{`${content.aside.logPrefix} ${index + 1}`}</span>
                      <span className="h-0.5 w-6 sm:w-8 bg-red-500/60"></span>
                      <span>{content.aside.logSuffix}</span>
                    </div>
                    <h4 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-white">{entry.title}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-gray-300">{entry.detail}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/35 p-5 sm:p-6">
                <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.32em] sm:tracking-[0.4em] text-gray-500">{content.aside.statsLabel}</p>
                <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-4xl sm:text-5xl font-bold text-yellow-400 text-glow-yellow">TBA</p>
                    <p className="mt-2 text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-gray-400">{content.aside.statsDescription}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl sm:text-2xl font-semibold text-white">{content.aside.statsChannelsTitle}</p>
                    <p className="mt-1 text-sm uppercase tracking-[0.3em] sm:tracking-[0.35em] text-gray-400">{content.aside.statsChannelsList}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/35 p-5 sm:p-6">
                <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.32em] sm:tracking-[0.4em] text-gray-500">{content.aside.linksLabel}</p>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">{content.aside.linksBody}</p>
                <a
                  href="#studio"
                  className="mt-5 sm:mt-6 inline-flex items-center gap-2 sm:gap-3 rounded-full border border-yellow-400/40 px-5 sm:px-6 py-2.5 sm:py-3 text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.28em] sm:tracking-[0.35em] text-yellow-300 transition-all duration-300 hover:bg-yellow-400 hover:text-black"
                >
                  {content.aside.ctaLabel}
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
