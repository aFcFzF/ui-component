<template>
    <dl class="section section-fee">
        <dt class="title">所选配置</dt>
        <dd class="row">
            <span class="row-label">付款方式：</span>
            <div class="row-content">{{datas.feeMethod}}</div>
        </dd>
        <dd class="row">
            <span class="row-label">地域：</span>
            <div class="row-content">{{datas.district}}</div>
        </dd>
        <dd class="row">
            <span class="row-label">可用区：</span>
            <div class="row-content">{{datas.canUse}}</div>
        </dd>
        <dd class="row">
            <span class="row-label">购买配置：</span>
            <div class="row-content">{{datas.orderConf}}</div>
        </dd>
        <dd class="row">
            <span class="row-label">操作系统：</span>
            <div class="row-content">{{datas.os}}</div>
        </dd>
        <dd class="row">
            <span class="row-label">磁盘配置：</span>
            <div class="row-content">{{datas.diskSetting}} GB</div>
        </dd>
        <dd class="row">
            <span class="row-label">公网带宽：</span>
            <div class="row-content">{{datas.publicNet}}</div>
        </dd>
        <dd class="row">
            <span class="row-label">购买配额：</span>
            <div class="row-content">{{datas.orderSetting}}</div>
        </dd>
        <dd class="row order-expense">
            <span class="row-label">配置费用：</span>
            <div class="row-content">{{datas.serverExpense}}</div>
        </dd>
    </dl>
</template>

<style lang="less" scoped>
.section-fee {
    padding: 0 !important;
    margin: 30px;
    .title {
        margin-top: 0;
        padding-top: 0;
    }
    .row {
        &:first-of-type {
            margin-top: 30px;
        }
        margin-top: 10px;
        .row-label {
            width: 80px;
            color: #666;
        }

        &.order-expense {
            display: flex;
            align-items: center;
            .row-content {
                font-size: 20px;
                color: @red-color;
                font-weight: bold;
            }
        }
    }
}
</style>

<script>
export default {
    props: {
        datas: Object
    },
    mounted() {
        console.log('datas: ', this.datas);
    }
};
</script>

