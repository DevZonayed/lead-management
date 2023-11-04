import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import { authRoutes, userRoutes } from "../../routes/allRoutes";
import { useSelector } from "react-redux";
import PublicLoader from "../loaders/PublicLoader";
import PrivateLoader from "../loaders/PrivateLoader";
import NotFoundPage from "../../page/error/NotFoundPage";
const AuthMiddleware = ({ isProtected, handleFullScreen }) => {
  const currentUser = useSelector((state) => state.myData);

  if (currentUser.isLoading) {
    return <PublicLoader />;
  }

  return (
    <>
      {/* Public Route */}
      <Suspense fallback={<PublicLoader />}>
        <Routes>
          {authRoutes.map((item, inx) => {
            return (
              <Route key={inx} path={item.path} element={<item.component />} />
            );
          })}
        </Routes>
      </Suspense>
      {/* Protected Route */}
      <Routes>
        {userRoutes.map((item, inx) => {
          return (
            <Route
              key={inx}
              path={item.path}
              element={
                currentUser.isLogin ? (
                  item.access?.includes(currentUser.data.role) ? (
                    <Layout handleFullScreen={handleFullScreen}>
                      <Suspense fallback={<PrivateLoader />}>
                        <item.component />
                      </Suspense>
                    </Layout>
                  ) : (
                    <>
                      <NotFoundPage />
                    </>
                  )
                ) : (
                  item.path !== "*" && (
                    <Navigate to={`/login?redirect=${item.path}`} />
                  )
                )
              }
            />
          );
        })}
      </Routes>
    </>
  );
};

export default AuthMiddleware;
