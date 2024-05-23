import { Divider } from "@mui/material";
import clsx from "clsx";
import { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  AdominConfig,
  AdominView,
  getFirstLink,
  getViewPath,
} from "../../utils/adominConfig";
import { useMobileContext } from "../../utils/useMobileContext";
import { LogoutButton } from "./LogoutButton";

const AdominViewLink = ({
  view,
  currentView,
}: {
  view: AdominView;
  currentView?: string;
}) => {
  const viewName = view.type === "model" ? view.model : view.path;

  return (
    <Link to={getViewPath(view)}>
      <div className="flex items-center w-full p-4">
        {/* YOU MIGHT WANT TO PUT AN ICON HERE */}
        <p
          className={clsx({
            "flex-1 ml-2 text-adomin_2 hover:text-white": true,
            "text-white": viewName === currentView,
          })}
        >
          {view.label}
        </p>
      </div>
    </Link>
  );
};

export interface SidebarProps extends Pick<AdominConfig, "views" | "title"> {
  currentView?: string;
}

export const Sidebar = ({ views, title, currentView }: SidebarProps) => {
  const { setShowMenu } = useMobileContext();
  const viewsToShow = useMemo(
    () => views.filter((view) => !view.isHidden),
    [views]
  );

  const firstLink = useMemo(() => getFirstLink(viewsToShow), [viewsToShow]);

  if (currentView === undefined && viewsToShow.length > 0 && firstLink) {
    return <Navigate to={firstLink} />;
  }

  return (
    <div className="bg-adomin_1 w-[300px] select-none flex flex-col">
      <h1 className="text-center text-2xl text-white mt-4">{title}</h1>
      <h2 className="text-center text-l text-adomin_2 mb-2">Back-office</h2>

      <div onClick={() => setShowMenu(false)}>
        {viewsToShow.map((view) => (
          <AdominViewLink
            key={getViewPath(view)}
            view={view}
            currentView={currentView}
          />
        ))}
      </div>
      <Divider />
      <div className="mt-auto">
        <LogoutButton />
      </div>
    </div>
  );
};
