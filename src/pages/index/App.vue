<template>
    <div class="app">
        <ui-head></ui-head>
        <ui-main>
            <div class="content">
                <section class="row">
                    普通样式：
                    <ui-btn>默认按钮</ui-btn>
                    <ui-btn type="primary">主要按钮</ui-btn>
                    <ui-btn type="success">成功按钮</ui-btn>
                    <ui-btn type="info">信息按钮</ui-btn>
                    <ui-btn type="warning">警告按钮</ui-btn>
                    <ui-btn type="danger">危险按钮</ui-btn>
                </section>
                <section class="row">
                    简单样式：
                    <ui-btn plain >默认按钮</ui-btn>
                    <ui-btn type="primary" plain>主要按钮</ui-btn>
                    <ui-btn type="success" plain>成功按钮</ui-btn>
                    <ui-btn type="info" plain>信息按钮</ui-btn>
                    <ui-btn type="warning" plain>警告按钮</ui-btn>
                    <ui-btn type="danger" plain>危险按钮</ui-btn>
                </section>
                <section class="row">
                    圆角样式：
                    <ui-btn plain round>默认样式</ui-btn>
                    <ui-btn type="primary" plain round>主要按钮</ui-btn>
                    <ui-btn type="success" plain round>成功按钮</ui-btn>
                    <ui-btn type="info" plain round>信息按钮</ui-btn>
                    <ui-btn type="warning" plain round>警告按钮</ui-btn>
                    <ui-btn type="danger" plain round>危险按钮</ui-btn>
                </section>
                <section class="row">
                    圆形样式：
                    <ui-btn icon="el-icon-service" plain circle></ui-btn>
                    <ui-btn type="primary" icon="el-icon-search" plain circle></ui-btn>
                    <ui-btn type="success" icon="el-icon-check" plain circle></ui-btn>
                    <ui-btn type="info" icon="el-icon-message" plain circle></ui-btn>
                    <ui-btn type="warning" icon="el-icon-star-off" plain circle></ui-btn>
                    <ui-btn type="danger" icon="el-icon-delete" plain circle></ui-btn>
                </section>
                <section class="row">
                    文字样式：
                    <ui-btn type="text" icon="el-icon-search" >文字样式</ui-btn>
                    <ui-btn type="text" icon="el-icon-search" disabled>文字样式</ui-btn>
                </section>
                <section class="row">
                    大中小类型：
                    <ui-btn type="primary" plain :loading="true">正常大小</ui-btn>
                    <ui-btn type="primary" plain size="medium">中等大小</ui-btn>
                    <ui-btn type="primary" plain size="small">小型尺寸</ui-btn>
                    <ui-btn type="primary" plain size="mini">最小尺寸</ui-btn>
                </section>
                <section class="row">
                    图标按钮：
                    <ui-btn type="primary" icon="el-icon-search">搜索</ui-btn>
                    <ui-btn icon="el-icon-share"></ui-btn>
                    <!-- <ui-icon name="error"></ui-icon> -->
                </section>
                <section class="row">
                    图标按钮组：
                    <ui-btn-group>
                        <ui-btn @click="iclk">首项</ui-btn>
                        <ui-btn>中间项</ui-btn>
                        <ui-btn>中间项</ui-btn>
                        <ui-btn>末项</ui-btn>
                    </ui-btn-group>
                </section>
            </div>
        </ui-main>
        <ui-foot>京公网安备11000002000001号 互联网新闻信息服务许可 © 2018 百度  使用百度前必读</ui-foot>
    </div>
</template>

<script>
import Head from 'components/header/white/Header';
import Main from 'components/main/Index';
import Foot from 'components/footer/Footer';
import Btn from 'components/button';
import btnStyle from '@theme/lib/button.css';
import iconStyle from '@theme/lib/icon.css';
import Icon from 'components/icon';
import BtnGroup from 'components/button-group';

import 'assets/css/common.less';
export default {
	components: {
      // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
      // 否则挂载点和组件名字一致, 即vhead
      'ui-head': Head,
      'ui-main': Main,
      'ui-foot': Foot,
      'ui-btn': Btn,
      'ui-btn-group': BtnGroup,
      'ui-icon': Icon
    },
    methods: {
        iclk() {
            alert('谁敢杀我');
        }
    }
}
</script>

<style scoped lang="less">
    .content {
        padding: 20px;
        background-color: #fff;
        .row {
            padding: 10px;
        }
        .normal {
            &:active {
                background: #e10;
            }
        }
    }
</style>
