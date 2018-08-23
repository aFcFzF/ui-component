<style lang="less">
  .demo-box.demo-button {
        .ui-row {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }
    .ui-button + .ui-button {
        margin-left: 10px;
    }
    .ui-button-group {
        .ui-button + .ui-button {
            margin-left: 0;
        }

        & + .ui-button-group {
            margin-left: 10px;
        }
    }
  }
</style>

## Button 按钮
常用的操作按钮。

### 基础用法

基础的按钮用法。

:::demo 使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。

```html
<ui-row>
    <ui-button>默认按钮</ui-button>
    <ui-button class="ui-btn-primary">主要按钮</ui-button>
    <ui-button class="ui-btn-green">成功按钮</ui-button>
    <ui-button class="ui-btn-info">信息按钮</ui-button>
    <ui-button class="ui-btn-yellow">警告按钮</ui-button>
    <ui-button class="ui-btn-red">危险按钮</ui-button>
</ui-row>

<ui-row>
    <ui-button>朴素按钮</ui-button>
    <ui-button class="ui-btn-text-primary">主要按钮</ui-button>
    <ui-button class="ui-btn-text-green">成功按钮</ui-button>
    <ui-button class="ui-btn-text-info">信息按钮</ui-button>
    <ui-button class="ui-btn-text-yellow">警告按钮</ui-button>
    <ui-button class="ui-btn-text-red">危险按钮</ui-button>
</ui-row>

<ui-row>
    <ui-button class="ui-btn-circle">圆角按钮</ui-button>
    <ui-button class="ui-btn-circle ui-btn-text-primary">主要按钮</ui-button>
    <ui-button class="ui-btn-circle ui-btn-text-green">成功按钮</ui-button>
    <ui-button class="ui-btn-circle ui-btn-text-infoy">信息按钮</ui-button>
    <ui-button class="ui-btn-circle ui-btn-text-yellow">警告按钮</ui-button>
    <ui-button class="ui-btn-circle ui-btn-text-red">危险按钮</ui-button>
</ui-row>

<ui-row>
    <ui-button class="ui-btn-icon-circle"><i class="ui-icon-search"></i></ui-button>
    <ui-button class="ui-btn-icon-circle ui-btn-text-primary"><i class="ui-icon-star"></i></ui-button>
    <ui-button class="ui-btn-icon-circle ui-btn-text-green"><i class="ui-icon-star"></i></ui-button>
    <ui-button class="ui-btn-icon-circle ui-btn-text-info"><i class="ui-icon-star"></i></ui-button>
    <ui-button class="ui-btn-icon-circle ui-btn-text-yellow"><i class="ui-icon-star"></i></ui-button>
    <ui-button class="ui-btn-icon-circle ui-btn-text-red"><i class="ui-icon-star"></i></ui-button>
</ui-row>
```
:::

### 禁用状态

按钮不可用状态。

:::demo 你可以使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。

```html
<ui-row>
    <ui-button disabled>默认按钮</ui-button>
    <ui-button class="ui-btn-primary" disabled>主要按钮</ui-button>
    <ui-button class="ui-btn-green" disabled>成功按钮</ui-button>
    <ui-button class="ui-btn-info" disabled>信息按钮</ui-button>
    <ui-button class="ui-btn-yellow" disabled>警告按钮</ui-button>
    <ui-button class="ui-btn-red" disabled>危险按钮</ui-button>
</ui-row>

<ui-row>
    <ui-button plain disabled>朴素按钮</ui-button>
    <ui-button type="primary" plain disabled>主要按钮</ui-button>
    <ui-button type="success" plain disabled>成功按钮</ui-button>
    <ui-button type="info" plain disabled>信息按钮</ui-button>
    <ui-button type="warning" plain disabled>警告按钮</ui-button>
    <ui-button type="danger" plain disabled>危险按钮</ui-button>
</ui-row>
```
:::

### 文字按钮

没有边框和背景色的按钮。

:::demo
```html
<ui-button class="ui-btn-no-border">文字按钮</ui-button>
<ui-button class="ui-btn-text-primary ui-btn-no-border">主要按钮</ui-button>
<ui-button class="ui-btn-text-green ui-btn-no-border">成功按钮</ui-button>
<ui-button class="ui-btn-text-info ui-btn-no-border">信息按钮</ui-button>
<ui-button class="ui-btn-text-yellow ui-btn-no-border">警告按钮</ui-button>
<ui-button class="ui-btn-text-red ui-btn-no-border">危险按钮</ui-button>
<br>
<br>
<ui-button class="ui-btn-no-border ui-btn-no-fill">文字按钮</ui-button>
<ui-button class="ui-btn-text-primary ui-btn-no-border ui-btn-no-fill">主要按钮</ui-button>
<ui-button class="ui-btn-text-green ui-btn-no-border ui-btn-no-fill">成功按钮</ui-button>
<ui-button class="ui-btn-text-info ui-btn-no-border ui-btn-no-fill">信息按钮</ui-button>
<ui-button class="ui-btn-text-yellow ui-btn-no-border ui-btn-no-fill">警告按钮</ui-button>
<ui-button class="ui-btn-text-red ui-btn-no-border ui-btn-no-fill">危险按钮</ui-button>
```
:::

### 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

:::demo 设置`icon`属性即可，icon 的列表可以参考 Element 的 icon 组件，也可以设置在文字右边的 icon ，只要使用`i`标签即可，可以使用自定义图标。

```html
<ui-button class="ui-btn-icon-circle"><i class="ui-icon-inbox"></i></ui-button>
<ui-button class="ui-btn-circle"><i class="ui-icon-inbox"></i></ui-button>
<ui-button><i class="ui-icon-inbox"></i></ui-button>
<ui-button><span>查询</span><i class="ui-icon-search"></i></ui-button>
<ui-button class="ui-btn-text-primary"><i class="ui-icon-outbox"></i><span>上传</span></ui-button>
<ui-button class="ui-btn-text-red"><i class="ui-icon-trash"></i><span>删除</span></ui-button>
<ui-button class="ui-btn-primary">
    <i class="ui-icon-search"></i><span>查询</span>
</ui-button>
<ui-button class="ui-btn-circle ui-btn-primary">
    <i class="ui-icon-search"></i><span>查询</span>
</ui-button>
```
:::

### 按钮组

以按钮组的方式出现，常用于多项类似操作。

:::demo 使用`<ui-button-group>`标签来嵌套你的按钮。

```html
<template>
    <ui-button-group>
        <ui-button type="primary" @click="bSize(0)">大</ui-button>
        <ui-button type="primary" @click="bSize(1)">中</ui-button>
        <ui-button type="primary" @click="bSize(2)">小</ui-button>
        <ui-button type="primary" @click="bSize(3)">超小</ui-button>
    </ui-button-group>
    <p>当前大小: {{sizeDesc}}</p>
    <ui-button-group :class="!!btnSize ? 'ui-btn-group-' + btnSize : ''">
        <ui-button class="ui-btn-primary"><i class="ui-icon-search"></i><span>查询</span></ui-button>
        <ui-button class="ui-btn-primary"><i class="ui-icon-outbox"></i><span>上传</span></ui-button>
        <ui-button class="ui-btn-primary"><i class="ui-icon-trash"></i><span>删除</span></ui-button>
    </ui-button-group>
    <br/>
    <br/>
    <ui-button class="ui-btn-primary" :class="btnSizeCls">测试按钮</ui-button>
    <ui-button class="ui-btn-primary" :class="btnSizeCls"><i class="ui-icon-search"></i><span>查询</span></ui-button>
    <br>
    <br>
    <ui-button class="ui-btn-text-red" :class="btnSizeCls">危险按钮</ui-button>
    <ui-button class="ui-btn-circle ui-btn-text-primary" :class="btnSizeCls">主要按钮</ui-button>
    <br>
    <br>
    <ui-button class="ui-btn-icon-circle" :class="btnSizeCls"><i class="ui-icon-inbox"></i></ui-button>
</template>
<script>
    export default {
        data() {
            return {
                btnSize: '',
                btnSizeCls: '',
                sizeDesc: '中',
            }
        },
        methods: {
            bSize(i) {
                const size = ['l', '', 's', 'xs'][i];
                const desc = ['大', '中', '小', '超小'][i];
                this.btnSize = size;
                this.btnSizeCls = !!size ? 'ui-btn-' + size : '';
                this.sizeDesc = desc;
            }
        }
    }
</script>
```
:::

### 加载中

点击按钮后进行数据加载操作，在按钮上显示加载状态。

:::demo 要设置为 loading 状态，只要设置`loading`属性为`true`即可。

```html
<ui-button type="primary" :loading="true">加载中</ui-button>
```
:::

### 不同尺寸

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。

```html
<ui-row>
    <ui-button class="ui-btn-l ui-btn-primary">大型按钮</ui-button>
    <ui-button class="ui-btn-primary">中等按钮</ui-button>
    <ui-button class="ui-btn-s ui-btn-primary">小型按钮</ui-button>
    <ui-button class="ui-btn-xs ui-btn-primary">超小按钮</ui-button>
</ui-row>
<ui-row>
    <ui-button class="ui-btn-xs ui-btn-text-primary">超小按钮</ui-button>
    <ui-button class="ui-btn-s ui-btn-text-primary">小型按钮</ui-button>
    <ui-button class="ui-btn-text-primary">中等按钮</ui-button>
    <ui-button class="ui-btn-l ui-btn-text-primary">大型按钮</ui-button>
</ui-row>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   medium / small / mini            |    —     |
| type     | 类型   | string    |   primary / success / warning / danger / info / text |     —    |
| plain     | 是否朴素按钮   | boolean    | — | false   |
| round     | 是否圆角按钮   | boolean    | — | false   |
| circle     | 是否圆形按钮   | boolean    | — | false   |
| loading     | 是否加载中状态   | boolean    | — | false   |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| icon  | 图标类名 | string   |  —  |  —  |
| autofocus  | 是否默认聚焦 | boolean   |  —  |  false  |
| native-type | 原生 type 属性 | string | button / submit / reset | button |
