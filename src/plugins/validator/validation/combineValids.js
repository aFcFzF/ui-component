/**
*@file: combineValids.js
*@author: afcfzf (9301462@qq.com)
*/

export default { // valids
    lessThan(value1, value2) {
        return Number(value1) < Number(value2);
    },
    greaterThan(value1, value2) {
        return Number(value1) > Number(value2);
    },
    equal(value1, value2) {
        return value1 === value2;
    }
};
