"use client"

import { useLanguage } from "@/contexts/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import PlanetComparisonChart from "@/components/planet-comparison-chart"
import PlanetCompositionChart from "@/components/planet-composition-chart"
import MainHeader from "@/components/main-header"
import Footer from "@/components/footer"
import MarsTemperatureChart from "@/components/mars-temperature-chart"
import MarsAtmosphereChart from "@/components/mars-atmosphere-chart"
import MarsMissionsTimeline from "@/components/mars-missions-timeline"
import MarsRoversComparison from "@/components/mars-rovers-comparison"
import dynamic from "next/dynamic"

// Importamos el componente de modelo 3D de forma dinámica para evitar problemas de SSR
const MarsModel = dynamic(() => import("@/components/MarsModel"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-lg">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-400"></div>
    </div>
  )
})

export default function MarsPage() {
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
      name: language === "es" ? "Marte" : "Mars",
      diameter: 6779,
      distance: 227.9,
      orbitalPeriod: 687,
      moons: 2,
    },
  ]

  // Datos para el gráfico de composición
  const compositionData = [
    { name: language === "es" ? "Hierro" : "Iron", value: 30, color: "#FF5252" },
    { name: language === "es" ? "Silicatos" : "Silicates", value: 40, color: "#FF9800" },
    { name: language === "es" ? "Óxido de Hierro" : "Iron Oxide", value: 25, color: "#D32F2F" },
    { name: language === "es" ? "Otros" : "Others", value: 5, color: "#795548" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <MainHeader />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-500 font-space">
            {language === "es" ? "Marte" : "Mars"}
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            {language === "es"
              ? "El cuarto planeta desde el Sol y el segundo planeta más pequeño del Sistema Solar"
              : "The fourth planet from the Sun and the second-smallest planet in the Solar System"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <MarsModel />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-red-400 font-space">
              {language === "es" ? "El Planeta Rojo" : "The Red Planet"}
            </h2>
            <p className="mb-4">
              {language === "es"
                ? "Marte es conocido como el Planeta Rojo debido al óxido de hierro (óxido) en su superficie. Tiene el volcán más grande y el cañón más profundo del sistema solar. La evidencia sugiere que Marte alguna vez tuvo agua fluyendo y podría haber albergado vida."
                : "Mars is known as the Red Planet due to iron oxide (rust) on its surface. It has the largest volcano and the deepest canyon in the solar system. Evidence suggests Mars once had flowing water and could have supported life."}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Diámetro" : "Diameter"}</p>
                <p className="font-medium">6,779 km</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Distancia del Sol" : "Distance from Sun"}</p>
                <p className="font-medium">227.9 {language === "es" ? "millones de km" : "million km"}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Período Orbital" : "Orbital Period"}</p>
                <p className="font-medium">687 {language === "es" ? "días terrestres" : "Earth days"}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Temperatura" : "Temperature"}</p>
                <p className="font-medium">-153°C {language === "es" ? "a" : "to"} 20°C</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="font-space">{t("planets.overview")}</TabsTrigger>
            <TabsTrigger value="characteristics" className="font-space">{t("planets.characteristics")}</TabsTrigger>
            <TabsTrigger value="exploration" className="font-space">{t("planets.exploration")}</TabsTrigger>
            <TabsTrigger value="facts" className="font-space">{t("planets.facts")}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <p>
                  {language === "es"
                    ? "Marte es el cuarto planeta desde el Sol y el segundo planeta más pequeño del Sistema Solar, siendo más grande que solo Mercurio. En inglés, Marte lleva el nombre del dios romano de la guerra. Marte es un planeta terrestre con una atmósfera delgada, con características de superficie que recuerdan tanto a los cráteres de impacto de la Luna como a los valles, desiertos y casquetes polares de la Tierra."
                    : "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war. Mars is a terrestrial planet with a thin atmosphere, with surface features reminiscent of the impact craters of the Moon and the valleys, deserts, and polar ice caps of Earth."}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PlanetComparisonChart data={comparisonData} />
              <PlanetCompositionChart planetName={language === "es" ? "Marte" : "Mars"} data={compositionData} />
            </div>
          </TabsContent>

          <TabsContent value="characteristics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <MarsTemperatureChart />
              <MarsAtmosphereChart />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-space">{t("planets.atmosphere")}</h3>
                  <p>
                    {language === "es"
                      ? "La atmósfera de Marte es mucho más delgada que la de la Tierra, con una presión superficial de solo 0.6% de la presión atmosférica media de la Tierra al nivel del mar. Está compuesta principalmente de dióxido de carbono (95%), nitrógeno (3%) y argón (1.6%)."
                      : "Mars' atmosphere is much thinner than Earth's, with a surface pressure of just 0.6% of Earth's average sea level pressure. It is composed primarily of carbon dioxide (95%), nitrogen (3%), and argon (1.6%)."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-space">{t("planets.surface")}</h3>
                  <p>
                    {language === "es"
                      ? "La superficie de Marte está cubierta de polvo rico en óxido de hierro, lo que le da su característico color rojo. Presenta diversas características geológicas, incluyendo el Monte Olimpo, el volcán más grande del Sistema Solar, y Valles Marineris, uno de los cañones más grandes."
                      : "Mars' surface is covered with iron oxide-rich dust, giving it its characteristic red color. It features various geological features, including Olympus Mons, the largest volcano in the Solar System, and Valles Marineris, one of the largest canyons."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-space">{t("planets.moons")}</h3>
                  <p>
                    {language === "es"
                      ? "Marte tiene dos pequeñas lunas, Fobos y Deimos. Ambas tienen formas irregulares y se cree que son asteroides capturados. Fobos orbita tan cerca de Marte que eventualmente se desintegrará o impactará contra el planeta."
                      : "Mars has two small moons, Phobos and Deimos. Both are irregularly shaped and are believed to be captured asteroids. Phobos orbits so close to Mars that it will eventually either break up or crash into the planet."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-space">{t("planets.orbit")}</h3>
                  <p>
                    {language === "es"
                      ? "Marte orbita el Sol a una distancia promedio de 227.9 millones de kilómetros, completando una órbita cada 687 días terrestres. Un día en Marte (un sol) es ligeramente más largo que un día terrestre: 24 horas, 39 minutos y 35 segundos."
                      : "Mars orbits the Sun at an average distance of 227.9 million kilometers, completing one orbit every 687 Earth days. A day on Mars (a sol) is slightly longer than an Earth day: 24 hours, 39 minutes, and 35 seconds."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="exploration" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <MarsMissionsTimeline />
              <MarsRoversComparison />
            </div>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 font-space">{language === "es" ? "Misiones a Marte" : "Mars Missions"}</h3>
                <p className="mb-4">
                  {language === "es"
                    ? "Marte ha sido uno de los planetas más explorados del Sistema Solar. Numerosas misiones han sido enviadas para estudiar su superficie, atmósfera y potencial para albergar vida."
                    : "Mars has been one of the most explored planets in the Solar System. Numerous missions have been sent to study its surface, atmosphere, and potential for harboring life."}
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium font-space">Mariner 4 (1965)</span> -
                    {language === "es"
                      ? " Primera nave espacial en realizar un sobrevuelo exitoso de Marte."
                      : " First spacecraft to successfully fly by Mars."}
                  </li>
                  <li>
                    <span className="font-medium font-space">Viking 1 & 2 (1976)</span> -
                    {language === "es"
                      ? " Primeros aterrizajes exitosos en Marte."
                      : " First successful landings on Mars."}
                  </li>
                  <li>
                    <span className="font-medium font-space">Mars Pathfinder (1997)</span> -
                    {language === "es"
                      ? " Entregó el primer rover, Sojourner, a la superficie marciana."
                      : " Delivered the first rover, Sojourner, to the Martian surface."}
                  </li>
                  <li>
                    <span className="font-medium font-space">Spirit & Opportunity (2004)</span> -
                    {language === "es"
                      ? " Rovers gemelos que realizaron extensas exploraciones de la superficie."
                      : " Twin rovers that conducted extensive surface explorations."}
                  </li>
                  <li>
                    <span className="font-medium font-space">Curiosity (2012)</span> -
                    {language === "es"
                      ? " Rover de gran tamaño que continúa explorando el cráter Gale."
                      : " Large rover that continues to explore Gale Crater."}
                  </li>
                  <li>
                    <span className="font-medium font-space">Perseverance (2021)</span> -
                    {language === "es"
                      ? " Rover más reciente, que busca signos de vida microbiana antigua y recolecta muestras para un futuro retorno a la Tierra."
                      : " Most recent rover, searching for signs of ancient microbial life and collecting samples for future return to Earth."}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 font-space">
                  {language === "es" ? "Descubrimientos Clave" : "Key Discoveries"}
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-bold font-space">
                      {language === "es" ? "Evidencia de Agua Pasada" : "Evidence of Past Water"}
                    </h4>
                    <p className="text-sm text-zinc-400">
                      {language === "es"
                        ? "Los rovers y orbitadores han encontrado minerales que solo se forman en presencia de agua líquida, así como características geológicas como antiguos lechos de lagos y canales de ríos."
                        : "Rovers and orbiters have found minerals that only form in the presence of liquid water, as well as geological features like ancient lake beds and river channels."}
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-bold font-space">{language === "es" ? "Metano Atmosférico" : "Atmospheric Methane"}</h4>
                    <p className="text-sm text-zinc-400">
                      {language === "es"
                        ? "El rover Curiosity detectó picos estacionales de metano en la atmósfera marciana, lo que podría indicar procesos geológicos activos o, potencialmente, actividad biológica."
                        : "The Curiosity rover detected seasonal spikes of methane in the Martian atmosphere, which could indicate active geological processes or, potentially, biological activity."}
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-bold font-space">{language === "es" ? "Compuestos Orgánicos" : "Organic Compounds"}</h4>
                    <p className="text-sm text-zinc-400">
                      {language === "es"
                        ? "Se han detectado moléculas orgánicas complejas en rocas marcianas, un componente esencial para la vida tal como la conocemos."
                        : "Complex organic molecules have been detected in Martian rocks, an essential component for life as we know it."}
                    </p>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-bold font-space">
                      {language === "es" ? "Agua Subterránea Actual" : "Current Subsurface Water"}
                    </h4>
                    <p className="text-sm text-zinc-400">
                      {language === "es"
                        ? "El radar de la nave Mars Express detectó lo que parece ser un lago subterráneo de agua líquida cerca del polo sur marciano."
                        : "Radar on the Mars Express spacecraft detected what appears to be a subsurface lake of liquid water near the Martian south pole."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-red-400 font-space">{language === "es" ? "Agua en Marte" : "Water on Mars"}</h3>
                  <p>
                    {language === "es"
                      ? "Hay evidencia significativa de que el agua líquida alguna vez fluyó en la superficie de Marte. Los científicos han identificado antiguos lechos de lagos, deltas de ríos y canales de flujo. Hoy, el agua existe principalmente como hielo en los casquetes polares y bajo la superficie."
                      : "There is significant evidence that liquid water once flowed on Mars' surface. Scientists have identified ancient lake beds, river deltas, and flow channels. Today, water exists primarily as ice in the polar caps and beneath the surface."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-red-400 font-space">{language === "es" ? "Tormentas de Polvo" : "Dust Storms"}</h3>
                  <p>
                    {language === "es"
                      ? "Marte experimenta algunas de las tormentas de polvo más grandes del Sistema Solar. Ocasionalmente, estas tormentas pueden crecer hasta envolver todo el planeta, oscureciendo la superficie durante meses. La última tormenta global ocurrió en 2018."
                      : "Mars experiences some of the largest dust storms in the Solar System. Occasionally, these storms can grow to envelop the entire planet, obscuring the surface for months. The last global storm occurred in 2018."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-red-400 font-space">
                    {language === "es" ? "Potencial para la Vida" : "Potential for Life"}
                  </h3>
                  <p>
                    {language === "es"
                      ? "Marte es uno de los lugares más prometedores para buscar evidencia de vida pasada o presente fuera de la Tierra. Las condiciones en Marte primitivo podrían haber sido favorables para la vida microbiana. Las misiones actuales están buscando biomarcadores y otros signos de actividad biológica."
                      : "Mars is one of the most promising places to look for evidence of past or present life beyond Earth. Conditions on early Mars may have been favorable for microbial life. Current missions are searching for biomarkers and other signs of biological activity."}
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
