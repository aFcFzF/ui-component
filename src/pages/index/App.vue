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
                <hr>
                <section class="row">
                    radio-值为-{{radio}}：
                    <ui-radio v-model="radio" label="1">选项1</ui-radio>
                    <ui-radio v-model="radio" label="2">选项2</ui-radio>
                    <ui-radio v-model="radio" label="3">选项3</ui-radio>
                </section>
                <section class="row">
                    [禁用]radio：
                    <ui-radio name="disable" v-model="radioDisable" label="1" disabled>选项1</ui-radio>
                    <ui-radio name="disable" v-model="radioDisable" label="2" disabled>选项2</ui-radio>
                    <ui-radio name="disable" v-model="radioDisable" label="3" disabled>选项3</ui-radio>
                </section>
                <section class="row">
                    [边框]radio：
                    <ui-radio v-model="radio" label="1" border>选项1</ui-radio>
                    <ui-radio v-model="radio" label="2" border size="medium">选项1</ui-radio>
                    <ui-radio v-model="radio" label="3" border size="small">选项2</ui-radio>
                    <ui-radio v-model="radio" label="4" border size="mini">选项3</ui-radio>
                </section>
                <section class="row">
                    [按钮]radio：
                    <ui-radio-button v-model="radio" label="1" name="abc" activeStyle="color: #e10; background: #eee">选项2</ui-radio-button><!--
                --><ui-radio-button v-model="radio" label="2" name="abc">选项3</ui-radio-button><!--
                --><ui-radio-button v-model="radio" label="3" name="abc">选项4</ui-radio-button><!--
                --><ui-radio-button v-model="radio" label="4" name="abc">选项5</ui-radio-button>
                </section>
                <hr>
                <section class="row">
                    checkbox：
                    <ui-checkbox v-for="item in checkboxOptions" :key="item" :checkedItem="checkedItem" :label="item" @change="checkChange"></ui-checkbox>
                </section>
                <section class="row">
                    [边框]checkbox：
                    <ui-checkbox v-for="(item, idx) in checkboxOptions" :key="item" :checkedItem="checkedItem" :label="item" @change="checkChange" border :disabled="idx === 2"></ui-checkbox>
                </section>
                <section class="row">
                    [大小]checkbox：
                    <ui-checkbox :checkedItem="checkedItem" label="选框-最小" @change="checkChange" size="mini" border/>
                    <ui-checkbox :checkedItem="checkedItem" label="选框-小" @change="checkChange" size="small" border/>
                    <ui-checkbox :checkedItem="checkedItem" label="选框-中等" @change="checkChange" size="medium" border/>
                    <ui-checkbox :checkedItem="checkedItem" label="选框-正常" @change="checkChange" border />
                </section>
                <section class="row">
                    [按钮]checkbox：
                    <ui-checkbox-button v-for="(item, idx) in checkboxOptions" :key="item" :checkedItem="checkedItem" :label="item" @change="checkChange" border :disabled="idx === 2"></ui-checkbox-button>
                </section>
                <hr>
                <section class="row">
                    <div style="width: 400px; height: 30px; line-height: 30px; padding: 0 30px; overflow: hidden"><span style="vertical-align: middle;margin-right: 10px;">值为：{{val01}}</span><ui-slider class="abcdef" style="width: 300px; float: right;" disabled v-model="val01"></ui-slider></div>
                    <div style="width: 400px; height: 30px; line-height: 30px; padding: 0 30px; overflow: hidden"><span style="vertical-align: middle;margin-right: 10px;">值为：{{val02}}</span><ui-slider class="abcdef" style="width: 300px; float: right;" v-model="val02" @change="changeHandler"></ui-slider></div>
                </section>
            </div>
        </ui-main>
        <ui-foot>京公网安备11000002000001号 互联网新闻信息服务许可 © 2018 百度  使用百度前必读</ui-foot>
    </div>
</template>

<script>
import 'assets/css/common.less';

import Head from 'components/header/white/Header';
import Main from 'components/main/Index';
import Foot from 'components/footer/Footer';
import Btn from 'components/button';
import btnStyle from '@theme/lib/button.css';
import iconStyle from '@theme/lib/icon.css';
import Icon from 'components/icon';
import BtnGroup from 'components/button-group';

// 这里是radio
import radioSyl from '@theme/lib/radio.css';
import Radio from 'components/radio';

// radio-button
import RadioBtnSyl from '@theme/lib/radio-button.css';
import RadioBtn from 'components/radio-button';

// checkbox

import CheckboxSyl from '@theme/lib/checkbox.css';
import Checkbox from 'components/checkbox';

// checkbox-button

import CheckboxBtnSyl from '@theme/lib/checkbox-button.css';
import CheckboxBtn from 'components/checkbox-button';

// slider
import SliderSyl from '@theme/lib/slider.css';
import Slider from 'components/slider';

export default {
    data() {
        return {
            radio: '1',
            radioDisable: '1',
            radioBtn: '1',
            checkboxOptions: ['上海', '北京', '广州', '西安'],
            checkedItem: ['上海', '北京'],
            val01: 10,
            val02: 30
        }
    },
	components: {
      // 可以以key-value的形式注册组件, 此时挂载点的名字就是key
      // 否则挂载点和组件名字一致, 即vhead
      'ui-head': Head,
      'ui-main': Main,
      'ui-foot': Foot,
      'ui-btn': Btn,
      'ui-btn-group': BtnGroup,
      'ui-icon': Icon,
      'ui-radio': Radio,
      'ui-radio-button': RadioBtn,
      'ui-checkbox': Checkbox,
      'ui-checkbox-button': CheckboxBtn,
      'ui-slider': Slider
    },
    methods: {
        iclk() {
            alert('谁敢杀我');
        },
        radioClk(lbl) {
            this.radio = lbl;
        },
        checkChange(name, value) {
            if (this.checkboxOptions.indexOf(name) === -1) return false;
            const checkedItem = this.checkedItem;
            const idx = checkedItem.indexOf(name);
            value && idx === -1 && checkedItem.push(name);
            !value && idx > -1 && checkedItem.splice(idx, 1);
            console.log('最终结果: ', checkedItem);
        },
        changeHandler(val) {
            console.log('改变的值: ', val * 10);
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
