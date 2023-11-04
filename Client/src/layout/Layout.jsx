import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import SideMenu from "../components/sidebar/SideMenu";

import { toast } from "react-toastify";

const Layout = ({ children, handleFullScreen }) => {
  // Scrool to top
  const [backTopVisible, setBackTopVisible] = useState(false);
  // Sidebar toggle
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [sidebarHover, setSidebarHover] = useState(false);

  const toggleBackTopVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setBackTopVisible(true);
    } else if (scrolled <= 300) {
      setBackTopVisible(false);
    }
  };
  const scrookToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleBackTopVisible);
    return () => window.removeEventListener("scroll", null);
  }, []);

  const handlePageFullScreen = () => {
    if (!handleFullScreen.active) {
      handleFullScreen.enter();
      toast.dismiss();
      toast.warning("Press (ALT+TAB) to view other open applications");
    } else {
      handleFullScreen.exit();
    }
  };

  return (
    <div>
      <div
        className={`wrapper ${toggleSidebar ? "toggled" : ""} ${
          sidebarHover ? "sidebar-hovered" : ""
        }`}
      >
        <Header handleFullScreen={handlePageFullScreen} />

        <SideMenu
          setSidebarHover={setSidebarHover}
          setToggleSidebar={setToggleSidebar}
        />

        <main className="page-content">{children}</main>

        <div
          style={{
            display: "block",
            cursor: "pointer",
            opacity: `${backTopVisible ? 1 : 0}`,
            transition: ".4s",
            bottom: `${backTopVisible ? "20px" : "-40px"}`,
          }}
          onClick={scrookToTop}
          className="back-to-top"
        >
          <i className="bx bxs-up-arrow-alt"></i>
        </div>
      </div>
    </div>
  );
};

export default Layout;
