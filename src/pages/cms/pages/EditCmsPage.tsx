import { Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { CenteredSpinner } from "../../../components/CenteredSpinner";
import { CmsLayout } from "../CmsLayout";
import { useCmsConfig } from "../utils/useCmsConfig";
import { CreateOrUpdateCmsPage } from "./CreateOrUpdateCmsPage";
import { useShowPageQuery } from "./hooks/useShowPageQuery";

const EditCmsPage = () => {
  const { cmsPageId } = useParams();

  const cmsConfig = useCmsConfig();

  if (!cmsPageId) {
    throw new Error("Identifiant (primary key) du model manquant");
  }

  const cmsPageQuery = useShowPageQuery(cmsPageId);

  if (cmsPageQuery.isLoading || cmsConfig.isLoading) {
    return <CenteredSpinner />;
  }

  if (
    !cmsPageQuery.data ||
    cmsPageQuery.isError ||
    !cmsConfig.data ||
    cmsConfig.isError
  ) {
    return <Alert severity="error">Erreur lors du chargement de la page</Alert>;
  }

  return (
    <CmsLayout heading="Edition de page">
      <div className="flex justify-center">
        <CreateOrUpdateCmsPage
          cmsConfig={cmsConfig.data}
          page={cmsPageQuery.data}
        />
      </div>
    </CmsLayout>
  );
};

export default EditCmsPage;
