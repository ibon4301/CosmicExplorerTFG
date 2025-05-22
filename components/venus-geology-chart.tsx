"use client";

import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveRadar } from "@nivo/radar";

export default function VenusGeologyChart() {
  const { language } = useLanguage();

  const data = [
    {
      feature: language === "es" ? "Volcanes" : "Volcanoes",
      venus: 85,
      earth: 45,
      mars: 25,
    },
    {
      feature: language === "es" ? "Llanuras" : "Plains",
      venus: 80,
      earth: 40,
      mars: 60,
    },
    {
      feature: language === "es" ? "Cráteres" : "Craters",
      venus: 40,
      earth: 10,
      mars: 90,
    },
    {
      feature: language === "es" ? "Montañas" : "Mountains",
      venus: 60,
      earth: 70,
      mars: 50,
    },
    {
      feature: language === "es" ? "Actividad tectónica" : "Tectonic activity",
      venus: 65,
      earth: 90,
      mars: 15,
    },
  ];

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-amber-300 font-space">
          {language === "es" ? "Características Geológicas" : "Geological Features"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveRadar
            data={data}
            keys={["venus", "earth", "mars"]}
            indexBy="feature"
            maxValue={100}
            margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
            curve="linearClosed"
            borderWidth={2}
            borderColor={{ from: "color", modifiers: [] }}
            gridLabelOffset={20}
            dotSize={10}
            dotColor={{ theme: "background" }}
            dotBorderWidth={2}
            dotBorderColor={{ from: "color" }}
            enableDotLabel={false}
            colors={["#f59e0b", "#3b82f6", "#ef4444"]}
            fillOpacity={0.25}
            blendMode="multiply"
            legends={[
              {
                anchor: "top-left",
                direction: "column",
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: "#e2e8f0",
                symbolSize: 12,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#ffffff",
                    },
                  },
                ],
                data: [
                  {
                    id: "venus",
                    label: "Venus",
                    color: "#f59e0b",
                  },
                  {
                    id: "earth",
                    label: language === "es" ? "Tierra" : "Earth",
                    color: "#3b82f6",
                  },
                  {
                    id: "mars",
                    label: "Mars",
                    color: "#ef4444",
                  },
                ],
              },
            ]}
            theme={{
              text: {
                fill: "#94a3b8",
              },
              tooltip: {
                container: {
                  background: "#1e293b",
                  color: "#e2e8f0",
                },
              },
              grid: {
                line: {
                  stroke: "#334155",
                },
              },
            }}
          />
        </div>
        <p className="text-sm text-zinc-400 mt-4">
          {language === "es"
            ? "Venus tiene más volcanes que cualquier otro planeta del Sistema Solar, con más de 1.600 volcanes principales y cientos de miles más pequeños. La superficie está dominada por actividad volcánica y presenta extensas llanuras de lava."
            : "Venus has more volcanoes than any other planet in the Solar System, with over 1,600 major volcanoes and hundreds of thousands of smaller ones. The surface is dominated by volcanic activity and features extensive lava plains."}
        </p>
      </CardContent>
    </Card>
  );
} 