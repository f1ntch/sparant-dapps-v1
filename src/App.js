import React, {Component} from "react";

import {connect} from "react-redux";

// Import Routes
import {authProtectedRoutes, publicRoutes} from "./routes/";
import AppRoute from "./routes/route";

// layouts
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";


// Import scss
import "./assets/scss/theme.scss";
import "./App.css";


import Pools from './pages/Pools.js'


import SpartanPools from '../src/pages/Crypto/crypto-exchange'

import {Layout} from 'antd';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import AddLiquidity from './pages/AddLiquidity'
import Swap from './pages/Swap'
import CreatePool from './pages/CreatePool'
import {ContextProvider} from './context'
import DashboardCrypto from "./pages/Dashboard-crypto";
import PagesStarter from "./pages/Utility/pages-starter";
import PagesMaintenance from "./pages/Utility/pages-maintenance";
import PagesFaqs from "./pages/Utility/pages-faqs";
import LockScreen from "./pages/AuthenticationInner/auth-lock-screen";

const {Content} = Layout;

const App = () => {

    return (
        <Router>
            <Layout>
                <ContextProvider>
                    <HorizontalLayout/>
                    <Layout>
                        <Content>
                            <div className="wrapper">
                                <Switch>
                                    // Homepage
                                    <Route path="/" exact component={DashboardCrypto}/>

                                    // Overview
                                    <Route path="/overview" exact component={DashboardCrypto}/>

                                    // Apps
                                    <Route path="/pools" exact component={Pools}/>
                                    <Route path="/test" exact component={SpartanPools}/>
                                    <Route path="/pool/stake" exact component={AddLiquidity}/>
                                    <Route path="/pool/swap" exact component={Swap}/>
                                    <Route path="/pool/create" exact component={CreatePool}/>
                                    {/* <Route path="/dao" exact component={Dao} />
									<Route path="/earn" exact component={Earn} /> */}

                                    // Help
                                    <Route path="/start" exact component={PagesStarter}/>
                                    <Route path="/faq" exact component={PagesFaqs}/>


                                </Switch>
                            </div>
                        </Content>
                    </Layout>
                </ContextProvider>

            </Layout>

        </Router>

    );
}

export default App;
