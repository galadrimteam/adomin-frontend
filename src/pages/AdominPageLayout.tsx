import { PropsWithChildren } from "react";
import { useConfigQuery } from "./home/useConfigQuery";

export const AdominPageLayout = ({ children }: PropsWithChildren) => {
  const configQuery = useConfigQuery();

  return (
    <div className="w-full flex flex-col bg-adomin_4 overflow-hidden">
      <div className="flex-1">{children}</div>
      <div className="bg-adomin_4 text-adomin_2 p-2">
        {configQuery.data?.footerText ?? "Loading footer text..."}
      </div>
    </div>
  );
};
