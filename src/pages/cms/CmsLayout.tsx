import { PropsWithChildren } from "react";
import { PageHeading } from "../../components/PageHeading";
import CustomPage from "../home/CustomPage";

export const CMS_PAGE_NAME = "cms-pages";
export const CMS_BLOCK_NAME = "cms-blocks";
export const CMS_LAYOUT_NAME = "cms-layouts";

type CmsView =
  | typeof CMS_PAGE_NAME
  | typeof CMS_BLOCK_NAME
  | typeof CMS_LAYOUT_NAME;

export const CmsLayout = ({
  children,
  heading,
  viewName,
}: PropsWithChildren<{ heading: string; viewName: CmsView }>) => {
  return (
    <CustomPage currentView={viewName}>
      <div className="flex w-full flex-col p-4">
        <PageHeading text={heading} />
        <div className="flex-1">{children}</div>
      </div>
    </CustomPage>
  );
};
