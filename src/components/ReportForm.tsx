import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import type { Report } from '../types/report';

interface ReportFormProps {
  onSave: (report: Report) => void;
}

export default function ReportForm({ onSave }: ReportFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationMessage, setLocationMessage] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraMessage, setCameraMessage] = useState('');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage('Tu navegador no soporta geolocalización.');
      return;
    }

    setLoadingLocation(true);
    setLocationMessage('Obteniendo ubicación...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLocationMessage('Ubicación obtenida correctamente.');
        setLoadingLocation(false);
      },
      () => {
        setLocationMessage('No se pudo obtener la ubicación. Revisa permisos.');
        setLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraMessage('Tu navegador no soporta acceso directo a la cámara.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      });

      streamRef.current = stream;
      setCameraOpen(true);
      setCameraMessage('Cámara activa.');

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error(error);
      setCameraMessage('No se pudo abrir la cámara. Revisa permisos.');
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraOpen(false);
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.drawImage(video, 0, 0, width, height);
    const imageData = canvas.toDataURL('image/png');
    setImageBase64(imageData);
    setCameraMessage('Foto capturada correctamente.');
    stopCamera();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImageBase64(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setLatitude(null);
    setLongitude(null);
    setImageBase64(null);
    setLocationMessage('');
    setCameraMessage('');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      setFormMessage('Completa el título y la descripción.');
      return;
    }

    const newReport: Report = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      latitude,
      longitude,
      imageBase64,
      createdAt: new Date().toLocaleString(),
    };

    onSave(newReport);
    setFormMessage('Reporte guardado correctamente.');
    resetForm();
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <section className="card">
      <h2>Nuevo reporte</h2>

      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label htmlFor="title">Título</label>
          <input
            id="title"
            type="text"
            placeholder="Ej. Incidencia detectada"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            rows={4}
            placeholder="Describe lo ocurrido"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Ubicación GPS</label>
          <button
            type="button"
            onClick={handleGetLocation}
            disabled={loadingLocation}
            className="secondary-btn"
          >
            {loadingLocation ? 'Obteniendo...' : 'Obtener ubicación'}
          </button>

          <div className="gps-box">
            <p><strong>Latitud:</strong> {latitude ?? 'No disponible'}</p>
            <p><strong>Longitud:</strong> {longitude ?? 'No disponible'}</p>
            {locationMessage && <p className="info-text">{locationMessage}</p>}
          </div>
        </div>

        <div className="field">
          <label>Cámara</label>

          <div className="camera-actions">
            <button type="button" className="secondary-btn" onClick={startCamera}>
              Abrir cámara
            </button>

            <label className="file-btn">
              Subir o tomar foto
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageChange}
                hidden
              />
            </label>
          </div>

          {cameraMessage && <p className="info-text">{cameraMessage}</p>}

          {cameraOpen && (
            <div className="camera-box">
              <video ref={videoRef} autoPlay playsInline className="camera-video" />
              <div className="camera-actions">
                <button type="button" className="primary-btn" onClick={takePhoto}>
                  Capturar foto
                </button>
                <button type="button" className="danger-btn" onClick={stopCamera}>
                  Cerrar cámara
                </button>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: 'none' }} />

          {imageBase64 && (
            <div className="preview-container">
              <img src={imageBase64} alt="Vista previa" className="preview-image" />
            </div>
          )}
        </div>

        <button type="submit" className="primary-btn">
          Guardar reporte
        </button>

        {formMessage && <p className="success-text">{formMessage}</p>}
      </form>
    </section>
  );
}