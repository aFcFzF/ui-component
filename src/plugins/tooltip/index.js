/**
*@file: index.js
*@author: afcfzf (9301462@qq.com)
*/

import Pop from '../pop';
import utils from '../../utils/utils';

export default class Tooltip extends Pop {
    constructor(el, param) {
        param.template = `
        <div class="ui-tooltip" role="tooltip">
            <div class="ui-tooltip-arrow"></div>
            <div class="ui-tooltip-inner"></div>
        </div>
        `.replace(/^\s+|[\n\r]|\s+$/g, '');
        param.arrowSelector = '.ui-tooltip-arrow';
        param.innerSelector = '.ui-tooltip-inner';
        param.theme && (param.class = `ui-tooltip-${param.theme}`);
        param.closeOnClickBody = true;
        param.type = 'tooltip';
        param.trigger = param.trigger || 'hover focus';
        super(el, param);
    }

    updateTemplate(content, html) {
        utils.extend(this.options, {content, html});
        this.updateContent(content, html);
    }
}
