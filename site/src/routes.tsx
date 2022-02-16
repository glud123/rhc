import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "./views/Home";
import ComponentsPage from "./views/ComponentsPage";

const Routes = () => {
  return useRoutes(routes);
};

export default Routes;

export const routes = [
  {
    path: "/",
    name: "Home",
    hidden: true,
    element: <Home />,
  },
  {
    path: "/components",
    name: "Components",
    element: <ComponentsPage />,
  },
];
