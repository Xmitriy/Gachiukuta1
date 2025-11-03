import { Flame, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../context/LanguageContext';

const NAV_ITEMS = {
  mn: [
    { label: 'Нүүр', href: '#hero' },
    { label: 'Түүх', href: '#story' },
    { label: 'Дүрүүд', href: '#characters' },
    { label: 'Медиа', href: '#media' },
    { label: 'Студи', href: '#studio' },
  ],
  en: [
    { label: 'Home', href: '#hero' },
    { label: 'Story', href: '#story' },
    { label: 'Characters', href: '#characters' },
    { label: 'Media', href: '#media' },
    { label: 'Studio', href: '#studio' },
  ],
  ja: [
    { label: 'ホーム', href: '#hero' },
    { label: 'ストーリー', href: '#story' },
    { label: 'キャラクター', href: '#characters' },
    { label: 'メディア', href: '#media' },
    { label: 'スタジオ', href: '#studio' },
  ],
};

const TRAILER_LABEL = {
  mn: 'Трейлер үзэх',
  en: 'Watch Trailer',
  ja: 'トレーラーを見る',
};

export default function Navigation() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const navItems = NAV_ITEMS[language];

  useEffect(() => {
    const sectionElements = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => !!section);

    if (!sectionElements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (intersecting[0]) {
          setActiveSection(`#${intersecting[0].target.id}`);
        }
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, [navItems]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-red-500/10 bg-black/70 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div className="text-xl sm:text-2xl font-bold tracking-[0.25em] sm:tracking-wider uppercase">
          <span className="text-red-500">G</span>
          <span className="text-yellow-400">ACHIUKUTA</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-xs uppercase tracking-[0.3em] transition-colors duration-300 relative group ${
                activeSection === item.href ? 'text-red-500' : 'text-gray-300/80 hover:text-red-400'
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-1/2 h-0.5 w-0 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 transition-all duration-300 ${
                  activeSection === item.href
                    ? '-translate-x-1/2 w-full'
                    : 'group-hover:-translate-x-1/2 group-hover:w-full'
                }`}
              ></span>
            </a>
          ))}

          <a
            href="#media"
            className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-red-400 transition-all duration-300 hover:bg-red-500/80 hover:text-black"
          >
            <Flame size={16} />
                {TRAILER_LABEL[language]}
          </a>

              <LanguageToggle />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-red-500"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 border-t border-red-500/20">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 text-xs uppercase tracking-[0.28em] transition-colors duration-300 ${
                activeSection === item.href ? 'bg-red-500/10 text-red-400' : 'text-gray-300 hover:bg-red-500/10'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#media"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 text-xs uppercase tracking-[0.28em] text-red-400/80 border-t border-red-500/20 hover:bg-red-500/10 transition-colors duration-300"
          >
            {TRAILER_LABEL[language]}
          </a>

          <div className="px-4 py-3 border-t border-red-500/20">
            <LanguageToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
