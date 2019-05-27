import {CreditCard, ReviewsSummary, CreditCardAnnualFee, Rewards} from "./domainRenderers";

const configuration = {
    "CC": {
        "visibleItems": {
            "logoRenderer": CreditCard.ImageItemRenderer,
            "ratingsRenderer": ReviewsSummary.RatingItemRenderer,
            "rowRenderers": {
                "1": [CreditCard.NameItemRenderer],
                "2": [CreditCardAnnualFee.FirstYearFeeItemRenderer],
                "3": [Rewards.OneLinerItemRenderer]
            },
            "ctaRowPosition": "2"               
        }
    }
};

export default function getViewConfiguration(productType) {
    return configuration[productType];
}

