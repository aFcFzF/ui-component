/**
*@file: index.js
*@author: afcfzf (9301462@qq.com)
*/

import Notify from '../notify';
import utils from '../../utils/utils';
import config from '../../utils/config';

const prefixCls = 'ui-modal';
const hasDivider = config.getOption('modal', 'hasDivider');

let Vue = null;

let Default = {
    middle: false,
    hasDivider,
    fullScreen: false
};

function Modal(originalParam) {
    let cls = prefixCls;
    let param = utils.extend({
        type: cls,
        hasMask: true,
        closeOnMask: true,
        buttons: ['cancel']
    }, Default, originalParam, true);

    if (originalParam.hasDivider || Default.hasDivider) {
        param.class = 'ui-notify-has-divider';
    }
    param.Vue = Vue;
    return Notify(param);
}

export default function modal(param) {
    if (this.$router) {
        param.$router = this.$router;
    }
    return new Modal(param);
}

modal.config = options => {
    if (options.middle) {
        Default.middle = options.middle;
    }
};

