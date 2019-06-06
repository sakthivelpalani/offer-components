//@flow
import DropdownFilterRenderer from "./DropdownFilterRenderer.js";
import {EnumDomain} from "../../../domain/Enum.js";

export default class EnumBasedDropdownFilterRenderer extends DropdownFilterRenderer {
    getValue(domain: EnumDomain<any>) {
        return domain.getValue();
    }

    getLabel(domain: EnumDomain<any>) {
        return domain.getValue();
    }
}