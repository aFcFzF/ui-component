<style lang="less">
  .demo-color-box {
    border-radius: 4px;
    padding: 20px;
    margin: 5px 0;
    height: 74px;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;

    & .value {
      font-size: 12px;
      opacity: 0.69;
      line-height: 24px;
    }
  }
  .demo-color-box-group {
    .demo-color-box {
      border-radius: 0;
      margin: 0;
    }
    .demo-color-box:first-child {
      border-radius: 4px 4px 0 0;
    }
    .demo-color-box:last-child {
      border-radius: 0 0 4px 4px;
    }
  }
  .bg-blue {
    background-color: #457EFF;
  }

  .bg-success {
    background-color: #67C23A;
  }
  .bg-warning {
    background-color: #F8CF68;
  }
  .bg-danger {
    background-color: #F95D5D;
  }
  .bg-info {
    background-color: #8a95af;
  }

  .bg-text-primary {
    background-color: #303133;
  }
  .bg-text-regular {
    background-color: #666;
  }
  .bg-text-secondary {
    background-color: #9d9d9d;
  }
  .bg-text-placeholder {
    background-color: #c0c4cc;
  }

  .bg-border-base {
    background-color: #dcdfe6;
  }
  .bg-border-light {
    background-color: #e4e7ed;
  }
  .bg-border-lighter {
    background-color: #ebeef5;
  }
  .bg-border-extra-light {
    background-color: #f2f6fc;
  }

  [class*=" bg-border-"] {
    color: #303133;
  }

  .ui-row {
    display: flex;
    &-item {
      padding: 10px;
      flex-grow: 1;
      max-width: 300px;
    }
  }
</style>

## Color 色彩

Element 为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。

### 主色

Element 主要品牌颜色是鲜艳、友好的蓝色。

<div class="ui-row">
  <div  class="ui-row-item" >
    <div class="demo-color-box bg-blue">Blue<div class="value">#457EFF</div></div>
  </div>
</div>

### 辅助色

除了主色外的场景色，需要在不同的场景中使用（例如危险色表示危险的操作）。

<div class="ui-row">
  <div  class="ui-row-item" >
    <div class="demo-color-box bg-success">Success<div class="value">#67C23A</div></div>
  </div>
  <div  class="ui-row-item" >
    <div class="demo-color-box bg-warning">Warning<div class="value">#F8CF68</div></div>
  </div>
  <div  class="ui-row-item" >
    <div class="demo-color-box bg-danger">Danger<div class="value">#F95D5D</div></div>
  </div>
  <div  class="ui-row-item" >
    <div class="demo-color-box bg-info">Info<div class="value">#8a95af</div></div>
  </div>
</div>

### 中性色

中性色用于文本、背景和边框颜色。通过运用不同的中性色，来表现层次结构。

<div class="ui-row">
  <div  class="ui-row-item" >
    <div class="demo-color-box-group">
      <div class="demo-color-box bg-text-primary">主要文字<div class="value">#333</div></div>
      <div class="demo-color-box bg-text-regular">常规文字<div class="value">#666</div></div>
      <div class="demo-color-box bg-text-secondary">次要文字<div class="value">#9d9d9d</div></div>
      <div class="demo-color-box bg-text-placeholder">占位文字<div class="value">#c7c7c7</div></div>
    </div>
  </div>
  <div  class="ui-row-item" >
    <div class="demo-color-box-group">
      <div class="demo-color-box bg-border-base">一级边框<div class="value">#DCDFE6</div></div>
      <div class="demo-color-box bg-border-light">二级边框<div class="value">#E4E7ED</div></div>
      <div class="demo-color-box bg-border-lighter">三级边框<div class="value">#EBEEF5</div></div>
      <div class="demo-color-box bg-border-extra-light">四级边框<div class="value">#F2F6FC</div></div>
    </div>
  </div>
</div>
