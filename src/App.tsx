import { useEffect, useState } from 'react';
import './index.css';
import InstallButton from './components/InstallButton';
import ReportForm from './components/ReportForm';
import ReportList from './components/ReportList';
import type { Report } from './types/report';
import { deleteReport, getReports, saveReport } from './services/reportStorage';

export default function App() {
  const [reports, setReports] = useState<Report[]>([]);
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    setReports(getReports());

    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const handleSaveReport = (report: Report) => {
    saveReport(report);
    setReports(getReports());
  };

  const handleDeleteReport = (id: string) => {
    deleteReport(id);
    setReports(getReports());
  };

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Evidencia Móvil PWA</h1>
        <p>
          Aplicación multiplataforma para registrar reportes con GPS, cámara y almacenamiento simulado.
        </p>

        <div className="status-row">
          <span className={online ? 'badge online' : 'badge offline'}>
            {online ? 'En línea' : 'Sin conexión'}
          </span>
        </div>

        <InstallButton />
      </header>

      <div className="grid">
        <ReportForm onSave={handleSaveReport} />
        <ReportList reports={reports} onDelete={handleDeleteReport} />
      </div>
    </main>
  );
}