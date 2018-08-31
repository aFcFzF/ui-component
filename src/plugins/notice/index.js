/**
*@file: index.js
*@author: afcfzf (9301462@qq.com)
*/

import Notify from '../notify';
import utils from '../../utils/utils';

const prefixCls = 'ui-notice';
const iconPrefixCls = 'ui-icon';
let Vue = null;

let Default = {
    timeout: 4000
};

const iconNames = {
    info: 'info',
    success: 'success',
    warn: 'warn',
    error: 'error'
};
const iconColor = {
    info: 'blue',
    success: 'green',
    warn: 'yellow',
    error: 'red'
};

let noticeDom = null;

function Notice(originalParam) {
    if (!noticeDom) {
        noticeDom = document.createElement('div');
        utils.addClass(noticeDom, `${prefixCls}-container`);
        document.body.appendChild(noticeDom);
    }

    let param = {
        type: prefixCls,
        hasCloseIcon: true,
        parent: noticeDom
    };

    if (new Set(Object.keys(iconNames)).has(originalParam.type)) {
        originalParam.title && (originalParam.style = `${prefixCls}-has-icon`);
        originalParam.content = `<i class="${iconPrefixCls}-${iconNames[originalParam.type]} ${iconColor[originalParam.type]}-color"></i>${originalParam.content}`;
        delete originalParam.type;
    }
    else if (originalParam.icon) {
        originalParam.title && (originalParam.style = `${prefixCls}-has-icon`);
        originalParam.content = `<i class="${originalParam.icon}"></i>${originalParam.content}`;
    }
    param = utils.extend({}, Default, param, originalParam, true);
    param.Vue = Vue;
    return Notify(param);
}

function notice(param, timeout) {
    if (utils.isString(param)) {
        return Notice({
            content: param,
            timeout
        });
    }
    else if (utils.isObject(param)) {
        this.$router && (param.$router = this.$router);
        return Notice(param);
    }
    console.error('Notice params are incorrect:', param);
}

notice.config = options => options.timeout !== undefined && (Default.timeout = options.timeout);


function noticeWithType(type, param, timeout) {
    if (utils.isString(param)) {
        return Notice({
            content: param,
            timeout, type
        });
    }
    else if (utils.isObject(param)) {
        type && (param.type = type);
        return Notice(param);
    }
    console.error('Notice params are incorrect:', param);
}

notice.error = (param, timeout) => noticeWithType('error', param, timeout);
notice.warn = (param, timeout) => noticeWithType('warn', param, timeout);
notice.success = (param, timeout) => noticeWithType('success', param, timeout);
notice.info = (param, timeout) => noticeWithType('info', param, timeout);

export default vue => {
    Vue = vue;
    return notice;
};
