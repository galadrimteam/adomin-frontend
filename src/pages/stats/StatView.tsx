import { useMemo } from "react";
import { PageHeading } from "../../components/PageHeading";
import { useIsSmallScreen } from "../../utils/useIsSmallScreen";
import { AdominStatRenderer } from "./AdominStatRenderer";
import { FullStatViewConfig } from "./stat.types";
import { useStatConfig } from "./StatConfigContext";
import { StatViewGlobalFilters } from "./StatViewGlobalFilters";
import { useGlobalFiltersData } from "./useGlobalFiltersData";

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

export const StatView = ({ viewName }: { viewName: string }) => {
  const statConfig = useStatConfig();
  const isSmallScreen = useIsSmallScreen();
  const {
    globalFiltersData,
    setGlobalFiltersData,
    globalFiltersDefaultValues,
  } = useGlobalFiltersData(statConfig.globalFilters);

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

  const gridTemplateColumns = useMemo(() => {
    const firstLine = gridTemplateAreas.trim().split("\n")[0];
    const columns = firstLine
      .split(" ")
      .map(() => "1fr")
      .join(" ");

    return columns;
  }, [gridTemplateAreas]);

  return (
    <div className="flex w-full flex-col p-4">
      <PageHeading text={statConfig.label} />
      <div className="flex justify-center flex-col">
        {statConfig.globalFilters && (
          <StatViewGlobalFilters
            globalFilters={statConfig.globalFilters}
            globalFiltersDefaultValues={globalFiltersDefaultValues}
            globalFiltersData={globalFiltersData}
            setGlobalFiltersData={setGlobalFiltersData}
            isLoading={false}
          />
        )}
        <div
          className="grid gap-4"
          style={{
            gridTemplateAreas,
            gridTemplateColumns,
          }}
        >
          {statConfig.stats.map((stat) => (
            <AdominStatRenderer
              key={stat.name}
              stat={stat}
              viewName={viewName}
              globalFilters={statConfig.globalFilters}
              globalFiltersData={globalFiltersData}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
