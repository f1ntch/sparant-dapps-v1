import React, { Component } from "react";
import { Row, Col, Collapse } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import classname from "classnames";

//i18n
import { withNamespaces } from 'react-i18next';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var matchingMenuItem = null;
        var ul = document.getElementById("navigation");
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
            if (this.props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            this.activateParentDropdown(matchingMenuItem);
        }
    }

    activateParentDropdown = item => {
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

    render() {
        return (
            <React.Fragment>
                <div className="topnav">
                    <div className="container-fluid">
                        <nav className="navbar navbar-light navbar-expand-lg topnav-menu" id="navigation">
                            <Collapse isOpen={this.props.menuOpen} className="navbar-collapse" id="topnav-menu-content">
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle arrow-none" onClick={e => { e.preventDefault(); this.setState({ isDashboard: !this.state.isDashboard }); }} to="#">
                                            <i className="bx bx-customize mr-2"></i>{this.props.t('Apps')} <div className="arrow-down"></div>
                                        </Link>
                                        <div className={classname("dropdown-menu", { show: this.state.isDashboard })}>
                                            <Link to="overview" className="dropdown-item">{this.props.t('Overview')}</Link>
                                            <Link to="pool" className="dropdown-item">{this.props.t('Pools')}</Link>
                                            <Link to="dao" className="dropdown-item">{this.props.t('Dao')}</Link>
                                            <Link to="earn" className="dropdown-item">{this.props.t('Earn')}</Link>
                                            <Link to="swap" className="dropdown-item">{this.props.t('Swap')}</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle arrow-none" onClick={e => { e.preventDefault(); this.setState({ isDashboard: !this.state.isDashboard }); }} to="#">
                                            <i className="bx bx-info-circle mr-2"></i>{this.props.t('Info')} <div className="arrow-down"></div>
                                        </Link>
                                        <div className={classname("dropdown-menu", { show: this.state.isDashboard })}>
                                            <Link to="start" className="dropdown-item">{this.props.t('How to start?')}</Link>
                                            <Link to="faq" className="dropdown-item">{this.props.t('FAQ')}</Link>
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
}

export default withRouter(withNamespaces()(Navbar));
