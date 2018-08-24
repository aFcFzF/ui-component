<template>
    <div :class="selectCls">
        <div :class="showCls">
        <template v-if="multiple">
            <div class="ui-select-multiple-tags">
            <span v-for="obj of objects" :key="obj[key]">
                <span>{{obj[title]}}</span><i class="ui-icon-close" @click.stop="setvalue(obj)" v-if="!disabled"></i>
            </span>
            <input
                v-if="filterable"
                type="text"
                class="ui-select-search-input" v-model="searchInput"
                :disabled="disabled"
                @keyup="handle"
                @blur="blurHandle"
                @keypress.enter="enterHandle"
                :placeholder="showPlaceholder"
            >
            </div>
            <div v-if="!hasValue&&!filterable" class="ui-select-placeholder">{{showPlaceholder}}</div>
        </template>
        <template v-else>
            <template v-if="filterable">
            <input
                type="text"
                @keyup="handle"
                @blur="blurHandle"
                :disabled="disabled"
                @keypress.enter="enterHandle"
                :class="{'ui-select-search-input-value': hasValue}"
                class="ui-select-search-input ui-select-single-search-input" v-model="searchInput"
                :placeholder="hasValue?'':showPlaceholder"
            >
            <div class="ui-select-filterable-value" @click="focusSearchInput" v-if="hasValue&&searchInput===''">{{singleValue}}</div>
            </template>
            <template v-else>
            <div class="ui-select-value-single" v-if="hasValue">{{singleValue}}</div>
            <div v-else class="ui-select-placeholder">{{showPlaceholder}}</div>
            </template>
        </template>
        <i class="ui-icon-down"></i>
        </div>
        <div :class="groupCls">
        <div class="ui-select-group-container" v-if="isShow">
            <!-- <Search v-if="filterable" class="ui-select-search-input" :placeholder="showSearchPlaceHolder" trigger-type="input" @onsearch="search" position="front"></Search> -->
            <div class="ui-select-list">
            <ul class="ui-select-ul">
                <template v-for="(option, index) of filterOptions">
                <li v-if="!option.hidden"
                    :key="option[key]"
                    @click="setvalue(option)"
                    :class="getLiCls(option, index)"
                >
                    <div v-if="!!custom" v-html="option[html]"></div>
                    <template v-else-if="!$scopedSlots.item">{{option[title]}}</template>
                    <slot v-else :item="option" name="item"></slot>
                    <i v-if="multiple" class="ui-icon-check"></i>
                </li>
                </template>
                <li v-if="filterOptions.length==0" class="ui-select-ul-empty">{{showEmptyContent}}</li>
            </ul>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import config from '../../utils/config';
import utils from '../../utils/utils';
import Dropdown from '../../plugins/dropdown';
import {event as evt} from '../../common/util';

const prefix = 'ui-select';

export default {
    props: {
        multiple: {
            type: Boolean,
            default: false
        },
        datas: [Array, Object],
        type: {
            type: [String],
            default: 'key' // object
        },
        disabled: {
            type: Boolean,
            default: false
        },
        dict: String,
        limit: {
            type: Number
        },
        nullOption: {
            type: Boolean,
            default: false
        },
        nullOptionText: {
            type: String
        },
        noBorder: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String
        },
        // searchPlaceHolder: {
        //   type: String,
        // },
        emptyContent: {
            type: String
        },
        filterable: {
            type: Boolean,
            default: false
        },
        autosize: {
            type: Boolean,
            default: false
        },
        equalWidth: {
            type: Boolean,
            default: true
        },
        keyName: {
            type: String,
            default: () => config.getOption('dict', 'keyName')
        },
        titleName: {
            type: String,
            default: () => config.getOption('dict', 'titleName')
        },
        custom: Function,
        value: [Number, String, Array, Object],
        className: String
    },
    data() {
        return {
            key: this.keyName,
            title: this.titleName,
            html: 'select_rander_html',
            codes: [],
            objects: {},
            hasNullOption: this.nullOption && !this.multiple,
            searchInput: '',
            nowSelected: -1,
            isShow: false,
            content: null
        };
    },
    watch: {
        datas() {
            this.parse();
        },
        value() {
            this.parse();
        },
        disabled() {
            this.dropdown && this.disabled ? this.dropdown.disabled() : this.dropdown.enabled();
        },
        searchInput() {
            this.nowSelected = -1;
        },
        nowSelected() {
            this.$nextTick(_ => {
                if (this.content && this.nowSelected > -1) {
                    const dom = this.content.querySelector('.ui-select-item-picked');
                    const uldom = this.content.querySelector('.ui-select-list');
                    if (dom && uldom) {
                        if (dom.offsetTop + dom.offsetHeight - uldom.scrollTop > uldom.offsetHeight) {
                            uldom.scrollTop = dom.offsetTop + dom.offsetHeight - uldom.offsetHeight;
                        }
                        else if (dom.offsetTop - uldom.scrollTop < 0) {
                            uldom.scrollTop = dom.offsetTop;
                        }
                    }
                }
            });
        }
    },
    beforeMount() {
        this.parse();
    },
    beforeDestroy() {
        let el = this.el;
        if (el) {
            el.style.display = 'none';
            this.$el.appendChild(el);
        }
        this.dropdown && this.dropdown.destory();
    },
    mounted() {
        this.$nextTick(() => {
            const el = this.el = this.$el.querySelector('.ui-select-show');
            const content = this.content = this.$el.querySelector('.ui-select-group');
            const that = this;
            this.dropdown = new Dropdown(el, {
                content,
                disabled: this.disabled,
                equalWidth: this.equalWidth,
                trigger: 'click foucs',
                triggerOnce: this.filterable,
                events: {
                    show() {
                        that.isShow = true;
                    }
                }
            });
        });
    },
    methods: {
        focusSearchInput() {
            this.$el.querySelector('.ui-select-search-input').focus();
        },
        handle(event) {
            let code = event.keyCode || event.which || event.charCode;
            code === 38 && this.nowSelected > 0 && (this.nowSelected -= 1);
            code === 40 && this.nowSelected < this.filterOptions.length - 1 && (this.nowSelected += 1);
        },
        enterHandle(event) {
            event.preventDefault();
            if (this.nowSelected >= 0) {
                this.setvalue(this.filterOptions[this.nowSelected], 'enter');
                !this.multiple && event.target.blur();
            }
        },
        blurHandle(event) {
            this.nowSelected = -1;
            setTimeout(() => {
                this.searchInput = '';
            }, 300);
        },
        search(value) {
            this.searchInput = value;
        },
        setObjects() {
            if (this.multiple) {
                let os = [];
                for (let code of this.codes) {
                    if (this.optionsMap[code] == null) {
                        continue;
                    }
                    os.push(this.optionsMap[code]);
                }
                this.objects = os;
            }
            else {
                this.objects = this.optionsMap[this.codes];
            }
        },
        parse() {
            if (this.multiple) {
                let values = this.value || [];
                this.codes = values
                .map(item => this.type === 'key' ? this.getValue(item) : item[this.key])
                .filter(item => item !== null);
            }
            else {
                if (this.type === 'key') {
                    this.codes = this.getValue(this.value);
                }
                else {
                    this.codes = utils.isObject(this.value) ? this.value[this.key] : null;
                }
            }
            this.setObjects();
        },
        getValue(value) {
            return utils.isNull(value) ? null : value;
        },
        setvalue(option, trigger) {
            if (this.disabled) {
                return;
            }
            if (option.disabled || option.isTag) {
                return;
            }
            let code = option[this.key];
            if (this.multiple) {
                if (
                !utils.isNull(this.limit)
                && !this.isIncludes(code)
                && this.codes.length >= this.limit
                ) {
                    return evt.$emit('exceedLimit', {limit: this.limit});
                    // this.$Message.error('限制最多选: ' + this.limit + '个');
                }
                this.codes = utils.toggleValue(this.codes, code);
            }
            else {
                this.codes = code;
            }
            this.setObjects();
            let value = this.type === 'key' ? this.codes : this.objects;
            this.$emit('input', value);
            let event = document.createEvent('CustomEvent');
            event.initCustomEvent('setvalue', true, true, this.objects);
            this.$el.dispatchEvent(event);
            this.nowSelected = -1;
            if (this.multiple) {
                this.searchInput = '';
                this.$nextTick(() => this.dropdown.update());
            }
            else {
                this.dropdown.hide();
                setTimeout(() => {
                    this.searchInput = '';
                }, 100);
            }
        },
        isIncludes(code) {
            return this.codes.some(item => item === code);
        },
        getLiCls(option, index) {
            let code = option[this.key];
            if (option.isTag) {
                return {
                    [`${prefix}-item-label`]: option.isTag
                };
            }
            return {
                [`${prefix}-item-disabled`]: option.disabled,
                [`${prefix}-item`]: true,
                [`${prefix}-item-selected`]: this.multiple
                    ? this.isIncludes(code)
                    : this.codes === code,
                [`${prefix}-item-picked`]: this.nowSelected === index
            };
        }
    },
    filters: {
        showText(key, value) {
            return value.includes(key);
        }
    },
    computed: {
        hasValue() {
            if (this.multiple) {
                return this.codes.length > 0;
            }
            return !utils.isNull(this.codes) && this.objects;
        },
        singleValue() {
            if (this.hasValue) {
                return this.objects[this.title];
            }
            return null;
        },
        showEmptyContent() {
            return this.emptyContent || '无选项';
        },
        hasLabel() {
            return this.options.some(item => item.isTag);
        },
        showNullOptionText() {
            return this.nullOptionText || '没有内容';
        },
        showPlaceholder() {
            return this.placeholder || '请选择';
        },
        // showSearchPlaceHolder() {
        //   return this.searchPlaceHolder || this.t('h.select.searchPlaceHolder');
        // },
        selectCls() {
            const autosize = this.autosize || !!this.noBorder;
            return {
                [`${prefix}`]: true,
                [`${prefix}-input-border`]: !this.noBorder,
                [`${prefix}-input-no-border`]: this.noBorder,
                [`${prefix}-multiple`]: this.multiple,
                [`${prefix}-no-autosize`]: !autosize,
                [`${prefix}-disabled`]: this.disabled
            };
        },
        showCls() {
            return {
                [`${prefix}-show`]: true,
                [`${this.className}-show`]: !!this.className
            };
        },
        groupCls() {
            return {
                [`${prefix}-group`]: true,
                [`${prefix}-group-has-label`]: this.hasLabel,
                [`${prefix}-multiple`]: this.multiple,
                [`${prefix}-single`]: !this.multiple,
                [`${this.className}-dropdown`]: !!this.className
            };
        },
        optionsMap() {
            const optionsMap = utils.toObject(this.options, this.key);
            Reflect.deleteProperty(optionsMap, 'null');
            return optionsMap;
        },
        filterOptions() {
            if (this.searchInput) {
                this.dropdown && this.dropdown.update();
                let searchValue = this.searchInput.toLocaleLowerCase();
                return this.options.filter(item =>
                    (item[this.html] || item[this.title]).toLocaleLowerCase().indexOf(searchValue) !== -1
                );
            }
            return this.options;
        },
        options() {
            if (!this.datas && !this.dict) {
                console.error('Select Component: Dts or dict parameters need to be defined at least.');
                return [];
            }
            let datas = this.datas;
            if (this.dict) {
                datas = config.getDict(this.dict);
            }
            datas = utils.initOptions(datas, this);
            if (!this.multiple && this.hasNullOption) {
                datas.unshift({
                    [`${this.key}`]: null,
                    [`${this.title}`]: this.showNullOptionText,
                    [`${this.html}`]: this.showNullOptionText
                });
            }
            return datas;
        }
    }
};
</script>