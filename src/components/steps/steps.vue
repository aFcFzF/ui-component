<template>
<div :class="stepsCls">
    <div
        v-for="(a, index) of arr"
        :class="[{
            'ui-steps-actived':index <= stepIndex,
            'ui-steps-item': true,
            'ui-steps-item-first': index==0,
            'ui-steps-item-last': index+1 == arr.length,
            'ui-steps-current': index === stepIndex
        }, status ? `ui-steps-${status}` : '']"
        :key="'_step' + index"
    >
        <div class="ui-steps-tail" :class="{'ui-steps-tail-actived': index+1 <= stepIndex}"></div>
        <div class="ui-steps-content">
            <div class="ui-steps-icon">
            <span v-if="a.icon" class="ui-steps-icon-custom"><i :class="a.icon"></i></span>
            <span v-else class="ui-steps-index">
                <i class="ui-steps-index-num">{{index+1}}</i>
                <i class="ui-icon-check ui-steps-complete"></i>
            </span>
            </div>
            <div class="ui-steps-words">
                <div class="ui-steps-title">{{a[title]}}</div>
                <div class="ui-steps-desc" v-if="a.desc">{{a.desc}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import config from '../../utils/config';
import utils from '../../utils/utils';

const prefix = 'ui-steps';

export default {
    props: {
        dict: String,
        datas: [Object, Array],
        step: {
            type: [String, Number],
            default: 0
        },
        className: {
            type: String,
            default: 'ui-tabs-default'
        },
        keyName: {
            type: String,
            default: () => config.getOption('dict', 'keyName')
        },
        titleName: {
            type: String,
            default: () => config.getOption('dict', 'titleName')
        },
        status: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            key: this.keyName,
            title: this.titleName
        };
    },
    computed: {
        stepsCls() {
            return {
                [`${prefix}`]: true
            };
        },
        stepIndex() {
            if (utils.isNumber(this.step)) {
                return this.step;
            }
            let index = 0;
            for (let a of this.arr) {
                if (a[this.key] === this.step) {
                    return index;
                }
                index = index + 1;
            }
        },
        arr() {
            if (!this.datas && !this.dict) {
                console.error('Steps Component: Datas or dict parameters need to be defined at least.');
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
