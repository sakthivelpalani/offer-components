//@flow
import {compact, filter} from "lodash";

export default class List<DT, VT> {
    domains: Array<?DT>

    constructor(values: Array<string>) {
        if (values == undefined) {
            this.domains = [];
        } else {
            this.domains = values.map((value) => {
                return this.initDomain(value);
            });
        }
    }

    getValues(): Array<VT> {
        return compact(this.domains.map((domain) => {
            return this.getItemValue(domain);
        }));
    }

    getDomains(): Array<DT> {
        return filter(this.domains, (domain) => this.getItemValue(domain) != undefined);
    }

    initDomain(value: string): ?DT {
        return undefined;
    }

    getItemValue(domain: ?DT): ?VT {
        return undefined;
    }


}