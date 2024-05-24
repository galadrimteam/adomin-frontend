import { Person } from "@mui/icons-material";
import { useMemo } from "react";

const DEFAULT_ICON = null;

const ICON_MAP: Record<string, IconType> = {
  User: Person,
} as const;

interface Props {
  iconKey: string;
  className?: string;
}

type IconType = React.FC<{
  className?: string;
}>;

export const SidebarIcon = ({ iconKey, className }: Props) => {
  const IconComponent = useMemo(
    () => ICON_MAP[iconKey] || DEFAULT_ICON,
    [iconKey]
  );

  if (!IconComponent) return null;

  return <IconComponent className={className} />;
};
