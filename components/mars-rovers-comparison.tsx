"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts"
import { useLanguage } from "@/contexts/language-context"

export default function MarsRoversComparison() {
  const { language } = useLanguage()

  const roversData = [
    {
      subject: language === "es" ? "Peso (kg)" : "Weight (kg)",
      Sojourner: 10,
      "Spirit/Opportunity": 180,
      Curiosity: 900,
      Perseverance: 1025,
      fullMark: 1100,
    },
    {
      subject: language === "es" ? "Velocidad (m/h)" : "Speed (m/h)",
      Sojourner: 1,
      "Spirit/Opportunity": 5,
      Curiosity: 4,
      Perseverance: 4.2,
      fullMark: 10,
    },
    {
      subject: language === "es" ? "Instrumentos" : "Instruments",
      Sojourner: 3,
      "Spirit/Opportunity": 5,
      Curiosity: 10,
      Perseverance: 13,
      fullMark: 15,
    },
    {
      subject: language === "es" ? "Autonomía" : "Autonomy",
      Sojourner: 2,
      "Spirit/Opportunity": 5,
      Curiosity: 8,
      Perseverance: 9,
      fullMark: 10,
    },
    {
      subject: language === "es" ? "Distancia (km)" : "Distance (km)",
      Sojourner: 0.1,
      "Spirit/Opportunity": 45,
      Curiosity: 28,
      Perseverance: 12,
      fullMark: 50,
    },
  ]

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle>{language === "es" ? "Comparación de Rovers" : "Rover Comparison"}</CardTitle>
        <CardDescription>
          {language === "es"
            ? "Características de los principales rovers enviados a Marte"
            : "Characteristics of the main rovers sent to Mars"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={roversData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, "auto"]} />
              <Radar name="Sojourner (1997)" dataKey="Sojourner" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
              <Radar
                name="Spirit/Opportunity (2004)"
                dataKey="Spirit/Opportunity"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.2}
              />
              <Radar name="Curiosity (2012)" dataKey="Curiosity" stroke="#ffc658" fill="#ffc658" fillOpacity={0.2} />
              <Radar
                name="Perseverance (2021)"
                dataKey="Perseverance"
                stroke="#ff8042"
                fill="#ff8042"
                fillOpacity={0.2}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
