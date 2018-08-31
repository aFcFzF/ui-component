<style>
  .demo-box.demo-progress {
    .ui-progress--line {
      margin-bottom: 15px;
      width: 350px;
    }
    .ui-progress--circle {
      margin-right: 15px;
    }
  }
</style>
<script>
  export default {
    data() {
      progValue: 10;
    }
  }
</script>

## Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

### 线形进度条 — 百分比外显

:::demo Progress 组件设置`percent`属性即可，表示进度条对应的百分比，**必填**，必须在 0-100。

```html
<ui-progress :percent="10">
  <span slot="title">当前进度： </span>
  <span slot="text" class="primary-color">10%</span>
</ui-progress>
<br>
<ui-progress :percent="30" color="green"></ui-progress>
<br>
<ui-progress :percent="50" color="red"></ui-progress>
<br>
<ui-progress :percent="70" color="yellow"></ui-progress>
```
:::

### 线形进度条 — 自定义颜色和宽度

百分比不占用额外控件，适用于文件上传等场景。

:::demo Progress 组件可通过 `stroke-width` 属性更改进度条的高度，并可通过 `text-inside` 属性来将进度条描述置于进度条内部。

```html
<ui-progress :stroke-width="18" :percent="10" color="#eed2ee">
  <span slot="progress-text">10%</span>
</ui-progress>
<br>
<ui-progress :stroke-width="18" :percent="70" color="#f08080">
  <span slot="progress-text">70%</span>
</ui-progress>
<br>
<ui-progress :stroke-width="18" :percent="80" color="rgba(142, 113, 199, 0.7)">
  <span slot="progress-text">80%</span>
</ui-progress>
<br>
<ui-progress :stroke-width="18" :percent="100" color="#rgba(30, 30, 30, .3)"></ui-progress>
<br>
<ui-progress :stroke-width="18" :percent="50" color="#43CD80"></ui-progress>
<br>
```
:::

### 环形进度条

:::demo Progress 组件可通过 `type` 属性来指定使用环形进度条，在环形进度条中，还可以通过 `width` 属性来设置其大小。

```html
<ui-progress type="circle" :percent="0"></ui-progress>
<ui-progress type="circle" :percent="25"></ui-progress>
<ui-progress type="circle" :percent="80" color="#8e71c7"></ui-progress>
<ui-progress type="circle" :percent="100" status="success"></ui-progress>
<ui-progress type="circle" :percent="50" status="exception"></ui-progress>
```
:::

### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| **percentage** | **百分比（必填）**   | number          |     0-100          |     0    |
| type          | 进度条类型           | string         | line/circle | line |
| stroke-width  | 进度条的宽度，单位 px | number          | — | 6 |
| text-inside  | 进度条显示文字内置在进度条内（只在 type=line 时可用） | boolean | — | false |
| status  | 进度条当前状态 | string | success/exception | — |
| color  | 进度条背景色（会覆盖 status 状态颜色） | string | — | — |
| width  | 环形进度条画布宽度（只在 type=circle 时可用） | number |  | 126 |
| show-text  | 是否显示进度条文字内容 | boolean | — | true |
