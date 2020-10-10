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
import Button from "antd/es/button";
import ReactApexChart from "react-apexcharts";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import PoolTable from "./PoolTable";
import PoolsPaneSide from "./PoolsPaneSide";


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


