import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {isEqual} from "WCHelpers/Utils";

configure({ adapter: new Adapter() });

const localStorageMock = (function() {
    let store = {};

    return {
        getItem: function(key) {
            return store[key] || null;
        },
        setItem: function(key, value) {
            store[key] = value ? value.toString() : undefined;
        },
        clear: function() {
            store = {};
        }
    };

})();
const sessionStorageMock = (function() {
    let store = {};

    return {
        getItem: function(key) {
            return store[key] || null;
        },
        setItem: function(key, value) {
            store[key] = value ? value.toString() : undefined;
        },
        clear: function() {
            store = {};
        }
    };

})();
expect.extend({
    toBeEqualWith(received, expected, failureMessage) {
        if (isEqual(expected, received)) {
            return {
                message: () => "success",
                pass: true
            };
        } else {
            return {
                message: () =>  "Expected:\n" +
                `  ${this.utils.printExpected(expected)}\n` +
                "Received:\n" +
                `  ${this.utils.printReceived(received)}` + `\nMessage:${failureMessage}`,
                pass: false
            };
        }
    }
});
Object.defineProperty(window, "localStorage", {value: localStorageMock});
Object.defineProperty(window, "sessionStorage", {value: sessionStorageMock});
Object.defineProperty(window, "getComputedStyle", {
    value: () => ({
        getPropertyValue: (prop) => {
            return "";
        }
    })
});

// eslint-disable-next-line no-undef
global.__SECTOR__ = "IN";