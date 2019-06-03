import {CreditCard, ReviewsSummary, CreditCardAnnualFee, Usp} from "./domainRenderers";
import {BankFilterRenderer, CardCategoryFilterRenderer} from "./domainRenderers/filters";

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
        },
        "filters": [BankFilterRenderer, CardCategoryFilterRenderer]
    }
};

export default function getViewConfiguration(productType) {
    return configuration[productType];
}

