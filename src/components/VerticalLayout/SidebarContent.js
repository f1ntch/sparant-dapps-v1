import React, {Component} from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";


//i18n
import {withNamespaces} from 'react-i18next';

class SidebarContent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.initMenu();
    }

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type) {
            this.initMenu();
        }
    }

    initMenu() {
        new MetisMenu("#side-menu");

        var matchingMenuItem = null;
        var ul = document.getElementById("side-menu");
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
            parent.classList.add("mm-active");
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add("mm-show");

                const parent3 = parent2.parentElement;

                if (parent3) {
                    parent3.classList.add("mm-active"); // li
                    parent3.childNodes[0].classList.add("mm-active"); //a
                    const parent4 = parent3.parentElement;
                    if (parent4) {
                        parent4.classList.add("mm-active");
                    }
                }
            }
            return false;
        }
        return false;
    };

    render() {
        return (
            <React.Fragment>
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title">{this.props.t('Apps')}</li>
                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="bx bx-coin-stack"></i>
                                <span>{this.props.t('Spartan')}</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="/dashboard">{this.props.t('Overview')}</Link></li>
                                <li><Link to="/pools">{this.props.t('Pools')}<span
                                    className="badge badge-pill badge-success float-right">{this.props.t('New')}</span></Link>
                                </li>
                                <li><Link to="/crypto-wallet">{this.props.t('Wallet')}</Link></li>
                            </ul>
                        </li>

                        <li className="menu-title">{this.props.t('Info')}</li>


                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="bx bx-info-circle"></i>
                                <span>{this.props.t('How to')}</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="crypto-wallet">{this.props.t('Wallet')}<span
                                    className="badge badge-pill badge-success float-right">{this.props.t('New')}</span></Link>
                                </li>
                                <li><Link to="pages-starter">{this.props.t('Starter Page')}</Link></li>
                                <li><Link to="pages-maintenance">{this.props.t('Maintenance')}</Link></li>
                                <li><Link to="pages-comingsoon">{this.props.t('Coming Soon')}</Link></li>
                                <li><Link to="pages-timeline">{this.props.t('Timeline')}</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(withNamespaces()(SidebarContent));
