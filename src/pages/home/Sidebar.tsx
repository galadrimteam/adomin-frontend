import { CropSquare } from "@mui/icons-material";
import { Divider } from "@mui/material";
import clsx from "clsx";
import { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";

interface ModelBasicInfos {
  model: string;
  label: string;
  labelPluralized: string;
  isHidden: boolean;
}

type AdminUser = Record<string, unknown>;

export interface AdominConfig {
  title: string;
  footerText: string;
  models: ModelBasicInfos[];
  userDisplayKey: string;
  user: AdminUser;
}

interface SidebarProps extends Pick<AdominConfig, "models" | "title"> {
  currentModel?: string;
}

export const Sidebar = ({ models, title, currentModel }: SidebarProps) => {
  const modelsToShow = useMemo(
    () => models.filter((model) => !model.isHidden),
    [models]
  );

  if (currentModel === undefined && models.length > 0) {
    return <Navigate to={`/adomin/${models[0].model}`} />;
  }

  return (
    <div className="bg-adomin_1 w-[300px] select-none flex flex-col">
      <h1 className="text-center text-2xl text-white mt-4">{title}</h1>
      <h2 className="text-center text-l text-adomin_2 mb-2">Back-office</h2>

      {modelsToShow.map(({ label, model: modelName }) => (
        <Link to={`/adomin/${modelName}`} key={modelName}>
          <div className="flex items-center w-full p-4">
            <CropSquare
              className={clsx({
                "text-adomin_3": true,
                "text-white": modelName === currentModel,
              })}
            />
            <p
              className={clsx({
                "flex-1 ml-2 text-adomin_2 hover:text-white": true,
                "text-white": modelName === currentModel,
              })}
            >
              {label}
            </p>
          </div>
        </Link>
      ))}
      <Divider />
      <div className="mt-auto">
        <LogoutButton />
      </div>
    </div>
  );
};
