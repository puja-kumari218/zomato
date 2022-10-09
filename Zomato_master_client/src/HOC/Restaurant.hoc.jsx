import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// Layout Import
import RestaurantLayout from "../layouts/Restaurant.layout";

function RestaurantLayoutHoc({ component: Component, path, ...rest }) {
  return (
    <>
      <Routes>
        <Route
          {...rest}
          path={path}
          element={
            <RestaurantLayout>
              <Component />
            </RestaurantLayout>
          }
        />
        {/* <Route path="/restaurant/:id" element={<Navigate to="/restaurant/:id/overview" />} /> */}
      </Routes>
    </>
  );
}

export default RestaurantLayoutHoc;
