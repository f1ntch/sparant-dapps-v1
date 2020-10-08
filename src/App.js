import React from "react";

import HorizontalLayout from "./components/HorizontalLayout/";

import "./assets/scss/theme.scss";
import "./App.css";

import Pools from './pages/Pools.js'
import Shares from './pages/Shares'

import {Layout} from 'antd';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import AddLiquidity from './pages/AddLiquidity'
import Swap from './pages/Swap'
import CreatePool from './pages/CreatePool'
import {ContextProvider} from './context'
import PagesStarter from "./pages/Utility/pages-starter";
import PagesFaqs from "./pages/Utility/pages-faqs";


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

                                    <Route path="/" exact component={Pools}/>
                                    <Route path="/pool" exact component={Pools}/>
                                    <Route path="/share" exact component={Shares}/>
                                    <Route path="/pool/stake" exact component={AddLiquidity}/>
                                    <Route path="/pool/swap" exact component={Swap}/>
                                    <Route path="/pool/create" exact component={CreatePool}/>
                                    {/* <Route path="/dao" exact component={Dao} />
									<Route path="/earn" exact component={Earn} /> */}

                                    {/*Help*/}
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
