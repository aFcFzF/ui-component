<template>
  <div class="h-text-ellipsis">
    <slot name="before" class="h-text-ellipsis-before"></slot>
    <span class="text-ellipsis-limit-text" :key="keyIndex" v-tooltip="useTooltip&&isHide" :theme="tooltipTheme" :content="text">{{text}}</span>
    <span class="h-text-ellipsis-more" v-show='oversize'><slot name="more"></slot></span>
    <slot name="after" class="h-text-ellipsis-after"></slot>
  </div>
</template>
<script>
import utils from '../../utils/utils';

export default {
  name: 'hTextEllipsis',
  props: {
    text: String,
    height: Number,
    isLimitHeight: {
      type: Boolean,
      default: true
    },
    useTooltip: {
      type: Boolean,
      default: false
    },
    tooltipTheme: String
  },
  data() {
    return {
      keyIndex: 0,
      oversize: false,
      isHide: false
    };
  },
  watch: {
    isLimitHeight() {
      this.init();
    },
    text() {
      this.init();
    },
    height() {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.oversize = false;
      this.keyIndex += 1;
      let more = this.$el.querySelector('.ui-text-ellipsis-more');
      more.style.display = 'none';
      if(this.isLimitHeight) {
        this.limitShow();
      }
    },
    limitShow() {
      this.$nextTick(() => {
        let textDom = this.$el.querySelector('.text-ellipsis-limit-text');
        let title = this.$el;
        let more = this.$el.querySelector('.ui-text-ellipsis-more');
        let n = 1000;
        if(textDom) {
          if(title.offsetHeight > this.height) {
            more.style.display = 'inline-block';
            let text = this.text;
            while (title.offsetHeight > this.height && n > 0) {
              textDom.innerText = text = text.substring(0, text.length-1);
              n--;
            }
            this.$emit('hide');
            this.isHide = true;
          } else {
            this.$emit('show');
            this.isHide = false;
          }
        }
      })
    }
  }
};
</script>