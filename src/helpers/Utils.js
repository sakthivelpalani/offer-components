/* eslint no-restricted-imports: ["error", {paths: ["lodash"]}] */
// We really require these and cannot be replaced
import {chunk, cloneDeep, debounce, merge, mergeWith} from "lodash-es";

// We should aim to avoid these if possible
import {concat, differenceWith, intersectionWith, isBoolean, isUndefined, last, union, unionWith, values, inRange, isObject, isPlainObject, isEqual, isMatch, isEmpty, isFunction, omit, omitBy, pickBy, uniqBy, sortBy, get, set, startsWith, upperFirst, startCase, camelCase} from "lodash-es";

export {chunk, cloneDeep, debounce, merge, mergeWith};
export {concat, differenceWith, intersectionWith, isBoolean, isUndefined, last, union, unionWith, values, inRange, isObject, isPlainObject, isEqual, isMatch, isEmpty, isFunction, omit, omitBy, pickBy, uniqBy, sortBy, get, set, startsWith, upperFirst, startCase, camelCase};
