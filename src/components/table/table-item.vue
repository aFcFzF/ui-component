<template>
<th :class="cls" @click="triggerSort()">
    <div v-if="tooltip" v-tooltip :placement="placement" :content="content || title">
        <span>{{title}}</span>
        <span class="ui-table-sort-handler" v-if="sort">
            <span class="ui-table-sort-asc"
                v-if="sortStatus.type === 'asc' && sortStatus.prop == prop"
                :class="{'sort-selected': sortStatus.type == 'asc' && sortStatus.prop == prop}"
            >
                <i class="ui-icon-top"></i>
            </span>
        <span class="ui-table-sort-desc"
            v-else
            :class="{'sort-selected': sortStatus.type == 'desc' && sortStatus.prop == prop}">
            <i class="ui-icon-down"></i>
        </span>
        </span>
    </div>
    <div v-else>
        <span>{{title}}</span>
        <span class="ui-table-sort-handler" v-if="sort">
        <span
          class="ui-table-sort-asc"
          v-if="sortStatus.type == 'asc' && sortStatus.prop == prop"
          :class="{'sort-selected': sortStatus.type == 'asc' && sortStatus.prop == prop}"
          >
            <i class="ui-icon-top"></i>
        </span>
        <span class="ui-table-sort-desc" v-else :class="{'sort-selected': sortStatus.type == 'desc' && sortStatus.prop == prop}">
            <i class="ui-icon-down"></i>
        </span>
        </span>
    </div>

</th>
</template>

<script>
import utils from '../../utils/utils';
export default {
    props: {
        title: String,
        width: Number,
        fixed: String,
        label: String,
        prop: String,
        align: String,
        tooltip: {
            type: Boolean,
            default: false
        },
        sort: {
            type: [Boolean, String],
            default: false
        },
        placement: String,
        content: String
    },
    data() {
        return {
            sortStatus: {
                type: null,
                prop: null
            }
        };
    },
    beforeMount() {
        this.init();
    },
    beforeDestroy() {
        this.init();
    },
    // render(h) {
    //   let directives = [];
    //   let attrs = {};
    //   if( this.tooltip ){
    //     directives.push({
    //       name: 'tooltip',
    //     });
    //     if(!utils.isNull(this.content)){
    //       attrs.content = this.content;
    //     }
    //     if(this.placement){
    //       attrs.placement = this.placement;
    //     }
    //   }
    //   return h(
    //     'th', {
    //       'class': {
    //         [`text-${this.align}`]: !!this.align
    //       },
    //       directives, attrs
    //     }, [this.title]
    //   )
    // },
    methods: {
        triggerSort() {
            if (!this.sort) {
                return false;
            }
            let sortStatus = utils.copy(this.sortStatus);
            if (this.sortStatus.type && this.sortStatus.prop === this.prop) {
                sortStatus.type = this.sortStatus.type === 'asc' ? 'desc' : 'asc';
            }
            else {
                sortStatus.type = 'desc';
                sortStatus.prop = this.prop;
            }
            let parent = this.$parent;
            if (parent.$options._componentTag === 'Table' || parent.$options._componentTag === 'ui-table') {
                this.sortStatus = parent.triggerSort(sortStatus, this.sort);
            }
        },
        init() {
            let parent = this.$parent;
            if (parent.$options._componentTag === 'Table' || parent.$options._componentTag === 'ui-table') {
                parent.refresh();
            }
        }
    },
    computed: {
        cls() {
            return {
                [`text-${this.align}`]: !!this.align,
                pointer: this.sort
            };
        }
    },
    watch: {
        title() {
            this.init();
        },
        width() {
            this.init();
        },
        fixed() {
            this.init();
        },
        label() {
            this.init();
        },
        prop() {
            this.init();
        },
        align() {
            this.init();
        }
    }
};
</script>
