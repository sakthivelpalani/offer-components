import EnumBasedDropdownFilterRenderer from "./EnumBasedDropdownFilterRenderer.js";

export default class CardFeeTypeFilterRenderer extends EnumBasedDropdownFilterRenderer {
    getTitle() {
        return "Card Fee Type";
    }
}