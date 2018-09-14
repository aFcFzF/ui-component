<template>
    <div :class="{
        'side-toolbar': true,
        'open': sidebarOpen
        }"
    >
        <button class="switch-btn ui-btn ui-btn-text-primary ui-btn-no-border" @click="openSidebar">
            <i
                :class="{
                    'ui-icon-left': true,
                    'open': sidebarOpen
                }"
            />
        </button>
        <transition name="ui-zoom-in" mode="out-in">
            <div class="side-toolbar-wrapper" v-show="sidebarOpen">
                <header class="title">全局设置</header>
                <article class="main-options">
                    <section class="style-opt">
                        <div class="border-slider">
                            <ui-loading
                                text="加载中..."
                                :loading="loadingOpen"
                            />
                            <p class="caption">边框圆角：</p>
                            <ui-slider
                                v-model="borderValue"
                                :show="show"
                                @dragend="dragend"
                            />
                            <span class="border-radius-text primary-color" >{{transBorderVal}}px</span>
                        </div>
                    </section>
                    <section class="color-opts">
                        <p class="caption">全局颜色设定：</p>
                        <div class="ui-tag ui-tag-primary">*提示： 颜色格式为hex则无法设置透明通道</div>
                        <ul class="picker-list">
                            <li v-for="(item, idx) of colorOpts" :key="item.label">
                                <p class="color-item-label">{{item.label}}</p>
                                <div class="picker">
                                    <ui-color-picker
                                        class="theme-color-picker"
                                        v-model="item.color"
                                        :show-alpha="formatVal !== 'hex'"
                                        :color-format="formatVal"
                                        :predefine="formatVal !== 'hex' ? predefineColors : []"
                                        @change="val => colorChanged(val, idx)"
                                    >
                                    </ui-color-picker>
                                    <div class="color-text">{{item.color}}</div>
                                </div>
                            </li>
                        </ul>
                    </section>
                </article>
            </div>
        </transition>
    </div>
</template>

<style lang="less">
.component-doc {
    .side-toolbar {
        position: relative;
        float: right;
        height: 100%;
        width: 0;
        right: 0;
        z-index: 0;
        padding-left: 40px;
        background: @white-color;
        transition: width .3s ease-in-out;

        &.open {
            width: 360px;
            border-left: solid 1px @split-color;
        }

        .switch-btn {
            position: absolute;
            top: 50%;
            left: 0;
            height: 40px;
            line-height: 40px;
            padding: 0 5px;
            font-size: 20px;
            color: @primary-color;
            transform: translateY(-50%);

            &.hover {
                background: @primary-color;
                color: @white-color;
            }

            .ui-icon-left {
                transition: transform 300ms ease-in-out;
                &.open {
                    transform: rotate(180deg);
                }
            }
        }

        .ui-zoom-in-enter-active,
        .ui-zoom-in-leave-active {
            transition: opacity .3s ease;
        }

        .ui-zoom-in-enter,
        .ui-zoom-in-leave-to
        {
            opacity: 0;
        }

        &-wrapper {
            position: absolute;
            width: 320px;
            height: 100%;
            padding: 20px;
            padding-left: 0;

            .title {
                font-size: 16px;
                font-weight: bold;
            }

            .main-options {
                .style-opt {
                    .border-slider {
                        display: flex;
                        align-items: center;
                        .caption {
                            flex-shrink: 0;
                        }
                        .ui-slider {
                            width: 160px;
                        }
                        .border-radius-text {
                            text-align: center;
                            flex-grow: 1;
                            font-size: 16px;
                        }
                    }
                }
            }

            .ui-radio-group {
                .caption,
                .ui-radio {
                    margin-right: 5px;
                    display: inline-block;
                    vertical-align: middle;
                }
            }

            .color-opts {
                .ui-tag {
                    margin: 10px 0;
                }
                .picker {
                    display: flex;
                    align-items: center;
                    .theme-color-picker {
                        font-size: 0;
                    }
                    .color-text {
                        font-size: 18px;
                        color: @secondary-color;
                        padding-left: 20px;
                    }
                }
            }
        }
    }
}
</style>

<script>

import {functions, tree} from 'less';
const lessColor = functions.functionRegistry;
const colorCope = lessColor._data;
const {Color} = tree;
// console.log('less: ', less);

let rules = '';
let oldColors = ['#457EFF', '#8a95af', '#63CE81', '#FFD735', '#F95D5D'];

export default {
    data() {
        return {
            sidebarOpen: false,
            borderValue: 12,
            transBorderVal: 3,
            loadingOpen: false,
            colorFormat: ['hsl', 'hsv', 'hex', 'rgb'],
            formatVal: 'hex',
            predefineColors: [
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#90ee90',
                '#00ced1',
                '#1e90ff',
                '#c71585',
                'rgba(255, 69, 0, 0.68)',
                'rgb(255, 120, 0)',
                'hsv(51, 100, 98)',
                'hsva(120, 40, 94, 0.5)',
                'hsl(181, 100%, 37%)',
                'hsla(209, 100%, 56%, 0.73)',
                '#c7158577'
            ],
            colorOpts: [
                {
                    label: '默认',
                    color: '#457EFF'
                },
                {
                    label: '信息',
                    color: '#8a95af'
                },
                {
                    label: '成功',
                    color: '#63CE81'
                },
                {
                    label: '警告',
                    color: '#FFD735'
                },
                {
                    label: '错误',
                    color: '#F95D5D'
                }
            ]
        };
    },
    methods: {
        openSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
        },
        show() {
            return `圆角大小：${this.transBorderVal}px`;
        },
        colorChanged(val, idx) {
            console.log('取到了', val, idx);
            console.log('主颜色', this.colorOpts[0]);
            this.sideBarConfig('color', val, idx);
        },
        dragend(val) {
            this.sideBarConfig('radius', 3, this.transBorderVal);
        },
        sideBarConfig(type, val, idx) {
            const getRules = src => {
                const xhr = new XMLHttpRequest();
                return Reflect.construct(Promise, [(resolve, reject) => {
                    xhr.onreadystatechange = _ => {
                        if (xhr.readyState === 4 && (xhr.status >= 200 || xhr.status < 300 || xhr.status === 304)) {
                            resolve(xhr.responseText);
                        }
                    };
                    xhr.open('get', src, true);
                    xhr.send(null);
                }]);
            };

            const createStyle = rules => {
                const syl = document.createElement('style');
                syl.innerHTML = rules;
                syl.setAttribute('id', 'replaced-style');
                document.head.appendChild(syl);
            };

            const replaceColorText = (text, oldColor, newColor) => {
                const genColorReg = (oldColor, newColor, colorTable) => {
                    const colorMap = {
                        ori: [],
                        dest: []
                    };

                    colorMap.ori.push(oldColor);
                    colorTable.forEach(e => {
                        const item = colorCope[e.type](oldColor, ...e.value.map(color => new tree.Dimension(color)));
                        colorMap.ori.push(item);
                    });

                    // newColor

                    colorMap.dest.push(newColor);
                    colorTable.forEach(e => colorMap.dest.push(colorCope[e.type](newColor, ...e.value.map(color => new tree.Dimension(color)))));

                    return colorMap;
                };

                const colorTable = [
                    {
                        type: 'shade',
                        value: [10]
                    },
                    {
                        type: 'shade',
                        value: [20]
                    },
                    {
                        type: 'darken',
                        value: [2]
                    },
                    {
                        type: 'tint',
                        value: [60]
                    },
                    {
                        type: 'lighten',
                        value: [10]
                    },
                    {
                        type: 'darken',
                        value: [10]
                    },
                    {
                        type: 'tint',
                        value: [90]
                    },
                    {
                        type: 'tint',
                        value: [60]
                    },
                    {
                        type: 'tint',
                        value: [50]
                    },
                    {
                        type: 'tint',
                        value: [70]
                    },
                    {
                        type: 'tint',
                        value: [95]
                    },
                    { // ui-tag-color
                        type: 'tint',
                        value: [80]
                    },
                    { // input
                        type: 'fade',
                        value: [20]
                    }
                ];

                const re = /^#([a-f0-9]{6}|[a-f0-9]{3})$/i;
                oldColor = re.test(oldColor) ? oldColor.slice(1) : oldColor;
                newColor = re.test(newColor) ? newColor.slice(1) : newColor;


                const map = genColorReg(new Color(oldColor), new Color(newColor), colorTable);
                map.ori.forEach((_, idx) =>
                    text = text.replace(new RegExp(map.ori[idx].toRGB(), 'gmi'), map.dest[idx].toRGB())
                );

                return text;
            };

            const replaceRadius = (text, oldRadius, newRadius) => {
                const reOld = new RegExp('border-radius\\s*:.*;', 'gmi');
                const newRule = `border-radius: ${newRadius}px;`;
                return text.replace(reOld, newRule);
            };

            if (!rules) {
                const sheets = [...document.styleSheets];
                let sht = '';
                sheets.some(e => (e.href ? (sht = e.href, true) : false));
                if (!sht) {
                    throw new Error('没有href的css，请查看head');
                }
                getRules(sht)
                .then(text => {
                    rules = text;
                    const r = type === 'color' ? replaceColorText(rules, oldColors[idx], val) : replaceRadius(rules, val, idx);
                    createStyle(r);
                })
                .catch(e => {
                    throw new Error(e);
                });
            }
            else {
                const elSyl = document.head.querySelector('#replaced-style');
                const r = type === 'color' ? replaceColorText(rules, oldColors[idx], val) : replaceRadius(rules, val, idx);
                createStyle(r);
                elSyl.remove();
            }
        }
    },
    watch: {
        borderValue(val) {
            this.transBorderVal = ~~(val / 4);
        }
    }
};
</script>


