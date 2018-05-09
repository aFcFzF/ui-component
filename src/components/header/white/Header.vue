<template>
  <header class="main-header" >
    <div class="header-wrap">
        <a class="header-logo">
            <span class="logo"></span><span class="caption">小程序平台</span>
        </a>
        <div class="user-info">
            <span class="user-icon"></span><span class="arrow-down"></span>
            <ul class="user-tool">
                <i class="arrow-angle"></i>
                <i class="arrow-angle-w"></i>
                <li class="user-name"><a href="#">小度机器人</a></li>
                <li class="exit"><a href="#">退出</a></li>
            </ul>
        </div>
    </div>
  </header>
</template>

<style scoped lang="less">
    @width: 1200px;
    .main-header {
        background: #fff;
        border-bottom: solid 1px #eee;
        box-shadow: 0 0 4px #eee;
        height: 70px;
        line-height: 70px;
        position: fixed;
        width: 100%;
        z-index: 9;
        .header-wrap {
            width: @width;
            margin: 0 auto;
        }
        .header-logo {
            float: left;
            height: 100%;
            .logo {
                display: inline-block;
                width: 36px;
                height: 36px;
                vertical-align: middle;
                background-image: url('../../common/img/logo.jpg');
                background-size: 36px 36px;
            }
            .caption {
                font-size: 20px;
                font-weight: bold;
                color: #333;
                vertical-align: middle;
                padding-left: 10px;
            }
        }
        .user-info {
            float: right;
            position: relative;
            width: 120px;
            text-align: right;
            &:hover {
                .user-tool {
                    display: block;
                }
            }
            .user-icon {
                width: 36px;
                height: 36px;
                background: url('../../common/img/user.svg') #fefefe no-repeat center;
                background-size: 36px 36px;
                display: inline-block;
                vertical-align: middle;
                border-radius: 50%;
                border: solid 2px #ccc
            }
            .arrow-down {
                width: 0;
                height: 0;
                border: solid 5px;
                border-color: #333 transparent transparent transparent;
                display: inline-block;
                margin-left: 10px;
                vertical-align: middle;
            }
            .user-tool {
                display: none;
                position: absolute;
                top: 68px;
                left: 35px;
                width: 120px;
                padding: 0;
                margin: 0;
                line-height: 2;
                list-style: none;
                border: solid 1px #ccc;
                text-align: center;
                background: #fff;
                border-radius: 3px;
                box-shadow: 0 0 5px #eee;
                a {
                    color: #666;
                    font-size: 14px;
                    text-decoration: none;
                    outline: none;
                }
                .arrow-angle {
                    position: absolute;
                    top: -20px;
                    left: 35px;
                    width: 0;
                    height: 0;
                    border: solid 10px;
                    border-color: transparent transparent #ccc transparent;
                }
                .arrow-angle-w {
                    position: absolute;
                    top: -19px;
                    left: 35px;
                    width: 0;
                    height: 0;
                    border: solid 10px;
                    border-color: transparent transparent #fff transparent;
                }
            }
        }
    }
</style>

