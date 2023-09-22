import { useNavigate, useParams } from "react-router-dom";
import { CenteredSpinner } from "../../../components/CenteredSpinner";
import { PageHeading } from "../../../components/PageHeading";
import { useModelConfigData } from "../useModelConfigData";
import { CreateModelForm } from "./CreateModelForm";

const CreateModelPage = () => {
  const { model } = useParams<{
    model: string;
  }>();

  const modelConfig = useModelConfigData();
  const navigate = useNavigate();

  if (!model) {
    navigate("/");
    throw new Error("Problème lors de la séléction du Model");
  }

  if (!modelConfig) {
    return <CenteredSpinner />;
  }

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
