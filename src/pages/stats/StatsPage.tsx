import { Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { CenteredSpinner } from "../../components/CenteredSpinner";
import { PageHeading } from "../../components/PageHeading";
import { AdominPageLayout } from "../AdominPageLayout";
import { StatConfigContext } from "./StatConfigContext";
import { StatView } from "./StatView";
import { useStatConfigQuery } from "./useStatConfigQuery";

const StatsPage = () => {
  const { view } = useParams();
  const statQuery = useStatConfigQuery(view!);

  if (statQuery.isLoading) {
    return <CenteredSpinner />;
  }

  if (!statQuery.data || statQuery.isError || !view) {
    return (
      <AdominPageLayout>
        <PageHeading text={`Vue statistique ${view}`} />
        <div className="flex items-center my-8 flex-col">
          <Alert severity="error">Cette vue statistique n'existe pas</Alert>
        </div>
      </AdominPageLayout>
    );
  }

  return (
    <AdominPageLayout>
      <StatConfigContext.Provider value={statQuery.data}>
        <StatView viewName={view} />
      </StatConfigContext.Provider>
    </AdominPageLayout>
  );
};

export default StatsPage;
