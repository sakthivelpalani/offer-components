//@flow
import DropdownFilterRenderer from "./DropdownFilterRenderer.js";
import Bank from "../../../domain/Bank.js";

export default class BankFilterRenderer extends DropdownFilterRenderer {
    getValue(domain: Bank) {
        return domain.getId();
    }

    getLabel(domain: Bank) {
        return domain.getName();
    }
    getFilterType() {
        return "bankFilter";
    }

    getTitle() {
        return "Bank";
    }

    getImagePlaceholder() {
        return "spriteBank";
    }
}