<script>
  module.exports = {
    methods: {
      open() {
        const h = this.$createElement;

        this.$Notice({
          title: '标题名称',
          content: `
          <p style="color: #333">这是提示文案这是提示文案这是提示文案这是
          <br>
          第二行文字： 提示文案这是提示文案这是提示文案这是提示文案这是提示文案
          <br>
          第三行文字： 这是第三行
          </p>`
        });
      },

      open2() {
        this.$Notice({
          title: '提示',
          content: '这是一条不会自动关闭的消息',
          timeout: 0
        });
      },

      open3() {
        this.$Notice({
          title: '成功',
          content: '这是一条成功的提示消息',
          type: 'success'
        });
      },

      open4() {
        this.$Notice({
          title: '警告',
          content: '这是一条警告的提示消息',
          type: 'warn'
        });
      },

      open5() {
        this.$Notice.info({
          title: '消息',
          content: '这是一条消息的提示消息'
        });
      },

      open6() {
        this.$Notice.error({
          title: '错误',
          content: '这是一条错误的提示消息'
        });
      },

      open7() {
        this.$Notice({
          title: '自定义位置',
          content: '右上角弹出的消息'
        });
      },

      open8() {
        this.$Notice({
          title: '自定义位置',
          content: '右下角弹出的消息',
          position: 'bottom-right'
        });
      },

      open9() {
        this.$Notice({
          title: '自定义位置',
          content: '左下角弹出的消息',
          position: 'bottom-left'
        });
      },

      open10() {
        this.$Notice({
          title: '自定义位置',
          content: '左上角弹出的消息',
          position: 'top-left'
        });
      },

      open11() {
        this.$Notice({
          title: '偏移',
          content: '这是一条带有偏移的提示消息',
          offset: 100
        });
      },

      open12() {
        this.$Notice({
          title: 'HTML 片段',
          dangerouslyUseHTMLString: true,
          content: '<strong>这是 <i>HTML</i> 片段</strong>'
        });
      },

      open13() {
        this.$Notice.success({
          title: 'Info',
          content: '这是一条没有关闭按钮的消息',
          showClose: false
        });
      },

      onClose() {
        console.log('Notice 已关闭');
      },

      noticeButton(hasTitle = false) {
        let info = {
          type: 'info',
          content: `这是一个可以自己关闭的通知`,
          timeout: 0,
          buttons: [ {
            name: '忽略',
            type: 'cancel'
          },{
            name: '去看看',
            color: 'primary',
            type: 'confirm'
          }],
          events: {
            confirm: (e) => {
              this.$Message.success('已经处理');
              e.close();
            },
            cancel: (e) => {
              this.$Message.warn('我已经去忽略了');
              e.close();
            }
          }
        }
        if (hasTitle) {
          info.title = "自定义通知";
        }
        this.$Notice(info);
      }
    }
  };
</script>

## Notice 通知

悬浮出现在页面角落，显示全局的通知提醒消息。

### 基本用法

适用性广泛的通知栏

:::demo Notice 组件提供通知功能，`$Notice`方法接收一个`options`字面量参数，在最简单的情况下，你可以设置`title`字段和`content`字段，用于设置通知的标题和正文。默认情况下，经过一段时间后 Notice 组件会自动关闭，但是通过设置`timeout`，可以控制关闭的时间间隔，特别的是，如果设置为`0`，则不会自动关闭。注意：`timeout`接收一个`Number`，单位为毫秒，默认为`4500`。
```html
<template>
  <ui-button
    @click="open">
    可自动关闭
  </ui-button>
  <ui-button
    @click="open2">
    不会自动关闭
    </ui-button>
    <p>
      <span class="ui-tag ui-tag-warn">
        当前content仍然无法渲染vue-template,但可以渲染DOMString,如有需求，请扩展tooltip
      </span>
    </p>
</template>

<script>
  export default {
    methods: {
      open() {
        const h = this.$createElement;

        this.$Notice({
          title: '标题名称',
          content: `
          <p style="color: #333">这是提示文案这是提示文案这是提示文案这是
          <br>
          第二行文字： 提示文案这是提示文案这是提示文案这是提示文案这是提示文案
          <br>
          第三行文字： 这是第三行
          </p>`
        });
      },

      open2() {
        this.$Notice({
          title: '提示',
          content: '这是一条不会自动关闭的消息',
          timeout: 0
        });
      }
    }
  }
</script>
```
:::

### 带有倾向性

带有 icon，常用来显示「成功、警告、消息、错误」类的系统消息

:::demo Element 为 Notice 组件准备了四种通知类型：`success`, `warn`, `info`, `error`。通过`type`字段来设置，除此以外的值将被忽略。同时，我们也为 Notice 的各种 type 注册了方法，可以在不传入`type`字段的情况下像`open5`和`open6`那样直接调用。
```html
<template>
  <ui-button @click="open3">
    成功
  </ui-button>
  <ui-button @click="open4">
    警告
  </ui-button>
  <ui-button @click="open5">
    消息
  </ui-button>
  <ui-button @click="open6">
    错误
  </ui-button>
</template>

<script>
  export default {
    methods: {
      open3() {
        this.$Notice({
          title: '成功',
          content: '这是一条成功的提示消息',
          type: 'success'
        });
      },

      open4() {
        this.$Notice({
          title: '警告',
          content: '这是一条警告的提示消息',
          type: 'warn'
        });
      },

      open5() {
        this.$Notice.info({
          title: '消息',
          content: '这是一条消息的提示消息'
        });
      },

      open6() {
        this.$Notice.error({
          title: '错误',
          content: '这是一条错误的提示消息'
        });
      }
    }
  }
</script>
```
:::

### 自定义按钮

自定义内容按钮

:::demo
```html
<template>
  <ui-button @click="noticeButton(false)">自定义按钮</ui-button>

<script>
  export default {
    methods: {
      noticeButton(hasTitle = false) {
        let info = {
          type: 'info',
          content: `这是一个可以自己关闭的通知`,
          timeout: 0,
          buttons: [ {
            name: '忽略',
            type: 'cancel'
          },{
            name: '去看看',
            color: 'primary',
            type: 'confirm'
          }],
          events: {
            confirm: (e) => {
              this.$Message.info('去处理看看');
              e.close();
            },
            cancel: (e) => {
              this.$Message.warn('我已经去忽略了');
              e.close();
            }
          }
        }
        if (hasTitle) {
          info.title = "自定义通知";
        }
        this.$Notice(info);
      }
    }
  }
</script>
```
:::


### 全局方法

Element 为 `Vue.prototype` 添加了全局方法 `$Notice`。因此在 vue instance 中可以采用本页面中的方式调用 Notice。

### 单独引用

单独引入 Notice：

```javascript
import { Notice } from 'element-ui';
```

此时调用方法为 `Notice(options)`。我们也为每个 type 定义了各自的方法，如 `Notice.success(options)`。并且可以调用 `Notice.closeAll()` 手动关闭所有实例。

### Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 标题 | string | — | — |
| content | 说明文字 | string/Vue.VNode | — | — |
| dangerouslyUseHTMLString | 是否将 content 属性作为 HTML 片段处理 | boolean | — | false |
| type | 主题样式，如果不在可选值内将被忽略 | string | success/warn/info/error | — |
| iconClass | 自定义图标的类名。若设置了 `type`，则 `iconClass` 会被覆盖 | string | — | — |
| customClass | 自定义类名 | string | — | — |
| timeout | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | — | 4500 |
| position | 自定义弹出位置 | string | top-right/top-left/bottom-right/bottom-left | top-right |
| showClose | 是否显示关闭按钮 | boolean | — | true |
| onClose | 关闭时的回调函数 | function | — | — |
| onClick | 点击 Notice 时的回调函数 | function | — | — |
| offset | 偏移的距离，在同一时刻，所有的 Notice 实例应当具有一个相同的偏移量 | number | — | 0 |

### 方法
调用 `Notice` 或 `this.$Notice` 会返回当前 Notice 的实例。如果需要手动关闭实例，可以调用它的 `close` 方法。
| 方法名 | 说明 |
| ---- | ---- |
| close | 关闭当前的 Notice |
