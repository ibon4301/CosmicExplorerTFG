"use client"

import { Pie, PieChart, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

interface PlanetCompositionChartProps {
  planetName: string
  data: {
    name: string
    value: number
    color: string
  }[]
}

export default function PlanetCompositionChart({ planetName, data }: PlanetCompositionChartProps) {
  const { language } = useLanguage()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{language === "es" ? `Composición de ${planetName}` : `${planetName} Composition`}</CardTitle>
        <CardDescription>
          {language === "es"
            ? "Distribución de los principales elementos y materiales"
            : "Distribution of main elements and materials"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          {data.map((item, index) => (
            <div key={index} className="p-2 bg-zinc-800 rounded-md" style={{ borderLeft: `4px solid ${item.color}` }}>
              <p className="font-medium">
                {item.name} <span className="text-zinc-300">{item.value}%</span>
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
