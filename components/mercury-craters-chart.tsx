"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useLanguage } from "@/contexts/language-context"

const cratersData = [
  { name: "Caloris", diameter: 1550, age: 3.8, x: 1, y: 1 },
  { name: "Rembrandt", diameter: 715, age: 3.7, x: 2, y: 2 },
  { name: "Tolstoj", diameter: 390, age: 4.0, x: 3, y: 3 },
  { name: "Beethoven", diameter: 625, age: 3.9, x: 4, y: 4 },
  { name: "Rachmaninoff", diameter: 290, age: 3.6, x: 5, y: 5 },
  { name: "Shakespeare", diameter: 350, age: 3.8, x: 6, y: 6 },
  { name: "Dostoevskij", diameter: 410, age: 3.9, x: 7, y: 7 },
  { name: "Goethe", diameter: 380, age: 3.8, x: 8, y: 8 },
]

export default function MercuryCratersChart() {
  const { language } = useLanguage()

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle>{language === "es" ? "Principales Cráteres" : "Major Craters"}</CardTitle>
        <CardDescription>
          {language === "es"
            ? "Tamaño y edad estimada de los cráteres más grandes"
            : "Size and estimated age of the largest craters"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis
                type="number"
                dataKey="age"
                name="age"
                domain={[3.5, 4.1]}
                label={{
                  value: language === "es" ? "Edad (miles de millones de años)" : "Age (billion years)",
                  position: "bottom",
                }}
              />
              <YAxis
                type="number"
                dataKey="diameter"
                name="diameter"
                label={{
                  value: language === "es" ? "Diámetro (km)" : "Diameter (km)",
                  angle: -90,
                  position: "left",
                }}
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-black/80 p-2 rounded shadow-lg border border-gray-700">
                        <p className="font-bold">{payload[0].payload.name}</p>
                        <p className="text-zinc-400">
                          {language === "es" ? "Diámetro" : "Diameter"}: {payload[0].payload.diameter} km
                        </p>
                        <p className="text-zinc-400">
                          {language === "es" ? "Edad" : "Age"}: {payload[0].payload.age}{" "}
                          {language === "es" ? "mil millones de años" : "billion years"}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Scatter
                name={language === "es" ? "Cráteres" : "Craters"}
                data={cratersData}
                fill="#8884d8"
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
