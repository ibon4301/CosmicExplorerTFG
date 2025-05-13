"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useLanguage } from "@/contexts/language-context"

const temperatureData = [
  { month: "Jan", min: -125, max: -30, avg: -60 },
  { month: "Feb", min: -120, max: -25, avg: -55 },
  { month: "Mar", min: -110, max: -20, avg: -50 },
  { month: "Apr", min: -100, max: -10, avg: -45 },
  { month: "May", min: -90, max: 0, avg: -40 },
  { month: "Jun", min: -85, max: 5, avg: -35 },
  { month: "Jul", min: -80, max: 10, avg: -30 },
  { month: "Aug", min: -85, max: 5, avg: -35 },
  { month: "Sep", min: -90, max: 0, avg: -40 },
  { month: "Oct", min: -100, max: -10, avg: -45 },
  { month: "Nov", min: -110, max: -20, avg: -50 },
  { month: "Dec", min: -120, max: -25, avg: -55 },
]

export default function MarsTemperatureChart() {
  const { language } = useLanguage()

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle>{language === "es" ? "Temperatura Superficial" : "Surface Temperature"}</CardTitle>
        <CardDescription>
          {language === "es"
            ? "Variación de temperatura a lo largo del año marciano"
            : "Temperature variation throughout the Martian year"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={temperatureData}>
              <XAxis dataKey="month" />
              <YAxis domain={[-140, 20]} />
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
              ? "Las temperaturas en Marte pueden variar desde -153°C en los polos hasta 20°C en el ecuador durante el verano."
              : "Temperatures on Mars can range from -153°C at the poles to 20°C at the equator during summer."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
