import { CropSquare } from "@mui/icons-material";
import clsx from "clsx";
import { Link, Navigate, useParams } from "react-router-dom";

export interface AdominConfig {
  title: string;
  models: { model: string; label: string }[];
}

export const Sidebar = ({ models, title }: AdominConfig) => {
  const { model: modelParam } = useParams();

  if (modelParam === undefined && models.length > 0) {
    return <Navigate to={`/adomin/${models[0].model}`} />;
  }

  return (
    <div className="bg-adomin_1 w-[300px] select-none">
      <h1 className="text-center text-2xl text-white mt-4">{title}</h1>
      <h2 className="text-center text-l text-adomin_2 mb-2">Back-office</h2>

      {models.map(({ label, model: modelName }) => (
        <Link to={`/adomin/${modelName}`} key={modelName}>
          <div className="flex items-center w-full p-4">
            <CropSquare
              className={clsx({
                "text-adomin_3": true,
                "text-white": modelName === modelParam,
              })}
            />
            <p
              className={clsx({
                "flex-1 ml-2 text-adomin_2 hover:text-white": true,
                "text-white": modelName === modelParam,
              })}
            >
              {label}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
