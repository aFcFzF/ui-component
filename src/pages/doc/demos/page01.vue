<style lang="less">
.page01 {
    .main-header {
        .content-left {
            padding: 30px;
            .section {
                padding: 30px 0;
                border-top: solid 1px @split-color;
                &:first-of-type {
                    border: none;
                }
                .title {
                    border-left: 4px solid @primary-color;
                    font-size: 18px;
                    padding-left: 10px;
                }
                .row {
                    margin-top: 20px;
                    > * {
                        vertical-align: middle;
                    }
                    .caption {
                        display: inline-block;
                        width: 120px;
                    }
                }
            }
        }
    }
}
</style>

<template>
<div class="demo page01">
    <header class="main-header">
        <div class="back"><i class="ui-icon-left"/>返回实例列表</div>
            <div class="main-content">
                <article class="content-left">
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
                    </dl>
                </article>
            <div class="info-panel"></div>
        </div>
    </header>
</div>
</template>

<script>
export default {
    data() {
        return {
            feeOpts: {
                method: {
                    name: '付费方式：',
                    show: true,
                    opts: [{
                            label: '预付费',
                            value: 'pre'
                        },
                        {
                            label: '后付费',
                            value: 'after'
                        }
                    ],
                    value: 'pre'
                },
                area: {
                    name: '当前区域：',
                    show: true,
                    opts: [{
                            label: '华北-北京',
                            value: 'beijing'
                        },
                        {
                            label: '华北-保定',
                            value: 'baoding'
                        },
                        {
                            label: '华南-广州',
                            value: 'guangzhou'
                        },
                        {
                            label: '华东-苏州',
                            value: 'suzhou'
                        },
                        {
                            label: '香港',
                            value: 'xianggang'
                        }
                    ],
                    value: 'beijing'
                },
                use: {
                    name: '可用区：',
                    show: true,
                    hasTip: '可用区是指在同一区域下，电力和网络互相独立的区域，故障会被隔离在一个可用区内。如果您的应用程序需要更高的高可用性，建议您将云服务创建在不同的可用区内。',
                    opts: [{
                            label: '可用区A',
                            value: 'A'
                        },
                        {
                            label: '可用区B',
                            value: 'B'
                        },
                        {
                            label: '可用区C',
                            value: 'C'
                        },
                        {
                            label: '可用区D',
                            value: 'D'
                        }
                    ],
                    value: 'B'
                }
            },
            configOpt: {
                type: {
                    name: '云服务器类型：',
                    show: true,
                    opts: [{
                            label: '普通型Ⅲ',
                            value: 'normal3',
                            hasTag: 'new',
                            disabled: false,
                            show: true,
                            hasTip: '采用Intel最新一代Skylake Xeon Gold 6148 CPU 2.4GHz。'
                        },
                        {
                            label: '普通型',
                            value: 'normal',
                            disabled: false,
                            show: true
                        },
                        {
                            label: '计算优化型',
                            value: 'optimize',
                            disabled: false,
                            show: true,
                            hasTip: '内置Intel Xeon E5 V4 <span style="color: red">3.2GHz</span>超高主频CPU. &nbsp;&nbsp;<a href="#">查看详情>></a>'
                        },
                        {
                            label: '存储优化型',
                            value: 'store',
                            disabled: false,
                            show: true,
                            hasTip: '售罄！请您移步其他可用区购买资源。'
                        },
                        {
                            label: 'GPU实例',
                            value: 'GPU',
                            disabled: false,
                            show: true,
                            hasTip: '内置英伟达GPU卡，最高可提供40+Tflops单精度浮点计算能力'
                        }
                    ],
                    value: 'normal3'
                },
                gpuType: {
                    name: 'GPU型号',
                    show: false,
                    help: `
                        NVIDIA Tesla P40：3840个CUDA单元、24GB显存、12Tflops单精度浮点运算处理能力。
                        <br>
                        NVIDIA Tesla P4：2560个CUDA单元、8GB显存、5.5Tflops单精度浮点运算处理能力。
                        <br>
                        NVIDIA Tesla K40：2880个CUDA单元、12GB显存、4.29Tflops单精度浮点运算处理能力。
                        <br>
                        NVIDIA 深度学习开发卡：3594个CUDA单元、12GB 显存、11Tflops浮点运算处理能力。
                    `,
                    opts: [
                        {
                            label: 'NVIDIA 深度学习开发卡',
                            value: 'deep',
                            disabled: false,
                            show: true
                        },
                        {
                            label: 'NVIDIA Tesla P4',
                            value: 'p4',
                            disabled: false,
                            show: true
                        },
                        {
                            label: 'NVIDIA Tesla P40',
                            value: 'p40',
                            disabled: false,
                            show: true
                        }
                    ],
                    value: 'deep'
                },
                gpuNum: {
                    name: 'GPU数量',
                    show: false,
                    opts: [
                        {
                            label: 1,
                            value: 1,
                            disabled: false,
                            show: true
                        },
                        {
                            label: 2,
                            value: 2,
                            disabled: false,
                            show: true
                        },
                        {
                            label: 4,
                            value: 4,
                            disabled: false,
                            show: true
                        }
                    ],
                    value: 1
                },
                cpu: {
                    name: 'CPU：',
                    show: true,
                    hasTip: '如需特殊规格配置，可提交工单审核<a href="#">工单入口>></a>',
                    opts: [{
                            label: '1核',
                            value: 1,
                            disabled: false,
                            show: true
                        },
                        {
                            label: '2核',
                            value: 2,
                            disabled: false,
                            show: true
                        },
                        {
                            label: '4核',
                            value: 4,
                            disabled: false,
                            show: true
                        },
                        {
                            label: '8核',
                            value: 8,
                            disabled: false,
                            show: true
                        },
                        {
                            label: '16核',
                            value: 16,
                            disabled: false,
                            show: true
                        },
                        {
                            label: '32核',
                            value: 32,
                            disabled: false,
                            show: true
                        },
                        {
                            label: '64核',
                            value: 64,
                            disabled: false,
                            show: true
                        },
                        {
                            label: '96核',
                            value: 96,
                            disabled: false,
                            show: true
                        }
                    ],
                    value: 1
                },
                memory: {
                    name: '内存：',
                    show: true,
                    opts: [{
                            label: '1GB',
                            value: 1,
                            disabled: false,
                            show: true
                        },
                        {
                            label: '2GB',
                            value: 2,
                            disabled: false,
                            show: true
                        },
                        {
                            label: '4GB',
                            value: 4,
                            disabled: false,
                            show: true
                        },
                        {
                            label: '8GB',
                            value: 8,
                            disabled: false,
                            show: false
                        },
                        {
                            label: '16GB',
                            value: 16,
                            disabled: false,
                            show: false
                        }
                    ],
                    value: 1
                },
                image: {
                    name: '镜像类型：',
                    show: true,
                    opts: [{
                            label: '公共镜像',
                            value: 'public',
                            disabled: false,
                            show: true

                        },
                        {
                            label: '自定义镜像',
                            value: 'custom',
                            disabled: true,
                            show: true
                        },
                        {
                            label: '服务集成镜像',
                            value: 'server',
                            disabled: false,
                            show: true
                        },
                        {
                            label: '共享镜像',
                            value: 'share',
                            disabled: true,
                            show: true
                        },
                        {
                            label: '云市场镜像',
                            value: 'cloud',
                            disabled: false,
                            show: true
                        }
                    ],
                    value: 'public'
                }
            },
            system: {
                name: '操作系统：',
                show: true,
                type: {
                    opts: [{
                            label: 'centOS',
                            icon: 'ui-icon-left',
                            value: 'centos',
                            disabled: false,
                            show: true
                        },
                        {
                            label: 'Debian',
                            icon: 'ui-icon-left',
                            value: 'debian',
                            disabled: false,
                            show: true
                        },
                        {
                            label: 'opensuse',
                            icon: 'ui-icon-left',
                            value: 'opensuse',
                            disabled: false,
                            show: true
                        },
                        {
                            label: 'windows Server',
                            icon: 'ui-icon-left',
                            value: 'winserver',
                            disabled: false,
                            show: true
                        }
                    ],
                    value: 'centos'
                }
            }
        };
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
        }
    }
};
</script>
