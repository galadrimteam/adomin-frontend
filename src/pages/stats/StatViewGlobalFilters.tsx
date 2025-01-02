import { ArrowDownward } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { FilterStatForm } from "./FilterStatForm";
import type { ApiStatFilters } from "./stat.types";
import { useGlobalFiltersData } from "./useGlobalFiltersData";

type Props = ReturnType<typeof useGlobalFiltersData> & {
  isLoading: boolean;
  globalFilters: ApiStatFilters;
};

export const StatViewGlobalFilters = ({
  setGlobalFiltersData,
  isLoading,
  globalFilters,
  globalFiltersDefaultValues,
}: Props) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDownward />}>
        <Typography component="span">Filtres globaux</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FilterStatForm
          isLoading={isLoading}
          startSearch={(data) => {
            setGlobalFiltersData(data);
          }}
          statFilters={globalFilters}
          defaultValues={globalFiltersDefaultValues}
        />
      </AccordionDetails>
    </Accordion>
  );
};
