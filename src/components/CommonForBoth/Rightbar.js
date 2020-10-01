import React, { Component, useEffect, useContext, useState } from 'react';
import { Context } from '../../context'
import { FormGroup } from "reactstrap";

import { connect } from "react-redux";
import {
  hideRightSidebar,
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType, changePreloader,
  changeTopbarTheme
} from "../../store/actions";

//SimpleBar
import SimpleBar from "simplebar-react";

import { Link } from "react-router-dom";

import "./rightbar.scss";
//Import images
import layout1 from "../../assets/images/layouts/layout-1.jpg";
import layout2 from "../../assets/images/layouts/layout-2.jpg";
import layout3 from "../../assets/images/layouts/layout-3.jpg";

class RightSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutType: this.props.layoutType,
      sidebarType: this.props.leftSideBarType,
      layoutWidth: this.props.layoutWidth,
      sidebarTheme: this.props.leftSideBarTheme,
      topbarTheme: this.props.topbarTheme,
    };
    this.hideRightbar = this.hideRightbar.bind(this);
    this.changeLayout = this.changeLayout.bind(this);
    this.changeLayoutWidth = this.changeLayoutWidth.bind(this);
    this.changeLeftSidebarTheme = this.changeLeftSidebarTheme.bind(this);
    this.changeLeftSidebarType = this.changeLeftSidebarType.bind(this);
    this.changeTopbarTheme = this.changeTopbarTheme.bind(this);
    this.changeThemePreloader = this.changeThemePreloader.bind(this);
  }

  /**
    * Hides the right sidebar
    */
  hideRightbar(e) {
    e.preventDefault();
    this.props.hideRightSidebar();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        layoutType: this.props.layoutType,
        sidebarType: this.props.leftSideBarType,
        layoutWidth: this.props.layoutWidth,
        sidebarTheme: this.props.leftSideBarTheme,
        topbarTheme: this.props.topbarTheme
      });
    }
  }

  changeThemePreloader = () => {
    this.props.changePreloader(!this.props.isPreloader);
  }
  /**
   * Change the layout
   * @param {*} e
   */
  changeLayout(e) {
    if (e.target.checked) {
      this.props.changeLayout(e.target.value);
    }
  }

  /**
   * Changes layout width
   * @param {*} e
   */
  changeLayoutWidth(e) {
    if (e.target.checked) {
      this.props.changeLayoutWidth(e.target.value);
    }
  }

  // change left sidebar design
  changeLeftSidebarType(e) {
    if (e.target.checked) {
      this.props.changeSidebarType(e.target.value);
    }
  }

  // change left sidebar theme
  changeLeftSidebarTheme(e) {
    if (e.target.checked) {
      this.props.changeSidebarTheme(e.target.value);
    }
  }

  // change topbar theme
  changeTopbarTheme(e) {
    if (e.target.checked) {
      this.props.changeTopbarTheme(e.target.value);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="right-bar">

          <SimpleBar style={{ height: "900px" }}>
            <div data-simplebar className="h-100">
              <div className="rightbar-title px-3 py-4">
                <Link to="#" onClick={this.hideRightbar} className="right-bar-toggle float-right">
                  <i className="mdi mdi-close noti-icon"></i>
                </Link>
                <h5 className="m-0">Wallet</h5>
              </div>

              <div className="p-4">
                <div className="radio-toolbar">
                  <span className="mb-2 d-block">Assets</span>
                  <AssetTable />
                </div>
                <hr className="mt-1" />
                  <span className="mb-2 d-block">Pool Shares</span>
                  <PoolShareTable />
              </div>

            </div>

          </SimpleBar>
        </div>
        <div className="rightbar-overlay"></div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return { ...state.Layout };
};

export const AssetTable = () => {

    const context = useContext(Context)
    useEffect(() => {
        // updateWallet()

    }, [context.transaction])

    // const updateWallet = async () => {
    //     context.setContext({ walletData: await getWalletData(context.poolArray) })
    // }

    const columns = [
        {
            render: (record) => (
                <div>
                    {/*<CoinRow
                            symbol={record.symbol}
                            name={record.name}
                            balance={record.balance}
                            address={record.address}
                            size={32} />*/}
                </div>
            )
        }
    ]

    return (
        <div>
            Show 'assets/tokens' held in wallet here
            {/*<Table dataSource={context.walletData.tokens}
                pagination={false}
                showHeader={false}
                columns={columns}
                rowKey="symbol" />*/}
        </div>
    )
}

export const PoolShareTable = () => {

    const context = useContext(Context)

    useEffect(() => {
        // getPoolSharess()
        // console.log(context.stakes)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const columns = [
        {
            render: (record) => (
                <div>
                    {/*<CoinRow
                            symbol={record.symbol}
                            name={record.name}
                            balance={record.units}
                            size={32} />*/}
                </div>
            )
        }
    ]

    return (
        <div>
            Show 'Liquidity pool tokens' held in wallet here
            {/*<Table dataSource={context.stakesData}
                pagination={false}
                showHeader={false}
                columns={columns}
                rowKey="symbol" />*/}
        </div>
    )
}

export default connect(mapStatetoProps, {
  hideRightSidebar,
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeLayoutWidth,
  changeTopbarTheme,
  changePreloader
})(RightSidebar);
