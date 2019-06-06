import {EnumDomain} from "../../../../domain/Enum.js";
import EnumBasedDropdownFilterRenderer from "../EnumBasedDropdownFilterRenderer.js";

class EnumDomainStub extends EnumDomain {
    getTypes() {
        return {
            VALUE: "VALUE"
        };
    }
}
describe("Enum domain filter renderer", function () {
    it("should get value from domain", function() {
        const enumDomain = new EnumDomainStub("VALUE");
        
        expect(new EnumBasedDropdownFilterRenderer().getValue(enumDomain)).toBe("VALUE");
        expect(new EnumBasedDropdownFilterRenderer().getLabel(enumDomain)).toBe("VALUE");
    });
});