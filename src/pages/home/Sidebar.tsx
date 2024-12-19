import { Collapse, Divider } from "@mui/material";
import clsx from "clsx";
import { MouseEventHandler, useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  ADOMIN_HOME_PATH,
  getAdominRouterPath,
  simplePluralize,
} from "../../adominPaths";
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

    return { paddingLeft: `${level * 30}px` };
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
        <div style={style}>
          <div
            className={clsx(
              "flex items-center rounded-md justify-center w-full px-4 py-2 hover:bg-adomin_3",
              viewName === currentView && "bg-adomin_3"
            )}
          >
            <p className="flex-1">
              {view.icon && (
                <FontIcon
                  iconName={view.icon}
                  color="black"
                  className={"mr-2"}
                />
              )}
              {view.label}
            </p>
            {view.type === "folder" && (
              <FontIcon
                iconName={"chevron-" + (isFolderOpen ? "down" : "right")}
              />
            )}
          </div>
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
  extends Pick<AdominConfig, "views" | "title" | "plugins" | "logo"> {
  currentView?: string;
}

export const Sidebar = ({
  views,
  title,
  currentView,
  plugins,
  logo,
}: SidebarProps) => {
  const viewsToShow = useMemo(() => deepFilterHiddenViews(views), [views]);
  const folderNames = useMemo(
    () => getCurrentFolderNames(viewsToShow, currentView ?? null),
    [viewsToShow, currentView]
  );

  const firstLink = useMemo(() => getFirstLink(viewsToShow), [viewsToShow]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  if (currentView === undefined && viewsToShow.length > 0 && firstLink) {
    return <Navigate to={firstLink} />;
  }

  return (
    <div className="bg-white min-w-[300px] select-none flex flex-col h-screen overflow-auto no-scrollbar sticky top-0">
      <Link to={ADOMIN_HOME_PATH}>
        {logo && (
          <div
            className="p-8 pb-2 flex items-center gap-2 mx-auto mt-4 mb-4"
            style={{
              flexDirection: logo.textPosition === "bottom" ? "column" : "row",
            }}
          >
            <img
              src={logo.url}
              style={{ maxWidth: logo.maxWidth, maxHeight: logo.maxHeight }}
              alt="logo"
            />
            {logo.textPosition !== undefined && (
              <h1 className="text-center text-xl">{title}</h1>
            )}
          </div>
        )}
        {!logo && (
          <>
            <h1 className="text-center text-xl mt-4">{title}</h1>
          </>
        )}
      </Link>

      <div className="p-4 flex flex-col gap-1">
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
      {plugins?.includes("cms") && (
        <CmsSidebarLinks currentView={currentView} />
      )}
      <div className="mt-auto sticky bottom-0 bg-white">
        <Divider />
        <LogoutButton />
      </div>
    </div>
  );
};
