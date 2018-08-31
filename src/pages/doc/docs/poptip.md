<script>
  export default {
    data() {
      return {
        confirm: _ => {
          // 注意this绑定，否则为null
          this.$Message.success('点击了确认！');
        },
        close: _ => {
          this.$Message.info('点击了取消！');
        }
      };
    }
  };
</script>

<style>
  .demo-box.demo-poptip {
    .ui-poptip + .ui-poptip {
      margin-left: 10px;
    }
    .ui-input {
      width: 360px;
    }
    .ui-button {
      margin-left: 10px;
    }
  }
</style>

## Poptip 弹出框

### 基础用法
Poptip 的属性与 Tooltip 很类似，它们都是基于`Vue-popper`开发的，因此对于重复属性，请参考 Tooltip 的文档，在此文档中不做详尽解释。

:::demo `trigger`属性用于设置何时触发 poptip，支持四种触发方式：`hover`，`click`，`focus` 和 `manual`。对于触发 poptip 的元素，有两种写法：使用 `slot="reference"` 的具名插槽，或使用自定义指令`v-poptip`指向 poptip 的索引`ref`。
```html
<template>
  <ui-poptip
    content="确定删除此段工作经历，是否永久删除？"
    @confirm="confirm"
  >
    <ui-button class="ui-btn ui-btn-red">删除</ui-button>
  </ui-poptip>
  <ui-poptip
    content="确认删除?"
    @confirm="confirm"
    @close="close"
    theme="black"
    placement="right"
    >
    <ui-button class="ui-btn ui-btn-text-red ui-btn-no-border">
      右侧提示
      <i class="ui-icon-trash"></i>
    </ui-button>
  </ui-poptip>
  <br>
  <br>
  <span class="ui-tag ui-tag-warn">content无法放入DOMString，如有业务需求，欢迎扩展poptip</span>
</template>

<script>
  export default {
    data() {
      return {
        visible: false
      };
    }
  };
</script>
```
:::

### Attributes
| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
|theme   |    String white | -|-|-|
|  content        |  显示的内容，也可以通过 `slot` 传入 DOM   | String            | — | — |
|  placement        |  出现位置  | String | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |  bottom |
|  visible-arrow   |  是否显示 Tooltip 箭头，更多参数可见[Vue-popper](https://github.com/element-component/vue-popper) | Boolean | — | true |
|  popper-options        | [popper.js](https://popper.js.org/documentation.html) 的参数 | Object            | 参考 [popper.js](https://popper.js.org/documentation.html) 文档 | `{ boundariesElement: 'body', gpuAcceleration: false }` |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| close | 显示时触发 | — |
| confirm | 显示动画播放完毕后触发 | — |
