<template>
    <dd>
        <div v-if="options.label" class="row-label">
            {{options.label}}：
        </div>
        <div class="row-content">
            <div
                :class="['content-item', {'new-line': e.br}]"
                v-for="(e, key) of options.opts"
                :key="e.name + '__' + key"
            >
                <ui-select v-if="e.type === 'selector'" :autosize="e.autosize" :datas="e.opts || e.datas" v-model="e.value" :key="e.name + '_selector_' + key"/>
                <ui-slider v-else-if="e.type ==='slider'" v-model="e.value"></ui-slider>
                <input type="text" :class="e.class" v-else-if="e.type === 'input'" :value="e.value" :placeholder="e.placeholder">
                <label v-else-if="e.type === 'label'" :class="e.class">{{e.content}}</label>
                <ui-button
                    v-else-if="e.type === 'button' && !e.hidden"
                    @click="clkHdl(e.event.click.name, e.event.click.data, $event)"
                    :class="['ui-btn-xs', e.class]"
                    :disabled="e.disabled"
                    :icon="e.icon">
                        {{e.name}}
                    </ui-button>
                <tooltip v-else-if="e.type === 'tooltip'" :theme="e.theme" :placement="e.placement">
                    <div slot="content">{{e.content}}</div>
                    {{e.before}}
                    <i :class="[e.icon, 'yellow-color']"/>
                    {{e.after}}
                </tooltip>
                <ui-switch v-else-if="e.type === 'switch'" v-model="e.value"><span slot="before" v-html="e.before"/><span slot="after" v-html="e.after"/></ui-switch>
                <ui-radio-group v-else-if="e.type === 'radio-group'" :datas="e.datas" v-model="e.value"></ui-radio-group>
                <div class="ui-radios" v-else-if="e.type === 'radios'">
                    <ui-radio v-for="rdoItem of e.datas" :value="rdoItem.value" v-model="e.value" :key="rdoItem.value">{{rdoItem.label}}</ui-radio>
                </div>
                <p :class="e.class" v-else-if="e.type === 'tag'" v-html="e.content"/>
                <opt-item v-else-if="e.type === 'group'" v-for="(subItem, key) of e.opts" :options="subItem" :key="'__' + key + e.name" :class="['row', key]" @clkHdl=" clkHdl"></opt-item>
            </div>
        </div>
    </dd>
</template>
<script>

export default {
    props: {
        options: Object
    },

    methods: {
        clkHdl(val, idx) {
            this.$emit('clkHdl', val, idx);
        }
    }
};
</script>

