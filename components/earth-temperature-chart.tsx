"use client";

import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";

export default function EarthTemperatureChart() {
  const { language } = useLanguage();
  
  const data = [
    {
      location: language === "es" ? "Polo Norte" : "North Pole",
      temperatura: -40,
      color: "hsl(200, 70%, 50%)"
    },
    {
      location: language === "es" ? "Regiones templadas" : "Temperate regions",
      temperatura: 15,
      color: "hsl(150, 70%, 50%)"
    },
    {
      location: language === "es" ? "Ecuador" : "Equator",
      temperatura: 30,
      color: "hsl(30, 70%, 50%)"
    },
    {
      location: language === "es" ? "Desierto del Sahara" : "Sahara Desert",
      temperatura: 58,
      color: "hsl(0, 70%, 50%)"
    },
    {
      location: language === "es" ? "Polo Sur" : "South Pole",
      temperatura: -60,
      color: "hsl(230, 70%, 50%)"
    }
  ];

  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-blue-400 font-space">
          {language === "es" ? "Variación de Temperatura" : "Temperature Variation"}
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
            ariaLabel={language === "es" ? "Variación de temperatura en la Tierra" : "Earth temperature variation"}
            barAriaLabel={(e) =>
              `${e.id}: ${e.formattedValue} ${language === "es" ? "grados Celsius" : "degrees Celsius"}`
            }
          />
        </div>
        <p className="text-sm text-zinc-400 mt-4">
          {language === "es"
            ? "La Tierra presenta una amplia variación de temperaturas debido a su inclinación axial, las estaciones, la distribución de los continentes y océanos, y las corrientes atmosféricas y oceánicas. Esta diversidad de climas permite la existencia de múltiples ecosistemas y formas de vida."
            : "Earth exhibits a wide range of temperatures due to its axial tilt, seasons, the distribution of continents and oceans, and atmospheric and oceanic currents. This diversity of climates allows for multiple ecosystems and life forms to exist."}
        </p>
      </CardContent>
    </Card>
  );
} 