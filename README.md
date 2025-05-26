# Cosmic Explorer

Una aplicación web interactiva para explorar el cosmos, desarrollada con Next.js y TypeScript.

## Características

- Exploración interactiva del sistema solar
- Información detallada sobre planetas y cuerpos celestes
- E-books de la NASA disponibles para descarga
- Sistema de comentarios y valoraciones
- Soporte multiidioma (Español/Inglés)
- Diseño responsive y moderno

## Tecnologías utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- Firebase (Autenticación , Base de Datos, Sistema de comentarios y Valoraciones)
- Framer Motion
- Lucide Icons

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/cosmic-explorer.git
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install 
```

3. Configura las variables de entorno:
Crea un archivo `.env.local` con las siguientes variables:
```
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

## Estructura del proyecto

```
cosmic-explorer/
├── app/                # Directorio principal de la aplicación
├── components/         # Componentes reutilizables
├── contexts/          # Contextos de React
├── lib/               # Utilidades y configuraciones
├── public/            # Archivos estáticos
└── styles/            # Estilos globales
```

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
