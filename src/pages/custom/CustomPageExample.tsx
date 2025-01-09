import { Alert } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { CenteredSpinner } from "../../components/CenteredSpinner";
import { PageHeading } from "../../components/PageHeading";
import CustomPage from "../home/CustomPage";

/**
 * This is an example of a custom page.
 * You can safely remove this file if you don't need it.
 * It's intended to be used as a template for creating custom pages.
 *
 * To use it, you need to:
 * - add a custom view config in the backend
 * ```ts
 * createCustomViewConfig({
 *   href: '/backoffice/custom-page-example',
 *   label: 'Custom page example',
 *   icon: 'link',
 *   name: 'custom-page-example',
 * })
 * ```
 * - link this component to a route in the router.tsx file
 * ```tsx
 * {
 *   path: "/backoffice/custom-page-example",
 *   element: <CustomPageExample />,
 * },
 * ```
 */

const pageHeading = "Custom page example";

const CustomPageExample = () => {
  const testQuery = useQuery({
    queryKey: ["custom-page-example"],
    queryFn: async () => Promise.resolve({ text: "Some custom fetched data" }),
  });

  if (testQuery.isLoading) {
    return <CenteredSpinner />;
  }

  return (
    <CustomPage currentView={"custom-page-example"}>
      <div className="flex w-full flex-col p-4">
        <PageHeading text={pageHeading} />
        <div className="flex-1">
          {testQuery.isError && (
            <Alert severity="error">
              Une erreur est survenue lors du chargement de la page
            </Alert>
          )}

          {testQuery.data && <div>{testQuery.data.text}</div>}
        </div>
      </div>
    </CustomPage>
  );
};

export default CustomPageExample;
