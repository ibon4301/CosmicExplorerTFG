"use client"

import { useLanguage } from "@/contexts/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import PlanetComparisonChart from "@/components/planet-comparison-chart"
import PlanetCompositionChart from "@/components/planet-composition-chart"
import MainHeader from "@/components/main-header"
import Footer from "@/components/footer"
import MercuryTemperatureChart from "@/components/mercury-temperature-chart"
import MercuryAtmosphereChart from "@/components/mercury-atmosphere-chart"
import MercuryMissionsTimeline from "@/components/mercury-missions-timeline"
import MercuryCratersChart from "@/components/mercury-craters-chart"
import dynamic from "next/dynamic"

// Importamos el componente de modelo 3D de forma dinámica para evitar problemas de SSR
const MercuryModel = dynamic(() => import("@/components/MercuryModel"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-lg">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-400"></div>
    </div>
  )
})

export default function MercuryPage() {
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
      name: language === "es" ? "Mercurio" : "Mercury",
      diameter: 4879,
      distance: 57.9,
      orbitalPeriod: 88,
      moons: 0,
    },
  ]

  // Datos para el gráfico de composición
  const compositionData = [
    { name: language === "es" ? "Hierro" : "Iron", value: 70, color: "#78716c" },
    { name: language === "es" ? "Silicatos" : "Silicates", value: 30, color: "#a8a29e" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <MainHeader />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-400 font-orbitron">
            {language === "es" ? "Mercurio" : "Mercury"}
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-helvetica">
            {language === "es"
              ? "El planeta más pequeño y más cercano al Sol en nuestro Sistema Solar"
              : "The smallest and closest planet to the Sun in our Solar System"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <MercuryModel />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-300 font-orbitron">
              {language === "es" ? "El Planeta Metálico" : "The Metallic Planet"}
            </h2>
            <p className="mb-4 font-helvetica">
              {language === "es"
                ? "Mercurio es un planeta rocoso con una superficie llena de cráteres similar a la Luna. Tiene un núcleo metálico excepcionalmente grande que ocupa aproximadamente el 60% de su masa. A pesar de su proximidad al Sol, algunas áreas de los polos de Mercurio contienen hielo de agua permanente."
                : "Mercury is a rocky planet with a heavily cratered surface similar to the Moon. It has an exceptionally large metallic core that takes up about 60% of its mass. Despite its proximity to the Sun, some areas of Mercury's poles contain permanent water ice."}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Diámetro" : "Diameter"}</p>
                <p className="font-medium">4,879 km</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Distancia del Sol" : "Distance from Sun"}</p>
                <p className="font-medium">57.9 {language === "es" ? "millones de km" : "million km"}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Período Orbital" : "Orbital Period"}</p>
                <p className="font-medium">88 {language === "es" ? "días terrestres" : "Earth days"}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Temperatura" : "Temperature"}</p>
                <p className="font-medium">-180°C {language === "es" ? "a" : "to"} 430°C</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="font-orbitron">{t("planets.overview")}</TabsTrigger>
            <TabsTrigger value="characteristics" className="font-orbitron">{t("planets.characteristics")}</TabsTrigger>
            <TabsTrigger value="exploration" className="font-orbitron">{t("planets.exploration")}</TabsTrigger>
            <TabsTrigger value="facts" className="font-orbitron">{t("planets.facts")}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <p>
                  {language === "es"
                    ? "Mercurio es el planeta más pequeño de nuestro Sistema Solar y el más cercano al Sol. Es solo ligeramente más grande que la Luna de la Tierra. Mercurio tiene una órbita excéntrica que lo lleva tan cerca como 46 millones de km y tan lejos como 70 millones de km del Sol. El planeta completa una órbita alrededor del Sol cada 88 días terrestres, moviéndose a través del espacio a casi 50 km por segundo, más rápido que cualquier otro planeta."
                    : "Mercury is the smallest planet in our Solar System and the closest to the Sun. It is only slightly larger than Earth's Moon. Mercury has an eccentric orbit that takes it as close as 46 million km and as far as 70 million km from the Sun. The planet completes one orbit around the Sun every 88 Earth days, moving through space at nearly 50 km per second, faster than any other planet."}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PlanetComparisonChart data={comparisonData} />
              <PlanetCompositionChart planetName={language === "es" ? "Mercurio" : "Mercury"} data={compositionData} />
            </div>
          </TabsContent>

          <TabsContent value="characteristics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <MercuryTemperatureChart />
              <MercuryAtmosphereChart />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-orbitron">{t("planets.atmosphere")}</h3>
                  <p className="font-helvetica">
                    {language === "es"
                      ? "Mercurio prácticamente no tiene atmósfera. En su lugar, tiene una exosfera extremadamente delgada compuesta principalmente de oxígeno, sodio, hidrógeno, helio y potasio. Estos átomos son constantemente perdidos y repuestos desde varias fuentes, incluyendo el viento solar y el material de la superficie. La presión atmosférica en la superficie es aproximadamente un billón de veces menor que la de la Tierra."
                      : "Mercury has virtually no atmosphere. Instead, it has an extremely thin exosphere composed mainly of oxygen, sodium, hydrogen, helium, and potassium. These atoms are constantly being lost and replenished from various sources, including the solar wind and surface material. The atmospheric pressure at the surface is about one trillion times less than Earth's."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-orbitron">{t("planets.surface")}</h3>
                  <p className="font-helvetica">
                    {language === "es"
                      ? "La superficie de Mercurio está fuertemente craterizada y se parece mucho a la Luna. Tiene extensas llanuras lisas y numerosos cráteres, incluyendo el enorme Caloris Basin con un diámetro de 1,550 km. La superficie también presenta acantilados largos y sinuosos, algunos de hasta 500 km de longitud y 3 km de altura, formados cuando el planeta se enfrió y se contrajo."
                      : "Mercury's surface is heavily cratered and very similar in appearance to the Moon. It has extensive smooth plains and numerous craters, including the enormous Caloris Basin with a diameter of 1,550 km. The surface also features long, winding cliffs, some up to 500 km long and 3 km high, formed as the planet cooled and contracted."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-orbitron">{t("planets.moons")}</h3>
                  <p className="font-helvetica">
                    {language === "es"
                      ? "Mercurio no tiene lunas. Su proximidad al Sol hace que sea difícil para el planeta capturar y retener satélites naturales. Junto con Venus, es uno de los dos únicos planetas del Sistema Solar sin lunas."
                      : "Mercury has no moons. Its proximity to the Sun makes it difficult for the planet to capture and retain natural satellites. Along with Venus, it is one of only two planets in the Solar System without moons."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-orbitron">{t("planets.orbit")}</h3>
                  <p className="font-helvetica">
                    {language === "es"
                      ? "Mercurio tiene una órbita muy excéntrica y la más inclinada de todos los planetas. Completa una órbita cada 88 días terrestres. Curiosamente, Mercurio gira lentamente sobre su eje, completando una rotación cada 59 días terrestres. Debido a esta relación 3:2 entre su rotación y su órbita, un día solar en Mercurio (desde un amanecer hasta el siguiente) dura aproximadamente 176 días terrestres."
                      : "Mercury has a highly eccentric orbit and the most inclined orbit of all the planets. It completes one orbit every 88 Earth days. Interestingly, Mercury rotates slowly on its axis, completing one rotation every 59 Earth days. Because of this 3:2 relationship between its rotation and orbit, a solar day on Mercury (from one sunrise to the next) lasts about 176 Earth days."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="exploration" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <MercuryMissionsTimeline />
              <MercuryCratersChart />
            </div>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 font-orbitron">
                  {language === "es" ? "Misiones a Mercurio" : "Mercury Missions"}
                </h3>
                <p className="mb-4 font-helvetica">
                  {language === "es"
                    ? "Debido a su proximidad al Sol, Mercurio es difícil de visitar y ha sido explorado por solo dos misiones espaciales."
                    : "Due to its proximity to the Sun, Mercury is challenging to visit and has been explored by only two space missions."}
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium font-orbitron">Mariner 10 (1974-1975)</span> -
                    {language === "es"
                      ? " Primera nave espacial en visitar Mercurio, realizó tres sobrevuelos y mapeó aproximadamente el 45% de la superficie."
                      : " First spacecraft to visit Mercury, performed three flybys and mapped about 45% of the surface."}
                  </li>
                  <li>
                    <span className="font-medium font-orbitron">MESSENGER (2011-2015)</span> -
                    {language === "es"
                      ? " Primera sonda en orbitar Mercurio, proporcionó datos detallados sobre su composición, geología y campo magnético."
                      : " First probe to orbit Mercury, provided detailed data about its composition, geology, and magnetic field."}
                  </li>
                  <li>
                    <span className="font-medium font-orbitron">BepiColombo (2018-presente)</span> -
                    {language === "es"
                      ? " Misión conjunta de la ESA y JAXA actualmente en ruta hacia Mercurio, llegará en 2025 para estudiar el planeta en detalle."
                      : " Joint ESA-JAXA mission currently en route to Mercury, will arrive in 2025 to study the planet in detail."}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-400 font-orbitron">
                    {language === "es" ? "Extremos de Temperatura" : "Temperature Extremes"}
                  </h3>
                  <p className="text-zinc-400 font-helvetica">
                    {language === "es"
                      ? "Mercurio experimenta las fluctuaciones de temperatura más extremas de cualquier planeta del Sistema Solar, desde 430°C durante el día hasta -180°C por la noche."
                      : "Mercury experiences the most extreme temperature fluctuations of any planet in the Solar System, from 430°C during the day to -180°C at night."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-400 font-orbitron">
                    {language === "es" ? "Núcleo Masivo" : "Massive Core"}
                  </h3>
                  <p className="text-zinc-400 font-helvetica">
                    {language === "es"
                      ? "El núcleo metálico de Mercurio ocupa aproximadamente el 60% de su masa, una proporción mucho mayor que cualquier otro planeta del Sistema Solar."
                      : "Mercury's metal core makes up about 60% of its mass, a much higher proportion than any other planet in the Solar System."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-400 font-orbitron">
                    {language === "es" ? "Hielo en los Polos" : "Polar Ice"}
                  </h3>
                  <p className="text-zinc-400 font-helvetica">
                    {language === "es"
                      ? "A pesar de las temperaturas abrasadoras en el lado diurno, los cráteres en los polos de Mercurio contienen hielo de agua permanente porque nunca reciben luz solar directa."
                      : "Despite scorching temperatures on the dayside, craters at Mercury's poles contain permanent water ice because they never receive direct sunlight."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-400 font-orbitron">
                    {language === "es" ? "Campo Magnético Sorprendente" : "Surprising Magnetic Field"}
                  </h3>
                  <p className="text-zinc-400 font-helvetica">
                    {language === "es"
                      ? "A pesar de su tamaño pequeño y rotación lenta, Mercurio tiene un campo magnético global, algo que Venus y Marte no tienen."
                      : "Despite its small size and slow rotation, Mercury has a global magnetic field, something that Venus and Mars do not have."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-400 font-orbitron">
                    {language === "es" ? "Planeta Más Rápido" : "Fastest Planet"}
                  </h3>
                  <p className="text-zinc-400 font-helvetica">
                    {language === "es"
                      ? "Mercurio orbita el Sol a una velocidad promedio de 47 km por segundo, más rápido que cualquier otro planeta."
                      : "Mercury orbits the Sun at an average speed of 47 km per second, faster than any other planet."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-400 font-orbitron">
                    {language === "es" ? "Día Solar Extraño" : "Strange Solar Day"}
                  </h3>
                  <p className="text-zinc-400 font-helvetica">
                    {language === "es"
                      ? "Un día solar en Mercurio (de un amanecer al siguiente) dura aproximadamente 176 días terrestres, mientras que un año mercuriano dura solo 88 días terrestres."
                      : "A solar day on Mercury (from one sunrise to the next) lasts about 176 Earth days, while a Mercurian year is only 88 Earth days."}
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
