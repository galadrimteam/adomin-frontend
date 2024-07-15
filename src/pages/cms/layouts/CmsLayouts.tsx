import { CMS_LAYOUT_NAME, CmsLayout } from "../CmsLayout";
import { LayoutsListTable } from "./LayoutsListTable";

export const CmsLayouts = () => {
  return (
    <CmsLayout heading="CMS Layouts" viewName={CMS_LAYOUT_NAME}>
      <LayoutsListTable />
    </CmsLayout>
  );
};
