import { useMemo } from "react";
import {
  AreaChart,
  BarChart,
  ColumnChart,
  LineChart,
  PieChart,
} from "react-chartkick";
import { PageHeading } from "../../components/PageHeading";
import { useIsSmallScreen } from "../../utils/useIsSmallScreen";
import { KpiStatView } from "./KpiStatView";
import { useStatConfig } from "./StatConfigContext";
import { AdominStat, FullStatViewConfig } from "./stat.types";

const getGridTemplateArea = (
  gridTemplate: FullStatViewConfig["gridTemplateAreas"],
  mode: "normal" | "sm",
  fallback: string
) => {
  if (typeof gridTemplate === "string") {
    return gridTemplate;
  }

  if (typeof gridTemplate === "object") {
    return gridTemplate[mode];
  }

  return fallback;
};

const StatRenderer = ({ stat }: { stat: AdominStat }) => {
  if (stat.type === "pie") {
    return <PieChart data={stat.data} {...stat.options} />;
  }

  if (stat.type === "bar") {
    return <BarChart data={stat.data} {...stat.options} />;
  }

  if (stat.type === "line") {
    return <LineChart data={stat.data} {...stat.options} />;
  }

  if (stat.type === "column") {
    return <ColumnChart data={stat.data} {...stat.options} />;
  }

  if (stat.type === "area") {
    return <AreaChart data={stat.data} {...stat.options} />;
  }

  return null;
};

export const StatView = () => {
  const statConfig = useStatConfig();
  const isSmallScreen = useIsSmallScreen();

  const fallbackTemplate = useMemo(
    () => `${statConfig.stats.map((s) => `"${s.name}"`).join("\n")}`,
    [statConfig.stats]
  );

  const gridTemplateAreas = useMemo(() => {
    const mode = isSmallScreen ? "sm" : "normal";

    return getGridTemplateArea(
      statConfig.gridTemplateAreas,
      mode,
      fallbackTemplate
    );
  }, [isSmallScreen, statConfig.gridTemplateAreas, fallbackTemplate]);

  return (
    <div className="flex w-full flex-col">
      <PageHeading text={statConfig.label} />
      <div className="flex justify-center flex-col">
        <div
          className="grid gap-4"
          style={{
            gridTemplateAreas,
          }}
        >
          {statConfig.stats.map((stat) => (
            <div
              key={stat.name}
              className="my-8"
              style={{ gridArea: stat.name }}
            >
              {stat.type === "kpi" ? (
                <KpiStatView stat={stat} />
              ) : (
                <>
                  <h2 className="text-center text-2xl my-4">{stat.label}</h2>
                  <StatRenderer stat={stat} />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
