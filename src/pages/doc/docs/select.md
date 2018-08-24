<script>
  import {event as evt} from '@/common/util';
  export default {
    data() {
      return {
        list: null,
        options: [{
          value: '选项0',
          label: '食品',
          isTag: true
        }, {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        },{
          label: '饮品',
          isTag: true
        },{
          label: '香槟',
          value: '选项6'
        }, {
          label: 'cola',
          value: '选项7'
        }],
        options2: [{
          value: '选项1',
          label: '黄金糕',
          disabled: true
        }, {
          value: '选项2',
          label: '双皮奶',
          disabled: false
        }, {
          value: '选项3',
          label: '蚵仔煎',
          disabled: false
        }, {
          value: '选项4',
          label: '龙须面',
          disabled: false
        }, {
          value: '选项5',
          label: '北京烤鸭',
          disabled: false
        }],
        status: false,
        options3: [{
          label: '热门城市',
          options: [{
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Beijing',
            label: '北京'
          }]
        }, {
          label: '城市名',
          options: [{
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }, {
            value: 'Dalian',
            label: '大连'
          }]
        }],
        options4: [],
        options5: [{
          label: 'HTML'
        }, {
          label: 'CSS'
        }, {
          label: 'JavaScript'
        }],
        cities: ['北京', '上海', '南京', '成都', '深圳', '广州'],
        citiesLimit: ['北京', '上海', '南京', '成都', '深圳', '广州'],
        valueLimit: [],
        value: '',
        value2: '',
        value3: '',
        value4: '',
        value5: [],
        value6: '',
        value7: '',
        value8: '',
        value9: '',
        value10: [],
        value11: [],
        searchCities: [
            '[辽宁]沈阳市',
            '[辽宁]葫芦岛市',
            '[辽宁]大连市',
            '[辽宁]盘锦市',
            '[辽宁]鞍山市',
            '[山西]太原市',
            '[山西]大同市',
            '[山西]阳泉市',
            '[山西]长治市',
            '[山西]临汾市',
            '[山西]晋中市',
            '[山西]运城市',
        ].sort(_ => Math.random() - .5),
        msg: '',
        searchValue: [],
        loading: false,
        states: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
      };
    },

    mounted() {
      this.list = this.states.map(item => { return { value: item, label: item }; });
      evt.$on('exceedLimit', d => {
        const msg = '限制最多选: ' + d.limit + '个';
        this.$Message.error(msg);
        this.msg = msg;
        setTimeout(_ => this.msg = '', 3000);
      })
    },

    methods: {
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
          }, 200);
        } else {
          this.options4 = [];
        }
      }
    },
    watch: {
      status(n) {
        this.options2.forEach(e => e.disabled = n);
      }
    }
  };
</script>

<style>
  .demo-select .ui-select-wdt {
    width: 240px;
    display: inline-block;
    margin-right: 20px;
  }
</style>

## Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

### 基础用法

适用广泛的基础单选
:::demo `v-model`的值为当前被选中的`el-option`的 value 属性值
```html
<template>
  <p>选中值： {{value}}</p>
  <span>默认边框： </span>
  <ui-select v-model="value" placeholder="请选择菜品" :datas="options" class="ui-select-wdt"></ui-select>
  <span style="vertical-align: middle;">无边框： </span>
  <ui-select v-model="value" :datas="options" no-border style="width: 120px; vertical-align: middle"></ui-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    }
  }
</script>
```
:::

### 有禁用选项

:::demo 在`el-option`中，设定`disabled`值为 true，即可禁用该选项
```html
<template>
  <p>是否禁用所有选项： {{status ? '是' : '否'}}</p>
  <ui-select v-model="value2" placeholder="请选择" :datas="options2" autosize class="ui-select-wdt"></ui-select>
  <ui-switch v-model="status" style="margin-left: 10px;"><span slot="before">禁用所有选项</span></ui-switch>
</template>

<script>
  export default {
    data() {
      return {
        options2: [{
          value: '选项1',
          label: '黄金糕',
          disabled: true
        }, {
          value: '选项2',
          label: '双皮奶',
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        status: false,
        value2: ''
      }
    },
    watch: {
      status(n) {
        this.options2.forEach(e => e.disabled = n);
      }
    }
  }
</script>
```
:::

### 禁用状态

选择器不可用状态

:::demo 为`ui-select`设置`disabled`属性，则整个选择器不可用
```html
<template>
  <ui-select v-model="value3" disabled :datas="options2" class="ui-select-wdt">
  </ui-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value3: ''
      }
    }
  }
</script>
```
:::

### 基础多选

适用性较广的基础多选，用 Tag 展示已选项

:::demo 为`ui-select`设置`multiple`属性即可启用多选，此时`v-model`的值为当前选中值所组成的数组。默认情况下选中值会以 Tag 的形式展现，你也可以设置`collapse-tags`属性将它们合并为一段文字。
```html
<template>
  <p>值是： {{value3}}</p>
  <ui-select v-model="value3" :datas="cities" class="ui-select-wdt" multiple></ui-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value5: [],
        value11: []
      }
    }
  }
</script>
```
:::

### 限制多选个数

限制多选个数，回调函数exceedLimit,回调参数`{limit: 3}`

:::demo 将自定义的 HTML 模板插入`el-option`的 slot 中即可。
```html
<template>
  <p>值是： {{valueLimit}}</p>
  <ui-select v-model="valueLimit" :datas="citiesLimit" class="ui-select-wdt" multiple :limit="3"></ui-select>
  <span
    :style="{
      visiblity: msg ? 'visible' : 'hidden',
      color: '#F95D5D'
    }"
  >{{msg}}</span>
</template>

<script>
  export default {
    data() {
      return {
        citiesLimit: ['北京', '上海', '南京', '成都', '深圳', '广州'],
        value3: ''
      }
    },
    mounted() {
      this.list = this.states.map(item => { return { value: item, label: item }; });
      evt.$on('exceedLimit', d => {
        const msg = '限制最多选: ' + d.limit + '个';
        this.$Message.error(msg);
        this.msg = msg;
        setTimeout(_ => this.msg = '', 3000);
      })
    }
  }
</script>
```
:::

### 可搜索

可以利用搜索功能快速查找选项

:::demo 为`ui-select`添加`filterable`属性即可启用搜索功能。默认情况下，Select 会找出所有`label`属性包含输入值的选项。如果希望使用其他的搜索逻辑，可以通过传入一个`filter-method`来实现。`filter-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。
```html
<template>
  <p>值是： {{searchValue}}</p>
  <ui-select v-model="searchValue" :datas="searchCities" filterable placeholder="请选择" class="ui-select-wdt">
  </ui-select>
</template>

<script>
  export default {
    data() {
      return {
        searchCities: [
          '[辽宁]沈阳市',
          '[辽宁]葫芦岛市',
          '[辽宁]大连市',
          '[山西]太原市',
          '[山西]大同市',
          '[山西]阳泉市',
          '[山西]长治市'
           ].sort(_ => Math.random() - .5),
        searchValue: '',
      }
    }
  }
</script>
```
:::

### 自定义模板

可以自定义备选项

:::demo 将自定义的 HTML 模板插入`el-option`的 slot 中即可。
```html
<template>
  <p>值是： {{value11}}</p>
  <ui-select v-model="value11" :datas="options2" placeholder="请选择" class="ui-select-wdt">
    <template slot-scope="props" slot="item">
      <div>标题：{{props.item.label}}
          <span style="float:right" class='gray1-color'>{{'0' + props.item.value.charAt(props.item.value.length-1)}}</span>
      </div>
      <div class='gray1-color'>描述：{{props.item.value}}</div>
    </template>
  </ui-select>
</template>

<script>
  export default {
    data() {
      return {
        cities: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Nanjing',
          label: '南京'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }],
        value6: ''
      }
    }
  }
</script>
```
:::

<br>
<br>

:::tip
如果 Select 的绑定值为对象类型，请务必指定 `value-key` 作为它的唯一性标识。
:::

### Select Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| multiple | 是否多选 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| value-key | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | string | — | value |
| size | 输入框尺寸 | string | medium/small/mini | — |
| clearable | 单选时是否可以清空选项 | boolean | — | false |
| collapse-tags | 多选时是否将选中值按文字的形式展示 | boolean | — | false |
| multiple-limit | 多选时用户最多可以选择的项目数，为 0 则不限制 | number | — | 0 |
| name | select input 的 name 属性 | string | — | — |
| auto-complete | select input 的 autocomplete 属性 | string | — | off |
| placeholder | 占位符 | string | — | 请选择 |
| filterable | 是否可搜索 | boolean | — | false |
| allow-create | 是否允许用户创建新条目，需配合 `filterable` 使用 | boolean | — | false |
| filter-method | 自定义搜索方法 | function | — | — |
| remote | 是否为远程搜索 | boolean | — | false |
| remote-method | 远程搜索方法 | function | — | — |
| loading | 是否正在从远程获取数据 | boolean | — | false |
| loading-text | 远程加载时显示的文字 | string | — | 加载中 |
| no-match-text | 搜索条件无匹配时显示的文字 | string | — | 无匹配数据 |
| no-data-text | 选项为空时显示的文字 | string | — | 无数据 |
| popper-class | Select 下拉框的类名 | string | — | — |
| reserve-keyword | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | boolean | — | false |
| default-first-option | 在输入框按下回车，选择第一个匹配项。需配合 `filterable` 或 `remote` 使用 | boolean | - | false |
| popper-append-to-body | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false | boolean | - | true |
| automatic-dropdown | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单 | boolean | - | false |

### Select Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change | 选中值发生变化时触发 | 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| remove-tag | 多选模式下移除tag时触发 | 移除的tag值 |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | — |
| blur | 当 input 失去焦点时触发 | (event: Event) |
| focus | 当 input 获得焦点时触发 | (event: Event) |

### Select Slots
|   name  | 说明     |
|---------|---------|
|    —    | Option 组件列表 |
| prefix  | Select 组件头部内容 |

### Option Group Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 分组的组名 | string | — | — |
| disabled | 是否将该分组下所有选项置为禁用 | boolean | — | false |

### Option Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 选项的值 | string/number/object | — | — |
| label | 选项的标签，若不设置则默认与 `value` 相同 | string/number | — | — |
| disabled | 是否禁用该选项 | boolean | — | false |

### Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | - |
| blur | 使 input 失去焦点，并隐藏下拉框 | - |