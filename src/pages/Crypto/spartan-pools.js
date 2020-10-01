import React, {Component, useContext, useEffect, useState} from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    CardBody,
    Media,
    Table
} from "reactstrap";
import {Link} from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

import getPooledValue from '../../ui/pages/Pools'





class SpartanPools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: [
                {
                    icon: "mdi mdi-pooled",
                    color: "warning",
                    title: "BTC",
                    investRate: "1.2601",
                    investPrice: "6225.74",
                    price: "7525.47",
                    loansRate: "0.1512",
                    loansPrice: "742.32",
                    totalRate: "4.2562",
                    totalPrice: "6425.42"
                },
                {
                    icon: "mdi mdi-volume",
                    color: "primary",
                    title: "ETH",
                    investRate: "0.0814",
                    investPrice: "3256.29",
                    price: "4235.78",
                    loansRate: "0.0253",
                    loansPrice: "675.04",
                    totalRate: "0.0921",
                    totalPrice: "4536.24"
                },
                {
                    icon: "mdi mdi-count",
                    color: "info",
                    title: "LTC",
                    investRate: "0.0682",
                    investPrice: "2936.14",
                    price: "3726.06",
                    loansRate: "0.0234",
                    loansPrice: "523.17",
                    totalRate: "0.0823",
                    totalPrice: "3254.23"
                },
                {
                    icon: "mdi mdi-earnings",
                    color: "warning",
                    title: "BTC",
                    investRate: "1.2601",
                    investPrice: "6225.74",
                    price: "7525.47",
                    loansRate: "0.1512",
                    loansPrice: "742.32",
                    totalRate: "4.2562",
                    totalPrice: "6425.42"
                },
            ],
            isMenu: false,
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }




    toggleMenu() {
        this.setState(prevState => ({
            isMenu: !prevState.isMenu
        }));
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumb */}
                        <Breadcrumbs title="App" breadcrumbItem="Pools"/>

                        <Row>

                            <Col xl="12">
                                <Card>
                                    <CardBody>
                                        <h4 className="card-title">Deposits</h4>

                                        <Row>
                                            <Col lg="4">
                                                <div className="border p-3 rounded mt-4">
                                                    <div className="d-flex align-items-center mb-3">
                                                        <div className="avatar-xs mr-3">
                                                            <span
                                                                className="avatar-title rounded-circle bg-soft-warning text-warning font-size-18">
                                                                <i className="mdi mdi-bank-transfer"></i>
                                                            </span>
                                                        </div>
                                                        <h5 className="font-size-14 mb-0">Total Pooled</h5>
                                                    </div>
                                                    <Row>
                                                        <div className="col-lg-6">
                                                            <div className="text-muted mt-3">
                                                                <p>Annual XXX</p>
                                                                <h4>XXX</h4>
                                                                <p className="mb-0">0.00745 BTC</p>

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 align-self-end">
                                                            <div className="float-right mt-3">
                                                                <Link to="#" className="btn btn-primary">Select</Link>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col lg="4">
                                                <div className="border p-3 rounded mt-4">
                                                    <div className="d-flex align-items-center mb-3">
                                                        <div className="avatar-xs mr-3">
                                                            <span
                                                                className="avatar-title rounded-circle bg-soft-primary text-primary font-size-18">
                                                                <i className="mdi mdi-bank-transfer"></i>
                                                            </span>
                                                        </div>
                                                        <h5 className="font-size-14 mb-0">Total Volume</h5>
                                                    </div>

                                                    <Row>
                                                        <div className="col-lg-6">
                                                            <div className="text-muted mt-3">
                                                                <p>Annual Yield</p>
                                                                <h4>5.08 %</h4>
                                                                <p className="mb-0">0.0056 ETH</p>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6 align-self-end">
                                                            <div className="float-right mt-3">
                                                                <Link to="#" className="btn btn-primary">Select</Link>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col lg="4">
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

                                                        <div className="col-lg-6 align-self-end">
                                                            <div className="float-right mt-3">
                                                                <Link to="#" className="btn btn-primary">Select</Link>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col lg="4">
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

                                                        <div className="col-lg-6 align-self-end">
                                                            <div className="float-right mt-3">
                                                                <Link to="#" className="btn btn-primary">Select</Link>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>

                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody>
                                        <h4 className="card-title mb-4">Swap</h4>

                                        <div className="table-responsive">
                                            <Table className="table-nowrap table-centered mb-0">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Pool</th>
                                                    <th scope="col">Symbol</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Depth</th>
                                                    <th scope="col">Volume</th>
                                                    <th scope="col" colSpan="2">Revenue</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.assets.map((asset, key) =>
                                                        <tr key={key}>
                                                            <th scope="row">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="avatar-xs mr-3">
                                                                            <span
                                                                                className={"avatar-title rounded-circle bg-soft-" + asset.color + " text-" + asset.color + " font-size-18"}>
                                                                                <i className={asset.icon}></i>
                                                                            </span>
                                                                    </div>
                                                                    <span>{asset.title}</span>
                                                                </div>
                                                            </th>
                                                            <td>
                                                                <div className="text-muted">
                                                                    $ {asset.price}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <h5 className="font-size-14 mb-1">{asset.investRate}</h5>
                                                                <div className="text-muted">${asset.investPrice}</div>
                                                            </td>
                                                            <td>
                                                                <h5 className="font-size-14 mb-1">{asset.loansRate}</h5>
                                                                <div className="text-muted">${asset.loansPrice}</div>
                                                            </td>
                                                            <td>
                                                                <h5 className="font-size-14 mb-1">{asset.totalRate}</h5>
                                                                <div className="text-muted">${asset.totalPrice}</div>
                                                            </td>
                                                            <td style={{width: "120px"}}>
                                                                <Link to="#"
                                                                      className="btn btn-primary btn-sm w-xs">View</Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default SpartanPools;