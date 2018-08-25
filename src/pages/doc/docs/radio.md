<script>
  module.exports = {
    data() {
      return {
        radio: '',
        options: [
          { title: '选择1', key: 'a1'},
          { title: '选择2', key: 'a2'},
          { title: '选择3', key: 'a3'},
          {label: '选项4', key: 'aa'}
        ],
        radio1: '选中且禁用',
        radio2: 3,
        radio3: '上海',
        radio4: '上海',
        radio5: '上海',
        radio6: '上海',
        radio7: '1',
        radio8: '1',
        radio9: '1',
        radio10: '1'
      };
    }
  };
</script>

<style lang="less">
  .ui-radio-group {
    .ui-radio {
      margin-right: 20px;
    }
  }
</style>


## Radio 单选框

在一组备选项中进行单选

### 基础用法

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

:::demo 要使用 Radio 组件，只需要设置`v-model`绑定变量，选中意味着变量的值为相应 Radio `label`属性的值，`label`可以是`String`、`Number`或`Boolean`。

```html
<template>
  <p>值是： {{radio}}</p>
  <div class="ui-radio-group" v-model="radio2">
    <ui-radio v-model="radio" v-for="(item, idx) of options" :key="item.key" :value="item">选项1</ui-radio>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
      };
    }
  }
</script>
```
:::

### 禁用状态

单选框不可用的状态。

:::demo 只要在`ui-radio`元素中设置`disabled`属性即可，它接受一个`Boolean`，`true`为禁用。
```html
<template>
  <div class="ui-radio-group" v-model="radio2">
    <ui-radio disabled v-model="radio1" label="禁用">备选项</ui-radio>
    <ui-radio disabled v-model="radio1" label="选中且禁用">备选项</ui-radio>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio1: '选中且禁用'
      };
    }
  }
</script>
```
:::

### 单选框组

适用于在多个互斥的选项中选择的场景

:::demo 结合`div class="ui-radio-group"`元素和子元素`ui-radio`可以实现单选组，在`div class="ui-radio-group"`中绑定`v-model`，在`ui-radio`中设置好`label`即可，无需再给每一个`ui-radio`绑定变量，另外，还提供了`change`事件来响应变化，它会传入一个参数`value`。

```html
<template>
  <div class="ui-radio-group" v-model="radio2">
    <ui-radio :label="3">备选项</ui-radio>
    <ui-radio :label="6">备选项</ui-radio>
    <ui-radio :label="9">备选项</ui-radio>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio2: 3
      };
    }
  }
</script>
```
:::

### 按钮样式

按钮样式的单选组合。

:::demo 只需要把`ui-radio`元素换成`ui-radio-button`元素即可，此外，Element 还提供了`size`属性。
```html
<template>
  <div>
    <div class="ui-radio-group" v-model="radio3">
      <ui-radio type="button" label="上海"></ui-radio>
      <ui-radio type="button" label="北京"></ui-radio>
      <ui-radio type="button" label="广州"></ui-radio>
      <ui-radio type="button" label="深圳"></ui-radio>
    </div>
  </div>
  <div style="margin-top: 20px">
    <div class="ui-radio-group" v-model="radio4" size="medium">
      <ui-radio type="button" label="上海" ></ui-radio>
      <ui-radio type="button" label="北京"></ui-radio>
      <ui-radio type="button" label="广州"></ui-radio>
      <ui-radio type="button" label="深圳"></ui-radio>
    </div>
  </div>
  <div style="margin-top: 20px">
    <div class="ui-radio-group" v-model="radio5" size="small">
      <ui-radio type="button" label="上海"></ui-radio>
      <ui-radio type="button" label="北京" disabled ></ui-radio>
      <ui-radio type="button" label="广州"></ui-radio>
      <ui-radio type="button" label="深圳"></ui-radio>
    </div>
  </div>
  <div style="margin-top: 20px">
    <div class="ui-radio-group" v-model="radio6" disabled size="mini">
      <ui-radio type="button" label="上海"></ui-radio>
      <ui-radio type="button" label="北京"></ui-radio>
      <ui-radio type="button" label="广州"></ui-radio>
      <ui-radio type="button" label="深圳"></ui-radio>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio3: '上海',
        radio4: '上海',
        radio5: '上海',
        radio6: '上海'
      };
    }
  }
</script>
```
:::

### 带有边框

:::demo 设置`border`属性可以渲染为带有边框的单选框。
```html
<template>
  <div>
    <ui-radio v-model="radio7" label="1" border>备选项1</ui-radio>
    <ui-radio v-model="radio7" label="2" border>备选项2</ui-radio>
  </div>
  <div style="margin-top: 20px">
    <ui-radio v-model="radio8" label="1" border size="medium">备选项1</ui-radio>
    <ui-radio v-model="radio8" label="2" border size="medium">备选项2</ui-radio>
  </div>
  <div style="margin-top: 20px">
    <div class="ui-radio-group" v-model="radio9" size="small">
      <ui-radio label="1" border>备选项1</ui-radio>
      <ui-radio label="2" border disabled>备选项2</ui-radio>
    </div>
  </div>
  <div style="margin-top: 20px">
    <div class="ui-radio-group" v-model="radio10" size="mini" disabled>
      <ui-radio label="1" border>备选项1</ui-radio>
      <ui-radio label="2" border>备选项2</ui-radio>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio7: '1',
        radio8: '1',
        radio9: '1',
        radio10: '1'
      };
    }
  }
</script>
```
:::

### Radio Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | Radio 的 value   | string / number / boolean    |       —        |      —   |
| disabled  | 是否禁用    | boolean   | — | false   |
| border  | 是否显示边框  | boolean   | — | false   |
| size  | Radio 的尺寸，仅在 border 为真时有效  | string  | medium / small / mini | — |
| name | 原生 name 属性 | string    |      —         |     —    |

### Radio Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |

### Radio-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效   | string  | medium / small / mini |    —     |
| disabled  | 是否禁用    | boolean   | — | false   |
| text-color  | 按钮形式的 Radio 激活时的文本颜色    | string   | — | #ffffff   |
| fill  | 按钮形式的 Radio 激活时的填充色和边框色    | string   | — | #409EFF   |

### Radio-group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |

### Radio-button Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | Radio 的 value  | string / number  |        —       |     —    |
| disabled  | 是否禁用    | boolean   | — | false   |
| name | 原生 name 属性 | string    |      —         |     —    |
