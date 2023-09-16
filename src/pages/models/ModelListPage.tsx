import { CenteredSpinner } from "../../components/CenteredSpinner";
import { PageHeading } from "../../components/PageHeading";
import { ModelGrid } from "./ModelGrid";
import { useModelConfigData } from "./useModelConfigData";

const ModelListPage = () => {
  const modelConfig = useModelConfigData();

  if (!modelConfig) return <CenteredSpinner />;

  return (
    <div className="flex w-full flex-col">
      <PageHeading text={modelConfig.labelPluralized} />
      <div className="flex-1">
        <ModelGrid modelConfig={modelConfig} />
      </div>
    </div>
  );
};

export default ModelListPage;
