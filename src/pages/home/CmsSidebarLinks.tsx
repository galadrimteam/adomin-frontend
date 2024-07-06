import { Collapse } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ADOMIN_CMS_PATH } from "../../adominPaths";
import { FontIcon } from "../../components/FontIcon";
import { useMobileContext } from "../../utils/useMobileContext";

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
          <Link to={`${ADOMIN_CMS_PATH}/pages`} onClick={onLinkClick}>
            <div
              className={clsx(
                "flex items-center justify-center w-full p-4 text-adomin_2 text-xl hover:text-white",
                currentView === "cms-pages" && "text-white"
              )}
              style={CMS_LINK_STYLE}
            >
              <p className="flex-1">
                <FontIcon iconName="license" className="mr-2" />
                Pages
              </p>
            </div>
          </Link>
        </div>
      </Collapse>
    </>
  );
};
