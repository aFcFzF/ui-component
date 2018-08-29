<style lang="less">
  .demo-box.demo-tag {
    .div + .div {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
    .default-tags {
      li {
        padding: 10px 0;
      }
    }
  }
</style>

## Tag 标签

用于标记和选择。

### 基础用法

:::demo 由`type`属性来选择tag的类型，也可以通过`color`属性来自定义背景色。

```html
<ul class="default-tags">
  <li>
    <div class="ui-tag">标签一</div>
  </li>
  <li>
    <div class="ui-tag ui-tag-primary">主颜色小标签</div>
  </li>
  <li>
    <div class="ui-tag ui-tag-warn">
      多行标签： Tag 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。
      <br>
      第二行内容
      <br>
      第三行内容
    </div>
  </li>
  <li>
    <div class="ui-tag ui-tag-error">错误</div>
  </li>
  <li>
    <div class="ui-tag ui-tag-success">通过</div>
  </li>
<ul>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 主题 | string | success/info/warning/danger | — |
| closable | 是否可关闭 | boolean | — | false |
| disable-transitions | 是否禁用渐变动画 | boolean | — | false |
| hit | 是否有边框描边 | boolean | — | false |
| color | 背景色 | string | — | — |
| size | 尺寸 | string | medium / small / mini | — |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭 Tag 时触发的事件 | — |
