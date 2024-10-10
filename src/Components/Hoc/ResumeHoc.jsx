import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./ResumeHoc.css";
import Navbar from "../Navbar/Navbar";

const ResumeHoc = (Component) =>
  function HOC() {
    return (
      <>
        <Navbar />
        <div className="hoc-container">
          <Sidebar />
          <div className="hoc-right-container">
            <Component />
          </div>
        </div>
      </>
    );
  };

export default ResumeHoc;
