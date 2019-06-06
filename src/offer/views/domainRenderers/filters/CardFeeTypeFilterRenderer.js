//@flow
import DropdownFilterRenderer from "./DropdownFilterRenderer.js";
import {CardFeeType} from "../../../domain/CardFeeType.js";

export default class CardFeeTypeFilterRenderer extends DropdownFilterRenderer {
    getValue(domain: CardFeeType) {
        return domain.getValue();
    }

    getLabel(domain: CardFeeType) {
        return domain.getValue();
    }

    getFilterType() {
        return "cardFeeTypeFilter";
    }

    getTitle() {
        return "Card Fee Type";
    }
}