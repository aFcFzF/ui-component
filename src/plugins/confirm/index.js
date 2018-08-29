/**
*@file: index.js
*@author: afcfzf (9301462@qq.com)
*/

import Notify from '../notify';
import utils from '../../utils/utils';

const prefixCls = 'ui-modal';

let Default = {
    middle: false
};

export default (content, title) =>
    new Promise((resolve, reject) => {
    let param = {
        type: prefixCls,
        content: `
        <div>
            <i class="ui-icon-warn yellow-color" style="font-size:28px;vertical-align: -8px;"></i>
            &nbsp;&nbsp;${content}
        </div>
        `,
        buttons: ['cancel', 'ok'],
        events: {
            ok(n) {
                n.close();
                resolve();
            },
            cancel(n) {
                n.close();
                reject('cancel');
            }
        },
        title,
        class: 'ui-modal-comfirm',
        hasMask: true,
        closeOnMask: true,
        hasCloseIcon: false,
        timeout: 0
    };
    param = utils.extend({}, Default, param, true);
    return Notify(param);
});


function confirm(content, title) {
    if (!title) {
        title = '标题';
    }
    return Confirm(content, title);
}

confirm.config = options => {
    options.middle && (Default.middle = true);
};

