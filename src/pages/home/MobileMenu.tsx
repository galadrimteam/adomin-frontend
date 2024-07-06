import { Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useMobileContext } from "../../utils/useMobileContext";
import { Sidebar, SidebarProps } from "./Sidebar";

export const MobileMenu = ({
  views,
  title,
  currentView,
  plugins,
}: SidebarProps) => {
  const { showMenu, setShowMenu } = useMobileContext();

  return (
    <div
      className="w-screen h-screen bg-adomin_1 z-10 absolute top-0 transition-all"
      style={{
        translate: showMenu ? undefined : "-100vw",
      }}
    >
      <div className="absolute right-0 top-8 px-4">
        <IconButton onClick={() => setShowMenu(false)}>
          <Menu
            style={{
              color: "white",
            }}
          />
        </IconButton>
      </div>

      <div className="h-[70%] flex flex-col items-center justify-center">
        <Sidebar
          views={views}
          title={title}
          currentView={currentView}
          plugins={plugins}
        />
      </div>
    </div>
  );
};
