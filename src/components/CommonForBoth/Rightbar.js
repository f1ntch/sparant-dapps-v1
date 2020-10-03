import React, { Component, useEffect, useContext, useState } from 'react';
import { Context } from '../../context'
import { Row, Col, Card, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from 'classnames';

import {Image, Table} from 'antd'
import {LoadingOutlined} from '@ant-design/icons';

import { connect } from "react-redux";
import {
  hideRightSidebar,
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType, changePreloader,
  changeTopbarTheme
} from "../../store/actions";

import {BNB_ADDR} from '../../client/web3'
import {formatUnits, convertFromWei} from '../../utils'

//SimpleBar
import SimpleBar from "simplebar-react";

import { Link } from "react-router-dom";

import "./rightbar.scss";

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
        <div className="right-bar dark-bg">

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
                  <Example />
                </div>
              </div>

            </div>

          </SimpleBar>
        </div>
        <div className="rightbar-overlay"></div>
      </React.Fragment>
    );
  }
}

export const Example = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
          Assets
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
            >
            LP Shares
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <AssetTable />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <PoolShareTable />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </>
  );
}

const mapStatetoProps = state => {
  return { ...state.Layout };
};

export const AssetTable = () => {

    const context = useContext(Context);

    useEffect(() => {
        // updateWallet()

    }, [context.transaction])

    // const updateWallet = async () => {
    //     context.setContext({ walletData: await getWalletData(context.poolArray) })
    // }

    const columns = [
        {
          title: 'Symbol',
          render: (record) => (
            <div>
                {record.address === BNB_ADDR &&
                <img
                    src={"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png"}
                    style={{height: 40}} alt='BNB'/>
                }

                {record.address !== BNB_ADDR &&
                <Image
                    width={40}
                    height={40}
                    src={"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/" + record.address + "/logo.png"}
                    fallback="../fallback.png"
                />
                }
            </div>
          )
        },
        {
          title: 'Balance',
          render: (record) => (
            <div>
              <h5>{formatUnits(convertFromWei(record.balance))}</h5>
              <h6>{record.symbol}</h6>
            </div>
          )
        }
    ]

    return (
      <div>
        <br/>
          {!context.connected &&
            <div style={{textAlign:"center"}}><LoadingOutlined/></div>
          }
          {context.connected &&

          <Table
              dataSource={context.walletData.tokens}
              columns={columns}
              pagination={false}
              rowKey="symbol"/>
          }
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
          title: 'Symbol',
          render: (record) => (
            <div>
                <Image
                    width={40}
                    height={40}
                    src={"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/" + record.address + "/logo.png"}
                    fallback="../fallback.png"
                />
            </div>
          )
        },
        {
          title: 'Balance',
          render: (record) => (
            <div>
              <h5>{formatUnits(convertFromWei(record.units))}</h5>
              <h6>{record.symbol}</h6>
            </div>
          )
        }
    ]

    return (
        <div>
            <br/>
            {!context.connected &&
              <div style={{textAlign:"center"}}><LoadingOutlined/></div>
            }
            {context.connected &&
              <Table dataSource={context.stakesData}
                  columns={columns}
                  pagination={false}
                  rowKey="symbol" />
            }
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
