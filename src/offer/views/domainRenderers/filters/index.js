import EnumBasedDropdownFilterRenderer from "./EnumBasedDropdownFilterRenderer.js";
import BankFilterRendererInner from "./BankFilterRenderer.js";
import * as Domains from "../../../domain/filters/index.js";

export const CardCategoryFilterRenderer = {
    renderer: EnumBasedDropdownFilterRenderer,
    domain: Domains.CardCategoryFilterableDomain,
    props: {
        title: "Card Categories",
        imageClassName: "sprite-card-categories"
    }
};
export const CardFeeTypeFilterRenderer = {
    renderer: EnumBasedDropdownFilterRenderer,
    domain: Domains.CardFeeTypeFilterableDomain,
    props: {
        title: "Card Fee Type",
        imageClassName: "sprite-card-fee-type"
    }
};

export const CardNetworkFilterRenderer = {
    renderer: EnumBasedDropdownFilterRenderer,
    domain: Domains.CardNetworkFilterableDomain,
    props: {
        title: "Card Network",
        imageClassName: "sprite-card-network"
    }
};

export const BankFilterRenderer = {
    renderer: BankFilterRendererInner,
    domain: Domains.BankFilterableDomain,
    props:{
        title: "Bank",
        imageClassName: "sprite-bank"
    }
};