<style lang="less">
  .demo-form {
    .ui-select .ui-input {
      width: 380px;
    }
    .ui-form {
      width: 460px;
      .ui-form-item {
          padding-bottom: 35px;
      }
    }

    .line {
      text-align: center;
    }

    .ui-checkbox-group {
      width: 320px;
      margin: 0;
      padding: 0;
      list-style: none;

      &:after, &:before {
        content: ' ';
        display: table;
      }
      &:after {
        clear: both;
        visibility: hidden;
        font-size: 0;
        height: 0;
      }

      .ui-checkbox {
        float: left;
        width: 160px;
        padding-right: 20px;
        margin: 0;
        padding: 0;

        + .ui-checkbox {
          margin-left: 0;
        }
      }
    }

    .ui-radio-group {
        display: inline-block;
        vertical-align: middle;
        .ui-radio {
            margin-right: 10px;
        }
    }
    .demo-form-normal {
      width: 460px;
    }
    .demo-form-inline {
      width: auto;

      .ui-input {
        width: 150px;
      }
      > * {
        margin-right: 10px;
      }
    }
    .demo-ruleForm {
      width: 460px;

      .ui-select .ui-input {
        width: 360px;
      }
    }
    .demo-dynamic {
      .ui-input {
        margin-right: 10px;
        width: 270px;
        vertical-align: top;
      }
    }
    .fr {
      float: right;
    }

    .base-form {
        .ui-checkbox-group {
            .ui-checkbox {
                width: 80px;
            }
        }
    }
    .wdt-slider {
        display: inline-block;
        vertical-align: middle;
        margin-left: 30px;
        .label-wdt {
            display: inline-block;
            width: 200px;
            vertical-align: middle;
        }
    }
  }
</style>
<script>
export default {
    data() {
        return {
            isLoading: false,
            labelPosition: 'left',
            labels: {
                left: 'Label左对齐',
                right: 'Label右对齐',
            },
            expireOpt: [
                {label: '提醒', value: true},
                {label: '不提醒', value: false}
            ],
            peopleOpt: [30, 60, 90, '未确定'],
            placeOpt: ['报告厅', '会议室', '教室一', '教室二', '多媒体教室'],
            submitLoading: false,
            labelWdt: 100,
            tmpVal: 0,
            data: {
                name: '',
                date: '',
                place: '',
                expire: false,
                devices: [
                    {label: '投影仪', value: true},
                    {label: '遥控', value: true},
                    {label: '话筒', value: true},
                    {label: '音响', value: true},
                    {label: '饮用水', value: false},
                    {label: '资料', value: false},
                    {label: '文具', value: false},
                    {label: '纪念品', value: false}
                ],
                people: 0,
                remark: ''
            },
            validateRules: {
                rules: {
                    remark: {
                        maxLen: 10,
                        minLen: 5,
                        required: true,
                        // valid: {
                        //     pattern: /^[0-9]+$/,
                        //     message: '必须是中文'
                        // }
                        valid(value, allData) {
                            return '不ok';
                        }
                    }
                }
            }
        }
    },
    methods: {
        submit() {
            this.submitLoading = true;
            setTimeout(e => {
                this.submitLoading = false;
            }, 2000);
        },
        show() {
            return `标签宽度：${this.labelWdt}px`;
        }
    },
    watch: {
        tmpVal(n){
            this.labelWdt = n * .6 + 100;
        }
    }
}
</script>

## Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

### 典型表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

:::demo 在 Form 组件中，每一个表单域由一个 Form-Item 组件构成，表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker
```html
<div class="ui-radio-group">
    <ui-radio
        class="ui-radio-border ui-radio-s"
        v-for="(value, key) of labels"
        :key="key"
        v-model="labelPosition"
        :value="key"
    >
    {{value}}
    </ui-radio>
</div>
<div class="wdt-slider">
    <span>label宽度： </span><ui-slider class="label-wdt" v-model="tmpVal" :show="show"></ui-slider>
</div>
<br>
<br>
<ui-form class="base-form" :label-position="labelPosition" :model="data" :rules="validateRules" :label-width="labelWdt">
    <ui-form-item label="会议名称" prop="name" :required="true">
        <input type="text" v-model="data.name">
    </ui-form-item>
    <ui-form-item label="会议日期" prop="time" :required="true">
        <ui-date-picker v-model="data.time"/>
    </ui-form-item>
    <ui-form-item label="会议地点" prop="place" :required="true">
        <ui-select v-model="data.place" :datas="placeOpt"></ui-select>
    </ui-form-item>
    <ui-form-item label="过期提醒" prop="expire" :required="true">
        <div class="ui-radio-group">
            <ui-radio
            v-model="data.expire"
            v-for="(item, key) of expireOpt"
            :key="item.label"
            :value="item.value"
            >{{item.label}}</ui-radio>
        </div>
    </ui-form-item>
        <ui-form-item label="设备预约" prop="devices" :required="true">
        <div class="ui-checkbox-group">
            <ui-checkbox
                v-for="(item, idx) of data.devices"
                v-model="item.value"
                :key="item.label"
            >{{item.label}}</ui-checkbox>
        </div>
    </ui-form-item>
    <ui-form-item label="参会人数" prop="people" :required="true">
        <ui-select v-model="data.people" :datas="peopleOpt"></ui-select>
    </ui-form-item>
    <ui-form-item label="备注" prop="remark">
        <textarea v-model="data.remark"></textarea>
    </ui-form-item>
    <ui-form-item>
        <ui-button class="ui-btn-primary" @click="submit" :loading="submitLoading">提交</ui-button>
        <ui-button class="ui-btn-text-red">取消</ui-button>
    </ui-form-item>
</ui-form>
<p>值： {{data}}</p>
<script>

</script>
```
:::

:::tip
W3C 标准中有如下[规定](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2)：
> <i>When there is only one single-line text input field in a form, the user agent should accept Enter in that field as a request to submit the form.</i>

即：当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 `<ui-form>` 标签上添加 `@submit.native.prevent`。
:::

### Form Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| model   | 表单数据对象 | object      |                  —                |  — |
| rules    | 表单验证规则 | object | — | — |
| inline    | 行内表单模式 | boolean | — | false |
| labui-position | 表单域标签的位置 | string |  right/left/top            | right |
| labui-width | 表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值 | string | — | — |
| labui-suffix | 表单域标签的后缀 | string | — | — |
| show-message  | 是否显示校验错误信息 | boolean | — | true |
| inline-message  | 是否以行内形式展示校验信息 | boolean | — | false |
| status-icon  | 是否在输入框中显示校验结果反馈图标 | boolean | — | false |
| validate-on-rule-change  | 是否在 `rules` 属性改变后立即触发一次验证 | boolean | — | true |
| size  | 用于控制该表单内组件的尺寸 | string | medium / small / mini | — |
| disabled | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效 | boolean | — | false |

### Form Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| validate | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object))
| validateField | 对部分表单字段进行校验的方法 | Function(prop: string, callback: Function(errorMessage: string))
| resetFields | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | —
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性组成的数组，如不传则移除整个表单的校验结果 | Function(props: array)

### Form Events
| 事件名称 | 说明    | 回调参数  |
|--------- |-------- |---------- |
| validate | 任一表单项被校验后触发 | 被校验的表单项 prop 值，校验是否通过 |

### Form-Item Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| prop    | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string    | 传入 Form 组件的 `model` 中的字段 | — |
| label | 标签文本 | string | — | — |
| labui-width | 表单域标签的的宽度，例如 '50px' | string |       —       | — |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean | — | false |
| rules    | 表单验证规则 | object | — | — |
| error    | 表单域验证错误信息, 设置该值会使表单验证状态变为`error`，并显示该错误信息 | string | — | — |
| show-message  | 是否显示校验错误信息 | boolean | — | true |
| inline-message  | 以行内形式展示校验信息 | boolean | — | false |
| size  | 用于控制该表单域下组件的尺寸 | string | medium / small / mini | - |

### Form-Item Slot
| name | 说明 |
|------|--------|
| — | Form Item 的内容 |
| label | 标签文本的内容 |

### Form-Item Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| resetField | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | -
| clearValidate | 移除该表单项的校验结果 | -
