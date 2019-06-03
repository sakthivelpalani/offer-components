import Context from "../Context.js";

export const createCCContext = () => {
    const data = {
        deviceType: "MOBILE",
        productType: "CC"
    };
    return new Context(data);
};