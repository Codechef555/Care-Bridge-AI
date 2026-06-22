import React, { useState } from 'react';
import { MapPin, Phone, Clock, Search, HelpCircle, Check, Map } from 'lucide-react';
import { type Language, translations } from '../services/translations';
import { mockFacilities } from '../services/mockData';

interface FacilityLocatorProps {
  currentLanguage: Language;
}

export const FacilityLocator: React.FC<FacilityLocatorProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];
  const [searchTerm, setSearchTerm] = useState('');
  const [facilityType, setFacilityType] = useState('all');
  const [maxDistance, setMaxDistance] = useState(30);
  const [onlyAyushman, setOnlyAyushman] = useState(false);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);

  const filteredFacilities = mockFacilities.filter(f => {
    // Search match
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          f.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          f.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Type match
    const matchesType = facilityType === 'all' || f.type === facilityType;
    
    // Distance match
    const matchesDistance = f.distanceKm <= maxDistance;
    
    // Ayushman card match
    const matchesAyushman = !onlyAyushman || f.ayushmanCardAccepted;
    
    return matchesSearch && matchesType && matchesDistance && matchesAyushman;
  });

  const handleCall = (phone: string, name: string) => {
    alert(`Calling ${name} at ${phone}...`);
  };

  const handleShowRoute = (name: string, distance: number) => {
    alert(`Showing navigation route to ${name} (${distance} km). Estimated travel: ${Math.round(distance * 3)} mins by rural roads.`);
  };

  return (
    <div className="facility-container">
      <h2 className="asha-section-title" style={{ borderColor: 'var(--success)' }}>
        {t.facilityHeader}
      </h2>

      {/* Filter Options */}
      <div className="filters-row">
        <div className="input-search" style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0 10px', backgroundColor: 'var(--bg-card)' }}>
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input-box"
            style={{ border: 'none', padding: '6px 0', fontSize: '13px' }}
            placeholder={t.facilitySearchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="facility-search-input"
          />
        </div>

        <select 
          className="select-filter" 
          value={facilityType}
          onChange={(e) => setFacilityType(e.target.value)}
          id="facility-type-filter"
        >
          <option value="all">{t.filterTypeAll}</option>
          <option value="phc">{t.filterTypePHC}</option>
          <option value="chc">{t.filterTypeCHC}</option>
          <option value="hospital">{t.filterTypeHospital}</option>
          <option value="pharmacy">{t.filterTypePharmacy}</option>
          <option value="mobile_van">{t.filterTypeVan}</option>
        </select>

        <select 
          className="select-filter"
          value={maxDistance}
          onChange={(e) => setMaxDistance(Number(e.target.value))}
          id="facility-distance-filter"
        >
          <option value={5}>{t.filterDistance} 5 km</option>
          <option value={10}>{t.filterDistance} 10 km</option>
          <option value={30}>{t.filterDistance} 30 km</option>
        </select>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type="checkbox"
          id="ayushman-check"
          className="doc-checkbox"
          checked={onlyAyushman}
          onChange={(e) => setOnlyAyushman(e.target.checked)}
        />
        <label htmlFor="ayushman-check" className="form-label" style={{ cursor: 'pointer' }}>
          {t.ayushmanSupported}
        </label>
      </div>

      {/* Interactive Map Visualizer */}
      <div className="map-canvas" role="img" aria-label="Visual Map showing nearby healthcare clinics relative to your location.">
        <div className="map-grid-pattern"></div>
        
        {/* Your Location Pin */}
        <div className="map-pin active" style={{ left: '50%', top: '50%' }}>
          <MapPin size={22} style={{ fill: 'var(--danger-light)' }} />
          <span className="map-label" style={{ fontWeight: 800 }}>YOU</span>
        </div>

        {/* Facility Pins */}
        {filteredFacilities.map(f => (
          <button
            key={f.id}
            className={`map-pin ${selectedFacilityId === f.id ? 'active' : ''}`}
            style={{ 
              left: `${f.coords.x}%`, 
              top: `${f.coords.y}%`,
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedFacilityId(f.id)}
            title={f.name}
            id={`map-pin-${f.id}`}
          >
            <MapPin size={18} style={{ color: selectedFacilityId === f.id ? 'var(--danger)' : 'var(--primary)', fill: 'white' }} />
            <span className="map-label">{f.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Facility Cards */}
      <div className="facility-list">
        {filteredFacilities.map(f => (
          <div 
            key={f.id} 
            className={`facility-card ${selectedFacilityId === f.id ? 'selected' : ''}`}
            onClick={() => setSelectedFacilityId(f.id)}
            id={`facility-card-${f.id}`}
          >
            <div className="facility-header">
              <div>
                <h3 className="facility-name">{f.name}</h3>
                <span className="facility-type">{f.type === 'phc' ? 'PHC' : f.type === 'chc' ? 'CHC' : f.type === 'hospital' ? 'Hospital' : f.type === 'pharmacy' ? 'Pharmacy' : 'Mobile Van'}</span>
              </div>
              <span className="facility-name" style={{ color: 'var(--primary)', fontSize: '14px' }}>
                {f.distanceKm} km
              </span>
            </div>

            <div className="facility-detail-row">
              <MapPin size={14} />
              <span>{f.address}</span>
            </div>

            <div className="facility-detail-row">
              <Clock size={14} />
              <span><strong>{t.hours}:</strong> {f.openHours}</span>
            </div>

            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>
                {t.services}:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {f.services.map((s, i) => (
                  <span key={i} style={{ fontSize: '11px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', padding: '2px 8px', borderRadius: '10px', color: 'var(--text-dark)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {f.ayushmanCardAccepted && (
              <div className="facility-badge">
                <Check size={10} />
                <span>{t.ayushmanSupported}</span>
              </div>
            )}

            <div className="facility-actions">
              <button 
                className="facility-btn" 
                onClick={(e) => { e.stopPropagation(); handleCall(f.phone, f.name); }}
                id={`btn-call-${f.id}`}
                aria-label={`Call ${f.name}`}
              >
                <Phone size={14} />
                <span>{t.callCenter}</span>
              </button>
              <button 
                className="facility-btn primary-btn" 
                onClick={(e) => { e.stopPropagation(); handleShowRoute(f.name, f.distanceKm); }}
                id={`btn-route-${f.id}`}
                aria-label={`Get directions to ${f.name}`}
              >
                <Map size={14} />
                <span>{t.getRoute}</span>
              </button>
            </div>
          </div>
        ))}

        {filteredFacilities.length === 0 && (
          <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)', fontSize: '13px' }}>
            <HelpCircle size={32} style={{ margin: '0 auto 10px', display: 'block', color: 'var(--text-muted)' }} />
            No facilities found matching current filters. Try relaxing filters or clearing search.
          </div>
        )}
      </div>
    </div>
  );
};
