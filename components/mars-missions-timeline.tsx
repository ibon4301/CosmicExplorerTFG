"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useLanguage } from "@/contexts/language-context"

const missionsData = [
  { decade: "1960s", successful: 1, failed: 6 },
  { decade: "1970s", successful: 4, failed: 4 },
  { decade: "1990s", successful: 5, failed: 2 },
  { decade: "2000s", successful: 6, failed: 3 },
  { decade: "2010s", successful: 7, failed: 1 },
  { decade: "2020s", successful: 5, failed: 0 },
]

export default function MarsMissionsTimeline() {
  const { language } = useLanguage()

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle>{language === "es" ? "Misiones a Marte por Década" : "Mars Missions by Decade"}</CardTitle>
        <CardDescription>
          {language === "es"
            ? "Número de misiones exitosas y fallidas por década"
            : "Number of successful and failed missions by decade"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={missionsData} barGap={0} barCategoryGap={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="decade" />
              <YAxis />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-black/80 p-2 rounded shadow-lg border border-gray-700">
                        <p className="font-bold">{label}</p>
                        <p className="text-green-400">
                          {language === "es" ? "Exitosas" : "Successful"}: {payload[0].value}
                        </p>
                        <p className="text-red-400">
                          {language === "es" ? "Fallidas" : "Failed"}: {payload[1].value}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar
                dataKey="successful"
                fill="#22c55e"
                name={language === "es" ? "Misiones Exitosas" : "Successful Missions"}
              />
              <Bar dataKey="failed" fill="#ef4444" name={language === "es" ? "Misiones Fallidas" : "Failed Missions"} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center text-sm text-zinc-400">
          <p>
            {language === "es"
              ? "Más de 50 misiones han sido enviadas a Marte desde la década de 1960, con una tasa de éxito cada vez mayor."
              : "Over 50 missions have been sent to Mars since the 1960s, with an increasingly higher success rate."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
