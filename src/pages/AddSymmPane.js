

import {InputPane} from "./InputPane";


import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {convertFromWei} from "../utils";
import React from "react";

import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";

import {withNamespaces} from "react-i18next";

import {
   Col,

} from "reactstrap";
import withRouter from "react-router-dom/es/withRouter";


export const AddSymmPane = (props) => {

    return (
        <>
            <InputPane
                paneData={props.userData}
                onInputChange={props.onAddChange}
                changeAmount={props.changeAmount}
            />
            <br/>
            <PlusOutlined style={{fontSize: 24}}/>
            <br/>
            <br/>

            <div className="table-responsive mt-6">
                <table className="table table-centered table-nowrap mb-0">
                    <tbody>
                    <tr>
                        <td>
                            <p className="mb-0">Estimated Units</p>
                        </td>
                        <td>
                            <h5 className="mb-0">{convertFromWei(props.estLiquidityUnits.toFixed(0))}</h5>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="mb-0">Estimated Share</p>
                        </td>
                        <td>
                            <h5 className="mb-0">{`${props.getEstShare()}%`}</h5>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td style={{width: "100%"}}>
                            <p className="mb-0">Paired Amount (SPARTA)</p>
                        </td>
                        <td style={{width: "10%"}}>
                            <h2 className="mb-0">{convertFromWei(props.liquidityData.baseAmount)}</h2>
                        </td>
                        <td>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <br/>
            <Col xs={12}>
                {!props.approvalToken &&
                <button color="success" type="button"
                        className="btn btn-success btn-lg btn-block waves-effect waves-light"
                        onClick={props.unlockToken}>
                    <i className="bx bx-log-in-circle font-size-20 align-middle mr-2"></i> Unlock {props.pool.symbol}
                </button>
                }
            </Col>
            <Col xs={12}>
                <br/>
                {!props.approvalBase &&
                <button color="success" type="button"
                        className="btn btn-success btn-lg btn-block waves-effect waves-light"
                        onClick={props.unlockSparta}>
                    <i className="bx bx-log-in-circle font-size-20 align-middle mr-2"></i> Unlock SPARTA</button>
                }
            </Col>


            <Col xs={8}>
                {props.approvalBase && props.approvalToken && props.startTx && !props.endTx &&
                <div className="btn primary" onClick={props.addLiquidity} icon={<LoadingOutlined/>}>ADD TO
                    POOL</div>
                }
                {props.approvalBase && props.approvalToken && !props.startTx &&
                <div className="btn primary" onClick={props.addLiquidity}>ADD TO POOL</div>
                }
            </Col>


        </>
    )
}


export default withRouter(withNamespaces()(AddSymmPane));