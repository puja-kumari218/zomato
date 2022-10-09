import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// layout import
import Homelayout from "../layouts/Homepage.layout";

function HomeLayouthoc({ component: Component, path, ...rest }) {
  return (
    <>
      <Routes>
        <Route
          {...rest}
          path={path}
          element={
            <Homelayout>
              <Component />
            </Homelayout>
          }
        />
        <Route path="/" element={<Navigate to="/delivery" />} />
      </Routes>
    </>
  );
}

export default HomeLayouthoc;
