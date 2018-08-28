<script>
  export default {
    data() {
      return {
        steps: [
          '步骤1',
          '步骤2',
          '步骤3'
        ],
        steps1: [
          {key: 'a', title: '步骤1', icon: 'ui-icon-home', desc: '步骤1描述'},
          {key: 'b', title: '步骤2', icon: 'ui-icon-inbox', desc: '步骤2描述'},
          {key: 'c', title: '步骤3', icon: 'ui-icon-warn', desc: '步骤3描述'}
        ],
        step: 0,
        step1: 0,
        status: 'primary',
        statusOptions: ['primary', 'success', 'error', 'warn']
      };
    },
    methods: {
      next() {
        this.step < Object.keys(this.steps).length-1 && this.step++;
      },
      prev() {
        this.step > -1 && this.step--;
      },
      append() {
        this.steps.push('新步骤');
        this.steps1.push({
          key: 'e',
          title: '新步骤',
          icon: 'ui-icon-warn',
          desc: '新添加的描述'
        });
      },
      remove() {
        this.steps.pop();
        this.steps1.pop();
      }
    }
  }
</script>

<style lang="less">
  .ui-radio-group {
    .ui-radio {
      margin-right: 10px;
    }
  }
</style>

## Steps 步骤条
引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。

### 基础用法

简单的步骤条。

:::demo 设置`active`属性，接受一个`Number`，表明步骤的 index，从 0 开始。需要定宽的步骤条时，设置`space`属性即可，它接受`Boolean`，单位为`px`，如果不设置，则为自适应。设置`finish-status`属性可以改变已经完成的步骤的状态。
```html
当前进度： {{Object.entries(steps)[step] && Object.entries(steps)[step][1]}}
<br>
<ui-button-group>
  <ui-button style="margin-top: 12px;" class="ui-btn-xs ui-btn-primary" @click="prev">上一步</ui-button>
  <ui-button style="margin-top: 12px;" class="ui-btn-xs ui-btn-primary" @click="next">下一步</ui-button>
</ui-button-group>
<br>
<ui-button-group>
  <ui-button style="margin-top: 12px;" class="ui-btn-xs ui-btn-primary" @click="remove">减少</ui-button>
  <ui-button style="margin-top: 12px;" class="ui-btn-xs ui-btn-primary" @click="append">添加</ui-button>
</ui-button-group>
<br>
<br>
<div class="ui-radio-group">
  <ui-radio v-model="status" class="ui-radio-xs" v-for="(item, idx) of statusOptions" :key="item.key" :value="item">
    {{item}}
  </ui-radio>
</div>
<br>
<br>
<p>默认样式： </p>
<ui-steps :datas="steps" :step="step" :status="status"></ui-steps>
<br>
<br>
<p>图标样式：</p>
<ui-steps :datas="steps1" :step="step" :status="status"></ui-steps>


<script>
  export default {
    data() {
      return {
        steps: {
          a: '步骤1',
          b: '步骤2',
          c: '步骤3'
        },
        step: 0
      };
```
:::



### Steps Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| space | 每个 step 的间距，不填写将自适应间距。支持百分比。 | number / string | — | — |
| direction | 显示方向 | string | vertical/horizontal | horizontal |
| active | 设置当前激活步骤  | number | — | 0 |
| process-status | 设置当前步骤的状态 | string | wait / process / finish / error / success | process |
| finish-status | 设置结束步骤的状态 | string | wait / process / finish / error / success | finish |
| align-center | 进行居中对齐 | boolean | - | false |
| simple | 是否应用简洁风格 | boolean | - | false |

### Step Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title | 标题 | string | — | — |
| description | 描述性文字 | string | — | — |
| icon | 图标 | 传入 icon 的 class 全名来自定义 icon，也支持 slot 方式写入 | string | — |
| status | 设置当前步骤的状态，不设置则根据 steps 确定状态 | wait / process / finish / error / success | - |

### Step Slot
| name | 说明  |
|----|----|
| icon | 图标 |
| title | 标题 |
| description | 描述性文字 |
