import { PageHeading } from "../../../components/PageHeading";
import { useModelConfig } from "../ModelConfigContext";
import { ModelGrid } from "./ModelGrid";

const ModelListPage = () => {
  const modelConfig = useModelConfig();

  return (
    <div className="flex w-full flex-col p-4">
      <PageHeading text={modelConfig.labelPluralized} />
      <div className="flex-1">
        <ModelGrid modelConfig={modelConfig} />
      </div>
    </div>
  );
};

export default ModelListPage;
