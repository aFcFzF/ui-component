<script>
  import iconList from '../common/config/icon.json';
  export default {
    data() {
      return {
        icons: iconList.names
      };
    }
  }
</script>
<style lang="less">
  .demo-icon .source > i {
    color: #606266;
    margin: 0 20px;
    font-size: 1.5em;
    vertical-align: middle;
  }

  .demo-icon .source > button {
    margin: 0 20px;
  }

  .page-component .content > ul.icon-list {
    overflow: hidden;
    list-style: none;
    padding: 0;
    border: solid 1px #eaeefb;
    border-radius: 4px;
  }
  .icon-list li {
    float: left;
    width: 16.66%;
    text-align: center;
    height: 120px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    border-radius: 3px;
    transition: color .1s linear, background .1s linear, transform .1s linear;
    transform: scale(.9);

    span {
      display: inline-block;
      line-height: normal;
      vertical-align: middle;
      font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',SimSun,sans-serif;
      color: #99a9bf;
    }

    i {
      display: block;
      font-size: 30px;
      margin-bottom: 15px;
      color: #606266;
    }

    .icon-name {
      display: inline-block;
      padding: 0 3px;
      height: 1em;
      color: #606266;
    }

    &:hover {
      color: rgb(92, 182, 255);
      background: #457EFF;
      color: white;
      transform: scale(1);
      i,
      .icon-name {
        color: white;
      }
    }
  }
</style>
## Icon 图标

提供了一套常用的图标集合。

### 使用方法

直接通过设置类名为 `ui-icon-iconName` 来使用即可。例如：

:::demo
```html
<i class="ui-icon-edit"></i>
<i class="ui-icon-task"></i>
<i class="ui-icon-trash"></i>
<ui-button class="ui-btn-primary" icon="ui-icon-search">搜索</ui-button>

```
:::

### 图标集合

<ul class="icon-list">
  <li v-for="name in icons" :key="name">
    <span>
      <i :class="name"></i>
      <span class="icon-name">{{name}}</span>
    </span>
  </li>
</ul>
