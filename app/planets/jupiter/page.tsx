"use client"

import { useLanguage } from "@/contexts/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import PlanetComparisonChart from "@/components/planet-comparison-chart"
import PlanetCompositionChart from "@/components/planet-composition-chart"
import Header from "@/components/header"
import Footer from "@/components/footer"
import dynamic from "next/dynamic"

// Importamos el componente de modelo 3D de forma dinámica para evitar problemas de SSR
const JupiterModel = dynamic(() => import("@/components/JupiterModel"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-lg">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-400"></div>
    </div>
  )
})

export default function JupiterPage() {
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
      name: language === "es" ? "Júpiter" : "Jupiter",
      diameter: 139820,
      distance: 778.5,
      orbitalPeriod: 4333,
      moons: 95,
    }
  ]

  // Datos para las lunas galileanas
  const galileanMoonsData = [
    {
      name: "Io",
      diameter: 3642,
      distance: 421.8,
      orbitalPeriod: 1.77,
      moons: 0
    },
    {
      name: "Europa",
      diameter: 3122,
      distance: 671.1,
      orbitalPeriod: 3.55,
      moons: 0
    },
    {
      name: "Ganymede",
      diameter: 5268,
      distance: 1070.4,
      orbitalPeriod: 7.15,
      moons: 0
    },
    {
      name: "Callisto",
      diameter: 4821,
      distance: 1882.7,
      orbitalPeriod: 16.69,
      moons: 0
    }
  ]

  // Datos para el gráfico de composición
  const compositionData = [
    { name: language === "es" ? "Hidrógeno" : "Hydrogen", value: 75, color: "#FF9800" },
    { name: language === "es" ? "Helio" : "Helium", value: 24, color: "#FFB74D" },
    { name: language === "es" ? "Metano" : "Methane", value: 0.3, color: "#FFA726" },
    { name: language === "es" ? "Otros" : "Others", value: 0.7, color: "#FF8A65" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-orange-400 font-orbitron">
            {language === "es" ? "Júpiter" : "Jupiter"}
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-helvetica">
            {language === "es"
              ? "El planeta más grande del Sistema Solar y el quinto desde el Sol"
              : "The largest planet in the Solar System and the fifth from the Sun"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <JupiterModel />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-orange-300 font-orbitron">
              {language === "es" ? "El Gigante Gaseoso" : "The Gas Giant"}
            </h2>
            <p className="mb-4 font-helvetica">
              {language === "es"
                ? "Júpiter es el planeta más grande del Sistema Solar, con una masa más de 2.5 veces la de todos los demás planetas juntos. Es conocido por su Gran Mancha Roja, una tormenta gigante que ha estado activa durante al menos 400 años. Júpiter tiene un sistema de anillos tenues y más de 95 lunas conocidas, incluyendo las cuatro lunas galileanas: Ío, Europa, Ganímedes y Calisto."
                : "Jupiter is the largest planet in the Solar System, with a mass more than 2.5 times that of all the other planets combined. It is known for its Great Red Spot, a giant storm that has been active for at least 400 years. Jupiter has a faint ring system and more than 95 known moons, including the four Galilean moons: Io, Europa, Ganymede, and Callisto."}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Diámetro" : "Diameter"}</p>
                <p className="font-medium">139,820 km</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Distancia del Sol" : "Distance from Sun"}</p>
                <p className="font-medium">778.5 {language === "es" ? "millones de km" : "million km"}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Período Orbital" : "Orbital Period"}</p>
                <p className="font-medium">4,333 {language === "es" ? "días terrestres" : "Earth days"}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Lunas" : "Moons"}</p>
                <p className="font-medium">95</p>
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
                <p>
                  {language === "es"
                    ? "Júpiter es el quinto planeta desde el Sol y el más grande del Sistema Solar. Es un gigante gaseoso compuesto principalmente de hidrógeno y helio, similar a la composición del Sol. La atmósfera de Júpiter está organizada en bandas de nubes de diferentes colores, con vientos que pueden alcanzar velocidades de hasta 360 km/h. La Gran Mancha Roja, una tormenta anticiclónica que ha persistido durante siglos, es una de las características más distintivas del planeta."
                    : "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant composed primarily of hydrogen and helium, similar to the composition of the Sun. Jupiter's atmosphere is organized into bands of clouds of different colors, with winds that can reach speeds of up to 360 km/h. The Great Red Spot, an anticyclonic storm that has persisted for centuries, is one of the planet's most distinctive features."}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PlanetComparisonChart data={comparisonData} />
              <PlanetCompositionChart planetName={language === "es" ? "Júpiter" : "Jupiter"} data={compositionData} />
            </div>
          </TabsContent>

          <TabsContent value="characteristics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-orbitron">{t("planets.atmosphere")}</h3>
                  <p className="font-helvetica">
                    {language === "es"
                      ? "La atmósfera de Júpiter está compuesta principalmente de hidrógeno (75%) y helio (24%), con trazas de metano, amoníaco y otros compuestos. Las bandas de nubes visibles están formadas por cristales de amoníaco y otros compuestos químicos. La atmósfera muestra patrones de circulación complejos, con bandas alternadas de vientos que soplan en direcciones opuestas."
                      : "Jupiter's atmosphere is composed primarily of hydrogen (75%) and helium (24%), with traces of methane, ammonia, and other compounds. The visible cloud bands are formed by ammonia crystals and other chemical compounds. The atmosphere shows complex circulation patterns, with alternating bands of winds blowing in opposite directions."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-orbitron">{t("planets.magneticField")}</h3>
                  <p className="font-helvetica">
                    {language === "es"
                      ? "Júpiter posee el campo magnético más potente de todos los planetas del Sistema Solar, aproximadamente 14 veces más intenso que el de la Tierra. Este campo magnético genera una magnetosfera masiva que se extiende millones de kilómetros en el espacio, protegiendo al planeta de la radiación solar y creando intensas auroras en sus polos."
                      : "Jupiter has the strongest magnetic field of all the planets in the Solar System, approximately 14 times stronger than Earth's. This magnetic field creates a massive magnetosphere that extends millions of kilometers into space, protecting the planet from solar radiation and creating intense auroras at its poles."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-orbitron">{t("planets.rings")}</h3>
                  <p className="font-helvetica">
                    {language === "es"
                      ? "Júpiter cuenta con un sistema de anillos tenue, descubierto por la sonda espacial Voyager 1 en 1979. Los anillos están compuestos principalmente por partículas de polvo y son mucho menos visibles que los anillos de Saturno. El sistema de anillos incluye un anillo principal, un anillo de halo y un anillo de gasa."
                      : "Jupiter has a faint ring system, discovered by the Voyager 1 spacecraft in 1979. The rings are composed mainly of dust particles and are much less visible than Saturn's rings. The ring system includes a main ring, a halo ring, and a gossamer ring."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-orbitron">{t("planets.rotation")}</h3>
                  <p className="font-helvetica">
                    {language === "es"
                      ? "Júpiter tiene el período de rotación más corto de todos los planetas del Sistema Solar, completando una rotación en aproximadamente 9.8 horas. Esta rápida rotación provoca un notable achatamiento en los polos y contribuye a la formación de las bandas de nubes y tormentas en la atmósfera."
                      : "Jupiter has the shortest rotation period of all the planets in the Solar System, completing one rotation in approximately 9.8 hours. This rapid rotation causes a notable flattening at the poles and contributes to the formation of cloud bands and storms in the atmosphere."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="moons" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 font-orbitron">{language === "es" ? "Las Lunas Galileanas" : "The Galilean Moons"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-bold font-orbitron">Ío</h4>
                      <p className="text-sm text-zinc-400 font-helvetica">
                        {language === "es"
                          ? "El cuerpo más volcánicamente activo del Sistema Solar, con más de 400 volcanes activos. Su superficie está en constante cambio debido a la actividad volcánica."
                          : "The most volcanically active body in the Solar System, with more than 400 active volcanoes. Its surface is constantly changing due to volcanic activity."}
                      </p>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-bold font-orbitron">Europa</h4>
                      <p className="text-sm text-zinc-400 font-helvetica">
                        {language === "es"
                          ? "Una luna helada con un océano subsuperficial de agua líquida. Es uno de los lugares más prometedores para buscar vida extraterrestre en el Sistema Solar."
                          : "An icy moon with a subsurface ocean of liquid water. It is one of the most promising places to search for extraterrestrial life in the Solar System."}
                      </p>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-bold font-orbitron">Ganímedes</h4>
                      <p className="text-sm text-zinc-400 font-helvetica">
                        {language === "es"
                          ? "La luna más grande del Sistema Solar, incluso más grande que Mercurio. Tiene su propio campo magnético y un océano subsuperficial."
                          : "The largest moon in the Solar System, even larger than Mercury. It has its own magnetic field and a subsurface ocean."}
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-bold font-orbitron">Calisto</h4>
                      <p className="text-sm text-zinc-400 font-helvetica">
                        {language === "es"
                          ? "La luna más antigua y con más cráteres del Sistema Solar. Su superficie está cubierta de hielo y cráteres de impacto."
                          : "The most ancient and cratered moon in the Solar System. Its surface is covered in ice and impact craters."}
                      </p>
                    </div>
                  </div>
                  <div>
                    <PlanetComparisonChart 
                      data={galileanMoonsData} 
                      title={language === "es" ? "Comparación de las Lunas Galileanas" : "Galilean Moons Comparison"}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-orange-400 font-orbitron">{language === "es" ? "La Gran Mancha Roja" : "The Great Red Spot"}</h3>
                  <p>
                    {language === "es"
                      ? "La Gran Mancha Roja es una tormenta gigante que ha estado activa durante al menos 400 años. Es tan grande que podrían caber tres Tierras en su interior. Aunque ha estado disminuyendo de tamaño en los últimos años, sigue siendo una de las características más distintivas de Júpiter."
                      : "The Great Red Spot is a giant storm that has been active for at least 400 years. It is so large that three Earths could fit inside it. Although it has been shrinking in recent years, it remains one of Jupiter's most distinctive features."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-orange-400 font-orbitron">{language === "es" ? "Exploración" : "Exploration"}</h3>
                  <p>
                    {language === "es"
                      ? "Júpiter ha sido visitado por varias misiones espaciales, incluyendo Pioneer 10 y 11, Voyager 1 y 2, Galileo, y la misión actual Juno. Estas misiones han proporcionado información valiosa sobre la atmósfera, el campo magnético y las lunas del planeta."
                      : "Jupiter has been visited by several space missions, including Pioneer 10 and 11, Voyager 1 and 2, Galileo, and the current Juno mission. These missions have provided valuable information about the planet's atmosphere, magnetic field, and moons."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-orange-400 font-orbitron">{language === "es" ? "Protección Planetaria" : "Planetary Protection"}</h3>
                  <p>
                    {language === "es"
                      ? "Júpiter actúa como un escudo protector para los planetas interiores, atrayendo y capturando cometas y asteroides que podrían representar una amenaza para la Tierra. Su enorme masa y gravedad han ayudado a mantener estable el Sistema Solar durante miles de millones de años."
                      : "Jupiter acts as a protective shield for the inner planets, attracting and capturing comets and asteroids that could pose a threat to Earth. Its enormous mass and gravity have helped keep the Solar System stable for billions of years."}
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