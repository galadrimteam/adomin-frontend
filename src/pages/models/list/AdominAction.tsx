import { IconButton, Tooltip } from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { FontIcon } from "../../../components/FontIcon";
import { AdominActionConfig, AdominActionLink } from "../model.types";
import { useActionMutation } from "./useActionMutation";

interface Props {
  action: AdominActionConfig;
  actionMutation: ReturnType<typeof useActionMutation>;
  primaryKeyValue?: string | number;
}

const getLinkIconButtonProps = (
  action: AdominActionLink,
  navigate: NavigateFunction
) => {
  // if link is relative, navigate using react-router-dom
  const shouldNavigate = !action.openInNewTab && action.href.startsWith("/");

  if (shouldNavigate) {
    return {
      onClick: () => navigate(action.href),
    };
  }

  return {
    href: action.href,
    target: action.openInNewTab ? "_blank" : undefined,
  };
};

export const AdominAction = ({
  action,
  actionMutation,
  primaryKeyValue,
}: Props) => {
  const navigate = useNavigate();

  if (action.type === "link") {
    const linkIconButtonProps = getLinkIconButtonProps(action, navigate);

    return (
      <Tooltip arrow title={action.tooltip}>
        <IconButton
          disabled={actionMutation.isPending}
          {...linkIconButtonProps}
        >
          <FontIcon iconName={action.icon} color={action.iconColor} />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Tooltip arrow title={action.tooltip}>
      <IconButton
        disabled={actionMutation.isPending}
        onClick={() =>
          actionMutation.mutateAsync({
            actionName: action.name,
            primaryKeyValue,
          })
        }
      >
        <FontIcon iconName={action.icon} color={action.iconColor} />
      </IconButton>
    </Tooltip>
  );
};
