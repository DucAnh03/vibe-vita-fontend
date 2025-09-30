import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="main__layout">
      <Header />
      <main className="main_content">
        <Outlet className="main_content_area" />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
