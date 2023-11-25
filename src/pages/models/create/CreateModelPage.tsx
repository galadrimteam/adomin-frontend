import { PageHeading } from "../../../components/PageHeading";
import { useModelConfig } from "../ModelConfigContext";
import { CreateModelForm } from "./CreateModelForm";

const CreateModelPage = () => {
  const modelConfig = useModelConfig();

  return (
    <div className="flex w-full flex-col">
      <PageHeading text={modelConfig.label + " création"} />
      <div className="flex justify-center">
        <CreateModelForm modelConfig={modelConfig} />
      </div>
    </div>
  );
};

export default CreateModelPage;
