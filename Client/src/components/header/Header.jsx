import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { BiSearch, BiUserCircle } from "react-icons/bi";
import { BsSlack } from "react-icons/bs";
import { FaLink, FaFileCsv } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";
import { SiGooglesheets } from "react-icons/si";
import soroBinduIcon from "../../assets/images/SorobinduIcon.png";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import ToggleIcon from "./components/ToggleIcon";
import ToggleIconBlocks from "./components/ToggleIconBlocks";
import { handleLogout } from "../../redux/features/user/meSlice";
import randomRange from "../../helper/randomRange";
import { resetSessions } from "../../redux/features/sessions/sessionSlice";
import { resetSettings } from "../../redux/features/settings/settingsSlice";
import { resetSubjects } from "../../redux/features/subjects/subjectSlice";
import { resetUsers } from "../../redux/features/user/userSlice";
import { resetLeads } from "../../redux/features/lead/leadSlice";
import { resetEmailTemplates } from "../../redux/features/Email/templateSlice";
import { resetDashbord } from "../../redux/features/dashbord/dashbordSlice";
import { resetBulkEntry } from "../../redux/features/BulkEntry/bulkEntrySlice";
import GlobalSearch from "./components/GlobalSearch";

const Header = ({ handleFullScreen }) => {
  const currentUser = useSelector((state) => state.myData);
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const adminRole = ["admin"];
  const [, , removeCookie] = useCookies();
  const navigate = useNavigate();

  // Effects
  useEffect(() => {
    // Previous Notification Count
    let notificationCount = 0;
    let filteredNotification = currentUser.data?.notifications.filter(
      (notify) => new Date(notify.showAfter) < new Date()
    );
    notificationCount = filteredNotification.length;
    setNotifications(filteredNotification.reverse());
    let timer = setInterval(() => {
      if (notifications.length === currentUser.data?.notifications.length) {
        clearInterval(timer);
      }
      let filteredNotification = currentUser.data?.notifications.filter(
        (notify) => new Date(notify.showAfter) < new Date()
      );
      if (filteredNotification.length > notificationCount) {
        notificationCount = filteredNotification.length;
        setNotifications(filteredNotification.reverse());
        toast.success("We Have a new notification!");
      }
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Logout handler
  const handleLogOut = () => {
    removeCookie("token");
    dispatch(handleLogout());
    dispatch(resetSessions());
    dispatch(resetSettings());
    dispatch(resetSubjects());
    dispatch(resetUsers());
    dispatch(resetLeads());
    dispatch(resetEmailTemplates());
    dispatch(resetDashbord());
    dispatch(resetBulkEntry());
    navigate("/login");
  };

  const accBgColors = [
    "bg-gradient-danger",
    "bg-gradient-warning",
    "bg-gradient-voilet",
    "bg-gradient-branding",
    "bg-gradient-desert",
    "bg-gradient-amour",
    "bg-gradient-purple",
    "bg-gradient-voilet",
    "bg-gradient-success",
    "bg-gradient-danger",
    "bg-gradient-warning",
    "bg-gradient-info",
  ];
  return (
    <div>
      <header className="top-header">
        <nav className="navbar navbar-expand gap-3 align-items-center">
          <div className="mobile-toggle-icon fs-3">
            <i className="bi bi-list"></i>
          </div>
          {/* Search */}
          <GlobalSearch />
          <div className="top-navbar-right ms-auto">
            <ul className="navbar-nav align-items-center">
              <div className="nav-item">
                <div
                  onClick={handleFullScreen}
                  style={{ cursor: "pointer", fontSize: "15px" }}
                  className="fullScreen"
                >
                  <i className="bi bi-fullscreen"></i>
                </div>
              </div>
              {/* Accessories */}
              <ToggleIcon
                title={"Accessories"}
                element={<i className="bi bi-grid-3x3-gap-fill"></i>}
              >
                <div className="row row-cols-3 gx-2">
                  <div className="col">
                    <a
                      href="https://app.slack.com/client/T01SM0NP06N/C026X77PNS1"
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      <div className="apps p-2 radius-10 text-center">
                        <div className="apps-icon-box mb-1 text-white bg-gradient-purple">
                          <BsSlack />
                        </div>
                        <p className="mb-0 apps-name">Slack</p>
                      </div>
                    </a>
                  </div>
                  <div className="col">
                    <a
                      target={"_blank"}
                      rel="noreferrer"
                      href="https://www.facebook.com/groups/LearnFreelancingWithFun"
                    >
                      <div className="apps p-2 radius-10 text-center">
                        <div className="apps-icon-box mb-1 text-white bg-gradient-voilet">
                          <FaFacebookF />
                        </div>
                        <p className="mb-0 apps-name">Group</p>
                      </div>
                    </a>
                  </div>
                  <div className="col">
                    <a
                      rel="noreferrer"
                      target={"_blank"}
                      href="https://www.facebook.com/SoroBinduOfficial"
                    >
                      <div className="apps p-2 radius-10 text-center">
                        <div className="apps-icon-box mb-1 text-white bg-gradient-success">
                          <FaFacebookF />
                        </div>
                        <p className="mb-0 apps-name">General</p>
                      </div>
                    </a>
                  </div>
                  {/*
                   *bg-gradient-danger
                   *bg-gradient-warning
                   *bg-gradient-voilet
                   *bg-gradient-branding
                   *bg-gradient-desert
                   *bg-gradient-amour
                   */}
                  <div className="col">
                    <a
                      target={"_blank"}
                      rel="noreferrer"
                      href="https://www.youtube.com/@SoroBindu"
                    >
                      <div className="apps p-2 radius-10 text-center">
                        <div className="apps-icon-box mb-1 text-white bg-gradient-danger">
                          <FaYoutube />
                        </div>
                        <p className="mb-0 apps-name">SoroBindu</p>
                      </div>
                    </a>
                  </div>
                  <div className="col">
                    <a
                      target={"_blank"}
                      rel="noreferrer"
                      href="https://www.youtube.com/@SoroBinduLiveClass"
                    >
                      <div className="apps p-2 radius-10 text-center">
                        <div className="apps-icon-box mb-1 text-white bg-gradient-warning">
                          <FaYoutube />
                        </div>
                        <p className="mb-0 apps-name">Live</p>
                      </div>
                    </a>
                  </div>

                  <div className="col">
                    <a
                      target={"_blank"}
                      rel="noreferrer"
                      href="https://sorobindu.com/"
                    >
                      <div className="apps p-2 radius-10 text-center">
                        <div className="apps-icon-box mb-1 text-white bg-gradient-gray">
                          <img
                            style={{ width: "60px" }}
                            src={soroBinduIcon}
                            alt=""
                          />
                        </div>
                        <p className="mb-0 apps-name">WebSite</p>
                      </div>
                    </a>
                  </div>
                  {adminRole.includes(currentUser.data.role) && (
                    <>
                      <div className="col">
                        <a
                          title="This is a example for bulk Lead import"
                          target={"_blank"}
                          rel="noreferrer"
                          href="https://docs.google.com/spreadsheets/d/1dxYYpkm5QVwGVaX90rvclZarnJah_P3OMQt-dUcI1WM"
                        >
                          <div className="apps p-2 radius-10 text-center">
                            <div className="apps-icon-box mb-1 text-white bg-gradient-info">
                              <SiGooglesheets />
                            </div>
                            <p className="mb-0 apps-name">Demo(ggl)</p>
                          </div>
                        </a>
                      </div>
                      <div className="col">
                        <a
                          title="This is a example for bulk Lead import"
                          href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSgKeCeI04qIvrRqAJC3x83YWXspchUesjggLLATKhKSWIxoZPaM7MJqSju_Jh8zYteeTyYG-v3s7m5/pub?gid=0&single=true&output=csv"
                          download={true}
                        >
                          <div className="apps p-2 radius-10 text-center">
                            <div className="apps-icon-box mb-1 text-white bg-gradient-amour">
                              <FaFileCsv />
                            </div>
                            <p className="mb-0 apps-name">Demo(csv)</p>
                          </div>
                        </a>
                      </div>
                    </>
                  )}
                </div>
                <hr />
                <div className="row row-cols-3 gx-2">
                  {currentUser.data.accessories.map((item, index) => {
                    return (
                      <div key={"accessIndex" + index} className="col">
                        <a target={"_blank"} rel="noreferrer" href={item.url}>
                          <div className="apps p-2 radius-10 text-center">
                            <div
                              className={`apps-icon-box mb-1 text-white ${
                                accBgColors[randomRange(0, accBgColors.length)]
                              }`}
                            >
                              <FaLink />
                            </div>
                            <p className="mb-0 apps-name">{item.title}</p>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </ToggleIcon>
              {/* Notification */}
              <ToggleIcon title={"Notifications"}>
                {notifications.map((item) => {
                  return (
                    <ToggleIconBlocks
                      key={item._id}
                      title={item.title}
                      description={item.description}
                      time={moment(item.showAfter).endOf("day").fromNow()}
                    />
                  );
                })}
              </ToggleIcon>
              <ToggleIcon
                title={`Hello ${currentUser.data.firstName}`}
                element={
                  currentUser.data.image !== "" &&
                  currentUser.data.image !== undefined ? (
                    <img
                      src={currentUser.data.image}
                      className="user-img"
                      alt=""
                    />
                  ) : adminRole.includes(currentUser.data.role) ? (
                    <span style={{ fontSize: "20px" }}>
                      <GrUserAdmin />
                    </span>
                  ) : (
                    <span style={{ fontSize: "20px" }}>
                      <BiUserCircle />
                    </span>
                  )
                }
              >
                <ToggleIconBlocks
                  onClick={handleLogOut}
                  style={{ cursor: "pointer" }}
                  title={"Log Out"}
                  description="You will not able to access anymore"
                  time={"|"}
                  icon={<FiLogOut />}
                />
              </ToggleIcon>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
