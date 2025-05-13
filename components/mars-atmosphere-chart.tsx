"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { useLanguage } from "@/contexts/language-context"

const atmosphereData = [
  { name: "CO₂", value: 95.32, color: "#ef4444" },
  { name: "N₂", value: 2.7, color: "#3b82f6" },
  { name: "Ar", value: 1.6, color: "#a855f7" },
  { name: "O₂", value: 0.13, color: "#22c55e" },
  { name: "CO", value: 0.08, color: "#f97316" },
  { name: "H₂O", value: 0.03, color: "#06b6d4" },
  { name: "Other", value: 0.14, color: "#94a3b8" },
]

export default function MarsAtmosphereChart() {
  const { language } = useLanguage()

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle>{language === "es" ? "Composición Atmosférica" : "Atmospheric Composition"}</CardTitle>
        <CardDescription>
          {language === "es" ? "Gases presentes en la atmósfera marciana" : "Gases present in the Martian atmosphere"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={atmosphereData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {atmosphereData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, language === "es" ? "Porcentaje" : "Percentage"]}
                contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "none" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
          {atmosphereData.map((gas, index) => (
            <div
              key={index}
              className="bg-zinc-800 p-2 rounded text-center"
              style={{ borderLeft: `4px solid ${gas.color}` }}
            >
              <p className="font-medium">{gas.name}</p>
              <p className="text-sm text-zinc-400">{gas.value}%</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
