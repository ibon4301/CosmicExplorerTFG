"use client";

import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsivePie } from "@nivo/pie";

export default function EarthAtmosphereChart() {
  const { language } = useLanguage();
  
  const data = [
    {
      id: "N₂",
      label: "N₂",
      value: 78.08,
      color: "hsl(200, 70%, 50%)"
    },
    {
      id: "O₂",
      label: "O₂",
      value: 20.95,
      color: "hsl(150, 70%, 50%)"
    },
    {
      id: "Ar",
      label: "Ar",
      value: 0.93,
      color: "hsl(30, 70%, 50%)"
    },
    {
      id: "CO₂",
      label: "CO₂",
      value: 0.04,
      color: "hsl(0, 70%, 50%)"
    },
    {
      id: language === "es" ? "Otros gases" : "Other gases",
      label: language === "es" ? "Otros gases" : "Other gases",
      value: 0.003,
      color: "hsl(270, 70%, 50%)"
    }
  ];

  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-blue-400 font-space">
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
            colors={{ scheme: "blues" }}
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
            ? "La atmósfera terrestre es única en el Sistema Solar por su alto contenido de oxígeno, producido por organismos fotosintéticos a lo largo de miles de millones de años. Esta composición es fundamental para la vida tal como la conocemos y protege la superficie de la radiación solar dañina."
            : "Earth's atmosphere is unique in the Solar System for its high oxygen content, produced by photosynthetic organisms over billions of years. This composition is fundamental for life as we know it and protects the surface from harmful solar radiation."}
        </p>
      </CardContent>
    </Card>
  );
} 