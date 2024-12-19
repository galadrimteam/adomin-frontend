import { useMutation } from "@tanstack/react-query";
import { privateAxios } from "../../axios/privateAxios";
import { FontIcon } from "../../components/FontIcon";
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
    <div
      className="flex justify-center items-center p-4 cursor-pointer"
      onClick={handleLogout}
    >
      <div className="flex items-center rounded-md justify-start w-full p-4 hover:bg-adomin_3">
        <FontIcon iconName="logout" color="black" className={"mr-3"} />
        <div>
          <p className="flex-1">Déconnexion</p>
          {userDisplayName && (
            <p className="text-sm text-gray-500">{userDisplayName}</p>
          )}
        </div>
      </div>
    </div>
  );
};
