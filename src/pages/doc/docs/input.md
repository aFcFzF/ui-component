<script>
  export default {
    data() {
      return {
        value: '',
        value2: '',
        value3: '',
        value4: 0,
        value5: '',
      }
    },
    methods: {
      emptyHdl() {
        this.value3 = '';
      },
      plus() {
        this.value4++;
      },
      minus() {
        this.value4--;
      }
    },
    computed: {
      serialLength() {
        return this.value5.replace(/-/g, '').length;
      }
    }
  }
</script>

<style lang="less">
  .close-input {
    cursor: pointer;
  }
  .ui-input-group {
    width: 200px;
  }
  .serial-number-tip {
    .ui-tooltip-inner {
      max-width: none;
      .user-ipt {
        word-wrap: break-word;
      }
      .ref-img {
        width: 300px;
      }
      .error {
        color: #F95D5D;
        font-weight: 700;
      }
      .success {
        color: #63CE81;
        font-weight: 700;
      }
    }
  }
</style>

## Input 输入框

通过鼠标或键盘输入字符

### 基础用法

:::demo
```html
<template>
  <div>
    <p>input value：{{value}}</p>
    <div>
      <input type="text" v-model="value"/>
    </div>
    <p>textarea value：{{value2}}</p>
    <div>
      <textarea v-model="value2"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      value3: ''
    };
  }
}
</script>
```
:::


### 禁用状态

:::demo 通过 `disabled` 属性指定是否禁用 input 组件
```html
<p>readonly： </p>
<div>
<input type="text" value="当前是只读状态" readonly/>
<textarea readonly>当前是只读状态</textarea>
</div>

<p>disabled: </p>
<div>
  <input type="text" value="当前是禁用状态" disabled/>
  <textarea disabled>当前是禁用状态</textarea>
</div>
<script>
export default {
  data() {
    return {
      input1: ''
    }
  }
}
</script>
```
:::

### 复合输入框

:::demo 结合icon即可得到一个可清空的输入框


```html
<p>带清空按钮的输入框</p>
<p>input value：{{value3}}</p>
<div class="ui-input ui-input-suffix-icon close-input">
  <input type="text" v-model="value3" placeholder="请输入内容">
  <i class="ui-icon-close" v-show="!!value3" @click="emptyHdl"/>
</div>
<p>带加减按钮的输入框</p>
<p>input value：{{value4}}</p>
<div class="ui-input-group">
  <input type="text" v-model="value4" placeholder="请输入内容" readonly>
  <ui-button-group class="ui-input-addon">
  <ui-button class="ui-input-addon ui-btn-xs ui-btn-no-border" @click="plus">
    <i class="ui-icon-plus"/>
  </ui-button>
  <ui-button class="ui-input-addon ui-btn-xs ui-btn-no-border" @click="minus">
    <i class="ui-icon-minus"/>
  </ui-button>
  </ui-button-group>
</div>
<p>带参考区域的输入框</p>
<p>input value：{{value5}}</p>
  <div>
    <ui-tooltip class-name="serial-number-tip" theme="white" placement="top-start">
      <div class="ui-input-group">
        <input type="text" v-model="value5" placeholder="请输入内容" :error="serialLength > 25">
      </div>
      <div slot="content">
        <p>序列号：</p>
        <img class="ref-img" src="../common/img/serialNumber.jpg">
        <p>要求格式：XXXXX-XXXXX-XXXXX-XXXXX-XXXXX</p>
        <p class="user-ipt">当前输入：{{value5}}</p>
        <p :class="serialLength > 25 ? 'error' : serialLength === 25 ? 'success' : ''">
          字符长度: {{serialLength}}/25
        </p>
      </div>
    </ui-tooltip>
  </div>

<script>
  export default {
    data() {
      return {
        input10: ''
      }
    }
  }
</script>
```
:::



### Input Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type         | 类型   | string  | text，textarea 和其他 [原生 input 的 type 值](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | text |
| value         | 绑定值           | string / number  | — | — |
| maxlength     | 原生属性，最大输入长度      | number          |  —  | — |
| minlength     | 原生属性，最小输入长度      | number          | — | — |
| placeholder   | 输入框占位文本    | string          | — | — |
| clearable     | 是否可清空        | boolean         | — | false |
| disabled      | 禁用            | boolean         | — | false   |
| size          | 输入框尺寸，只在 `type!="textarea"` 时有效      | string          | medium / small / mini  | — |
| prefix-icon   | 输入框头部图标    | string          | — | — |
| suffix-icon   | 输入框尾部图标    | string          | — | — |
| rows          | 输入框行数，只对 `type="textarea"` 有效  |  number | — |  2   |
| autosize      | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }  |  boolean / object | — |  false   |
| auto-complete | 原生属性，自动补全 | string | on, off | off |
| name | 原生属性 | string | — | — |
| readonly | 原生属性，是否只读 | boolean | — | false |
| max | 原生属性，设置最大值 | — | — | — |
| min | 原生属性，设置最小值 | — | — | — |
| step | 原生属性，设置输入字段的合法数字间隔 | — | — | — |
| resize | 控制是否能被用户缩放 | string | none, both, horizontal, vertical | — |
| autofocus | 原生属性，自动获取焦点 | boolean | true, false | false |
| form | 原生属性 | string | — | — |
| label | 输入框关联的label文字 | string | — | — |
| tabindex | 输入框的tabindex | string | - | - |

### Input Slots
| name | 说明 |
|------|--------|
| prefix | 输入框头部内容，只对 `type="text"` 有效 |
| suffix | 输入框尾部内容，只对 `type="text"` 有效 |
| prepend | 输入框前置内容，只对 `type="text"` 有效 |
| append | 输入框后置内容，只对 `type="text"` 有效 |

### Input Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| blur | 在 Input 失去焦点时触发 | (event: Event) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
| change | 在 Input 值改变时触发 | (value: string \| number) |
| clear | 在点击由 `clearable` 属性生成的清空按钮时触发 | — |

### Input Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | — |
| blur | 使 input 失去焦点 | — |
| select | 选中 input 中的文字 | — |

### Autocomplete Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| placeholder   | 输入框占位文本   | string          | — | — |
| disabled      | 禁用            | boolean         | — | false   |
| value-key | 输入建议对象中用于显示的键名 | string | — | value |
| value         | 必填值，输入绑定值   | string  | — | — |
| debounce      | 获取输入建议的去抖延时 | number         | — | 300 |
| placement     | 菜单弹出位置 | string         | top / top-start / top-end / bottom / bottom-start / bottom-end | bottom-start |
| fetch-suggestions | 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它  | Function(queryString, callback)  | — | — |
| popper-class | Autocomplete 下拉列表的类名 | string | — | — |
| trigger-on-focus | 是否在输入框 focus 时显示建议列表 | boolean | — | true |
| name | 原生属性 | string | — | — |
| select-when-unmatched | 在输入没有任何匹配建议的情况下，按下回车是否触发 `select` 事件 | boolean | — | false |
| label | 输入框关联的label文字 | string | — | — |
| prefix-icon | 输入框头部图标 | string | — | — |
| suffix-icon | 输入框尾部图标 | string | — | — |
| hide-loading | 是否隐藏远程加载时的加载图标 | boolean | — | false |
| popper-append-to-body | 是否将下拉列表插入至 body 元素。在下拉列表的定位出现问题时，可将该属性设置为 false | boolean | - | true |

### Autocomplete Slots
| name | 说明 |
|------|--------|
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |
| prepend | 输入框前置内容 |
| append | 输入框后置内容 |

### Autocomplete Scoped Slot
| name | 说明 |
|------|--------|
| — | 自定义输入建议，参数为 { item } |

### Autocomplete Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| select | 点击选中建议项时触发 | 选中建议项 |

### Autocomplete Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | - |
