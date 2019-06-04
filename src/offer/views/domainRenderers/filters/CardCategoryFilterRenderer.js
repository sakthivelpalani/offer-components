//@flow
import DropdownFilterRenderer from "./DropdownFilterRenderer.js";
import {CardCategory} from "../../../domain/CardCategoryList.js";

export default class CardCategoryFilterRenderer extends DropdownFilterRenderer {
    getValue(domain: CardCategory) {
        return domain.getValue();
    }

    getLabel(domain: CardCategory) {
        return domain.getValue();
    }

    getFilterType() {
        return "cardCategoryFilter";
    }

    getTitle() {
        return "Card Categories";
    }
}