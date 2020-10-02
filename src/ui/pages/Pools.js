import React, {useContext, useEffect, useState} from 'react'
import {Context} from '../../context'
import {Link} from 'react-router-dom'
import {Image, Table} from 'antd'

import {BNB_ADDR, getGlobalData, getListedPools, getListedTokens, getPoolsData} from '../../client/web3'
import {convertFromWei, formatUSD, formatUSDStatBoxes} from '../../utils'


import {LoadingOutlined, LoginOutlined, SwapOutlined} from '@ant-design/icons';
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
    Container,
    Row,
    Col,
    Card,
    CardBody, Media,
} from "reactstrap";
import CardWelcome from "../../pages/Dashboard-crypto/card-welcome";




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
                    <Breadcrumbs title="App" breadcrumbItem="Liquidity Pools"/>
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

    const context = useContext(Context);


    return (

        <React.Fragment>
            <Row>
                <Col sm={12} md={12}>
                    <CardWelcome/>
                </Col>
            </Row>
            <Row>
                <Col sm="3">

                    <Card className="mini-stats-wid">
                        <CardBody>
                            <Media>
                                <Media body>
                                    <p className="text-muted font-weight-medium">TOTAL POOLED</p>
                                    <h4 className="mb-0">{formatUSDStatBoxes(convertFromWei(props.globalData.totalPooled * 2), context.spartanPrice)}</h4>
                                </Media>
                            </Media>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="3">
                    <Card className="mini-stats-wid">
                        <CardBody>
                            <Media>
                                <Media body>
                                    <p className="text-muted font-weight-medium">TOTAL VOLUME</p>
                                    <h4 className="mb-0">{formatUSDStatBoxes(convertFromWei(props.globalData?.totalVolume), context.spartanPrice)}</h4>
                                </Media>
                            </Media>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="3">
                    <Card className="mini-stats-wid">
                        <CardBody>
                            <Media>
                                <Media body>
                                    <p className="text-muted font-weight-medium">TXN COUNT</p>
                                    <h4 className="mb-0">{+props.globalData?.addLiquidityTx + +props.globalData?.removeLiquidityTx + +props.globalData?.swapTx}</h4>
                                </Media>
                            </Media>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="3">
                    <Card className="mini-stats-wid">
                        <CardBody>
                            <Media>
                                <Media body>
                                    <p className="text-muted font-weight-medium">TOTAL EARNINGS</p>
                                    <h4 className="mb-0">{formatUSDStatBoxes(convertFromWei(props.globalData?.totalFees), context.spartanPrice)}</h4>
                                </Media>
                            </Media>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
};


const PoolTable = (props) => {

    const context = useContext(Context);

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getData = async () => {
        let tokenArray = await getListedTokens();
        context.setContext({'tokenArray': tokenArray});
        let poolArray = await getListedPools();
        context.setContext({'poolArray': poolArray});
        context.setContext({'poolsData': await getPoolsData(tokenArray)})
    };

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
