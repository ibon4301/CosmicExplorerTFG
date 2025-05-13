"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

interface PlanetComparisonChartProps {
  data: {
    name: string
    diameter: number
    distance: number
    orbitalPeriod: number
    moons: number
  }[]
}

export default function PlanetComparisonChart({ data }: PlanetComparisonChartProps) {
  const { language } = useLanguage()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{language === "es" ? "Comparación Planetaria" : "Planetary Comparison"}</CardTitle>
        <CardDescription>
          {language === "es"
            ? "Comparación de características clave entre planetas"
            : "Comparison of key characteristics between planets"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="diameter" fill="#8884d8" name={language === "es" ? "Diámetro (km)" : "Diameter (km)"} />
              <Bar
                dataKey="distance"
                fill="#82ca9d"
                name={language === "es" ? "Distancia (millones km)" : "Distance (million km)"}
              />
              <Bar
                dataKey="orbitalPeriod"
                fill="#ffc658"
                name={language === "es" ? "Período Orbital (días)" : "Orbital Period (days)"}
              />
              <Bar dataKey="moons" fill="#ff8042" name={language === "es" ? "Lunas" : "Moons"} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-2 bg-zinc-800 rounded-md">
            <p className="font-medium text-purple-300">{language === "es" ? "Diámetro (km)" : "Diameter (km)"}</p>
          </div>
          <div className="p-2 bg-zinc-800 rounded-md">
            <p className="font-medium text-green-300">
              {language === "es" ? "Distancia (millones km)" : "Distance (million km)"}
            </p>
          </div>
          <div className="p-2 bg-zinc-800 rounded-md">
            <p className="font-medium text-yellow-300">
              {language === "es" ? "Período Orbital (días)" : "Orbital Period (days)"}
            </p>
          </div>
          <div className="p-2 bg-zinc-800 rounded-md">
            <p className="font-medium text-orange-300">{language === "es" ? "Lunas" : "Moons"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
