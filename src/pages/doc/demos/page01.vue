<style lang="less">
@import './page01/style.less';
</style>

<template>
<div id="page01" class="demo page01">
    <header class="main-header">
        <div class="back"><i class="ui-icon-left"/>返回实例列表</div>
    </header>
    <div class="main-content">
        <div class="info-panel panel">
            <div class="panel-wrapper">
                <dl class="section section-fee">
                    <dd class="title">所选配置</dd>
                </dl>
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
                            <div class='gray1-color'>描述：{{props.item.value}}</div>
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
                <dd :class="['row', key]" v-for="(item, key) of storeOpts" :key="key">
                    <div :class="['row-item', {'new-line': e.br}, {caption: e.type === 'label'}]" v-for="e of item" :key="e.name">
                        <template v-if="e.type === 'label'">{{e.name}}</template>
                        <ui-select v-else-if="e.type === 'selector'" :datas="e.opts" v-model="e.value"/>
                        <ui-slider v-else-if="e.type ==='slider'" v-model="e.value"></ui-slider>
                        <input type="text" :class="e.class" v-else-if="e.type === 'input'" :value="e.value">
                        <ui-button
                            v-else-if="e.type === 'button' && !e.hidden"
                            @click="clkHdl(e.event.click, $event)"
                            class="ui-btn-primary ui-btn-xs"
                            :disabled="e.disabled"
                            :icon="e.icon">
                                {{e.name}}
                            </ui-button>
                        <tooltip v-else-if="e.type === 'tooltip'">
                            <div slot="content">{{e.content}}</div>
                            <i :class="[e.icon, 'yellow-color']"/>
                        </tooltip>
                        <ui-switch v-else-if="e.type === 'switch'" v-model="e.value"></ui-switch>
                        <p :class="e.class" v-else-if="e.type === 'tag'" v-html="e.content"/>
                    </div>
                </dd>
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

</div>

</div>
</template>

<script>
import cusModal from './page01/modal';
import formData from './page01/data';

export default {
    components: {
        cusModal
    },
    data() {
        return {
            ...formData
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
        }
    },
    methods: {
        clkHdl(type, e) {
            console.log('点击', type, e)
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
        }
    },
    mounted() {
        // 初始化系统版本选项
        const val = this.systemOpt.value;
        this.systemVersion.opts = this.versionOpt[val].opts;
        this.systemVersion.value = this.versionOpt[val].value;
    }
};
</script>
