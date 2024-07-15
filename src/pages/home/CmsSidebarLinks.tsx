import { Collapse } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ADOMIN_CMS_BLOCKS_PATH,
  ADOMIN_CMS_LAYOUTS_PATH,
  ADOMIN_CMS_PAGES_PATH,
} from "../../adominPaths";
import { FontIcon } from "../../components/FontIcon";
import { useMobileContext } from "../../utils/useMobileContext";
import {
  CMS_BLOCK_NAME,
  CMS_LAYOUT_NAME,
  CMS_PAGE_NAME,
} from "../cms/CmsLayout";

interface Props {
  currentView?: string;
}

const CMS_LINK_STYLE = { marginLeft: 20 };

export const CmsSidebarLinks = ({ currentView }: Props) => {
  const { setShowMenu } = useMobileContext();
  const [isFolderOpen, setFolderOpen] = useState(
    currentView?.startsWith("cms")
  );
  const toggleFolderOpen = () => setFolderOpen((v) => !v);
  const onLinkClick = () => {
    // on mobile, we want to close the menu if we click on a link that is not a folder
    setShowMenu(false);
  };

  return (
    <>
      <div onClick={toggleFolderOpen}>
        <div className="flex items-center justify-center w-full p-4 text-adomin_2 text-xl hover:text-white cursor-pointer">
          <p className="flex-1">
            <FontIcon iconName="folder" className="mr-2" />
            CMS
          </p>
        </div>
      </div>
      <Collapse in={isFolderOpen}>
        <div>
          <Link to={ADOMIN_CMS_PAGES_PATH} onClick={onLinkClick}>
            <div
              className={clsx(
                "flex items-center justify-center w-full p-4 text-adomin_2 text-xl hover:text-white",
                currentView === CMS_PAGE_NAME && "text-white"
              )}
              style={CMS_LINK_STYLE}
            >
              <p className="flex-1">
                <FontIcon iconName="license" className="mr-2" />
                Pages
              </p>
            </div>
          </Link>
          <Link to={ADOMIN_CMS_LAYOUTS_PATH} onClick={onLinkClick}>
            <div
              className={clsx(
                "flex items-center justify-center w-full p-4 text-adomin_2 text-xl hover:text-white",
                currentView === CMS_LAYOUT_NAME && "text-white"
              )}
              style={CMS_LINK_STYLE}
            >
              <p className="flex-1">
                <FontIcon iconName="layout-navbar" className="mr-2" />
                Layouts
              </p>
            </div>
          </Link>
          <Link to={ADOMIN_CMS_BLOCKS_PATH} onClick={onLinkClick}>
            <div
              className={clsx(
                "flex items-center justify-center w-full p-4 text-adomin_2 text-xl hover:text-white",
                currentView === CMS_BLOCK_NAME && "text-white"
              )}
              style={CMS_LINK_STYLE}
            >
              <p className="flex-1">
                <FontIcon iconName="layout-2" className="mr-2" />
                Blocks
              </p>
            </div>
          </Link>
        </div>
      </Collapse>
    </>
  );
};
