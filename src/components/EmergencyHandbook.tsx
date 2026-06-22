import React, { useState } from 'react';
import { Phone, ShieldAlert, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { type Language, translations } from '../services/translations';
import { mockFirstAidHandbook } from '../services/mockData';

interface EmergencyHandbookProps {
  currentLanguage: Language;
}

export const EmergencyHandbook: React.FC<EmergencyHandbookProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>('fa_snake');

  const emergencyHelplines = [
    { name: 'Block Ambulance Service', phone: '102' },
    { name: 'National Emergency Response', phone: '112' },
    { name: 'Maternal JSY Transport', phone: '108' },
    { name: 'Rampur Clinic Emergency Desk', phone: '+91 98765 01001' }
  ];

  const handleCall = (phone: string, name: string) => {
    alert(`Dialing emergency contact for ${name} at ${phone}...`);
  };

  const toggleTopic = (id: string) => {
    setExpandedTopicId(expandedTopicId === id ? null : id);
  };

  return (
    <div className="emergency-container">
      {/* Red Alert Banner */}
      <div className="emergency-alert-banner">
        <ShieldAlert size={24} style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <strong style={{ display: 'block', marginBottom: 4 }}>RED ALERT</strong>
          <span style={{ fontSize: '13px', lineHeight: 1.4 }}>{t.emergencyWarningText}</span>
        </div>
      </div>

      {/* Helpline numbers grid */}
      <div className="emergency-contact-box">
        <h3 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          {t.emergencyPhoneBook}
        </h3>
        <div className="emergency-contact-grid">
          {emergencyHelplines.map((hl, idx) => (
            <div key={idx} className="contact-card">
              <div className="contact-info">
                <span className="contact-name">{hl.name}</span>
                <span className="contact-phone">{hl.phone}</span>
              </div>
              <button 
                className="contact-call-btn" 
                onClick={() => handleCall(hl.phone, hl.name)}
                id={`call-emergency-${idx}`}
                aria-label={`Call ${hl.name}`}
              >
                <Phone size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* First Aid Handbook Accordion */}
      <div>
        <h3 className="asha-section-title" style={{ borderColor: 'var(--danger)', marginBottom: 12 }}>
          {t.firstAidTitle}
        </h3>
        
        <div className="handbook-list">
          {Object.values(mockFirstAidHandbook).map(topic => {
            const isExpanded = expandedTopicId === topic.id;
            
            return (
              <div key={topic.id} className="handbook-item" id={`handbook-topic-${topic.id}`}>
                <button 
                  className="handbook-trigger" 
                  onClick={() => toggleTopic(topic.id)}
                  id={`btn-trigger-${topic.id}`}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{topic.title}</span>
                  </span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isExpanded && (
                  <div className="handbook-content" style={{ animation: 'slideUp 0.2s ease-out' }}>
                    <p style={{ fontSize: '13.5px', fontWeight: 500, color: 'var(--text-dark)', marginBottom: 8 }}>
                      {topic.description}
                    </p>

                    {/* Step-by-Step Response List */}
                    <div style={{ margin: '8px 0' }}>
                      <span style={{ fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                        {t.steps}:
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
                        {topic.steps.map((step, idx) => (
                          <div key={idx} className="fa-step">
                            <span className="fa-step-num">{idx + 1}.</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dos & Donts side-by-side grids */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 10 }}>
                      <div className="handbook-alert do">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, fontWeight: 700, fontSize: '12px' }}>
                          <Check size={14} />
                          <span>{t.dos}</span>
                        </div>
                        <ul style={{ paddingLeft: 12, fontSize: '11px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {topic.dos.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="handbook-alert dont">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, fontWeight: 700, fontSize: '12px' }}>
                          <X size={14} />
                          <span>{t.donts}</span>
                        </div>
                        <ul style={{ paddingLeft: 12, fontSize: '11px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {topic.donts.map((dn, i) => (
                            <li key={i}>{dn}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
