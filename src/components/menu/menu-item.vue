<template>
    <li class="ui-menu-li" :class="{'ui-menu-li-opened':(status.opened.indexOf(data.key) != -1)}">
        <div class="ui-menu-show"
            @click="!data.status.disabled && togglemenu(data)"
            :class="{
                'ui-menu-show-disabled': data.status.disabled,
                'ui-menu-li-selected': data.key && status.selected == data.key,
                'ui-menu-show-emphasis': data.style.emphasis
            }"
        >
            <span class="ui-menu-show-icon" v-show="data.icon"><i :class="data.icon"></i></span>
            <span class="ui-menu-show-desc">{{data.title}}</span>
            <span class="ui-menu-show-count" v-if="data.count"><Badge :count="data.count" :max-count="99"></Badge></span>
            <span class="ui-menu-show-expand" v-if="data.children && data.children.length > 0">
                <i class="ui-icon-down"></i>
            </span>
        </div>
        <ul
            v-if="data.children && data.children.length > 0"
            class="ui-menu-ul"
        >
            <ui-menuItem
                v-for="child of data.children"
                :key="child.key"
                :data="child"
                :param="param"
                :status="status"
                @trigger="trigger"
            >
            </ui-menuItem>
        </ul>
    </li>
</template>
<script>
export default {
    props: {
        data: Object,
        param: Object,
        status: Object
    },
    data() {
        return {};
    },
    methods: {
        trigger(data) {
            this.$emit('trigger', data);
        },
        togglemenu(data) {
            this.$emit('trigger', {
                type: 'togglemenuEvent',
                data
            });
        }
    }
};
</script>
