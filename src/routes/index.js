import React from "react";
import {Redirect} from "react-router-dom";

// Inner Authentication
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen";

//Crypto
import DashboardCrypto from "../pages/Dashboard-crypto/index";
import CryptoWallet from "../pages/Crypto/crypto-wallet";
import CryptoBuySell from "../pages/Crypto/crypto-buy-sell";
import CryptoExchange from "../pages/Crypto/crypto-exchange";
import SpartanPools from "../pages/Crypto/spartan-pools";
import Pools from "../ui/pages/Pools";
import CryptoOrders from "../pages/Crypto/crypto-orders";
import CryptoKYCApplication from "../pages/Crypto/crypto-kyc-application";

// Charts
import ChartApex from "../pages/Charts/Apexcharts";
import ChartistChart from "../pages/Charts/ChartistChart";
import ChartjsChart from "../pages/Charts/ChartjsChart";
import EChart from "../pages/Charts/EChart";
import SparklineChart from "../pages/Charts/SparklineChart";
import ToastUIChart from "../pages/Charts/ToastUIChart";
import ChartsKnob from "../pages/Charts/charts-knob";


//Icons
import IconBoxicons from "../pages/Icons/IconBoxicons";
import IconDripicons from "../pages/Icons/IconDripicons";
import IconMaterialdesign from "../pages/Icons/IconMaterialdesign";
import IconFontawesome from "../pages/Icons/IconFontawesome";

//Tables
import BasicTables from "../pages/Tables/BasicTables";
import DatatableTables from "../pages/Tables/DatatableTables";
import ResponsiveTables from "../pages/Tables/ResponsiveTables";
import EditableTables from "../pages/Tables/EditableTables";

// Forms
import FormElements from "../pages/Forms/FormElements";
import FormAdvanced from "../pages/Forms/FormAdvanced";
import FormEditors from "../pages/Forms/FormEditors";
import FormValidations from "../pages/Forms/FormValidations";
import FormMask from "../pages/Forms/FormMask";
import FormRepeater from "../pages/Forms/FormRepeater";
import FormUpload from "../pages/Forms/FormUpload";
import FormWizard from "../pages/Forms/FormWizard";
import FormXeditable from "../pages/Forms/FormXeditable";

//Ui
import UiAlert from "../pages/Ui/UiAlert";
import UiButtons from "../pages/Ui/UiButtons";
import UiCards from "../pages/Ui/UiCards";
import UiCarousel from "../pages/Ui/UiCarousel";
import UiColors from "../pages/Ui/UiColors";
import UiDropdown from "../pages/Ui/UiDropdown";
import UiGeneral from "../pages/Ui/UiGeneral";
import UiGrid from "../pages/Ui/UiGrid";
import UiImages from "../pages/Ui/UiImages";
import UiLightbox from "../pages/Ui/UiLightbox";
import UiModal from "../pages/Ui/UiModal";
import UiProgressbar from "../pages/Ui/UiProgressbar";
import UiSweetAlert from "../pages/Ui/UiSweetAlert";
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions";
import UiTypography from "../pages/Ui/UiTypography";
import UiVideo from "../pages/Ui/UiVideo";
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout";
import UiRating from "../pages/Ui/UiRating";
import UiRangeSlider from "../pages/Ui/UiRangeSlider";
import UiNotifications from "../pages/Ui/ui-notifications";
import UiImageCropper from "../pages/Ui/ui-image-cropper";

//Pages
import PagesStarter from "../pages/Utility/pages-starter";
import PagesMaintenance from "../pages/Utility/pages-maintenance";
import PagesComingsoon from "../pages/Utility/pages-comingsoon";
import PagesTimeline from "../pages/Utility/pages-timeline";
import PagesFaqs from "../pages/Utility/pages-faqs";
import PagesPricing from "../pages/Utility/pages-pricing";



const authProtectedRoutes = [

    //App pages
    {path: "/dashboard", component: DashboardCrypto},
    {path: "/pools", component: SpartanPools},
    {path: "/poolsssss", component: Pools},
    {path: "/crypto-wallet", component: CryptoWallet},
    {path: "/crypto-buy-sell", component: CryptoBuySell},
    {path: "/crypto-exchange", component: CryptoExchange},
    {path: "/crypto-orders", component: CryptoOrders},
    {path: "/crypto-kyc-application", component: CryptoKYCApplication},


    //Charts
    {path: "/apex-charts", component: ChartApex},
    {path: "/chartist-charts", component: ChartistChart},
    {path: "/chartjs-charts", component: ChartjsChart},
    {path: "/e-charts", component: EChart},
    {path: "/sparkline-charts", component: SparklineChart},
    {path: "/tui-charts", component: ToastUIChart},
    {path: "/charts-knob", component: ChartsKnob},

    // Icons
    {path: "/icons-boxicons", component: IconBoxicons},
    {path: "/icons-dripicons", component: IconDripicons},
    {path: "/icons-materialdesign", component: IconMaterialdesign},
    {path: "/icons-fontawesome", component: IconFontawesome},

    // Tables
    {path: "/tables-basic", component: BasicTables},
    {path: "/tables-datatable", component: DatatableTables},
    {path: "/tables-responsive", component: ResponsiveTables},
    {path: "/tables-editable", component: EditableTables},

    // Forms
    {path: "/form-elements", component: FormElements},
    {path: "/form-advanced", component: FormAdvanced},
    {path: "/form-editors", component: FormEditors},
    {path: "/form-mask", component: FormMask},
    {path: "/form-repeater", component: FormRepeater},
    {path: "/form-uploads", component: FormUpload},
    {path: "/form-wizard", component: FormWizard},
    {path: "/form-validation", component: FormValidations},
    {path: "/form-xeditable", component: FormXeditable},

    // Ui
    {path: "/ui-alerts", component: UiAlert},
    {path: "/ui-buttons", component: UiButtons},
    {path: "/ui-cards", component: UiCards},
    {path: "/ui-carousel", component: UiCarousel},
    {path: "/ui-colors", component: UiColors},
    {path: "/ui-dropdowns", component: UiDropdown},
    {path: "/ui-general", component: UiGeneral},
    {path: "/ui-grid", component: UiGrid},
    {path: "/ui-images", component: UiImages},
    {path: "/ui-lightbox", component: UiLightbox},
    {path: "/ui-modals", component: UiModal},
    {path: "/ui-progressbars", component: UiProgressbar},
    {path: "/ui-sweet-alert", component: UiSweetAlert},
    {path: "/ui-tabs-accordions", component: UiTabsAccordions},
    {path: "/ui-typography", component: UiTypography},
    {path: "/ui-video", component: UiVideo},
    {path: "/ui-session-timeout", component: UiSessionTimeout},
    {path: "/ui-rating", component: UiRating},
    {path: "/ui-rangeslider", component: UiRangeSlider},
    {path: "/ui-notifications", component: UiNotifications},
    {path: "/ui-image-cropper", component: UiImageCropper},

    //Utility
    {path: "/pages-starter", component: PagesStarter},
    {path: "/pages-timeline", component: PagesTimeline},
    {path: "/pages-faqs", component: PagesFaqs},
    {path: "/pages-pricing", component: PagesPricing},

    // this route should be at the end of all other routes
    {path: "/", exact: true, component: () => <Redirect to="/pools"/>}
];

const publicRoutes = [

    {path: "/pages-maintenance", component: PagesMaintenance},
    {path: "/pages-comingsoon", component: PagesComingsoon},

    // Authentication Inner
    {path: "/auth-lock-screen", component: LockScreen}
];

export {authProtectedRoutes, publicRoutes};
