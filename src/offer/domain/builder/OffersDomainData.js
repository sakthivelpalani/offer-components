import {isEmpty, startsWith} from "lodash";

export const massage = function(personalizedOfferListString, offerFeaturesListString) {
    const offerFeaturesList = JSON.parse(replaceRupeeSymbol(offerFeaturesListString));
    const personalizedOfferList = JSON.parse(replaceRupeeSymbol(personalizedOfferListString));

    const personalizedOfferMap = personalizedOfferList.reduce((aggr, offer) => {
        aggr[offer.cpId] = offer;
        return aggr;
    }, {});
    const offerFeaturesMap = offerFeaturesList.reduce((aggr, offerFeatures) => {
        aggr[offerFeatures.cpId] =  offerFeatures;
        return aggr;
    }, {});
    return Object.keys(offerFeaturesMap).map((cpId) => {
        const offer = personalizedOfferMap[cpId];
        const offerDomainData = Object.assign({}, offerFeaturesMap[cpId]);
        copyValues(offerDomainData, offer, ["cardId", "bank"]);
        overWriteFee(offerDomainData, offer, "secondYearFeeOnwards", "secondYearFee");
        overWriteFee(offerDomainData, offer, "oldFirstYearFee", "firstYearFee");
        substituteProductNoticeInPros(offerDomainData, offer);
        evaluateVariablesInCollection(offerDomainData, offer, "pros");
        evaluateVariablesInCollection(offerDomainData, offer, "documents");
        return offerDomainData;
    });
};

const copyValues = function(offerDomainData, personalizedOffer, keys) {
    keys.forEach((key) => {
        offerDomainData[key] = personalizedOffer[key];
    });
};

const overWriteFee = function(offerDomainData, personalizedOffer, sourceFee, destinationFee) {
    if (isEmpty(offerDomainData[destinationFee])) {
        offerDomainData[destinationFee] = {};
    }
    if (!isEmpty(personalizedOffer) && 
        !isEmpty(personalizedOffer[sourceFee]) && 
        personalizedOffer[sourceFee].value != undefined) {
        if (isEmpty(offerDomainData[destinationFee].fees)) {
            offerDomainData[destinationFee].fees = {code: "INR"};
        }
        offerDomainData[destinationFee].fees.value = personalizedOffer[sourceFee].value;
    }
};

const substituteProductNoticeInPros = function(offerDomainData, personalizedOffer) {
    if (!isEmpty(personalizedOffer) && !isEmpty(personalizedOffer.productNotice)) {
        if (isEmpty(offerDomainData.pros)) {
            offerDomainData.pros = [];
        }
        offerDomainData.pros.push({text: personalizedOffer.productNotice});
    }
};

const evaluateVariablesInCollection = function(offerDomainData, personalizedOffer, key) {
    if (!isEmpty(offerDomainData) && !isEmpty(offerDomainData[key])) {
        offerDomainData[key] = offerDomainData[key].map((item) => {
            if (!isEmpty(item) && !isEmpty(item.text) && 
                startsWith(item.text, "${") && !isEmpty(personalizedOffer)) {
                /* eslint-disable */
                const isSTPOnly = personalizedOffer.isSTPOnly;
                const isPreApproved = personalizedOffer.isPreApproved;
                /* eslint-enable */
                item.text = eval("`" + item.text + "`");
            }
            return item;
        });
    }
};

const replaceRupeeSymbol = function(text) {
    return text.replace(/\$\{RUPEE\}/g, "Rs.");
};