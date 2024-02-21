import { Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { CenteredSpinner } from "../../components/CenteredSpinner";
import { PageHeading } from "../../components/PageHeading";
import { _assert } from "../../utils/assertions";
import { useConfigQuery } from "../home/useConfigQuery";
import { StatConfigContext, useStatConfig } from "./StatConfigContext";
import { FullStatViewConfig } from "./stat.types";
import { useStatConfigQuery } from "./useStatConfigQuery";

const StatViewContent = ({
  statConfig,
}: {
  statConfig: FullStatViewConfig;
}) => {
  _assert(statConfig, "TODO");
  return null;
};

const StatView = () => {
  const statConfig = useStatConfig();

  return (
    <div className="flex w-full flex-col">
      <PageHeading text={statConfig.label} />
      <div className="flex-1">
        <StatViewContent statConfig={statConfig} />
      </div>
    </div>
  );
};

const StatsPage = () => {
  const { view } = useParams();
  const configQuery = useConfigQuery();
  const navigate = useNavigate();

  if (!view) {
    navigate("/");
    throw new Error("Problème lors de la séléction de la vue");
  }

  const statQuery = useStatConfigQuery(view);

  if (statQuery.isLoading) {
    return <CenteredSpinner />;
  }

  if (!statQuery.data || statQuery.isError) {
    return (
      <Alert severity="error">
        Erreur lors du chargement de la config de la vue
      </Alert>
    );
  }

  return (
    <div className="w-full flex flex-col bg-blue-50 overflow-hidden">
      <div className="flex-1 ">
        <StatConfigContext.Provider value={statQuery.data}>
          <StatView />
        </StatConfigContext.Provider>
      </div>
      <div className="bg-adomin_4 text-adomin_2 p-2">
        {configQuery.data?.footerText ?? "Loading footer text..."}
      </div>
    </div>
  );
};

export default StatsPage;
