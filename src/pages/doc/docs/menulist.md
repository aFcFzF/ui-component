<style lang="less">
  .demo-box.demo-menu {
    .ui-menu-demo {
      padding-left: 55px;
    }

    h5 {
      font-size: 14px;
      color: #8492a6;
      margin-top: 10px;
    }
  }

  .demo-box {
    .list-container {
      background: #eee;
      padding: 10px;
    }
    .list {
        width: 260px;
        display: inline-block;
        ul.ui-menu,
        ul.ui-menu-ul {
          padding: 0;
        }
      }
  }
</style>

<script>
  export default {
    data() {
      return {
        menuData1: [
          {
            title: '首页',
            key: 'welcome',
            icon: 'ui-icon-home'
          },
          {
            title: '查询',
            key: 'search',
            icon: 'ui-icon-search'
          },
          {
            title: '收藏',
            key: 'favor',
            icon: 'ui-icon-star',
            count: 100,
            open: true,
            children: [
              {
                title: '收藏-1',
                key: 'favor2-1',
                count: 20,
              },
              {
                title: '收藏-2',
                key: 'favor2-2',
                children: [
                  {
                    title: '收藏-2-3',
                    key: 'favor2-3'
                  },
                  {
                    title: '收藏-2-4',
                    key: 'favor2-4'
                  }
                ]
              }
            ]
          },
          {
            title: '任务',
            icon: 'h-icon-task',
            key: 'task',
            children: [
              {
                title: '任务-1',
                icon: 'ui-icon-bell',
                key: 'task1-1'
              },
              {
                title: '任务-2',
                icon: 'ui-icon-home',
                key: 'task1-2'
              }
            ]
          }
        ],
        autoCollapse: true
      }
    },
    methods: {
      selHdl(data) {
        this.$Message.success(`当前选中 <br> key: ${data.key}<br/> title: ${data.title}`);
      },
      clkHdl() {
        const menu = this.$refs.blackMenu.select('favor2-4');
      }
    }
  }
</script>

## menuList 导航菜单

为网站提供导航功能的菜单。

### 侧边栏

适用广泛的基础用法。

:::demo 导航菜单默认为垂直模式，通过`mode`属性可以使导航菜单变更为水平模式。另外，在菜单中通过`submenu`组件可以生成二级菜单。Menu 还提供了`background-color`、`text-color`和`active-text-color`，分别用于设置菜单的背景色、菜单的文字颜色和当前激活菜单的文字颜色。

```html
<div class="list-container">
  <ui-switch v-model="autoCollapse">
      <span slot="before">赋值自动折叠</span>
  </ui-switch>
  <br>
  <br>
  <div>
    <ui-button class="ui-btn-primary ui-btn-xs" @click="clkHdl">选中"收藏2-4"</ui-button>
  </div>
  <div class="list">
    <p>黑色样式： </p>
    <ui-menu :datas="menuData1" @select="selHdl" ref="blackMenu" :auto-collapse-on-set="autoCollapse"></ui-menu>
  </div>
</div>

<script>
  export default {
    data() {
      return {
        menuData1: [
          {
            title: '首页',
            key: 'welcome',
            icon: 'ui-icon-home'
          },
          {
            title: '查询',
            key: 'search',
            icon: 'ui-icon-search'
          },
          {
            title: '收藏',
            key: 'favor',
            icon: 'ui-icon-star',
            count: 100,
            open: true,
            children: [
              {
                title: '收藏-1',
                key: 'favor2-1',
                count: 20,
              },
              {
                title: '收藏-2',
                key: 'favor3-2',
                children: [
                  {
                    title: '收藏-2-3',
                    key: 'favor2-3'
                  },
                  {
                    title: '收藏-2-4',
                    key: 'favor3-4'
                  }
                ]
              }
            ]
          },
          {
            title: '任务',
            icon: 'h-icon-task',
            key: 'task',
            children: [
              {
                title: '任务-1',
                icon: 'ui-icon-bell',
                key: 'task1-1'
              },
              {
                title: '任务-2',
                icon: 'ui-icon-home',
                key: 'task1-2'
              }
            ]
          }
        ]
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
```
:::

### 侧边栏

适用广泛的基础用法。

:::demo 导航菜单默认为垂直模式，通过`mode`属性可以使导航菜单变更为水平模式。另外，在菜单中通过`submenu`组件可以生成二级菜单。Menu 还提供了`background-color`、`text-color`和`active-text-color`，分别用于设置菜单的背景色、菜单的文字颜色和当前激活菜单的文字颜色。

```html
<div class="list-container">
  <div class="list">
    <p>白色样式： </p>
    <ui-menu :datas="menuData1" class-name="ui-menu-white"/>
  </div>
</div>
<script>
  export default {
    data() {
      return {
                menuData1: [
          {
            title: '首页',
            key: 'welcome',
            icon: 'ui-icon-home'
          },
          {
            title: '查询',
            key: 'search',
            icon: 'ui-icon-search'
          },
          {
            title: '收藏',
            key: 'favor',
            icon: 'ui-icon-star',
            count: 100,
            open: true,
            children: [
              {
                title: '收藏-1',
                key: 'favor2-1',
                count: 20,
              },
              {
                title: '收藏-2',
                key: 'favor3-2',
                children: [
                  {
                    title: '收藏-2-3',
                    key: 'favor2-3'
                  },
                  {
                    title: '收藏-2-4',
                    key: 'favor3-4'
                  }
                ]
              }
            ]
          },
          {
            title: '任务',
            icon: 'h-icon-task',
            key: 'task',
            children: [
              {
                title: '任务-1',
                icon: 'ui-icon-bell',
                key: 'task1-1'
              },
              {
                title: '任务-2',
                icon: 'ui-icon-home',
                key: 'task1-2'
              }
            ]
          }
        ]
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
```
:::


### Menu Attribute
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| mode     | 模式   | string  |   horizontal / vertical   | vertical |
| collapse  | 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）| boolean  |   —   | false |
| background-color  | 菜单的背景色（仅支持 hex 格式） | string |   —   | #ffffff |
| text-color  | 菜单的文字颜色（仅支持 hex 格式） | string |   —   | #303133 |
| active-text-color  | 当前激活菜单的文字颜色（仅支持 hex 格式） | string |   —   | #409EFF |
| default-active | 当前激活菜单的 index | string    | — | — |
| default-openeds | 当前打开的 sub-menu 的 index 的数组 | Array    | — | — |
| unique-opened  | 是否只保持一个子菜单的展开 | boolean   | — | false   |
| menu-trigger  | 子菜单打开的触发方式(只在 mode 为 horizontal 时有效) | string   | hover / click | hover |
| router  | 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 | boolean   | — | false   |
| collapse-transition  | 是否开启折叠动画 | boolean   | — | true   |

### Menu Methods
| 事件名称      | 说明    | 参数      |
|---------- |-------- |---------- |
| open  | 展开指定的 sub-menu | index: 需要打开的 sub-menu 的 index |
| close  | 收起指定的 sub-menu | index: 需要收起的 sub-menu 的 index |

### Menu Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| select  | 菜单激活回调 | index: 选中菜单项的 index, indexPath: 选中菜单项的 index path  |
| open  | sub-menu 展开的回调 | index: 打开的 sub-menu 的 index， indexPath: 打开的 sub-menu 的 index path  |
| close  | sub-menu 收起的回调 | index: 收起的 sub-menu 的 index， indexPath: 收起的 sub-menu 的 index path  |

### SubMenu Attribute
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| index     | 唯一标志   | string  | — | — |
| popper-class | 弹出菜单的自定义类名 | string | — | — |
| show-timeout | 展开 sub-menu 的延时 | number | — | 300 |
| hide-timeout | 收起 sub-menu 的延时 | number | — | 300 |
| disabled  | 是否禁用 | boolean | — | false |
| popper-append-to-body | 是否将弹出菜单插入至 body 元素。在菜单的定位出现问题时，可尝试修改该属性 | boolean | — | 一级子菜单：true / 非一级子菜单：false |

### Menu-Item Attribute
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| index     | 唯一标志   | string  | — | — |
| route     | Vue Router 路径对象 | Object | — | — |
| disabled  | 是否禁用 | boolean | — | false |

### Menu-Group Attribute
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title     | 分组标题   | string  | — | — |
