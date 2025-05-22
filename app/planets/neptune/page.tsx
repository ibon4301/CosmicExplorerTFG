"use client"

import { useLanguage } from "@/contexts/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import PlanetComparisonChart from "@/components/planet-comparison-chart"
import PlanetCompositionChart from "@/components/planet-composition-chart"
import MainHeader from "@/components/main-header"
import Footer from "@/components/footer"
import { ResponsiveBar } from "@nivo/bar"
import NeptuneModel from "@/components/NeptuneModel"

export default function NeptunePage() {
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
      name: language === "es" ? "Neptuno" : "Neptune",
      diameter: 49244,
      distance: 4498,
      orbitalPeriod: 60190,
      moons: 14,
    }
  ]

  // Datos para el gráfico de composición
  const compositionData = [
    { name: language === "es" ? "Hidrógeno" : "Hydrogen", value: 80, color: "#00BFFF" },
    { name: language === "es" ? "Helio" : "Helium", value: 19, color: "#1E90FF" },
    { name: language === "es" ? "Metano" : "Methane", value: 1.5, color: "#4682B4" },
    { name: language === "es" ? "Otros" : "Others", value: 0.5, color: "#5F9EA0" },
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
    { name: "Tritón", diameter: 2706, distance: 354.8, orbitalPeriod: -5.88, moons: 0 },
    { name: "Proteo", diameter: 420, distance: 117.6, orbitalPeriod: 1.12, moons: 0 },
    { name: "Nereida", diameter: 340, distance: 5513.4, orbitalPeriod: 360.13, moons: 0 },
    { name: "Larisa", diameter: 194, distance: 73.6, orbitalPeriod: 0.55, moons: 0 }
  ]

  // Datos para los anillos
  const ringsData = [
    { ring: "Adams", value: 50, color: "#00BFFF" },
    { ring: "Le Verrier", value: 113, color: "#1E90FF" },
    { ring: "Lassell", value: 4, color: "#4682B4" },
    { ring: "Arago", value: 2, color: "#5F9EA0" },
    { ring: "Galle", value: 2, color: "#87CEEB" }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <MainHeader />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-400 font-orbitron">
            {language === "es" ? "Neptuno" : "Neptune"}
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-helvetica">
            {language === "es"
              ? "El gigante azul, el octavo y más lejano planeta del Sistema Solar"
              : "The blue giant, the eighth and farthest planet from the Sun"}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <NeptuneModel />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-300 font-orbitron">
              {language === "es" ? "El Gigante Azul" : "The Blue Giant"}
            </h2>
            <p className="mb-4 font-helvetica">
              {language === "es"
                ? "Neptuno es el planeta más lejano del Sol y el cuarto más grande del Sistema Solar. Es conocido por su intenso color azul, causado por la presencia de metano en su atmósfera. Neptuno tiene los vientos más rápidos del Sistema Solar, alcanzando hasta 2,100 km/h. Posee un sistema de anillos tenues y 14 lunas conocidas, siendo Tritón la más grande y única luna grande con órbita retrógrada."
                : "Neptune is the farthest planet from the Sun and the fourth largest in the Solar System. It is known for its intense blue color, caused by methane in its atmosphere. Neptune has the fastest winds in the Solar System, reaching up to 2,100 km/h. It has a faint ring system and 14 known moons, with Triton being the largest and the only major moon with a retrograde orbit."}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Diámetro" : "Diameter"}</p>
                <p className="font-medium">49,244 km</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Distancia del Sol" : "Distance from Sun"}</p>
                <p className="font-medium">4,498 {language === "es" ? "millones de km" : "million km"}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Período Orbital" : "Orbital Period"}</p>
                <p className="font-medium">60,190 {language === "es" ? "días terrestres" : "Earth days"}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Lunas" : "Moons"}</p>
                <p className="font-medium">14</p>
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
                    ? "Neptuno es un gigante helado compuesto principalmente de hidrógeno, helio y metano. Su atmósfera dinámica presenta tormentas oscuras y vientos supersónicos. Es el planeta más ventoso del Sistema Solar y su color azul intenso es resultado de la absorción de luz roja por el metano."
                    : "Neptune is an ice giant composed mainly of hydrogen, helium, and methane. Its dynamic atmosphere features dark storms and supersonic winds. It is the windiest planet in the Solar System and its deep blue color is due to methane absorbing red light."}
                </p>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PlanetComparisonChart data={comparisonData} />
              <PlanetCompositionChart planetName={language === "es" ? "Neptuno" : "Neptune"} data={compositionData} />
            </div>
          </TabsContent>
          <TabsContent value="characteristics" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 font-orbitron">{language === "es" ? "Sistema de Anillos" : "Ring System"}</h3>
                <p className="font-helvetica mb-4">
                  {language === "es"
                    ? "Neptuno tiene al menos cinco anillos principales, todos muy tenues y compuestos principalmente de polvo y partículas de hielo. Los anillos presentan arcos brillantes, especialmente en el anillo Adams."
                    : "Neptune has at least five main rings, all very faint and composed mainly of dust and ice particles. The rings feature bright arcs, especially in the Adams ring."}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-orbitron text-2xl text-blue-400 mb-6">{language === "es" ? "Principales Anillos" : "Main Rings"}</h4>
                    <div className="h-[400px] bg-black">
                      <ResponsiveBar
                        data={ringsData}
                        keys={["value"]}
                        indexBy="ring"
                        margin={{ top: 30, right: 30, bottom: 70, left: 60 }}
                        padding={0.2}
                        valueScale={{ type: "linear" }}
                        colors={({ data }) => data.color}
                        theme={{
                          axis: {
                            ticks: {
                              text: {
                                fill: "#ffffff",
                                fontSize: 11,
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
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: -45,
                          legend: language === "es" ? "Anillo" : "Ring",
                          legendPosition: "middle",
                          legendOffset: 50
                        }}
                        axisLeft={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legend: language === "es" ? "Longitud diámetro (KM)" : "Diameter length (KM)",
                          legendPosition: "middle",
                          legendOffset: -80
                        }}
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
                        gridYValues={5}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-orbitron text-lg text-blue-400 mb-2">{language === "es" ? "Composición" : "Composition"}</h4>
                    <PlanetCompositionChart 
                      planetName={language === "es" ? "Anillos" : "Rings"}
                      data={[
                        { name: language === "es" ? "Polvo de hielo" : "Ice dust", value: 80, color: "#00BFFF" },
                        { name: language === "es" ? "Material oscuro" : "Dark material", value: 15, color: "#1E90FF" },
                        { name: language === "es" ? "Otros" : "Others", value: 5, color: "#4682B4" }
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
                      <p className="text-lg">16.1 {language === "es" ? "horas" : "hours"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-zinc-400 font-helvetica">{language === "es" ? "Temperatura Media" : "Average Temperature"}</h4>
                      <p className="text-lg">-214°C</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-zinc-400 font-helvetica">{language === "es" ? "Gravedad Superficial" : "Surface Gravity"}</h4>
                      <p className="text-lg">11.15 m/s²</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-zinc-400 font-helvetica">{language === "es" ? "Inclinación del Eje" : "Axial Tilt"}</h4>
                      <p className="text-lg">28.32°</p>
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
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-bold font-orbitron">Tritón</h4>
                      <p className="text-sm text-zinc-400 font-helvetica">
                        {language === "es"
                          ? "La luna más grande de Neptuno y la única gran luna del Sistema Solar con órbita retrógrada. Se cree que es un objeto capturado del Cinturón de Kuiper."
                          : "The largest moon of Neptune and the only major moon in the Solar System with a retrograde orbit. It is believed to be a captured Kuiper Belt object."}
                      </p>
                    </div>
                    <div className="border-l-4 border-cyan-500 pl-4">
                      <h4 className="font-bold font-orbitron">Proteo</h4>
                      <p className="text-sm text-zinc-400 font-helvetica">
                        {language === "es"
                          ? "La segunda luna más grande de Neptuno. Tiene una forma irregular y una superficie muy craterizada."
                          : "The second largest moon of Neptune. It has an irregular shape and a heavily cratered surface."}
                      </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-bold font-orbitron">Nereida</h4>
                      <p className="text-sm text-zinc-400 font-helvetica">
                        {language === "es"
                          ? "Una de las lunas más excéntricas del Sistema Solar, con una órbita muy elíptica."
                          : "One of the most eccentric moons in the Solar System, with a very elliptical orbit."}
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-bold font-orbitron">Larisa</h4>
                      <p className="text-sm text-zinc-400 font-helvetica">
                        {language === "es"
                          ? "Una luna interior de Neptuno, probablemente un fragmento de un satélite mayor destruido."
                          : "An inner moon of Neptune, likely a fragment of a larger satellite that was destroyed."}
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
                  <h3 className="text-xl font-bold mb-4 text-blue-400 font-orbitron">{language === "es" ? "Vientos Supersónicos" : "Supersonic Winds"}</h3>
                  <p className="font-helvetica">
                    {language === "es"
                      ? "Neptuno tiene los vientos más rápidos del Sistema Solar, alcanzando velocidades de hasta 2,100 km/h."
                      : "Neptune has the fastest winds in the Solar System, reaching speeds up to 2,100 km/h."}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-blue-400 font-orbitron">{language === "es" ? "Gran Mancha Oscura" : "Great Dark Spot"}</h3>
                  <p className="font-helvetica">
                    {language === "es"
                      ? "En 1989, la sonda Voyager 2 descubrió una enorme tormenta oscura en la atmósfera de Neptuno, similar a la Gran Mancha Roja de Júpiter, pero que desapareció años después."
                      : "In 1989, Voyager 2 discovered a huge dark storm in Neptune's atmosphere, similar to Jupiter's Great Red Spot, but it disappeared years later."}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-blue-400 font-orbitron">{language === "es" ? "Exploración" : "Exploration"}</h3>
                  <p className="font-helvetica">
                    {language === "es"
                      ? "La única nave espacial que ha visitado Neptuno es la Voyager 2, que sobrevoló el planeta en 1989 y proporcionó la mayor parte de la información que conocemos hoy."
                      : "The only spacecraft to visit Neptune is Voyager 2, which flew by the planet in 1989 and provided most of what we know today."}
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