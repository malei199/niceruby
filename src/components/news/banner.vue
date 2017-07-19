<template>
    <div class="newsbanner">
        <el-carousel :interval="4000" type="card" height="330px">
            <el-carousel-item v-for="item in bannerData" :key="item">
                <div class="cont" @click="goDetail(item.id)">
                    <img :src="item.webThumb[0]">
                    <span class="rec" v-if="item.tag.rec == 1"></span>
                    <span class="cove"></span>
                    <div class="bannercon">
                        <h3>{{item.title}}</h3>
                        <p>{{item.brief}}</p>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import newsApi from '@/js/api.js';
import functionApi from '@/js/function.js';
export default {
    data() {
        return {
            bannerData: []
        }
    },
    methods: {
        postLoop() {
            newsApi.news.postLoop().then(res => {
                this.bannerData = res.data.data.newsList;
            });
        },
        goDetail(id) {
            this.$router.push({ path: '/newsdetail/' + id });
        }
    },
    mounted() {
        this.postLoop();
    }
}
</script>
<style lang="scss">
.newsbanner {
    padding-bottom: 5px;
    padding-top: 24px;
    width: 1190px;
    background: #fff;
    margin: 0 auto;
    overflow: hidden;
    .el-carousel__indicators {
        margin: 15px 0;
        .el-carousel__button {
            height: 4px;
            border-radius: 4px;
            background: #aebac9;
        }
        .is-active {
            .el-carousel__button {
                background: #c51e60;
            }
        }
    }
    .el-carousel__arrow {
        &:hover {
            background-color: rgba(0, 0, 0, 0.00);
        }
    }
    .el-carousel__arrow--left {
        width: 24px;
        height: 33px;
        background: url('./images/j_left.png') no-repeat;
        border-radius: none;
        .el-icon-arrow-left {
            display: none;
        }
    }
    .el-carousel__arrow--right {
        width: 24px;
        height: 33px;
        background: url('./images/j_right.png') no-repeat;
        .el-icon-arrow-right {
            display: none;
        }
    }
    .el-carousel__item {
        &.is-active {
            .cont {
                .cove {
                    opacity: 0;
                }
            }
        }
        .cont {
            color: #475669;
            font-size: 14px;
            opacity: 0.75;
            line-height: 200px;
            margin: 0;
            position: relative;
            height: 330px;
            .rec {
                position: absolute;
                background: url('./images/tuijianIcon.png') no-repeat;
                background-size: 100% 100%;
                width: 56px;
                height: 57px;
                top: 15px;
                left: 15px;
                z-index: 1;
            }
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
            .bannercon {
                position: absolute;
                z-index: 1;
                background: rgba(0, 0, 0, 0.5);
                bottom: 0;
                padding: 5px 0 5px;
                left: 0;
                right: 0;
                h3 {
                    font-size: 16px;
                    line-height: 1.5;
                    color: #fff;
                    width: 500px;
                    height: 21px;
                    padding-left: 30px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-bottom: 5px;
                }
                p {
                    width: 530px;
                    height: 21px;
                    padding-left: 30px;
                    font-size: 12px;
                    color: #fff;
                    line-height: 1.5;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .cove {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 2;
                background: #000;
                opacity: .6;
            }
        }
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .bannerTitle {
        width: 640px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #1f2d3d;
        font-size: 24px;
        text-align: center;
        line-height: 2;
        margin: 15px auto 0;
    }
    .bannerBrief {
        width: 700px;
        margin: 0 auto;
        font-size: 14px;
        line-height: 2;
        text-align: center;
        color: #8895ab;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .paginations {
        width: 700px;
        margin: 26px auto 0;
        text-align: center;
        .swiper-pagination-bullet {
            width: 30px;
            height: 4px;
            background: #aebac9;
            border-radius: 6px;
            margin: 0 5px;
            &.swiper-pagination-bullet-active {
                background: #c51e60;
            }
        }
    }
}
</style>
