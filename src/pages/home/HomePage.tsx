import { Outlet, useParams } from "react-router-dom";
import CustomPage from "./CustomPage";

function HomePage() {
  const { model: modelParam } = useParams();

  return (
    <CustomPage modelProp={modelParam}>
      <Outlet />
    </CustomPage>
  );
}

export default HomePage;
