export {default as BankFilterRenderer} from "./BankFilterRenderer.js";
export {default as CardCategoryFilterRenderer} from "./CardCategoryFilterRenderer.js";

import BankFilter from "../../../domain/filters/BankFilter.js";
import CardCategoryFilter from "../../../domain/filters/CardCategoryFilter.js";
export const filterDomainMappings = {
    BankFilterRenderer: BankFilter,
    CardCategoryFilterRenderer: CardCategoryFilter
};