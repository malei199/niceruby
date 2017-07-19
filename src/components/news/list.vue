<template>
    <div class="newsList">
        <div class="newsNav">
            <span v-for="(nav,index) in navs" :class="{cur:index==actived}" @click="navClick(index)" :key="index">
                {{nav}}
            </span>
            <a href="javascript:;" @click="newsHot()">最热</a>
        </div>
        <div class="newsData">
            <ul>
                <li v-for="(news,index) in newsData" :key="index" @click="goDetail(news.id)">
                    <img :src="news.webThumb[0]">
                    <div>
                        <h3 class="title">{{news.title}}</h3>
                        <p class="brief">{{news.brief}}</p>
                        <p class="msg">
                            <img :src="news.author.img?news.author.img:'http://huicye.image.alimmdn.com/FED/huicye-webadvance/user_icon.png'">
                            <span class="author" v-if="news.author">{{news.author.name}}</span>
                            <span class="watch">{{news.readCount}}</span>
                            <span class="good">{{news.praiseCount}}</span>
                            <span class="date">{{news.publish}}</span>
                        </p>
                    </div>
                    <span class="type">{{newsType[news.type]}}</span>
                </li>
            </ul>
            <a href="javascript:;" class="moreBtn" @click="newsMore()"></a>
        </div>
    </div>
</template>

<script>
import newsApi from '@/js/api.js';
import functionApi from '@/js/function.js';
export default {
    data() {
        return {
            navs: [
                '全部资讯', '城市创业', '行业资讯', '创业故事', '最新政策'
            ],
            newsData: [
            ],
            newsType: [
                '', '城市创业', '行业资讯', '创业故事', '最新政策'
            ],
            actived: 0,
            params: {
                limit: 5,
                skip: 0,
                state: ['1'],
                type: ''
            }
        }
    },
    methods: {
        navClick(index) {
            this.actived = index;
            this.params.type = index + '';
            if (index == 0) {
                delete this.params.type;
                this.params.skip = 0;
            }
            this.getNewsList();
        },
        newsHot() {
            this.params.skip = 0;
            this.params.order = ['readCount DESC', 'publish DESC'];
            this.getNewsList();
        },
        newsUpdate() {
            this.params.skip = 0;
            this.getNewsList();
        },
        newsMore() {
            this.params.skip += 1;
            this.addNewsList();
        },
        getNewsList() {
            newsApi.news.postNewsList(this.params).then(res => {
                this.newsData = res.data.data.newsList;
                for (let i = 0; i < this.newsData.length; i++) {
                    this.newsData[i].publish = functionApi.moment.getListTime(this.newsData[i].publish);
                }
            });
        },
        addNewsList() {
            newsApi.news.postNewsList(this.params).then(res => {
                this.newsData = this.newsData.concat(res.data.data.newsList);
                for (let i = 0; i < this.newsData.length; i++) {
                    this.newsData[i].publish = functionApi.moment.getListTime(this.newsData[i].publish);
                }
            });
        },
        goDetail(id) {
            this.$router.push({ path: '/newsdetail/' + id });
        }
    },
    mounted() {
        this.getNewsList();
    }
}
</script>

<style lang="scss">
.newsList {
    //margin-left: 118px;
    width: 902px;
    padding-bottom: 90px;
    float: left;
    .newsNav {
        font-size: 0;
        span {
            margin: 23px 30px 25px;
            color: #324057;
            font-size: 14px;
            line-height: 36px;
            height: 36px;
            cursor: pointer;
            display: inline-block;
            &.cur {
                color: #c51e60;
                border-bottom: 1px solid #c51e60;
            }
        }
        a {
            font-size: 14px;
            color: #c51e60;
            float: right;
            height: 36px;
            line-height: 36px;
            margin: 23px 30px 25px;
            padding-right: 15px;
            background: url('./images/icon.png') no-repeat 32px 11px;
        }
    }
    .newsData {
        position: relative;
        .moreBtn {
            width: 74px;
            height: 74px;
            background: url('./images/icon.png') no-repeat center -242px;
            position: absolute;
            bottom: -37px;
            left: 50%;
            margin-left: -37px;
        }
        ul {
            border: 1px solid #e9eff2;
            padding-bottom: 37px;
            background: #fff;
            li {
                &:hover {
                    background: #fafbfc;
                }
                &:last-child {
                    border-bottom: none;
                }
                cursor: pointer;
                padding: 40px 38px;
                overflow: hidden;
                position: relative;
                border-bottom: 1px dashed #d5dfe4;
                .type {
                    position: absolute;
                    padding: 0 10px 0 25px;
                    top: 50px;
                    left: 48px;
                    background: url('./images/icon.png') no-repeat 9px -30px rgba(0, 0, 0, 0.5);
                    font-size: 12px;
                    line-height: 2;
                    color: #fff;
                    border-radius: 6px;
                }
                img {
                    display: block;
                    width: 180px;
                    height: 120px;
                    float: left;
                }
                div {
                    margin-left: 20px;
                    float: left;
                    width: 624px;
                    .title {
                        width: 448px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        font-size: 18px;
                        height: 36px;
                        line-height: 2;
                        color: #3b4857;
                    }
                    .brief {
                        font-size: 14px;
                        line-height: 25px;
                        color: #aab5c1;
                        height: 50px;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        word-break: break-all;
                    }
                    .msg {
                        overflow: hidden;
                        img {
                            float: left;
                            width: 24px;
                            height: 24px;
                            border-radius: 24px;
                            margin-right: 10px;
                            margin-top: 8px;
                        }
                        span {
                            float: left;
                            margin: 8px 0 2px;
                            height: 24px;
                            line-height: 24px;
                            font-size: 14px;
                            color: #8a929a;
                            &.author {
                                font-size: 12px;
                                line-height: 24px;
                                color: #3b4857;
                            }
                            &.watch {
                                margin-left: 45px;
                                padding-left: 26px;
                                background: url('./images/icon.png') no-repeat 5px -170px;
                            }
                            &.good {
                                margin-left: 20px;
                                padding-left: 20px;
                                background: url('./images/icon.png') no-repeat 2px -94px;
                            }
                            &.date {
                                float: right;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
