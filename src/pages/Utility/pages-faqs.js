import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Media, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from 'classnames';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

class PagesFaqs extends Component {
    constructor() {
        super();
        this.state = {
            activeTab: '1',
        }
        this.toggleTab = this.toggleTab.bind(this);
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumbs */}
                        <Breadcrumbs title="Utility" breadcrumbItem="FAQs" />

                        <div className="checkout-tabs">
                            <Row>
                                <Col lg="2">
                                    <Nav className="flex-column" pills>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '1' })}
                                                onClick={() => { this.toggleTab('1'); }}
                                            >
                                                <i className="bx bx-question-mark d-block check-nav-icon mt-4 mb-2"></i>
                                                <p className="font-weight-bold mb-4">General Questions</p>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '2' })}
                                                onClick={() => { this.toggleTab('2'); }}
                                            >
                                                <i className="bx bx-check-shield d-block check-nav-icon mt-4 mb-2"></i>
                                                <p className="font-weight-bold mb-4">Privacy Policy</p>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '3' })}
                                                onClick={() => { this.toggleTab('3'); }}
                                            >
                                                <i className="bx bx-support d-block check-nav-icon mt-4 mb-2"></i>
                                                <p className="font-weight-bold mb-4">Support</p>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </Col>
                                <Col lg="10">
                                    <Card>
                                        <CardBody>
                                            <TabContent activeTab={this.state.activeTab}>
                                                <TabPane tabId="1">
                                                    <CardTitle className="mb-5">General Questions</CardTitle>
                                                    <Media className="faq-box mb-4">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">What is Spartan Protocol??</h5>
                                                            <p className="text-muted">The Spartan Protocol is a wholesome and complete protocol that allows the safe growth of synthetic assets, lending markets and for all assets to be liquid and productive.<br/><br/>
                                                                A small amount of governance is necessary to manage the upgrading of contracts and the tweaking of some of the protocol’s parameters.<br/><br/>
                                                                The governance process is at-risk as such that there is a direct link between healthy and effective governance and the value of exposed collateral.The Spartan Protocol borrows ideas for UniSwap, THORChain, Synthetix, MakerDAO and Vader/Vether Protocol, but will be launched on Binance Smart Chain as its own separate protocol.</p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="faq-box mb-4">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">Who are the founders?</h5>
                                                            <p className="text-muted">The project is galvanized by communities of former Binance Chain projects. The project begins decentralised from day 0; there is no official team and no treasury.</p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="faq-box mb-4">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">Is the team anoynous?</h5>
                                                            <p className="text-muted">That's a tough question but thankfully, our team is on it. Please bear with us while we're investigating.Yes, the Spartan Protocol is a community driven initiative with a wide and varied source of contributors. It draws inspiration from Thorchain and other projects that elected to go anonymous in line with the world’s most known token, Bitcoin.<br/><br/>
                                                                This is done to protect the project and it’s users to assist in ensuring it can be more decentralised from its outset. The focus should be on the project, its code and the community that drives it, these are transparent and verifiable.
                                                                <br/><br/>Don’t trust, verify! <a href="https://github.com/spartan-protocol">Github</a></p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="faq-box mb-4">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">No airdrop — No founder/team tokens — No pre-sale?</h5>
                                                            <p className="text-muted">Zero, none, nada — Like the 300 Spartans that held Hells Gate, the team believe in the true intent of DeFi to provide open solutions for all on an equal playing field.<br/><br/>
                                                                The only way for anyone to have access to SPARTA tokens is by burning selected BEP20 tokens. This applies to everyone, there are no advantages given here. The Spartans believe the token will accrue value through genuine use and not through gimmicks.</p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="faq-box">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">Why!? How can something be built without treasury and hierarchy?!
                                                            </h5>
                                                            <p className="text-muted">It’s a community give back. Spartan Protocol are not trying to scam or get rich quick off the back of this. SP believes that this is a great way to attract holders of other tokens that may be looking for a way out or looking for some staking benefits not necessarily available to them currently. There are various reasons. If it works, everyone should be rewarded and come out on top.<br/><br/>
                                                                The most important component of SP is that the team doesn’t have FREE skin in the game — if they want Sparta, they burn as well. There are no presale or private sale allocations waiting to be dumped. That seems to be the general MO for a rug pull, so it’s good to know this is not a risk-variable of this project.</p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="faq-box">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">I see this is a community project, so how can I contribute or influence the direction of Spartan Protocol?
                                                            </h5>
                                                            <p className="text-muted">Right now you can contribute by being a part of these community channels and asking good questions. What is said in these channels directly influences what happens leading up to launch as each of you are a part of the decentralised team.<br/><br/>
                                                                Please see the Report Bug/Suggest Feature tab for how to raise BitHub issue for the developeres to address directly whilst working on the code. This will help keep a clean and clear set of priorities for the devs to work on. If you know how already, head over to Spartan Protocol Github and submit your issues now. Thankyou.<br/><br/>
                                                                If you are not, contribute your words or put your hand up for other jobs in the community channels at the bottom of this page. This FAQ was curated by the community, many hands make light work!</p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="faq-box">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">How to obtain SPARTA tokens?
                                                            </h5>
                                                            <p className="text-muted">Spartan Protocol starts decentralised from day one. To acquire SPARTA you will need to send your tokens through a smart contract on the Spartan Protocol DApp. The tokens you send through this contract will be ‘burnt’.<br/><br/>
                                                                Your tokens will be sent to a this burn address (0x000000000000000000000000000000000000dEaD) and will no longer be usable by anyone. The smart contract will then send your freshly minted SPARTA of equivalent value to your BSC address once the old tokens have been confirmed burned.<br/><br/>
                                                                There is minimal wait compared to smart contracts on Ethereum, most processes take only 1–5 seconds</p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="faq-box">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">So do I need to buy coins to get tokens?

                                                            </h5>
                                                            <p className="text-muted">Not necessarily; to obtain SPARTA tokens you will need to have BEP20 tokens from the chosen projects to burn in exchange for SPARTA.<br/><br/>
                                                                There might be some you already own, some you already hold, some you want to sell but can’t get the right price, or some that you decide to acquire deliberately for the purpose of getting Sparta.</p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="faq-box">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">Why is burning the collateral necessary, can't we donate it somewhere or use the funds as a treasury?
                                                            </h5>
                                                            <p className="text-muted">By burning your tokens to receive SPARTA, it shows an individual’s commitment to the project, every token has an inherent value associated with it set by the market.<br/><br/>
                                                                This in effect transfers their value over to the SPARTA token. If the Protocol was to hold or dispense the tokens received that value would be diluted.<br/><br/>
                                                                We are not interested in anything resembling an ICO where valuations are manipulated. Let’s just stick with the ‘burning’ part of a token price ‘crashing and burning’. Besides; the community is confident they can provide what is required without a treasury.</p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="faq-box">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">I am interested but not keen to risk a lot of money! Is there a minimum amount i can burn?
                                                            </h5>
                                                            <p className="text-muted">There is no minimum qty! Binance Smart Chain fees are also very low allowing for smaller token holders to participate.<br/><br/>
                                                                However; the current MetaMask implementation REQUIRES AT LEAST 0.51BNB in your wallet for the DApp to work properly! If MetaMask comes up with a crazy fees-price, then this is the issue, make sure you get more BNB in your wallet!</p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="faq-box">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">Why is burning the collateral necessary, can't we donate it somewhere or use the funds as a treasury?
                                                            </h5>
                                                            <p className="text-muted">By burning your tokens to receive SPARTA, it shows an individual’s commitment to the project, every token has an inherent value associated with it set by the market.<br/><br/>
                                                                This in effect transfers their value over to the SPARTA token. If the Protocol was to hold or dispense the tokens received that value would be diluted.<br/><br/>
                                                                We are not interested in anything resembling an ICO where valuations are manipulated. Let’s just stick with the ‘burning’ part of a token price ‘crashing and burning’. Besides; the community is confident they can provide what is required without a treasury.</p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="faq-box">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">Do I need BNB to use Spartan Protocol?
                                                            </h5>
                                                            <p className="text-muted">Yes, please make sure you have at least 0.51BNB in your wallet to interact with MetaMask properly. You will use less than 0.05BNB to pay for transactions, other operations and staking. BNB performs the same function as ETH for Ethereum (aka 'gas')<br/><br/>
                                                                However one of the biggest differences is that Binance Smart Chain's fees are extremely low (and fast) compared to Ethereum! We are talking single digit cents, none of these $80-dollar Ethereum transactions!</p>
                                                        </Media>
                                                    </Media>
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    <CardTitle className="mb-5">Privacy Policy</CardTitle>

                                                    <Media className="faq-box mb-4">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">Where does it come from?</h5>
                                                            <p className="text-muted">Everyone realizes why a new common language would be desirable one could refuse to pay expensive translators.</p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="faq-box mb-4">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">Where can I get some?</h5>
                                                            <p className="text-muted">To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental</p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="faq-box mb-4">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">What is Lorem Ipsum?</h5>
                                                            <p className="text-muted">New common language will be more simple and regular than the existing European languages. It will be as simple as occidental.</p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="faq-box mb-4">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">Why do we use it?</h5>
                                                            <p className="text-muted">Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary.</p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="faq-box">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">Where can I get some?</h5>
                                                            <p className="text-muted">If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages.</p>
                                                        </Media>
                                                    </Media>
                                                </TabPane>
                                                <TabPane tabId="3">
                                                    <CardTitle className="mb-5">Support</CardTitle>

                                                    <Media className="faq-box mb-4">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">Where can I get some?</h5>
                                                            <p className="text-muted">To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental</p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="faq-box mb-4">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">Where does it come from?</h5>
                                                            <p className="text-muted">Everyone realizes why a new common language would be desirable one could refuse to pay expensive translators.</p>
                                                        </Media>
                                                    </Media>

                                                    <Media className="faq-box mb-4">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">Why do we use it?</h5>
                                                            <p className="text-muted">Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary.</p>
                                                        </Media>
                                                    </Media>
                                                    <Media className="faq-box mb-4">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">Where can I get some?</h5>
                                                            <p className="text-muted">If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages.</p>
                                                        </Media>
                                                    </Media>

                                                    <Media className="faq-box">
                                                        <div className="faq-icon mr-3">
                                                            <i className="bx bx-help-circle font-size-20 text-success"></i>
                                                        </div>
                                                        <Media body>
                                                            <h5 className="font-size-15">What is Lorem Ipsum?</h5>
                                                            <p className="text-muted">New common language will be more simple and regular than the existing European languages. It will be as simple as occidental.</p>
                                                        </Media>
                                                    </Media>
                                                </TabPane>
                                            </TabContent>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>

                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default PagesFaqs;