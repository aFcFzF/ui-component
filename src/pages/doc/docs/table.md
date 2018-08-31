<script>
  export default {
    data() {
      return {
        columns: [
          { title: 'Index', prop: '$index', width: 100 },
          { title: 'ID', prop: 'id', width: 100, sort: 'auto' },
          { title: 'Name', prop: 'name', sort: 'auto' },
          { title: 'Age', prop: 'age', sort: 'auto' },
          { title: 'Address', prop: 'address' }
        ],
        datas: [
          { id: 5, name: '测试5', age: 9, address: "上海" },
          { id: 6, name: '测试6', age: 8, address: "上海" },
          { id: 7, name: '测试7', age: 14, address: "上海" },
          { id: 5, name: '测试5', age: 17, address: "上海" },
          { id: 6, name: '测试6', age: 18, address: "上海" },
          { id: 7, name: '测试7', age: 12, address: "上海" }
        ],
        datas1: [
          { id: 5, name: '测试5', count: 12, address: "教室1" },
          { id: 6, name: '测试6', count: 12, address: "教室2" },
          { id: 7, name: '测试7', count: 12, address: "教室3" },
          { id: 5, name: '测试5', count: 12, address: "教室4" },
          { id: 6, name: '测试6', count: 12, address: "教室5" },
          { id: 7, name: '测试7', count: 12, address: "教室6" }
        ]
      };
    },

    methods: {
      deleteHdl(idx) {
        this.datas1.splice(idx, 1);
      },
      appendHdl() {
        this.datas1.push({
          id: 8,
          name: '新增一条',
          count: 30,
          address: '教室-新'
        });
      }
    }
  };
</script>

<style lang="less">
  .ui-table .warning-row {
    background: oldlace;
  }

  .ui-table .success-row {
    background: #f0f9eb;
  }

  .demo-table .name-wrapper {
    display: inline-block;
  }

  .demo-table .demo-table-expand {
    label {
      width: 90px;
      color: #99a9bf;
    }
    .ui-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }

  .ui-table {
    table {
      margin-bottom: auto;
    }
  }
</style>

## Table 表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

### 基础表格

基础的表格展示用法。

:::demo 当`ui-table`元素中注入`data`对象数组后，在`ui-table-column`中用`prop`属性来对应对象中的键名即可填入数据，用`label`属性来定义表格的列名。可以使用`width`属性来定义列宽。
```html
  <template>
    <ui-table :datas="datas" :columns="columns">

    </ui-table>
  </template>

  <script>
    export default {
      data() {}
    }
  </script>
```
:::

### ui-table-item

基础的表格展示用法。

:::demo 当`ui-table`元素中注入`data`对象数组后，在`ui-table-column`中用`prop`属性来对应对象中的键名即可填入数据，用`label`属性来定义表格的列名。可以使用`width`属性来定义列宽。
```html
  <template>
    <p>
      <ui-button class="ui-btn-primary ui-btn-s" @click="appendHdl">
        添加一行
        <i class="ui-icon-plus" />
      </ui-button>
    </p>
    <ui-table :datas="datas1" stripe>
      <ui-table-item title="索引值">
        <template slot-scope="props">
          {{props.index}}
        </template>
      </ui-table-item>
      <ui-table-item title="名称" prop="name"></ui-table-item>
      <ui-table-item title="人数" prop="count"></ui-table-item>
      <ui-table-item title="地址" prop="address" align="center">
      </ui-table-item>
      <ui-table-item title="操作" :width="200" align="center">
        <template slot-scope="props">
          <ui-poptip
            content="确认删除本条？"
            @confirm="deleteHdl(props.index)"
          >
            <ui-button class="ui-btn-red ui-btn-xs">
              删除 <i class="ui-icon-delete" />
            </ui-button>
          </ui-poptip>
        </template>
      </ui-table-item>
      <div slot="empty">暂无数据</div>
    </ui-table>
  </template>

  <script>
    export default {
      data() {}
    }
  </script>
```
:::

### Table Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
|columns|定义table的column|Array|[-]|[]|
|datas|列表展示需要的数据|Array|[-]|[]|
|height|Table固定的高度|Number|-|
|stripe|栅格背景|Boolean|false|

### Column 参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
prop|按照数据的某个字段渲染数据|String|-|
align|table中的标题对齐方式|String|left,right,center|left|
placement|table中的标题使用提示框的提醒位置|String|-|

