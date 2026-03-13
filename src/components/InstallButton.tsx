import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
      setMessage('La aplicación ya fue instalada.');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      setMessage(
        'Si no aparece el instalador, usa el menú del navegador y busca “Instalar app” o “Agregar a pantalla de inicio”.'
      );
      return;
    }

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === 'accepted') {
      setMessage('Instalación aceptada.');
    } else {
      setMessage('Instalación cancelada.');
    }

    setDeferredPrompt(null);
  };

  if (installed) {
    return <p className="success-text">Aplicación instalada.</p>;
  }

  return (
    <div className="install-box">
      <button className="primary-btn" onClick={handleInstall}>
        Instalar app
      </button>
      {message && <p className="info-text">{message}</p>}
    </div>
  );
}