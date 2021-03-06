/**
*@file: index.js
*@author: afcfzf (9301462@qq.com)
*/
/*eslint-disable*/
import Notify from '../notify';
import utils from '../../utils/utils';

const prefixCls = 'ui-message';
const iconPrefixCls = 'ui-icon';

const Default = {
    timeout: 3000
};

const iconNames = {
    info: 'info',
    success: 'success',
    warn: 'warn',
    error: 'error',
    loading: 'loading'
};
const iconColor = {
    info: 'blue',
    success: 'green',
    warn: 'yellow',
    error: 'red',
    loading: 'blue'
};

function Message(content, timeout, type, onClose) {
    let param = {
        type: prefixCls,
        content: `<div><i class="${iconPrefixCls}-${iconNames[type]} ${iconColor[type]}-color"></i>${content}</div>`,
        event: {
            close: onClose
        },
        timeout
    };
    param = utils.extend({}, Default, param, true);
    param.timeout < 1 && (param.hasCloseIcon = true);
    return Notify(param);
}

function message(content, timeout, onClose) {
    if (utils.isObject(content)) {
        return Message(content.text, content.timeout, content.type || 'info', content.onClose);
    }
    return Message(content, timeout, 'info', onClose);
}

message.info = (content, timeout, onClose) => Message(content, timeout, 'info', onClose);

message.success = (content, timeout, onClose) =>  Message(content, timeout, 'success', onClose);

message.warn = (content, timeout, onClose) => Message(content, timeout, 'warn', onClose);

message.error = (content, timeout, onClose) => Message(content, timeout, 'error', onClose);

message.loading = (content, timeout, onClose) => Message(content, timeout, 'loading', onClose);

message.config = options => options.timeout !== undefined && (Default.timeout = options.timeout);


export default message;
