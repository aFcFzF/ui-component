<script>
  module.exports = {
    data() {
      return {
        radio: 'sel4',
        options: [
          {label: '选项1', value: 'sel1'},
          {label: '选项2', value: 'sel2'},
          {label: '选项3', value: 'sel3'},
          {label: '选项4', value: 'sel4'}
        ],
        options1: ['选项1', '选项2', '选项3', '选项4', '选项5'],
        radio1: '选项2',
        radio2: 3,
        radio3: '上海',
        radio4: '上海',
        radio5: '上海',
        radio6: '上海',
        radio7: '1',
        radio8: '1',
        radio9: '1',
        radio10: '1',
        radioDts: ['a', 'b', 'c', 'd', 'e'],
        radioValue: 'a',
        radioSize: '',
        sizeDesc: '中（默认）',
        radioDisable: [
          {label: '正常', value: false},
          {label: '禁用', value: true}
        ],
        disableState: false,
      };
    },
    methods: {
      btnHdl() {
        this.radio1 = '选项4';
      },
      sizeHdl(idx) {
        this.radioSize = ['l', '', 's', 'xs'][idx],
        this.sizeDesc = ['大', '中（默认）', '小', '超小'][idx]
      },
      disableHdl() {

      }
    }
  };
</script>

<style lang="less">
  .ui-btn-group,
  .ui-radio-container {
    display: flex;
    align-items: center;
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
  <div class="ui-radio-container" v-model="radio2">
    <ui-radio v-model="radio" v-for="(item, idx) of options" :key="item.key" :value="item.value">选项{{idx+1}}</ui-radio>
  </div>
  <br>
  <p>值是： {{radio1}}</p>
  <div class="ui-radio-container" v-model="radio2">
    <ui-radio v-model="radio1" v-for="(item, idx) of options1" :key="item.key" :value="item">{{item}}</ui-radio>
    <ui-button class="ui-btn-primary" size="s" @click="btnHdl">手动设置</ui-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
      };
    },
    methods: {
      btnHdl() {
        this.radio1 = '选项4';
      }
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
  <div class="ui-radio-container" v-model="radio2">
    <ui-radio v-model="radio1" disabled v-for="(item, idx) of options1" :key="item.key" :value="item">{{item}}</ui-radio>
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

### 扩展样式

:::demo 设置`border`属性可以渲染为带有边框的单选框；设置`class为ui-radio-text` 样式可渲染为纯文字选项。
```html
<template>
    <ui-button-group>
        <span style="margin-right: 10px">radio大小：</span>
        <ui-button class="ui-btn-primary" @click="sizeHdl(0)" size="xs">大</ui-button>
        <ui-button class="ui-btn-primary" @click="sizeHdl(1)" size="xs">中</ui-button>
        <ui-button class="ui-btn-primary" @click="sizeHdl(2)" size="xs">小</ui-button>
        <ui-button class="ui-btn-primary" @click="sizeHdl(3)" size="xs">超小</ui-button>
    </ui-button-group>
    <br>
    <div class="ui-radio-container">
      <span style="margin-right: 10px">radio状态：</span>
      <ui-radio
          v-model="disableState"
          v-for="(item, idx) of radioDisable"
          :key="item.label"
          :value="item.value"
      >
        {{item.label}}
      </ui-radio>
  </div>
    <br>
    <p>值是： {{radio1}} - 大小:  {{sizeDesc}} - 禁用： {{disableState ? '是' : '否'}}</p>
    <br>
    <div class="ui-radio-container">
      <span style="margin-right: 10px">默认样式：</span>
      <ui-radio
        :class="radioSize ? `ui-radio-${radioSize}` : ''"
        :disabled="disableState"
        v-model="radio1"
        v-for="(item, idx) of options1"
        :key="item.key"
        :value="item"
      >
        {{item}}
      </ui-radio>
    </div>
    <br>
    <br>
    <div class="ui-radio-container">
    <span style="margin-right: 10px">边框样式：</span>
    <ui-radio
      :class="['ui-radio-border', radioSize ? `ui-radio-${radioSize}` : '']"
      :disabled="disableState"
      v-model="radio1"
      v-for="(item, idx) of options1"
      :key="item.key"
      :value="item"
    >
      {{item}}
    </ui-radio>
  </div>
  <br>
  <br>
  <div class="ui-radio-container">
    <span style="margin-right: 10px">纯文字样式：</span>
    <ui-radio
      :class="['ui-radio-text', radioSize ? `ui-radio-${radioSize}` : '']"
      :disabled="disableState"
      v-model="radio1"
      v-for="(item, idx) of options1"
      :key="item.key"
      :value="item"
    >
      {{item}}
    </ui-radio>
  </div>
  <br>
  <br>
  <div class="ui-radio-container">
    <span style="margin-right: 10px">group样式：</span>
    <ui-radio-group :datas="options1" v-model="radio1" :disabled="disableState"></ui-radio-group>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radioDisable: [
          {label: '正常', value: false},
          {label: '禁用', value: true}
        ],
        disableState: false
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
