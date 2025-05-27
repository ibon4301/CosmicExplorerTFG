"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { useLanguage } from "@/contexts/language-context"

const atmosphereData = [
  { name: "O₂", value: 42, color: "#22c55e" },
  { name: "Na", value: 29, color: "#f97316" },
  { name: "H₂", value: 22, color: "#3b82f6" },
  { name: "He", value: 6, color: "#a855f7" },
  { name: "K", value: 0.5, color: "#ef4444" },
  { name: "Other", value: 0.5, color: "#94a3b8" },
]

export default function MercuryAtmosphereChart() {
  const { language } = useLanguage()

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle>{language === "es" ? "Exosfera Tenue" : "Tenuous Exosphere"}</CardTitle>
        <CardDescription>
          {language === "es"
            ? "Composición de la delgada capa de gases alrededor de Mercurio"
            : "Composition of Mercury's thin layer of gases"}
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
                contentStyle={{ 
                  backgroundColor: "rgba(0, 0, 0, 0.9)", 
                  border: "none",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "4px"
                }}
                itemStyle={{ color: "#fff" }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
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
