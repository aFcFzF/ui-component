<template>
<!-- <transition name="ui-zoom-in-top" @after-leave="doDestroy"> -->
    <div class="ui-color-dropdown">
        <div class="ui-color-dropdown__main-wrapper">
            <hue-slider ref="hue" :color="color" vertical style="float: right;"></hue-slider>
            <sv-panel ref="sl" :color="color"></sv-panel>
        </div>
        <alpha-slider v-if="showAlpha" ref="alpha" :color="color"></alpha-slider>
        <predefine v-if="predefine" :color="color" :colors="predefine"></predefine>
        <div class="ui-color-dropdown__btns">
            <span class="ui-color-dropdown__value">
                <input
                    type="text"
                    v-model="customInput"
                    @keyup.enter="handleConfirm"
                    @blur="handleConfirm"
                    size="s">
                </input>
            </span>
            <ui-button size="xs" type="text" class="ui-color-dropdown__link-btn" @click="$emit('clear')">清空</ui-button>
            <ui-button plain size="xs" class="ui-color-dropdown__btn" @click="confirmValue">确认</ui-button>
        </div>
    </div>
<!-- </transition> -->
</template>

<script>
import SvPanel from './sv-panel';
import HueSlider from './hue-slider';
import AlphaSlider from './alpha-slider';
import Predefine from './predefine';
// import Popper from '../../../../plugins/popper';

export default {

    // mixins: [Popper],

    components: {
        SvPanel,
        HueSlider,
        AlphaSlider,
        Predefine
    },

    props: {
        color: {
            required: true
        },
        showAlpha: Boolean,
        predefine: Array,
        showPanelColor: Boolean,
        value: String
    },

    data() {
        return {
            customInput: ''
        };
    },

    computed: {
        currentColor() {
            // const parent = this.$parent;
            // console.log('parent.color', parent);
            // return !parent.value && !parent.showPanelColor ? '' : parent.color.value;

            return !this.value && !this.showPanelColor ? '' : this.color.value;
            // console.log('选择组件： ', this.$controlPanel);
        }
    },

    methods: {
        confirmValue() {
            this.$emit('pick');
        },

        handleConfirm() {
            this.color.fromString(this.customInput);
        }
    },

    mounted() {
        // this.$parent.popperElm = this.popperElm = this.$el;
        // this.referenceElm = this.$parent.$el;
        // console.log('选择组件： ', this.$controlPanel);
    },

    watch: {
        showPopper(val) {
            if (val === true) {
                this.$nextTick(() => {
                    const {
                        sl,
                        hue,
                        alpha
                    } = this.$refs;
                    sl && sl.update();
                    hue && hue.update();
                    alpha && alpha.update();
                });
            }
        },

        currentColor(val) {
            this.customInput = val;
        }
    }
};
</script>
