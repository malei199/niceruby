<template>
    <div class="newsDetailBody">
        <div class="newsDetail">
            <div class="content">
                <div class="newsTitle">
                    <h3>{{title}}</h3>
                    <p>
                        <span>创业故事</span>
                        <em class="dian">•</em>
                        <em v-if="isOriginal == 1">{{author}}</em>
                        <a v-if="isOriginal == 0" :href="originUrl">转载：{{author}}</a>
                        <em class="dian">•</em>
                        <em>{{update}}</em>
                        <a href="javascript:;" class="r" :href="/report/+id" target="_blank">举报</a>
                    </p>
                    <!--<div class="ope"><a href="javascript:;">分享</a><span>|</span><a href="javascript:;">评论</a><span>|</span><a href="javascript:;">举报</a><a href="javascript:;" class="r">原文链接</a></div>-->
                </div>
                <div class="detail" id="detail"></div>
                <div class="detailP">
                    <div class="share">
                        <a href="javascript:;" class="weibo"></a>
                        <a href="javascript:;" class="wechat"></a>
                        <a href="javascript:;" class="qq"></a>
                        <a href="javascript:;" class="qqzeon"></a>
                    </div>
                    <a href="javascript:;" class="good"></a>
                    <div class="mine">
                        <a href="javascript:;" class="favourite"></a>
                        <p></p>
                    </div>
                </div>
                <comment></comment>
            </div>
            <div class="right">
                <right></right>
            </div>
        </div>
    
    </div>
</template>

<script>
import $ from 'jquery';
import Comment from './comment.vue'
import Right from './detailRight.vue'
import activityApi from '@/js/api.js'
import functionApi from '@/js/function.js'
export default {
    components: {
        'comment': Comment,
        'right': Right,
    },
    data() {
        return {
            id: location.pathname.split('/')[2],
            title: '',
            author: '',
            update: '',
            isOriginal: '1',
            originUrl: '',
            detailData: {}
        }
    },
    methods: {
        postDetail(id) {
            activityApi.news.postDetail({ id: id }).then(res => {
                if (res.data.result == 'success') {
                    this.detailData = res.data.data;
                    this.title = this.detailData.title;
                    this.author = this.detailData.author.name;
                    this.isOriginal = this.detailData.isOriginal;
                    if (this.isOriginal == 0) {
                        this.originUrl = 'http://' + this.detailData.originUrl;
                    }
                    this.update = functionApi.moment.getListTime(this.detailData.publish);
                    $('#detail').load(this.detailData.content);
                }
            });
        },
        goReport() {
            this.$router.push({ path: '/report/' + this.id });
        }
    },
    mounted() {
        this.postDetail(this.id);
    }
}
</script>

<style lang="scss">
.newsDetailBody {
    background: #f3f7f9;
    padding-top: 24px;
    .newsDetail {
        width: 1204px;
        margin: 0 auto;
        overflow: hidden;
        .right {
            width: 260px;
            float: left;
            margin-left: 22px;
        }
        .content {
            width: 920px;
            background: #fff;
            float: left;
            overflow: hidden;
            .detail {
                padding: 50px 30px 70px;
                margin: 0;
                font-family: sans-serif;
                font-size: 14px;
                -webkit-font-smoothing: antialiased;
                border-left: 1px solid #e3e9ee;
                border-right: 1px solid #e3e9ee;
            }
            .detailP {
                text-align: center;
                padding-bottom: 46px;
                border-left: 1px solid #e3e9ee;
                border-right: 1px solid #e3e9ee;
                .share {
                    float: left;
                    width: 300px;
                    overflow: hidden;
                    padding-top: 30px;
                    a {
                        display: inline-block;
                        width: 40px;
                        height: 40px;
                        margin-left: 15px;
                        background: #000;
                        background: url('./images/icon.png') no-repeat;
                        &.weibo {
                            background-position: 0 -641px;
                        }
                        &.wechat {
                            background-position: 0 -711px;
                        }
                        &.qq {
                            background-position: 0 -781px;
                        }
                        &.qqzeon {
                            background-position: 0 -851px;
                        }
                    }
                }
                .mine {
                    float: right;
                    overflow: hidden;
                    width: 266px;
                    padding-top: 30px;
                    margin-right: 34px;
                    .favourite {
                        float: right;
                        width: 120px;
                        height: 40px;
                        border: 1px solid #3b4857;
                        border-radius: 40px;
                        background: url('./images/icon.png') no-repeat 30px -918px;
                    }
                }
                .good {
                    display: inline-block;
                    width: 100px;
                    height: 100px;
                    background: url('./images/icon.png') no-repeat 27px -959px #c51e60;
                    border-radius: 100px;
                }
            }
            .newsTitle {
                width: 858px;
                border: 1px solid #e3e9ee;
                padding: 30px 30px 26px 30px;
                .ope {
                    padding: 37px 0 0;
                    margin-top: 30px;
                    border-top: 1px solid #f4f6f8;
                    font-size: 0;
                    a {
                        display: inline-block;
                        font-size: 14px;
                        color: #5d687b;
                        width: 70px;
                        text-align: center;
                        margin: 0 10px;
                        background: url('./images/icon.png') no-repeat;
                        &.r {
                            float: right;
                            padding-left: 25px;
                            background-position: 12px -589px;
                        }
                        &:first-child {
                            margin: 0;
                            background-position: 2px -466px;
                        }
                        &:nth-child(3) {
                            margin-left: 0px;
                            padding-left: 10px;
                            margin-right: 3px;
                            background-position: 12px -507px;
                        }
                        &:nth-child(5) {
                            background-position: 1px -548px;
                        }
                    }
                    span {
                        display: inline-block;
                        font-size: 14px;
                        color: #5d687b;
                    }
                }
                h3 {
                    font-size: 24px;
                    line-height: 2;
                    color: #3b4857;
                }
                p {
                    padding-left: 20px;
                    font-size: 14px;
                    position: relative;
                    line-height: 2;
                    margin-top: 12px;
                    span {
                        margin-right: 7px;
                    }
                    em {
                        margin: 0 7px;
                        color: #aab5c1;
                        font-style: inherit;
                    }
                    a {
                        margin: 0 7px;
                        color: #aab5c1;
                        font-style: inherit;
                    }
                    .r {
                        display: inline-block;
                        font-size: 14px;
                        color: #5d687b;
                        width: 70px;
                        text-align: center;
                        margin: 0;
                        background: url('./images/icon.png') no-repeat;
                        float: right;
                        padding-left: 25px;
                        color: #aab5c1;
                        font-size: 12px;
                        line-height: 28px;
                        background-position: 20px -545px;
                    }
                    &::before {
                        width: 12px;
                        height: 12px;
                        border-radius: 12px;
                        background: #fea954;
                        position: absolute;
                        left: 0;
                        top: 50%;
                        margin-top: -6px;
                        content: '';
                    }
                    &::after {
                        width: 4px;
                        height: 4px;
                        border-radius: 4px;
                        background: #fff;
                        z-index: 2;
                        content: '';
                        position: absolute;
                        top: 50%;
                        margin-top: -2px;
                        left: 4px;
                    }
                }
            }
        }
    }
}
</style>