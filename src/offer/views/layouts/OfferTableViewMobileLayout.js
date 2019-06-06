import React from "react";
import PropTypes from "prop-types";
import {filter, concat} from "lodash";

import OffersModel from "../../model/OffersModel";
import Context from "../../../helpers/Context.js";
import FilterContainerMobileLayout from "./FilterContainerMobileLayout.js";
import {reactElementForRendererViewConfig} from "../domainRenderers";
import Checkbox from "../../../controls/Checkbox.js";
import Style from "./OfferTableViewMobileLayout.scss";

export default class OfferTableViewMobileLayout extends React.PureComponent  {

    static propTypes = {
        offersModel: PropTypes.instanceOf(OffersModel).isRequired,
        context: PropTypes.instanceOf(Context).isRequired,
        viewConfiguration: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            filteredOffersModel: this.props.offersModel,
            filterShown: false,
            offerIdsToBeCompared: []
        };
    }

    renderOfferRow(offer) {
        const config = this.props.viewConfiguration["visibleItems"];
        const compareCheckHandler = (e, data) => {
            this.onCompareCheckChange(offer, data.checked);
        };
        return (
            <section className={Style.offer} key={`row-${offer.getId()}`}>
                <div className={Style.offerTopSection}>
                    <span className={Style.offerImageSection}>
                        <Checkbox value={offer.getId()} onChange={compareCheckHandler} />
                        {getLogoRenderer(config, offer)}
                        {getRatingsRenderer(config, offer)}
                    </span>
                    {getRowsRenderer(config, offer)}
                    <div>
                        {this.renderCTAButton()}
                    </div>
                </div>
            </section>
        );
    }

    render() {
        const offerRows = [];
        this.state.filteredOffersModel.getOffersMap().forEach((offer) => {
            offerRows.push(this.renderOfferRow(offer));
        });
        const offerRowsComponent =  <div className={Style.offerSection}>{offerRows}</div>;
        const filterContainer = <FilterContainerMobileLayout 
            offersModel={this.props.offersModel}
            onFilter={this.onFilter}/>;
        return (
            <div className={Style.offerSection}>
                <div className={[Style.editAppContainer, Style.container, Style.filterSticky].join(" ")}>
                    <div className={Style.filterStickyContainer}>
                        <div className={Style.offerCountInfo}>We found 14 Credit Cards<span onClick={this.showFilter} className={[Style.filterBtn, Style.textWithIcon, Style.offerSprite, Style["bbicons-filter"]].join(" ")}>Filter</span></div>
                    </div>
                </div>
                <div className={["modal", "fade", "filterModal", [this.state.filterShown ? "in":""]].join(" ")} style={!this.state.filterShown ? {display: "none"}: {display: "block"}}>
                    {filterContainer}
                </div>
                {offerRowsComponent}
            </div>
            ////This static HTML need to remove
            //<div className={[Style.offerSection, Style.offersCompare].join(" ")}>
            //
            //
            ////Filter Sticky
            //    <div className={[Style.editAppContainer, Style.container, Style.filterSticky].join(" ")}>
            //        <div className={Style.filterStickyContainer}>
            //            <div className={Style.offerCountInfo}>We found 14 Credit Cards<span className={[Style.filterBtn, Style.textWithIcon, Style.offerSprite, Style.bbiconsFilter].join(" ")}>Filter</span></div>
            //        </div>
            //    </div>
            //
            ////Offer Row With Animation
            //    <section  className={[Style.offer, Style.paperless, Style.ad].join(" ")}>
            //        <div className={Style.offerTopSection}>
            //            <span className={[Style.title, Style.bbiconsAds].join(" ")}>Citi PremierMiles Card</span>
            //
            //            <div className={Style.offerImageSection}>
            //                <span className={[Style.paperlessBadge, Style.badges].join(" ")}>
            //                    PAPERLESS
            //                    <span className={[Style.loader, Style.sliding].join(" ")}></span>
            //                </span>
            //                <input type="checkbox" className={[Style.checkbox, Style.CompareCheckBox, Style.bbiconsCheckBox, Style.textWithIcon, Style.offerSprite].join(" ")}/>
            //                <img src={"https://stg2.bankbazaar.com/images/india/cc-images/small/citibank-premier-miles-card.png"} alt="TATA CAPITAL LIMITED PERSONAL LOAN" title="TATA CAPITAL LIMITED PERSONAL LOAN" />
            //                <span className={[Style.textWithIconSmall, Style.offerSprite, Style.bbiconsUserRating].join(" ")}>4.0</span>
            //            </div>
            //
            //            <div className={Style.row}>
            //                <div className={Style.column}>
            //                    <span className={[Style.hideAndShow, Style.reducedFee].join(" ")}>
            //                        <span className={Style.reducedTo}>Reduced to
            //                            <strong className={[Style.textValue, Style.textWithIconSmall, Style.offerSprite, Style.biconsRsOne].join(" ")}>0</strong>
            //                        </span>
            //                        <span className={Style.annualSpend}>If annual spends &gt; <span className={[Style.textWithIconSmall, Style.offerSprite, Style.biconsRsTwo].join(" ")}>30,000</span> </span>
            //                    </span>
            //                    <span className={[Style.hideAndShow, Style.annualFee].join(" ")}>
            //                        <strong className={[Style.textValue, Style.textWithIconSmall, Style.offerSprite, Style.biconsRsOne].join(" ")}>3000</strong>
            //                        <div className={Style.textValueScondary}>1<sup>st</sup> Year Fee</div>
            //                    </span>
            //                </div>
            //                <div className={Style.column}><a className={Style.offerButton} href="#">Apply Now</a></div>
            //            </div>
            //            <span className={[Style.giftVoucher, Style.offerSpriteGV, Style.textWithIconSmall, Style.offerSprite, Style["bbicons-amazon"], Style.biconsRsTwo].join(" ")}> 500 Amazon Voucher</span>
            //            <span className={[Style.usp, Style.textWithIcon, Style.offerSprite, Style.bbiconsTravelCard].join(" ")}>High on rewards and travel benefits</span>
            //        </div>
            //
            //        <div className={Style.offerBottomSection}>
            //            <a className={[Style.viewDetails, Style.viewLess, Style.bbiconsViewDetails].join(" ")}>View More</a>
            //            <span className={[Style.textRewards, Style.textWithIcon, Style.offerSprite, Style.bbiconsTravel].join(" ")}>TRAVEL</span>
            //            <span className={[Style.textRewards, Style.textWithIcon, Style.offerSprite, Style.bbiconsPremium].join(" ")}>PREMIUM</span>
            //            <span className={[Style.textRewards, Style.textWithIcon, Style.offerSprite, Style.bbiconsRewards].join(" ")}>REWARDS</span>
            //        </div>
            //    </section>
            //
            ////Offer Row
            //    <section  className={[Style.offer, Style.sponsorOffer, Style.paperless, Style.ad].join(" ")}>
            //        <div className={Style.offerTopSection}>
            //            <a href="#" className={[Style.title, Style.bbiconsAds].join(" ")}>Citi PremierMiles Card</a>
            //
            //            <div className={Style.offerImageSection}>
            //                <span className={[Style.paperlessBadge, Style.badges].join(" ")}>
            //                    PAPERLESS
            //                    <span className={[Style.loader, Style.sliding].join(" ")}></span>
            //                </span>
            //                <input type="checkbox" className={[Style.checkbox, Style.CompareCheckBox, Style.bbiconsCheckBox, Style.textWithIcon, Style.offerSprite].join(" ")}/>
            //                <img src={"https://stg2.bankbazaar.com/images/india/cc-images/small/citibank-premier-miles-card.png"} alt="TATA CAPITAL LIMITED PERSONAL LOAN" title="TATA CAPITAL LIMITED PERSONAL LOAN" />
            //                <span className={[Style.textWithIconSmall, Style.offerSprite, Style.bbiconsUserRating].join(" ")}>4.0</span>
            //            </div>
            //
            //            <div className={Style.row}>
            //                <div className={Style.column}>
            //                    <strong className={[Style.textValue, Style.textWithIconSmall, Style.offerSprite, Style.biconsRsOne].join(" ")}>3000</strong>
            //                    <div className={Style.textValueScondary}>1<sup>st</sup> Year Fee</div>
            //                </div>
            //                <div className={Style.column}><a className={Style.offerButton} href="#">Apply Now</a></div>
            //            </div>
            //            <span className={[Style.giftVoucher, Style.offerSpriteGV, Style.textWithIconSmall, Style.offerSprite, Style["bbicons-amazon"], Style.biconsRsTwo].join(" ")}> 500 Amazon Voucher</span>
            //            <span className={[Style.usp, Style.textWithIcon, Style.offerSprite, Style.bbiconsTravelCard].join(" ")}>High on rewards and travel benefits</span>
            //        </div>
            //
            //        <div className={Style.offerBottomSection}>
            //            <a className={[Style.viewDetails, Style.viewLess, Style.bbiconsViewDetails].join(" ")}>View More</a>
            //            <span className={[Style.textRewards, Style.textWithIcon, Style.offerSprite, Style.bbiconsTravel].join(" ")}>TRAVEL</span>
            //            <span className={[Style.textRewards, Style.textWithIcon, Style.offerSprite, Style.bbiconsPremium].join(" ")}>PREMIUM</span>
            //            <span className={[Style.textRewards, Style.textWithIcon, Style.offerSprite, Style.bbiconsRewards].join(" ")}>REWARDS</span>
            //        </div>
            //
            //        <div className={[Style.offerDetailsSection, Style.collapse, Style.in].join(" ")}>
            //            <div className={Style.detailsTitle}>Rewards</div>
            //            <ul className={Style.rewards}>
            //                <li>10 miles/<span className={[Style.textWithIcon, Style.offerSprite, Style.biconsRsTwo]}>100</span> spent on flight tickets and hotel bookings made on the PremierMiles website and with select partners</li>
            //            </ul>
            //            <div className={Style.detailsTitle}>Joining Perks</div>
            //            <ul className={Style.joiningPerks}>
            //                <li>10,000 miles</li>
            //            </ul>
            //            <div className={Style.detailsTitle}>Fee Details</div>
            //            <ul className={Style.feeDetails}>
            //                    <li>1st Year - <span className={[Style.textWithIconSmall, Style.offerSprite, Style.biconsRsTwo].join(" ")}>3,000</span></li>
            //                <li>2nd Year Onwards - <span className={[Style.textWithIconSmall, Style.offerSprite, Style.biconsRsTwo].join(" ")}>3,000</span></li>
            //                <li>1st year fee waived for Citi Priority customers</li>
            //            </ul>
            //            <div className={Style.detailsTitle}>What youll love</div>
            //            <ul className={Style.pros}>
            //                <li>Complimentary access to select airport lounges across India</li>
            //                <li>Complimentary air accident insurance coverage up to <span className={[Style.textWithIconSmall, Style.offerSprite, Style.biconsRsTwo].join(" ")}>1 crore</span></li>
            //            </ul>
            //            <div className={Style.detailsTitle}>Youll also love</div>
            //            <ul className={Style.nittyGritty}>
            //                <li>Up to 15% savings at participating restaurants.</li>
            //                <li>Redeem miles for flight tickets across 100+ airlines on the PremierMiles website and with select partners.</li>
            //                <li><a href="https://www.online.citibank.co.in/products-services/online-services/pdfs/soe-tnc.pdf">Terms &amp; conditions apply</a></li>
            //            </ul>
            //            <div className={Style.detailsTitle}>Think about</div>
            //            <ul className={Style.cons}>
            //                <li>No annual fee waiver</li>
            //            </ul>
            //            <div className={Style.detailsTitle}>Documents</div>
            //            <ul className={Style.documents}>
            //                <li>KYC-PAN, Address proof and ID Proof</li>
            //                <li>One photograph, Salary slip/Form 16</li>
            //            </ul>
            //            <div className={Style.detailsTitle}>Perks</div>
            //            <ul className={Style.frills}>
            //                <li className={Style.disabled}>Door step service</li>
            //                <li className={Style.disabled}>E-approval</li>
            //            </ul>
            //            <div className={Style.detailsTitle}>Downloads</div>
            //            <ul className={Style.downloads}>
            //                <li className={[Style.textWithIcon, Style.offerSprite, Style.bbiconsDownload].join(" ")}>Door step service</li>
            //            </ul>
            //            <div className={Style.detailsTitle}>Customer Reviews</div>
            //            <ul className={Style.customerReview}>
            //                <li>
            //                    <div className={Style.subTitle}>Smooth Process <span> Guru</span></div>
            //                    Tata Capitals Personal Loan process was fast - completed within 3 days. Their customer service executives responded quickly.
            //                </li>
            //                <li>
            //                    <div className={Style.subTitle}>Quick Response <span> Nagavenkata Ramakrishnan</span></div>
            //                    I appreciate the immediate assistance provided. Everything was in place.
            //                </li>
            //                <li>
            //                    <div className={Style.subTitle}>Attractive Services <span> Rajnigandha</span></div>
            //                    Loved the services offered by Tata Capital! They provided preclosure and part payment options, no processing fees, and the entire process was completed within 3 days.
            //                </li>
            //                <li>
            //                    <div className={Style.subTitle}>Reasonable Rates And Fees <span> Prudhvi</span></div>
            //                    Tata Capitals response was immediate. Also,they charged very nominal interest rates and processing fees for the loan.
            //                </li>
            //            </ul>
            //        </div>
            //    </section>
            //
            //</div>
        );
    }

    onFilter = (filteredOffersModel) => {
        this.setState({filteredOffersModel, filterShown: false});
    }

    onCompareCheckChange = (offer, checked) => {
        let newOfferIdsToBeCompared;
        if (checked) {
            newOfferIdsToBeCompared  = concat(this.state.offerIdsToBeCompared, offer.getId());
        } else {
            newOfferIdsToBeCompared  = filter(this.state.offerIdsToBeCompared, (offerId) => offer.getId() != offerId);
        }
        this.setState({offerIdsToBeCompared: newOfferIdsToBeCompared});
    }

    showFilter = () => {
        this.setState({filterShown: true});
    }

    renderCTAButton() {
        return (
            <a className={Style.offerButton} onClick={this.applyNowHandler}>APPLY NOW</a>
        );
    }

    applyNowHandler() {
        //implement this
        return;
    }

} 

const getLogoRenderer = function(config, offer) {
    return reactElementForRendererViewConfig(config.logoRenderer, offer);
};

const getRatingsRenderer = function(config, offer) {
    return reactElementForRendererViewConfig(config.ratingsRenderer, offer);
};

const getRowsRenderer = function(config, offer) {
    const rows = [];
    Object.entries(config.rowRenderers).forEach(function([rowNumber, itemTypes]) {
        const itemsDiv = itemTypes.map((itemType) => {
            return (<div key={rowNumber}>{reactElementForRendererViewConfig(itemType, offer)}</div>);
        });
        rows.push((
            <div className={[`row-${rowNumber}`, Style.row].join(" ")} key={rowNumber}>
                {itemsDiv}
            </div>
        ));
    });

    return rows;
};