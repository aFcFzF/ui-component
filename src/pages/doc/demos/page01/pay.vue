<template>
    <div class="pay-panel">
        <bill :datas="datas"></bill>
        <img class="pay-img" :src="payImg" alt="支付二维码">
    </div>
</template>

<style lang="less" scoped>
.pay-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 700px;
    padding: 20px;
    .info {
        font-size: 16px;
        color: @importance-color;
        .fee {
            font-size: 20px;
            color: @red-color;
            font-weight: bold;
        }
    }

    .pay-img {
        height: 220px;
        border-radius: 5px;
        border: solid 3px @split-color;
    }

    .section-fee {
        margin: 0;
    }
}

</style>


<script>
import erweima from './img/ewm.jpg';
import Bill from './bill';

export default {
    components: {
        bill: Bill
    },
    props: {
        datas: Object
    },
    data() {
        return {
            payImg: erweima
        };
    }
};
</script>

