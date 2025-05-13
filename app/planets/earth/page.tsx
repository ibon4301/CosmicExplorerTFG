"use client"

import { useLanguage } from "@/contexts/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import PlanetComparisonChart from "@/components/planet-comparison-chart"
import PlanetCompositionChart from "@/components/planet-composition-chart"
import MainHeader from "@/components/main-header"
import Footer from "@/components/footer"
import EarthTemperatureChart from "@/components/earth-temperature-chart"
import EarthAtmosphereChart from "@/components/earth-atmosphere-chart"
import EarthTimelineChart from "@/components/earth-timeline-chart"
import EarthBiodiversityChart from "@/components/earth-biodiversity-chart"
import dynamic from "next/dynamic"

// Importamos el componente de modelo 3D de forma dinámica para evitar problemas de SSR
const EarthModel = dynamic(() => import("@/components/EarthModel"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-lg">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400"></div>
    </div>
  )
})

export default function EarthPage() {
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
    {
      name: language === "es" ? "Marte" : "Mars",
      diameter: 6779,
      distance: 227.9,
      orbitalPeriod: 687,
      moons: 2,
    }
  ]

  // Datos para el gráfico de composición
  const compositionData = [
    { name: language === "es" ? "Núcleo de hierro" : "Iron core", value: 32, color: "#b45309" },
    { name: language === "es" ? "Manto rocoso" : "Rocky mantle", value: 67, color: "#f59e0b" },
    { name: language === "es" ? "Corteza" : "Crust", value: 1, color: "#3b82f6" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <MainHeader />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-400 font-space">
            {language === "es" ? "La Tierra" : "Earth"}
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            {language === "es"
              ? "Nuestro hogar en el universo, el único planeta conocido que alberga vida"
              : "Our home in the universe, the only known planet that harbors life"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <EarthModel />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-300 font-space">
              {language === "es" ? "El Planeta Azul" : "The Blue Planet"}
            </h2>
            <p className="mb-4">
              {language === "es"
                ? "La Tierra es el tercer planeta desde el Sol y el único lugar conocido en el universo donde existe vida. Con una edad de aproximadamente 4.54 mil millones de años, la Tierra ha experimentado cambios significativos a lo largo de su historia. Su superficie está cubierta en un 71% por agua, lo que le da su característico color azul cuando se ve desde el espacio. La atmósfera rica en oxígeno, la presencia de agua líquida y su distancia ideal del Sol han creado las condiciones perfectas para el desarrollo de una biodiversidad extraordinaria."
                : "Earth is the third planet from the Sun and the only known place in the universe where life exists. With an age of approximately 4.54 billion years, Earth has experienced significant changes throughout its history. Its surface is covered by 71% water, giving it its characteristic blue color when viewed from space. The oxygen-rich atmosphere, the presence of liquid water, and its ideal distance from the Sun have created the perfect conditions for the development of extraordinary biodiversity."}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Diámetro" : "Diameter"}</p>
                <p className="font-medium">12,742 km</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Distancia del Sol" : "Distance from Sun"}</p>
                <p className="font-medium">149.6 {language === "es" ? "millones de km" : "million km"}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Período Orbital" : "Orbital Period"}</p>
                <p className="font-medium">365.25 {language === "es" ? "días" : "days"}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{language === "es" ? "Período de Rotación" : "Rotation Period"}</p>
                <p className="font-medium">23.93 {language === "es" ? "horas" : "hours"}</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="font-space">{t("planets.overview")}</TabsTrigger>
            <TabsTrigger value="characteristics" className="font-space">{t("planets.characteristics")}</TabsTrigger>
            <TabsTrigger value="life" className="font-space">{language === "es" ? "Vida" : "Life"}</TabsTrigger>
            <TabsTrigger value="facts" className="font-space">{t("planets.facts")}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <p>
                  {language === "es"
                    ? "La Tierra es el tercer planeta desde el Sol y el quinto más grande del Sistema Solar. Es el único cuerpo astronómico conocido que alberga vida. Aproximadamente el 71% de la superficie de la Tierra está cubierta de agua, con océanos que constituyen la mayor parte de esta cobertura. El 29% restante es tierra que contiene continentes e islas. Gran parte de la superficie terrestre es habitable, con el agua dulce de los ríos, lagos y acuíferos siendo esencial para la vida humana y otras formas de vida terrestre."
                    : "Earth is the third planet from the Sun and the fifth largest in the Solar System. It is the only astronomical body known to harbor life. Approximately 71% of Earth's surface is covered with water, with oceans constituting most of this coverage. The remaining 29% is land containing continents and islands. Much of Earth's land surface is habitable, with freshwater from rivers, lakes, and aquifers being essential for human life and other terrestrial lifeforms."}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PlanetComparisonChart data={comparisonData} />
              <PlanetCompositionChart planetName={language === "es" ? "Tierra" : "Earth"} data={compositionData} />
            </div>
          </TabsContent>

          <TabsContent value="characteristics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <EarthTemperatureChart />
              <EarthAtmosphereChart />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-space">{t("planets.atmosphere")}</h3>
                  <p>
                    {language === "es"
                      ? "La atmósfera de la Tierra está compuesta principalmente de nitrógeno (78%) y oxígeno (21%), con trazas de otros gases como argón, dióxido de carbono y vapor de agua. Esta composición es única en el Sistema Solar y ha sido modificada significativamente por procesos biológicos a lo largo de miles de millones de años. La atmósfera protege la vida en la Tierra al filtrar la radiación ultravioleta del Sol, al regular la temperatura a través del efecto invernadero, y al reducir las variaciones extremas de temperatura entre el día y la noche."
                      : "Earth's atmosphere is composed primarily of nitrogen (78%) and oxygen (21%), with traces of other gases such as argon, carbon dioxide, and water vapor. This composition is unique in the Solar System and has been significantly modified by biological processes over billions of years. The atmosphere protects life on Earth by filtering out ultraviolet solar radiation, warming the surface through the greenhouse effect, and reducing temperature extremes between day and night."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-space">{t("planets.surface")}</h3>
                  <p>
                    {language === "es"
                      ? "La superficie de la Tierra está dividida en continentes e islas, rodeados por océanos. Los procesos geológicos como la tectónica de placas, la erosión y la actividad volcánica han dado forma a la superficie a lo largo del tiempo, creando montañas, valles, llanuras y otras formaciones. La Tierra es geológicamente activa, con más de 1,500 volcanes activos y frecuentes terremotos causados por el movimiento de las placas tectónicas. La superficie terrestre alberga una gran diversidad de ecosistemas, desde desiertos y selvas tropicales hasta tundras árticas."
                      : "Earth's surface is divided into continents and islands, surrounded by oceans. Geological processes such as plate tectonics, erosion, and volcanic activity have shaped the surface over time, creating mountains, valleys, plains, and other formations. Earth is geologically active, with over 1,500 active volcanoes and frequent earthquakes caused by the movement of tectonic plates. The land surface hosts a great diversity of ecosystems, from deserts and tropical rainforests to arctic tundras."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-space">{language === "es" ? "Hidrósfera" : "Hydrosphere"}</h3>
                  <p>
                    {language === "es"
                      ? "La hidrósfera de la Tierra incluye todos los cuerpos de agua líquida, hielo y vapor de agua. Los océanos contienen el 97% del agua de la Tierra, mientras que el agua dulce representa solo el 3%, la mayor parte en forma de hielo en los glaciares y casquetes polares. Los océanos juegan un papel crucial en la regulación del clima, absorbiendo y distribuyendo el calor alrededor del planeta a través de corrientes oceánicas. El ciclo del agua, que incluye la evaporación, la condensación, la precipitación y la escorrentía, es fundamental para mantener la vida en la Tierra."
                      : "Earth's hydrosphere includes all bodies of liquid water, ice, and water vapor. The oceans contain 97% of Earth's water, while freshwater accounts for only 3%, mostly in the form of ice in glaciers and ice caps. The oceans play a crucial role in regulating climate by absorbing and distributing heat around the planet through ocean currents. The water cycle, which includes evaporation, condensation, precipitation, and runoff, is essential for sustaining life on Earth."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-space">{t("planets.orbit")}</h3>
                  <p>
                    {language === "es"
                      ? "La Tierra orbita alrededor del Sol a una distancia promedio de 149.6 millones de kilómetros, completando una órbita cada 365.25 días. Su eje de rotación está inclinado 23.5 grados respecto al plano orbital, lo que causa las estaciones al cambiar la cantidad de luz solar que reciben diferentes partes del planeta a lo largo del año. La Tierra gira sobre su eje una vez cada 23.93 horas, creando el ciclo del día y la noche. La Luna, el único satélite natural de la Tierra, orbita a una distancia promedio de 384,400 km y es responsable de las mareas oceánicas."
                      : "Earth orbits the Sun at an average distance of 149.6 million kilometers, completing one orbit every 365.25 days. Its rotation axis is tilted 23.5 degrees from the orbital plane, causing seasons by changing the amount of sunlight different parts of the planet receive throughout the year. Earth rotates on its axis once every 23.93 hours, creating the day-night cycle. The Moon, Earth's only natural satellite, orbits at an average distance of 384,400 km and is responsible for ocean tides."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="life" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <EarthBiodiversityChart />
              <EarthTimelineChart />
            </div>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 font-space">
                  {language === "es" ? "El Único Planeta con Vida Conocida" : "The Only Planet with Known Life"}
                </h3>
                <p className="mb-4">
                  {language === "es"
                    ? "La Tierra es el único planeta conocido que alberga vida, con una biodiversidad extraordinaria que ha evolucionado durante más de 3.5 mil millones de años."
                    : "Earth is the only known planet that harbors life, with extraordinary biodiversity that has evolved over more than 3.5 billion years."}
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium font-space">{language === "es" ? "Origen de la vida" : "Origin of Life"}</span> -
                    {language === "es"
                      ? " Las primeras formas de vida aparecieron hace aproximadamente 3.5-4 mil millones de años, probablemente en ambientes acuáticos como fuentes hidrotermales."
                      : " The first life forms appeared approximately 3.5-4 billion years ago, likely in aquatic environments such as hydrothermal vents."}
                  </li>
                  <li>
                    <span className="font-medium font-space">{language === "es" ? "Evolución" : "Evolution"}</span> -
                    {language === "es"
                      ? " La vida ha evolucionado de formas simples unicelulares a organismos multicelulares complejos a través de la selección natural y otros procesos evolutivos."
                      : " Life has evolved from simple unicellular forms to complex multicellular organisms through natural selection and other evolutionary processes."}
                  </li>
                  <li>
                    <span className="font-medium font-space">{language === "es" ? "Biodiversidad" : "Biodiversity"}</span> -
                    {language === "es"
                      ? " Se han identificado más de 2 millones de especies, pero los científicos estiman que podría haber entre 8 y 20 millones de especies en total."
                      : " Over 2 million species have been identified, but scientists estimate there might be between 8 and 20 million species in total."}
                  </li>
                  <li>
                    <span className="font-medium font-space">{language === "es" ? "Ecosistemas" : "Ecosystems"}</span> -
                    {language === "es"
                      ? " La Tierra alberga una variedad de ecosistemas, desde los océanos profundos hasta las montañas más altas, cada uno con su propia comunidad de organismos adaptados."
                      : " Earth hosts a variety of ecosystems, from deep oceans to high mountains, each with its own community of adapted organisms."}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 font-space">
                  {language === "es" ? "Impacto Humano" : "Human Impact"}
                </h3>
                <p className="mb-4">
                  {language === "es"
                    ? "Los humanos modernos (Homo sapiens) aparecieron hace aproximadamente 300,000 años y han tenido un impacto profundo en el planeta, especialmente en los últimos siglos."
                    : "Modern humans (Homo sapiens) appeared approximately 300,000 years ago and have had a profound impact on the planet, especially in recent centuries."}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-blue-300 mb-2 font-space">{language === "es" ? "Cambio Climático" : "Climate Change"}</h4>
                    <p className="text-sm text-zinc-400">
                      {language === "es"
                        ? "Las actividades humanas, principalmente la quema de combustibles fósiles, han aumentado significativamente los niveles de gases de efecto invernadero en la atmósfera, provocando el calentamiento global y el cambio climático."
                        : "Human activities, primarily burning fossil fuels, have significantly increased greenhouse gas levels in the atmosphere, causing global warming and climate change."}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-300 mb-2 font-space">{language === "es" ? "Pérdida de Biodiversidad" : "Biodiversity Loss"}</h4>
                    <p className="text-sm text-zinc-400">
                      {language === "es"
                        ? "La deforestación, la contaminación, la sobreexplotación y el cambio climático están provocando una extinción masiva de especies, con tasas de extinción entre 100 y 1,000 veces superiores a las tasas naturales."
                        : "Deforestation, pollution, overexploitation, and climate change are causing a mass extinction of species, with extinction rates 100 to 1,000 times higher than natural rates."}
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
                  <h3 className="text-xl font-bold mb-2 text-blue-300 font-space">
                    {language === "es" ? "Planeta Dinámico" : "Dynamic Planet"}
                  </h3>
                  <p className="text-zinc-400">
                    {language === "es"
                      ? "La superficie de la Tierra está en constante cambio debido a la tectónica de placas. Cada año, los continentes se desplazan aproximadamente la misma velocidad a la que crecen las uñas humanas."
                      : "Earth's surface is constantly changing due to plate tectonics. Each year, the continents drift at approximately the same rate as human fingernails grow."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2 text-blue-300 font-space">
                    {language === "es" ? "Campo Magnético Protector" : "Protective Magnetic Field"}
                  </h3>
                  <p className="text-zinc-400">
                    {language === "es"
                      ? "El núcleo de hierro fundido de la Tierra genera un campo magnético que protege al planeta de las partículas solares dañinas. Sin este escudo, la atmósfera podría ser despojada gradualmente, como ocurrió en Marte."
                      : "Earth's molten iron core generates a magnetic field that shields the planet from harmful solar particles. Without this shield, the atmosphere could be gradually stripped away, as happened on Mars."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2 text-blue-300 font-space">
                    {language === "es" ? "Agua Preciosa" : "Precious Water"}
                  </h3>
                  <p className="text-zinc-400">
                    {language === "es"
                      ? "Aunque el 71% de la Tierra está cubierta de agua, solo el 2.5% es agua dulce, y de esa cantidad, solo el 0.3% está disponible en ríos, lagos y acuíferos accesibles para el uso humano."
                      : "Although 71% of Earth is covered with water, only 2.5% is freshwater, and of that amount, only 0.3% is available in rivers, lakes, and accessible aquifers for human use."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2 text-blue-300 font-space">
                    {language === "es" ? "Punto Azul Pálido" : "Pale Blue Dot"}
                  </h3>
                  <p className="text-zinc-400">
                    {language === "es"
                      ? "En 1990, la sonda Voyager 1 tomó una famosa fotografía de la Tierra desde 6 mil millones de kilómetros de distancia. En esta imagen, nuestro planeta aparece como un diminuto punto azul pálido en la inmensidad del espacio."
                      : "In 1990, the Voyager 1 probe took a famous photograph of Earth from 6 billion kilometers away. In this image, our planet appears as a tiny pale blue dot in the vastness of space."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2 text-blue-300 font-space">
                    {language === "es" ? "Oxígeno Biológico" : "Biological Oxygen"}
                  </h3>
                  <p className="text-zinc-400">
                    {language === "es"
                      ? "El oxígeno de nuestra atmósfera es principalmente el resultado de la fotosíntesis realizada por cianobacterias y plantas a lo largo de miles de millones de años. Antes de esto, la atmósfera terrestre tenía muy poco oxígeno libre."
                      : "The oxygen in our atmosphere is primarily the result of photosynthesis performed by cyanobacteria and plants over billions of years. Before this, Earth's atmosphere had very little free oxygen."}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2 text-blue-300 font-space">
                    {language === "es" ? "Ciclo del Carbono" : "Carbon Cycle"}
                  </h3>
                  <p className="text-zinc-400">
                    {language === "es"
                      ? "El ciclo del carbono de la Tierra ha mantenido las temperaturas planetarias relativamente estables durante millones de años. Los océanos absorben aproximadamente el 30% del CO₂ emitido por actividades humanas, ayudando a mitigar el cambio climático."
                      : "Earth's carbon cycle has kept planetary temperatures relatively stable for millions of years. The oceans absorb approximately 30% of CO₂ emitted by human activities, helping to mitigate climate change."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
} 