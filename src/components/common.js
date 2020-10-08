import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Menu, Divider, Image} from 'antd'
import {DownOutlined,} from '@ant-design/icons';
// PlusCircleOutlined, MinusCircleOutlined, Tooltip
import {
    rainbowStop, getIntFromName, formatUnits,
    convertFromWei, formatUSD, formatUSDStatBoxes,
    // formatAPY,
} from '../utils'
import {getTokenSymbol} from '../client/web3'
import {H1, HR, Text, Center, Sublabel, LabelGrey} from './elements'

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    InputGroup,
    InputGroupAddon, CardTitle, Progress, Breadcrumb, Media
} from "reactstrap";

import {BNB_ADDR, SPARTA_ADDR} from '../client/web3'
import MiniWidget from "../pages/Dashboard-crypto/mini-widget";

// Check If Responsive
export const useWindowSize = () => {
    // Initialize state with undefined width/height so server and client renders match
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
}

export const BreadcrumbCombo = (props) => {

    return (
        <div>
            <H1>{props.title}</H1>
            <Breadcrumb>
                <Breadcrumb.Item><Link to={props.link}>{props.parent}</Link></Breadcrumb.Item>
                <Breadcrumb.Item>{props.child}</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}

export const InputPane = (props) => {

    return (
        <div>
            <div>

                <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                        <Label className="input-group-text">Total</Label>
                    </InputGroupAddon>
                    <Input type="text" className="form-control" onChange={props.onInputChange}
                           placeholder={convertFromWei(props.paneData?.input)}
                           size={'large'}
                        // defaultValue={convertFromWei(props.paneData?.input)}
                           allowClear={true}
                        // addonAfter={<TokenDropDown default={props.paneData?.address}
                        //   changeToken={props.changeToken}
                        //   tokenList={props.tokenList} />}
                    ></Input>

                </InputGroup>


            </div>
            <h7>Balance {convertFromWei(props.paneData?.balance)} ({props.paneData?.symbol})
            </h7>
            <br/>
            <PercentButtonRow changeAmount={props.changeAmount}/>
            <br/>
        </div>
    )
};


export const InputPaneStatic = (props) => {
    //tokenList
    //paneData: {address, input, balance}
    //inputChange, changeToken, changeAmount

    return (
        <div>
            <Row>
                <Col xs={24}>
                    <Input onChange={props.onInputChange}
                           placeholder={convertFromWei(props.paneData?.input)}
                        // defaultValue={convertFromWei(props.paneData?.input)}
                           allowClear={true}
                           addonAfter={
                               <TokenSymbol
                                   symbol={props.tokenSymbol?.symbol}/>}
                    ></Input>
                    <Sublabel>Balance:
                        {convertFromWei(props.paneData?.balance)} ({props.tokenSymbol?.symbol})</Sublabel>
                </Col>
            </Row>
            <PercentButtonRow changeAmount={props.changeAmount}/>
        </div>
    )
}


export const OutputPane = (props) => {

    // const [secondToken, setSecondToken] = useState(false)

    // const handleSecondToken = () => {
    //   secondToken ? setSecondToken(false) : setSecondToken(true)
    // }

    return (
        <div style={{margin: 0}}>
            <Center>
                <Row>
                    <Col xs={24}>
                        <PercentButtonRow changeAmount={props.changeAmount}/>
                    </Col>
                </Row>
            </Center>
            {/* <Center>
        {!secondToken &&
          <div>
            <Row>
              <Col xs={18}>
                <TokenDropDown />
              </Col>
              <Col xs={6}>
                <Tooltip title="Withdraw simultaneously to a second token">
                  <Button style={{ marginLeft: 10 }} onClick={handleSecondToken} icon={<PlusCircleOutlined />}></Button>
                </Tooltip>
              </Col>
            </Row>
          </div>
        }
        {secondToken &&
          <div>
            <Row>
              <Col xs={8} style={{ marginLeft: 10 }}>
                <TokenDropDown />
              </Col>
              <Col xs={8} style={{ marginLeft: 10 }}>
                <TokenDropDown />
              </Col>
              <Col xs={4} style={{ marginLeft: 10 }}>
                <Button onClick={handleSecondToken} icon={<MinusCircleOutlined />}></Button>
              </Col>
            </Row>
          </div>
        }
      </Center> */}
            <br/>
        </div>
    )
}

export const PercentButtonRow = (props) => {

    const change25 = () => {
        props.changeAmount(25)
    }
    const change50 = () => {
        props.changeAmount(50)
    }
    const change75 = () => {
        props.changeAmount(75)
    }
    const change100 = () => {
        props.changeAmount(100)
    }

    const btnStyle = {
        marginRight: 3.5,
        marginTop: 10,
    }
    return (
        <>

            <Col xs={24}>

                <Button color="primary" type="button" style={btnStyle} onClick={change25}>25%</Button>
                <Button color="primary" type="button" style={btnStyle} onClick={change50}>50%</Button>
                <Button color="primary" type="button" style={btnStyle} onClick={change75}>75%</Button>
                <Button color="primary" style={btnStyle} onClick={change100}>All</Button>
            </Col>

        </>
    )
}

export const TokenDropDown = (props) => {

    const [symbol, setSymbol] = useState("SPARTA")
    const [arraySymbols, setArraySymbols] = useState(["SPARTA"])

    useEffect(() => {
        if (props.tokenList) {
            loadSymbols()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.tokenList])

    const loadSymbols = async () => {
        setSymbol(await getTokenSymbol(props.default))
        const symbols = props.tokenList.map(async (item) => await getTokenSymbol(item))
        setArraySymbols(symbols)
    }

    const handleMenuClick = async (e) => {
        setSymbol(await getTokenSymbol(props.tokenList[e.key]))
        props.changeToken(props.tokenList[e.key])
    }

    const style = {
        width: 100,
        // background: Colour().white,
        // padding:'-20px'
    }

    const menu = (
        <Menu>
            {arraySymbols.map((item, index) => (
                <Menu.Item key={index} onClick={handleMenuClick}>
                    <Row>
                        <Col xs={8} style={{paddingLeft: 2}}>
                            <ColourCoin symbol={item} size={22}/>
                        </Col>
                        <Col xs={8} style={{paddingLeft: 2}}>
                            {item}
                        </Col>
                    </Row>
                </Menu.Item>
            ))}
        </Menu>
    );
    return (
        <div>
            <Dropdown overlay={menu}>
                {/* <Button style={{ width: 120 }}> */}
                <Row style={style}>
                    <Col xs={8} style={{paddingLeft: 2}}>
                        <ColourCoin symbol={symbol} size={22}/>
                    </Col>
                    <Col xs={8} style={{paddingLeft: 2}}>
                        {symbol}
                    </Col>
                    <Col xs={8} style={{paddingLeft: 2}}>
                        <DownOutlined/>
                    </Col>
                </Row>
                {/* </Button> */}
            </Dropdown>
        </div>

    )

}
export const TokenSymbol = (props) => {

    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.symbol])

    const style = {
        width: 100,
        // background: Colour().white,
        // padding:'-20px'
    }
    return (
        <div>
            <Row style={style}>
                <Col xs={8} style={{paddingLeft: 2}}>
                    <ColourCoin symbol={props.symbol} size={22}/>
                </Col>
                <Col xs={8} style={{paddingLeft: 2}}>
                    {props.symbol}
                </Col>
                <Col xs={8} style={{paddingLeft: 2}}>

                </Col>
            </Row>
        </div>

    )

}

export const PoolPaneSide = (props) => {

    //BNB Chart
    const series1 = [{name: "BTC", data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]}];
    const options1 = {
        chart: {sparkline: {enabled: !0}},
        stroke: {curve: "smooth", width: 2},
        colors: ["#f1b44c"],
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                inverseColors: !1,
                opacityFrom: .45,
                opacityTo: .05,
                stops: [25, 100, 100, 100]
            }
        },
        tooltip: {fixed: {enabled: !1}, x: {show: !1}, marker: {show: !1}}
    };


    const reports = [
        {
            title: "Bitcoin",
            icon: "mdi mdi-bitcoin",
            color: "warning",
            value: "$ 9134.39",
            desc: "+ 0.0012 ( 0.2 % )",
            series: series1,
            options: options1
        },

    ];

    return (
        <Col lg="12">
            <Card>
                <CardBody>
                    <h4 className="card-title mb-4">Overview</h4>
                    <div className="text-center">
                        <div className="mb-4">
                            {/*<MiniWidget reports={reports}/>*/}
                            {props.pool.address === BNB_ADDR &&
                            <img
                                src={"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png"}
                                style={{height: 50}} alt='BNB'/>
                            }
                            {props.pool.address !== BNB_ADDR &&
                            <img
                                src-data="holder.js/171x180"
                                width={50}
                                height={50}
                                src={"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/" + props.pool.address + "/logo.png"}
                            />
                            }
                        </div>
                        <h2>{props.pool.symbol}</h2>
                        <br/>
                    </div>
                    <div className="table-responsive mt-4">
                        <table className="table table-centered table-nowrap mb-0">
                            <tbody>
                            <tr>
                                <td style={{width: "100%"}}>
                                    <p className="mb-0">Volume</p>
                                </td>
                                <td style={{width: "10%"}}>
                                    <h5 className="mb-0">{formatUSDStatBoxes(convertFromWei(props.pool.volume), props.price)}</h5>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="mb-0">Tx Count</p>
                                </td>
                                <td>
                                    <h5 className="mb-0">{props.pool.txCount}</h5>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="mb-0">Fees</p>
                                </td>
                                <td>
                                    <h5 className="mb-0">{formatUSDStatBoxes(convertFromWei(props.pool.fees), props.price)}</h5>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="mb-0">Depth</p>
                                </td>
                                <td>
                                    <h5 className="mb-0">{formatUnits(convertFromWei(props.pool.tokenAmount))}</h5>
                                    <p>{props.pool.symbol}</p>
                                    <h5 className="mb-0">{formatUnits(convertFromWei(props.pool.baseAmount))}</h5>
                                    <p>SPARTA</p>
                                </td>
                                <td>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                    <div className="text-center">
                        <div className="mb-4">
                            <i className="text-primary display-4">
                                <img
                                    src={"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/" + SPARTA_ADDR + "/logo.png"}
                                    style={{height: 50}} alt='SPARTA'/></i>
                        </div>
                        <h2>SPARTA</h2>
                        <p>Price</p>
                        <h3 className="strong">{formatUSD(props.pool.price, props.price)}</h3>
                    </div>

                </CardBody>
            </Card>
        </Col>
        //           {/* <h4>APY</h4>
        //           <h3 className="strong">{formatAPY(props.pool.apy)}</h3> */}
    )
};

export const PoolPane = (props) => {

    return (
        <div>
            <Col xs={24} sm={24} xl={24}>
                <Row>
                    <Col xs={24}>
                        <ColourCoin symbol={props.symbol} size={40}/>
                        <Center><Text size={30}
                                      margin={"-40px 0px 5px 0px"}>{convertFromWei(props?.balance)}</Text></Center>
                        {/* <Center><Label margin={"0px 0px 0px 0px"}>({formatUSD(convertFromWei(props?.balance))})</Label></Center> */}
                        <Center><Sublabel margin={"0px 0px 5px 0px"}>DEPTH ({props?.symbol})</Sublabel></Center>

                        {!props.hideSubpane &&
                        <div>
                            <HR/>
                            <Row>
                                <Col xs={8}>
                                    <Label>{props.data.field1.data}</Label><br/>
                                    <Sublabel>{props.data.field1.title}</Sublabel>
                                </Col>
                                <Col xs={8}>
                                    <Label>{props.data.field2.data}</Label><br/>
                                    <Sublabel>{props.data.field2.title}</Sublabel>
                                </Col>
                                <Col xs={8}>
                                    <Label>{props.data.field3.data}</Label><br/>
                                    <Sublabel>{props.data.field3.title}</Sublabel>
                                </Col>
                            </Row>
                        </div>
                        }
                    </Col>
                </Row>
            </Col>
        </div>
    )
}

export const ColourCoin = (props) => {
    const symbol = props.symbol ? props.symbol : 'XXX'
    const numbers = getIntFromName(symbol)
    const startCol = rainbowStop(numbers[0])
    const stopCol = rainbowStop(numbers[1])
    const coinName = symbol.length > 4 ? symbol.substr(0, 4) : symbol

    const coinStyle = {
        marginTop: 5,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        width: props.size,
        height: props.size,
        background: `linear-gradient(45deg, ${startCol}, ${stopCol})`,
    }

    return (
        <div>
            <Row style={coinStyle}>
                <Col style={{marginTop: 5}}>
                    <p>{coinName}</p>
                </Col>
            </Row>
        </div>
    )
}

export const CoinRow = (props) => {

    return (
        <div>
            <Row align="middle" justify="center" className="cntr">
                <Col xs={12}>
                    {props.address === BNB_ADDR &&
                    <img
                        src={"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png"}
                        style={{height: 40}} alt='BNB'/>
                    }
                    {props.address !== BNB_ADDR &&
                    <Image
                        width={40}
                        height={40}
                        src={"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/" + props.address + "/logo.png"}
                        fallback="../fallback.png"
                    />
                    }
                </Col>
                <Col xs={12}>
                    <Label size={props.size / 2.2}>{props.name}</Label>
                </Col>
                <Col xs={12}>
                    <Label size={props.size / 1.8}>{props.symbol}</Label><br/>
                </Col>
                <Col xs={12}>
                    <Text size={props.size / 2}>{convertFromWei(props.balance)}</Text><br/>
                    {/* <Text size={props.size / 3}>({formatUSD(convertFromWei(props.balance))})</Text> */}
                </Col>
            </Row>

        </div>
    )
}
export const CDPDetails = (props) => {

    return (
        <div>
            <Row>
                <Col span={4}>
                    <ColourCoin symbol={props.symbol} size={props.size}/>
                </Col>
                <Col span={12}>
                    <Label size={props.size / 2.2}>{props.name}</Label><br/>
                </Col>
                <Col span={6}>
                    <Text size={props.size / 2}>{convertFromWei(props.balance)}</Text><br/>
                    <Text size={props.size / 3}>({formatUSD(convertFromWei(props.balance))})</Text>
                </Col>

            </Row>
        </div>
    )
}

export const CLTButtonRow = (props) => {

    const change110 = () => {
        props.changeAmount(110)
    }
    const change125 = () => {
        props.changeAmount(125)
    }
    const change150 = () => {
        props.changeAmount(150)
    }
    const change200 = () => {
        props.changeAmount(200)
    }

    const btnStyle = {
        marginRight: 3.5
    }
    return (
        <>
            <Row style={{marginBottom: 10}}>
                <Col xs={24}>
                    <Button type="dashed" style={btnStyle} onClick={change110}>110%</Button>
                    <Button type="dashed" style={btnStyle} onClick={change125}>125%</Button>
                    <Button type="dashed" style={btnStyle} onClick={change150}>150%</Button>
                    <Button type="dashed" style={btnStyle} onClick={change200}>200%</Button>
                </Col>
            </Row>
        </>
    )
}
export const CDPPane = (props) => {

    return (
        <div>
            <Col xs={24} sm={24} xl={24}>
                <Row>
                    <Col xs={24}>
                        <Divider><Label size={20}>{props.name}</Label> </Divider>
                        <ColourCoin symbol={props.symbol} size={40}/>
                        <Center><Text size={30}
                                      margin={"-40px 0px 5px 0px"}>{convertFromWei(props?.balance)}</Text></Center>
                        <Center><Label margin={"0px 0px 0px 0px"}>({formatUSD(convertFromWei(props?.balance))})</Label></Center>
                    </Col>
                </Row>
            </Col>
        </div>
    )
}

/**
 * Toggle the class on body
 * @param {*} cssClass
 */
export const manageBodyClass = (cssClass) => {
    document.body.classList.toggle(cssClass)
    return true;
} 