import React from "react";
import SideBar from "../Composants/SideBar";
import NavBar from "../Composants/Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="w-full min-h-screen flex items-start    ">
      <SideBar />

      <div className="flex flex-col w-full">
        <NavBar />

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
