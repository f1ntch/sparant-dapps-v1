import React, {useContext, useEffect, useState} from 'react'
import {Context} from '../../context'
import {Link} from 'react-router-dom'
import {Image,Table} from 'antd'

import {BNB_ADDR, getGlobalData, getListedPools, getListedTokens, getPoolsData} from '../../client/web3'
import {convertFromWei, formatUSD, formatUSDStatBoxes} from '../../utils'

import {LoadingOutlined, LoginOutlined, SwapOutlined} from '@ant-design/icons';
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
} from "reactstrap";


const Pools = (props) => {

    const context = useContext(Context)
    const [globalData, setGlobalData] = useState({
        totalPooled: 0,
        totalFees: 0,
        totalVolume: 0,
        addLiquidityTx: 0,
        removeLiquidityTx: 0,
        swapTx: 0,
    });

    useEffect(() => {
        if (context.connected) {
            getData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.connected])

    const getData = async () => {
        setGlobalData(await getGlobalData())
    }

    return (
      <React.Fragment>
          <div className="page-content">
              <Container fluid>
                  {/* Render Breadcrumb */}
                  <Breadcrumbs title="App" breadcrumbItem="Liquidity Pools" />
                  <Row>
                    <Col xs="12">
                      <PoolsPaneSide globalData={globalData}/>
                    </Col>
                    <Col xs="12">
                      <PoolTable/>
                    </Col>
                  </Row>
              </Container>
          </div>
      </React.Fragment>
    )
};

export default Pools;

export const PoolsPaneSide = (props) => {

    const context = useContext(Context)

    return (
        <div>
            <React.Fragment>
                <div>
                    <Container fluid>

                        <Row>
                            <Col>
                                <Card>
                                    <CardBody>
                                        <h4 className="card-title">Pool Stats</h4>

                                        <Row>
                                            <Col lg="6">
                                                <div className="border p-3 rounded mt-4">
                                                    <div className="d-flex align-items-center mb-3">
                                                        <div className="avatar-xs mr-3">
                                                            <span
                                                                className="avatar-title rounded-circle bg-soft-warning text-warning font-size-18">
                                                                <i className="mdi mdi-bank-transfer"></i>
                                                            </span>
                                                        </div>
                                                        <h5 className="font-size-14 mb-0">Total Pooled</h5>
                                                    </div>
                                                    <Row>
                                                        <Col lg="6">
                                                            <div className="text-muted mt-3">
                                                                <p>Annual XXX</p>
                                                                <h4>XXX</h4>
                                                                <p className="mb-0">0.00745 BTC</p>

                                                            </div>
                                                        </Col>
                                                        <Col lg="6" className="align-self-end">
                                                            <div className="float-right mt-3">
                                                                <Link to="#" className="btn btn-primary">Select</Link>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col lg="6">
                                                <div className="border p-3 rounded mt-4">
                                                    <div className="d-flex align-items-center mb-3">
                                                        <div className="avatar-xs mr-3">
                                                            <span
                                                                className="avatar-title rounded-circle bg-soft-primary text-primary font-size-18">
                                                                <i className="mdi mdi-bank-transfer"></i>
                                                            </span>
                                                        </div>
                                                        <h5 className="font-size-14 mb-0">Total Volume</h5>
                                                    </div>

                                                    <Row>
                                                        <Col lg="6">
                                                            <div className="text-muted mt-3">
                                                                <p>Annual Yield</p>
                                                                <h4>5.08 %</h4>
                                                                <p className="mb-0">0.0056 ETH</p>
                                                            </div>
                                                        </Col>

                                                        <Col lg="6" className="align-self-end">
                                                            <div className="float-right mt-3">
                                                                <Link to="#" className="btn btn-primary">Select</Link>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col lg="6">
                                                <div className="border p-3 rounded mt-4">
                                                    <div className="d-flex align-items-center mb-3">
                                                        <div className="avatar-xs mr-3">
                                                            <span
                                                                className="avatar-title rounded-circle bg-soft-info text-info font-size-18">
                                                                <i className="mdi mdi-bank-transfer"></i>
                                                            </span>
                                                        </div>
                                                        <h5 className="font-size-14 mb-0">Txn Count</h5>
                                                    </div>

                                                    <Row>
                                                        <Col lg="6">
                                                            <div className="text-muted mt-3">
                                                                <p>Annual Yield</p>
                                                                <h4 className="strong">{+props.globalData?.addLiquidityTx + +props.globalData?.removeLiquidityTx + +props.globalData?.swapTx}</h4>
                                                                <p className="mb-0">0.00245 LTC</p>

                                                            </div>
                                                        </Col>

                                                        <Col lg="6" className="align-self-end">
                                                            <div className="float-right mt-3">
                                                                <Link to="#" className="btn btn-primary">Select</Link>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col lg="6">
                                                <div className="border p-3 rounded mt-4">
                                                    <div className="d-flex align-items-center mb-3">
                                                        <div className="avatar-xs mr-3">
                                                            <span
                                                                className="avatar-title rounded-circle bg-soft-info text-info font-size-18">
                                                                <i className="mdi mdi-bank-transfer"></i>
                                                            </span>
                                                        </div>
                                                        <h5 className="font-size-14 mb-0">Total Earnings</h5>
                                                    </div>

                                                    <Row>
                                                        <Col lg="6">
                                                            <div className="text-muted mt-3">
                                                                <p>Annual Yield</p>
                                                                <h4>4.12 %</h4>
                                                                <p className="mb-0">0.00245 LTC</p>

                                                            </div>
                                                        </Col>

                                                        <Col lg="6" className="align-self-end">
                                                            <div className="float-right mt-3">
                                                                <Link to="#" className="btn btn-primary">Select</Link>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>

                                    </CardBody>
                                </Card>
                            </Col>

                        </Row>

                    </Container>
                </div>


            </React.Fragment>

            {/*<Row type="flex" justify="center" align="middle">*/}
            {/*    <Col md={2}>*/}
            {/*    </Col>*/}
            {/*    <Col xs={12} md={5}>*/}
            {/*        <Card className="leftbar">*/}
            {/*            <h5 className="strong">TOTAL POOLED</h5>*/}

            {/*            <h4 className="strong">{formatUSDStatBoxes(convertFromWei(props.globalData.totalPooled * 2), context.spartanPrice)}</h4>*/}


            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*    <Col xs={12} md={5}>*/}
            {/*        <Card className="rightbar">*/}
            {/*            <h5 className="strong">TOTAL VOLUME</h5>*/}
            {/*            <h4 className="strong">{formatUSDStatBoxes(convertFromWei(props.globalData?.totalVolume), context.spartanPrice)}</h4>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*    <Col xs={12} md={5}>*/}
            {/*        <Card className="leftbar">*/}
            {/*            <h5 className="strong">TXN COUNT</h5>*/}
            {/*            <h4 className="strong">{+props.globalData?.addLiquidityTx + +props.globalData?.removeLiquidityTx + +props.globalData?.swapTx}</h4>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*    <Col xs={12} md={5}>*/}
            {/*        <Card className="rightbar">*/}
            {/*            <h5 className="strong">TOTAL EARNINGS</h5>*/}
            {/*            <h4 className="strong">{formatUSDStatBoxes(convertFromWei(props.globalData?.totalFees), context.spartanPrice)}</h4>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*    <Col md={2}>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </div>
    )
};


const PoolTable = (props) => {

    const context = useContext(Context);

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getData = async () => {
        let tokenArray = await getListedTokens()
        context.setContext({'tokenArray': tokenArray})
        let poolArray = await getListedPools()
        context.setContext({'poolArray': poolArray})
        context.setContext({'poolsData': await getPoolsData(tokenArray)})
    }

    const columns = [
        {
            title: 'POOL',
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
            title: 'SYMBOL',
            render: (record) => (
                <h3>{record.symbol}</h3>
            )
        },
        {
            title: 'PRICE',
            dataIndex: 'price',
            key: 'price',
            responsive: ['sm'],
            render: (price) => (
                <h3>{formatUSD(price, context.spartanPrice)}</h3>
            )
        },
        {
            title: 'DEPTH',
            dataIndex: 'depth',
            key: 'depth',
            responsive: ['sm'],
            sorter: (a, b) => a.depth - b.depth,
            sortOrder: 'descend',
            render: (depth) => (
                <h3>{formatUSDStatBoxes(convertFromWei(depth), context.spartanPrice)}</h3>


            )
        },
        {
            title: 'VOLUME',
            dataIndex: 'volume',
            key: 'volume',
            responsive: ['sm'],
            render: (volume) => (
                <h3>{formatUSDStatBoxes(convertFromWei(volume), context.spartanPrice)}</h3>
            )
        },
        {
            title: 'TXNS',
            dataIndex: 'txCount',
            key: 'txCount',
            responsive: ['md'],
            render: (txCount) => (
                <h3>{txCount.toLocaleString()}</h3>
            )
        },
        {
            title: 'REVENUE',
            dataIndex: 'fees',
            key: 'fees',
            responsive: ['md'],
            render: (fees) => (
                <h3>{formatUSDStatBoxes(convertFromWei(fees), context.spartanPrice)}</h3>
            )
        },
        {
            // title: <a href="/pool/create">
            //     <Col xs={24} className="cntr btn secondary">
            //         <PlusCircleOutlined/> CREATE POOL
            //     </Col>
            // </a>,
            render: (record) => (
                <Row type="flex" justify="center" align="middle">
                    <Col className="btn primary">
                        <Link to={`/pool/stake?pool=${record.address}`}>
                            <LoginOutlined/> JOIN
                        </Link>
                    </Col>
                    <Col className="btn primary">
                        <Link to={`/pool/swap?pool=${record.address}`}>
                            <SwapOutlined/> TRADE
                        </Link>
                    </Col>
                </Row>

            )
        }
    ];

    return (
        <>
          <Card>
            <Container fluid>
              {!context.connected &&
              <LoadingOutlined/>
              }
              {context.connected &&
              <Row>
                  <Col xs={24}>
                      <Table
                          dataSource={context.poolsData}
                          columns={columns} pagination={false}
                          rowKey="symbol"/>
                  </Col>
              </Row>
              }
              <br/>
            </Container>
          </Card>
        </>
    )
};
