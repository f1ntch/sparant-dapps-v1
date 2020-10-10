import React, {useContext, useEffect, useState} from 'react'
import {Context} from '../context'
import {Table} from 'antd'
import { Link, withRouter } from "react-router-dom";

import {getGlobalData, getListedPools, getListedTokens, getPoolsData} from '../client/web3'
import {convertFromWei, formatUSD, formatUSDStatBoxes} from '../utils'

import {LoadingOutlined} from '@ant-design/icons';
import Breadcrumbs from "../components/Common/Breadcrumb";

import { TokenIcon } from '../components/common';

import {
    Container,
    Row,
    Col,
    Card,
    CardBody, 
    Media,
} from "reactstrap";
import CardWelcome from "./Utility/card-welcome";
import { withNamespaces } from 'react-i18next';

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
        if (context.poolsData) {
            getData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.poolsData])

    const getData = async () => {
        setGlobalData(await getGlobalData())
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs title={props.t("App")} breadcrumbItem={props.t("Liquidity Pools")}/>
                    <Row>
                        <Col xs="12">
                            <h1>{props.t('Pools')}</h1>
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

export default withRouter(withNamespaces()(Pools));


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
        context.setContext({'poolsData': await getPoolsData(tokenArray)})
        context.setContext({'tokenArray': tokenArray});
        let poolArray = await getListedPools();
        context.setContext({'poolArray': poolArray});
    };


    const columns = [
        {
            title: 'POOL',
            render: (record) => (
                <div>
                    <TokenIcon address={record.address}/>
                </div>
            )
        },
        {
            title: 'Symbol',
            render: (record) => (
                <h3>{record.symbol}</h3>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            responsive: ['sm'],
            render: (price) => (
                <h3>{formatUSD(price, context.spartanPrice)}</h3>
            )
        },
        {
            title: 'Depth',
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
            title: 'Volume',
            dataIndex: 'volume',
            key: 'volume',
            responsive: ['sm'],
            render: (volume) => (
                <h3>{formatUSDStatBoxes(convertFromWei(volume), context.spartanPrice)}</h3>
            )
        },
        {
            title: 'Txns',
            dataIndex: 'txCount',
            key: 'txCount',
            responsive: ['md'],
            render: (txCount) => (
                <h3>{txCount.toLocaleString()}</h3>
            )
        },
        {
            title: 'Revenue',
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
                        <div
                            className="btn-group"
                            role="group"
                        >

                            <Link to={`/pool/stake?pool=${record.address}`}>
                                <button type="button" className="btn btn-primary waves-effect waves-light">
                                    <i className="bx bx-log-in-circle font-size-16 align-middle mr-2"></i> Join
                            </button></Link>

                            <Link to={`/pool/swap?pool=${record.address}`}>
                                <button type="button" className="btn btn-primary waves-effect waves-light">
                                    <i className="bx bx-transfer-alt font-size-16 align-middle mr-2"></i> Trade
                                </button></Link>
                        </div>


            )
        }
    ];

    return (
        <>
            <Row>
                <Col sm={12} md={12}>
                    <Card>
                        {!context.poolsData &&
                        <div style={{textAlign: "center"}}><LoadingOutlined/></div>
                        }
                        {context.poolsData &&

                        <Table
                            dataSource={context.poolsData}
                            columns={columns} pagination={false}
                            rowKey="symbol"/>
                        }
                    </Card>
                </Col>
            </Row>
        </>
    )
};
