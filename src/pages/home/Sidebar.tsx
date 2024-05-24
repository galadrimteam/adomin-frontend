import { Divider } from "@mui/material";
import clsx from "clsx";
import { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { AdominConfig, getFirstLink } from "../../utils/adominConfig";
import type { ApiAdominView } from "../../utils/api_views.type";
import { useMobileContext } from "../../utils/useMobileContext";
import { LogoutButton } from "./LogoutButton";
import { SidebarIcon } from "./SidebarIcon";

const AdominViewLink = ({
  view,
  currentView,
}: {
  view: ApiAdominView;
  currentView?: string;
}) => {
  const viewName = view.name;

  return (
    <Link to={view.fullPath}>
      <div className={clsx("flex items-center w-full p-4")}>
        <SidebarIcon
          iconKey={view.type === "stats" ? "User" : "ff"}
          className={clsx(
            "text-adomin_3",
            viewName === currentView && "text-white"
          )}
        />
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
            key={view.fullPath}
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
