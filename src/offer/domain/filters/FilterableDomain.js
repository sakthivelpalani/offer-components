// @flow
export default class FilterableDomain<DT, FT> {
    filterCriteria: Array<DT>
    constructor(selectedValues: Array<DT>) {
        this.filterCriteria = selectedValues;
    }
    getFilterOptions(filterableData: FT): Array<DT> {
        //the domain will decide whether it returns options or ranges
        return [];
    }

    filter(filterableData: FT): Promise<*> {
        //perform the filter action by making server call or client side matching
        return Promise.resolve();
    }

    setSelectedValues(selectedValues: Array<DT>) {
        this.filterCriteria = selectedValues;
    }

}