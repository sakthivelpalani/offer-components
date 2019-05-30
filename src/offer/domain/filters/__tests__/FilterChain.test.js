import sinon from "sinon";
import FilterChain from "../FilterChain.js";
import FilterableDomain from "../FilterableDomain";
import OffersModel from "../../../model/OffersModel.js";

describe("Filter chain", function() {
    it("should filter basis the criteria from all domains", () => {
        const filter1 = new FilterableDomain();
        const filter2 = new FilterableDomain();
        const initialData = new OffersModel([]);
        const outputOfFilter1 = new OffersModel([]);
        const outputOfFilter2 = new OffersModel([]);
        const filterableDomainStub1 = sinon.stub(filter1, "filter").withArgs(initialData).returns(outputOfFilter1);
        const filterableDomainStub2 = sinon.stub(filter2, "filter").withArgs(outputOfFilter1).returns(outputOfFilter2);
        
        return (new FilterChain([filter1, filter2]).doFilter(initialData).then((filteredData) => {
            expect(filteredData).toBe(outputOfFilter2);
            expect(filterableDomainStub1.called).toBe(true);
            expect(filterableDomainStub2.called).toBe(true);
        })); 
    });
});