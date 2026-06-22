import { useState, useEffect } from 'react';
import { Heart, Activity, ShieldAlert, Users, Award, MapPin } from 'lucide-react';
import { type Language, translations } from './services/translations';
import { SidebarAccessibility } from './components/SidebarAccessibility';
import { AgentChatPanel, type ChatMessage } from './components/AgentChatPanel';
import { FacilityLocator } from './components/FacilityLocator';
import { SchemeEligibilityWizard } from './components/SchemeEligibilityWizard';
import { EmergencyHandbook } from './components/EmergencyHandbook';
import { HealthLogPanel } from './components/HealthLogPanel';
import { AshaDashboard } from './components/AshaDashboard';
import { processUserQuery } from './services/agentEngine';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [fontScale, setFontScale] = useState<number>(1);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [isLowBandwidth, setIsLowBandwidth] = useState<boolean>(false);
  const [isSpeechActive, setIsSpeechActive] = useState<boolean>(false);
  
  // Workspace navigation tabs
  const [activeTab, setActiveTab] = useState<'facilities' | 'schemes' | 'emergency' | 'vitals' | 'asha'>('facilities');

  // Agent Chat States
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeRoutingStep, setActiveRoutingStep] = useState<'idle' | 'dispatcher' | 'symptom' | 'emergency' | 'facility' | 'scheme'>('idle');
  const [dispatcherThoughts, setDispatcherThoughts] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const t = translations[currentLanguage];

  // Initialize first greeting when language changes
  useEffect(() => {
    setMessages([
      {
        id: 'init-msg',
        sender: 'system',
        text: translations[currentLanguage].initialMessage,
        timestamp: new Date()
      }
    ]);
    setActiveRoutingStep('idle');
    setDispatcherThoughts('');
  }, [currentLanguage]);

  // Apply HTML element classes dynamically based on accessibility toggles
  useEffect(() => {
    const root = document.documentElement;
    
    // Font scale
    root.style.setProperty('--font-scale', fontScale.toString());

    // High contrast theme class
    if (isHighContrast) {
      document.body.classList.add('theme-high-contrast');
    } else {
      document.body.classList.remove('theme-high-contrast');
    }

    // Low bandwidth class
    if (isLowBandwidth) {
      document.body.classList.add('bandwidth-low');
    } else {
      document.body.classList.remove('bandwidth-low');
    }
  }, [fontScale, isHighContrast, isLowBandwidth]);

  // Multi-agent routing simulator
  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setActiveRoutingStep('dispatcher');
    setDispatcherThoughts(currentLanguage === 'en' 
      ? 'CareBridge Dispatcher: Analyzing query semantics...' 
      : 'केयरब्रिज डिस्पैचर: प्रश्न के अर्थ का विश्लेषण किया जा रहा है...');

    // Simulate multi-agent processing timeline
    setTimeout(() => {
      // Process queries through NLP Agent Engine
      const res = processUserQuery(text, currentLanguage);
      
      // Update Routing Step and thought bubble
      setActiveRoutingStep(res.agentId);
      setDispatcherThoughts(res.thoughts);

      // Simulate active agent typing delay
      setTimeout(() => {
        const agentMsg: ChatMessage = {
          id: `agt-${Date.now()}`,
          sender: res.agentId,
          text: res.answer,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, agentMsg]);
        setIsTyping(false);
        setActiveRoutingStep('idle');

        // Automatically change Workspace tab if suggested by agent routing
        if (res.suggestedTab && res.suggestedTab !== 'chat') {
          setActiveTab(res.suggestedTab as any);
        }
      }, 1500);
    }, 1200);
  };

  return (
    <div className={`app-container ${isHighContrast ? 'theme-high-contrast' : ''}`}>
      {/* App Header */}
      <header className="app-header">
        <div className="logo-section">
          <Heart className="logo-icon" style={{ fill: 'currentColor' }} />
          <div>
            <h1 className="logo-title" style={{ margin: 0, fontSize: '22px' }}>{t.title}</h1>
            <span className="logo-subtitle">{t.subtitle}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {isLowBandwidth && (
            <span className="offline-badge low-bandwidth" id="badge-low-bandwidth">
              Low-Bandwidth Mode Active
            </span>
          )}
          <span className="offline-badge" id="badge-offline-status">
            Local-First / Offline Ready
          </span>
        </div>
      </header>

      {/* Main split dashboard content */}
      <main className="app-main">
        {/* Left Accessibility controller sidebar */}
        <SidebarAccessibility
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
          fontScale={fontScale}
          onFontScaleChange={setFontScale}
          isHighContrast={isHighContrast}
          onHighContrastToggle={() => setIsHighContrast(!isHighContrast)}
          isLowBandwidth={isLowBandwidth}
          onLowBandwidthToggle={() => setIsLowBandwidth(!isLowBandwidth)}
          isSpeechActive={isSpeechActive}
          onSpeechToggle={() => setIsSpeechActive(!isSpeechActive)}
        />

        {/* Left Chat Assistant */}
        <AgentChatPanel
          currentLanguage={currentLanguage}
          messages={messages}
          onSendMessage={handleSendMessage}
          activeRoutingStep={activeRoutingStep}
          dispatcherThoughts={dispatcherThoughts}
          isTyping={isTyping}
          isSpeechActive={isSpeechActive}
        />

        {/* Right workspace panels */}
        <section className="workspace-panel" aria-label="CareBridge Workspace Dashboard">
          <nav className="workspace-tabs" aria-label="Workspace tabs">
            <button 
              className={`workspace-tab ${activeTab === 'facilities' ? 'active' : ''}`}
              onClick={() => setActiveTab('facilities')}
              id="tab-facilities"
            >
              <MapPin size={16} />
              <span>{t.facilitiesTab}</span>
            </button>
            <button 
              className={`workspace-tab ${activeTab === 'schemes' ? 'active' : ''}`}
              onClick={() => setActiveTab('schemes')}
              id="tab-schemes"
            >
              <Award size={16} />
              <span>{t.schemesTab}</span>
            </button>
            <button 
              className={`workspace-tab ${activeTab === 'emergency' ? 'active' : ''}`}
              onClick={() => setActiveTab('emergency')}
              id="tab-emergency"
            >
              <ShieldAlert size={16} />
              <span>{t.emergencyTab}</span>
            </button>
            <button 
              className={`workspace-tab ${activeTab === 'vitals' ? 'active' : ''}`}
              onClick={() => setActiveTab('vitals')}
              id="tab-vitals"
            >
              <Activity size={16} />
              <span>{t.vitalsTab}</span>
            </button>
            <button 
              className={`workspace-tab ${activeTab === 'asha' ? 'active' : ''}`}
              onClick={() => setActiveTab('asha')}
              id="tab-asha"
            >
              <Users size={16} />
              <span>{t.ashaTab}</span>
            </button>
          </nav>

          <div className="workspace-content">
            {activeTab === 'facilities' && <FacilityLocator currentLanguage={currentLanguage} />}
            {activeTab === 'schemes' && <SchemeEligibilityWizard currentLanguage={currentLanguage} />}
            {activeTab === 'emergency' && <EmergencyHandbook currentLanguage={currentLanguage} />}
            {activeTab === 'vitals' && <HealthLogPanel currentLanguage={currentLanguage} />}
            {activeTab === 'asha' && <AshaDashboard currentLanguage={currentLanguage} />}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
