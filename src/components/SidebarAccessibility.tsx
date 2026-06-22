import React from 'react';
import { 
  Type, 
  Eye, 
  Volume2, 
  VolumeX, 
  Wifi, 
  WifiOff, 
  Languages 
} from 'lucide-react';
import { type Language, translations } from '../services/translations';

interface SidebarAccessibilityProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  fontScale: number;
  onFontScaleChange: (scale: number) => void;
  isHighContrast: boolean;
  onHighContrastToggle: () => void;
  isLowBandwidth: boolean;
  onLowBandwidthToggle: () => void;
  isSpeechActive: boolean;
  onSpeechToggle: () => void;
}

export const SidebarAccessibility: React.FC<SidebarAccessibilityProps> = ({
  currentLanguage,
  onLanguageChange,
  fontScale,
  onFontScaleChange,
  isHighContrast,
  onHighContrastToggle,
  isLowBandwidth,
  onLowBandwidthToggle,
  isSpeechActive,
  onSpeechToggle
}) => {
  const t = translations[currentLanguage];

  const handleFontToggle = () => {
    if (fontScale === 1) {
      onFontScaleChange(1.2); // Large
    } else if (fontScale === 1.2) {
      onFontScaleChange(1.4); // Huge
    } else {
      onFontScaleChange(1); // Normal
    }
  };

  const fontLabel = fontScale === 1 
    ? t.textNormal 
    : fontScale === 1.2 
      ? t.textLarge 
      : t.textHuge;

  return (
    <aside className="accessibility-bar" aria-label="Accessibility controls">
      {/* Language Selector Popover or toggle */}
      <div className="tooltip-container">
        <button 
          className="acc-button active-badge" 
          onClick={() => {
            const langs: Language[] = ['en', 'hi', 'ta', 'te', 'es'];
            const idx = langs.indexOf(currentLanguage);
            const nextLang = langs[(idx + 1) % langs.length];
            onLanguageChange(nextLang);
          }}
          title="Change Language"
          id="btn-toggle-lang"
        >
          <Languages size={20} />
        </button>
        <span className="tooltip-text">
          {currentLanguage.toUpperCase()} (Click to toggle)
        </span>
      </div>

      {/* Font Size Toggle */}
      <div className="tooltip-container">
        <button 
          className={`acc-button ${fontScale > 1 ? 'active' : ''}`}
          onClick={handleFontToggle}
          title={fontLabel}
          id="btn-toggle-font"
        >
          <Type size={20} />
        </button>
        <span className="tooltip-text">{fontLabel}</span>
      </div>

      {/* High Contrast Toggle */}
      <div className="tooltip-container">
        <button 
          className={`acc-button ${isHighContrast ? 'active' : ''}`}
          onClick={onHighContrastToggle}
          title={isHighContrast ? t.normalContrast : t.highContrast}
          id="btn-toggle-contrast"
        >
          <Eye size={20} />
        </button>
        <span className="tooltip-text">
          {isHighContrast ? t.normalContrast : t.highContrast}
        </span>
      </div>

      {/* Low Bandwidth Toggle */}
      <div className="tooltip-container">
        <button 
          className={`acc-button ${isLowBandwidth ? 'active' : ''}`}
          onClick={onLowBandwidthToggle}
          title={isLowBandwidth ? t.lowBandwidthOff : t.lowBandwidthOn}
          id="btn-toggle-bandwidth"
        >
          {isLowBandwidth ? <WifiOff size={20} /> : <Wifi size={20} />}
        </button>
        <span className="tooltip-text">
          {isLowBandwidth ? t.lowBandwidthOff : t.lowBandwidthOn}
        </span>
      </div>

      {/* Text-to-Speech Toggle */}
      <div className="tooltip-container">
        <button 
          className={`acc-button ${isSpeechActive ? 'active' : ''}`}
          onClick={onSpeechToggle}
          title={isSpeechActive ? t.speechOff : t.speechOn}
          id="btn-toggle-speech"
        >
          {isSpeechActive ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
        <span className="tooltip-text">
          {isSpeechActive ? t.speechOff : t.speechOn}
        </span>
      </div>

      {/* Inline Language Quick Buttons for Mobile Layout */}
      <div style={{ display: 'none' }} className="mobile-languages-list">
        {(['en', 'hi', 'ta', 'te', 'es'] as Language[]).map(lang => (
          <button
            key={lang}
            className={`lang-pill ${currentLanguage === lang ? 'active' : ''}`}
            onClick={() => onLanguageChange(lang)}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </aside>
  );
};
