import React, { useState } from 'react';
import { Award, FileText, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { type Language, translations } from '../services/translations';
import { mockSchemes, type Scheme } from '../services/mockData';

interface SchemeEligibilityWizardProps {
  currentLanguage: Language;
}

export const SchemeEligibilityWizard: React.FC<SchemeEligibilityWizardProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];
  
  // Form states
  const [state, setState] = useState('All');
  const [income, setIncome] = useState(60000);
  const [category, setCategory] = useState('BPL');
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('Female');
  const [householdSize, setHouseholdSize] = useState(4);
  const [hasCalculated, setHasCalculated] = useState(true);
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>(null);

  // Simple eligibility solver logic
  const calculateEligibilityRating = (scheme: Scheme): 'high' | 'medium' | 'low' => {
    const rules = scheme.eligibility;

    // Check Gender Constraint
    if (rules.genderRequired && rules.genderRequired !== 'Any') {
      if (gender !== 'Any' && gender !== rules.genderRequired) {
        return 'low'; // Hard mismatch
      }
    }

    // Check Age Constraints
    if (rules.minAge !== undefined && age < rules.minAge) return 'low';
    if (rules.maxAge !== undefined && age > rules.maxAge) return 'low';

    // Check Category constraints
    const hasCategoryMatch = rules.allowedCategories.includes('All') || 
                             rules.allowedCategories.includes(category);
    
    // Check Income constraint
    const matchesIncome = rules.maxIncomeLevel === 0 || income <= rules.maxIncomeLevel;

    if (matchesIncome && hasCategoryMatch) {
      return 'high';
    } else if (matchesIncome || hasCategoryMatch) {
      return 'medium';
    }
    
    return 'low';
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setHasCalculated(true);
  };

  const toggleExpand = (id: string) => {
    setExpandedSchemeId(expandedSchemeId === id ? null : id);
  };

  return (
    <div className="scheme-wizard-container">
      <h2 className="asha-section-title" style={{ borderColor: 'var(--accent)' }}>
        {t.schemeHeader}
      </h2>

      {/* Input Form */}
      <form onSubmit={handleCalculate} className="scheme-form-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="scheme-state">{t.schemeState}</label>
          <select id="scheme-state" className="form-select" value={state} onChange={(e) => setState(e.target.value)}>
            <option value="All">All India</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Bihar">Bihar</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telugu States">Andhra Pradesh / Telangana</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="scheme-income">{t.schemeIncome}</label>
          <input
            id="scheme-income"
            type="number"
            className="form-input"
            value={income}
            min={0}
            step={5000}
            onChange={(e) => setIncome(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="scheme-category">{t.schemeCategory}</label>
          <select id="scheme-category" className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="BPL">Below Poverty Line (BPL)</option>
            <option value="SC">Scheduled Caste (SC)</option>
            <option value="ST">Scheduled Tribe (ST)</option>
            <option value="OBC">Other Backward Class (OBC)</option>
            <option value="General">General / Open Category</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="scheme-age">{t.schemeAge}</label>
          <input
            id="scheme-age"
            type="number"
            className="form-input"
            value={age}
            min={0}
            max={120}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="scheme-gender">{t.schemeGender}</label>
          <select id="scheme-gender" className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Female">{t.genderFemale}</option>
            <option value="Male">{t.genderMale}</option>
            <option value="Any">{t.genderAny}</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="scheme-household">{t.schemeHouseholdSize}</label>
          <input
            id="scheme-household"
            type="number"
            className="form-input"
            value={householdSize}
            min={1}
            max={20}
            onChange={(e) => setHouseholdSize(Number(e.target.value))}
          />
        </div>

        <button type="submit" className="calculate-btn" id="btn-calculate-schemes">
          {t.calculateBtn}
        </button>
      </form>

      {/* Results Listing */}
      {hasCalculated && (
        <div className="scheme-results">
          <h3 className="scheme-results-header">{t.eligibleSchemes}</h3>
          
          <div>
            {mockSchemes.map(s => {
              const rating = calculateEligibilityRating(s);
              const isExpanded = expandedSchemeId === s.id;

              return (
                <div 
                  key={s.id} 
                  className={`scheme-result-card ${rating === 'high' ? 'eligible' : rating === 'medium' ? 'warning' : 'not-eligible'}`}
                  id={`scheme-card-${s.id}`}
                >
                  <div className="scheme-result-header" style={{ cursor: 'pointer' }} onClick={() => toggleExpand(s.id)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Award size={20} style={{ color: rating === 'high' ? 'var(--success)' : rating === 'medium' ? 'var(--accent)' : 'var(--text-muted)' }} />
                      <div>
                        <h4 className="scheme-title">{s.name}</h4>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ID: {s.id.toUpperCase()}</p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span className={`eligibility-meter-badge ${rating}`}>
                        {rating === 'high' ? t.highEligibility : rating === 'medium' ? t.medEligibility : t.lowEligibility}
                      </span>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Expanded documentation checklist and application flow */}
                  {isExpanded && (
                    <div className="scheme-details-box" style={{ animation: 'slideUp 0.2s ease-out', marginTop: 12, borderTop: '1px solid var(--border-color)', paddingTop: 12 }}>
                      <p style={{ fontWeight: 600, marginBottom: 8 }}>{s.description}</p>
                      
                      <div style={{ marginBottom: 12 }}>
                        <span style={{ fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                          🎁 Benefits details:
                        </span>
                        <p style={{ fontSize: '13px', marginTop: 4 }}>{s.benefits}</p>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 16, marginTop: 12 }}>
                        <div>
                          <span style={{ fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <FileText size={12} />
                            {t.documentsChecklist}
                          </span>
                          <div className="documents-list">
                            {s.requiredDocuments.map((doc, idx) => (
                              <label key={idx} className="doc-item">
                                <input type="checkbox" className="doc-checkbox" id={`chk-${s.id}-${idx}`} />
                                <span>{doc}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span style={{ fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <CheckCircle size={12} />
                            {t.applicationProcess}
                          </span>
                          <ol style={{ paddingLeft: 18, fontSize: '12px', marginTop: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {s.applicationSteps.map((step, idx) => (
                              <li key={idx} style={{ lineHeight: 1.4 }}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
