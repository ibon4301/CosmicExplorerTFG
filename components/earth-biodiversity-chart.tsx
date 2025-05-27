"use client";

import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EarthBiodiversityChart() {
  const { language } = useLanguage();
  
  const data = [
    {
      grupo: language === "es" ? "Insectos" : "Insects",
      porcentaje: 10,
      color: "#38bdf8"
    },
    {
      grupo: language === "es" ? "Plantas" : "Plants",
      porcentaje: 3.9,
      color: "#22d3ee"
    },
    {
      grupo: language === "es" ? "Hongos" : "Fungi",
      porcentaje: 1.2,
      color: "#a3e635"
    },
    {
      grupo: language === "es" ? "Vertebrados" : "Vertebrates",
      porcentaje: 0.65,
      color: "#facc15"
    },
    {
      grupo: language === "es" ? "Moluscos" : "Mollusks",
      porcentaje: 0.85,
      color: "#f472b6"
    },
    {
      grupo: language === "es" ? "Bacterias" : "Bacteria",
      porcentaje: 0.1,
      color: "#818cf8"
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
        <div className="w-full max-w-xl mx-auto">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center mb-3">
              <div className="w-32 text-sm text-zinc-200" style={{ minWidth: 90 }}>{item.grupo}</div>
              <div className="flex-1 h-5 rounded bg-zinc-800 mr-3 overflow-hidden">
                <div
                  className="h-5 rounded"
                  style={{ width: `${item.porcentaje * 10}%`, background: item.color, transition: 'width 0.5s' }}
                ></div>
              </div>
              <div className="w-12 text-right text-zinc-300 font-bold">{item.porcentaje}%</div>
            </div>
          ))}
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