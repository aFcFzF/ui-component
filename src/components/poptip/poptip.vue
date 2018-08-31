<template>
<Tooltip ref="tooltip" :theme="theme" :placement="placement" trigger="click">
    <slot></slot>
    <div slot="content" class="ui-poptip">
        <div class="ui-poptip-content"><i class="yellow-color ui-icon-warn"></i>
            <i class="ui-split"></i>
            {{content}}
        </div>
        <div class="clearfix">
            <div class="float-right">
                <Button @click="close" size="xs" :text="true">取消</Button>
                <Button @click="trigger" size="xs" color="primary">确定</Button>
            </div>
        </div>
    </div>
</Tooltip>
</template>

<script>
export default {
    props: {
        content: String,
        placement: {
            type: String,
            default: 'top'
        },
        theme: {
            type: String,
            default: 'white'
        }
    },
    methods: {
        close() {
            this.$emit('close');
            this.$refs.tooltip.hide();
        },
        trigger() {
            this.$emit('confirm');
            this.$refs.tooltip.hide();
        }
    }
};
</script>
