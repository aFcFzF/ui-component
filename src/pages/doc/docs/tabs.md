<script>
  export default {
    data() {
      return {
        tabs1: [
          {label: '高配版', value: 'senior'},
          {label: '中配版', value: 'middle'},
          {label: '入门版', value: 'junior'},
          {label: '模型机', value: 'model'}
        ],
        activeVal: 'model'
      }
    },
    methods: {
      clkHdl() {
        this.$Message.success('结果是： ' + this.activeVal);
      }
    }
  }
</script>
<style lang="less">
  .content {
    min-height: 200px;
    position: relative;

    .tabs-card-enter-active, .tabs-card-leave-active {
      transition: all .3s;
    }
    .tabs-card-enter, .tabs-card-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
      opacity: 0;
      transform: translateX(30px);
    }

    .card {
      position: absolute;
      left: 0;
      top: 0;
      padding: 30px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      &-0 {
        background: tint(#eee, 40);
      }
      &-1 {
        background: tint(#eee, 60);
      }
      &-2 {
        background: tint(#eee, 80);
      }
      &-3 {
        background: tint(#eee, 100);
      }
    }
  }
</style>
## Tabs 标签页

分隔内容上有关联但属于不同类别的数据集合。

### 基础用法

基础的、简洁的标签页。

:::demo Tabs 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 `value` 属性来指定当前选中的标签页。

```html
<template>
  <ui-tabs v-model="activeVal" @click="clkHdl" :datas="tabs1"></ui-tabs>
  <div class="content">
    <transition-group mode="in-out" name="tabs-card">
      <section class="card card-0" :key="tabs1[0].value" v-show="activeVal === tabs1[0].value">
        我是卡片1
      </section>
      <section class="card card-1" :key="tabs1[1].value" v-show="activeVal === tabs1[1].value">
        我是卡片2
      </section>
      <section class="card card-2" :key="tabs1[2].value" v-show="activeVal === tabs1[2].value">
        我是卡片3
      </section>
      <section class="card card-3" :key="tabs1[3].value" v-show="activeVal === tabs1[3].value">
        我是卡片4
      </section>
    </transition-group>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
```
:::

### 卡片样式

基础的、简洁的标签页。

:::demo Tabs 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 `value` 属性来指定当前选中的标签页。

```html
<template>
  <ui-tabs v-model="activeVal" @click="clkHdl" :datas="tabs1" class-name="ui-tabs-card"></ui-tabs>
  <div class="content">
    <transition-group mode="in-out" name="tabs-card">
      <section class="card card-0" :key="tabs1[0].value" v-show="activeVal === tabs1[0].value">
        我是卡片1
      </section>
      <section class="card card-1" :key="tabs1[1].value" v-show="activeVal === tabs1[1].value">
        我是卡片2
      </section>
      <section class="card card-2" :key="tabs1[2].value" v-show="activeVal === tabs1[2].value">
        我是卡片3
      </section>
      <section class="card card-3" :key="tabs1[3].value" v-show="activeVal === tabs1[3].value">
        我是卡片4
      </section>
    </transition-group>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
```
:::


### Tabs Attributes
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 风格类型   | string   | card/border-card  |     —    |
| closable  | 标签是否可关闭   | boolean   | — |  false  |
| addable  | 标签是否可增加   | boolean   | — |  false  |
| editable  | 标签是否同时可增加和关闭   | boolean   | — |  false  |
| value  | 绑定值，选中选项卡的 name  | string   |  —  |  第一个选项卡的 name |
| tab-position  | 选项卡所在位置 | string   |  top/right/bottom/left  |  top |
| stretch  | 标签的宽度是否自撑开 | boolean   |  -  |  false |
| before-leave | 切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。 | Function(activeName, oldActiveName) | — | — |

### Tabs Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| tab-click  | tab 被选中时触发 | 被选中的标签 tab 实例 |
| tab-remove  | 点击 tab 移除按钮后触发  | 被删除的标签的 name |
| tab-add  | 点击 tabs 的新增按钮后触发  | — |
| edit  | 点击 tabs 的新增按钮或 tab 被关闭后触发  | (targetName, action) |

### Tab-pane Attributes
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 选项卡标题   | string   | — |    —     |
| disabled | 是否禁用 | boolean | — | false |
| name      | 与选项卡 activeName 对应的标识符，表示选项卡别名 | string | — | 该选项卡在选项卡列表中的顺序值，如第一个选项卡则为'1' |
| closable  | 标签是否可关闭   | boolean   | — |  false  |
| lazy  | 标签是否延迟渲染   | boolean   | — |  false  |
