import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default PageLayout;
