import { Mic, Sword, Shield } from 'lucide-react';
import CharacterCard, { type Character } from './CharacterCard';
import rudoImage from '../img/Rudo_Surebrec_Full.webp';
import engineImage from '../img/Engine_Full.webp';
import enjinImage from '../img/TamzyFull.webp';
import zodylImage from '../img/Riyou_Full.webp';
import { useLanguage, type Language } from '../context/LanguageContext';

type CharactersContent = {
  heading: {
    red: string;
    white: string;
    subtitle: string;
  };
  roster: Character[];
  legend: {
    voice: string;
    weapon: string;
    affiliation: string;
  };
};

const CHARACTERS_CONTENT: Record<Language, CharactersContent> = {
  mn: {
    heading: {
      red: 'Харанхуйн',
      white: 'ирмэгт',
      subtitle: 'Дотоод бүртгэл // Цэвэрлэгчдийн төвөөс өндөр эрсдэлтэй жагсаасан хүмүүс',
    },
    roster: [
      {
        name: 'Rudo',
        title: 'Хөөгдсөн нэгэн',
        image: rudoImage,
        voice: 'Албан ёсоор зарлаагүй',
        weapon: 'Хогийн бээлий',
        affiliation: 'Pit-ийн оршин суугч',
        bio: 'Хууль бусаар Pit-д цөлөгдсөн Рүдо хаягдлыг өшөө авалтын зэвсэг болгох хүчээ нээнэ.',
      },
      {
        name: 'Enjin',
        title: 'Залгамжлагч багш',
        image: engineImage,
        voice: 'Албан ёсоор зарлаагүй',
        weapon: 'Хаягдал ир',
        affiliation: 'Цэвэрлэгчдийн экс гишүүн',
        bio: 'Элит Цэвэрлэгч байсан ч сохор үнэнч байдлын оронд Pit-ийг сонгосон. Одоо орхигдсон хүмүүст тулалдах ухаан заадаг.',
      },
      {
        name: 'Tamzy',
        title: 'Галын дөл',
        image: enjinImage,
        voice: 'Албан ёсоор зарлаагүй',
        weapon: 'Асаргалуур',
        affiliation: 'Эсэргүүцлийн бүлэг',
        bio: 'Гал дотор төрж, уур хилэнгээр хатаагдсан. Тэр завхралыг өршөөлгүй нарийвчлалтайгаар шатаадаг.',
      },
      {
        name: 'Riyo',
        title: 'Хатуу гүйцэтгэгч',
        image: zodylImage,
        voice: 'Албан ёсоор зарлаагүй',
        weapon: 'Хуулийн сэлэм',
        affiliation: 'Цэвэрлэгчид',
        bio: 'Дээд хотын төмөр нударга. Түүний хувьд дэг журам туйлын үнэ цэн, өршөөл бол сул тал.',
      },
    ],
    legend: {
      voice: 'Дуу оруулагч',
      weapon: 'Зэвсэг',
      affiliation: 'Харьяалал',
    },
  },
  en: {
    heading: {
      red: 'Edge of',
      white: 'Darkness',
      subtitle: 'Internal dossier // High-risk entities flagged by Cleaner HQ',
    },
    roster: [
      {
        name: 'Rudo',
        title: 'The Exiled One',
        image: rudoImage,
        voice: 'Officially unannounced',
        weapon: 'Trash Gauntlets',
        affiliation: 'Pit resident',
        bio: 'Wrongfully cast into the Pit, Rudo unlocks the power to forge discarded scrap into weapons of vengeance.',
      },
      {
        name: 'Engine',
        title: 'Successor Mentor',
        image: engineImage,
        voice: 'Officially unannounced',
        weapon: 'Scrap Blade',
        affiliation: 'Former Cleaner operative',
        bio: 'Once an elite Cleaner, he chose the Pit over blind obedience. Now he trains the forgotten to fight back.',
      },
      {
        name: 'Enjin',
        title: 'Blazing Catalyst',
        image: enjinImage,
        voice: 'Officially unannounced',
        weapon: 'Incinerator Halberd',
        affiliation: 'Resistance cell',
        bio: 'Born of fire and tempered by fury, Enjin scorches corruption with merciless precision.',
      },
      {
        name: 'Zodyl',
        title: 'Iron Enforcer',
        image: zodylImage,
        voice: 'Officially unannounced',
        weapon: 'Lawbringer Sword',
        affiliation: 'Cleaners',
  bio: "The upper city's iron fist. Order is absolute; mercy is a weakness.",
      },
    ],
    legend: {
      voice: 'Voice Actor',
      weapon: 'Weapon',
      affiliation: 'Affiliation',
    },
  },
  ja: {
    heading: {
      red: '闇の',
      white: '境界',
      subtitle: '内部資料 // クリーナー本部が危険指定した人物',
    },
    roster: [
      {
        name: 'ルド',
        title: '追放者',
        image: rudoImage,
        voice: '公式発表なし',
        weapon: '廃棄物ガントレット',
        affiliation: 'ピット居住者',
        bio: '無実の罪でピットに落とされたルドは、廃棄物を復讐の武器へと変える力に目覚める。',
      },
      {
        name: 'エンジン',
        title: '継承の師',
        image: engineImage,
        voice: '公式発表なし',
        weapon: 'スクラップブレード',
        affiliation: '元クリーナー',
        bio: 'かつてはエリート・クリーナーだったが、盲目的な忠誠を捨てピットを選んだ。今は忘れられた者たちに戦い方を教える。',
      },
      {
        name: 'エンジン',
        title: '炎の触媒',
        image: enjinImage,
        voice: '公式発表なし',
        weapon: '焼却ハルバード',
        affiliation: 'レジスタンスセル',
        bio: '炎に生まれ、怒りに鍛えられた。腐敗を容赦なく焼き払い、精密に仕留める。',
      },
      {
        name: 'ゾディル',
        title: '鋼鉄の執行者',
        image: zodylImage,
        voice: '公式発表なし',
        weapon: '法剣',
        affiliation: 'クリーナー',
        bio: '上層都市の鉄拳。秩序こそ絶対であり、慈悲は弱さだと断じる。',
      },
    ],
    legend: {
      voice: '声優',
      weapon: '武器',
      affiliation: '所属',
    },
  },
};

export default function Characters() {
  const { language } = useLanguage();
  const content = CHARACTERS_CONTENT[language];
  const roster = content.roster;

  return (
    <section id="characters" className="relative bg-gradient-to-b from-black via-slate-950 to-black py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(250,204,21,0.12),_transparent_65%)]"></div>
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-14 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-5">
            <span className="text-yellow-400 text-glow-yellow">{content.heading.red}</span>{' '}
            <span className="text-white">{content.heading.white}</span>
          </h2>
          <div className="mx-auto w-48 divider-line"></div>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl sm:max-w-3xl mx-auto tagline-track tracking-[0.3em] sm:tracking-[0.4em]">
            {content.heading.subtitle}
          </p>
        </div>

        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 xl:grid-cols-4">
          {roster.map((character, index) => (
            <CharacterCard key={`${character.name}-${character.title}`} character={character} index={index} />
          ))}
        </div>

        <div className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-6 sm:gap-10 text-gray-500">
          <div className="flex items-center gap-3 rounded-full border border-white/10 px-4 sm:px-5 py-2 backdrop-blur-sm text-xs sm:text-sm">
            <Mic size={18} className="text-red-500" />
            <span className="uppercase tracking-[0.3em] sm:tracking-[0.35em]">{content.legend.voice}</span>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-white/10 px-4 sm:px-5 py-2 backdrop-blur-sm text-xs sm:text-sm">
            <Sword size={18} className="text-yellow-400" />
            <span className="uppercase tracking-[0.3em] sm:tracking-[0.35em]">{content.legend.weapon}</span>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-white/10 px-4 sm:px-5 py-2 backdrop-blur-sm text-xs sm:text-sm">
            <Shield size={18} className="text-gray-400" />
            <span className="uppercase tracking-[0.3em] sm:tracking-[0.35em]">{content.legend.affiliation}</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
    </section>
  );
}
