export {default as BankFilterRenderer} from "./BankFilterRenderer.js";
export {default as CardCategoryFilterRenderer} from "./CardCategoryFilterRenderer.js";
export {default as CardFeeTypeFilterRenderer} from "./CardFeeTypeFilterRenderer.js";

import BankFilter from "../../../domain/filters/BankFilter.js";
import CardCategoryFilter from "../../../domain/filters/CardCategoryFilter.js";
import CardFeeTypeFilter from "../../../domain/filters/CardFeeTypeFilter.js";
export const filterDomainMappings = {
    BankFilterRenderer: BankFilter,
    CardCategoryFilterRenderer: CardCategoryFilter,
    CardFeeTypeFilterRenderer: CardFeeTypeFilter
};