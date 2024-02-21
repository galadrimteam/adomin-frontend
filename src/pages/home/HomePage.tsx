import { Outlet, useParams } from "react-router-dom";
import CustomPage from "./CustomPage";

function HomePage() {
  const { view } = useParams();

  return (
    <CustomPage currentView={view}>
      <Outlet />
    </CustomPage>
  );
}

export default HomePage;
