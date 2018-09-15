<template>
    <div class="image-recommands">
        <h3>热门镜像推荐</h3>
        <article class="wrapper">
            <section class="recommand" v-for="item of prods" :key="item.title">
                <div class="left">
                    <img :src="item.img" alt="产品图片">
                    <span class="price">{{item.price}}元 / 月</span>
                </div>
                <div class="right">
                    <p class="title">{{item.title}}</p>
                    <p class="desc">{{item.desc}}</p>
                    <ui-button class="ui-btn-xs ui-btn-primary">购买</ui-button>
                </div>
            </section>
        </article>
    </div>
</template>

<style lang="less" scoped>
.image-recommands {
    padding: 30px;
    .wrapper {
        display: flex;
        flex-wrap: wrap;
        width: 800px;
        color: @secondary-color;
        font-size: 14px;
        .recommand {
            width: 50%;
            display: flex;
            padding: 20px 0;
            box-sizing: border-box;
            .left {
                width: 30%;
                padding-right: 10px;
                flex-shrink: 0;
                display: flex;
                justify-content: space-around;
                flex-direction: column;
                align-items: center;
                img {
                    width: 100%;
                }
                .price {
                    font-size: 18px;
                    color: rgb(248, 137, 46);
                }
            }
            .right {
                display: flex;
                justify-content: space-around;
                flex-direction: column;
                align-items: flex-start;
                .title {
                    margin: 0;
                    color: @importance-color
                }
            }
        }
    }
}
</style>

<script>
import img01 from './img/01.jpg';
import img02 from './img/02.jpg';
import img03 from './img/03.jpg';
import img04 from './img/04.png';

export default {
    data() {
        return {
            prods: [
                {
                    img: img01,
                    price: 1,
                    title: '主机宝3IIS全能Windows2008',
                    desc: '镜像集成ASP、.NET、PHP、MySQL、PHPMyAdmin、FTP，通过内置主机宝面板可以快速上手'
                },
                {
                    img: img02,
                    price: 2,
                    title: 'LNMP_CentOS7_PHP多版本自由切换',
                    desc: 'LNMP运行环境，支持PHP5.3、5.4、5.5、5.6、7.0、7.1多版本自由切换'
                },
                {
                    img: img03,
                    price: 3,
                    title: 'CentOS7_64位_Oracle11g企业版',
                    desc: 'CentOS7.1_64位_Oracle11.2.0.4g企业版，我们可以根据你们的实际需求，借助我们多年维护云环境的'
                },
                {
                    img: img04,
                    price: 4,
                    title: '云堡垒机云匣子（10资产）',
                    desc: '云匣子是支持手机运维的云堡垒机，主要功能包括：云资产管理、账号统一认证管理、权限管理、应用管理、运维审计等功能，解决云上资产管理混乱，运维操作不透明、难管控等问题。保障企业运维安全。'
                }
            ]
        };
    }
};
</script>


