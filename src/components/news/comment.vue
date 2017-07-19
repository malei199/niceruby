<template>
    <div class="papercontent">
        <div class="paperblock">
            <p class="comments">全部评论
                <span class="num">({{commentTotal}})</span>
            </p>
        </div>
        <div class="comment-area">
    
            <div class="j-comment">
                <div class="isAvatar f-fl">
                    <img :src="userAvatar">
                </div>
                <div class="isComment f-fl">
                    <textarea class="c-txt" placeholder="发表您的评论吧。。。。" :maxlength="140" v-model="commentText"></textarea>
                    <p class="c-count">还可以输入
                        <em>{{140 - commentText.length}}</em>个字</p>
                    <a href="javascript:void(0)" class="c-button" @click="commentActivity">发表评论</a>
                </div>
            </div>
            <div class="j-sort f-cb">
                <a class="sort-btn f-fl" :class="{'active': isNewest}" href="javascript:void(0)" @click="newestComment">最新评论</a>
                <a class="sort-btn f-fl" :class="{'active': isHotest}" href="javascript:void(0)" @click="hotestComment">最热评论</a>
            </div>
            <ul class="j-commentList">
                <li class="f-cb" v-for="(item,index) in commentData" :key="index">
                    <a href="javascript:void(0)" class="u-avatar f-fl">
                        <img :src="item.accountavatar">
                    </a>
                    <div class="commentcontent f-fl">
                        <div class="info f-cb">
                            <a class="name f-fl" href="javascript:void(0)">{{item.accountname}}</a>
                            <p class="time f-fl">{{item.created}}</p>
                        </div>
                        <div class="content">{{item.content}}</div>
                        <div class="comment-option f-cb">
                            <a class="option praise f-fl" :class="{'active': item.praiseText == '取消赞'}" href="javascript:void(0)" @click="praiseComment(item.id, item.praiseText)">{{item.praiseCount}}</a>
                            <a class="delete f-fl" href="javascript:void(0)" @click="delComment(item.id, item.delText)">{{item.delText}}</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import activityApi from '@/js/api.js';
import functionApi from '@/js/function.js';
export default {
    data() {
        return {
            commentText: '',
            commentData: [],
            userAvatar: '',
            commentTotal: '0',
            isNewest: true,
            isHotest: false,
            commentData: [],
            commentIndex: '',
        }
    },
    methods: {
        commentActivity() {
            let huicyeuser = localStorage.getItem('huicyeuser');
            if (!huicyeuser) {
                alert("请先登录！");
                this.$router.push({ path: '/login' });
            } else {
                if (this.commentText == '') {
                    return false;
                } else {
                    activityApi.activity.postActivityComment({ "id": this.id, "actions": 1, 'content': this.commentText }).then(res => {
                        this.commentText = '';
                        let filterData = { "id": this.id, "filter": { "limit": 10 } };
                        this.getCommentList(filterData);
                    })
                }
            }
        },
        newestComment() {
            this.isNewest = true;
            this.isHotest = false;
            let filterData = { "id": this.id, "filter": { "limit": 10 }, "orderType": '0' };
            this.getCommentList(filterData);
        },
        hotestComment() {
            this.isNewest = false;
            this.isHotest = true;
            let filterData = { "id": this.id, "filter": { "limit": 10 }, "orderType": '1' };
            this.getCommentList(filterData);
        },
        getCommentList(params) {
            activityApi.activity.postActivityCommentList(params).then(res => {
                this.commentIndex = res.data.index;
                this.commentTotal = res.data.total;
                console.log(this.commentTotal);
                this.moreCommentText = res.data.total > 10 ? '加载更多' : '全部加载完毕';
                this.commentData = res.data.items;
                for (let i = 0; i < this.commentData.length; i++) {
                    this.commentData[i].accountname = this.commentData[i].account.name
                    if (this.commentData[i].account.avatar) {
                        this.commentData[i].accountavatar = this.commentData[i].account.avatar;
                    } else {
                        this.commentData[i].accountavatar = 'http://121.196.233.212:3001/images/user_avatar-default2.png';
                    }

                    let commentUnix = functionApi.moment.getUnix(this.commentData[i].created);
                    let nowUnix = functionApi.moment.getUnix(new Date());
                    let howlong = nowUnix - commentUnix;

                    if (howlong <= 60) {
                        this.commentData[i].created = '刚刚';
                    } else if (howlong <= 59 * 60) {
                        this.commentData[i].created = Math.floor(howlong / (60)) + '分钟前';
                    } else if (howlong <= 24 * 60 * 60) {
                        this.commentData[i].created = Math.floor(howlong / (60 * 60)) + '小时前';
                    } else if (howlong <= 7 * 24 * 60 * 60) {
                        this.commentData[i].created = Math.floor(howlong / (24 * 60 * 60)) + '天前';
                    } else if (howlong <= 365 * 24 * 60 * 60) {
                        this.commentData[i].created = functionApi.moment.getMDDate(this.commentData[i].created);
                    } else {
                        this.commentData[i].created = functionApi.moment.getYMDDate(this.commentData[i].created);
                    }

                    if (this.commentData[i].checks[0] && this.commentData[i].checks[0].state == '0') {
                        this.commentData[i].praiseText = '赞'
                    } else if (this.commentData[i].checks[0] && this.commentData[i].checks[0].state == '1') {
                        this.commentData[i].praiseText = '取消赞'
                    }
                    this.commentData[i].praiseCount = this.commentData[i].actions[0].count;

                    if (localStorage.getItem('huicyeuser')) {
                        let accountId = JSON.parse(localStorage.getItem('huicyeuser')).id;
                        if (this.commentData[i].account.id == accountId) {
                            this.commentData[i].delText = '删除';
                        } else {
                            this.commentData[i].delText = '举报';
                        }
                    } else {
                        this.commentData[i].delText = '举报'
                    }

                }
            })
        },
    }
}
</script>

<style lang="scss">
.papercontent {
    position: relative;
    background: #fff;
    .paperblock {
        background: #f8fafb;
        font-size: 16px;
        color: #3b4857;
        font-weight: bold;
        border-top: 1px solid #e3e9ee;
        border-bottom: 1px solid #e3e9ee;
        height: 22px;
        line-height: 22px;
        padding: 15px 0;
        p {
            padding-left: 50px;
        }
    }
    .comment-area {
        padding: 28px 28px 0px 48px;
        border-bottom: 1px solid #e9ecf2;
        .j-comment {
            overflow: hidden;
            .isAvatar {
                img {
                    display: block;
                    width: 60px;
                    height: 60px;
                    border-radius: 30px;
                }
            }
            .isComment {
                position: relative;
                width: 740px;
                height: 156px;
                border: 1px solid #e9eff2;
                border-radius: 20px;
                margin: 1px 0 0 25px;
                .c-txt {
                    width: 698px;
                    height: 100px;
                    border: none;
                    font-size: 14px;
                    color: #3b4857;
                    margin: 19px;
                    resize: none;
                }
                .c-count {
                    position: absolute;
                    left: 20px;
                    bottom: 20px;
                    font-size: 12px;
                    height: 12px;
                    line-height: 12px;
                    color: #aab5c1;
                    em {
                        color: #c51e60;
                        font-style: normal;
                    }
                }
                .c-button {
                    position: absolute;
                    right: 20px;
                    bottom: 20px;
                    font-size: 14px;
                    color: #c51e60;
                    height: 14px;
                    line-height: 14px;
                }
            }
        }
        .j-sort {
            margin: 30px 0 20px 85px;
            .sort-btn {
                font-size: 14px;
                color: #68737d;
                height: 38px;
                line-height: 38px;
                border-radius: 8px;
                padding: 0 24px;
                margin-right: 22px;
                &.active {
                    background: #c51e60;
                    color: #f3f7f9;
                }
            }
        }
        .j-commentList {
            li {
                margin-bottom: 55px;
                .u-avatar {
                    img {
                        display: block;
                        width: 60px;
                        height: 60px;
                        border-radius: 30px;
                    }
                }
                .commentcontent {
                    margin-left: 25px;
                    .info {
                        margin-top: 4px;
                        .name {
                            font-size: 14px;
                            color: #aab5c1;
                            line-height: 14px;
                            font-weight: bold;
                        }
                        .time {
                            font-size: 12px;
                            color: #c5ced4;
                            line-height: 14px;
                            margin-left: 20px;
                        }
                    }
                    .content {
                        font-size: 16px;
                        color: #3b4857;
                        line-height: 32px;
                        max-width: 678px;
                        text-align: justify;
                    }
                    .comment-option {
                        margin-top: 18px;
                        .option {
                            padding-left: 24px;
                            background: url('../activity/images/activityIcon.png') no-repeat;
                            font-size: 12px;
                            line-height: 16px;
                            color: #3b4857; // &.reply{ background-position:0px -313px; }
                            // &.praise{ background-position:0px -331px; margin-left:35px;}
                            &.praise {
                                background-position: 0px -331px;
                                &.active {
                                    background-position: 0 -350px;
                                }
                            }
                        }
                        .delete {
                            display: block;
                            font-size: 12px;
                            line-height: 16px;
                            color: #3b4857;
                            margin-left: 15px;
                        }
                    }
                    .replycomment {
                        position: relative;
                        border-left: 4px solid #f3f7f9;
                        padding: 25px 35px;
                        margin-top: 30px;
                        margin-bottom: -25px;
                        dt {
                            margin-bottom: 50px;
                            .replycontent {
                                margin-left: 25px;
                                .content {
                                    max-width: 570px;
                                    text-align: justify;
                                }
                            }
                            &:last-child {
                                margin-bottom: 0;
                            }
                        }
                        .replynum {
                            position: absolute;
                            right: 0;
                            bottom: 0;
                            font-size: 12px;
                            color: #aab5c1;
                            background: url('../activity/images/activityIcon.png') no-repeat 65px -82px;
                            padding-right: 20px;
                            em {
                                color: #5771e6;
                                font-style: normal;
                            }
                        }
                    }
                }
                &:last-child {
                    margin-bottom: 35px;
                }
            }
        }
    }
}
</style>
