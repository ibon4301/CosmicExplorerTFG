"use client";

import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";

export default function VenusTemperatureChart() {
  const { language, t } = useLanguage();
  
  const data = [
    {
      location: language === "es" ? "Venus (día)" : "Venus (day)",
      temperatura: 462,
      color: "hsl(30, 70%, 50%)"
    },
    {
      location: language === "es" ? "Venus (noche)" : "Venus (night)",
      temperatura: 440,
      color: "hsl(30, 70%, 30%)"
    },
    {
      location: language === "es" ? "Tierra (máx)" : "Earth (max)",
      temperatura: 58,
      color: "hsl(200, 70%, 50%)"
    },
    {
      location: language === "es" ? "Mercurio (día)" : "Mercury (day)",
      temperatura: 430,
      color: "hsl(15, 70%, 50%)"
    }
  ];

  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-amber-300 font-space">
          {t("venus.temperatureChart.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveBar
            data={data}
            keys={["temperatura"]}
            indexBy="location"
            margin={{ top: 10, right: 20, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            colors={({ data }) => data.color}
            borderRadius={4}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: t("venus.temperatureChart.xAxis"),
              legendPosition: "middle",
              legendOffset: 40,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: t("venus.temperatureChart.yAxis"),
              legendPosition: "middle",
              legendOffset: -50,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 3]],
            }}
            legends={[]}
            theme={{
              text: {
                fill: "#94a3b8",
              },
              axis: {
                ticks: {
                  line: {
                    stroke: "#475569",
                  },
                  text: {
                    fill: "#94a3b8",
                  },
                },
                legend: {
                  text: {
                    fill: "#e2e8f0",
                  },
                },
              },
              grid: {
                line: {
                  stroke: "#334155",
                },
              },
              tooltip: {
                container: {
                  background: "#1e293b",
                  color: "#fff",
                  fontSize: "13px",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                }
              }
            }}
            tooltip={({ id, value, indexValue, color }) => (
              <div
                style={{
                  background: "#1e293b",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                }}
              >
                <strong style={{ color }}>{t("venus.temperatureChart.yAxis")}</strong> - {indexValue}: <strong>{value}</strong>
              </div>
            )}
            role="application"
            ariaLabel={language === "es" ? "Comparación de temperatura de Venus" : "Venus temperature comparison"}
            barAriaLabel={(e) =>
              `${e.id}: ${e.formattedValue} ${language === "es" ? "grados Celsius" : "degrees Celsius"}`
            }
          />
        </div>
        <p className="text-sm text-zinc-400 mt-4">
          {t("venus.temperatureChart.description")}
        </p>
      </CardContent>
    </Card>
  );
} 