<template>
    <div class="ui-radio" :disabled="disabled" :class="{'ui-radio-disabled': disabled}">
        <template v-if="!isSingle">
            <label
                v-for="option of arr"
                :key="option[key]"
                @click="setvalue(option)"
                :class="{'ui-radio-checked': option[key]==selectStatus,
                'ui-radio-un-checked': option[key] != selectStatus,
                'ui-radio-label-disabled': disabled}"
            >
                <span class="radio-icon ui-radio-icon" :checked="option[key]==selectStatus" :disabled="disabled"></span>
                <span class="ui-radio-text">{{option[title]}}</span>
            </label>
        </template>
        <label v-else @click="setvalue()" :class="{'ui-radio-checked': value == selectStatus, 'ui-radio-un-checked': value != selectStatus, 'ui-radio-label-disabled': disabled}">
            <span class="radio-icon ui-radio-icon" :checked="value == selectStatus" :disabled="disabled"></span>
            <span class="ui-radio-content" :disabled="disabled"><slot></slot></span>
        </label>
    </div>
</template>
<script>
import utils from '../../utils/utils';
import config from '../../utils/config';

export default {
    model: {
        prop: 'selectStatus',
        event: 'input'
    },
    props: {
        datas: [Object, Array],
        disabled: {
            type: Boolean,
            default: false
        },
        value: [Object, String, Boolean, Number],
        dict: String,
        selectStatus: [Object, String, Boolean, Number],
        keyName: {
            type: String,
            default: () => config.getOption('dict', 'keyName')
        },
        titleName: {
            type: String,
            default: () => config.getOption('dict', 'titleName')
        }
    },
    data() {
        return {
            key: this.keyName,
            title: this.titleName
        };
    },
    methods: {
        setvalue(value) {
            if (this.disabled) {
                return;
            }
            let result = null;
            if (this.isSingle) {
                result = this.value;
            }
            else {
                result = value[this.key];
            }
            this.$emit('input', result);
            let event = document.createEvent('CustomEvent');
            event.initCustomEvent('setvalue', true, true, result);
            this.$el.dispatchEvent(event);
        }
    },
    computed: {
        isSingle() {
            return !utils.isNull(this.value) && this.arr.length === 0;
        },
        arr() {
            if (!this.datas && !this.dict) {
                return [];
            }
            let datas = this.datas;
            if (this.dict) {
                datas = config.getDict(this.dict);
            }
            return utils.initOptions(datas, this);
        }
    }
};
</script>
