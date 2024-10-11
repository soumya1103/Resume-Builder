import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./ResumeHoc.css";

const ResumeHoc = (Component) =>
    function HOC() {
        return (
            <>
                {/* <Navigation /> */}
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
