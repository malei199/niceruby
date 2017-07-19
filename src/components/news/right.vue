<template>
    <div class="newsRight">
        <div class="recNews">
            <ul>
                <li>
                    推荐资讯
                </li>
                <li class="c" v-for="rec in recData" :key="rec" @click="goDetail(rec.id)">
                    {{rec.title}}
                </li>
            </ul>
        </div>
        <div class="readTop">
            <ul class="more">
                <li>
                    阅读榜单
                </li>
                <li v-for="(read,index) in readData" class="c" :key="index" @click="goDetail(read.id)">
                    <p :class=" 'read'+ ' no'+(index+1)">{{read.title}}</p>
                </li>
            </ul>
        </div>
        <div>
            <ul>
                <li>
                    推荐应用
                </li>
                <li class="recApp c" v-for="(recApp,index) in recAppData" :key="index" @click="goDownload(recApp.url)">
                    <img :src="recApp.logo">
                    <div>
                        <h3>{{recApp.name}}</h3>
                        <p>{{recApp.company}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import newsApi from '@/js/api.js';
export default {
    data() {
        return {
            recData: {},
            readData: {},
            recAppData: {}
        }
    },
    methods: {
        postRecList() {
            newsApi.news.postRecList().then(res => {
                this.recData = res.data.data.newsList;
            })
        },
        postReadList() {
            newsApi.news.postReadList().then(res => {
                this.readData = res.data.data.newsList;
            })
        },
        postRecAppLIst() {
            newsApi.news.postRecAppList().then(res => {
                this.recAppData = res.data.data.appList;
            })
        },
        goDetail(id) {
            this.$router.push({ path: '/newsdetail/' + id });
        },
        goDownload(url) {
            window.location.href = url;
        }
    },
    mounted() {
        this.postRecList();
        this.postReadList();
        this.postRecAppLIst();
    }
}
</script>

<style lang="scss">
.newsRight {
    width: 272px;
    margin-left: 18px;
    float: left;
    margin-top: 85px;
    ul {
        border: 1px solid #e3e9ee;
        margin-bottom: 65px;
        position: relative;
        &.more {
            &::after {
                position: absolute;
                width: 40px;
                height: 34px;
                background: url('./images/icon.png') no-repeat -3px -378px;
                content: "";
                bottom: -34px;
                left: 50%;
                margin-left: -20px;
                cursor: pointer;
            }
        }
        li {
            padding: 20px 30px;
            font-size: 14px;
            line-height: 2;
            color: #324057;
            border-bottom: 1px dashed #e3e9ee;
            background: #fff;
            &.c {
                cursor: pointer;
            }
            &.recApp {
                overflow: hidden;
                img {
                    width: 50px;
                    height: 50px;
                    float: left;
                    border-radius: 6px;
                }
                div {
                    margin-left: 10px;
                    width: 150px;
                    float: left;
                    position: relative;
                    h3 {
                        font-size: 14px;
                        color: #3b4857;
                        width: 125px;
                    }
                    p {
                        font-size: 12px;
                        color: #8a929a;
                    }
                    &::after {
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        background: url('./images/icon.png') no-repeat 0px -422px;
                        right: 0;
                        top: 0;
                        content: '';
                    }
                }
            }
            &:first-child {
                color: #3b4857;
                background: #fafbfc;
                line-height: 1;
                border-bottom: 1px solid #e3e9ee;
            }
            &:last-child {
                border-bottom: none;
            }
            .read {
                padding-left: 17px;
                position: relative;
                &.no1 {
                    &::after {
                        content: '1';
                        background: #d1c0a5;
                        position: absolute;
                        width: 13px;
                        height: 13px;
                        font-size: 8px;
                        border-radius: 14px;
                        color: #fff;
                        text-align: center;
                        line-height: 14px;
                        top: 6px;
                        left: 0;
                    }
                }
                &.no2 {
                    &::after {
                        content: '2';
                        background: #aab5c1;
                        position: absolute;
                        width: 13px;
                        height: 13px;
                        font-size: 8px;
                        border-radius: 14px;
                        color: #fff;
                        text-align: center;
                        line-height: 14px;
                        top: 6px;
                        left: 0;
                    }
                }
                &.no3 {
                    &::after {
                        content: '3';
                        background: #e1a44a;
                        position: absolute;
                        width: 13px;
                        height: 13px;
                        font-size: 8px;
                        border-radius: 14px;
                        color: #fff;
                        text-align: center;
                        line-height: 14px;
                        top: 6px;
                        left: 0;
                    }
                }
            }
        }
    }
}
</style>
