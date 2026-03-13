export interface Report {
  id: string;
  title: string;
  description: string;
  latitude: number | null;
  longitude: number | null;
  imageBase64: string | null;
  createdAt: string;
}