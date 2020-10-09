import React, { useEffect, useState } from "react";
import { Collapse } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import classname from "classnames";

//i18n
import { withNamespaces } from 'react-i18next';

const Navbar = (props) => {

    const [isDashboard,setIsDashboard] = useState('false')
    const [isDropdown1,setIsDropdown1] = useState('false')
    const [isDropdown2,setIsDropdown2] = useState('false')

    useEffect(() => {
        var matchingMenuItem = null;
        var ul = document.getElementById("navigation");
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
            if (props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            activateParentDropdown(matchingMenuItem);
        }
    },[])

    const toggleDropdown1 = () => {
        setIsDropdown1(!isDropdown1);
        setIsDropdown2('false');
    }

    const toggleDropdown2 = () => {
        setIsDropdown2(!isDropdown2);
        setIsDropdown1('false');
    }

    const closeDropdowns = () => {
        setIsDropdown2('false');
        setIsDropdown1('false');
    }

    const activateParentDropdown = (item) => {
        item.classList.add("active");
        const parent = item.parentElement;
        if (parent) {
            parent.classList.add("active"); // li
            const parent2 = parent.parentElement;
            parent2.classList.add("active"); // li
            const parent3 = parent2.parentElement;
            if (parent3) {
                parent3.classList.add("active"); // li
                const parent4 = parent3.parentElement;
                if (parent4) {
                    parent4.classList.add("active"); // li
                    const parent5 = parent4.parentElement;
                    if (parent5) {
                        parent5.classList.add("active"); // li
                        const parent6 = parent5.parentElement;
                        if (parent6) {
                            parent6.classList.add("active"); // li
                        }
                    }
                }
            }
        }
        return false;
    };

    return (
        <React.Fragment>
            <div className="topnav">
                <div className="container-fluid">
                    <nav className="navbar navbar-light navbar-expand-lg topnav-menu" id="navigation">
                        <Collapse isOpen={props.menuOpen} className="navbar-collapse" id="topnav-menu-content">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle arrow-none" onClick={toggleDropdown1} to="#">
                                        <i className="bx bx-customize mr-2"></i>{props.t('Apps')} <div className="arrow-down"></div>
                                    </Link>
                                    <div className={classname("dropdown-menu", { show: !isDropdown1 })}>
                                        <Link to="/pools" className="dropdown-item" onClick={closeDropdowns}>{props.t('Pools')}</Link>
                                        <Link to="/share" className="dropdown-item" onClick={closeDropdowns}>{props.t('Shares')}</Link>
                                        <Link to="/dao" className="dropdown-item" onClick={closeDropdowns}>{props.t('Dao')}</Link>
                                        <Link to="/earn" className="dropdown-item" onClick={closeDropdowns}>{props.t('Earn')}</Link>
                                        <Link to="/swap" className="dropdown-item" onClick={closeDropdowns}>{props.t('Swap')}</Link>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle arrow-none" onClick={toggleDropdown2} to="#">
                                        <i className="bx bx-info-circle mr-2"></i>{props.t('Info')} <div className="arrow-down"></div>
                                    </Link>
                                    <div className={classname("dropdown-menu", { show: !isDropdown2  })}>
                                        {/*<Link to="start" className="dropdown-item">{props.t('How to start?')}</Link>*/}
                                        <Link to="faq" className="dropdown-item">{props.t('FAQ')}</Link>
                                    </div>
                                </li>
                            </ul>
                        </Collapse>
                    </nav>
                </div>
            </div>
        </React.Fragment>
    );
}

export default withRouter(withNamespaces()(Navbar));
