<script>
  module.exports = {
    data() {
      return {
        showModal1: false,
        switchOpen: false,
        showModal2: false,
        switchOpen2: false,
        chkOpt: [
          {
            label: '去掉遮罩',
            value: false
          },
          {
            label: '点击遮罩关闭',
            value: false
          },
          {
            label: '居中',
            value: false
          },
          {
            label: '显示关闭按钮',
            value: false
          },
          {
            label: '分割线',
            value: false
          },
          {
            label: '全屏',
            value: false
          }
        ]
      };
    },
    methods: {
      showConfirm() {
        this.$Confirm('确定弹出消息框麽？', '我是title')
        .then(_ => this.$Message.success('确认'))
        .catch(e => this.$Message.error('取消'));
      },
      showModal(param = null) {
        const p = Object.assign({
          title: '自定义标题',
          content: '<p>正文部分就是我！</p>'
        }, param);
        this.$Modal(p)
      },
      showComplexModel() {
        const param = {
          title: '复杂modal',
          content: `
            <p class="内容">按钮</p>
          `,
          buttons: [
            {
              type: 'ensure',
              name: '是',
              color: 'primary'
            },
            {
              type: 'deny',
              name: '否',
              color: 'text-red'
            },
            {
              type: 'cancal',
              name: '取消',
              color: 'text-yellow'
            },
          ],
          events: {
            ensure: mod => {
              mod.close();
              this.$Message.success('操作成功！');
            },
            deny: mod => {
              mod.close();
              this.$Message.error('拒绝！');
            },
            cancal: mod => {
              mod.close();
              this.$Message.warn('最终还是选择取消！');
            }
          }
        };
        this.$Modal(param);
      },
      closeHdl() {
        this.showModal1 = false;
      },
      showTplModal() {
        this.showModal1 = true;
      },
      closeHdl2() {
        this.showModal2 = false;
      },
      showTplModal2() {
        this.showModal2 = true;
      }
    }
  };
</script>

<style lang="less">
  .demo-box.demo-Modal {
    .Modal-footer button:first-child {
      margin-right: 10px;
    }
    .full-image {
      width: 100%;
    }
    .ui-modal__wrapper {
      margin: 0;
    }
    .ui-select {
      width: 300px;
    }
    .ui-input {
      width: 300px;
    }
    .ui-button--text {
      margin-right: 15px;
    }
  }
  .ui-checkbox-group {
    .ui-checkbox {
      margin-right: 10px;
    }
  }
</style>
## Modal 对话框
在保留当前页面状态的情况下，告知用户并承载相关操作。

### 全局调用

将modal绑定在Vue.prototype上，便于在任何地方弹出对话框。

:::demo js对modal的操作，类似于moye的定义方法，只不过看起来更灵活，不失为一种更好的定义方式。
```html
<ui-button @click="showConfirm">调用Confirm</ui-button>
<ui-button @click="showModal">调用Model</ui-button>
<ui-button @click="showModal({fullScreen: true, hasCloseIcon: true, buttons: [], title: '全屏'})">调用全屏Model</ui-button>
<ui-button
  @click="showComplexModel"
>
  自定义按钮事件
</ui-button>


<script>
  export default {
    data() {
      return {
        ModalVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>
```
:::

### 模板调用

将modal绑定在Vue.prototype上，便于在任何地方弹出对话框。

:::demo js对modal的操作，类似于moye的定义方法，只不过看起来更灵活，不失为一种更好的定义方式。
```html
<ui-button @click="showTplModal">打开模板Modal</ui-button>
<ui-modal v-model="showModal1">
  <div slot="header">自定义标题</div>
  <ui-switch v-model="switchOpen">
    <template slot="before">开启麽</template>
  </ui-switch>
  <ui-button @click="closeHdl" slot="footer">关闭</ui-button>
</ui-modal>


<script>
  export default {
    data() {
      return {
        ModalVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      showTplModal() {
        this.showModal1 = true;
      }
    }
  };
</script>
```
:::

### 模板参数

将modal绑定在Vue.prototype上，便于在任何地方弹出对话框。

:::demo js对modal的操作，类似于moye的定义方法，只不过看起来更灵活，不失为一种更好的定义方式。
```html
<div class="ui-checkbox-group">
  <ui-checkbox v-for="(item, idx) of chkOpt" v-model="item.value" :key="item.label">
    {{item.label}}
  </ui-checkbox>
</div>
<br>
<ui-button @click="showTplModal2">弹出</ui-button>
<ui-modal
  v-model="showModal2"
  :has-mask="!chkOpt[0].value"
  :close-on-mask="chkOpt[1].value"
  :middle="chkOpt[2].value"
  :has-close-icon="chkOpt[3].value"
  :has-divider="chkOpt[4].value"
  :full-screen="chkOpt[5].value"
>
  <div slot="header">自定义标题</div>
  <ui-switch v-model="switchOpen2">
    <template slot="before">开启麽</template>
  </ui-switch>
  <ui-button class="ui-btn-s" @click="closeHdl2" slot="footer">关闭</ui-button>
</ui-modal>


<script>
  export default {
    data() {
      return {
        ModalVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      showTplModal() {
        this.showModal1 = true;
      }
    }
  };
</script>
```
:::

:::tip
`before-close` 仅当用户通过点击关闭图标或遮罩关闭 Modal 时起效。如果你在 `footer` 具名 slot 里添加了用于关闭 Modal 的按钮，那么可以在按钮的点击回调函数里加入 `before-close` 的相关逻辑。
:::



:::tip
Modal 的内容是懒渲染的，即在第一次被打开之前，传入的默认 slot 不会被渲染到 DOM 上。因此，如果需要执行 DOM 操作，或通过 `ref` 获取相应组件，请在 `open` 事件回调中进行。
:::

:::tip
如果 `visible` 属性绑定的变量位于 Vuex 的 store 内，那么 `.sync` 不会正常工作。此时需要去除 `.sync` 修饰符，同时监听 Modal 的 `open` 和 `close` 事件，在事件回调中执行 Vuex 中对应的 mutation 更新 `visible` 属性绑定的变量的值。
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| visible   | 是否显示 Modal，支持 .sync 修饰符 | boolean | — | false |
| title     | Modal 的标题，也可通过具名 slot （见下表）传入 | string    | — | — |
| width     | Modal 的宽度 | string    | — | 50% |
| fullscreen     | 是否为全屏 Modal | boolean    | — | false |
| top       | Modal CSS 中的 margin-top 值 | string | — | 15vh |
| modal     | 是否需要遮罩层   | boolean   | — | true |
| modal-append-to-body     | 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Modal 的父元素上   | boolean   | — | true |
| append-to-body     | Modal 自身是否插入至 body 元素上。嵌套的 Modal 必须指定该属性并赋值为 true   | boolean   | — | false |
| lock-scroll | 是否在 Modal 出现时将 body 滚动锁定 | boolean | — | true |
| custom-class      | Modal 的自定义类名 | string    | — | — |
| close-on-click-modal | 是否可以通过点击 modal 关闭 Modal | boolean    | — | true |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Modal | boolean    | — | true |
| show-close | 是否显示关闭按钮 | boolean    | — | true |
| before-close | 关闭前的回调，会暂停 Modal 的关闭 | function(done)，done 用于关闭 Modal | — | — |
| center | 是否对头部和底部采用居中布局 | boolean | — | false |

### Slot
| name | 说明 |
|------|--------|
| — | Modal 的内容 |
| title | Modal 标题区的内容 |
| footer | Modal 按钮操作区的内容 |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| open  | Modal 打开的回调 | — |
| close  | Modal 关闭的回调 | — |
| closed | Modal 关闭动画结束时的回调 | — |
