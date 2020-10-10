import React, {useContext, useEffect, useState} from 'react'
import {Context} from '../context'
import {Link, withRouter} from "react-router-dom";

import {getGlobalData, getListedPools, getListedTokens, getPoolsData} from '../client/web3'
import {convertFromWei, formatUSD, formatUSDStatBoxes} from '../utils'

import {LoadingOutlined} from '@ant-design/icons';
import Breadcrumbs from "../components/Common/Breadcrumb";

import {TokenIcon} from '../components/common';

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Media,
    Table,
} from "reactstrap";
import CardWelcome from "./Utility/card-welcome";
import {withNamespaces} from 'react-i18next';
import CardTitle from "reactstrap/es/CardTitle";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import Button from "antd/es/button";

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

    return (
        <>
            <Row>
                <Col sm={12}>
                    <Card>
                        <CardBody>
                            {!context.poolsData &&
                            <div style={{textAlign: "center"}}><LoadingOutlined/></div>
                            }

                            {context.poolsData &&

                            < div className="table-responsive">
                                <CardTitle>Pool Table</CardTitle>
                                <Table className="table-centered mb-0">

                                    <thead className="center">
                                    <tr>
                                        <th scope="col">Icon</th>
                                        <th scope="col">Symbol</th>
                                        <th className="d-none d-lg-table-cell" scope="col">Price</th>
                                        <th className="d-none d-lg-table-cell" scope="col">Depth</th>
                                        <th className="d-none d-lg-table-cell" scope="col">Volume</th>
                                        <th className="d-none d-lg-table-cell" scope="col">Txns</th>
                                        <th className="d-none d-lg-table-cell" scope="col">Revenue</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {context.poolsData.map(c =>
                                        <PoolTableItem scope="row"
                                                       address={c.address}
                                                       symbol={c.symbol}
                                                       price={c.price}
                                                       depth={c.depth}
                                                       volume={c.volume}
                                                       txCount={c.txCount}
                                                       fees={c.fees}
                                        />
                                    )}
                                    </tbody>
                                </Table>
                            </div>
                            }
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
};

const PoolTableItem = (props) => {

    const context = useContext(Context);

    return (
        <>

            <tr>
                <td>

                    <TokenIcon address={props.address}/>

                </td>

                <td>
                    {props.symbol}
                </td>
                <td className="d-none d-lg-table-cell">
                    {formatUSD(props.price, context.spartanPrice)}
                </td>
                <td className="d-none d-lg-table-cell">
                    {formatUSDStatBoxes(convertFromWei(props.depth), context.spartanPrice)}
                </td>
                <td className="d-none d-lg-table-cell">
                    {formatUSDStatBoxes(convertFromWei(props.volume), context.spartanPrice)}
                </td>
                <td className="d-none d-lg-table-cell">
                    {props.txCount.toLocaleString()}
                </td>
                <td className="d-none d-lg-table-cell">
                    {formatUSDStatBoxes(convertFromWei(props.fees), context.spartanPrice)}
                </td>
                    <td>
                        <Link to={`/pool/stake?pool=${props.address}`}>
                            <Button color="primary"
                                    className="btn btn-primary waves-effect waves-light mr-4">
                                <i className="bx bx-log-in-circle"></i> Join
                            </Button>
                        </Link>
                        <Link to={`/pool/swap?pool=${props.address}`}>
                            <button type="button"
                                    className="btn btn-primary waves-effect waves-light">
                                <i className="bx bx-transfer-alt"></i> Trade
                            </button>
                        </Link>
                    </td>

            </tr>
        </>
    )
}