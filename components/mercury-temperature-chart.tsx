"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useLanguage } from "@/contexts/language-context"

const temperatureData = [
  { position: "Subsolar", min: 420, max: 430, avg: 427 },
  { position: "Equator Day", min: 390, max: 420, avg: 407 },
  { position: "Mid-latitudes Day", min: 320, max: 380, avg: 350 },
  { position: "Poles", min: 80, max: 200, avg: 140 },
  { position: "Mid-latitudes Night", min: -170, max: -110, avg: -140 },
  { position: "Equator Night", min: -180, max: -160, avg: -173 },
  { position: "Anti-solar", min: -190, max: -180, avg: -183 },
]

export default function MercuryTemperatureChart() {
  const { language } = useLanguage()

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle>{language === "es" ? "Temperatura Superficial" : "Surface Temperature"}</CardTitle>
        <CardDescription>
          {language === "es"
            ? "Variación extrema de temperatura en diferentes regiones"
            : "Extreme temperature variation across different regions"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={temperatureData}>
              <XAxis dataKey="position" />
              <YAxis domain={[-200, 450]} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-black/80 p-2 rounded shadow-lg border border-gray-700">
                        <p className="font-bold">{label}</p>
                        <p className="text-red-400">
                          {language === "es" ? "Máx" : "Max"}: {payload[0].value}°C
                        </p>
                        <p className="text-yellow-400">
                          {language === "es" ? "Promedio" : "Avg"}: {payload[1].value}°C
                        </p>
                        <p className="text-blue-400">
                          {language === "es" ? "Mín" : "Min"}: {payload[2].value}°C
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="max"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                name={language === "es" ? "Máxima" : "Maximum"}
              />
              <Line
                type="monotone"
                dataKey="avg"
                stroke="#eab308"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                name={language === "es" ? "Promedio" : "Average"}
              />
              <Line
                type="monotone"
                dataKey="min"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                name={language === "es" ? "Mínima" : "Minimum"}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center text-sm text-zinc-400">
          <p>
            {language === "es"
              ? "Mercurio tiene la mayor variación de temperatura de cualquier planeta en el Sistema Solar, desde 430°C durante el día hasta -180°C durante la noche."
              : "Mercury has the greatest temperature variation of any planet in the Solar System, from 430°C during the day to -180°C at night."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
