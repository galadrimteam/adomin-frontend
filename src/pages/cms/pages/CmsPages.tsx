import { PageHeading } from "../../../components/PageHeading";
import CustomPage from "../../home/CustomPage";
import { PagesListTable } from "./PagesListTable";

export const CMS_PAGE_NAME = "cms-pages";

export const CmsPages = () => {
  return (
    <CustomPage currentView={CMS_PAGE_NAME}>
      <div className="flex w-full flex-col">
        <PageHeading text="CMS Pages" />
        <div className="flex-1">
          <PagesListTable />
        </div>
      </div>
    </CustomPage>
  );
};
