"use client"

import { useLanguage } from "@/contexts/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import PlanetComparisonChart from "@/components/planet-comparison-chart"
import PlanetCompositionChart from "@/components/planet-composition-chart"
import MainHeader from "@/components/main-header"
import Footer from "@/components/footer"
import VenusTemperatureChart from "@/components/venus-temperature-chart"
import VenusAtmosphereChart from "@/components/venus-atmosphere-chart"
import VenusMissionsTimeline from "@/components/venus-missions-timeline"
import VenusGeologyChart from "@/components/venus-geology-chart"
import dynamic from "next/dynamic"

// Importamos el componente de modelo 3D de forma dinámica para evitar problemas de SSR
const VenusModel = dynamic(() => import("@/components/VenusModel"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-lg">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-400"></div>
    </div>
  )
})

export default function VenusPage() {
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
      name: language === "es" ? "Venus" : "Venus",
      diameter: 12104,
      distance: 108.2,
      orbitalPeriod: 224.7,
      moons: 0,
    },
  ]

  // Datos para el gráfico de composición
  const compositionData = [
    { name: language === "es" ? "Núcleo de hierro" : "Iron core", value: 50, color: "#b45309" },
    { name: language === "es" ? "Manto rocoso" : "Rocky mantle", value: 50, color: "#f59e0b" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <MainHeader />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-400 font-space">
            {language === "es" ? "Venus" : "Venus"}
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            {language === "es"
              ? "El planeta más caliente y el segundo más cercano al Sol en nuestro Sistema Solar"
              : "The hottest planet and the second closest to the Sun in our Solar System"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <VenusModel />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-amber-300 font-space">
              {language === "es" ? "El Planeta Hermano" : "The Sister Planet"}
            </h2>
            <p className="mb-4">
              {language === "es"
                ? "Venus es a menudo llamado el planeta hermano de la Tierra debido a su tamaño y masa similares. Sin embargo, su densa atmósfera de dióxido de carbono ha creado un efecto invernadero extremo, haciendo de Venus el planeta más caliente del Sistema Solar con temperaturas superficiales que pueden derretir plomo. La superficie está dominada por llanuras volcánicas, montañas y miles de volcanes."
                : "Venus is often called Earth's sister planet due to its similar size and mass. However, its dense carbon dioxide atmosphere has created an extreme greenhouse effect, making Venus the hottest planet in the Solar System with surface temperatures hot enough to melt lead. The surface is dominated by volcanic plains, mountains, and thousands of volcanoes."}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Diámetro" : "Diameter"}</p>
                <p className="font-medium">12,104 km</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Distancia del Sol" : "Distance from Sun"}</p>
                <p className="font-medium">108.2 {language === "es" ? "millones de km" : "million km"}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Período Orbital" : "Orbital Period"}</p>
                <p className="font-medium">224.7 {language === "es" ? "días terrestres" : "Earth days"}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Temperatura" : "Temperature"}</p>
                <p className="font-medium">462°C {language === "es" ? "promedio" : "average"}</p>
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
                    ? "Venus es el segundo planeta desde el Sol y el más cercano a la Tierra. Es uno de los cuatro planetas terrestres del Sistema Solar y a menudo se le llama el planeta hermano de la Tierra debido a su tamaño y masa similares. Sin embargo, Venus tiene un ambiente extremadamente hostil con una densa atmósfera compuesta principalmente de dióxido de carbono y nubes de ácido sulfúrico. La presión atmosférica en la superficie es 92 veces mayor que la de la Tierra, equivalente a la presión a 900 metros bajo el agua en nuestro planeta."
                    : "Venus is the second planet from the Sun and the closest to Earth. It is one of the four terrestrial planets in the Solar System and is often called Earth's sister planet due to its similar size and mass. However, Venus has an extremely hostile environment with a dense atmosphere composed primarily of carbon dioxide and clouds of sulfuric acid. The atmospheric pressure at the surface is 92 times that of Earth, equivalent to the pressure at 900 meters underwater on our planet."}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PlanetComparisonChart data={comparisonData} />
              <PlanetCompositionChart planetName={language === "es" ? "Venus" : "Venus"} data={compositionData} />
            </div>
          </TabsContent>

          <TabsContent value="characteristics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <VenusTemperatureChart />
              <VenusAtmosphereChart />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-space">{t("planets.atmosphere")}</h3>
                  <p>
                    {language === "es"
                      ? "Venus tiene la atmósfera más densa de todos los planetas terrestres, compuesta principalmente de dióxido de carbono (96.5%) con nubes de ácido sulfúrico. Esta atmósfera crea un efecto invernadero extremo que atrapa el calor, haciendo que Venus sea el planeta más caliente del Sistema Solar a pesar de estar más lejos del Sol que Mercurio. La presión atmosférica en la superficie es 92 veces mayor que la presión atmosférica terrestre al nivel del mar."
                      : "Venus has the densest atmosphere of all terrestrial planets, composed primarily of carbon dioxide (96.5%) with clouds of sulfuric acid. This atmosphere creates an extreme greenhouse effect that traps heat, making Venus the hottest planet in the Solar System despite being farther from the Sun than Mercury. The atmospheric pressure at the surface is 92 times greater than Earth's atmospheric pressure at sea level."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-space">{t("planets.surface")}</h3>
                  <p>
                    {language === "es"
                      ? "La superficie de Venus está dominada por vastas llanuras volcánicas cubiertas de lava solidificada y salpicada por numerosos volcanes, algunos de los cuales podrían estar activos. Las imágenes de radar revelan características como montañas, mesetas y profundos cañones. Venus tiene dos regiones continentales principales: Ishtar Terra en el norte, aproximadamente del tamaño de Australia, y Aphrodite Terra cerca del ecuador, aproximadamente del tamaño de África."
                      : "Venus's surface is dominated by vast volcanic plains covered with solidified lava and dotted with numerous volcanoes, some of which might still be active. Radar imaging reveals features such as mountains, plateaus, and deep canyons. Venus has two main continental regions: Ishtar Terra in the north, about the size of Australia, and Aphrodite Terra near the equator, about the size of Africa."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-space">{t("planets.moons")}</h3>
                  <p>
                    {language === "es"
                      ? "Venus no tiene lunas. Junto con Mercurio, es uno de los dos únicos planetas del Sistema Solar sin satélites naturales. Los científicos creen que esto podría deberse a su rotación retrógrada (gira en dirección opuesta a la mayoría de los planetas) o a colisiones catastróficas en su historia temprana."
                      : "Venus has no moons. Along with Mercury, it is one of only two planets in the Solar System without natural satellites. Scientists believe this might be due to its retrograde rotation (spinning in the opposite direction to most planets) or catastrophic collisions in its early history."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-space">{t("planets.orbit")}</h3>
                  <p>
                    {language === "es"
                      ? "Venus orbita alrededor del Sol a una distancia promedio de 108.2 millones de kilómetros, completando una órbita cada 224.7 días terrestres. Curiosamente, Venus gira muy lentamente sobre su eje en dirección contraria a la mayoría de los planetas, con un día venusiano (un giro completo) que dura 243 días terrestres, más largo que su año. Esto significa que en Venus, el Sol sale por el oeste y se pone por el este."
                      : "Venus orbits the Sun at an average distance of 108.2 million kilometers, completing one orbit every 224.7 Earth days. Interestingly, Venus rotates very slowly on its axis in the opposite direction to most planets, with a Venusian day (one full rotation) lasting 243 Earth days, longer than its year. This means that on Venus, the Sun rises in the west and sets in the east."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="exploration" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <VenusMissionsTimeline />
              <VenusGeologyChart />
            </div>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 font-space">
                  {language === "es" ? "Desafíos de Exploración" : "Exploration Challenges"}
                </h3>
                <p className="mb-4">
                  {language === "es"
                    ? "Venus presenta desafíos extremos para la exploración debido a sus condiciones hostiles."
                    : "Venus presents extreme challenges for exploration due to its hostile conditions."}
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium font-space">{language === "es" ? "Temperatura Extrema" : "Extreme Temperature"}</span> -
                    {language === "es"
                      ? " Las temperaturas superficiales promedian 462°C, suficientes para derretir plomo y dañar rápidamente la electrónica."
                      : " Surface temperatures average 462°C, hot enough to melt lead and quickly damage electronics."}
                  </li>
                  <li>
                    <span className="font-medium font-space">{language === "es" ? "Presión Aplastante" : "Crushing Pressure"}</span> -
                    {language === "es"
                      ? " La presión atmosférica en la superficie es 92 veces la de la Tierra, equivalente a estar 900 metros bajo el agua."
                      : " The atmospheric pressure at the surface is 92 times that of Earth, equivalent to being 900 meters underwater."}
                  </li>
                  <li>
                    <span className="font-medium font-space">{language === "es" ? "Atmósfera Corrosiva" : "Corrosive Atmosphere"}</span> -
                    {language === "es"
                      ? " Las nubes de ácido sulfúrico y otros compuestos químicos corroen rápidamente los materiales convencionales."
                      : " Clouds of sulfuric acid and other chemical compounds quickly corrode conventional materials."}
                  </li>
                  <li>
                    <span className="font-medium font-space">{language === "es" ? "Comunicaciones Limitadas" : "Limited Communications"}</span> -
                    {language === "es"
                      ? " La densa atmósfera dificulta las comunicaciones por radio con las naves en la superficie."
                      : " The dense atmosphere makes radio communications with surface craft difficult."}
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
                  <div className="border-l-4 border-amber-500 pl-4">
                    <h4 className="font-bold">{language === "es" ? "Rotación Retrógrada" : "Retrograde Rotation"}</h4>
                    <p className="text-sm text-zinc-400">
                      {language === "es"
                        ? "Venus gira sobre su eje en dirección opuesta a la mayoría de los planetas del Sistema Solar. Esta rotación retrógrada podría ser resultado de una colisión masiva en su historia temprana."
                        : "Venus rotates on its axis in the opposite direction to most planets in the Solar System. This retrograde rotation might be the result of a massive collision in its early history."}
                    </p>
                  </div>

                  <div className="border-l-4 border-amber-700 pl-4">
                    <h4 className="font-bold">{language === "es" ? "Actividad Volcánica" : "Volcanic Activity"}</h4>
                    <p className="text-sm text-zinc-400">
                      {language === "es"
                        ? "Las misiones Venus Express y Magellan encontraron evidencia de vulcanismo reciente, sugiriendo que Venus podría ser geológicamente activo. Los científicos han detectado puntos calientes y posibles flujos de lava recientes."
                        : "Venus Express and Magellan missions found evidence of recent volcanism, suggesting Venus might be geologically active. Scientists have detected hot spots and possible recent lava flows."}
                    </p>
                  </div>

                  <div className="border-l-4 border-amber-300 pl-4">
                    <h4 className="font-bold">
                      {language === "es" ? "Atmósfera Compleja" : "Complex Atmosphere"}
                    </h4>
                    <p className="text-sm text-zinc-400">
                      {language === "es"
                        ? "La atmósfera de Venus tiene patrones de circulación complejos, incluyendo un 'superrotación' donde los vientos de la alta atmósfera circundan el planeta en solo cuatro días terrestres, mucho más rápido que la rotación del planeta."
                        : "Venus's atmosphere has complex circulation patterns, including a 'superrotation' where high-altitude winds circle the planet in just four Earth days, much faster than the planet's rotation."}
                    </p>
                  </div>

                  <div className="border-l-4 border-amber-600 pl-4">
                    <h4 className="font-bold">
                      {language === "es" ? "Posible Habitabilidad Pasada" : "Possible Past Habitability"}
                    </h4>
                    <p className="text-sm text-zinc-400">
                      {language === "es"
                        ? "Modelos climáticos sugieren que Venus podría haber tenido océanos y condiciones habitables durante miles de millones de años antes de sufrir un efecto invernadero descontrolado que transformó el planeta en el mundo infernal que vemos hoy."
                        : "Climate models suggest Venus might have had oceans and habitable conditions for billions of years before undergoing a runaway greenhouse effect that transformed the planet into the hellish world we see today."}
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
                  <h3 className="text-xl font-bold mb-4 text-amber-400 font-space">{language === "es" ? "Rotación Única" : "Unique Rotation"}</h3>
                  <p>
                    {language === "es"
                      ? "Venus gira sobre su eje tan lentamente que un día venusiano (243 días terrestres) es más largo que su año (224.7 días terrestres). Además, gira en dirección contraria a la mayoría de los planetas, lo que significa que en Venus, el Sol sale por el oeste y se pone por el este."
                      : "Venus rotates on its axis so slowly that a Venusian day (243 Earth days) is longer than its year (224.7 Earth days). Additionally, it rotates in the opposite direction to most planets, meaning that on Venus, the Sun rises in the west and sets in the east."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-amber-400 font-space">
                    {language === "es" ? "El Planeta Más Caliente" : "The Hottest Planet"}
                  </h3>
                  <p>
                    {language === "es"
                      ? "A pesar de estar más lejos del Sol que Mercurio, Venus es el planeta más caliente del Sistema Solar con una temperatura superficial promedio de 462°C, suficiente para derretir plomo. Este calor extremo es resultado del masivo efecto invernadero causado por su densa atmósfera de dióxido de carbono, que atrapa el calor de manera muy eficiente."
                      : "Despite being farther from the Sun than Mercury, Venus is the hottest planet in the Solar System with an average surface temperature of 462°C, hot enough to melt lead. This extreme heat is the result of the massive greenhouse effect caused by its dense carbon dioxide atmosphere, which traps heat very efficiently."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-amber-400 font-space">
                    {language === "es" ? "Planeta Brillante" : "Bright Planet"}
                  </h3>
                  <p>
                    {language === "es"
                      ? "Venus es el objeto natural más brillante en el cielo nocturno después de la Luna, alcanzando una magnitud aparente de -4.6. Sus densas nubes reflejan aproximadamente el 75% de la luz solar que recibe, en comparación con solo el 30% para la Tierra. Este alto albedo es la razón por la que Venus aparece tan brillante desde la Tierra y puede verse incluso durante el día si sabes dónde mirar."
                      : "Venus is the brightest natural object in the night sky after the Moon, reaching an apparent magnitude of -4.6. Its dense clouds reflect about 75% of the sunlight that hits them, compared to only 30% for Earth. This high albedo is why Venus appears so bright from Earth and can even be seen during daylight if you know where to look."}
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