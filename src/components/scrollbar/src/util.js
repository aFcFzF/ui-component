/**
*@file: util.js
*@author: afcfzf (9301462@qq.com)
*/
// reference https://github.com/noeldelgado/gemini-scrollbar/blob/master/index.js

export const BAR_MAP = {
    vertical: {
        offset: 'offsetHeight',
        scroll: 'scrollTop',
        scrollSize: 'scrollHeight',
        size: 'height',
        key: 'vertical',
        axis: 'Y',
        client: 'clientY',
        direction: 'top'
    },
    horizontal: {
        offset: 'offsetWidth',
        scroll: 'scrollLeft',
        scrollSize: 'scrollWidth',
        size: 'width',
        key: 'horizontal',
        axis: 'X',
        client: 'clientX',
        direction: 'left'
    }
};

export function renderThumbStyle({move, size, bar}) {
    const translate = `translate${bar.axis}(${move}%)`;

    const style = {
        transform: translate,
        msTransform: translate,
        webkitTransform: translate
    };

    style[bar.size] = size;

    return style;
}
