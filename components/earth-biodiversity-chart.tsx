"use client";

import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveRadar } from "@nivo/radar";

export default function EarthBiodiversityChart() {
  const { language } = useLanguage();
  
  const data = [
    {
      grupo: language === "es" ? "Insectos" : "Insects",
      especies: 1000000,
      color: "hsl(120, 70%, 50%)"
    },
    {
      grupo: language === "es" ? "Plantas" : "Plants",
      especies: 390000,
      color: "hsl(150, 70%, 50%)"
    },
    {
      grupo: language === "es" ? "Hongos" : "Fungi",
      especies: 120000,
      color: "hsl(30, 70%, 50%)"
    },
    {
      grupo: language === "es" ? "Vertebrados" : "Vertebrates",
      especies: 65000,
      color: "hsl(200, 70%, 50%)"
    },
    {
      grupo: language === "es" ? "Moluscos" : "Mollusks",
      especies: 85000,
      color: "hsl(270, 70%, 50%)"
    },
    {
      grupo: language === "es" ? "Bacterias" : "Bacteria",
      especies: 10000,
      color: "hsl(0, 70%, 50%)"
    }
  ];

  // Transformar los datos para el gráfico de radar
  const radarData = [
    {
      [language === "es" ? "Insectos" : "Insects"]: 10,
      [language === "es" ? "Plantas" : "Plants"]: 3.9,
      [language === "es" ? "Hongos" : "Fungi"]: 1.2,
      [language === "es" ? "Vertebrados" : "Vertebrates"]: 0.65,
      [language === "es" ? "Moluscos" : "Mollusks"]: 0.85,
      [language === "es" ? "Bacterias" : "Bacteria"]: 0.1
    }
  ];

  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-blue-400 font-space">
          {language === "es" ? "Biodiversidad" : "Biodiversity"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveRadar
            data={radarData}
            keys={Object.keys(radarData[0])}
            indexBy="grupo"
            maxValue="auto"
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            curve="linearClosed"
            borderWidth={2}
            borderColor={{ from: "color" }}
            gridLevels={5}
            gridShape="circular"
            gridLabelOffset={15}
            enableDots={true}
            dotSize={8}
            dotColor={{ theme: "background" }}
            dotBorderWidth={2}
            dotBorderColor={{ from: "color" }}
            enableDotLabel={false}
            colors={{ scheme: "blues" }}
            fillOpacity={0.25}
            blendMode="multiply"
            animate={true}
            motionConfig="gentle"
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
            ? "La Tierra alberga una extraordinaria diversidad de vida, con más de 2 millones de especies documentadas y estimaciones que sugieren que podrían existir entre 8 y 20 millones en total. Esta biodiversidad es el resultado de 3.5 mil millones de años de evolución y es fundamental para el funcionamiento de los ecosistemas."
            : "Earth hosts an extraordinary diversity of life, with over 2 million documented species and estimates suggesting that between 8 and 20 million might exist in total. This biodiversity is the result of 3.5 billion years of evolution and is fundamental to ecosystem functioning."}
        </p>
      </CardContent>
    </Card>
  );
} 