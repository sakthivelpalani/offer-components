import sinon from "sinon";
import BankFilterRenderer from "../BankFilterRenderer.js";
import BankDomain from "../../../../domain/Bank.js";

describe("Bank filter renderer", function() {
    it("should get value and label", function() {
        const bankDomain = new BankDomain();
        sinon.stub(bankDomain, "getName").returns("HDFC");
        sinon.stub(bankDomain, "getId").returns(1);
        expect(new BankFilterRenderer().getValue(bankDomain)).toBe(1);
        expect(new BankFilterRenderer().getLabel(bankDomain)).toBe("HDFC");
    });
});