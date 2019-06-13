import EnumBasedDropdownFilterRenderer from "./EnumBasedDropdownFilterRenderer.js";
import BankFilterRendererInner from "./BankFilterRenderer.js";
import * as Domains from "../../../domain/filters/index.js";

export const CardCategoryFilterRenderer = {
    renderer: EnumBasedDropdownFilterRenderer,
    domain: Domains.CardCategoryFilterableDomain,
    props: {
        title: "Card Categories",
        imageClassName: "symbolCardCategories"
    }
};
export const CardFeeTypeFilterRenderer = {
    renderer: EnumBasedDropdownFilterRenderer,
    domain: Domains.CardFeeTypeFilterableDomain,
    props: {
        title: "Card Fee Type",
        imageClassName: "symbolCardFeeType"
    }
};

export const CardNetworkFilterRenderer = {
    renderer: EnumBasedDropdownFilterRenderer,
    domain: Domains.CardNetworkFilterableDomain,
    props: {
        title: "Card Network",
        imageClassName: "symbolCardNetwork"
    }
};

export const BankFilterRenderer = {
    renderer: BankFilterRendererInner,
    domain: Domains.BankFilterableDomain,
    props:{
        title: "Bank",
        imageClassName: "symbolBank"
    }
};