"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useLanguage } from "@/contexts/language-context"

const missionsData = [
  { mission: "Mariner 10", year: 1974, flybys: 3, coverage: 45 },
  { mission: "MESSENGER", year: 2011, flybys: 3, coverage: 100 },
  { mission: "BepiColombo", year: 2025, flybys: 6, coverage: 0 },
]

export default function MercuryMissionsTimeline() {
  const { language } = useLanguage()

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle>{language === "es" ? "Misiones a Mercurio" : "Mercury Missions"}</CardTitle>
        <CardDescription>
          {language === "es" ? "Principales misiones de exploración a Mercurio" : "Major Mercury exploration missions"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={missionsData} barGap={0} barCategoryGap={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="mission" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" domain={[0, 6]} />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" domain={[0, 100]} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-black/80 p-2 rounded shadow-lg border border-gray-700">
                        <p className="font-bold">{label}</p>
                        <p className="text-zinc-400">
                          {language === "es" ? "Año" : "Year"}: {payload[0].payload.year}
                        </p>
                        <p className="text-purple-400">
                          {language === "es" ? "Sobrevuelos" : "Flybys"}: {payload[0].value}
                        </p>
                        <p className="text-green-400">
                          {language === "es" ? "Cobertura" : "Coverage"}: {payload[1].value}%
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar yAxisId="left" dataKey="flybys" fill="#8884d8" name={language === "es" ? "Sobrevuelos" : "Flybys"} />
              <Bar
                yAxisId="right"
                dataKey="coverage"
                fill="#82ca9d"
                name={language === "es" ? "Cobertura de Superficie (%)" : "Surface Coverage (%)"}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center text-sm text-zinc-400">
          <p>
            {language === "es"
              ? "Mercurio ha sido visitado por solo dos naves espaciales, con una tercera misión (BepiColombo) actualmente en ruta."
              : "Mercury has been visited by only two spacecraft, with a third mission (BepiColombo) currently en route."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
