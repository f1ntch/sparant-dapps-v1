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
import FormGroup from "reactstrap/es/FormGroup";
import CustomInput from "reactstrap/es/CustomInput";



const ThemeSwitch = (props) => {

    function toggleTheme() {
        // Obtains an array of all <link>
        // elements.
        // Select your element using indexing.
        var theme = document.getElementsByTagName('link')[0];

        // Change the value of href attribute
        // to change the css sheet.
        if (theme.getAttribute('href') == 'light.css') {
            theme.setAttribute('href', 'dark.css');
        } else {
            theme.setAttribute('href', 'light.css');
        }
    }



    return (
    <React.Fragment>
        <form className="app-search">
            <div >
                <div >
                    <FormGroup>
                        <CustomInput type="switch" id="CustomSwitch"
                                     name="customSwitch"
                                     label="Lightmode"/>
                    </FormGroup>
                </div>
            </div>
        </form>
    </React.Fragment>
  );
}

export default withNamespaces()(ThemeSwitch);
