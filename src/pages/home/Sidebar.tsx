import { Divider } from "@mui/material";
import clsx from "clsx";
import { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { getAdominRouterPath, simplePluralize } from "../../adominPaths";
import { FontIcon } from "../../components/FontIcon";
import { AdominConfig, getFirstLink } from "../../utils/adominConfig";
import type { ApiAdominView } from "../../utils/api_views.type";
import { useMobileContext } from "../../utils/useMobileContext";
import { LogoutButton } from "./LogoutButton";
import { deepFilterHiddenViews } from "./deepFilterHiddenViews";

const AdominViewLink = ({
  view,
  currentView,
  level = 0,
}: {
  view: ApiAdominView;
  currentView?: string;
  level?: number;
}) => {
  const viewName = view.name;
  const style = useMemo(() => {
    if (level === 0) return undefined;

    return { marginLeft: `${level * 20}px` };
  }, [level]);

  const viewPath = getAdominRouterPath({
    name: view.name,
    type: "list",
    viewType: simplePluralize(view.type),
  });

  return (
    <>
      <Link to={viewPath}>
        <div
          className={clsx(
            "flex items-center justify-center w-full p-4 text-adomin_2 text-xl hover:text-white",
            viewName === currentView && "text-white"
          )}
          style={style}
        >
          <p className="flex-1">
            {view.icon && <FontIcon iconName={view.icon} className={"mr-2"} />}
            {view.label}
          </p>
        </div>
      </Link>
      {view.type === "folder" &&
        view.views.map((v) => (
          <AdominViewLink
            key={v.name + v.type}
            view={v}
            currentView={currentView}
            level={level + 1}
          />
        ))}
    </>
  );
};

export interface SidebarProps extends Pick<AdominConfig, "views" | "title"> {
  currentView?: string;
}

export const Sidebar = ({ views, title, currentView }: SidebarProps) => {
  const { setShowMenu } = useMobileContext();
  const viewsToShow = useMemo(() => deepFilterHiddenViews(views), [views]);

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
            key={view.name + view.type}
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
