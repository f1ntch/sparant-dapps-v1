import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {PropTypes} from 'react'
//import {Menu} from 'antd'
// PlusCircleOutlined, MinusCircleOutlined, Tooltip
import {
    rainbowStop, getIntFromName, formatUnits,
    convertFromWei, formatUSD, formatUSDStatBoxes,
    // formatAPY,
} from '../utils'
import {H1, HR, Text, Center, Sublabel} from './elements'

import {
    Row,
    Col,
    Card,
    CardBody,
    Input,
    Label,
    Button,
    InputGroup,
    InputGroupAddon,
    Breadcrumb,
} from "reactstrap";

import {BNB_ADDR, SPARTA_ADDR} from '../client/web3'

import {withNamespaces} from 'react-i18next';
import withRouter from "react-router-dom/es/withRouter";
import {LoadingOutlined, UnlockOutlined} from "@ant-design/icons";





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


            <PercentButtonRow changeAmount={props.changeAmount}/>


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

{/*
export const TokenDropDown = (props) => {

    {/*

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
                        THIS IS THE MENU COMP
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
                // <Button style={{ width: 120 }}>
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
                // </Button>
            </Dropdown>
        </div>

    )

}
*/
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

export const TokenIcon = ({address}) => {

    const addr = address
    const [isFallback, setIsFallback] = useState("https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/" + addr + "/logo.png");

    // https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/logo.png

    const onFallback = () => {
        setIsFallback(process.env.PUBLIC_URL + "/fallback.png")
    }

    return (
        <>
            {addr === BNB_ADDR &&
            <img
                src={"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png"}
                style={{height: 40}}
                alt="BNB Token Icon"
            />
            }
            {addr !== BNB_ADDR &&
            <img
                src={isFallback}
                width={40}
                height={40}
                onError={onFallback}
                alt={addr + " Token Icon"}
            />
            }
        </>
    );
}


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
                    <TokenIcon/>
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

/**
 * Toggle the class on body
 * @param {*} cssClass
 */
export const manageBodyClass = (cssClass) => {
    document.body.classList.toggle(cssClass)
    return true;
}