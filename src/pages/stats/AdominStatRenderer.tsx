import { ArrowDownward } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  AreaChart,
  BarChart,
  ColumnChart,
  LineChart,
  PieChart,
} from "react-chartkick";
import { privateAxiosWithoutToasts } from "../../axios/privateAxios";
import { getFormDataForStatFilters } from "../../utils/getFormData";
import { getModelDefaultValues } from "../models/create/defaultValues/getModelDefaultValues";
import { ModelData } from "../models/model.types";
import { FilterStatForm } from "./FilterStatForm";
import { KpiStatView } from "./KpiStatView";
import { AdominStat, ApiStatFilters, ChartkickRowData } from "./stat.types";

const StatRenderer = ({
  stat,
  data,
}: {
  stat: AdominStat;
  data: ChartkickRowData;
}) => {
  if (stat.type === "pie") {
    return <PieChart data={data} {...stat.options} />;
  }

  if (stat.type === "bar") {
    return <BarChart data={data} {...stat.options} />;
  }

  if (stat.type === "line") {
    return <LineChart data={data} {...stat.options} />;
  }

  if (stat.type === "column") {
    return <ColumnChart data={data} {...stat.options} />;
  }

  if (stat.type === "area") {
    return <AreaChart data={data} {...stat.options} />;
  }

  return null;
};

export const AdominStatRenderer = ({
  stat,
  viewName,
  globalFilters,
  globalFiltersData,
}: {
  stat: AdominStat;
  viewName: string;
  globalFiltersData: ModelData;
  globalFilters: ApiStatFilters | undefined;
}) => {
  const defaultValues = useMemo(() => {
    const fields = Object.entries(stat.filters ?? {}).map(([key, value]) => ({
      name: key,
      adomin: value,
    }));

    return getModelDefaultValues({ fields });
  }, [stat.filters]);
  const [filtersData, setFiltersData] = useState(defaultValues);
  const dataQuery = useQuery({
    queryKey: ["stat", stat.name, globalFiltersData, filtersData],
    queryFn: async () => {
      const formData = getFormDataForStatFilters(
        filtersData,
        stat.filters ?? {}
      );
      const globalFiltersFormData = getFormDataForStatFilters(
        globalFiltersData,
        globalFilters ?? {}
      );

      for (const [key, value] of globalFiltersFormData.entries()) {
        formData.append(key, value);
      }

      const res = await privateAxiosWithoutToasts.post(
        `/adomin/api/stats/${viewName}/${stat.name}`,
        formData
      );

      return res.data;
    },
  });

  return (
    <div className="my-8" style={{ gridArea: stat.name }}>
      {stat.filters && JSON.stringify(stat.filters) !== "{}" && (
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDownward />}>
            <Typography component="span">Filtres</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FilterStatForm
              isLoading={dataQuery.isLoading}
              startSearch={(data) => {
                setFiltersData(data);
              }}
              statFilters={stat.filters ?? {}}
              defaultValues={defaultValues}
            />
          </AccordionDetails>
        </Accordion>
      )}
      {stat.type === "kpi" ? (
        <KpiStatView stat={stat} data={dataQuery.data ?? ""} />
      ) : (
        <>
          <h2 className="text-center text-2xl my-4">{stat.label}</h2>
          <StatRenderer stat={stat} data={dataQuery.data ?? []} />
        </>
      )}
    </div>
  );
};
