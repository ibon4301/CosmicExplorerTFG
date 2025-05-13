"use client";

import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsivePie } from "@nivo/pie";

export default function VenusAtmosphereChart() {
  const { language } = useLanguage();
  
  const data = [
    {
      id: "CO₂",
      label: "CO₂",
      value: 96.5,
      color: "hsl(30, 70%, 50%)"
    },
    {
      id: "N₂",
      label: "N₂",
      value: 3.5,
      color: "hsl(200, 70%, 50%)"
    },
    {
      id: language === "es" ? "Otros gases" : "Other gases",
      label: language === "es" ? "Otros gases" : "Other gases",
      value: 0.002,
      color: "hsl(120, 70%, 50%)"
    }
  ];

  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-amber-300 font-space">
          {language === "es" ? "Composición Atmosférica" : "Atmospheric Composition"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsivePie
            data={data}
            margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: "yellow_orange_red" }}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#e2e8f0"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 50,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#e2e8f0",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
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
                  fontSize: "12px",
                },
              },
            }}
          />
        </div>
        <p className="text-sm text-zinc-400 mt-4">
          {language === "es"
            ? "Venus tiene una atmósfera extremadamente densa compuesta principalmente de dióxido de carbono, con una presión superficial 92 veces mayor que la de la Tierra. Esta atmósfera es responsable del intenso efecto invernadero que hace de Venus el planeta más caliente del Sistema Solar."
            : "Venus has an extremely dense atmosphere composed primarily of carbon dioxide, with a surface pressure 92 times that of Earth. This atmosphere is responsible for the intense greenhouse effect that makes Venus the hottest planet in the Solar System."}
        </p>
      </CardContent>
    </Card>
  );
} 