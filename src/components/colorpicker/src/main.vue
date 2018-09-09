<template>
    <ui-tooltip ref="tooltip" theme="white" placement="bottom" trigger="click" className="ui-color-picker-content-container">
        <div :class="[
            'ui-color-picker',
            colorDisabled ? 'is-disabled' : '',
            colorSize ? `ui-color-picker--${colorSize}` : ''
            ]"
        >
            <div class="ui-color-picker__mask" v-if="colorDisabled"></div>
            <div class="ui-color-picker__trigger" @click="handleTrigger">
                <span class="ui-color-picker__color" :class="{ 'is-alpha': showAlpha }">
                    <span class="ui-color-picker__color-inner"
                    :style="{
                        backgroundColor: displayedColor
                    }"></span>
                <span class="ui-color-picker__empty ui-icon-close" v-if="!value && !showPanelColor"></span>
                </span>
                <span class="ui-color-picker__icon ui-icon-arrow-down" v-show="value || showPanelColor"></span>
            </div>
        </div>
        <template slot="content">
            <picker-dropdown
                ref="dropdown"
                :class="['ui-color-picker__panel', popperClass || '']"
                @pick="confirmValue"
                @clear="clearValue"
                :color="color"
                :show-alpha="showAlpha"
                :predefine="predefine"
                :value="value"
                :show-panel-color="showPanelColor"
            >
            </picker-dropdown>
        </template>
    </ui-tooltip>
</template>

<script>
import Color from './color';
import PickerDropdown from './components/picker-dropdown.vue';
import Clickoutside from '../../../utils/clickoutside';

export default {

    props: {
        value: String,
        showAlpha: Boolean,
        colorFormat: String,
        disabled: Boolean,
        size: String,
        popperClass: String,
        predefine: Array
    },

    inject: {
        elForm: {
            default: ''
        },
        elFormItem: {
            default: ''
        }
    },

    directives: {
        Clickoutside
    },

    computed: {
        displayedColor() {
            if (!this.value && !this.showPanelColor) {
                return 'transparent';
            }

            return this.displayedRgb(this.color, this.showAlpha);
        },

        _elFormItemSize() {
            return (this.elFormItem || {}).elFormItemSize;
        },

        colorSize() {
            return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
        },

        colorDisabled() {
            return this.disabled || (this.elForm || {}).disabled;
        }
    },

    watch: {
        value(val) {
            if (!val) {
                this.showPanelColor = false;
            }
            else if (val && val !== this.color.value) {
                this.color.fromString(val);
            }
        },
        color: {
            deep: true,
            handler() {
                this.showPanelColor = true;
            }
        },
        displayedColor(val) {
            if (!this.showPicker) {
                return;
            }
            const currentValueColor = new Color({
                enableAlpha: this.showAlpha,
                format: this.colorFormat
            });
            currentValueColor.fromString(this.value);

            const currentValueColorRgb = this.displayedRgb(currentValueColor, this.showAlpha);
            if (val !== currentValueColorRgb) {
                this.$emit('active-change', val);
            }
        },
        colorFormat(val) {
            this.color.format = val;
            this.$nextTick(_ => {
                const value = this.value;
                value && this.color.fromString(value);
            });
        }
    },

    methods: {
        handleTrigger() {
            if (this.colorDisabled) {
                return;
            }
            this.showPicker = !this.showPicker;
        },
        confirmValue(value) {
            this.$emit('input', this.color.value);
            this.$emit('change', this.color.value);
            this.$refs.tooltip.hide();
        },
        clearValue() {
            this.$emit('input', null);
            this.$emit('change', null);
            this.showPanelColor = false;
            this.$refs.tooltip.hide();
            this.resetColor();
        },
        hide() {
            this.$refs.tooltip.hide();
            this.resetColor();
        },
        resetColor() {
            this.$nextTick(_ => {
                if (this.value) {
                    this.color.fromString(this.value);
                }
                else {
                    this.showPanelColor = false;
                }
            });
        },
        displayedRgb(color, showAlpha) {
            if (!(color instanceof Color)) {
                throw Error('color should be instance of Color Class');
            }

            const {
                r,
                g,
                b
            } = color.toRgb();
            return showAlpha
                ? `rgba(${ r }, ${ g }, ${ b }, ${ color.get('alpha') / 100 })`
                : `rgb(${ r }, ${ g }, ${ b })`;
        }
    },

    mounted() {
        const value = this.value;
        if (value) {
            this.color.fromString(value);
        }
        // this.popperElm = this.$refs.dropdown.$el;
        // this.$refs.dropdown.$controlPanel = this;
    },

    data() {
        const color = new Color({
            enableAlpha: this.showAlpha,
            format: this.colorFormat
        });
        return {
            color,
            showPicker: false,
            showPanelColor: false
        };
    },

    components: {
        PickerDropdown
    }
};
</script>
