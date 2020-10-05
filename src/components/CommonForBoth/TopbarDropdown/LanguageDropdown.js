import React, { useState } from "react";
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

const LanguageDropdown = (props) => {

  const [menu,setMenu] = useState(false);
  const [lng,setLng] = useState("English");
  const [flag,setFlag] = useState(usFlag);

  const changeLanguageAction = (lng) => {

     //set language as i18n
     i18n.changeLanguage(lng);

    if(lng === "sp") {
        setFlag(spain);
        setLng("Spanish");
    }
    else if(lng === "gr") {
        setFlag(germany);
        setLng("German");
    }
    else if(lng === "rs") {
        setFlag(russia);
        setLng("Russian");
    }
    else if(lng === "it") {
        setFlag(italy);
        setLng("Italian");
    }
    else if(lng === "eng") {
        setFlag(usFlag);
        setLng("English");
    }
  }

  const toggle = () => {
    setMenu(!menu);
  }

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={toggle}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          tag="button"
        >
          <img
            src={flag}
            alt="Skote"
            height="16"
            className="mr-1"
          />
              <span className="align-middle">{lng}</span>
        </DropdownToggle>
        <DropdownMenu className="language-switch" right>
          <DropdownItem tag="a" href="#" onClick={() => changeLanguageAction('eng')} className={`notify-item ${lng === 'English' ? 'active' : 'none'}`}>
            <img src={usFlag} alt="Skote" className="mr-1" height="12" />
            <span className="align-middle">English</span>
          </DropdownItem>
          <DropdownItem tag="a" href="#" onClick={() => changeLanguageAction('sp')} className={`notify-item ${lng === 'Spanish' ? 'active' : 'none'}`}>
            <img src={spain} alt="Skote" className="mr-1" height="12" />
            <span className="align-middle">Chinese</span>
          </DropdownItem>
          <DropdownItem tag="a" href="#" onClick={() => changeLanguageAction('gr')} className={`notify-item ${lng === 'German' ? 'active' : 'none'}`}>
            <img src={germany} alt="Skote" className="mr-1" height="12" />
            <span className="align-middle">Russian</span>
          </DropdownItem>
          <DropdownItem tag="a" href="#" onClick={() => changeLanguageAction('it')} className={`notify-item ${lng === 'Italian' ? 'active' : 'none'}`}>
            <img src={italy} alt="Skote" className="mr-1" height="12" />
            <span className="align-middle">Turkish</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
}

export default withNamespaces()(LanguageDropdown);
