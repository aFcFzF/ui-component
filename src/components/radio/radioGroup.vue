<template>
    <div class="ui-radio-group" :class="{'ui-radio-group-small':small}" :disabled="disabled">
        <span
            :checked="option[key]==value"
            :disabled="disabled"
            v-for="option of arr"
            :key="option[key]"
            @click="setvalue(option[key])"
        >
        {{option[title]}}
        </span>
    </div>
</template>
<script>
import config from '../../utils/config';
import utils from '../../utils/utils';

export default {
    props: {
        small: {
            type: Boolean,
            default: false
        },
        datas: [Object, Array],
        disabled: {
            type: Boolean,
            default: false
        },
        dict: String,
        value: [String, Boolean, Number],
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
        setvalue(key) {
            if (this.disabled || key === this.value) {
                return;
            }
            this.$emit('input', key);
            let event = document.createEvent('CustomEvent');
            event.initCustomEvent('setvalue', true, true, this.value);
            this.$el.dispatchEvent(event);
        }
    },
    computed: {
        arr() {
            if (!this.datas && !this.dict) {
                console.error('RadioGroup Component: Dts or dict parameters need to be defined at least.');
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
