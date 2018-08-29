/**
*@file: typeValids.js
*@author: afcfzf (9301462@qq.com)
*/

export default { // valids
    int: {
        valid(value) {
            return parseInt(value, 10) === value;
        },
        message: '不是正确的整数格式'
    },
    number: {
        valid(value) {
            return !isNaN(Number(value));
        },
        message() {
            return '不是正确的数字格式';
        }
    },
    email: {
        pattern: /^[^\s]+@[^\s]+\.[^\s]+$/,
        message() {
            return '不是正确的邮箱格式';
        }
    },
    url: {
        pattern: /^((\w+):\/\/)?([^\s]?[^\s]+\.)*[^\s]+\-?[^\s]+\.[^\s]{2,}(\/.*)*\/?$/,
        message() {
            return '不是正确的网址格式';
        }
    },
    tel: {
        pattern: /(^(\+\d{2,3}\/)?\d{3,4}(-)?\d{7,8}(\*\d{2,6})?$)|(^1\d{10}$)/,
        message() {
            return '不是正确的电话号码格式';
        }
    },
    mobile: {
        pattern: /^1\d{10}$/,
        message() {
            return '不是正确的手机号码格式';
        }
    },
    globalmobile: {
        pattern: /^[\+\-0-9a]+$/,
        message() {
            return '不是正确的国际号码格式';
        }
    } // international mobile
};
