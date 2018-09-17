<style>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    margin-right: 20px;
    box-sizing: border-box;
  }
</style>

<script>
  module.exports = {
    data: () => ({
      show: true,
      show2: true,
      show3: true
    })
  }
</script>


## 内置过渡动画

Element 内应用在部分组件的过渡动画，你也可以直接使用。在使用之前请阅读 [transition 组件文档](https://cn.vuejs.org/v2/api/#transition) 。

### fade 淡入淡出

:::demo 提供 `ui-fade-in-linear` 和 `ui-fade-in` 两种效果。
```html
<template>
  <div>
    <ui-button @click="show = !show">Click Me</ui-button>

    <div style="display: flex; margin-top: 20px; height: 100px;">
      <transition name="ui-fade-in-linear">
        <div v-show="show" class="transition-box">.ui-fade-in-linear</div>
      </transition>
      <transition name="ui-fade-in">
        <div v-show="show" class="transition-box">.ui-fade-in</div>
      </transition>
    </div>
  </div>
</template>

<script>
    export default {
    data: () => ({
      show: true
    })
  }
</script>

<style>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
```
:::

### zoom 缩放

:::demo 提供 `ui-zoom-in-center`，`ui-zoom-in-top` 和 `ui-zoom-in-bottom` 三种效果。
```html
<template>
  <div>
    <ui-button @click="show2 = !show2">Click Me</ui-button>

    <div style="display: flex; margin-top: 20px; height: 100px;">
      <transition name="ui-zoom-in-center">
        <div v-show="show2" class="transition-box">.ui-zoom-in-center</div>
      </transition>

      <transition name="ui-zoom-in-top">
        <div v-show="show2" class="transition-box">.ui-zoom-in-top</div>
      </transition>

      <transition name="ui-zoom-in-bottom">
        <div v-show="show2" class="transition-box">.ui-zoom-in-bottom</div>
      </transition>
    </div>
  </div>
</template>

<script>
    export default {
    data: () => ({
      show2: true
    })
  }
</script>

<style>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
```
:::




### 按需引入

```js
// fade/zoom 等
import './src/themes/common/transition.less';
<transition name="ui-zoom-in-center">
  <div v-show="show2" class="transition-box">.ui-zoom-in-center</div>
</transition>
```

