import { Alert } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { PageHeading } from "../../components/PageHeading";
import { useConfigQuery } from "../home/useConfigQuery";
import { findFolderConfig } from "./findFolderConfig";

const FoldersPage = () => {
  const { view } = useParams();
  const configQuery = useConfigQuery();

  if (!view) {
    return (
      <Alert severity="error">Problème lors de la séléction de la vue</Alert>
    );
  }

  const foundFolder = findFolderConfig(configQuery.data?.views ?? [], view);

  if (!foundFolder) {
    return <Alert severity="error">Dossier inconnu</Alert>;
  }

  return (
    <div className="w-full flex flex-col bg-blue-50 overflow-hidden">
      <div className="flex-1 ">
        <div className="flex w-full flex-col">
          <PageHeading text={foundFolder?.label} />
          <div className="flex justify-center items-center my-8 flex-col">
            {foundFolder.views.map((v) => (
              <Link key={v.fullPath} to={v.fullPath}>
                <div className="flex items-center w-full p-4">
                  <p className="flex-1 ml-2 hover:text-adomin_2">{v.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-adomin_4 text-adomin_2 p-2">
        {configQuery.data?.footerText ?? "Loading footer text..."}
      </div>
    </div>
  );
};

export default FoldersPage;
