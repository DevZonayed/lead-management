import React from "react";
import DrawerProvider from "./components/Drawer/context/DrawerProvider";

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "react-toastify/dist/ReactToastify.css";
import AuthMiddleware from "./routes/middleware/AuthMiddleware";
import InitialComponents from "./components/InitialComponents";
// import DataOrg from "./components/another/DataOrg";
const App = () => {
  const handleFullScreen = useFullScreenHandle();
  return (
    <>
      <FullScreen handle={handleFullScreen}>
        <DrawerProvider>
          <InitialComponents>
            <AuthMiddleware
              handleFullScreen={handleFullScreen}
              isProtected={true}
            />
          </InitialComponents>
        </DrawerProvider>
      </FullScreen>
    </>
  );
};

export default App;
