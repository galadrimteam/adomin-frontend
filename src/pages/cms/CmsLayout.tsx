import { PropsWithChildren } from "react";
import { PageHeading } from "../../components/PageHeading";
import CustomPage from "../home/CustomPage";

export const CMS_PAGE_NAME = "cms-pages";

export const CmsLayout = ({
  children,
  heading,
}: PropsWithChildren<{ heading: string }>) => {
  return (
    <CustomPage currentView={CMS_PAGE_NAME}>
      <div className="flex w-full flex-col">
        <PageHeading text={heading} />
        <div className="flex-1">{children}</div>
      </div>
    </CustomPage>
  );
};
