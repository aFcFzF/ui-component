<template>
<div :class="tableCls">
    <div class="ui-table-header" :style="{'padding-right': (scrollWidth+'px')}">
        <table :style="{'margin-left': (-scrollLeft+'px')}">
            <colgroup>
                <col v-if="checkbox" width="60" />
                <col v-for="(c, index) of computeColumns" :width="getWidth(c)" :key="index+update.columns" />
            </colgroup>
            <tr>
                <th v-if="checkbox" class="ui-table-th-checkbox">
                    <Checkbox v-if="fixedColumnLeft.length==0" :indeterminate="checks.length>0&&checks.length<datas.length" :checked="checks.length>0&&checks.length == datas.length" @click.native="checkAll"></Checkbox>
                </th>
                <slot v-if="!columns.length&&!$scopedSlots.default"></slot>
                <template v-else>
                    <TableTh v-for="(c, index) of computeColumns" :key="index+update.columns" v-bind="c"></TableTh>
                </template>
            </tr>
        </table>
        <div class="ui-table-fixed-cover" :style="{'width': (scrollWidth+'px')}"></div>
    </div>
    <div class="ui-table-container">
        <div class="ui-table-content-empty" v-if="datas.length == 0">
            <slot name='empty'></slot>
            <div v-if="!$slots.empty">无数据</div>
        </div>
        <div class="ui-table-body" v-show="datas.length" :style="bodyStyle">
            <table>
                <colgroup>
                    <col v-if="checkbox" width="60" />
                    <col v-for="(c, index) of computeColumns" :width="getWidth(c)" :key="index+update.columns" />
                </colgroup>
                <tbody class="ui-table-tbody">
                    <template v-for="(d, index) of datas">
                        <TableTr @click="triggerTrClicked" :datas="d" :key="index+update.datas" :index="index" :trIndex="index" :class="{'ui-table-tr-selected': checks.indexOf(d)>-1}">
                            <td v-if="checkbox" class="ui-table-td-checkbox">
                                <Checkbox v-if="fixedColumnLeft.length==0" v-model="checks" :value="d"></Checkbox>
                            </td>
                            <slot :data="d" :index="index" v-if="$scopedSlots.default"></slot>
                        </TableTr>
                        <tr :key="index+update.datas+'expand'" class="ui-table-expand-tr" v-if="$scopedSlots.expand && d._expand">
                            <td class="ui-table-expand-cell" :colspan="totalCol">
                                <slot :data="d" :index="index" name="expand"></slot>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <div v-if="fixedColumnLeft.length" class="ui-table-fixed-left" v-width="leftWidth" :style="fixedBodyStyle">
            <table :style="{'margin-top': (-scrollTop+'px')}" v-width="tableWidth">
                <colgroup>
                    <col v-if="checkbox" width="60" />
                    <col v-for="(c, index) of computeColumns" :width="getWidth(c)" :key="index+update.columns" />
                </colgroup>
                <tbody class="ui-table-tbody">
                    <template v-for="(d, index) of datas">
                        <TableTr @click="triggerTrClicked" :datas="d" :key="index+update.datas" :index="index" :trIndex="index" :class="{'ui-table-tr-selected': checks.indexOf(d)>-1}">
                            <td v-if="checkbox" class="ui-table-td-checkbox">
                                <Checkbox v-model="checks" :value="d"></Checkbox>
                            </td>
                            <slot :data="d" :index="index" v-if="$scopedSlots.default"></slot>
                        </TableTr>
                    </template>
                </tbody>
            </table>
        </div>
        <div v-if="fixedColumnRight.length" class="ui-table-fixed-right" v-width="rightWidth" :style="fixedRightBodyStyle">
            <table :style="{'margin-top': (-scrollTop+'px')}" v-width="tableWidth">
                <colgroup>
                    <col v-for="(c, index) of computeColumns" :width="getWidth(c)" :key="index+update.columns" />
                </colgroup>
                <tbody class="ui-table-tbody">
                    <template v-for="(d, index) of datas">
                        <TableTr @click="triggerTrClicked" :datas="d" :key="index+update.datas" :index="index" :trIndex="index" :class="{'ui-table-tr-selected': checks.indexOf(d)>-1}">
                            <slot :data="d" :index="index" v-if="$scopedSlots.default"></slot>
                        </TableTr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
    <div v-if="fixedColumnLeft.length" class="ui-table-fixed-header-left">
        <table v-width="leftWidth">
            <colgroup>
                <col v-if="checkbox" width="60" />
                <col v-for="(c, index) of fixedColumnLeft" :width="getWidth(c)" :key="index+update.columns" />
            </colgroup>
            <tr>
                <th v-if="checkbox" class="ui-table-th-checkbox">
                    <Checkbox :indeterminate="checks.length>0&&checks.length<datas.length" :checked="datas.length > 0 && checks.length == datas.length" @click.native="checkAll"></Checkbox>
                </th>
                <th v-for="(c, index) of fixedColumnLeft" :key="index+update.columns" :class="{[`text-${c.align}`]: !!c.align}">{{c.title}}</th>
            </tr>
        </table>
    </div>
    <div v-if="fixedColumnRight.length" :style="{'margin-right': (scrollWidth+'px')}" class="ui-table-fixed-header-right">
        <table v-width="rightWidth">
            <colgroup>
                <col v-for="(c, index) of fixedColumnRight" :width="getWidth(c)" :key="index+update.columns" />
            </colgroup>
            <tr>
                <th v-for="(c, index) of fixedColumnRight" :key="index+update.columns" :class="{[`text-${c.align}`]: !!c.align}">{{c.title}}</th>
            </tr>
        </table>
    </div>
    <Loading :loading="loading"></Loading>
</div>
</template>

<script>
import utils from '../../utils/utils';
import TableTr from './table-tr';
import TableTh from './table-item';

const prefix = 'ui-table';

export default {
    props: {
        columns: {
            type: Array,
            default: () => []
        },
        datas: {
            type: Array,
            default: () => []
        },
        border: {
            type: Boolean,
            default: false
        },
        height: Number,
        checkbox: {
            type: Boolean,
            default: false
        },
        stripe: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        selectWhenClickTr: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            update: {
                datas: 0,
                columns: 0
            },
            scrollWidth: 0,
            scrollHeight: 0,
            scrollLeft: 0,
            scrollTop: 0,
            checks: [],
            hoveredTr: null,
            leftWidth: 0,
            rightWidth: 0,
            tableWidth: 400,
            computeColumns: [],
            datasBak: [...this.datas],
            sortStatus: {
                type: null,
                prop: null
            }
        };
    },
    watch: {
        datas: {
            handler(value, oldValue) {
                if (this.height || this.fixedColumnLeft.length || this.fixedColumnRight.length) {
                    this.resize();
                }
                let changed = this.datasBak.length !== this.datas.length;
                let n = 0;
                while (!changed && this.datas.length > n) {
                    changed = this.datas[n] !== this.datasBak[n];
                    n++;
                }
                if (changed) {
                    this.update.datas += 1;
                }
                this.datasBak = [...this.datas];
            },
            deep: true
        },
        columns: {
            handler() {
                this.initColumns();
                if (this.height || this.fixedColumnLeft.length || this.fixedColumnRight.length) {
                    this.resize();
                }
                this.update.columns += 1;
            },
            deep: true
        },
        checks: {
            handler() {
                this.$emit('select', this.checks);
            },
            deep: true
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resize);
    },
    mounted() {
        this.$watch('datas', (value, oldValue) => {
            this.checks.splice(0, this.checks.length);
        });
        this.initColumns();
        this.$nextTick(() => {
            let body = this.$el.querySelector('.ui-table-body');
            if (body) {
                let scrollEvent = event => {
                    // event.preventDefault();
                    // event.stopPropagation();
                    body.scrollLeft = body.scrollLeft + (event.deltaX);
                    body.scrollTop = body.scrollTop + (event.deltaY);
                    if (this.scrollTop !== body.scrollTop) {
                        event.stopPropagation();
                        event.preventDefault();
                    }
                    this.scrollLeft = body.scrollLeft;
                    this.scrollTop = body.scrollTop;
                };
                body.addEventListener('scroll', () => {
                    this.scrollLeft = body.scrollLeft;
                    this.scrollTop = body.scrollTop;
                });
                let fixedright = this.$el.querySelector('.ui-table-fixed-right');
                let fixedleft = this.$el.querySelector('.ui-table-fixed-left');
                if (fixedright) {
                    fixedright.addEventListener('mousewheel', scrollEvent);
                }
                if (fixedleft) {
                    fixedleft.addEventListener('mousewheel', scrollEvent);
                }
            }
            if (this.fixedColumnLeft.length || this.fixedColumnRight.length) {
                window.addEventListener('resize', this.resize);
            }
            this.resize();
            setTimeout(() => {
                this.resize();
            }, 100);

            let tbodys = this.$el.querySelectorAll('.ui-table-tbody');
            for (let tbody of tbodys) {
                tbody.addEventListener('mouseover', event => {
                    let tr = null;
                    let target = event.target;
                    while (target.parentNode !== window.document.body) {
                        if (target.tagName === 'TR') {
                            tr = target;
                            break;
                        }
                        target = target.parentNode;
                    }
                    if (tr) {
                        utils.addClass(tr, 'ui-table-tr-hovered');
                        let index = tr.getAttribute('trIndex');
                        for (let el of this.$el.querySelectorAll(`.ui-table-tbody>tr[trIndex='${index}']`) || []) {
                            utils.addClass(el, 'ui-table-tr-hovered');
                        }
                    }
                }, false);
                tbody.addEventListener('mouseout', event => {
                    for (let el of this.$el.querySelectorAll('.ui-table-tr-hovered') || []) {
                        utils.removeClass(el, 'ui-table-tr-hovered');
                    }
                }, false);
            }
        });
    },
    methods: {
        clearSelection() {
            this.checks = [];
        },
        clearSort() {
            this.sortStatus.prop = null;
            this.sortStatus.type = null;
        },
        triggerSort(sortStatus, triggerType) {
            this.sortStatus.prop = sortStatus.prop;
            this.sortStatus.type = sortStatus.type;
            if (triggerType === true) {
                this.$emit('sort', utils.copy(sortStatus));
            }
            else if (triggerType === 'auto') {
                this.datas.sort((a, b) => {
                    let ad = a[sortStatus.prop];
                    let bd = b[sortStatus.prop];
                    let index = ad === bd ? 0 : (ad > bd) ? 1 : -1;
                    return sortStatus.type === 'asc' ? index : -index;
                });
            }
            return this.sortStatus;
        },
        setSelection(data) {
            if (utils.isArray(data)) {
                this.checks = [...data];
            }
        },
        checkAll() {
            if (this.checks.length === this.datas.length) {
                this.checks.splice(0, this.datas.length);
            }
            else {
                this.checks = utils.extend([], this.datas);
            }
            this.$emit('selectAll', this.checks);
        },
        getWidth(column) {
            if (utils.isObject(column) && column.width) {
                return column.width;
            }
            else {
                return '';
            }
        },
        resize() {
            this.$nextTick(() => {
                let body = this.$el.querySelector('.ui-table-body');
                if (body) {
                    this.scrollWidth = body.offsetWidth - body.clientWidth;
                    this.scrollHeight = body.offsetHeight - body.clientHeight;
                }
                this.tableWidth = this.$el.querySelector('.ui-table-container').clientWidth;
                this.initFixedWidth();
            });
        },
        mouseover(data) {
            this.hoveredTr = data;
        },
        mouseout() {
            this.hoveredTr = null;
        },
        initFixedWidth() {
            let ths = this.$el.querySelectorAll('.ui-table-header table>tr>th');
            let fixedColumnLeftLength = this.fixedColumnLeft.length + (this.checkbox ? 1 : 0);
            let leftWidth = 0;
            for (let i = 0; i < fixedColumnLeftLength; i++) {
                leftWidth += ths[i].clientWidth || 0;
            }
            this.leftWidth = leftWidth;

            let fixedColumnRightLength = this.fixedColumnRight.length;
            let rightWidth = 0;
            for (let i = ths.length - 1; i > ths.length - fixedColumnRightLength - 1; i--) {
                rightWidth += ths[i].clientWidth || 0;
            }
            this.rightWidth = rightWidth;
        },
        refresh() {
            this.initColumns();
            this.$nextTick(() => this.resize());
        },
        initColumns() {
            if (this.columns.length) {
                this.computeColumns = this.columns;
                return;
            }
            let columns = [];
            if (this.$slots.default) {
                for (let slot of this.$slots.default) {
                    let option = slot.componentOptions;
                    if (option && (option.tag === 'TableItem' || option.tag === 'ui-table-item')) {
                        columns.push(slot.componentOptions.propsData);
                    }
                }
            }
            this.computeColumns = columns;
        },
        triggerTrClicked(data, event) {
            if (this.selectWhenClickTr && !utils.hasClass(event.target, 'h-checkbox-native')) {
                let list = this.checks;
                if (list.some(item => item === data)) {
                    list.splice(list.indexOf(data), 1);
                }
                else {
                    list.push(data);
                }
            }
            this.$emit('trclick', data);
        }
    },
    computed: {
        totalCol() {
            return (this.checkbox ? 1 : 0) + this.computeColumns.length;
        },
        fixedColumnLeft() {
            let columns = [];
            for (let c of this.computeColumns) {
                if (c.fixed === 'left') {
                    columns.push(c);
                }
            }
            return columns;
        },
        fixedColumnRight() {
            let columns = [];
            for (let c of this.computeColumns) {
                if (c.fixed === 'right') {
                    columns.push(c);
                }
            }
            return columns;
        },
        tableCls() {
            return {
                [prefix]: true,
                [`${prefix}-border`]: !!this.border,
                [`${prefix}-stripe`]: this.stripe
            };
        },
        fixedBodyStyle() {
            let s = {};
            s['bottom'] = `${this.scrollHeight}px`;
            if (!!this.height) {
                s.maxHeight = `${this.height}px`;
            }
            return s;
        },
        fixedRightBodyStyle() {
            let s = {};
            s['margin-right'] = `${this.scrollWidth}px`;
            s['bottom'] = `${this.scrollHeight}px`;
            if (this.height) {
                s.maxHeight = `${this.height}px`;
            }
            return s;
        },
        bodyStyle() {
            let s = {};
            if (this.height) {
                s.maxHeight = `${this.height}px`;
                // s.overflow = 'auto';
            }
            return s;
        }
    },
    components: {
        TableTr,
        TableTh
    }
};
</script>
