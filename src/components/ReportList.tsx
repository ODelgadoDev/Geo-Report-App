import type { Report } from '../types/report';

interface ReportListProps {
  reports: Report[];
  onDelete: (id: string) => void;
}

export default function ReportList({ reports, onDelete }: ReportListProps) {
  return (
    <section className="card">
      <h2>Reportes guardados</h2>

      {reports.length === 0 ? (
        <p>No hay reportes guardados todavía.</p>
      ) : (
        <div className="report-list">
          {reports.map((report) => (
            <article key={report.id} className="report-item">
              <h3>{report.title}</h3>
              <p>{report.description}</p>

              <p>
                <strong>Latitud:</strong>{' '}
                {report.latitude !== null ? report.latitude : 'No registrada'}
              </p>

              <p>
                <strong>Longitud:</strong>{' '}
                {report.longitude !== null ? report.longitude : 'No registrada'}
              </p>

              <p>
                <strong>Fecha:</strong> {report.createdAt}
              </p>

              {report.imageBase64 && (
                <img
                  src={report.imageBase64}
                  alt={report.title}
                  className="report-image"
                />
              )}

              <button
                className="danger-btn"
                onClick={() => onDelete(report.id)}
              >
                Eliminar
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}