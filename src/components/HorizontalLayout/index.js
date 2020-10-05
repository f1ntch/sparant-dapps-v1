import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  changeLayout,
  changeTopbarTheme,
  toggleRightSidebar,
  changeLayoutWidth,
} from "../../store/actions";

// Other Layout related Component
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import Rightbar from "../CommonForBoth/Rightbar";

const Layout = (props) => {

  const [isMenuOpened,SetIsMenuOpened] = useState('false')

  /**
  * Open/close right sidebar
  */
  const toggleRightSidebar = () => {
    props.toggleRightSidebar();
  }

  /**
  * Opens the menu - mobile
  */
  const openMenu = (e) => {
    SetIsMenuOpened(!isMenuOpened);
  }

  useEffect(() => {

    if (props.isPreloader === true) {
      document.getElementById('preloader').style.display = "block";
      document.getElementById('status').style.display = "block";

      setTimeout(() => {
        document.getElementById('preloader').style.display = "none";
        document.getElementById('status').style.display = "none";
      }, 2500);
    }
    else {
      document.getElementById('preloader').style.display = "none";
      document.getElementById('status').style.display = "none";
    }

    // Scrollto 0,0
    window.scrollTo(0, 0);

    const title = props.location.pathname;
    let currentage = title.charAt(1).toUpperCase() + title.slice(2);

    document.title =
      currentage + " | Spartan - Protocol";

    props.changeLayout('horizontal');
    if (props.topbarTheme) {
      props.changeTopbarTheme(props.topbarTheme);
    }
    if (props.layoutWidth) {
      props.changeLayoutWidth(props.layoutWidth);
    }
  },[])

  return (
    <React.Fragment>

      <div id="preloader">
        <div id="status">
          <div className="spinner-chase">
            <div className="chase-dot"></div>
            <div className="chase-dot"></div>
            <div className="chase-dot"></div>
            <div className="chase-dot"></div>
            <div className="chase-dot"></div>
            <div className="chase-dot"></div>
          </div>
        </div>
      </div>

      <div id="layout-wrapper">
        <Header theme={props.topbarTheme}
          isMenuOpened={isMenuOpened}
          toggleRightSidebar={toggleRightSidebar}
          openLeftMenuCallBack={openMenu} />
        <Navbar menuOpen={isMenuOpened} />
        <div className="main-content">
          {props.children}
        </div>
        <Footer />
      </div>

      <Rightbar />
    </React.Fragment>
  );
}

const mapStatetoProps = () => {
  return {
    ...Layout
  };
};

export default connect(mapStatetoProps, {
  changeTopbarTheme, toggleRightSidebar, changeLayout, changeLayoutWidth
})(withRouter(Layout));
