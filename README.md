# 📱 Evidencia Móvil PWA

Aplicación **Progressive Web App (PWA)** multiplataforma para registrar reportes utilizando **GPS, cámara y interactivos**.  
La aplicación permite capturar incidentes, guardar su ubicación y visualizar la información.

---





# 👥 . Integrantes del Equipo

- Jesús Orlando Delgado Azar  
- Juan Arath López Alvídrez  
- Héctor Antonio Terrazas Guevara  

---

#  . Características

-  **PWA instalable**  
  Funciona offline y puede instalarse como aplicación nativa.

-  **Geolocalización GPS**  
  Obtiene latitud y longitud del dispositivo.

-  **Cámara integrada**  
  Permite capturar o subir imágenes para cada reporte.


-  **Almacenamiento local**  
  Los reportes se guardan en el navegador mediante LocalStorage.

-  **Interfaz responsive**  
  Compatible con dispositivos móviles y computadoras.

---

# 🛠️ . Tecnologías Utilizadas

**Frontend**

- React
- TypeScript
- Vite

**Mapas**

- Google Maps JavaScript API
- @react-google-maps/api

**Estilos**

- CSS Modules

**PWA**

- Workbox

**Almacenamiento**

- LocalStorage

---

# . Instalación y Ejecución

## Desarrollo

```bash
npm install
npm run dev


Funcionalidades
Crear reporte

El usuario puede registrar un incidente con:

Título

Descripción

Ubicación en latitud

Fotografía del incidente

Guardar reporte

Ver reportes


Los reportes almacenados muestran:

Título

Descripción

Coordenadas GPS

Imagen

Mapa interactivo con marcador

Botón para eliminar el reporte

📂 Estructura del Proyecto

GEO-REPORT-APP/
│
├── node_modules/
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── InstallButton.tsx
│   │   ├── ReportForm.tsx
│   │   └── ReportList.tsx
│   │
│   ├── services/
│   │   └── reportStorage.ts
│   │
│   ├── types/
│   │   └── report.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
│
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts