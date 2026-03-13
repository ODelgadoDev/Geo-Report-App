import type { Report } from '../types/report';

const STORAGE_KEY = 'mobile_reports';

export function getReports(): Report[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error al leer reportes del almacenamiento:', error);
    return [];
  }
}

export function saveReport(report: Report): void {
  try {
    const reports = getReports();
    reports.unshift(report);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (error) {
    console.error('Error al guardar reporte:', error);
  }
}

export function deleteReport(id: string): void {
  try {
    const reports = getReports().filter((report) => report.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (error) {
    console.error('Error al eliminar reporte:', error);
  }
}

export function clearReports(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error al limpiar reportes:', error);
  }
}