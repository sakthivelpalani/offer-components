import {CardNetworkList} from "../CardNetwork.js";

describe("Card network list domain", function() {
    it("should set value as one of enums", function() {
        const cardNetworkDomain = new CardNetworkList(["VISA", "MASTER"]);
        expect(cardNetworkDomain.getValues()).toEqual(["VISA", "MASTER"]);
    });

    it("should not set value if value does not belong to enum", function() {
        const cardNetworkDomain = new CardNetworkList(["some type", "VISA"]);
        expect(cardNetworkDomain.getValues()).toEqual(["VISA"]);
    });
});