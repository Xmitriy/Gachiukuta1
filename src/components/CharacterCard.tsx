import { useState } from 'react';
import { Mic, Sword, Shield } from 'lucide-react';
import { useLanguage, type Language } from '../context/LanguageContext';

export interface Character {
  name: string;
  title: string;
  image: string;
  voice: string;
  weapon: string;
  affiliation: string;
  bio: string;
}

interface CharacterCardProps {
  character: Character;
  index: number;
}

export default function CharacterCard({ character, index }: CharacterCardProps) {
  const { language } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);

  const labels = CARD_COPY[language];

  const toggleCard = () => setIsFlipped((prev) => !prev);

  return (
    <div
      className="character-card-container group h-[460px] sm:h-[520px] cursor-pointer"
      onClick={toggleCard}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onFocus={() => setIsFlipped(true)}
      onBlur={() => setIsFlipped(false)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleCard();
        }
      }}
      role="button"
      tabIndex={0}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className={`character-card relative w-full h-full ${isFlipped ? 'flipped' : ''}`}>
        <div className="character-card-front absolute w-full h-full rounded-3xl overflow-hidden border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.28)] hover:shadow-[0_0_50px_rgba(239,68,68,0.4)] transition-all duration-500 card-border">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{character.name}</h3>
            <p className="text-red-400 text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-wider">{character.title}</p>
          </div>

          <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-[0.7rem] sm:text-xs text-yellow-400 uppercase tracking-[0.28em] sm:tracking-[0.4em]">
            {labels.flipPrompt}
          </div>
        </div>

        <div className="character-card-back absolute w-full h-full rounded-3xl overflow-hidden border border-yellow-400/35 bg-gradient-to-br from-slate-900/90 via-slate-900/65 to-black/85 p-5 sm:p-6 flex flex-col justify-between shadow-[0_0_35px_rgba(250,204,21,0.32)] glass-panel">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">{character.name}</h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-5 sm:mb-6 leading-relaxed">{character.bio}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-black/50 p-3 rounded border border-red-500/20">
              <Mic size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[0.65rem] sm:text-xs text-gray-500 uppercase tracking-wider mb-0.5">{labels.voice}</p>
                <p className="text-white text-xs sm:text-sm truncate">{character.voice}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-black/50 p-3 rounded border border-yellow-400/20">
              <Sword size={18} className="text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[0.65rem] sm:text-xs text-gray-500 uppercase tracking-wider mb-0.5">{labels.weapon}</p>
                <p className="text-white text-xs sm:text-sm truncate">{character.weapon}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-black/50 p-3 rounded border border-gray-500/20">
              <Shield size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[0.65rem] sm:text-xs text-gray-500 uppercase tracking-wider mb-0.5">{labels.affiliation}</p>
                <p className="text-white text-xs sm:text-sm truncate">{character.affiliation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CARD_COPY: Record<Language, { flipPrompt: string; voice: string; weapon: string; affiliation: string }> = {
  mn: {
    flipPrompt: 'Дэлгэхийн тулд товш',
    voice: 'Дуу',
    weapon: 'Зэвсэг',
    affiliation: 'Харьяалал',
  },
  en: {
    flipPrompt: 'Tap to reveal',
    voice: 'Voice',
    weapon: 'Weapon',
    affiliation: 'Affiliation',
  },
  ja: {
    flipPrompt: 'タップして表示',
    voice: '声',
    weapon: '武器',
    affiliation: '所属',
  },
};
