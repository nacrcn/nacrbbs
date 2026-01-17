<template>
    <div class="FooterBox">

        <div class="footer" id="page_footer">
            <div class="footer_box">

                <div class="footer_line">

                    <div class="line" style="padding-right: 20px;">
                        <div class="footer_logo">
                            <img :src="SiteConfig.Config.xu_WebLogo" alt="">
                        </div>
                        <p>{{SiteConfig.Config.xu_WebDesc}}</p>
                    </div>
                    <div class="line">
                        <p class="line_title">热门入口</p>
                        <div class="line_word">
                            <a href="/pc/collection" target="_blank">精彩合集</a>
                            <a href="/pc/rank" target="_blank">排行榜</a>
                            <a href="/pc/article" target="_blank">文章资讯</a>
                        </div>
                    </div>
                    <div class="line">
                        <p class="line_title">联系我们</p>
                        <div class="line_word">
                            <a href="/public" target="_blank">微信：rsrx9595</a>
                            <a href="/public" target="_blank">QQ号：21089086</a>
                            <a href="/public" target="_blank">Email：888@mail.semoun.com</a>
                        </div>
                    </div>
                    <div class="line">
                        <p class="line_title">找到我们</p>
                        <div class="line_img">
                           <img src="https://imgsbad.semoun.com/uploads/2024/12/20/676569a993d43.png" alt="">
                           <img src="https://imgsbad.semoun.com/uploads/2024/12/20/676569982b6b5.jpg" alt="">
                        </div>
                    </div>
                    <div class="line" v-if="SiteConfig.Config.xu_WebIcp">
                        <p class="line_title">资质展示</p>
                        <div class="line_word">
                            <a href="https://beian.miit.gov.cn/#/Integrated/recordQuery" target="_blank" rel="nofollow"
                                class="slide with-img" hotrep="hp.footer.bottom.beian" style="margin-right: 5px;">
                                <img src="https://imgsbad.semoun.com/uploads/2024/12/10/6757ed099de6f.png">
                                <span>{{SiteConfig.Config.xu_WebIcp}}</span>
                            </a>
                         
                           
                        </div>
                    </div>
                </div>
                <div class="footer_front">
                    <span>友情链接：</span>
                    <a href="www.xuuce.com" target="_blank">序智云</a>
                    <a href="https://cloud.669yun.com" target="_blank">669云</a>
                    <a href="https://zyvps.cn" target="_blank">泽云</a>
                </div>

                <div class="footer_info">
                    <p>Copyright © 2021 - 2029 {{ SiteConfig.Config.xu_Copyright }}. All Rights Reserved. {{ SiteConfig.Config.xu_Copyright }} 版权所有</p>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const SiteConfig = useSiteConfig()
// console.log(SiteConfig.Config);

</script>

<style lang="scss" scoped>
/* 视口大于800 */
.FooterBox {
    width: 100%;

    .footer {
        width: calc(100% - 60px);
        min-height: 100px;
        background-color: #ffffff;
        padding: 30px;

        overflow: hidden;

        .footer_box {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;

            .footer_logo {
                img {
                    height: 30px;
                }

                margin-bottom: 10px;
            }

            p {
                line-height: 22px;
            }

            .footer_info {
                text-align: center;
                margin-top: 20px;


                .footer_info_beian {
                    display: flex;

                    a {
                        font-size: 14px;
                        color: #444444;

                        &:hover {
                            color: rgb(0, 110, 255);
                        }

                        display: flex;
                        width: 100%;
                        justify-content: center;

                        img {
                            width: 16px;
                            margin-right: 5px;
                        }
                    }
                }

                p {
                    font-size: 14px;
                    color: #505050;

                }

            }

            .footer_line {
                width: 100%;
                font-size: 14px;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 25px;

                .line {
                    p {
                        color: #2c2c2c;
                    }

                    .line_title {
                        font-size: 14px;
                        color: #383838;
                        font-weight: 800;
                    }

                    // margin-right: 20px;
                    .line_word {
                        margin-top: 10px;

                        a {
                            display: block;
                            color: #4b4b4b;
                            font-size: 13px;
                            line-height: 28px;
                            display: flex;

                            img {
                                height: 20px;
                                margin-right: 10px;
                                margin-top: 4px;
                            }

                            &:hover {
                                color: rgb(0, 110, 255);
                            }
                        }
                    }
                    .line_img{
                        display: flex;
                        margin-right: 20px;
                        margin-top: 10px;
                        img{
                            width: calc(50% - 0px);
                        }
                    }
                }
            }

            .footer_front {
                margin-top: 0px;

                span {
                    font-size: 14px;
                    color: #4e4e4e;

                }

                a {

                    color: #313131;
                    font-size: 14px;
                    line-height: 23px;
                    margin-right: 10px;

                    &:hover {
                        color: rgb(0, 110, 255);
                    }
                }
            }
        }
    }


    @media screen and (max-width: 728px) {
        .footer {
            width: calc(100% - 40px);
            padding: 20px;
        }
    }

}
</style>
