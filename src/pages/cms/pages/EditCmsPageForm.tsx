import { CmsConfig, CmsPage } from "../utils/cms.types";
import { CreateOrUpdateCmsPage } from "./CreateOrUpdateCmsPage";

interface Props {
  config: CmsConfig;
  page: CmsPage;
}

export const EditCmsPageForm = ({ page, config }: Props) => {
  return <CreateOrUpdateCmsPage cmsConfig={config} page={page} />;
};
