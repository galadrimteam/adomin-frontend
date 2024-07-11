import { Alert } from "@mui/material";
import { CenteredSpinner } from "../../../components/CenteredSpinner";
import { CmsLayout } from "../CmsLayout";
import { useCmsConfig } from "../utils/useCmsConfig";
import { CreateOrUpdateCmsPage } from "./CreateOrUpdateCmsPage";

const CreateCmsPage = () => {
  const cmsConfig = useCmsConfig();

  if (cmsConfig.isLoading) {
    return <CenteredSpinner />;
  }

  if (!cmsConfig.data || cmsConfig.isError) {
    return <Alert severity="error">Erreur lors du chargement de la page</Alert>;
  }

  return (
    <CmsLayout heading="Création de page">
      <div className="flex justify-center">
        <CreateOrUpdateCmsPage cmsConfig={cmsConfig.data} />
      </div>
    </CmsLayout>
  );
};

export default CreateCmsPage;
