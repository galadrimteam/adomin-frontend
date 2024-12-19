import { Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useMobileContext } from "../../utils/useMobileContext";
import { Sidebar, SidebarProps } from "./Sidebar";

export const MobileMenu = ({
  views,
  title,
  currentView,
  plugins,
  logo,
}: SidebarProps) => {
  const { showMenu, setShowMenu } = useMobileContext();

  return (
    <div
      className="w-screen h-screen bg-white z-10 absolute top-0 transition-all"
      style={{
        translate: showMenu ? undefined : "-100vw",
      }}
    >
      <div className="absolute right-0 top-8 px-4">
        <IconButton onClick={() => setShowMenu(false)}>
          <Menu />
        </IconButton>
      </div>

      <div className="h-screen flex flex-col items-center justify-center">
        <Sidebar
          views={views}
          title={title}
          currentView={currentView}
          plugins={plugins}
          logo={logo}
        />
      </div>
    </div>
  );
};
