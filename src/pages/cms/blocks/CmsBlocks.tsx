import { CMS_BLOCK_NAME, CmsLayout } from "../CmsLayout";
import { BlocksListTable } from "./BlocksListTable";

export const CmsBlocks = () => {
  return (
    <CmsLayout heading="CMS Blocks" viewName={CMS_BLOCK_NAME}>
      <BlocksListTable />
    </CmsLayout>
  );
};
