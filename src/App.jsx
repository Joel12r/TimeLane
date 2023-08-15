import React from "react";
import { FaCalendar, FaAward, FaClipboardList, FaSlidersH, FaUserAlt, FaHeadset, FaDoorOpen, FaAutoprefixer } from "react-icons/fa";
import './App.css'
export default function SideBar() {
  return (
    <div className="main-container">
      <div className="wrapper d-flex align-items-stretch mt-5 bg-priamry">
        <nav id="sidebar">
          <div className="img bg-wrap text-center py-4" style={{ marginLeft: "20%" }}>
          
            <div className="user-logo col-lg-3">
              <div className="img"><FaUserAlt size={90} style={{ marginLeft: "10%" }} /></div>
              <h3>TIME <FaAutoprefixer /> LANE</h3>
            </div>

          </div>
          <ul className="list-unstyled components mb-5">
            <li className="active">
              <a href="#"> <FaCalendar className="icon" /> Home</a>
            </li>
            <li>
              <a href="#"><FaAward className="icon" /> Important </a>
            </li>
            <li>
              <a href="#"><FaClipboardList className="icon" /> Top Review</a>
            </li>
            <li>
              <a href="#"><FaSlidersH className="icon" /> Settings</a>
            </li>
            <li>
              <a href="#"><FaHeadset className="icon" /> Support</a>
            </li>
            <li>
              <a href="#"><FaDoorOpen className="icon" /> Sign Out @ <p className="user-info">John Doe</p> </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
