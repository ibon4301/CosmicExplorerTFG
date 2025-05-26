"use client"

import { useLanguage } from "@/contexts/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import PlanetComparisonChart from "@/components/planet-comparison-chart"
import PlanetCompositionChart from "@/components/planet-composition-chart"
import Header from "@/components/header"
import Footer from "@/components/footer"
import dynamic from "next/dynamic"
import { ResponsiveBar } from "@nivo/bar"
import UranusModel from "@/components/UranusModel"

// Importamos el componente de modelo 3D de forma dinámica
const PlanetModel = dynamic(() => import("@/components/PlanetModel"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-lg">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400"></div>
    </div>
  )
})

export default function UranusPage() {
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
      name: language === "es" ? "Urano" : "Uranus",
      diameter: 50724,
      distance: 2871,
      orbitalPeriod: 30687,
      moons: 27,
    }
  ]

  // Datos para el gráfico de composición
  const compositionData = [
    { name: language === "es" ? "Hidrógeno" : "Hydrogen", value: 83, color: "#40E0D0" },
    { name: language === "es" ? "Helio" : "Helium", value: 15, color: "#20B2AA" },
    { name: language === "es" ? "Metano" : "Methane", value: 2, color: "#008B8B" },
    { name: language === "es" ? "Otros" : "Others", value: 0.5, color: "#00CED1" },
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
    { name: "Titania", diameter: 1578, distance: 436.3, orbitalPeriod: 8.71, moons: 0 },
    { name: "Oberón", diameter: 1523, distance: 583.5, orbitalPeriod: 13.46, moons: 0 },
    { name: "Umbriel", diameter: 1169, distance: 266.0, orbitalPeriod: 4.14, moons: 0 },
    { name: "Ariel", diameter: 1158, distance: 190.9, orbitalPeriod: 2.52, moons: 0 }
  ]

  // Datos para los anillos
  const ringsData = [
    {
      ring: "Zeta",
      value: 3.5,
      color: "#40E0D0"
    },
    {
      ring: "6",
      value: 2.2,
      color: "#20B2AA"
    },
    {
      ring: "5",
      value: 2.4,
      color: "#008B8B"
    },
    {
      ring: "4",
      value: 2.1,
      color: "#00CED1"
    },
    {
      ring: "Alpha",
      value: 7.1,
      color: "#48D1CC"
    },
    {
      ring: "Beta",
      value: 7.1,
      color: "#66CDAA"
    },
    {
      ring: "Eta",
      value: 1.9,
      color: "#7FFFD4"
    },
    {
      ring: "Gamma",
      value: 1.9,
      color: "#40E0D0"
    },
    {
      ring: "Delta",
      value: 3.6,
      color: "#20B2AA"
    },
    {
      ring: "Lambda",
      value: 2.0,
      color: "#008B8B"
    },
    {
      ring: "Epsilon",
      value: 20.0,
      color: "#00CED1"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-400 font-orbitron">
            {language === "es" ? "Urano" : "Uranus"}
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-helvetica">
            {language === "es"
              ? "El planeta inclinado, el séptimo planeta desde el Sol"
              : "The tilted planet, the seventh planet from the Sun"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <UranusModel />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-cyan-300 font-orbitron">
              {language === "es" ? "El Gigante Helado" : "The Ice Giant"}
            </h2>
            <p className="mb-4 font-helvetica">
              {language === "es"
                ? "Urano es el séptimo planeta desde el Sol y el tercero más grande del Sistema Solar. Es único por su eje de rotación extremadamente inclinado, que hace que el planeta 'ruede' sobre su órbita. Su color azul verdoso se debe a la presencia de metano en su atmósfera. Urano tiene un sistema de anillos y 27 lunas conocidas, nombradas principalmente en honor a personajes de las obras de William Shakespeare."
                : "Uranus is the seventh planet from the Sun and the third largest in the Solar System. It is unique for its extremely tilted rotation axis, which makes the planet 'roll' along its orbit. Its blue-green color is due to the presence of methane in its atmosphere. Uranus has a ring system and 27 known moons, named primarily after characters from William Shakespeare's works."}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Diámetro" : "Diameter"}</p>
                <p className="font-medium">50,724 km</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Distancia del Sol" : "Distance from Sun"}</p>
                <p className="font-medium">2,871 {language === "es" ? "millones de km" : "million km"}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Período Orbital" : "Orbital Period"}</p>
                <p className="font-medium">30,687 {language === "es" ? "días terrestres" : "Earth days"}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Lunas" : "Moons"}</p>
                <p className="font-medium">27</p>
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
                    ? "Urano es un gigante helado compuesto principalmente de hielo y roca, con una atmósfera rica en hidrógeno y helio. Su característica más distintiva es su inclinación axial extrema de 98 grados, lo que significa que el planeta gira de lado. Esta inclinación única puede haber sido causada por una colisión masiva durante la formación del Sistema Solar. La atmósfera de Urano muestra patrones de bandas y nubes, pero son mucho menos pronunciados que en Júpiter o Saturno."
                    : "Uranus is an ice giant composed primarily of ice and rock, with an atmosphere rich in hydrogen and helium. Its most distinctive feature is its extreme axial tilt of 98 degrees, meaning the planet rotates on its side. This unique tilt may have been caused by a massive collision during the formation of the Solar System. Uranus's atmosphere shows band patterns and clouds, but they are much less pronounced than on Jupiter or Saturn."}
                </p>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PlanetComparisonChart data={comparisonData} />
              <PlanetCompositionChart planetName={language === "es" ? "Urano" : "Uranus"} data={compositionData} />
            </div>
          </TabsContent>

          <TabsContent value="characteristics" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 font-orbitron">{language === "es" ? "Sistema de Anillos" : "Ring System"}</h3>
                <p className="font-helvetica mb-4">
                  {language === "es"
                    ? "El sistema de anillos de Urano fue el segundo en ser descubierto en el Sistema Solar, después de Saturno. Consiste en 13 anillos distintos, que son mucho más oscuros y estrechos que los de Saturno. Los anillos están compuestos principalmente de partículas de hielo y material orgánico oscuro."
                    : "Uranus's ring system was the second to be discovered in the Solar System, after Saturn's. It consists of 13 distinct rings, which are much darker and narrower than Saturn's. The rings are composed mainly of ice particles and dark organic material."}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-orbitron text-2xl text-cyan-400 mb-6">{language === "es" ? "Principales Anillos" : "Main Rings"}</h4>
                    <div className="h-[500px] bg-black">
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
                    <h4 className="font-orbitron text-lg text-cyan-400 mb-2">{language === "es" ? "Composición" : "Composition"}</h4>
                    <PlanetCompositionChart 
                      planetName={language === "es" ? "Anillos" : "Rings"}
                      data={[
                        { name: language === "es" ? "Hielo de agua" : "Water ice", value: 85, color: "#40E0D0" },
                        { name: language === "es" ? "Material orgánico" : "Organic material", value: 12, color: "#20B2AA" },
                        { name: language === "es" ? "Otros" : "Others", value: 3, color: "#008B8B" }
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
                      <p className="text-lg">17.2 {language === "es" ? "horas" : "hours"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-zinc-400 font-helvetica">{language === "es" ? "Temperatura Media" : "Average Temperature"}</h4>
                      <p className="text-lg">-224°C</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-zinc-400 font-helvetica">{language === "es" ? "Gravedad Superficial" : "Surface Gravity"}</h4>
                      <p className="text-lg">8.69 m/s²</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-zinc-400 font-helvetica">{language === "es" ? "Inclinación del Eje" : "Axial Tilt"}</h4>
                      <p className="text-lg">97.77°</p>
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
                    <div className="border-l-4 border-cyan-500 pl-4">
                      <h4 className="font-bold font-orbitron">Titania</h4>
                      <p className="text-sm text-zinc-400 font-helvetica">
                        {language === "es"
                          ? "La luna más grande de Urano. Tiene una superficie antigua y craterizada, con cañones y valles que sugieren actividad geológica pasada."
                          : "The largest moon of Uranus. It has an ancient and cratered surface, with canyons and valleys suggesting past geological activity."}
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-bold font-orbitron">Oberón</h4>
                      <p className="text-sm text-zinc-400 font-helvetica">
                        {language === "es"
                          ? "La segunda luna más grande. Su superficie está cubierta de cráteres y tiene un material oscuro en el fondo de algunos cráteres."
                          : "The second largest moon. Its surface is covered in craters and has dark material at the bottom of some craters."}
                      </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-bold font-orbitron">Umbriel</h4>
                      <p className="text-sm text-zinc-400 font-helvetica">
                        {language === "es"
                          ? "Una de las lunas más oscuras del Sistema Solar. Su superficie uniformemente oscura sugiere que ha estado geológicamente inactiva durante mucho tiempo."
                          : "One of the darkest moons in the Solar System. Its uniformly dark surface suggests it has been geologically inactive for a long time."}
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-bold font-orbitron">Ariel</h4>
                      <p className="text-sm text-zinc-400 font-helvetica">
                        {language === "es"
                          ? "La luna más brillante de Urano. Tiene una superficie joven con valles y cañones que indican actividad geológica reciente."
                          : "The brightest moon of Uranus. It has a young surface with valleys and canyons indicating recent geological activity."}
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
                  <h3 className="text-xl font-bold mb-4 text-cyan-400 font-orbitron">{language === "es" ? "Inclinación Única" : "Unique Tilt"}</h3>
                  <p className="font-helvetica">
                    {language === "es"
                      ? "Urano es el único planeta que rota sobre su lado, con un eje inclinado 98 grados. Esto significa que sus polos experimentan 42 años de luz solar continua seguidos de 42 años de oscuridad."
                      : "Uranus is the only planet that rotates on its side, with an axis tilted 98 degrees. This means its poles experience 42 years of continuous sunlight followed by 42 years of darkness."}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-cyan-400 font-orbitron">{language === "es" ? "Exploración" : "Exploration"}</h3>
                  <p className="font-helvetica">
                    {language === "es"
                      ? "La única nave espacial que ha visitado Urano fue la Voyager 2 en 1986. La misión proporcionó las primeras imágenes detalladas del planeta, sus anillos y lunas, revelando su color azul verdoso y su inclinación única."
                      : "The only spacecraft to visit Uranus was Voyager 2 in 1986. The mission provided the first detailed images of the planet, its rings, and moons, revealing its blue-green color and unique tilt."}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-cyan-400 font-orbitron">{language === "es" ? "Temperatura Extrema" : "Extreme Temperature"}</h3>
                  <p className="font-helvetica">
                    {language === "es"
                      ? "Urano tiene la temperatura atmosférica más fría de todos los planetas del Sistema Solar, alcanzando mínimos de -224°C. A pesar de estar más lejos del Sol, Neptuno es más cálido que Urano, un misterio que los científicos aún intentan explicar."
                      : "Uranus has the coldest atmospheric temperature of all planets in the Solar System, reaching lows of -224°C. Despite being further from the Sun, Neptune is warmer than Uranus, a mystery that scientists are still trying to explain."}
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