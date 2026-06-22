import React, { useState } from 'react';
import { UserPlus, Search, Calendar } from 'lucide-react';
import { type Language, translations } from '../services/translations';
import { mockAshaPatients, type AshaPatient } from '../services/mockData';

interface AshaDashboardProps {
  currentLanguage: Language;
}

export const AshaDashboard: React.FC<AshaDashboardProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];
  const [patients, setPatients] = useState<AshaPatient[]>(mockAshaPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Add Patient Form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newHouse, setNewHouse] = useState('');
  const [newType, setNewType] = useState<'pregnancy' | 'immunization' | 'chronic_care'>('pregnancy');
  const [newTask, setNewTask] = useState('');

  // Local checklist for Village Health Events
  const [events, setEvents] = useState([
    { id: 'e1', name: 'Malaria insecticide spraying drive', date: 'June 25, 2026', done: false },
    { id: 'e2', name: 'Village Health & Nutrition Day (VHND) vaccination camp', date: 'June 28, 2026', done: true },
    { id: 'e3', name: 'Deworming tablet distribution in Government School', date: 'July 02, 2026', done: false }
  ]);

  const handleMarkDone = (patientId: string) => {
    setPatients(patients.map(p => {
      if (p.id === patientId) {
        return { 
          ...p, 
          status: p.status === 'none' ? 'due' : 'none', 
          nextScheduledTask: p.status === 'none' ? p.nextScheduledTask : 'Checkup completed. Review scheduled next month.' 
        };
      }
      return p;
    }));
  };

  const handleToggleEvent = (eventId: string) => {
    setEvents(events.map(e => e.id === eventId ? { ...e, done: !e.done } : e));
  };

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newAge || !newHouse.trim() || !newTask.trim()) {
      alert("Please fill all details to register a new villager.");
      return;
    }

    const newPatient: AshaPatient = {
      id: `p-${Date.now()}`,
      name: newName.trim(),
      age: Number(newAge),
      houseNumber: newHouse.trim(),
      type: newType,
      lastVisit: new Date().toISOString().split('T')[0],
      nextScheduledTask: newTask.trim(),
      status: 'due'
    };

    setPatients([...patients, newPatient]);
    setNewName('');
    setNewAge('');
    setNewHouse('');
    setNewTask('');
    setShowAddForm(false);
    alert(`Successfully registered ${newName.trim()} in local ASHA database.`);
  };

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.houseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.nextScheduledTask.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || p.type === filterType;
    return matchesSearch && matchesType;
  });

  // Calculate totals
  const totalPregnancies = patients.filter(p => p.type === 'pregnancy').length;
  const totalImmunizations = patients.filter(p => p.type === 'immunization' && p.status === 'due').length;
  const totalChronic = patients.filter(p => p.type === 'chronic_care').length;

  return (
    <div className="asha-container">
      <h2 className="asha-section-title" style={{ borderColor: 'var(--secondary)' }}>
        {t.ashaTab}
      </h2>

      {/* Summary Cards */}
      <div className="asha-summary-cards">
        <div className="asha-card">
          <div className="asha-card-num">{totalPregnancies}</div>
          <div className="asha-card-label">{t.totalPregnant}</div>
        </div>
        <div className="asha-card">
          <div className="asha-card-num" style={{ color: 'var(--accent)' }}>{totalImmunizations}</div>
          <div className="asha-card-label">{t.immunizationDue}</div>
        </div>
        <div className="asha-card">
          <div className="asha-card-num" style={{ color: 'var(--secondary)' }}>{totalChronic}</div>
          <div className="asha-card-label">{t.chronicPatients}</div>
        </div>
      </div>

      {/* Patient Search / Filters / Add Button */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 10, flex: 1 }}>
          <div className="input-search" style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0 10px', backgroundColor: 'var(--bg-card)', flex: 1 }}>
            <Search size={16} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="input-box"
              style={{ border: 'none', padding: '6px 0', fontSize: '13px' }}
              placeholder="Search by name, house, task..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="asha-patient-search"
            />
          </div>

          <select 
            className="select-filter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            id="asha-type-filter"
          >
            <option value="all">All Registries</option>
            <option value="pregnancy">Pregnancy Tracker</option>
            <option value="immunization">Child Immunization</option>
            <option value="chronic_care">Chronic disease cases</option>
          </select>
        </div>

        <button 
          className="add-log-btn" 
          style={{ backgroundColor: 'var(--secondary)' }}
          onClick={() => setShowAddForm(!showAddForm)}
          id="btn-show-add-patient"
        >
          <UserPlus size={16} />
          <span>Register Villager</span>
        </button>
      </div>

      {/* Register Villager Form */}
      {showAddForm && (
        <form onSubmit={handleAddPatient} className="scheme-result-card eligible" style={{ display: 'flex', flexDirection: 'column', gap: 12, borderStyle: 'dashed' }}>
          <h4 style={{ fontWeight: 800 }}>Register New Villager under Care</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group">
              <label className="form-label" htmlFor="new-p-name">Full Name</label>
              <input type="text" id="new-p-name" className="form-input" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Laxmi Devi" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="new-p-age">Age</label>
              <input type="number" id="new-p-age" className="form-input" value={newAge} onChange={(e) => setNewAge(e.target.value)} placeholder="e.g. 26" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="new-p-house">House Number / Ward</label>
              <input type="text" id="new-p-house" className="form-input" value={newHouse} onChange={(e) => setNewHouse(e.target.value)} placeholder="e.g. House 42, Ward 3" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="new-p-type">Registry Type</label>
              <select id="new-p-type" className="form-select" value={newType} onChange={(e) => setNewType(e.target.value as any)}>
                <option value="pregnancy">Pregnancy Care</option>
                <option value="immunization">Child Immunization</option>
                <option value="chronic_care">Chronic Disease care</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="new-p-task">Scheduled Action/Task</label>
            <input type="text" id="new-p-task" className="form-input" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="e.g. Tetanus shot appointment, iron tablets replenishment" />
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 6 }}>
            <button type="button" className="facility-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
            <button type="submit" className="add-log-btn" style={{ backgroundColor: 'var(--success)' }} id="btn-save-new-patient">Register & Save</button>
          </div>
        </form>
      )}

      {/* Patient rows */}
      <div className="patient-list">
        {filteredPatients.map(p => (
          <div key={p.id} className="patient-row" id={`patient-row-${p.id}`}>
            <div className="patient-main-info">
              <div className="patient-name-box">
                <span className="patient-name">{p.name}</span>
                <span className="patient-house">{p.houseNumber}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>({p.age} yrs)</span>
              </div>
              <div className="patient-sub-details">
                <span style={{ color: p.type === 'pregnancy' ? 'var(--primary)' : p.type === 'immunization' ? 'var(--accent)' : 'var(--secondary)', fontWeight: 700 }}>
                  {p.type === 'pregnancy' ? 'Pregnancy Care' : p.type === 'immunization' ? 'Immunization Tracking' : 'Chronic Health Tracking'}
                </span>
                <span style={{ margin: '0 8px' }}>•</span>
                <span>Last visit: {p.lastVisit}</span>
              </div>
              {p.vitalsLog && p.vitalsLog.bp !== 'N/A' && (
                <div style={{ fontSize: '11px', backgroundColor: 'var(--bg-main)', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', marginTop: 4 }}>
                  📊 Vitals: BP: <strong>{p.vitalsLog.bp}</strong> | Sugar: <strong>{p.vitalsLog.bloodSugar} mg/dL</strong>
                </div>
              )}
            </div>

            <div className="patient-status-indicator">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className={`patient-alert-badge ${p.status}`}>
                  {p.status === 'due' ? t.statusDue : p.status === 'scheduled' ? t.statusScheduled : t.statusDone}
                </span>
                <button 
                  className="asha-action-btn"
                  onClick={() => handleMarkDone(p.id)}
                  id={`btn-complete-patient-${p.id}`}
                >
                  {p.status === 'none' ? 'Undo Complete' : t.markDone}
                </button>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-dark)', fontWeight: 500, marginTop: 4 }}>
                👉 {p.nextScheduledTask}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Village Health Events */}
      <div className="emergency-contact-box" style={{ marginTop: 10 }}>
        <h3 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <Calendar size={14} />
          Village Health Events Schedule
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {events.map(ev => (
            <label key={ev.id} className="doc-item" style={{ justifyContent: 'space-between', padding: '8px 12px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input 
                  type="checkbox" 
                  className="doc-checkbox" 
                  checked={ev.done} 
                  onChange={() => handleToggleEvent(ev.id)}
                  id={`event-chk-${ev.id}`}
                />
                <span style={{ textDecoration: ev.done ? 'line-through' : 'none', color: ev.done ? 'var(--text-muted)' : 'var(--text-dark)', fontWeight: 600 }}>
                  {ev.name}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>{ev.date}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
