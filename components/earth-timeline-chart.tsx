"use client";

import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";

export default function EarthTimelineChart() {
  const { language } = useLanguage();
  
  const data = [
    {
      era: language === "es" ? "Hádico" : "Hadean",
      tiempo: 600,
      color: "hsl(0, 70%, 50%)",
      descripcion: language === "es" ? "Formación de la Tierra" : "Earth Formation"
    },
    {
      era: language === "es" ? "Arcaico" : "Archean",
      tiempo: 1400,
      color: "hsl(30, 70%, 50%)",
      descripcion: language === "es" ? "Primeras formas de vida" : "First life forms"
    },
    {
      era: language === "es" ? "Proterozoico" : "Proterozoic",
      tiempo: 1900,
      color: "hsl(60, 70%, 50%)",
      descripcion: language === "es" ? "Oxígeno atmosférico" : "Atmospheric oxygen"
    },
    {
      era: language === "es" ? "Paleozoico" : "Paleozoic",
      tiempo: 290,
      color: "hsl(120, 70%, 50%)",
      descripcion: language === "es" ? "Vida terrestre" : "Land life"
    },
    {
      era: language === "es" ? "Mesozoico" : "Mesozoic",
      tiempo: 185,
      color: "hsl(200, 70%, 50%)",
      descripcion: language === "es" ? "Era de los dinosaurios" : "Age of dinosaurs"
    },
    {
      era: language === "es" ? "Cenozoico" : "Cenozoic",
      tiempo: 66,
      color: "hsl(270, 70%, 50%)",
      descripcion: language === "es" ? "Era de los mamíferos" : "Age of mammals"
    }
  ];

  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-blue-400 font-space">
          {language === "es" ? "Historia Geológica" : "Geological History"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveBar
            data={data}
            keys={["tiempo"]}
            indexBy="era"
            margin={{ top: 10, right: 20, bottom: 50, left: 60 }}
            padding={0.3}
            layout="horizontal"
            valueScale={{ type: "linear" }}
            colors={({ data }) => data.color}
            borderRadius={4}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: language === "es" ? "Millones de años" : "Million years",
              legendPosition: "middle",
              legendOffset: 40,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 3]],
            }}
            tooltip={({ data }) => (
              <div className="bg-zinc-800 p-2 rounded-md border border-zinc-700 shadow-lg">
                <p className="font-medium text-white">{data.era}</p>
                <p className="text-sm text-zinc-300">{data.descripcion}</p>
                <p className="text-xs text-zinc-400">
                  {language === "es" 
                    ? `${data.tiempo} millones de años` 
                    : `${data.tiempo} million years`}
                </p>
              </div>
            )}
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
            ariaLabel={language === "es" ? "Historia geológica de la Tierra" : "Earth geological history"}
          />
        </div>
        <p className="text-sm text-zinc-400 mt-4">
          {language === "es"
            ? "La Tierra tiene aproximadamente 4,54 mil millones de años. Su historia geológica se divide en eones, eras y períodos, cada uno marcado por eventos significativos como la aparición de la vida, extinciones masivas y cambios climáticos importantes."
            : "Earth is approximately 4.54 billion years old. Its geological history is divided into eons, eras, and periods, each marked by significant events such as the emergence of life, mass extinctions, and major climate changes."}
        </p>
      </CardContent>
    </Card>
  );
} 