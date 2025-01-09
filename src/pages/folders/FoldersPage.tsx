import { Alert } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import { PageHeading } from "../../components/PageHeading";
import { getViewPath } from "../../utils/get_view_path";
import { AdominPageLayout } from "../AdominPageLayout";
import { deepFilterHiddenViews } from "../home/deepFilterHiddenViews";
import { useConfigQuery } from "../home/useConfigQuery";
import { findFolderConfig } from "./findFolderConfig";

const FoldersPage = () => {
  const { view } = useParams();
  const configQuery = useConfigQuery();
  const foundFolder = findFolderConfig(configQuery.data?.views ?? [], view!);

  if (!foundFolder) {
    return (
      <AdominPageLayout>
        <PageHeading text={`Dossier ${view}`} />
        <div className="flex items-center my-8 flex-col">
          <Alert severity="error">Dossier inconnu</Alert>
        </div>
      </AdominPageLayout>
    );
  }

  const folderViews = deepFilterHiddenViews(foundFolder.views);
  // Find the first view that is not a folder
  const viewToRender = folderViews.find((v) => v.type !== "folder");
  // If there is no view to render, just render the first view (which is a folder or there are no views at all)
  const finalView = viewToRender ?? folderViews.find(() => true);

  if (finalView) {
    const finalViewPath = getViewPath(finalView);

    return <Navigate to={finalViewPath} />;
  }

  return (
    <AdominPageLayout>
      <PageHeading text={foundFolder?.label} />
      <div className="flex items-center my-8 flex-col">
        <Alert severity="warning">Ce dossier est vide</Alert>
      </div>
    </AdominPageLayout>
  );
};

export default FoldersPage;
