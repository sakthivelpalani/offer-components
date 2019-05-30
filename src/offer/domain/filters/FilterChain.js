//@flow
export default class FilterChain<FT> {
    filterableDomains: Array<any>
    constructor(filterableDomains: Array<any>) {
        this.filterableDomains = filterableDomains;
    }

    doFilter(filterableData: FT): Promise<FT> {
        return this.filterableDomains.reduce((promiseAggr, filterableDomain) => promiseAggr.then(
            (result) => filterableDomain.filter(result)
        ), Promise.resolve(filterableData));
    }
}