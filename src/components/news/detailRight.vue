<template>
    <div class="newsDetailRight">
        <div class="authorBox">
            <img :src="faceImg" class="faceImg">
            <h3>{{name}}</h3>
            <p class="live">{{live}}</p>
            <p class="num">
                <span>点赞</span>
                <span>发表</span>
                <span class="c">{{good}}</span>
                <span class="c">{{make}}</span>
            </p>
        </div>
        <div class="recNews">
            <ul class="more">
                <li>
                    推荐资讯
                </li>
                <li v-for="item in recData" :key="item" class="c" @click="goDetail(item.id)">
                    {{item.title}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import newsApi from '@/js/api.js';
import functionApi from '@/js/function.js';
export default {
    data() {
        return {
            id: location.pathname.split('/')[2],
            faceImg: 'http://114.55.251.155:3099/upload/news/Alq0Yr0I23bOd/upload_a1f6396d8ffa8f2486488e273cc5aa41.jpg',
            name: 'ddd',
            live: 'sss',
            good: '11',
            make: '33',
            accountId: '',
            recData: {}

        }
    },
    methods: {
        postDetail(id) {
            newsApi.news.postDetail({ id: this.id }).then(res => {
                if (res.data.result == 'success') {
                    if (res.data.data.isOriginal == 1) {
                        this.accountId = res.data.data.author.accountId;
                    } else {
                        this.accountId = res.data.data.editorId;
                    }
                    this.postAuthor();
                }
            });
        },
        postAuthor() {
            newsApi.news.postAuthor({ accountId: this.accountId }).then(res => {
                console.log(res);
            })
        },
        postRecList() {
            newsApi.news.postRecList().then(res => {
                this.recData = res.data.data.newsList;
            })
        },
        goDetail(id) {
            this.$router.push({ path: '/newsdetail/' + id });
        }
    },
    mounted() {
        this.postDetail();
        this.postRecList();
    }
}
</script>
<style lang="scss">
.newsDetailRight {
    .authorBox {
        background: #fff;
        padding-top: 32px;
        border: 1px solid #e4eaef;
        margin-bottom: 20px;
        .faceImg {
            width: 100px;
            height: 100px;
            display: block;
            margin: 0 auto;
            border-radius: 100px;
        }
        h3 {
            margin-top: 10px;
            font-size: 16px;
            color: #3b4857;
            line-height: 1.5;
            text-align: center;
        }
        .live {
            font-size: 12px;
            color: #aab5c1;
            line-height: 1.5;
            text-align: center;
        }
        .num {
            margin-top: 30px;
            font-size: 0;
            text-align: center;
            background: #f8fafb;
            padding-top: 10px;
            span {
                display: inline-block;
                width: 128px;
                font-size: 12px;
                line-height: 1.5;
                color: #aab5c1;
                &.c {
                    font-size: 16px;
                    line-height: 2;
                    color: #34495e;
                }
            }
        }
    }
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
            &:first-child {
                color: #3b4857;
                background: #fafbfc;
                line-height: 1;
                border-bottom: 1px solid #e3e9ee;
            }
            &:last-child {
                border-bottom: none;
            }
        }
    }
}
</style>