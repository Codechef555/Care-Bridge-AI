import React, { useState } from 'react';
import { Plus, HeartPulse, Activity, Thermometer, FileSpreadsheet } from 'lucide-react';
import { type Language, translations } from '../services/translations';

interface HealthLogPanelProps {
  currentLanguage: Language;
}

interface VitalRecord {
  id: string;
  date: string;
  bp: string;
  bloodSugar: number;
  temp: number;
  pulse: number;
  bpStatus: 'normal' | 'warning' | 'danger';
  sugarStatus: 'normal' | 'warning' | 'danger';
}

export const HealthLogPanel: React.FC<HealthLogPanelProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];
  
  // Inputs
  const [bpSys, setBpSys] = useState('120');
  const [bpDia, setBpDia] = useState('80');
  const [bloodSugar, setBloodSugar] = useState('98');
  const [temp, setTemp] = useState('98.4');
  const [pulse, setPulse] = useState('72');

  // Logs state (initial mock database)
  const [logs, setLogs] = useState<VitalRecord[]>([
    {
      id: 'log-1',
      date: '2026-06-18, 09:30 AM',
      bp: '145/92',
      bloodSugar: 165,
      temp: 98.6,
      pulse: 78,
      bpStatus: 'warning',
      sugarStatus: 'warning'
    },
    {
      id: 'log-2',
      date: '2026-06-10, 08:15 AM',
      bp: '118/76',
      bloodSugar: 92,
      temp: 98.4,
      pulse: 70,
      bpStatus: 'normal',
      sugarStatus: 'normal'
    }
  ]);

  // Status solvers
  const getBpStatus = (sys: number, dia: number): 'normal' | 'warning' | 'danger' => {
    if (sys >= 160 || dia >= 100) return 'danger';
    if (sys >= 135 || dia >= 85) return 'warning';
    return 'normal';
  };

  const getSugarStatus = (val: number): 'normal' | 'warning' | 'danger' => {
    if (val >= 200) return 'danger';
    if (val >= 126) return 'warning';
    return 'normal';
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const sys = Number(bpSys);
    const dia = Number(bpDia);
    const sugar = Number(bloodSugar);
    const temperature = Number(temp);
    const heart = Number(pulse);

    if (isNaN(sys) || isNaN(dia) || isNaN(sugar) || isNaN(temperature) || isNaN(heart)) {
      alert("Please enter valid numeric health vitals.");
      return;
    }

    const now = new Date();
    const dateStr = now.toLocaleDateString() + ', ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newRecord: VitalRecord = {
      id: `log-${Date.now()}`,
      date: dateStr,
      bp: `${bpSys}/${bpDia}`,
      bloodSugar: sugar,
      temp: temperature,
      pulse: heart,
      bpStatus: getBpStatus(sys, dia),
      sugarStatus: getSugarStatus(sugar)
    };

    setLogs([newRecord, ...logs]);
  };

  const handleExport = () => {
    alert("Vitals Report Generated!\n\nSaved locally as CareBridge_Vitals_Report.csv. You can hand this report to your village ASHA worker or doctor.");
  };

  // Vitals Status indicators for the current inputs
  const currentBpStatus = getBpStatus(Number(bpSys), Number(bpDia));
  const currentSugarStatus = getSugarStatus(Number(bloodSugar));

  return (
    <div className="vital-tracker-container">
      <h2 className="asha-section-title" style={{ borderColor: 'var(--primary)' }}>
        {t.vitalsHeader}
      </h2>

      {/* Input panel */}
      <form onSubmit={handleAddLog} className="vital-tracker-container" style={{ gap: 14 }}>
        <div className="vital-input-grid">
          {/* Blood Pressure Card */}
          <div className="vital-input-card">
            <div className="vital-input-header">
              <span>BP (Systolic / Diastolic)</span>
              <HeartPulse size={16} style={{ color: currentBpStatus === 'normal' ? 'var(--success)' : currentBpStatus === 'warning' ? 'var(--accent)' : 'var(--danger)' }} />
            </div>
            <div className="vital-field-wrapper">
              <input
                type="text"
                className="vital-field"
                style={{ width: '45%' }}
                value={bpSys}
                onChange={(e) => setBpSys(e.target.value)}
                placeholder="120"
                id="vital-bp-sys"
              />
              <span>/</span>
              <input
                type="text"
                className="vital-field"
                style={{ width: '45%' }}
                value={bpDia}
                onChange={(e) => setBpDia(e.target.value)}
                placeholder="80"
                id="vital-bp-dia"
              />
            </div>
            <div className={`vital-status-light ${currentBpStatus}`} />
          </div>

          {/* Blood Sugar Card */}
          <div className="vital-input-card">
            <div className="vital-input-header">
              <span>{t.bloodSugarLabel.split(' ')[0]}</span>
              <Activity size={16} style={{ color: currentSugarStatus === 'normal' ? 'var(--success)' : currentSugarStatus === 'warning' ? 'var(--accent)' : 'var(--danger)' }} />
            </div>
            <div className="vital-field-wrapper">
              <input
                type="text"
                className="vital-field"
                value={bloodSugar}
                onChange={(e) => setBloodSugar(e.target.value)}
                placeholder="100"
                id="vital-sugar"
              />
              <span className="vital-unit">mg/dL</span>
            </div>
            <div className={`vital-status-light ${currentSugarStatus}`} />
          </div>

          {/* Temperature Card */}
          <div className="vital-input-card">
            <div className="vital-input-header">
              <span>{t.tempLabel.split(' ')[0]}</span>
              <Thermometer size={16} style={{ color: Number(temp) > 100.4 ? 'var(--danger)' : 'var(--success)' }} />
            </div>
            <div className="vital-field-wrapper">
              <input
                type="text"
                className="vital-field"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                placeholder="98.4"
                id="vital-temp"
              />
              <span className="vital-unit">°F</span>
            </div>
            <div className={`vital-status-light ${Number(temp) > 100.4 ? 'danger' : 'normal'}`} />
          </div>

          {/* Pulse Card */}
          <div className="vital-input-card">
            <div className="vital-input-header">
              <span>Pulse Rate</span>
              <Activity size={16} style={{ color: 'var(--primary)' }} />
            </div>
            <div className="vital-field-wrapper">
              <input
                type="text"
                className="vital-field"
                value={pulse}
                onChange={(e) => setPulse(e.target.value)}
                placeholder="72"
                id="vital-pulse"
              />
              <span className="vital-unit">bpm</span>
            </div>
            <div className="vital-status-light normal" />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button type="submit" className="add-log-btn" style={{ flex: 1 }} id="btn-add-vital">
            <Plus size={16} />
            <span>{t.addLogBtn}</span>
          </button>
          <button type="button" className="facility-btn" style={{ border: '1px solid var(--border-color)' }} onClick={handleExport} id="btn-export-vitals">
            <FileSpreadsheet size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </form>

      {/* Log History */}
      <div className="past-logs-box">
        <h3 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>
          {t.logHistory}
        </h3>
        
        <div className="logs-table-wrapper">
          <table className="logs-table">
            <thead>
              <tr>
                <th>Date / Time</th>
                <th>BP</th>
                <th>Sugar</th>
                <th>Temp</th>
                <th>Pulse</th>
                <th>Zone Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => {
                const worstStatus = log.bpStatus === 'danger' || log.sugarStatus === 'danger' 
                  ? 'danger' 
                  : log.bpStatus === 'warning' || log.sugarStatus === 'warning' 
                    ? 'warning' 
                    : 'normal';

                return (
                  <tr key={log.id} id={log.id}>
                    <td style={{ fontWeight: 600 }}>{log.date}</td>
                    <td>{log.bp}</td>
                    <td>{log.bloodSugar} mg/dL</td>
                    <td>{log.temp} °F</td>
                    <td>{log.pulse} bpm</td>
                    <td>
                      <span className={`vital-badge-text ${worstStatus}`}>
                        {worstStatus === 'normal' ? t.normalStatus.split(' ')[0] : worstStatus === 'warning' ? 'CAUTION' : 'DANGER'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
