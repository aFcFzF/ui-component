/**
*@file: index.js
*@author: afcfzf (9301462@qq.com)
*/

import Pop from '../pop';
import utils from '../../utils/utils';


const Default = {
    trigger: 'click',
    closeOnClickBody: true,
    html: true,
    placement: 'bottom-start',
    template: '<div role="select" class="ui-dropdown"><div class="ui-dropdown-inner"></div></div>',
    innerSelector: '.ui-dropdown-inner',
    preventOverflow: true,
    type: 'dropdown',
    delay: 300
};

export default class Dropdown extends Pop {
    constructor(el, param) {
        param = utils.extend({}, Default, {
        }, param);
        let container = document.body;
        if (!param.container) {
            container = el || document.body;
            while (container && container.tagName !== 'BODY'
            && !utils.hasClass(container, 'ui-dropdown-common-container')) {
                container = container.parentNode;
            }
            param.container = container;
        }
        super(el, param);
    }
}
