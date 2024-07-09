import { Collapse, Divider } from "@mui/material";
import clsx from "clsx";
import { MouseEventHandler, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { getAdominRouterPath, simplePluralize } from "../../adominPaths";
import { FontIcon } from "../../components/FontIcon";
import { AdominConfig, getFirstLink } from "../../utils/adominConfig";
import type { ApiAdominView } from "../../utils/api_views.type";
import { useMobileContext } from "../../utils/useMobileContext";
import { CmsSidebarLinks } from "./CmsSidebarLinks";
import { LogoutButton } from "./LogoutButton";
import { deepFilterHiddenViews } from "./deepFilterHiddenViews";
import { getCurrentFolderNames } from "./getCurrentFolderNames";

const AdominViewLink = ({
  view,
  currentView,
  level = 0,
  folderNames,
}: {
  view: ApiAdominView;
  currentView?: string;
  level?: number;
  folderNames: string[];
}) => {
  const { setShowMenu } = useMobileContext();
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

  const [isFolderOpen, setFolderOpen] = useState(
    folderNames.includes(viewName)
  );

  const onLinkClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (view.type === "folder") {
      // if we click on a folder, we want to open/close it
      setFolderOpen((v) => !v);
      // we don't want to navigate to the folder, just open/close it
      e.preventDefault();
      e.stopPropagation();
    } else {
      // on mobile, we want to close the menu if we click on a link that is not a folder
      setShowMenu(false);
    }
  };

  return (
    <>
      <Link to={viewPath} onClick={onLinkClick}>
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
      <Collapse in={isFolderOpen}>
        <div>
          {view.type === "folder" &&
            view.views.map((v) => (
              <AdominViewLink
                key={v.name + v.type}
                view={v}
                currentView={currentView}
                level={level + 1}
                folderNames={folderNames}
              />
            ))}
        </div>
      </Collapse>
    </>
  );
};

export interface SidebarProps
  extends Pick<AdominConfig, "views" | "title" | "plugins"> {
  currentView?: string;
}

export const Sidebar = ({
  views,
  title,
  currentView,
  plugins,
}: SidebarProps) => {
  const viewsToShow = useMemo(() => deepFilterHiddenViews(views), [views]);
  const folderNames = useMemo(
    () => getCurrentFolderNames(viewsToShow, currentView ?? null),
    [viewsToShow, currentView]
  );

  const firstLink = useMemo(() => getFirstLink(viewsToShow), [viewsToShow]);

  if (currentView === undefined && viewsToShow.length > 0 && firstLink) {
    return <Navigate to={firstLink} />;
  }

  return (
    <div className="bg-adomin_1 min-w-[300px] select-none flex flex-col">
      <h1 className="text-center text-2xl text-white mt-4">{title}</h1>
      <h2 className="text-center text-l text-adomin_2 mb-2">Back-office</h2>

      <div>
        {viewsToShow.map((view) => (
          <AdominViewLink
            key={view.name + view.type}
            view={view}
            currentView={currentView}
            folderNames={folderNames}
          />
        ))}
      </div>
      <Divider />
      {plugins.includes("cms") && <CmsSidebarLinks currentView={currentView} />}
      <div className="mt-auto">
        <LogoutButton />
      </div>
    </div>
  );
};
