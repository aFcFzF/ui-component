## 快速上手

本节将介绍如何在项目中使用 该组件。

### 使用 vue-cli@3

我们为新版的 vue-cli 准备了相应的 [tiny-ui 插件](https://github.com/afcfzf/ui-component)，你可以用它们快速地搭建一个基于 mvvm 的表单项目。


### 引入 tiny-ui

tiny-ui必须使用完全引入的方式导入组件(按需引入正在开发中)。

#### 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import TinyUI from 'tiny-ui';
import 'tiny-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(TinyUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

以上代码便完成了 Tiny 的引入。需要注意的是，样式文件需要单独引入。

#### 按需引入

借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```bash
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：

```json
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "tiny-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import {uiButton, uiSelect} from 'tiny-ui';
import App from './App.vue';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

完整组件列表和引入方式

```javascript
import Vue from 'vue';
import components, {
    Badge,
    Button,
    ButtonGroup,
    Checkbox,
    ColorPicker,
    uiCircle,
    DatePicker,
    DateRangePicker,
    Form,
    FormItem,
    FormItemList,
    Menu,
    MenuItem,
    Modal,
    ModalComponent,
    Poptip,
    Progress,
    Radio,
    RadioGroup,
    Rate,
    Row,
    Scrollbar,
    Select,
    Slider,
    Steps,
    uiSwitch: Switch,
    Col,
    Loading,
    Table,
    TableItem,
    Tabs,
    Tooltip,
    Uploader
} from 'tiny-ui';

const install = function (Vue, opts) {
    if (install.installed) {
        return;
    }

    Object.entries(components).forEach(([k, v]) => {
        Vue.component(k, v);
        k.indexOf('ui') === -1 && Vue.component(`ui${k}`, v);
    });

    Object.entries(prototypes).forEach(([k, v]) => Vue.prototype[k] = v);

    Vue.prototype.$Modal = $Modal(Vue);
    Vue.prototype.$Notice = $Notice(Vue);
};

typeof window !== 'undefined' && window.Vue && install(window.Vue);

export default Object.assign(components, {install});
```

### 全局配置

完整引入 Tiny：

```js
import Vue from 'vue';
import Tiny from 'tiny-ui';
Vue.use(Tiny);
```

按需引入 Tiny：

```js
import Vue from 'vue';
import { Button } from 'tiny-ui';

Vue.use(Button);
```

### 开始使用

至此，一个基于 Vue 和 Tiny 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。


