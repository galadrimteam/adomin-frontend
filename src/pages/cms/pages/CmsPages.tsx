import { CMS_PAGE_NAME, CmsLayout } from "../CmsLayout";
import { PagesListTable } from "./PagesListTable";

export const CmsPages = () => {
  return (
    <CmsLayout heading="CMS Pages" viewName={CMS_PAGE_NAME}>
      <PagesListTable />
    </CmsLayout>
  );
};
