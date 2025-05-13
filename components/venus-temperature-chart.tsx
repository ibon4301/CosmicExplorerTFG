"use client";

import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";

export default function VenusTemperatureChart() {
  const { language } = useLanguage();
  
  const data = [
    {
      location: language === "es" ? "Venus (día)" : "Venus (day)",
      temperatura: 462,
      color: "hsl(30, 70%, 50%)"
    },
    {
      location: language === "es" ? "Venus (noche)" : "Venus (night)",
      temperatura: 440,
      color: "hsl(30, 70%, 30%)"
    },
    {
      location: language === "es" ? "Tierra (máx)" : "Earth (max)",
      temperatura: 58,
      color: "hsl(200, 70%, 50%)"
    },
    {
      location: language === "es" ? "Mercurio (día)" : "Mercury (day)",
      temperatura: 430,
      color: "hsl(15, 70%, 50%)"
    }
  ];

  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-amber-300 font-space">
          {language === "es" ? "Temperatura Extrema" : "Extreme Temperature"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveBar
            data={data}
            keys={["temperatura"]}
            indexBy="location"
            margin={{ top: 10, right: 20, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            colors={({ data }) => data.color}
            borderRadius={4}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: language === "es" ? "Ubicación" : "Location",
              legendPosition: "middle",
              legendOffset: 40,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: language === "es" ? "Temperatura (°C)" : "Temperature (°C)",
              legendPosition: "middle",
              legendOffset: -50,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 3]],
            }}
            legends={[]}
            theme={{
              text: {
                fill: "#94a3b8",
              },
              axis: {
                ticks: {
                  line: {
                    stroke: "#475569",
                  },
                  text: {
                    fill: "#94a3b8",
                  },
                },
                legend: {
                  text: {
                    fill: "#e2e8f0",
                  },
                },
              },
              grid: {
                line: {
                  stroke: "#334155",
                },
              },
            }}
            role="application"
            ariaLabel={language === "es" ? "Comparación de temperatura de Venus" : "Venus temperature comparison"}
            barAriaLabel={(e) =>
              `${e.id}: ${e.formattedValue} ${language === "es" ? "grados Celsius" : "degrees Celsius"}`
            }
          />
        </div>
        <p className="text-sm text-zinc-400 mt-4">
          {language === "es"
            ? "Venus es el planeta más caliente del Sistema Solar, incluso más que Mercurio a pesar de estar más lejos del Sol. Esto se debe a su densa atmósfera de CO₂ que atrapa el calor en un efecto invernadero extremo."
            : "Venus is the hottest planet in the Solar System, even hotter than Mercury despite being farther from the Sun. This is due to its dense CO₂ atmosphere trapping heat in an extreme greenhouse effect."}
        </p>
      </CardContent>
    </Card>
  );
} 