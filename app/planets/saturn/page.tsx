"use client"

import { useLanguage } from "@/contexts/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import PlanetComparisonChart from "@/components/planet-comparison-chart"
import PlanetCompositionChart from "@/components/planet-composition-chart"
import MainHeader from "@/components/main-header"
import Footer from "@/components/footer"
import dynamic from "next/dynamic"
import SaturnModel from "@/components/SaturnModel"
import { ResponsiveBar } from "@nivo/bar"
import PlanetModel from "@/components/PlanetModel"

// Importamos el componente de modelo 3D de forma dinámica
const SaturnModelDynamic = dynamic(() => import("@/components/SaturnModel"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-lg">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
    </div>
  )
})

export default function SaturnPage() {
  const { t, language } = useLanguage()

  // Datos para el gráfico de comparación
  const comparisonData = [
    {
      name: language === "es" ? "Tierra" : "Earth",
      diameter: 12742,
      distance: 149.6,
      orbitalPeriod: 365.25,
      moons: 1,
    },
    {
      name: language === "es" ? "Saturno" : "Saturn",
      diameter: 116460,
      distance: 1427,
      orbitalPeriod: 10759,
      moons: 146,
    }
  ]

  // Datos para el gráfico de composición
  const compositionData = [
    { name: language === "es" ? "Hidrógeno" : "Hydrogen", value: 96, color: "#FFD700" },
    { name: language === "es" ? "Helio" : "Helium", value: 3, color: "#FFA500" },
    { name: language === "es" ? "Metano" : "Methane", value: 0.4, color: "#FF8C00" },
    { name: language === "es" ? "Otros" : "Others", value: 0.6, color: "#FF7F50" },
  ]

  // Datos para la comparación de planetas gaseosos
  const gasGiantsData = [
    {
      name: language === "es" ? "Júpiter" : "Jupiter",
      diameter: 139820,
      distance: 778.5,
      orbitalPeriod: 4333,
      moons: 95,
    },
    {
      name: language === "es" ? "Saturno" : "Saturn",
      diameter: 116460,
      distance: 1427,
      orbitalPeriod: 10759,
      moons: 146,
    },
    {
      name: language === "es" ? "Urano" : "Uranus",
      diameter: 50724,
      distance: 2871,
      orbitalPeriod: 30687,
      moons: 27,
    },
    {
      name: language === "es" ? "Neptuno" : "Neptune",
      diameter: 49244,
      distance: 4498,
      orbitalPeriod: 60190,
      moons: 14,
    }
  ]

  // Datos para las lunas principales
  const majorMoonsData = [
    { name: "Titán", diameter: 5150, distance: 1221.9, orbitalPeriod: 15.95, moons: 0 },
    { name: "Encélado", diameter: 504, distance: 238, orbitalPeriod: 1.37, moons: 0 },
    { name: "Mimas", diameter: 396, distance: 185.5, orbitalPeriod: 0.94, moons: 0 },
    { name: "Rea", diameter: 1528, distance: 527, orbitalPeriod: 4.52, moons: 0 }
  ]

  // Datos para los anillos principales
  const ringsData = [
    {
      ring: "A",
      value: 14.6,
      color: "#FFD700"
    },
    {
      ring: "B",
      value: 25.5,
      color: "#FFA500"
    },
    {
      ring: "C",
      value: 17.5,
      color: "#FF8C00"
    },
    {
      ring: "D",
      value: 7.5,
      color: "#FF7F50"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <MainHeader />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400 font-orbitron">
            {language === "es" ? "Saturno" : "Saturn"}
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-helvetica">
            {language === "es"
              ? "El planeta de los anillos, el sexto planeta desde el Sol"
              : "The ringed planet, the sixth planet from the Sun"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <SaturnModel />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-yellow-300 font-orbitron">
              {language === "es" ? "El Señor de los Anillos" : "The Lord of the Rings"}
            </h2>
            <p className="mb-4 font-helvetica">
              {language === "es"
                ? "Saturno es el sexto planeta desde el Sol y el segundo más grande del Sistema Solar. Es famoso por su impresionante sistema de anillos, compuesto principalmente por partículas de hielo y roca. Con una densidad menor que el agua, Saturno es el planeta menos denso del Sistema Solar. Sus 146 lunas conocidas incluyen Titán, la única luna del Sistema Solar con una atmósfera densa."
                : "Saturn is the sixth planet from the Sun and the second largest in the Solar System. It is famous for its impressive ring system, composed mainly of ice and rock particles. With a density less than water, Saturn is the least dense planet in the Solar System. Its 146 known moons include Titan, the only moon in the Solar System with a dense atmosphere."}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Diámetro" : "Diameter"}</p>
                <p className="font-medium">116,460 km</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Distancia del Sol" : "Distance from Sun"}</p>
                <p className="font-medium">1,427 {language === "es" ? "millones de km" : "million km"}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Período Orbital" : "Orbital Period"}</p>
                <p className="font-medium">10,759 {language === "es" ? "días terrestres" : "Earth days"}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Lunas" : "Moons"}</p>
                <p className="font-medium">146</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="font-orbitron">{t("planets.overview")}</TabsTrigger>
            <TabsTrigger value="characteristics" className="font-orbitron">{t("planets.characteristics")}</TabsTrigger>
            <TabsTrigger value="moons" className="font-orbitron">{language === "es" ? "Lunas" : "Moons"}</TabsTrigger>
            <TabsTrigger value="facts" className="font-orbitron">{t("planets.facts")}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <p className="font-helvetica">
                  {language === "es"
                    ? "Saturno es un gigante gaseoso compuesto principalmente de hidrógeno y helio. Su característica más distintiva es su sistema de anillos, que se extiende hasta 282,000 kilómetros desde el planeta. La atmósfera de Saturno muestra patrones de bandas similares a los de Júpiter, pero menos pronunciados. El planeta tiene una densidad tan baja que podría flotar en el agua si existiera un océano lo suficientemente grande."
                    : "Saturn is a gas giant composed primarily of hydrogen and helium. Its most distinctive feature is its ring system, which extends up to 282,000 kilometers from the planet. Saturn's atmosphere shows band patterns similar to Jupiter's but less pronounced. The planet has such a low density that it could float in water if there was an ocean large enough."}
                </p>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PlanetComparisonChart data={comparisonData} />
              <PlanetCompositionChart planetName={language === "es" ? "Saturno" : "Saturn"} data={compositionData} />
            </div>
          </TabsContent>

          <TabsContent value="characteristics" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 font-orbitron">{language === "es" ? "Sistema de Anillos" : "Ring System"}</h3>
                <p className="font-helvetica mb-4">
                  {language === "es"
                    ? "El sistema de anillos de Saturno es el más espectacular del Sistema Solar. Se extiende desde 7,000 km hasta 80,000 km por encima de la atmósfera del planeta. Los anillos están compuestos principalmente de partículas de hielo y roca, desde el tamaño de granos de arena hasta el de casas."
                    : "Saturn's ring system is the most spectacular in the Solar System. It extends from 7,000 km to 80,000 km above the planet's atmosphere. The rings are composed mainly of ice and rock particles, ranging in size from sand grains to houses."}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-orbitron text-2xl text-yellow-400 mb-6">{language === "es" ? "Principales Anillos" : "Main Rings"}</h4>
                    <div className="h-[400px] bg-black">
                      <ResponsiveBar
                        data={ringsData}
                        keys={["value"]}
                        indexBy="ring"
                        margin={{ top: 20, right: 20, bottom: 50, left: 120 }}
                        padding={0.3}
                        valueScale={{ type: "linear" }}
                        colors={({ data }) => data.color}
                        theme={{
                          axis: {
                            ticks: {
                              text: {
                                fill: "#ffffff",
                                fontSize: 12,
                                fontFamily: "Helvetica"
                              }
                            },
                            legend: {
                              text: {
                                fill: "#ffffff",
                                fontSize: 12,
                                fontFamily: "Helvetica"
                              }
                            }
                          },
                          grid: {
                            line: {
                              stroke: "#333333",
                              strokeWidth: 1
                            }
                          },
                          tooltip: {
                            container: {
                              color: "#000000"
                            }
                          }
                        }}
                        enableLabel={true}
                        label={d => `${d.value} KM`}
                        labelTextColor="#ffffff"
                        tooltip={({ id, value }) => (
                          <div style={{
                            background: 'white',
                            padding: '12px',
                            border: '1px solid #ccc',
                            color: 'black'
                          }}>
                            {language === "es" ? "Longitud del diámetro" : "Diameter length"}: {value} KM
                          </div>
                        )}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legend: language === "es" ? "Anillo" : "Ring",
                          legendPosition: "middle",
                          legendOffset: 32
                        }}
                        axisLeft={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legend: language === "es" ? "Longitud diámetro (KM)" : "Diameter length (KM)",
                          legendPosition: "middle",
                          legendOffset: -80
                        }}
                        gridYValues={5}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-orbitron text-lg text-yellow-400 mb-2">{language === "es" ? "Composición" : "Composition"}</h4>
                    <PlanetCompositionChart 
                      planetName={language === "es" ? "Anillos" : "Rings"}
                      data={[
                        { name: language === "es" ? "Hielo de agua" : "Water ice", value: 90, color: "#E0F7FA" },
                        { name: language === "es" ? "Polvo de roca" : "Rock dust", value: 7, color: "#BCAAa4" },
                        { name: language === "es" ? "Otros" : "Others", value: 3, color: "#9E9E9E" }
                      ]} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-orbitron">{language === "es" ? "Comparación con Gigantes Gaseosos" : "Gas Giants Comparison"}</h3>
                  <PlanetComparisonChart data={gasGiantsData} />
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-orbitron">{language === "es" ? "Características Físicas" : "Physical Characteristics"}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-zinc-400 font-helvetica">{language === "es" ? "Velocidad de Rotación" : "Rotation Speed"}</h4>
                      <p className="text-lg">10.7 {language === "es" ? "horas" : "hours"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-zinc-400 font-helvetica">{language === "es" ? "Temperatura Media" : "Average Temperature"}</h4>
                      <p className="text-lg">-178°C</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-zinc-400 font-helvetica">{language === "es" ? "Gravedad Superficial" : "Surface Gravity"}</h4>
                      <p className="text-lg">10.44 m/s²</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-zinc-400 font-helvetica">{language === "es" ? "Inclinación del Eje" : "Axial Tilt"}</h4>
                      <p className="text-lg">26.73°</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="moons" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 font-orbitron">{language === "es" ? "Lunas Principales" : "Major Moons"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-bold font-orbitron">Titán</h4>
                      <p className="text-sm text-zinc-400 font-helvetica">
                        {language === "es"
                          ? "La luna más grande de Saturno y la segunda más grande del Sistema Solar. Tiene una atmósfera densa de nitrógeno y metano, y lagos de hidrocarburos líquidos en su superficie."
                          : "The largest moon of Saturn and the second largest in the Solar System. It has a dense atmosphere of nitrogen and methane, and lakes of liquid hydrocarbons on its surface."}
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-bold font-orbitron">Encélado</h4>
                      <p className="text-sm text-zinc-400 font-helvetica">
                        {language === "es"
                          ? "Una luna helada que expulsa géiseres de agua desde su polo sur. Se cree que tiene un océano subsuperficial que podría albergar vida."
                          : "An icy moon that spews water geysers from its south pole. It is believed to have a subsurface ocean that could harbor life."}
                      </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-bold font-orbitron">Mimas</h4>
                      <p className="text-sm text-zinc-400 font-helvetica">
                        {language === "es"
                          ? "Conocida como la 'Estrella de la Muerte' por su gran cráter de impacto. Su superficie está cubierta de cráteres, lo que la hace una de las más craterizadas del Sistema Solar."
                          : "Known as the 'Death Star' due to its large impact crater. Its surface is covered in craters, making it one of the most cratered in the Solar System."}
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-bold font-orbitron">Rea</h4>
                      <p className="text-sm text-zinc-400 font-helvetica">
                        {language === "es"
                          ? "La segunda luna más grande de Saturno. Tiene una superficie antigua y craterizada, y se cree que tiene un núcleo rocoso rodeado por hielo."
                          : "The second largest moon of Saturn. It has an ancient and cratered surface, and is believed to have a rocky core surrounded by ice."}
                      </p>
                    </div>
                  </div>
                  <div>
                    <PlanetComparisonChart data={majorMoonsData} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-yellow-400 font-orbitron">{language === "es" ? "Hexágono Polar" : "Polar Hexagon"}</h3>
                  <p className="font-helvetica">
                    {language === "es"
                      ? "Saturno tiene un patrón hexagonal único en su polo norte, un fenómeno meteorológico que ha persistido durante décadas. Este hexágono tiene aproximadamente 30,000 km de ancho y contiene vientos que soplan a más de 300 km/h."
                      : "Saturn has a unique hexagonal pattern at its north pole, a meteorological phenomenon that has persisted for decades. This hexagon is about 30,000 km wide and contains winds blowing at more than 300 km/h."}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-yellow-400 font-orbitron">{language === "es" ? "Exploración" : "Exploration"}</h3>
                  <p className="font-helvetica">
                    {language === "es"
                      ? "La misión Cassini-Huygens, que orbitó Saturno durante 13 años, proporcionó datos sin precedentes sobre el planeta, sus anillos y lunas. La sonda Huygens aterrizó en Titán, convirtiéndose en el primer aterrizaje en una luna del Sistema Solar exterior."
                      : "The Cassini-Huygens mission, which orbited Saturn for 13 years, provided unprecedented data about the planet, its rings, and moons. The Huygens probe landed on Titan, becoming the first landing on a moon in the outer Solar System."}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-yellow-400 font-orbitron">{language === "es" ? "Densidad Única" : "Unique Density"}</h3>
                  <p className="font-helvetica">
                    {language === "es"
                      ? "Saturno es el único planeta del Sistema Solar con una densidad menor que el agua. Si existiera un océano lo suficientemente grande, Saturno flotaría en él. Esta baja densidad se debe a su composición gaseosa y rápida rotación."
                      : "Saturn is the only planet in the Solar System with a density less than water. If there was an ocean large enough, Saturn would float in it. This low density is due to its gaseous composition and rapid rotation."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
} 