import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../context'

import { withRouter } from 'react-router-dom'
import { Row, Col, Input } from 'antd'

import { message } from 'antd';


import { LeftOutlined } from '@ant-design/icons';
import { QuestionCircleOutlined, UnlockOutlined } from '@ant-design/icons';

import { BreadcrumbCombo, InputPane, CoinRow } from '../components/common'
import { Sublabel } from '../components/elements'


// import { getLiquidityUnits } from '../../math'
import {
    BNB_ADDR, SPARTA_ADDR, ROUTER_ADDR, getTokenContract, getRouterContract,
    getTokenData, getNewTokenData, getAssets, getListedTokens, getListedPools, getPoolsData,
    getTokenDetails, getWalletData
} from '../client/web3'

import { convertToWei, formatBN } from '../utils'
// var utils = require('ethers').utils;

const CreatePool = (props) => {

    const context = useContext(Context)

    const [addressSelected, setAddressSelected] = useState(SPARTA_ADDR)

    // const [tokenList, setTokenList] = useState([SPARTA_ADDR])
    // const [tokenShortList, setTokenShortList] = useState([SPARTA_ADDR])
    const [checkFlag, setCheckFlag] = useState(false)
    const [tokenData, setTokenData] = useState(null)
    // const [mainPool, setMainPool] = useState({
    //     'symbol': 'XXX',
    //     'name': 'XXX',
    //     'address': BNB_ADDR,
    //     'price': 0,
    //     'volume': 0,
    //     'baseAmount': 0,
    //     'tokenAmount': 0,
    //     'depth': 0,
    //     'txCount': 0,
    //     'apy': 0,
    //     'units': 0,
    //     'fees': 0
    // })

    const [stake1Data, setAddLiquidity1Data] = useState({
        address: SPARTA_ADDR,
        symbol: 'XXX',
        balance: 0,
        input: 0,
    })
    const [stake2Data, setAddLiquidity2Data] = useState({
        address: BNB_ADDR,
        symbol: 'XXX',
        balance: 0,
        input: 0,
    })
    // const [liquidityUnits, setLiquidityUnits] = useState(0)

    const [approval1, setApproval1] = useState(false)
    const [approval2, setApproval2] = useState(false)
    // const [addLiquidityTx, setAddLiquidityTx] = useState(null)

    useEffect(() => {
        if (context.connected) {
            getData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.connected])

    const getData = async () => {
        // const tokenList = await filterWalletNotPools(context.poolsData, context.walletData)
        // setTokenList(tokenList)
        // console.log(tokenList)
        // setTokenShortList(await filterTokensNotPoolSelection())
        // setTokenData(await getTokenData(tokenList[0], context.walletData))
        // setMainPool(await getTokenData(tokenList[0], context.walletData))

        const inputTokenData = await getTokenData(SPARTA_ADDR, context.walletData)
        setAddLiquidity1Data(await getPoolSharesInputData(inputTokenData.balance, inputTokenData))
        // const outputTokenData = await getTokenData(BNB_ADDR, context.walletData)
        // setAddLiquidity2Data(await getPoolSharesInputData(outputTokenData.balance, outputTokenData))

    }

    const onInputChange = async (e) => {
        setAddressSelected(e.target.value)
    }

    const checkToken = async () => {
        if(addressSelected !== SPARTA_ADDR){
            setApproval1(false)
            setApproval2(false)

            if(!context.walletData?.address){
                message.error('Wait for wallet to load first', 2);
            } else {
                try {
                    var tokenData = await getNewTokenData(addressSelected, context.walletData.address)
                    setTokenData(tokenData)
                    console.log(tokenData)
                    if (+tokenData.balance > 0) {
                        setCheckFlag(true)
                        setAddLiquidity2Data(await getPoolSharesInputData(tokenData.balance, tokenData))
                    } else {
                        message.error('You do not have that token on your address', 2);
                    }
        
                    await checkApproval1(SPARTA_ADDR)
                    await checkApproval2(addressSelected)
                } catch(err){
                    message.error('Not a valid token', 2);
                }
            }

        }

    }

    // const changeToken = () => {

    // }

    const onAddLiquidity1Change = async (e) => {
        const input = e.target.value
        setAddLiquidity1Data(await getPoolSharesInputData(convertToWei(input), stake1Data))
        // const stake = {
        //     baseAmount: convertToWei(input),
        //     tokenAmount: stake2Data.input
        // }
        // setLiquidityUnits(getLiquidityUnits(stake, stake))
    }

    // const changeAddLiquidity1Token = async (tokenAmount) => {
    //     const inputTokenData = await getTokenData(tokenAmount, context.walletData)
    //     setAddLiquidity1Data(await getPoolSharesInputData(inputTokenData.balance, inputTokenData))
    //     const stake = {
    //         baseAmount: inputTokenData.balance,
    //         tokenAmount: stake2Data.input
    //     }
    //     setLiquidityUnits(getLiquidityUnits(stake, stake))
    // }

    const changeAddLiquidity1Amount = async (amount) => {
        const finalAmt = (amount * stake1Data?.balance) / 100
        setAddLiquidity1Data(await getPoolSharesInputData(finalAmt, stake1Data))
        // const stake = {
        //     baseAmount: finalAmt,
        //     tokenAmount: stake2Data.input
        // }
        // setLiquidityUnits(getLiquidityUnits(stake, stake))
    }

    // const changeAddLiquidity2Token = async (tokenAmount) => {
    //     console.log("changing sell tokens not enabled yet")
    // }

    const onAddLiquidity2Change = async (e) => {
        const input = e.target.value
        setAddLiquidity2Data(await getPoolSharesInputData(convertToWei(input), stake2Data))
        // const stake = {
        //     baseAmount: stake1Data.input,
        //     tokenAmount: convertToWei(input)
        // }
        // console.log(stake)
        // setLiquidityUnits(getLiquidityUnits(stake, stake))
        // console.log(formatBN(getLiquidityUnits(stake, stake)))
    }

    const changeAddLiquidity2Amount = async (amount) => {
        const finalAmt = (amount * stake2Data?.balance) / 100
        setAddLiquidity2Data(await getPoolSharesInputData(finalAmt, stake2Data))
        // const stake = {
        //     baseAmount: stake1Data.input,
        //     tokenAmount: finalAmt
        // }
        // console.log(stake)
        // setLiquidityUnits(getLiquidityUnits(stake, stake))
        // console.log(formatBN(getLiquidityUnits(stake, stake)))
    }

    const getPoolSharesInputData = async (input, inputTokenData) => {
        const liquidityData = {
            address: inputTokenData.address,
            symbol: inputTokenData.symbol,
            balance: inputTokenData.balance,
            input: input,
        }
        return liquidityData
    }

    // const getShare = () => {
    //     const share = (bn(liquidityUnits).div(bn(mainPool.units))).toFixed(2)
    //     return (share*100).toFixed(2)
    // }

    // const getValueOfShare = () => {
    //     return '$1234.54'
    // }


    const checkApproval1 = async (address) => {
        const contract = getTokenContract(address)
        const approval = await contract.methods.allowance(context.walletData.address, ROUTER_ADDR).call()
        const tokenData = await getTokenData(address, context.walletData)
        if (+approval >= tokenData.balance) {
            setApproval1(true)
        }
    }
    const checkApproval2 = async (address) => {
        if (address === BNB_ADDR) {
            setApproval2(true)
        } else {
            const contract = getTokenContract(address)
            const approval = await contract.methods.allowance(context.walletData.address, ROUTER_ADDR).call()
            var tokenData = await getNewTokenData(address, context.walletData.address)
            if (+approval >= +tokenData.balance) {
                setApproval2(true)
            }
            console.log(address, +approval, +tokenData.balance)
        }

    }

    const unlockSparta = async () => {
        unlockToken(stake1Data.address)
    }

    const unlockAsset = async () => {
        unlockToken(stake2Data.address)
    }

    const unlockToken = async (address) => {
        console.log(ROUTER_ADDR, address)
        const contract = getTokenContract(address)
        const supply = await contract.methods.totalSupply().call()
        console.log(ROUTER_ADDR, supply)
        await contract.methods.approve(ROUTER_ADDR, supply).send({
            from: context.walletData.address,
            gasPrice: '',
            gas: ''
        })
        await checkApproval1(SPARTA_ADDR)
        await checkApproval2(address)
    }

    const back = () => {
        props.history.push('/pools')
    }

    //0x7fd8b9a2
    //000000000000000000000000000000000000000000000001a055690d9db8
    //00000000000000000000000000000000000000000000000000000de0b6b3a764
    //00000000000000000000000000000000000000000000000000000000000000000000

    const createPool = async () => {
        const poolContract = getRouterContract()

        console.log(formatBN(stake1Data.input, 0), formatBN(stake2Data.input, 0), addressSelected)

        await poolContract.methods.createPool(formatBN(stake1Data.input, 0), formatBN(stake2Data.input, 0), addressSelected).send({
            from: context.walletData.address,
            gasPrice: '',
            gas: '',
            value: addressSelected === BNB_ADDR ? formatBN(stake2Data.input, 0) : 0
        })
        // setAddLiquidityTx(tx.transactionHash)
        await reloadData()
        props.history.push('/pools')
    }

    const reloadData = async () => {
        let assetArray = await getAssets()
        let tokenArray = await getListedTokens()
        var sortedTokens = [...new Set(assetArray.concat(tokenArray))].sort()
        let poolArray = await getListedPools()
        let poolsData = await getPoolsData(tokenArray)
        // let stakesData = await getPoolSharesData(context.walletData.address, poolArray)
        let tokenDetailsArray = await getTokenDetails(context.walletData.address, sortedTokens)
        let walletData = await getWalletData(context.walletData.address, tokenDetailsArray)
        context.setContext({ 'tokenArray': tokenArray })
        context.setContext({ 'poolArray': poolArray })
        context.setContext({ 'poolsData': poolsData })
        // context.setContext({ 'stakesData': stakesData })
        context.setContext({ 'tokenDetailsArray': tokenDetailsArray })
        context.setContext({ 'walletData': walletData })
    }

    return (
        <div>
            <BreadcrumbCombo title={'CREATE POOL'} parent={'POOLS'} link={'/pools'} child={'CREATE'}></BreadcrumbCombo>
            <br />
            <Row type="flex" align="middle" justify="center">

              <Col xs={8} sm={6} md={6} onClick={back} className="btn primary" style={{ textAlign: 'left', maxWidth:'90px'}}>
                  {<LeftOutlined />} BACK
              </Col>
              <Col xs={16} sm={18} md={18}>
              </Col>

                <Col xs={16} md={12}>

                    <Input
                        placeholder={'enter token address'}
                        onChange={onInputChange}></Input>

                    {/* <Input onChange={props.onInputChange}
                        value={tokenList[0]}
                        allowClear={true}
                        // addonAfter={<TokenDropDown default={tokenList[0]}
                        //     changeToken={changeToken}
                        //     tokenList={tokenList} />}
                    ></Input> */}
                </Col>
                <Col xs={8} md={4}>
                    <div className="btn primary" onClick={checkToken}>{<QuestionCircleOutlined />} CHECK</div>
                </Col>
                <Col xs={0} md={6}>
                </Col>
                {checkFlag &&
                  <div className="minimal-card ant-card-bordered cntr">
                    <Col xs={24}>
                        <CoinRow
                            symbol={tokenData.symbol}
                            name={tokenData.name}
                            balance={tokenData.balance}
                            size={30} />
                    </Col>
                  </div>
                }
            </Row>
            {checkFlag &&
                <div className="minimal-card ant-card-bordered cntr">
                    <Row type="flex" align="middle" justify="center">
                        <Col xs={24}>
                            <Row type="flex" align="middle" justify="center">
                                <Col xs={12}>
                                <Sublabel size={20}>{'INPUT SPARTA'}</Sublabel><br />
                                    <InputPane
                                        // mainPool={mainPool}
                                        // tokenList={tokenShortList}
                                        paneData={stake1Data}
                                        onInputChange={onAddLiquidity1Change}
                                        // changeToken={changeAddLiquidity1Token}
                                        changeAmount={changeAddLiquidity1Amount}
                                    />
                                </Col>
                                <Col xs={12}>
                                <Sublabel size={20}>{'INPUT TOKEN'}</Sublabel><br />
                                    <InputPane
                                        // tokenList={[tokenData.address]}
                                        paneData={stake2Data}
                                        onInputChange={onAddLiquidity2Change}
                                        // changeToken={changeAddLiquidity2Token}
                                        changeAmount={changeAddLiquidity2Amount} />
                                </Col>

                            </Row>
                            <Row type="flex" align="middle" justify="center">
                                {/* <Col xs={12}>
                                    <Center><LabelGroup size={18} element={`${convertFromWei(liquidityUnits.toFixed(0))}`} label={'ESTIMATED UNITS'} /></Center>
                                </Col>
                                <Col xs={12}>
                                    <Center><LabelGroup size={18} element={`100%`} label={'SHARE'} /></Center>
                                </Col> */}
                                {/* <Col xs={8}>
                                <Center><LabelGroup size={18} element={`${getValueOfShare()}`} label={'STAKED VALUE'} /></Center>
                                </Col> */}
                            </Row>
                            <br></br>
                            <Row type="flex" align="middle" justify="center">
                              <Col xs={8}>
                                  {!approval1 &&
                                      <div className="btn primary" onClick={unlockSparta}><UnlockOutlined /> UNLOCK {stake1Data.symbol}</div>
                                  }
                              </Col>
                              <Col xs={8}>
                                  {(approval1 && approval2) &&
                                      <div className="btn primary" onClick={createPool}>CREATE POOL</div>
                                  }
                              </Col>
                              <Col xs={8}>
                                  {!approval2 &&
                                      <div className="btn primary" onClick={unlockAsset}><UnlockOutlined /> UNLOCK {stake2Data.symbol}</div>
                                  }
                              </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            }
        </div>
    )
}

export default withRouter(CreatePool)
