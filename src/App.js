import React, { Component } from "react";

import { connect } from "react-redux";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/route";

// layouts
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";

import Pools from './ui/pages/Pools.js'

import SpartanPools from '../src/pages/Crypto/spartan-pools'

import { Layout } from 'antd';
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";

import AddLiquidity from './ui/pages/AddLiquidity'
import Swap from './ui/pages/Swap'
import CreatePool from './ui/pages/CreatePool'
import { ContextProvider } from './context'

const {Content } = Layout;

const App = () => {

	return (
		<Router>
			<Layout>

				<ContextProvider>
					<VerticalLayout />
					<Layout>
						<Content>
							<div className="wrapper">
								<Switch>
									<Route path="/" exact component={Pools} />
									{/* <Route path="/dao" exact component={Dao} />
									<Route path="/earn" exact component={Earn} /> */}
									<Route path="/pools" exact component={Pools} />
									<Route path="/test" exact component={SpartanPools} />
									<Route path="/pool/stake" exact component={AddLiquidity} />
									<Route path="/pool/swap" exact component={Swap} />
									<Route path="/pool/create" exact component={CreatePool} />
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
