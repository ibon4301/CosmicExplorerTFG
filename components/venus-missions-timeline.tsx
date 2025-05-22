"use client";

import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VenusMissionsTimeline() {
  const { language } = useLanguage();

  const missions = [
    {
      year: "1961-1984",
      name: "Venera (1-16)",
      agency: language === "es" ? "URSS" : "USSR",
      description:
        language === "es"
          ? "Serie de misiones soviéticas, incluyendo los primeros aterrizajes exitosos en Venus. Venera 7 fue la primera nave en transmitir datos desde la superficie de otro planeta."
          : "Series of Soviet missions, including the first successful landings on Venus. Venera 7 was the first spacecraft to transmit data from the surface of another planet.",
    },
    {
      year: "1978-1992",
      name: "Pioneer Venus",
      agency: "NASA",
      description:
        language === "es"
          ? "Misión que consistió en un orbitador y cuatro sondas atmosféricas para estudiar la atmósfera y superficie de Venus."
          : "Mission consisting of an orbiter and four atmospheric probes to study Venus's atmosphere and surface.",
    },
    {
      year: "1989",
      name: "Magellan",
      agency: "NASA",
      description:
        language === "es"
          ? "Utilizó radar para mapear el 98% de la superficie de Venus, revelando detalles de su topografía a través de las densas nubes."
          : "Used radar to map 98% of Venus's surface, revealing details of its topography through the dense clouds.",
    },
    {
      year: "2005-2014",
      name: "Venus Express",
      agency: "ESA",
      description:
        language === "es"
          ? "Primera misión europea a Venus, estudió la atmósfera, el plasma y la superficie del planeta."
          : "First European mission to Venus, studied the planet's atmosphere, plasma environment, and surface.",
    },
    {
      year: "2010-2015",
      name: "Akatsuki",
      agency: "JAXA",
      description:
        language === "es"
          ? "Misión japonesa que estudia la atmósfera y el clima de Venus, especialmente sus patrones de circulación."
          : "Japanese mission studying Venus's atmosphere and climate, especially its circulation patterns.",
    },
    {
      year: "2023-2031",
      name: "DAVINCI+/VERITAS",
      agency: "NASA",
      description:
        language === "es"
          ? "Misiones futuras para estudiar la atmósfera (DAVINCI+) y la geología (VERITAS) de Venus en detalle."
          : "Upcoming missions to study Venus's atmosphere (DAVINCI+) and geology (VERITAS) in detail.",
    },
  ];

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-amber-300 font-space">
          {language === "es" ? "Misiones a Venus" : "Venus Missions"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6 border-l border-amber-700">
          {missions.map((mission, index) => (
            <div key={index} className="mb-6 relative">
              <div className="absolute -left-[25px] h-4 w-4 rounded-full bg-amber-500 border-4 border-zinc-900"></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 text-sm font-medium">{mission.year}</span>
                  <span className="bg-amber-900/30 text-amber-300 text-xs px-2 py-0.5 rounded">
                    {mission.agency}
                  </span>
                </div>
                <h3 className="text-white font-bold">{mission.name}</h3>
                <p className="text-sm text-zinc-400 mt-1">{mission.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 