import { Logout } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { privateAxios } from "../../axios/privateAxios";
import { AdominConfig } from "../../utils/adominConfig";
import { useConfigQuery } from "./useConfigQuery";

const getUserDisplayName = (config?: AdominConfig) => {
  if (!config) return null;

  const userDisplayName = config.user[config.userDisplayKey];

  if (typeof userDisplayName === "string") return userDisplayName;

  return "Problème de configuration (sanitizeUserDisplayName)";
};

export const LogoutButton = () => {
  const { data } = useConfigQuery();
  const userDisplayName = getUserDisplayName(data);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await privateAxios.post(`/adomin/api/logout`);

      return res.data;
    },
    onSuccess: () => {
      location.reload();
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (userDisplayName === null) return null;

  return (
    <div className="my-2">
      <div className="flex justify-center items-center mt-2">
        <>
          <div className="max-w-[250px]">
            <Tooltip title={userDisplayName}>
              <p className="text-center text-white mr-4 truncate text-xl">
                {userDisplayName}
              </p>
            </Tooltip>
          </div>
          <IconButton onClick={handleLogout}>
            <Tooltip title="Se déconnecter">
              <Logout color="error" />
            </Tooltip>
          </IconButton>
        </>
      </div>
    </div>
  );
};
