import React, {useEffect, useState, useContext} from 'react'
import {Context} from '../context'
import {Tabs, message} from 'antd';
import {Link} from "react-router-dom";

import {
    Container,
    Row,
    Col,
    Card,
    CardBody, Media, Modal, ModalHeader, ModalBody, ModalFooter, Button
} from "reactstrap";
import {LoadingOutlined, LeftOutlined, DoubleRightOutlined, UnlockOutlined} from '@ant-design/icons';

import {withRouter} from 'react-router-dom';
import queryString from 'query-string';

import {BreadcrumbCombo, InputPane, PoolPaneSide,} from '../components/common'
import {HR, Sublabel, LabelGroup} from '../components/elements';
import {bn, formatBN, convertFromWei, convertToWei} from '../utils'
import {getSwapOutput, getSwapSlip} from '../math'

import {
    BNB_ADDR, SPARTA_ADDR, ROUTER_ADDR, getRouterContract, getTokenContract, getListedTokens,
    getPoolData, getNewTokenData, getTokenDetails,
    getListedPools, getPoolsData, getPool
} from '../client/web3'
import Breadcrumbs from "../components/Common/Breadcrumb";
import {PoolsPaneSide} from "./Pools";

const {TabPane} = Tabs;

const NewSwap = (props) => {

    const context = useContext(Context)
    const [poolURL, setPoolURL] = useState('')
    const [pool, setPool] = useState({
        'symbol': 'XXX',
        'name': 'XXX',
        'address': BNB_ADDR,
        'price': 0,
        'volume': 0,
        'baseAmount': 0,
        'tokenAmount': 0,
        'depth': 0,
        'txCount': 0,
        'apy': 0,
        'units': 0,
        'fees': 0
    })

    const [inputTokenData, setInputTokenData] = useState({
        'symbol': 'XXX',
        'name': 'XXX',
        'balance': 0,
        'address': SPARTA_ADDR
    })
    const [outputTokenData, setOutputTokenData] = useState({
        'symbol': 'XXX',
        'name': 'XXX',
        'balance': 0,
        'address': BNB_ADDR
    })

    const [buyData, setBuyData] = useState({
        address: SPARTA_ADDR,
        balance: 0,
        input: 0,
        symbol: "XXX",
        output: 0,
        outputSymbol: "XXX",
        slip: 0
    })
    const [sellData, setSellData] = useState({
        address: BNB_ADDR,
        balance: 0,
        input: 0,
        symbol: "XXX",
        output: 0,
        outputSymbol: "XXX",
        slip: 0
    })

    const [approval, setApproval] = useState(false)
    const [approvalS, setApprovalS] = useState(false)
    const [startTx, setStartTx] = useState(false);
    const [endTx, setEndTx] = useState(false);

    useEffect(() => {
        if (context.connected) {
            getPools()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.connected])

    const getPools = async () => {
        let tokenArray = await getListedTokens()
        context.setContext({'tokenArray': tokenArray})
        let poolArray = await getListedPools()
        context.setContext({'poolArray': poolArray})
        context.setContext({'poolsData': await getPoolsData(tokenArray)})
    }

    useEffect(() => {
        if (context.poolsData) {
            getData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.connected, context.poolsData])

    const getData = async () => {
        let params = queryString.parse(props.location.search)
        setPoolURL(params.pool)
        const pool = await getPoolData(params.pool, context.poolsData)
        setPool(pool)

        const inputTokenData = await getNewTokenData(SPARTA_ADDR, context.walletData.address)
        const outputTokenData = await getNewTokenData(pool.address, context.walletData.address)
        setInputTokenData(inputTokenData)
        setOutputTokenData(outputTokenData)

        setBuyData(await getSwapData(inputTokenData?.balance, inputTokenData, outputTokenData, pool, false))
        setSellData(await getSwapData(outputTokenData?.balance, outputTokenData, inputTokenData, pool, true))

        await checkApproval(SPARTA_ADDR) ? setApprovalS(true) : setApprovalS(false)
        await checkApproval(pool.address) ? setApproval(true) : setApproval(false)

        // console.log(await checkApproval(SPARTA_ADDR))

    }

    const getSwapData = async (input, inputTokenData, outputTokenData, poolData, toBase) => {

        var output;
        var slip
        output = getSwapOutput(input, poolData, toBase)
        slip = getSwapSlip(input, poolData, toBase)
        console.log(formatBN(output), formatBN(slip))

        const swapData = {
            address: poolData.address,
            balance: inputTokenData?.balance,
            input: formatBN(bn(input), 0),
            symbol: inputTokenData?.symbol,
            output: formatBN(output, 0),
            outputSymbol: outputTokenData?.symbol,
            slip: formatBN(slip)
        }
        console.log(swapData)
        return swapData
    }

    const checkApproval = async (address) => {
        if (address === BNB_ADDR) {
            return true
        } else {
            const contract = getTokenContract(address)
            const approval = await contract.methods.allowance(context.walletData.address, ROUTER_ADDR).call()
            console.log(approval, address)
            if (+approval > 0) {
                return true
            } else {
                return false
            }
        }
    }

    const onBuyChange = async (e) => {
        setBuyData(await getSwapData(convertToWei(e.target.value), inputTokenData, outputTokenData, pool, false))
    }

    const changeBuyAmount = async (amount) => {
        const finalAmt = (amount * buyData?.balance) / 100
        setBuyData(await getSwapData(finalAmt, inputTokenData, outputTokenData, pool, false))
    }

    const onSellChange = async (e) => {
        setSellData(await getSwapData(convertToWei(e.target.value), outputTokenData, inputTokenData, pool, true))
    }

    const changeSellAmount = async (amount) => {
        const finalAmt = (amount * sellData?.balance) / 100
        setSellData(await getSwapData(finalAmt, outputTokenData, inputTokenData, pool, true))
    }

    const unlockSparta = async () => {
        unlock(SPARTA_ADDR)
    }

    const unlockToken = async () => {
        unlock(pool.address)
    }

    const unlock = async (address) => {
        const contract = getTokenContract(address)
        const supply = await contract.methods.totalSupply().call()
        await contract.methods.approve(ROUTER_ADDR, supply).send({
            from: context.walletData.address,
            gasPrice: '',
            gas: ''
        })
        message.success(`Approved!`, 2);
        await checkApproval(SPARTA_ADDR) ? setApprovalS(true) : setApprovalS(false)
        await checkApproval(pool.address) ? setApproval(true) : setApproval(false)
    }

    const buy = async () => {
        setStartTx(true)
        let contract = getRouterContract()
        console.log(buyData.input, outputTokenData.symbol, poolURL)
        await contract.methods.swap(buyData.input, SPARTA_ADDR, poolURL).send({
            from: context.walletData.address,
            gasPrice: '',
            gas: ''
        })
        message.success(`Transaction Sent!`, 2);
        setStartTx(false)
        setEndTx(true)
        updatePool()
        context.setContext({'tokenDetailsArray': await getTokenDetails(context.walletData.address, context.tokenArray)})
    }

    const sell = async () => {
        setStartTx(true)
        let contract = getRouterContract()
        console.log(sellData.input, outputTokenData.symbol, poolURL)
        await contract.methods.swap(sellData.input, poolURL, SPARTA_ADDR).send({
            from: context.walletData.address,
            gasPrice: '',
            gas: '',
            value: pool.address === BNB_ADDR ? sellData.input : 0
        })
        message.success(`Transaction Sent!`, 2);
        setStartTx(false)
        setEndTx(true)
        updatePool()
        context.setContext({'tokenDetailsArray': await getTokenDetails(context.walletData.address, context.tokenArray)})
    }

    const updatePool = async () => {
        setPool(await getPool(pool.address))
    }

    const back = () => {
        props.history.push('/pools')
    }

    const changeTabs = () => {
        setStartTx(false)
        setEndTx(false)
    }


    return (
        <> <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    {/* Render Breadcrumb */}
                    <Breadcrumbs title="Pools" breadcrumbItem="Add Liquidity"/>

                    <Row>

                        <Col xl="12">
                            <Card>
                                <CardBody>
                                    <h4 className="card-title">Deposits</h4>
                                    <Row>
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
                                                    <div className="col-lg-6">
                                                        <div className="text-muted mt-3">
                                                            <p>Annual Yield</p>
                                                            <h4>4.12 %</h4>
                                                            <p className="mb-0">0.00245 LTC</p>

                                                        </div>
                                                    </div>
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
                                                    <div className="col-lg-6">
                                                        <div className="text-muted mt-3">
                                                            <p>Annual Yield</p>
                                                            <h4>4.12 %</h4>
                                                            <p className="mb-0">0.00245 LTC</p>

                                                        </div>
                                                    </div>
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


        </>
    )
}

export default withRouter(NewSwap)

const TradePane = (props) => {

    return (
        <>
            <Row>
                <Col xs={24}>

                    <Row className="cntr" align="middle" justify="center">

                        <Col xs={10}>
                            <Sublabel size={20}>{'INPUT'}</Sublabel><br/>
                            <InputPane
                                pool={props.pool}
                                paneData={props.tradeData}
                                onInputChange={props.onTradeChange}
                                changeAmount={props.changeTradeAmount}
                            />
                        </Col>
                        <Col xs={4} style={{display: 'flex', alignItems: 'center', justifyContent: "center"}}>
                            <DoubleRightOutlined style={{fontSize: 24}}/>
                        </Col>
                        <Col xs={10}>
                            <LabelGroup size={30} element={`${convertFromWei(props.tradeData.output)}`}
                                        label={`OUTPUT (${props.tradeData.outputSymbol})`}/>

                            <Row>
                                <Col xs={12}>
                                    <LabelGroup size={20} element={`${((props.tradeData.slip) * 100).toFixed(0)}%`}
                                                label={'SLIP'}/>
                                </Col>
                                {/* <Col xs={12}>
                                    <LabelGroup size={20} element={((props.tradeData.slip) * 100).toFixed(2)} label={'FEE'} />
                                </Col> */}
                            </Row>

                        </Col>
                    </Row>

                    <br/><br/>

                    <Row>
                        <Col xs={24}>
                            {!props.approval &&
                            <div className="btn primary" onClick={props.unlock}><UnlockOutlined/> UNLOCK</div>
                            }
                            {props.approval && props.startTx && !props.endTx &&
                            <div className="btn primary" onClick={props.trade}>
                                <LoadingOutlined/>{`${props.type} ${props.pool.symbol}`}</div>
                            }
                            {props.approval && !props.startTx && (props.tradeData.balance > 0) &&
                            <div className="btn primary"
                                 onClick={props.trade}>{`${props.type} ${props.pool.symbol}`}</div>
                            }

                        </Col>
                    </Row>

                </Col>
            </Row>


        </>
    )
}