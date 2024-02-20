import { CropSquare } from "@mui/icons-material";
import { Divider } from "@mui/material";
import clsx from "clsx";
import { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { useMobileContext } from "../../utils/useMobileContext";
import { LogoutButton } from "./LogoutButton";

interface ModelBasicInfos {
  type: "model";
  model: string;
  label: string;
  labelPluralized: string;
  isHidden: boolean;
}

type AdominView = ModelBasicInfos;

type AdminUser = Record<string, unknown>;

export interface AdominConfig {
  title: string;
  footerText: string;
  views: AdominView[];
  userDisplayKey: string;
  user: AdminUser;
}

export interface SidebarProps extends Pick<AdominConfig, "views" | "title"> {
  currentView?: string;
}

export const Sidebar = ({ views, title, currentView }: SidebarProps) => {
  const { setShowMenu } = useMobileContext();
  const viewsToShow = useMemo(
    () =>
      views.filter((view) => {
        if (view.type !== "model") return false;

        return !view.isHidden;
      }),
    [views]
  );

  if (currentView === undefined && viewsToShow.length > 0) {
    return <Navigate to={`/adomin/${viewsToShow[0].model}`} />;
  }

  return (
    <div className="bg-adomin_1 w-[300px] select-none flex flex-col">
      <h1 className="text-center text-2xl text-white mt-4">{title}</h1>
      <h2 className="text-center text-l text-adomin_2 mb-2">Back-office</h2>

      <div onClick={() => setShowMenu(false)}>
        {viewsToShow.map(({ label, model: modelName }) => (
          <Link to={`/adomin/${modelName}`} key={modelName}>
            <div className="flex items-center w-full p-4">
              <CropSquare
                className={clsx({
                  "text-adomin_3": true,
                  "text-white": modelName === currentView,
                })}
              />
              <p
                className={clsx({
                  "flex-1 ml-2 text-adomin_2 hover:text-white": true,
                  "text-white": modelName === currentView,
                })}
              >
                {label}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Divider />
      <div className="mt-auto">
        <LogoutButton />
      </div>
    </div>
  );
};
