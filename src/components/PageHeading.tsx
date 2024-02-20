import { Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useIsSmallScreen } from "../utils/useIsSmallScreen";
import { useMobileContext } from "../utils/useMobileContext";

interface Props {
  text: string;
}

export const PageHeading = ({ text }: Props) => {
  const isSmallScreen = useIsSmallScreen();
  const { setShowMenu } = useMobileContext();

  return (
    <div className="my-4 flex justify-center">
      <h1 className="text-2xl text-center font-bold p-4 rounded-md border-solid border-si flex-1">
        {text}
      </h1>
      {isSmallScreen && (
        <div className="flex items-center px-4">
          <IconButton onClick={() => setShowMenu(true)}>
            <Menu />
          </IconButton>
        </div>
      )}
    </div>
  );
};
