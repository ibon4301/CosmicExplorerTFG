import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface Ebook {
  title: string
  description: string
  image: string
  downloadUrl: string
  category: string
}

const SECTIONS = {
  nasa_history: "NASA History",
  aeronautics: "Aeronautics",
  science: "Science",
  space_station_guides: "Space Station Researcher's Guides"
}

export async function GET() {
  try {
    const baseDirectory = path.join(process.cwd(), 'public/pdfs/ebooks')
    let allEbooks: Ebook[] = []

    // Leer cada sección
    for (const [section, category] of Object.entries(SECTIONS)) {
      const sectionPath = path.join(baseDirectory, section)
      
      // Verificar si el directorio existe
      if (fs.existsSync(sectionPath)) {
        const files = fs.readdirSync(sectionPath)
        
        const sectionEbooks = files
          .filter(file => file.endsWith('.pdf'))
          .map(file => {
            const fileName = path.parse(file).name
            // Convertir el nombre del archivo en un título legible
            const title = fileName
              .split('_')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
            
            return {
              title,
              description: `Descarga el PDF de ${title}`,
              image: `/pdfs/ebooks/${section}/${fileName}.jpg`,
              downloadUrl: `/pdfs/ebooks/${section}/${file}`,
              category
            }
          })

        allEbooks = [...allEbooks, ...sectionEbooks]
      }
    }

    return NextResponse.json(allEbooks)
  } catch (error) {
    console.error('Error reading PDFs directory:', error)
    return NextResponse.json({ error: 'Error reading PDFs directory' }, { status: 500 })
  }
} 