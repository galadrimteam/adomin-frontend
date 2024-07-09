import { CmsLayout } from "../CmsLayout";
import { PagesListTable } from "./PagesListTable";

export const CmsPages = () => {
  return (
    <CmsLayout heading="CMS Pages">
      <PagesListTable />
    </CmsLayout>
  );
};
