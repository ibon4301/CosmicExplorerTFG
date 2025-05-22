// Script para descargar imágenes para las tarjetas de hechos del sistema solar
// Ejecutar con: node scripts/download-fact-images.js

const fs = require('fs');
const path = require('path');
const https = require('https');

// Asegúrate de que el directorio existe
const factsDir = path.join(__dirname, '../public/images/facts');
if (!fs.existsSync(factsDir)) {
  fs.mkdirSync(factsDir, { recursive: true });
  console.log('Directorio creado:', factsDir);
}

// URLs de imágenes sugeridas (NASA y otras fuentes de dominio público)
const images = [
  {
    name: 'sun_fact.jpg',
    url: 'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0171.jpg', // Imagen del Sol de NASA SDO
  },
  {
    name: 'rings_fact.jpg',
    url: 'https://solarsystem.nasa.gov/system/resources/detail_files/17791_PIA21046.jpg', // Anillos de Saturno de NASA
  },
  {
    name: 'dwarf_planets_fact.jpg',
    url: 'https://solarsystem.nasa.gov/system/resources/detail_files/933_BIG_P_COLOR_2_TRUE_COLOR1_1980.jpg', // Plutón de NASA
  },
  {
    name: 'asteroid_belt_fact.jpg',
    url: 'https://solarsystem.nasa.gov/system/resources/detail_files/1060_PIA19310.jpg', // Cinturón de asteroides de NASA
  },
  {
    name: 'kuiper_belt_fact.jpg',
    url: 'https://solarsystem.nasa.gov/system/resources/detail_files/777_PIA09113.jpg', // Representación del Cinturón de Kuiper
  },
  {
    name: 'moons_fact.jpg',
    url: 'https://solarsystem.nasa.gov/system/resources/detail_files/2486_stsci-h-p1936a_1800.jpg', // Lunas de Júpiter de NASA
  },
];

// Función para descargar una imagen
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(factsDir, filename);
    const file = fs.createWriteStream(filePath);

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Error al descargar ${url}: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`Imagen descargada: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Eliminar archivo parcial
      reject(err);
    });
  });
}

// Descargar todas las imágenes
async function downloadAllImages() {
  console.log('Iniciando descarga de imágenes...');
  
  for (const image of images) {
    try {
      await downloadImage(image.url, image.name);
    } catch (error) {
      console.error(`Error al descargar ${image.name}:`, error.message);
    }
  }
  
  console.log('Proceso de descarga completado.');
}

downloadAllImages(); 