<template>
    <div :class="buttonGroupCls">
        <slot></slot>
    </div>
</template>
<script>
const prefix = 'ui-btn-group';

export default {
    props: {
        circle: Boolean,
        size: {
            type: String,
            validato(value) {
                return ['l', 's', 'xs'].indexOf(value) > -1;
            }
        }
    },
    data() {
        return {};
    },
    computed: {
        buttonGroupCls() {
            return {
                [`${prefix}`]: true,
                [`${prefix}-circle`]: !!this.circle,
                [`${prefix}-${this.size}`]: !!this.size
            };
        }
    }
};
</script>