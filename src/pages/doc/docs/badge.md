## Badge 标记

出现在按钮、图标旁的数字或状态标记。

### 基础用法
展示新消息数量。

:::demo 定义`value`属性，它接受`Number`或者`String`。

```html
<ui-badge :count="12" class="item">
  <ui-button class="ui-btn-s">评论</ui-button>
</ui-badge>
<ui-badge :count="3" class="item">
  <ui-button class="ui-btn-s">回复</ui-button>
</ui-badge>

<style>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
```
:::

### 最大值
可自定义最大值。

:::demo 由`max`属性定义，它接受一个`Number`，需要注意的是，只有当`value`为`Number`时，它才会生效。

```html
<ui-badge :count="200" :max-count="99" class="item">
  <ui-button class="ui-btn-s">评论</ui-button>
</ui-badge>
<ui-badge :count="100" :max-count="10" class="item">
  <ui-button class="ui-btn-s">回复</ui-button>
</ui-badge>

<style>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
```
:::

### 自定义内容
可以显示数字以外的文本内容。

:::demo 定义`value`为`String`类型是时可以用于显示自定义文本。

```html
<ui-badge :count="10" class="item">
  <ui-button class="ui-btn-s">评论</ui-button>
  <span slot="content">新消息</span>
</ui-badge>
<ui-badge :max-count="10" :count="15" class="item">
  <span slot="content">new</span>
  <ui-button class="ui-btn-s" >回复</ui-button>
</ui-badge>

<style>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
```
:::

### 小红点
以红点的形式标注需要关注的内容。

:::demo 除了数字外，设置`is-dot`属性，它接受一个`Boolean`。

```html
<ui-badge :dot="true" :count="999" class="item">数据查询</ui-badge>
<ui-badge dot :count="1" class="item">
  <ui-button icon="ui-icon-info" class="ui-btn-primary"></ui-button>
</ui-badge>

<style>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
```
:::

<style scoped>
  .share-button {
    width: 36px;
    padding: 10px;
  }

  .mark {
    margin-top: 8px;
    line-height: 1;
    float: right;
  }

  .clearfix {
    @utils-clearfix;
  }

  .item {
    margin-right: 40px;
  }
</style>

### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| value          | 显示值      | string, number          |          —             |    —     |
| max          |  最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型    | number  |         —              |     —    |
| is-dot       | 小圆点    | boolean  |  —  |  false |
| hidden | 隐藏 badge | boolean | — | false |
