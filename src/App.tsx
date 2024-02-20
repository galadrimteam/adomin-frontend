import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { adominRoutes } from "./router";
import { MobileContext } from "./utils/useMobileContext";

function App() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <MobileContext.Provider value={{ showMenu, setShowMenu }}>
      <RouterProvider router={adominRoutes} />
    </MobileContext.Provider>
  );
}

export default App;
