import {CreditCard, ReviewsSummary, CreditCardAnnualFee, Usp} from "./domainRenderers";

const configuration = {
    "CC": {
        "visibleItems": {
            "logoRenderer": CreditCard.ImageItemRenderer,
            "ratingsRenderer": ReviewsSummary.RatingItemRenderer,
            "rowRenderers": {
                "1": [CreditCard.NameItemRenderer],
                "2": [CreditCardAnnualFee.FirstYearFeeItemRenderer],
                "3": [Usp.OneLinerItemRenderer]
            },
            "ctaRowPosition": "2"               
        }
    }
};

export default function getViewConfiguration(productType) {
    return configuration[productType];
}

