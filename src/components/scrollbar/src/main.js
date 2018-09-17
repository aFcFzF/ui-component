/**
*@file: main.js
*@author: afcfzf (9301462@qq.com)
*/

// reference https://github.com/noeldelgado/gemini-scrollbar/blob/master/index.js

import {addResizeListener, removeResizeListener} from '../../../utils/resize-event';
import scrollbarWidth from '../../../utils/scrollbar-width';
import Bar from './bar';

const toObject = obj => {
    if (!Array.isArray(obj)) {
        throw new Error('obj must Array type');
    }
    return obj.reduce((a, b) => {
        const r = {};
        [a, b].forEach(e => Object.entries(e).forEach(([k, v]) => r[k] = v));
        return r;
    }, {});
};

/* istanbul ignore next */
export default {

    components: {Bar},

    props: {
        native: Boolean,
        wrapStyle: {},
        wrapClass: {},
        viewClass: {},
        viewStyle: {},
        noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
        tag: {
            type: String,
            default: 'div'
        }
    },

    data() {
        return {
            sizeWidth: '0',
            sizeHeight: '0',
            moveX: 0,
            moveY: 0
        };
    },

    computed: {
        wrap() {
            return this.$refs.wrap;
        }
    },

    render(h) {
        let gutter = scrollbarWidth();
        let style = this.wrapStyle;

        if (gutter) {
            const gutterWith = `-${gutter}px`;
            const gutterStyle = `margin-bottom: ${gutterWith}; margin-right: ${gutterWith};`;

            if (Array.isArray(this.wrapStyle)) {
                style = toObject(this.wrapStyle);
                style.marginRight = style.marginBottom = gutterWith;
            }
            else if (typeof this.wrapStyle === 'string') {
                style += gutterStyle;
            }
            else {
                style = gutterStyle;
            }
        }
        const view = h(this.tag, {
            class: ['ui-scrollbar__view', this.viewClass],
            style: this.viewStyle,
            ref: 'resize'
        }, this.$slots.default);
        const wrap = (
            <div
                ref="wrap"
                style={style}
                onScroll={this.handleScroll}
                class={[this.wrapClass, 'ui-scrollbar__wrapper', gutter ? '' : 'ui-scrollbar__wrap__hidden-default']}>
                {[view]}
            </div>
        );
        let nodes;

        if (!this.native) {
            nodes = ([
                wrap,
                <Bar
                    move={this.moveX}
                    size={this.sizeWidth}></Bar>,
                <Bar
                    vertical
                    move={this.moveY}
                    size={this.sizeHeight}></Bar>
            ]);
        }
        else {
            nodes = ([
                <div
                    ref="wrap"
                    class={[this.wrapClass, 'ui-scrollbar__wrap']}
                    style={style}>
                    {[view]}
                </div>
            ]);
        }
        return h('div', {class: 'ui-scrollbar'}, nodes);
    },

    methods: {
        handleScroll() {
            const wrap = this.wrap;

            this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight);
            this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth);
        },

        update() {
            let heightPercentage;
            let widthPercentage;
            const wrap = this.wrap;
            if (!wrap) {
                return;
            }

            heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight);
            widthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth);

            this.sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : '';
            this.sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : '';
        },

        scrollToTop() {
            this.wrap.scrollTop = this.wrap.scrollLeft = this.moveX = this.moveY = 0;
        }
    },

    mounted() {
        if (this.native) {
            return;
        }
        this.$nextTick(this.update);
        !this.noresize && addResizeListener(this.$refs.resize, this.update);
    },

    beforeDestroy() {
        if (this.native) {
            return;
        }
        !this.noresize && removeResizeListener(this.$refs.resize, this.update);
    }
};
