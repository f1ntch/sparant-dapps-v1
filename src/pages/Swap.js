import React, {useEffect, useState, useContext} from 'react'
import {Context} from '../context'

import {LoadingOutlined, UnlockOutlined} from '@ant-design/icons';

import {withRouter} from 'react-router-dom';
import queryString from 'query-string';

import {InputPane, PoolPaneSide,} from '../components/common'
import {bn, formatBN, convertFromWei, convertToWei, formatUSDStatBoxes, formatUnits} from '../utils'
import {getSwapOutput, getSwapSlip} from '../math'

import {
    BNB_ADDR, SPARTA_ADDR, ROUTER_ADDR, getRouterContract, getTokenContract, getListedTokens,
    getPoolData, getNewTokenData, getTokenDetails,
    getListedPools, getPoolsData, getPool
} from '../client/web3'

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Nav,
    NavItem,
    NavLink,
    TabPane,
    TabContent
} from "reactstrap";


import classnames from 'classnames';
import Breadcrumbs from "../components/Common/Breadcrumb";


const NewSwap = (props) => {


    const [activeTab, setActiveTab] = useState('1');
    const [notifyMessage, setNotifyMessage] = useState("");
    const [notifyType, setNotifyType] = useState("dark");

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };


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
    });

    const [inputTokenData, setInputTokenData] = useState({
        'symbol': 'XXX',
        'name': 'XXX',
        'balance': 0,
        'address': SPARTA_ADDR
    });
    const [outputTokenData, setOutputTokenData] = useState({
        'symbol': 'XXX',
        'name': 'XXX',
        'balance': 0,
        'address': BNB_ADDR
    });

    const [buyData, setBuyData] = useState({
        address: SPARTA_ADDR,
        balance: 0,
        input: 0,
        symbol: "XXX",
        output: 0,
        outputSymbol: "XXX",
        slip: 0
    });
    const [sellData, setSellData] = useState({
        address: BNB_ADDR,
        balance: 0,
        input: 0,
        symbol: "XXX",
        output: 0,
        outputSymbol: "XXX",
        slip: 0
    });

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

    };

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
        };
        console.log(swapData)
        return swapData
    };

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
    };

    const onBuyChange = async (e) => {
        setBuyData(await getSwapData(convertToWei(e.target.value), inputTokenData, outputTokenData, pool, false))
    };

    const changeBuyAmount = async (amount) => {
        const finalAmt = (amount * buyData?.balance) / 100
        setBuyData(await getSwapData(finalAmt, inputTokenData, outputTokenData, pool, false))
    };

    const onSellChange = async (e) => {
        setSellData(await getSwapData(convertToWei(e.target.value), outputTokenData, inputTokenData, pool, true))
    };

    const changeSellAmount = async (amount) => {
        const finalAmt = (amount * sellData?.balance) / 100
        setSellData(await getSwapData(finalAmt, outputTokenData, inputTokenData, pool, true))
    };

    const unlockSparta = async () => {
        unlock(SPARTA_ADDR)
    };

    const unlockToken = async () => {
        unlock(pool.address)
    };

    const unlock = async (address) => {
        const contract = getTokenContract(address)
        const supply = await contract.methods.totalSupply().call()
        await contract.methods.approve(ROUTER_ADDR, supply).send({
            from: context.walletData.address,
            gasPrice: '',
            gas: ''
        })
        setNotifyMessage('Approved!')
        setNotifyType('success')
        await checkApproval(SPARTA_ADDR) ? setApprovalS(true) : setApprovalS(false)
        await checkApproval(pool.address) ? setApproval(true) : setApproval(false)
    };

    const buy = async () => {
        setStartTx(true)
        let contract = getRouterContract()
        console.log(buyData.input, outputTokenData.symbol, poolURL)
        await contract.methods.swap(buyData.input, SPARTA_ADDR, poolURL).send({
            from: context.walletData.address,
            gasPrice: '',
            gas: ''
        })
        setNotifyMessage('Transaction Sent!')
        setNotifyType('success')
        setStartTx(false)
        setEndTx(true)
        updatePool()
        context.setContext({'tokenDetailsArray': await getTokenDetails(context.walletData.address, context.tokenArray)})
    };

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
        setNotifyMessage('Transaction Sent!')
        setNotifyType('success')
        setStartTx(false)
        setEndTx(true)
        updatePool()
        context.setContext({'tokenDetailsArray': await getTokenDetails(context.walletData.address, context.tokenArray)})
    };

    const updatePool = async () => {
        setPool(await getPool(pool.address))
    };

    const back = () => {
        props.history.push('/pools')
    };

    const changeTabs = () => {
        setStartTx(false)
        setEndTx(false)
    };


    return (
        <>
            <div>
                <React.Fragment>
                    <div className="page-content">
                        <Container fluid>
                            {/* Render Breadcrumb */}
                            <Breadcrumbs title="Pools" breadcrumbItem="Swap"/>
                            <Row>
                                <Col>
                                    <button  onClick={back} type="button" className="btn btn-secondary waves-effect waves-light">
                                        <i className="bx bx-arrow-back font-size-16 align-middle mr-2"></i> Back
                                    </button>
                                    <br/>
                                    <br/>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4">
                                    <PoolPaneSide pool={pool} price={context.spartanPrice}/>
                                </Col>
                                <Col lg="6">

                                    <Card>
                                        <CardBody>
                                            <h4 className="card-title mb-4">Buy/Sell</h4>
                                            <Nav pills className="bg-light rounded" role="tablist">
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({active: activeTab === '1'})}
                                                        onClick={() => {
                                                            toggle('1');
                                                        }}
                                                    >
                                                        Buy {pool.symbol}
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({active: activeTab === '2'})}
                                                        onClick={() => {
                                                            toggle('2');
                                                        }}
                                                    >
                                                        Sell {pool.symbol}
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={activeTab} className="mt-4">
                                                <TabPane tabId="1" id="buy-tab">
                                                    <TabPane tab={`BUY ${pool.symbol}`} key="1">
                                                        <TradePane
                                                            pool={pool}
                                                            tradeData={buyData}
                                                            onTradeChange={onBuyChange}
                                                            changeTradeAmount={changeBuyAmount}
                                                            approval={approvalS}
                                                            unlock={unlockSparta}
                                                            trade={buy}
                                                            startTx={startTx}
                                                            endTx={endTx}
                                                            type={"Buy"}
                                                        />
                                                    </TabPane>
                                                </TabPane>
                                                <TabPane tabId="2" id="sell-tab">
                                                    <TabPane tab={`SELL ${pool.symbol}`} key="2">
                                                        <TradePane
                                                            pool={pool}
                                                            tradeData={sellData}
                                                            onTradeChange={onSellChange}
                                                            changeTradeAmount={changeSellAmount}
                                                            approval={approval}
                                                            unlock={unlockToken}
                                                            trade={sell}
                                                            startTx={startTx}
                                                            endTx={endTx}
                                                            type={"Sell"}
                                                        />
                                                    </TabPane>
                                                </TabPane>
                                            </TabContent>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </React.Fragment>
            </div>

        </>
    )
};

export default NewSwap;


const TradePane = (props) => {


    const [activeTab, setActiveTab] = useState('1');
    const [notifyMessage, setNotifyMessage] = useState("");
    const [notifyType, setNotifyType] = useState("dark");

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };


    return (
        <>
            <InputPane
                pool={props.pool}
                paneData={props.tradeData}
                onInputChange={props.onTradeChange}
                changeAmount={props.changeTradeAmount}
            />
            <br/>

            <div className="table-responsive mt-6">
                <table className="table table-centered table-nowrap mb-0">
                    <tbody>
                    <tr>
                        <td>
                            <p className="mb-0">Slip</p>
                        </td>
                        <td>
                            <h5 className="mb-0">{`${((props.tradeData.slip) * 100).toFixed(0)}%`}</h5>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td style={{width: "100%"}}>
                            <p className="mb-0">Output</p>
                        </td>
                        <td style={{width: "10%"}}>
                            <h3 className="mb-0"> {convertFromWei(props.tradeData.output)} {props.tradeData.outputSymbol}</h3>
                        </td>
                        <td>
                        </td>
                    </tr>


                    </tbody>
                </table>
            </div>
            <br/><br/>
            {!props.approval &&
            <Button size="lg" color="success" onClick={props.unlock}><UnlockOutlined/> Unlock</Button>
            }
            {props.approval && props.startTx && !props.endTx &&
            <Button size="lg" color="success" onClick={props.trade}>
                <LoadingOutlined/>{`${props.type} ${props.pool.symbol}`}</Button>
            }
            {props.approval && !props.startTx && (props.tradeData.balance > 0) &&
            <Button
                size="lg" color="success" onClick={props.trade}>{`${props.type} ${props.pool.symbol}`}</Button>
            }
        </>
    )
};

