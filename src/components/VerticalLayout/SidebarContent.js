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
                                <i className="bx bx-bitcoin"></i>
                                <span>{this.props.t('Crypto')}</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="/dashboard">{this.props.t('Overview')}</Link></li>
                                <li><Link to="crypto-lending">{this.props.t('Pools')}<span
                                    className="badge badge-pill badge-success float-right">{this.props.t('New')}</span></Link>
                                </li>
                                <li><Link to="crypto-wallet">{this.props.t('Wallet')}</Link></li>
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


                        <li className="menu-title">{this.props.t('Components')}</li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="bx bx-tone"></i>
                                <span>{this.props.t('UI Elements')}</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="ui-alerts">{this.props.t('Alerts')}</Link></li>
                                <li><Link to="ui-buttons">{this.props.t('Buttons')}</Link></li>
                                <li><Link to="ui-cards">{this.props.t('Cards')}</Link></li>
                                <li><Link to="ui-carousel">{this.props.t('Carousel')}</Link></li>
                                <li><Link to="ui-dropdowns">{this.props.t('Dropdowns')}</Link></li>
                                <li><Link to="ui-grid">{this.props.t('Grid')}</Link></li>
                                <li><Link to="ui-images">{this.props.t('Images')}</Link></li>
                                <li><Link to="ui-lightbox">{this.props.t('Lightbox')}</Link></li>
                                <li><Link to="ui-modals">{this.props.t('Modals')}</Link></li>
                                <li><Link to="ui-rangeslider">{this.props.t('Range Slider')}</Link></li>
                                <li><Link to="ui-session-timeout">{this.props.t('Session Timeout')}</Link></li>
                                <li><Link to="ui-progressbars">{this.props.t('Progress Bars')}</Link></li>
                                <li><Link to="ui-sweet-alert">{this.props.t('Sweet-Alert')}</Link></li>
                                <li><Link to="ui-tabs-accordions">{this.props.t('Tabs & Accordions')}</Link></li>
                                <li><Link to="ui-typography">{this.props.t('Typography')}</Link></li>
                                <li><Link to="ui-video">{this.props.t('Video')}</Link></li>
                                <li><Link to="ui-general">{this.props.t('General')}</Link></li>
                                <li><Link to="ui-colors">{this.props.t('Colors')}</Link></li>
                                <li><Link to="ui-rating">{this.props.t('Rating')}</Link></li>
                                <li><Link to="ui-notifications">{this.props.t('Notifications')}</Link></li>
                                <li><Link to="ui-image-cropper">{this.props.t('Image Cropper')}</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/#" className="waves-effect">
                                <i className="bx bxs-eraser"></i>
                                <span className="badge badge-pill badge-danger float-right">6</span>
                                <span>{this.props.t('Forms')}</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="form-elements">{this.props.t('Form Elements')}</Link></li>
                                <li><Link to="form-validation">{this.props.t('Form Validation')}</Link></li>
                                <li><Link to="form-advanced">{this.props.t('Form Advanced')}</Link></li>
                                <li><Link to="form-editors">{this.props.t('Form Editors')}</Link></li>
                                <li><Link to="form-uploads">{this.props.t('Form File Upload')} </Link></li>
                                <li><Link to="form-xeditable">{this.props.t('Form Xeditable')}</Link></li>
                                <li><Link to="form-repeater">{this.props.t('Form Repeater')}</Link></li>
                                <li><Link to="form-wizard">{this.props.t('Form Wizard')}</Link></li>
                                <li><Link to="form-mask">{this.props.t('Form Mask')}</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="bx bx-list-ul"></i>
                                <span>{this.props.t('Tables')}</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="tables-basic">{this.props.t('Basic Tables')}</Link></li>
                                <li><Link to="tables-datatable">{this.props.t('Data Tables')}</Link></li>
                                <li><Link to="tables-responsive">{this.props.t('Responsive Table')}</Link></li>
                                <li><Link to="tables-editable">{this.props.t('Editable Table')}</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="bx bxs-bar-chart-alt-2"></i>
                                <span>{this.props.t('Charts')}</span>
                            </Link>

                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="apex-charts">{this.props.t('Apex charts')}</Link></li>
                                <li><Link to="chartist-charts">{this.props.t('Chartist Chart')}</Link></li>
                                <li><Link to="chartjs-charts">{this.props.t('Chartjs Chart')}</Link></li>
                                <li><Link to="e-charts">{this.props.t('E Chart')}</Link></li>
                                <li><Link to="tui-charts">{this.props.t('Toast UI Chart')}</Link></li>
                                <li><Link to="sparkline-charts">{this.props.t('Sparkline Chart')}</Link></li>
                                <li><Link to="charts-knob">{this.props.t('Knob Chart')}</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="bx bx-aperture"></i>
                                <span>{this.props.t('Icons')}</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="icons-boxicons">{this.props.t('Boxicons')}</Link></li>
                                <li><Link to="icons-materialdesign">{this.props.t('Material Design')}</Link></li>
                                <li><Link to="icons-dripicons">{this.props.t('Dripicons')}</Link></li>
                                <li><Link to="icons-fontawesome">{this.props.t('Font awesome')}</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="bx bx-map"></i>
                                <span>{this.props.t('Maps')}</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="maps-google">{this.props.t('Google Maps')}</Link></li>
                                <li><Link to="maps-vector">{this.props.t('Vector Maps')}</Link></li>
                                <li><Link to="maps-leaflet">{this.props.t('Leaflet Maps')}</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="bx bx-share-alt"></i>
                                <span>{this.props.t('Multi Level')}</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="true">
                                <li><Link to="#">{this.props.t('Level 1.1')}</Link></li>
                                <li><Link to="#" className="has-arrow">{this.props.t('Level 1.2')}</Link>
                                    <ul className="sub-menu" aria-expanded="true">
                                        <li><Link to="#">{this.props.t('Level 2.1')}</Link></li>
                                        <li><Link to="#">{this.props.t('Level 2.2')}</Link></li>
                                  </ul>
                               </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(withNamespaces()(SidebarContent));

