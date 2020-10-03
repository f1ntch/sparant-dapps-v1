import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

//i18n
import i18n from '../../../i18n';
import { withNamespaces } from 'react-i18next';

// falgs
import usFlag from "../../../assets/images/flags/united-states.png";
import spain from "../../../assets/images/flags/china.png";
import germany from "../../../assets/images/flags/russia.png";
import italy from "../../../assets/images/flags/turkey.png";
import russia from "../../../assets/images/flags/russia.png";

class LanguageDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      lng : "English",
      flag : usFlag
    };
    this.toggle = this.toggle.bind(this);
    this.changeLanguageAction = this.changeLanguageAction.bind(this);
  }

  changeLanguageAction = (lng) => {

     //set language as i18n
     i18n.changeLanguage(lng);

    if(lng === "sp")
        this.setState({lng : "Spanish", flag : spain });
    else if(lng === "gr")
        this.setState({lng : "German", flag : germany });
    else if(lng === "rs")
        this.setState({lng : "Russian", flag : russia });
    else if(lng === "it")
        this.setState({lng : "Italian", flag : italy });
    else if(lng === "eng")
        this.setState({lng : "English", flag : usFlag });
  }

  toggle() {
    this.setState(prevState => ({
      menu: !prevState.menu
    }));
  }

  render() {

    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu}
          toggle={this.toggle}
          className="d-inline-block"
        >
          <DropdownToggle
            className="btn header-item waves-effect"
            tag="button"
          >
            <img
              src={this.state.flag}
              alt="Skote"
              height="16"
              className="mr-1"
            />
               <span className="align-middle">{this.state.lng}</span>
          </DropdownToggle>
          <DropdownMenu className="language-switch" right>
            <DropdownItem tag="a" href="#" onClick={() => this.changeLanguageAction('eng')} className={`notify-item ${this.state.lng === 'English' ? 'active' : 'none'}`}>
              <img src={usFlag} alt="Skote" className="mr-1" height="12" />
              <span className="align-middle">English</span>
            </DropdownItem>
            <DropdownItem tag="a" href="#" onClick={() => this.changeLanguageAction('sp')} className={`notify-item ${this.state.lng === 'Spanish' ? 'active' : 'none'}`}>
              <img src={spain} alt="Skote" className="mr-1" height="12" />
              <span className="align-middle">Chinese</span>
            </DropdownItem>
            <DropdownItem tag="a" href="#" onClick={() => this.changeLanguageAction('gr')} className={`notify-item ${this.state.lng === 'German' ? 'active' : 'none'}`}>
              <img src={germany} alt="Skote" className="mr-1" height="12" />
              <span className="align-middle">Russian</span>
            </DropdownItem>
            <DropdownItem tag="a" href="#" onClick={() => this.changeLanguageAction('it')} className={`notify-item ${this.state.lng === 'Italian' ? 'active' : 'none'}`}>
              <img src={italy} alt="Skote" className="mr-1" height="12" />
              <span className="align-middle">Turkish</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

export default withNamespaces()(LanguageDropdown);
