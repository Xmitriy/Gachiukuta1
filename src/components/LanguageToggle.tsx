import { Languages } from 'lucide-react';
import { useState } from 'react';
import { Language, useLanguage } from '../context/LanguageContext';

const LANGUAGE_OPTIONS: { code: Language; label: string }[] = [
  { code: 'mn', label: 'Монгол' },
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' },
];

const LANGUAGE_COPY: Record<Language, { toggleAria: string; select: Record<Language, string> }> = {
  mn: {
    toggleAria: 'Хэл сонголтын цэсийг нээх',
    select: {
      mn: 'Монгол хэлийг сонгох',
      ja: 'Япон хэлийг сонгох',
      en: 'Англи хэлийг сонгох',
    },
  },
  en: {
    toggleAria: 'Open language menu',
    select: {
      mn: 'Switch to Mongolian',
      ja: 'Switch to Japanese',
      en: 'Switch to English',
    },
  },
  ja: {
    toggleAria: '言語メニューを開く',
    select: {
      mn: 'モンゴル語に切り替える',
      ja: '日本語に切り替える',
      en: '英語に切り替える',
    },
  },
};

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const copy = LANGUAGE_COPY[language];

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-red-400 transition-all duration-300 hover:bg-red-500/20"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={copy.toggleAria}
      >
        <Languages size={16} />
        {LANGUAGE_OPTIONS.find((option) => option.code === language)?.label ?? 'Монгол'}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-2xl border border-red-500/30 bg-black/90 p-2 shadow-lg" role="listbox">
          {LANGUAGE_OPTIONS.map((option) => (
            <button
              key={option.code}
              onClick={() => handleSelect(option.code)}
              aria-label={copy.select[option.code]}
              title={copy.select[option.code]}
              role="option"
              aria-selected={language === option.code}
              className={`w-full rounded-xl px-3 py-2 text-left text-sm uppercase tracking-[0.2em] transition-colors duration-200 ${
                language === option.code
                  ? 'bg-red-500/30 text-red-200'
                  : 'text-gray-300 hover:bg-red-500/20 hover:text-red-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
