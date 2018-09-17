## 自定义主题
Tiny 默认提供一套主题，CSS 命名采用 BEM 的风格，方便使用者覆盖样式。我们提供了三种方法，可以进行不同程度的样式自定义。

### 仅替换主题色
如果仅希望更换 Tiny 的主题色，推荐使用[在线主题生成工具](/doc.html#/demos/page02)。Tiny 默认的主题色是鲜艳、友好的蓝色。通过替换主题色，能够让 Tiny 的视觉更加符合具体项目的定位。

使用上述工具，可以很方便地实时预览主题色改变之后的视觉，同时它还可以基于新的主题色生成完整的样式文件包，供直接下载使用（关于如何使用下载的主题包，请参考本节「引入自定义主题」和「搭配插件按需引入组件主题」部分）。

### 在项目中改变 LESS 变量
Tiny 的样式使用less编写，如果你的项目也使用了 LESS，那么可以直接在项目中改变 Tiny 的样式变量。新建一个样式文件，例如 `var.less`，写入以下内容：
```html
/* 改变主题色变量 */
@color-primary: #ee1100;

/* 改变边框圆角 */
@border-radius: 3px;
```

之后，在项目的入口文件中，直接引入以上样式文件即可（无需引入 Tiny 编译好的 CSS 文件）：
```JS
import Vue from 'vue'
import Tiny from 'tiny-ui'
import './var.less'

Vue.use(Tiny)
```

:::tip
需要注意的是，覆盖字体路径变量是必需的，将其赋值为 Tiny 中 icon 图标所在的相对路径即可。
:::

如果使用默认配置，执行后当前目录会有一个 `var.less` 文件。内部包含了主题所用到的所有变量，它们使用 LESS 的格式定义。大致结构如下：
```less
// Color
@primary-color : #457EFF; // 主要颜色 / 状态中
@info-color : #8a95af; // 主要颜色 / 状态中
@link-color : @primary-color;
@green-color : #63CE81; // 正确/通过
@yellow-color : #F8CF68; // 提示/中间状态
@red-color : #F95D5D; // 错误/警告


@importance-color: #333; // 主要颜色
@secondary-color: #666; // 次要信息
@describe-color: #9d9d9d; // 一般信息
@weakest-color: #c7c7c7; // 最浅色

@split-color: #eee; // 分割线/输入框
@fill-color: #f9f9f9; // 强调填充/不可输入
@white-color: #fff; // 默认白色

...
```
