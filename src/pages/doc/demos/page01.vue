<style lang="less">
@import './page01/style.less';
</style>

<template>
<div id="page01" class="demo page01">
    <header class="main-header">
        <div class="back"><i class="ui-icon-left"/>返回实例列表</div>
        <div class="order-steps">
            <ui-steps :datas="steps" class="ui-steps-s" :step="step" ></ui-steps>
        </div>
    </header>
    <div class="main-content">
        <div id="info-panel" class="info-panel panel">
            <ui-loading :loading="showLoading"></ui-loading>
            <div class="panel-wrapper">
                <bill :datas="billInfo"></bill>
                <button class="next ui-btn ui-btn-primary ui-btn-no-border" @click="submitHdl">下一步</button>
            </div>
        </div>
        <article class="content-left panel">
            <dl class="section section-fee">
                <dt class="title">付费及区域</dt>
                <dd class="row" v-for="(item, k) of feeOpts" :key="k">
                    <span class="caption">{{item.name}}</span>
                    <ui-radio-group :datas="item.opts" v-model="item.value"/>
                    <ui-tooltip v-if="item.hasTip" placement="right" theme="white">
                        <div slot="content">{{item.hasTip}}<a href="#">去查看</a></div>
                        <i class="ui-icon-info yellow-color"></i>
                    </ui-tooltip>
                </dd>
            </dl>
            <dl class="section section-config">
                <dt class="title">配置</dt>
                <dd class="row" v-for="(v, k) of configOpt" :key="k" v-if="v.show">
                    <span class="caption">{{v.name}}</span>
                    <div class="ui-radio-group">
                        <template v-for="item of v.opts">
                                <ui-tooltip theme="white" :key="item.value" v-if="item.hasTip">
                                    <div slot="content"><span v-html="item.hasTip"/></div>
                                    <ui-badge v-if="item.hasTag" :count="1" position="center" v-show="item.show">
                                        <span slot="content">{{item.hasTag}}</span>
                                        <ui-radio v-model="v.value" :value="item.value" :disabled="item.disabled" :key="item.value">
                                            {{item.label}}
                                        </ui-radio>
                                    </ui-badge>
                                    <ui-radio v-else v-model="v.value" :value="item.value" :disabled="item.disabled" :key="item.value" v-show="item.show">
                                        {{item.label}}
                                    </ui-radio>
                                </ui-tooltip>
                            <template v-else>
                                <ui-badge v-if="item.hasTag" :count="1" :key="item.value" position="center" v-show="item.show">
                                    <span slot="content">{{item.hasTag}}</span>
                                    <ui-radio v-model="v.value" :value="item.value" :disabled="item.disabled" :key="item.value">
                                        {{item.label}}
                                    </ui-radio>
                                </ui-badge>
                                <ui-radio v-else v-model="v.value" :value="item.value" :disabled="item.disabled" :key="item.value" v-show="item.show">
                                    {{item.label}}
                                </ui-radio>
                            </template>
                        </template>
                    </div>
                    <ui-tooltip v-if="v.help" placement="right" theme="white">
                        <div slot="content" v-html="v.help" />
                        <i class="ui-icon-info yellow-color"></i>
                    </ui-tooltip>
                </dd>
                <dd class="row" key="system">
                    <span class="caption">{{systemOpt.name}}</span>
                    <div class="system-select">
                        <ui-select v-model="systemOpt.value" :datas="systemOpt.opts" placeholder="请选择" class="ui-select-wdt">
                            <template slot-scope="props" slot="item">
                            <div>标题：{{props.item.label}}</div>
                            <div class="gray1-color">描述：{{props.item.value}}</div>
                            </template>
                        </ui-select>
                    </div>
                    <div class="system-select">
                        <ui-select v-model="systemVersion.value" :datas="systemVersion.opts" placeholder="请选择" class="ui-select-wdt">
                            <template slot-scope="props" slot="item">
                            <div>{{props.item.label}}</div>
                            </template>
                        </ui-select>
                    </div>

                    <span style="color: #999">
                        <template v-if="systemOpt.value === 'winserver'">
                            <ui-tooltip theme="white">
                                <div slot="content">支持 Windows Server 2016 系统最小配置为2核CPU+2G内存</div>
                                <i class="ui-icon-info yellow-color"/>
                            </ui-tooltip>
                            该镜像最低磁盘大小为40GB
                        </template>
                        <template v-else>该镜像最低磁盘大小为20GB</template>
                    </span>
                </dd>
            </dl>
            <dl class="section section-config" key="store" >
                <dt class="title">存储</dt>
                <template v-for="(item, key) of storeOpts">
                    <opt-item :options="item" :key="key" :class="['row', key]" @clkHdl="clkHdl"></opt-item>
                </template>
            </dl>
            <dl class="section section-resource" key="resource" >
                <dt class="title">弹性资源</dt>
                <template v-for="(item, key) of resourceOpts">
                    <opt-item :options="item" :key="key" :class="['row', key]" @clkHdl="clkHdl"></opt-item>
                </template>
            </dl>
            <dl class="section section-network" key="network" >
                <dt class="title">标签</dt>
                <template v-for="(item, key) of tagOpts">
                    <opt-item :options="item" :key="key" :class="['row', key]" @clkHdl="clkHdl"></opt-item>
                </template>
            </dl>
            <dl class="section section-systemInfo" key="systemInfo" >
                <dt class="title">系统信息</dt>
                <template v-for="(item, key) of systemInfoOpts">
                    <opt-item :options="item" :key="key" :class="['row', key]" @clkHdl="clkHdl"></opt-item>
                </template>
            </dl>
            <dl class="section section-orderInfo" key="orderInfo" >
                <dt class="title">系统信息</dt>
                <template v-for="(item, key) of orderInfoOpts">
                    <opt-item :options="item" :key="key" :class="['row', key]" @clkHdl="clkHdl"></opt-item>
                </template>
            </dl>
        </article>
        <ui-modal
            v-model="showImage"
            :middle="true"
            :has-close-icon="true"
            :has-divider="true"
        >
        <div slot="header">选择云市场镜像</div>
        <cus-modal></cus-modal>
        </ui-modal>

        <ui-modal
            v-model="showPayment"
            :middle="true"
            :has-close-icon="true"
            :has-divider="true"
        >
        <div slot="header">支付费用</div>
        <pay-ment :datas="billInfo"></pay-ment>
        </ui-modal>

</div>

</div>
</template>

<script>
import cusModal from './page01/modal';
import formData from './page01/data';
import Item from './page01/item';
import Vue from 'vue';
import payMent from './page01/pay';
import Bill from './page01/bill';

Vue.component('opt-item', Item);
let deleteIdx = 0;

export default {
    components: {
        cusModal,
        payMent,
        bill: Bill
    },

    data() {
        return {
            ...formData,
            serverExpense: 0,
            showLoading: false,
            showPayment: false,
            billInfo: {},
            steps: [
                '选择配置',
                '确认订单',
                '在线支付',
                '支付成功'
            ],
            step: 0
        };
    },

    computed: {
        showImage: {
            get() {
                return this.configOpt.image.value === 'cloud';
            },
            set() {
                this.configOpt.image.value = 'public';
            }
        },
        feeMethod() {
            const m = {};
            this.feeOpts.method.opts.forEach(e => m[e.value] = e.label);
            return m[this.feeOpts.method.value];
        },
        district() {
            const m = {};
            this.feeOpts.area.opts.forEach(e => m[e.value] = e.label);
            return m[this.feeOpts.area.value];
        },
        canUse() {
            const m = {};
            this.feeOpts.use.opts.forEach(e => m[e.value] = e.label);
            return m[this.feeOpts.use.value];
        },
        orderConf() {
            const m = {};
            const conf = [];
            // 服务器类型
            this.configOpt.type.opts.forEach(e => m[e.value] = e.label);
            conf[0] = m[this.configOpt.type.value];
            // cpu数量
            this.configOpt.cpu.opts.forEach(e => m[e.value] = e.label);
            conf[1] = m[this.configOpt.cpu.value];
            // 内存大小
            this.configOpt.memory.opts.forEach(e => m[e.value] = e.label);
            conf[2] = m[this.configOpt.memory.value];
            // 镜像类型
            this.configOpt.image.opts.forEach(e => m[e.value] = e.label);
            conf[3] = m[this.configOpt.image.value];
            // gpu 型号
            this.configOpt.gpuType.opts.forEach(e => m[e.value] = e.label);
            conf[4] = m[this.configOpt.gpuType.value];
            // gpu型号
            this.configOpt.gpuNum.opts.forEach(e => m[e.value] = e.label);
            conf[5] = m[this.configOpt.gpuNum.value];
            return conf.join();
        },
        os() {
            const os = this.systemOpt.value;
            const o = {};
            this.versionOpt[os].opts.forEach(e => o[e.value] = e.label);

            const m = {};
            this.systemOpt.opts.forEach(e => m[e.value] = e.label);
            return m[os] + '-' + o[this.versionOpt[os].value];
        },
        publicNet() {
            const m = {};
            this.resourceOpts.publicNet.opts[0].datas.forEach(e => m[e.value] = e.label);
            return m[this.resourceOpts.publicNet.opts[0].value];
        },
        orderSetting() {
            // const m = {};
            // this.orderInfoOpts.time.opts[0].datas.forEach(e => m[e.value] = e.label);
            const month = this.orderInfoOpts.time.opts[0].value;
            const count = this.orderInfoOpts.count.opts[0].opts[0].opts[0].value + '台';
            const time =  month < 10 ? month + '个月' : ~~(month / 12) + '年';
            return count + ' * ' + time;
        },
        diskSetting() {
            const sysDisk = this.storeOpts.systemDisk.opts[1].value;
            const cds = this.storeOpts.cds.opts[0].opts.map(e => e.opts[1].value).reduce((a, b) => a + b, 0);
            return sysDisk + cds;
        }
    },

    methods: {
        clkHdl(type, e) {
            if (type === 'createCds') {
                const {template, opts} = this.storeOpts.cds.opts[0];
                const tpl = JSON.parse(JSON.stringify(template));
                tpl[3].event.click.data = deleteIdx++;
                opts.push({opts: tpl});
            }

            if (type === 'removeDisk') {
                const idx = e;
                const {opts} = this.storeOpts.cds.opts[0];
                if (idx != null) {
                    const i = opts.map(e => e.opts[3].event.click.data).indexOf(idx);
                    i > -1 && opts.splice(i, 1);
                }
            }

            if (type === 'addOne') {
                const group = this.orderInfoOpts.count.opts[0].opts[0].opts;
                const [ipt, add, sub] = group;
                ipt.value++;
                sub.disabled && (sub.disabled = false);
            }

            if (type === 'subOne') {
                const group = this.orderInfoOpts.count.opts[0].opts[0].opts;
                const [ipt, add, sub] = group;
                ipt.value--;
                this.$nextTick(_ => ipt.value < 2 && (sub.disabled = true));
            }
        },

        genMoney(setting) {
            this.showLoading = true;
            const expense = '￥ ' + ~~(Math.random() * 100) * 10;
            this.serverExpense = expense;
            this.$nextTick(_ => [...setting, 'serverExpense'].forEach(k => this.$set(this.billInfo, k, this[k])));
            setTimeout(_ => {
                this.showLoading = false;
            }, 500);
        },

        submitHdl() {
            this.showPayment = true;
        }
    },

    watch: {
        // 观察 可用区A
        'feeOpts.use.value'(n) {
            const opts = this.configOpt.type.opts;
            opts.forEach(e => {
                e.show = true;
                e.disabled = false;
            });
            switch (n) {
                case 'A':
                    [0, 3].forEach(e => opts[e].disabled = true);
                    this.configOpt.type.value = 'normal';
                    break;
                case 'B':
                    [1, 4].forEach(e => opts[e].show = false);
                    [2, 3].forEach(e => opts[e].disabled = true);
                    this.configOpt.type.value = 'normal3';
                    break;
                case 'C':
                    opts[1].show = false;
                    [2, 3].forEach(e => opts[e].disabled = true);
                    this.configOpt.type.value = 'normal3';
                    break;
            }
        },
        'configOpt.type.value'(n) {
            const cpuOpts = this.configOpt.cpu.opts;
            const memOpts = this.configOpt.memory.opts;
            const gpuType = this.configOpt.gpuType;
            const gpuNum = this.configOpt.gpuNum;
            [cpuOpts, memOpts].forEach(item => {
                item.forEach(e => {
                    e.show = true;
                    e.disabled = false;
                });
            });

            gpuType.show = false;
            gpuNum.show = false;

            switch (n) {
                case 'normal':
                    [4, 5, 6, 7].forEach(e => cpuOpts[e].show = false);
                    [3, 4].forEach(e => memOpts[e].show = false);
                    this.configOpt.cpu.value = 2;
                    this.configOpt.memory.value = 2;
                    this.configOpt.image.value = 'public';
                    break;
                case 'optimize':
                    [1, 2, 3].forEach(e => memOpts[e].show = false);
                    this.configOpt.cpu.value = 32;
                    this.configOpt.memory.value = 16;
                    this.configOpt.image.value = 'server';
                    break;
                case 'GPU':
                    gpuType.show = true;
                    gpuNum.show = true;
                    break;
            }
        },
        'systemOpt.value'(n) {
            this.systemVersion.opts = this.versionOpt[n].opts;
            this.systemVersion.value = this.versionOpt[n].value;
        },

        // 监听，然后生成钱数
        // showImage: this.genMoney,
        showPayment(n) {
            this.step = n ? 1 : 0;
        }
    },

    mounted() {
        // 初始化系统版本选项
        const val = this.systemOpt.value;
        this.systemVersion.opts = this.versionOpt[val].opts;
        this.systemVersion.value = this.versionOpt[val].value;
        const billItems = ['feeMethod', 'district', 'canUse', 'orderConf', 'os', 'publicNet', 'orderSetting', 'diskSetting'];
        // console.log(this.$watch);
        billItems.forEach(e => this.$watch(e, this.genMoney));
        this.genMoney(billItems);
    }
};
</script>
