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
                            <p class="caption">边框圆角：</p>
                            <ui-slider v-model="borderValue" :show="show"/>
                            <span class="border-radius-text primary-color" >{{transBorderVal}}px</span>
                        </div>
                    </section>
                    <section class="color-opts">
                        <p class="caption">全局颜色设定：</p>
                        <div class="ui-radio-group">
                            <div class="caption">格式：</div>
                                <ui-radio
                                    :class="['ui-radio-border', 'ui-radio-xs']"
                                    v-model="formatVal"
                                    v-for="item of colorFormat"
                                    :key="item"
                                    :value="item"
                                >
                                {{item}}
                                </ui-radio>
                        </div>
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
                                        @click.native="saveOldColors(idx)"
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
const {darken, tint, shade, lighten, color} = lessColor._data;
const Color = tree.Color;
// console.log('less: ', less);

let rules = '';
let oldColors = [];

export default {
    data() {
        return {
            sidebarOpen: false,
            borderValue: 0,
            transBorderVal: 0,
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
                    label: '悬浮',
                    color: '#1D59E0'
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
            this.replaceColor(val, idx);
        },
        saveOldColors(idx) {
            oldColors[idx] = this.colorOpts[idx].color;
        },
        replaceColor(val, idx) {
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
                syl.innerText = rules;
                syl.setAttribute('id', 'replaced-style');
                document.head.appendChild(syl);
            };

            const replaceText = (text, oldColor, newColor) => {
                const genColorReg = (oldColor, newColor) => {
                    const colorMap = {
                        ori: [],
                        dest: []
                    };

                    colorMap.ori.push(oldColor);
                    colorMap.ori.push(shade(oldColor, 10)); // hover
                    colorMap.ori.push(shade(oldColor, 20)); // active
                    colorMap.ori.push(darken(oldColor, 2)); // border
                    colorMap.ori.push(tint(oldColor, 60)); // disabled
                    // text
                    colorMap.ori.push(lighten(oldColor, 10)); // text-hover
                    colorMap.ori.push(darken(oldColor, 10)); // border
                    colorMap.ori.push(tint(oldColor, 90)); // hover
                    colorMap.ori.push(tint(oldColor, 50)); // active
                    colorMap.ori.push(tint(oldColor, 70)); // active-color

                    // newColor

                    colorMap.dest.push(newColor);
                    colorMap.dest.push(shade(oldColor, 10)); // hover
                    colorMap.dest.push(shade(oldColor, 20)); // active
                    colorMap.dest.push(darken(oldColor, 2)); // border
                    colorMap.dest.push(tint(oldColor, 60)); // disabled
                    // text
                    colorMap.dest.push(lighten(oldColor, 10)); // text-hover
                    colorMap.dest.push(darken(oldColor, 10)); // border
                    colorMap.dest.push(tint(oldColor, 90)); // hover
                    colorMap.dest.push(tint(oldColor, 50)); // active
                    colorMap.dest.push(tint(oldColor, 70)); // active-color

                    return colorMap;
                };

                const map = genColorReg(new Color(oldColor), new Color(newColor));
                map.ori.forEach((_, idx) => {
                    text = text.replace(new RegExp(map.ori[idx], 'gmt'), map.dest[idx]);
                });

                return text;
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
                    // rules = text.replace(new RegExp(oldColors[idx], 'gmi'), val);
                    rules = replaceText(text, oldColors[idx], val);
                    createStyle(rules);
                })
                .catch(e => {
                    throw new Error(e);
                });
            }
            else {
                const elSyl = document.head.querySelector('#replaced-style');
                // const rules = elSyl.innerText.replace(new RegExp(oldColors[idx], 'gmi'), val);
                rules = replaceText(elSyl.innerText, oldColors[idx], val);
                elSyl.remove();
                createStyle(rules);
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


