<template>
  <div :class="pageCls">
    <span :class="prefix+'-total'"
          :style="{order:orders.total}"
          v-if="orders.total!=-1">{{ 'h.pagination.totalBefore' | hlang}} <span :class="prefix+'-total-num'">{{total}}</span> {{ 'h.pagination.totalAfter' | hlang}}</span>
    <Select :no-border="small"
            :autosize="true"
            :null-option="false"
            :datas="sizesShow"
            @input="changesize"
            v-model="sizeNow"
            :style="{order:orders.sizes}"
            v-if="orders.sizes!=-1"></Select>
    <span class="h-page-pager-container"
          :style="{order:orders.pager}"
          v-if="orders.pager!=-1 && this.count>0">
                      <span :class="prevCls" @click="prev()"><i class="ui-icon-left"></i></span>
    <span @click="change(1)"
          :class="genPagerCls(1)">1</span>
    <span v-if="pagers.length > 0 && 1 < pagers[0] - 1"
          class="h-page-pager h-page-ellipsis">...</span>
    <span v-for="pager of pagers"
          :key="pager"
          @click="change(pager)"
          :class="genPagerCls(pager)">{{pager}}</span>
    <span class="h-page-pager h-page-ellipsis"
          v-if="pagers.length > 0 && count > pagers[pagers.length-1] + 1">...</span>
    <span @click="change(count)"
          :class="genPagerCls(count)"
          v-if="this.count>1">{{count}}</span>
    <span :class="nextCls"
          @click="next()"><i class="ui-icon-right"></i></span>
    </span>
    <input type="text"
           :style="{order:orders.jumper}"
           v-if="orders.jumper!=-1 && count > 0"
           v-width="40"
           :value="curNow"
           @blur="jump" />
  </div>
</template>
<script>
import config from "../../utils/config";
import utils from "../../utils/utils";

const prefix = "h-page";

export default {
  name: 'hPagination',
  props: {
    size: {
      type: Number,
      default: () => config.getOption("page.size")
    },
    sizes: {
      type: Array,
      default: () => config.getOption("page.sizes")
    },
    align: {
      type: String,
      default: "left"
    },
    cur: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pagerSize: {
      type: Number,
      default: 5
    },
    small: {
      type: Boolean,
      default: () => config.getOption("page.small")
    },
    layout: {
      type: String,
      default: () => config.getOption("page.layout")
    }
  },
  data() {
    let layoutList = this.layout.replace(" ", "").split(",");
    let orders = { total: -1, pager: -1, jumper: -1, sizes: -1 };
    for (let o in orders) {
      orders[o] = layoutList.indexOf(o);
    }
    const keyField = config.getOption("dict", "keyName");
    const titleField = config.getOption("dict", "titleName");
    return {
      sizesShow: this.sizes.map(item => {
        return {
          [keyField]: item,
          [titleField]: this.t('h.pagination.sizeOfPage', {size: item})
        };
      }),
      sizeNow: this.size,
      curNow: this.cur,
      orders
    };
  },
  watch: {
    cur() {
      this.curNow = this.cur;
    }
  },
  methods: {
    prev() {
      if(this.curNow == 1) return;
      this.change(this.curNow - 1);
    },
    next() {
      if(this.curNow == this.count) return;
      this.change(this.curNow + 1);
    },
    jump(event) {
      let value = parseInt(event.target.value, 10);
      // log(value);
      if (isNaN(value)) {
        this.$Message.error(this.t('h.pagination.incorrectFormat'));
        return;
      }
      if (value > this.count || value < 1) {
        this.$Message.error(this.t('h.pagination.overSize'));
        return;
      }
      this.curNow = parseInt(event.target.value, 10);
      this.$emit("change", { cur: this.curNow, size: this.sizeNow });
    },
    change(cur) {
      if (this.curNow == cur) return;
      this.curNow = cur;
      let onChange = config.getOption("page.onChange");
      if (utils.isFunction(onChange)) {
        onChange.call(null, { cur: this.curNow, size: this.sizeNow });
      }
      this.$emit("change", { cur: this.curNow, size: this.sizeNow });
    },
    changesize() {
      this.curNow = 1;
      this.$emit("change", { cur: 1, size: this.sizeNow });
      this.$emit("changeSize", this.sizeNow);
      let onChangeSize = config.getOption("page.onChangeSize");
      if (utils.isFunction(onChangeSize)) {
        onChangeSize.call(null, this.sizeNow);
      }
    },
    genPagerCls(num) {
      return {
        [`${prefix}-pager`]: true,
        [`${prefix}-pager-selected`]: this.curNow == num
      };
    }
  },
  computed: {
    count() {
      return Math.ceil(this.total / this.sizeNow);
    },
    pagers() {
      if (this.count < 3) {
        return [];
      }
      let pageStart = this.curNow - Math.floor(this.pagerSize / 2);
      pageStart = Math.max(2, pageStart);
      let pageEnd = pageStart + this.pagerSize - 1;
      pageEnd = Math.min(this.count - 1, pageEnd);
      pageStart = Math.min(pageStart, pageEnd - this.pagerSize + 1);
      pageStart = Math.max(2, pageStart);
      let list = [];
      for (let i = pageStart; i <= pageEnd; i++) {
        list.push(i);
      }
      return list;
    },
    prefix() {
      return prefix;
    },
    prevCls() {
      return {
        [`${prefix}-pager-disabled`]: this.curNow == 1,
        "h-page-pager": true
      };
    },
    nextCls() {
      return {
        [`${prefix}-pager-disabled`]: this.curNow == this.count,
        "h-page-pager": true
      };
    },
    pagerCls() {
      return {
        [`${prefix}-pager`]: true
      };
    },
    pageCls() {
      return {
        [`${prefix}`]: true,
        [`${prefix}-small`]: this.small,
        [`${prefix}-align-${this.align}`]: !!this.align
      };
    },
    containerCls() {
      return {};
    },
    noticeCls() {
      return {};
    }
  }
};
</script>
