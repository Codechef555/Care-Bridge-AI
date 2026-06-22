import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Volume2, ArrowRight, Bot } from 'lucide-react';
import { type Language, translations } from '../services/translations';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'system' | 'dispatcher' | 'symptom' | 'emergency' | 'facility' | 'scheme';
  text: string;
  timestamp: Date;
}

interface AgentChatPanelProps {
  currentLanguage: Language;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  activeRoutingStep: 'idle' | 'dispatcher' | 'symptom' | 'emergency' | 'facility' | 'scheme';
  dispatcherThoughts: string;
  isTyping: boolean;
  isSpeechActive: boolean;
}

export const AgentChatPanel: React.FC<AgentChatPanelProps> = ({
  currentLanguage,
  messages,
  onSendMessage,
  activeRoutingStep,
  dispatcherThoughts,
  isTyping,
  isSpeechActive
}) => {
  const t = translations[currentLanguage];
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Speech Recognition setup (Web Speech API)
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = currentLanguage === 'hi' ? 'hi-IN' 
               : currentLanguage === 'ta' ? 'ta-IN'
               : currentLanguage === 'te' ? 'te-IN'
               : currentLanguage === 'es' ? 'es-ES'
               : 'en-US';

      rec.onstart = () => setIsRecording(true);
      rec.onend = () => setIsRecording(false);
      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
        }
      };
      recognitionRef.current = rec;
    }
  }, [currentLanguage, SpeechRecognition]);

  // Read message aloud using speech synthesis
  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // stop current speak
      const cleanText = text.replace(/[*#`🚨🤒💊]/g, ''); // strip markdown and emoji
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = currentLanguage === 'hi' ? 'hi-IN' 
                     : currentLanguage === 'ta' ? 'ta-IN'
                     : currentLanguage === 'te' ? 'te-IN'
                     : currentLanguage === 'es' ? 'es-ES'
                     : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Automatically read out new assistant messages if speech toggle is active
  useEffect(() => {
    if (isSpeechActive && messages.length > 1) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender !== 'user') {
        speakMessage(lastMsg.text);
      }
    }
  }, [messages, isSpeechActive]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, dispatcherThoughts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleMicToggle = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please type your query.");
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const loadSuggestion = (text: string) => {
    onSendMessage(text);
  };

  const getSuggestions = () => {
    if (currentLanguage === 'hi') {
      return [
        { label: "बुखार का प्राथमिक उपचार", query: "मुझे बहुत बुखार और बदन दर्द है" },
        { label: "पास का अस्पताल खोजें", query: "गर्भवती माता के लिए रामपुर के पास अस्पताल कहाँ है?" },
        { label: "आयुष्मान योजना क्या है?", query: "आयुष्मान भारत योजना के बारे में बताएं और कार्ड कैसे बनेगा" },
        { label: "सांप काटने पर क्या करें?", query: "खेत में सांप काट लिया, क्या प्राथमिक उपचार है?" }
      ];
    } else if (currentLanguage === 'ta') {
      return [
        { label: "காய்ச்சல் வழிகாட்டி", query: "எனக்கு காய்ச்சல் மற்றும் தலைவலி உள்ளது" },
        { label: "அருகிலுள்ள மருத்துவமனை", query: "அருகிலுள்ள PHC ஆரம்ப சுகாதார நிலையம் எங்குள்ளது?" },
        { label: "ஆயுஷ்மான் கார்டு தகுதி", query: "ஆயுஷ்மான் திட்டத்திற்கு தகுதி என்ன?" },
        { label: "பாம்பு கடி முதலுதவி", query: "பாம்பு கடித்தால் என்ன செய்ய வேண்டும்?" }
      ];
    } else if (currentLanguage === 'te') {
      return [
        { label: "జ్వరం చికిత్స", query: "నాకు చాలా జ్వరం మరియు తలనొప్పి ఉంది" },
        { label: "దగ్గరి ఆసుపత్రి", query: "దగ్గరలో గల PHC ఆరోగ్య కేంద్రం ఎక్కడ?" },
        { label: "ఆయుష్మాన్ భారత్ పథకం", query: "ఆయుష్మాన్ భారత్ పథకం అర్హతలు ఏమిటి?" },
        { label: "పాము కాటు ప్రథమ చికిత్స", query: "పాము కుడితే ప్రథమ చికిత్స ఏమిటి?" }
      ];
    } else if (currentLanguage === 'es') {
      return [
        { label: "Tengo Fiebre", query: "Tengo fiebre alta y dolor de cuerpo" },
        { label: "Buscar Clínica", query: "Buscar clínicas de maternidad cerca de mí" },
        { label: "Plan Ayushman", query: "Cómo aplicar para el seguro de salud familiar" },
        { label: "Mordedura de Serpiente", query: "Primeros auxilios para mordedura de serpiente" }
      ];
    }
    return [
      { label: "Fever Treatment", query: "I have high fever and severe body ache" },
      { label: "Find Nearby PHC", query: "Where is the nearest primary health center for delivery?" },
      { label: "PM-JAY Gold Card", query: "Check my eligibility for Ayushman scheme card" },
      { label: "Snake Bite Help", query: "Help! Someone got bitten by a snake in the field" }
    ];
  };

  return (
    <section className="chat-panel" aria-label="AI Care Chat Panel">
      {/* Dispatcher Routing Indicator */}
      <div className="routing-visualizer">
        <div className="dispatcher-header">
          <div className={`dispatcher-avatar ${activeRoutingStep !== 'idle' ? 'pulse-active' : ''}`}>
            <Bot size={18} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '12px' }}>{t.title} Dispatcher</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Multi-Agent Router</div>
          </div>
        </div>
        
        <div className="agent-routing-steps">
          <div className={`step-node ${activeRoutingStep === 'dispatcher' ? 'active' : ''}`}>
            Disp
          </div>
          <ArrowRight className="step-arrow" size={10} />
          <div className={`step-node ${activeRoutingStep === 'symptom' ? 'active' : ''}`}>
            Symptom
          </div>
          <ArrowRight className="step-arrow" size={10} />
          <div className={`step-node ${activeRoutingStep === 'facility' ? 'active' : ''}`}>
            Facility
          </div>
          <ArrowRight className="step-arrow" size={10} />
          <div className={`step-node ${activeRoutingStep === 'scheme' ? 'active' : ''}`}>
            Scheme
          </div>
          <ArrowRight className="step-arrow" size={10} />
          <div className={`step-node ${activeRoutingStep === 'emergency' ? 'active emergency' : ''}`}>
            Emergency
          </div>
        </div>
      </div>

      {/* Dispatcher Thought Trace */}
      {dispatcherThoughts && (
        <div className="thought-trace-box">
          <strong>Routing Reason:</strong> {dispatcherThoughts}
        </div>
      )}

      {/* Message History */}
      <div className="chat-messages">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          let avatarChar = 'U';
          if (msg.sender === 'system') avatarChar = 'CB';
          else if (msg.sender === 'dispatcher') avatarChar = 'DP';
          else if (msg.sender === 'symptom') avatarChar = 'SY';
          else if (msg.sender === 'emergency') avatarChar = 'EM';
          else if (msg.sender === 'facility') avatarChar = 'FC';
          else if (msg.sender === 'scheme') avatarChar = 'SC';

          return (
            <div key={msg.id} className={`chat-bubble-container ${isUser ? 'user' : 'assistant'}`}>
              <div className={`bubble-avatar ${msg.sender}`} aria-hidden="true">
                {avatarChar}
              </div>
              <div className="chat-bubble">
                {!isUser && msg.sender !== 'system' && (
                  <div className={`agent-name-tag ${msg.sender}`}>
                    {msg.sender === 'dispatcher' ? 'Dispatcher Agent'
                     : msg.sender === 'symptom' ? 'Symptom Assessor Agent'
                     : msg.sender === 'emergency' ? 'Emergency Triage Agent'
                     : msg.sender === 'facility' ? 'Healthcare Nav Agent'
                     : 'Scheme Eligibility Agent'}
                    
                    <button 
                      className="speak-button"
                      onClick={() => speakMessage(msg.text)}
                      title="Read out load"
                      aria-label="Read message aloud"
                    >
                      <Volume2 size={12} />
                    </button>
                  </div>
                )}
                
                <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
                
                {msg.sender === 'symptom' && (
                  <div className="med-disclaimer">
                    ⚠️ Medical Disclaimer: Simulated agent advice. Consult local ASHA worker or doctor for clinical decisions.
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="chat-bubble-container assistant">
            <div className="bubble-avatar system">...</div>
            <div className="chat-bubble">
              <div className="dot-loading" aria-label={t.thinking}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Template Questions */}
      <div className="chat-suggestions" aria-label="Suggested template questions">
        {getSuggestions().map((s, idx) => (
          <button 
            key={idx}
            className="suggestion-btn"
            onClick={() => loadSuggestion(s.query)}
            id={`suggest-${idx}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Input box */}
      <div className="chat-input-area">
        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="text"
            className="input-box"
            placeholder={t.chatPlaceholder}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
            id="chat-input-field"
          />
          <button
            type="button"
            className={`mic-btn ${isRecording ? 'recording' : ''}`}
            onClick={handleMicToggle}
            title={isRecording ? t.micListening : t.micSpeak}
            disabled={isTyping}
            id="btn-voice-input"
            aria-label={isRecording ? t.micListening : t.micSpeak}
          >
            <Mic size={18} />
          </button>
        </form>
        <button
          type="button"
          className="send-btn"
          onClick={handleSubmit}
          disabled={isTyping}
          title={t.sendBtn}
          id="btn-send-message"
          aria-label={t.sendBtn}
        >
          <Send size={18} />
        </button>
      </div>
    </section>
  );
};
