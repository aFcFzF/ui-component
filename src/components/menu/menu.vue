<template>
    <ul :class="classes">
        <MenuItem v-for="menu of menuDatas"
            :key="menu.key"
            :data="menu"
            :param="param"
            :status="status"
            @trigger="trigger">
        </MenuItem>
    </ul>
</template>
<script>
import utils from '../../utils/utils';
import config from '../../utils/config';
import MenuItem from './menu-item';

const prefix = 'ui-menu';

const initStatus = (list = [], param, parent) => {
    let dts = [];
    for (let data of list) {
        let obj = {
            key: data[param.keyName],
            title: data[param.titleName],
            icon: data.icon,
            count: data.count,
            value: data,
            status: {
                opened: false,
                disabled: !!data.disabled
            },
            style: {
                emphasis: !!data.emphasis
            },
            parent
        };
        let children = data[param.childrenName] || [];
        obj.children = initStatus(children, param, obj);
        dts.push(obj);
    }
    return dts;
};

const getObj = (list = [], param) => {
    let obj = {};
    for (let data of list) {
        let key = data.key;
        key && (obj[key] = data);
        let children = data.children;
        if (children && children.length) {
            utils.extend(obj, getObj(children, param));
        }
    }
    return obj;
};

const updateOpened = obj => {
    let openedList = [];
    if (obj.parent) {
        openedList.push(obj.parent.key);
        openedList.push(...updateOpened(obj.parent));
    }
    return openedList;
};

export default {
    props: {
        option: Object,
        datas: {
            type: Array,
            default: () => []
        },
        className: {
            type: String,
            default: 'ui-menu-dark'
        }
    },
    data() {
        let param = {};
        param = utils.extend({}, config.getOption('menu'), this.option);
        return {
            param,
            status: {
                selected: null,
                opened: this.getExp(this.datas) || []
            }
        };
    },
    computed: {
        classes() {
            return {
                [`${prefix}`]: true,
                [this.className]: true
            };
        },
        menuobj() {
            return getObj(this.menuDatas);
        },
        menuDatas() {
            return initStatus(this.datas, this.param);
        }
    },
    methods: {

        /**
         * getExp 找出展开的字段
         *
         * @param {Array} o 必须是array
         * @param {Array} r 返回值
         * @return {Array} 其实就是r
        */
        getExp(o, r = []) {
            const t = o =>
                o.forEach(e => {
                    e.open && r.push(e.key);
                    e.children && t(e.children);
                });
            t(o);
            return r;
        },

        select(key) {
            let selected = this.menuobj[key];
            if (selected) {
                this.status.selected = key;
                this.status.opened = updateOpened(selected);
            }
        },

        trigger(data) {
            if (data.type === 'togglemenuEvent') {
                this.status.opened = utils.toggleValue(
                this.status.opened,
                data.data.key
                );
                this.$emit('click', data.data);
                if (data.data.children && data.data.children.length > 0) {
                    return;
                }
                this.status.selected = data.data.key;
                this.$emit('select', data.data.value);
                this.$emit('onclick', data.data.value);
            }
        }
    },
    components: {
        MenuItem
    }
};
</script>
