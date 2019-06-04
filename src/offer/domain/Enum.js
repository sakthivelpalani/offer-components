//@flow
import {compact, filter} from "lodash";

class List<DT, VT> {
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

export class EnumList<VT> extends List<EnumDomain<VT>, VT> {

    getItemValue(domain: ?EnumDomain<VT>): ?VT {
        if (domain == undefined) {
            return undefined;
        }
        return domain.getValue();
    }
}

export class EnumDomain<VT> {
    value: VT
    constructor(value: string) {
        this.value = this.getTypes()[value];
    }

    getValue(): VT {
        return this.value;
    }

    getTypes(): any {
        return undefined;
    }
}

