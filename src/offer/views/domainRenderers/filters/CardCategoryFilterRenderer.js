//@flow
import DropdownFilterRenderer from "./DropdownFilterRenderer.js";
import {CardCategory} from "../../../domain/CardCategoryList.js";

export default class CardCategoryFilterRenderer extends DropdownFilterRenderer {
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