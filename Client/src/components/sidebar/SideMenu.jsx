import React from "react";
import soroBinduIcon from "../../assets/images/SorobinduIcon.png";
import MultiMenu from "./subComponents/MultiMenu";

import { FaUserAlt } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { AiFillDatabase, AiFillAppstore } from "react-icons/ai";
import { FaMailBulk, FaUserFriends, FaUserPlus } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { ADMINROLE } from "../../helper/constructors";

const SideMenu = ({ setSidebarHover, setToggleSidebar }) => {
  // const agentRole = ["admin", "agent"];
  const adminRole = ["admin"];
  const currentUserRole = useSelector((state) => state.myData.data.role);

  return (
    <div>
      <aside
        onMouseEnter={() => setSidebarHover(true)}
        onMouseLeave={() => setSidebarHover(false)}
        className="sidebar-wrapper"
        data-simplebar="true"
      >
        <div className="sidebar-header">
          <div>
            <img src={soroBinduIcon} className="logo-icon" alt="logo icon" />
          </div>
          <div>
            <h4 className="logo-text">SoroBindu</h4>
          </div>
          <div
            onClick={() => setToggleSidebar((prev) => !prev)}
            className="toggle-icon ms-auto"
          >
            {" "}
            <i className="bi bi-list"></i>
          </div>
        </div>

        <ul className="metismenu" id="menu">
          <li className="menu-label">Lead Menagement</li>
          <MultiMenu
            menuTitle={"Dashbord"}
            menuIcon={<i className="bi bi-house-fill"></i>}
            menuLink={"/"}
            subMenu={false}
          />
          {/* Subject */}
          {adminRole.includes(currentUserRole) && (
            <MultiMenu
              menuTitle={"Subjects"}
              menuIcon={<i className="bi bi-journal-bookmark-fill"></i>}
              menuLink={"/subjects"}
              subMenu={false}
            />
          )}
          {/* Sessions */}
          {adminRole.includes(currentUserRole) && (
            <MultiMenu
              menuTitle={"Sessions"}
              menuIcon={<i className="bi bi-calendar4-range"></i>}
              menuLink={"/sessions"}
              subMenu={false}
            />
          )}

          {/* Lead */}
          <MultiMenu
            menuTitle={"Lead"}
            menuIcon={<FaUserAlt />}
            menuLink={"/"}
            subMenu={true}
          >
            {adminRole.includes(currentUserRole) && (
              <>
                <li>
                  <NavLink to="/addlead">
                    <BiTransfer /> Import Lead
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/bulkentryReport">
                    <i className="bi bi-bar-chart-line"></i> Import Report
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to={"/datagrid"} state={{ title: "Assigned Lead" }}>
                <AiFillDatabase /> Data List
              </NavLink>
            </li>
          </MultiMenu>

          {/* Email Template */}
          {adminRole.includes(currentUserRole) && (
            <MultiMenu
              menuTitle={"Email Template"}
              menuIcon={<FaMailBulk />}
              menuLink={"/templatelist"}
              subMenu={false}
            />
          )}
          {/* Groupping */}
          {ADMINROLE.includes(currentUserRole) && (
            <MultiMenu
              menuTitle={"Messaging"}
              menuIcon={<i className="bi bi-chat-left-heart"></i>}
              menuLink={"/"}
              subMenu={true}
            >
              <li>
                <NavLink to="/msgdepartment">
                  <i className="bi bi-chat-square-text"></i> SMS
                </NavLink>
              </li>
              <li>
                <NavLink to="/maildepartment">
                  <i className="bi bi-envelope"></i> Email
                </NavLink>
              </li>
            </MultiMenu>
          )}
          {/* Users */}
          <MultiMenu
            menuTitle={"Users"}
            menuIcon={<FaUserFriends />}
            menuLink={"/"}
            subMenu={true}
          >
            <li>
              <NavLink to="/allusers">
                <HiUserGroup /> All Users
              </NavLink>
            </li>
            {adminRole.includes(currentUserRole) && (
              <li>
                <NavLink to="/adduser">
                  <FaUserPlus /> Add User
                </NavLink>
              </li>
            )}
          </MultiMenu>
          {/* Accessories */}
          <MultiMenu
            menuTitle={"Accessories"}
            menuIcon={<AiFillAppstore />}
            menuLink={"/accessories"}
            subMenu={false}
          />
          {/* Settings */}
          {adminRole.includes(currentUserRole) && (
            <MultiMenu
              menuTitle={"Settings"}
              menuIcon={<i className="bi bi-gear-wide-connected"></i>}
              menuLink={"/settings"}
              subMenu={false}
            />
          )}
        </ul>
      </aside>
    </div>
  );
};

export default SideMenu;
