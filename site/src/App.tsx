import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes, { routes } from "./routes";
import PageLayout from "@/components/PageLayout";

const _BASENAME = process.env.NODE_ENV === "development" ? "/rhc" : "";

const App = () => {
  return (
    <React.StrictMode>
      <Router basename={_BASENAME}>
        <PageLayout options={routes}>
          <Routes />
        </PageLayout>
      </Router>
    </React.StrictMode>
  );
};

export default App;
