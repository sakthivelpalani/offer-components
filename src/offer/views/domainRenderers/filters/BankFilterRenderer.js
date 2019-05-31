//@flow
import CheckboxFilterRenderer from "./CheckboxFilterRenderer.js";
import Bank from "../../../domain/Bank.js";

export default class BankFilterRenderer extends CheckboxFilterRenderer {
    getValue(domain: Bank) {
        return domain.getId();
    }

    getName(domain: Bank) {
        return domain.getName();
    }
    getFilterType() {
        return "bankFilter";
    }
}