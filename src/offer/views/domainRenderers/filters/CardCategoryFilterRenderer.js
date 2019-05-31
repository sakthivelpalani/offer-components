//@flow
import CheckboxFilterRenderer from "./CheckboxFilterRenderer.js";
import {CardCategory} from "../../../domain/CardCategoryList.js";

export default class CardCategoryFilterRenderer extends CheckboxFilterRenderer {
    getValue(domain: CardCategory) {
        return domain.getValue();
    }

    getName(domain: CardCategory) {
        return domain.getValue();
    }

    getFilterType() {
        return "cardCategoryFilter";
    }
}