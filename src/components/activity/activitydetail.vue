<template>
  <div class="activitydetail">
  	<div class="m-top">
      <div class="m-section f-cb">
        <div class="m-img f-fl">
          <img class="cover" :src="activityData.cover"/>
          <img class="tag" v-if="activityData.state=='3'" src="images/banner-prepare.png"/>
          <img class="tag" v-if="activityData.state=='4'" src="./images/banner-enroll.png"/>
          <img class="tag" v-if="activityData.state=='5'" src="images/banner-preheat.png"/>
          <img class="tag" v-if="activityData.state=='6'" src="images/banner-going.png"/>
          <!-- <img class="tag" v-if="activityData.state=='7'" src="images/banner-end.png"/> -->
        </div>
        <div class="content f-fl">
          <h3>{{activityData.title}}</h3>
          <p class="keywords">
            <span v-for="item in activityData.keywords">{{item}}</span>
          </p>
          <p class="time">
            <span class="a-time"><em class="pos">活动</em>{{activityData.timeOfActivity}}</span>
            <span class="r-time"><em class="pos">报名</em>{{activityData.timeOfEnrollment}}</span>
          </p>
          <p class="address"><em class="pos">地址</em>{{activityData.location}}</p>
          <p class="sponsor"><em class="pos">主办</em>{{activityData.sponsor}}</p>
          <div v-if="infoShowMore">
             <p class="sponsor" v-if="activityData.coSponsor!='未填写'"><em class="pos">协办</em>{{activityData.coSponsor}}</p>
          <p class="sponsor" ><em class="pos">报名</em>
            已报名<b class="sign">{{activityData.enrollCount}}</b>人/
            <span v-if="activityData.numberOfExpected != -1">限制<b class="sign">{{activityData.numberOfExpected}}</b>人</span>
            <span v-else>不限人数</span>
          </p>
          </div>
         
        </div>
        <div class="action f-fr">
          <a class="enroll" href="javascript:void(0)" :class="{goenrolling: enrollShow,
            cancelenrolling:cancelShow,goenrollinghui: enrollhuiShow,
          }" @click="enrollActivity(enrollText)"></a>
          <el-dialog size="enrollDialog" v-model="enrollDialog">
            <h3>请填写报名信息：</h3>
            <el-form :model="enroll" :rules="enrollRules" ref="enroll" label-width="120px" label="right">
              <el-form-item label="真实姓名" prop="realName">
                <el-input v-model="enroll.realName" placeholder="请填写您的真实姓名"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="phone">
                <el-input v-model="enroll.phone" placeholder="请填写您的手机号码"></el-input>
              </el-form-item>
              <el-form-item label="公司名称" prop="company">
                <el-input v-model="enroll.company" placeholder="请填写您的公司名称"></el-input>
              </el-form-item>
              <el-form-item class="dialog-footer">
                <div class="footer-btn f-cb">
                  <div class="sure-btn f-fl" @click="sureEnrollActivity">确定</div>
                  <div class="cancel-btn f-fl" @click="enrollDialog = false">取消</div>
                </div>
              </el-form-item>
            </el-form>
          </el-dialog>
          <ul class="actionlist f-cb">
            <li>
              <a class="f-db" href="javascript:void(0)" @click="favorActivity">
                <i class="icon favor" :class="{'active': favorText == '取消收藏'}"></i>
                <p class="name">{{favorText}}</p>
              </a>
            </li>
            <li>
              <a class="m-share f-db" href="javascript:void(0)">
                <i class="icon share"></i>
                <p class="name">分享</p>
                <div class="shareKuang">
                  <div class="head">分享到</div>
                  <div class="bdsharebuttonbox share bdshare-button-style2-16" data-tag="share_0" data-bd-bind="1495676275846">
                    <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
                    <a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ"></a>
                    <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
                    <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                    <a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
                    <a href="#" class="bds_more" data-cmd="more"></a>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a class="f-db" href="javascript:void(0)" @click="reportActivity">
                <i class="icon report"></i>
                <p class="name">举报</p>
              </a>
            </li>
          </ul>
        </div>
        <div class="load-down" :class="{'load-up': infoShowMore}" @click="infoShowMore = !infoShowMore"></div>
      </div>
    </div>
    <div class="m-detailwrap f-cb">
      <div class="m-pagecontent f-fl">
        <ul class="m-activitydetail">
          <li>
            <div class="paperblock">
              <p class="detail">活动详情</p>
            </div>
            <div class="papercontent" v-show="contentShow">
              <p class="c-detail">{{activityData.brief}}</p>
              <div class="load-down" @click="toggleContent"></div>
            </div>
            <div class="papercontent" v-show="!contentShow">
              <p class="c-content" id="activityContent"></p>
              <div class="load-up" @click="toggleContent"></div>
            </div>
          </li>
          <li v-if="guestsShow">
            <div class="paperblock">
              <p class="guest">活动嘉宾</p>
            </div>
            <div class="papercontent" @mouseleave="guesthoverparenthide()">
              <div class="swiper-area">
                <swiper class="swiper" :options="Option">
                  <swiper-slide v-for="(item, index) in activityData.guests" :key="item">
                    <img class="pic" :src="item.pic" />
                    <p class="name">{{item.name}}</p>
                    <p class="position" v-if="item.company == '' && item.job == ''">未填写</p>
                    <p class="position" v-else>{{item.company}}{{item.job}}</p>
                    <div class="mousehandle"  @mouseenter="guestinfoshow(index)">
                    </div>
                    <div class="mask" v-if="nowguestindex == index">
                      <p class="info"></p>
                    </div>
                  </swiper-slide>
                </swiper>
                <div v-if="swiperBtnShow">
                  <div class="swiper-button-prev"></div>
                  <div class="swiper-button-next"></div>
                </div>
              </div>
              <div class="guestopenbox" v-if="nowguestindex != '-1'">
                <div class="guesthovertop">
                  <span>{{activityData.guests[nowguestindex].name}}</span>
                  <span>{{activityData.guests[nowguestindex].job}}</span>
                </div>
                <div class="guesthoverbot">
                {{activityData.guests[nowguestindex].info}}
                </div>
              </div>
            </div>
          </li>
          <li v-if="processShow">
            <div class="paperblock">
              <p class="process">活动流程</p>
            </div>
            <div class="papercontent">
              <dl class="process-area" v-if="!processMore">
                <dt v-for="(item, index) in activityData.process" v-if="index < 4">
                  <div class="line"></div>
                  <div class="item">
                    <p class="process-time f-fl">{{item.start}}-{{item.end}}</p>
                    <p class="process-timeicon"></p>
                    <p class="process-content f-fl">{{item.content}}</p>
                  </div>
                </dt>
              </dl>
              <dl class="process-area" v-if="processMore">
                <dt v-for="(item, index) in activityData.process">
                  <div class="line"></div>
                  <div class="item">
                    <p class="process-time f-fl">{{item.start}}-{{item.end}}</p>
                    <p class="process-timeicon"></p>
                    <p class="process-content f-fl">{{item.content}}</p>
                  </div>
                </dt>
              </dl>
              <div class="load-down" :class="{'load-up': processMore}" @click="toggelProcess"></div>
            </div>
          </li>
          <li v-if="enrollListShow">
            <div class="paperblock">
              <p class="number">最新参与</p>
            </div>
            <div class="papercontent">
              <dl class="person-area">
                <dd v-for="item in enrollList">
                  <img class="avatar" v-if="item.avatar" :src="item.avatar" />
                  <img class="avatar" v-else src="./images/defaultAvatar.png" />
                  <p class="name">{{item.name}}</p>
                </dd>
              </dl>
            </div>
          </li>
          <li>
            <div class="paperblock">
              <p class="comments">全部评论<span class="num">({{commentTotal}})</span></p>
            </div>
            <div class="papercontent">
              <div class="comment-area">
                <div class="j-comment">
                  <div class="isAvatar f-fl">
                    <img :src="userAvatar"/>
                  </div>
                  <div class="isComment f-fl">
                    <textarea class="c-txt" placeholder="发表您的评论吧。。。。" :maxlength ="140" v-model="commentText"></textarea>
                    <p class="c-count">还可以输入<em>{{140 - commentText.length}}</em>个字</p>
                    <a href="javascript:void(0)" class="c-button" @click="commentActivity">发表评论</a>
                  </div>
                </div>
                <div class="j-sort f-cb">
                  <a class="sort-btn f-fl" :class="{'active': isNewest}" href="javascript:void(0)" @click="newestComment">最新评论</a>
                  <a class="sort-btn f-fl" :class="{'active': isHotest}" href="javascript:void(0)" @click="hotestComment">最热评论</a>
                </div>
                <ul class="j-commentList">
                  <li class="f-cb" v-for="item in commentData">
                    <a href="javascript:void(0)" class="u-avatar f-fl">
                      <img :src="item.accountavatar"/>
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
              <div class="comment-more">
                <a class="btn f-db" href="javascript:void(0)" @click="loadMoreComment" v-if="moreCommentText == '加载更多'"></a>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="m-pageside f-fl">
        <div class="m-recommentactivity">
          <div class="paperblock">
            <p class="recomment">活动二维码</p>
          </div>
          <div class="ewmbox">
            <div id='code'></div>
            <canvas id="canvas"></canvas>
            <div class="ewmInfo">扫一扫，用手机打开活动吧~</div>
          </div>
          <div class="paperblock">
            <p class="recomment">推荐活动</p>
          </div>
          <div class="papercontent">
            <div class="recomment-area">
              <div class="m-img">
                <img :src="recommentCover"/>
              </div>
              <ul>
                <li class="title f-cb" v-for="(item, index) in recommendData" v-if="index < recommentLen" @click="checkoutRecomment(index,item.id)">
                  <span class="icon" :class="{'icon1': index == 0, 'icon2': index == 1, 'icon3': index == 2}">{{index + 1}}</span>
                  <span class="text" :class="{'active': index == activeIndex}">{{item.title}}</span>
                </li>
              </ul>
              <div class="load-down" :class="{'load-up': recommentLen == 9}" v-if="recommentMoreShow" @click="toggleRecomment"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
	import activityApi from '@/js/api.js';
	import functionApi from '@/js/function.js';
  import Vue from 'vue'
  import QRCode from 'qrcode'
  Vue.use(QRCode)
  export default{
    data(){
      var validatePhone = (rule, value, callback) => {
        if(value === ''){
          callback(new Error('请输入手机号'));
        }else if(!value.match(/^13\d{9}$|^14\d{9}$|^15\d{9}$|^16\d{9}$|^17\d{9}$|^18\d{9}$/) && !value.match(/^\d{3}-\d{8}|\d{4}-\d{7}$/)){
          callback(new Error('请输入正确格式的电话或手机号'));
        }else{
          callback();
        }
      };
      return{
        id: location.pathname.split('/')[2],
        enrollHui: false,
        enrollText: '',
        enrollShow:'',
        enrollhuiShow:'',
        cancelShow:'',
        enrollDialog: false,
        nowguestindex:'-1',
        guesthoverparent:'-1',
        codes: '',
        enroll: {
          realName: '',
          phone: '',
          company: ''
        },
        enrollRules: {
          realName: [
            { required: true, message: '请填写您的真实姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true, validator: validatePhone, trigger: 'blur' }
          ],
          company: [
            { required: true, message: '请填写您的公司名称', trigger: 'blur' }
          ]
        },
        activityData: {},
        favorText: '收藏',
        infoShowMore: true,
        contentShow: false,
        guestsShow: true,
        swiperBtnShow: true,
        processShow: true,
        enrollListShow: true,
        enrollList: [],
        Option: {
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          watchSlidesProgress : true,
          watchSlidesVisibility : true,
          slidesPerView: 5,
          spaceBetween: 10,
          grabCursor: true,
          paginationClickable: true,
          centeredSlides: false,
          speed: 1000,
          autoplay: false
        },
        personIndex: '-1',
        processMore: false,
        userAvatar: '',
        commentText: '',
        commentTotal: '',
        moreCommentText:'',
        isNewest: true,
        isHotest: false,
        commentData: [],
        commentIndex: '',
        recommendData: [],
        recommentCover: '',
        activeIndex: 0,
        recommentLen: 6,
        recommentMoreShow: false
      }
    },
    methods:{
      enrollActivity(text){
        console.log(this.activityData)
        if(text == '立即报名'){
          let huicyeuser = localStorage.getItem('huicyeuser');
          if(!huicyeuser){
            alert("请先登录！");
            this.$router.push({path:'/login'});
          }else{
            if(this.activityData.numberOfExpected!=-1){
              if(this.enrollShow == true && (this.activityData.enrollCount<this.activityData.numberOfExpected)) {
              this.enrollDialog = true;
            }else if(this.enrollShow == false){
             return false
            }else{
              alert("报名人数已超出限制")
            }
            }else if(this.enrollShow == true){
              this.enrollDialog = true;
            }
          }
        }else if(text == '取消报名'){
              activityApi.activity.postCancelEnroll({id:this.id}).then(res => {
                if(res.data.result=='success') {
                  this.$message.success('取消报名成功!');
                  let time = setTimeout(() => {
                 location.reload();
                  }, 1500)
                }
              })
        }else{
          return false;
        }
      },
      guestinfoshow(index){
        this.nowguestindex = index;
      },
      guesthoverparenthide(){
        this.nowguestindex = '-1';
      },
      sureEnrollActivity(){
        this.$refs['enroll'].validate((valid) => {
          if(valid){
            let postdata = {
              id: this.id,
              name: this.enroll.realName,
              phone: this.enroll.phone,
              company: this.enroll.company
            };
            activityApi.activity.postEnroll(postdata).then(res => {
              this.$message.success('报名成功!');
              this.enrollDialog = false;
              this.getActivityDetail();
            })
          }else{
            return false;
          }
        })
      },
      favorActivity(){
        let huicyeuser = localStorage.getItem('huicyeuser');
        if(!huicyeuser){
          alert("请先登录！");
          this.$router.push({path:'/login'});
        }else{
          if(this.favorText == '收藏'){
            activityApi.activity.postActivityFavorite({"id": this.id, "action": '1'}).then(res => {
              this.favorText = '取消收藏';
            })
          }else if(this.favorText == '取消收藏'){
            activityApi.activity.postActivityFavorite({"id": this.id, "action": '0'}).then(res => {
              this.favorText = '收藏';
            })
          }
        }
      },
      reportActivity(){
        let huicyeuser = localStorage.getItem('huicyeuser');
        if(!huicyeuser){
          alert("请先登录！");
          this.$router.push({path:'/login'});
        }else{
          this.$router.push({path: '/activityreport/' + this.id});
        }
      },
      toggleContent(){
        this.contentShow = !this.contentShow;
      },
      toggelProcess(){
        this.processMore = !this.processMore;
      },
      toggleRecomment(){
        if(this.recommentLen == 6){
          this.recommentLen = 9;
        }else if(this.recommentLen == 9){
          this.recommentLen = 6;
        }
      },
      checkoutRecomment(index,id){
        this.recommentCover = this.recommendData[index].cover;
        this.activeIndex = index;
        //this.$router.push({path:'/activitydetail/'+id});
        location.pathname = '/activitydetail/'+id
      },
      commentActivity(){
        let huicyeuser = localStorage.getItem('huicyeuser');
        if(!huicyeuser){
          alert("请先登录！");
          this.$router.push({path:'/login'});
        }else{
          if(this.commentText == ''){
            return false;
          }else{
             activityApi.activity.postActivityComment({"id": this.id, "actions": 1, 'content': this.commentText}).then(res => {
              this.commentText = '';
              let filterData = {"id": this.id, "filter": {"limit": 10}};
              this.getCommentList(filterData);
            })
          }
        }
      },
      praiseComment(id, text){
        let huicyeuser = localStorage.getItem('huicyeuser');
        if(!huicyeuser){
          alert("请先登录！");
          this.$router.push({path:'/login'});
        }else{
          if(text == '赞'){
            activityApi.activity.postActivityCommentPraise({"id": id, "action": '1'}).then(res => {
              text = '取消赞';
              let filterData = {"id": this.id};
              this.getCommentList(filterData);
            })
          }else if(text == '取消赞'){
            activityApi.activity.postActivityCommentPraise({"id": id, "action": '0'}).then(res => {
              text = '赞';
              let filterData = {"id": this.id};
              this.getCommentList(filterData);
            })
          }
        }
      },
      delComment(id, text){
        let huicyeuser = localStorage.getItem('huicyeuser');
        if(!huicyeuser){
          alert("请先登录！");
          this.$router.push({path:'/login'});
        }else{
          if(text == '删除'){
            activityApi.activity.postActivityCommentDelete({"id": id, "type": '4'}).then(res => {
              this.$message.success('删除成功!');
              let filterData = {"id": this.id};
              this.getCommentList(filterData);
            })
          }else if(text == '举报'){
            activityApi.activity.postActivityCommentReport({"targetId": id, "targetType": '4', 'content': ' '}).then(res => {
              this.$message.success('举报成功!');
              let filterData = {"id": this.id};
              this.getCommentList(filterData);
            }).catch(() => {
              this.$message.error('已举报过该评论!');
            });
          }
        }
      },
      newestComment(){
        this.isNewest = true;
        this.isHotest = false;
        let filterData = {"id": this.id, "filter": {"limit": 10}, "orderType": '0'};
        this.getCommentList(filterData);
      },
      hotestComment(){
        this.isNewest = false;
        this.isHotest = true;
        let filterData = {"id": this.id, "filter": {"limit": 10}, "orderType": '1'};
        this.getCommentList(filterData);
      },
      loadMoreComment(){
        let filterdata = {index: this.commentIndex, "filter": {"limit": 10}}
        activityApi.activity.postActivityCommentListNext(filterdata).then(res =>{
          let nextData = res.data.items;
         this.moreCommentText = res.data.items.length<10?'全部加载完毕':'加载更多';
         console.log(this.moreCommentText)
          console.log(res.data.items.length);
          for(let i = 0; i < res.data.items.length; i++){
            nextData[i].accountname = nextData[i].account.name
            if(nextData[i].account.avatar){
              nextData[i].accountavatar = nextData[i].account.avatar;
            }else{
              nextData[i].accountavatar = 'http://121.196.233.212:3001/images/user_avatar-default2.png';
            }

            let commentUnix = functionApi.moment.getUnix(nextData[i].created);
            let nowUnix = functionApi.moment.getUnix(new Date());
            let howlong = nowUnix - commentUnix;

            if(howlong <= 60){
              nextData[i].created = '刚刚';
            }else if(howlong <= 59 * 60){
              nextData[i].created = Math.floor(howlong / (60)) + '分钟前';
            }else if(howlong <= 24 * 60 * 60){
              nextData[i].created = Math.floor(howlong / (60 * 60)) + '小时前';
            }else if(howlong <= 7 * 24 * 60 * 60){
              nextData[i].created = Math.floor(howlong / (24 * 60 * 60)) + '天前';
            }else if(howlong <= 365 * 24 * 60 * 60){
              nextData[i].created = functionApi.moment.getMDDate(this.commentData[i].created);
            }else{
              nextData[i].created = functionApi.moment.getYMDDate(this.commentData[i].created);
            }

            if(nextData[i].checks[0].state == '0'){
              nextData[i].praiseText = '赞'
            }else if(nextData[i].checks[0].state == '1'){
              nextData[i].praiseText = '取消赞'
            }
            nextData[i].praiseCount =  nextData[i].actions[0].count;

            if(localStorage.getItem('huicyeuser')){
              let accountId = JSON.parse(localStorage.getItem('huicyeuser')).id;
              if(this.commentData[i].account.id == accountId){
                this.commentData[i].delText = '删除';
              }else{
                this.commentData[i].delText = '举报';
              }
            }else{
              this.commentData[i].delText = '举报'
            }

            this.commentData.push(nextData[i]);
          }
        })
      },
      useqrcode() {
        var canvas = document.getElementById('canvas');
        var url = 'http://activity.dream-town.cn:3001/html/share/activity.html?id=' + this.id;
        QRCode.toCanvas(canvas, url, function (error) {
          if (error) { console.error(error) }
          console.log('success!');
        })
      },
      getActivityDetail(){
        activityApi.activity.postDetail({"id": this.id}).then(res => {
          this.activityData = res.data;
          this.useqrcode();
          //res.data.state = '4';
          //res.data.enrollCheck = '1';
        if(res.data.enrollCheck == "0") {
          this.enrollText = '立即报名';
          if(res.data.state == '4'){
              this.enrollShow = true
            }else{
              this.enrollhuiShow = true;
            }
        }else if(res.data.enrollCheck == "1"){
          if(res.data.state == '4'){
              this.cancelShow = true;
               this.enrollText = '取消报名';
            }else{
              this.enrollhuiShow = true;
              this.enrollText = '取消报名';
            }
        }
          if(res.data.keywords){
            this.activityData.keywords = res.data.keywords;
          }else{
            this.activityData.keywords = [];
          }
          this.activityData.keywords.push(this.activityData.subject);
          this.activityData.keywords.push(this.activityData.pattern);

          const startOfActivityYear = functionApi.moment.getYear(this.activityData.startOfActivity);
          const startOfActivityMonth = functionApi.moment.getMonth(this.activityData.startOfActivity);
          const startOfActivityDay = functionApi.moment.getDay(this.activityData.startOfActivity);
          const endOfActivityYear = functionApi.moment.getYear(this.activityData.endOfActivity);
          const endOfActivityMonth = functionApi.moment.getMonth(this.activityData.endOfActivity);
          const endOfActivityDay = functionApi.moment.getDay(this.activityData.endOfActivity);
          if(startOfActivityYear !== endOfActivityYear){
            this.activityData.timeOfActivity = functionApi.moment.getYMDHMTime(this.activityData.startOfActivity) + ' ~ ' + functionApi.moment.getYMDHMTime(this.activityData.endOfActivity);
          }else{
            if(startOfActivityMonth == endOfActivityMonth && startOfActivityDay == endOfActivityDay){
              this.activityData.timeOfActivity = functionApi.moment.getMDHMTime(this.activityData.startOfActivity) + ' ~ ' + functionApi.moment.getHMTime(this.activityData.endOfActivity);
            }else{
              this.activityData.timeOfActivity = functionApi.moment.getMDHMTime(this.activityData.startOfActivity) + ' ~ ' + functionApi.moment.getMDHMTime(this.activityData.endOfActivity);
            }
          }

          const startOfEnrollmentYear = functionApi.moment.getYear(this.activityData.startOfEnrollment);
          const startOfEnrollmentMonth = functionApi.moment.getMonth(this.activityData.startOfEnrollment);
          const startOfEnrollmentDay = functionApi.moment.getDay(this.activityData.startOfEnrollment);
          const endOfEnrollmentYear = functionApi.moment.getYear(this.activityData.endOfEnrollment);
          const endOfEnrollmentMonth = functionApi.moment.getMonth(this.activityData.endOfEnrollment);
          const endOfEnrollmentDay = functionApi.moment.getDay(this.activityData.endOfEnrollment);
          if(startOfEnrollmentYear !== endOfEnrollmentYear){
            this.activityData.timeOfEnrollment = functionApi.moment.getYMDHMTime(this.activityData.startOfEnrollment) + ' ~ ' + functionApi.moment.getYMDHMTime(this.activityData.endOfEnrollment);
          }else{
            if(startOfEnrollmentMonth == endOfEnrollmentMonth && startOfEnrollmentDay == endOfEnrollmentDay){
              this.activityData.timeOfEnrollment = functionApi.moment.getMDHMTime(this.activityData.startOfEnrollment) + ' ~ ' + functionApi.moment.getHMTime(this.activityData.endOfEnrollment);
            }else{
              this.activityData.timeOfEnrollment = functionApi.moment.getMDHMTime(this.activityData.startOfEnrollment) + ' ~ ' + functionApi.moment.getMDHMTime(this.activityData.endOfEnrollment);
            }
          }

          this.activityData.location = this.activityData.location.province + ' · ' + this.activityData.location.city + ' · ' + this.activityData.location.area;
          this.activityData.sponsor = this.activityData.sponsor.join('  ');

          if(this.activityData.coSponsor && this.activityData.coSponsor.length > 0){
            this.activityData.coSponsor = this.activityData.coSponsor.join(' ');
          }else{
            this.activityData.coSponsor = '未填写';
          }

          if(!this.activityData.favoriteCheck){
            this.favorText = '收藏';
          }else{
             if(this.activityData.favoriteCheck == '0'){
              this.favorText = '收藏';
            }else if(this.activityData.favoriteCheck == '1'){
              this.favorText = '取消收藏';
            }
          }

          //分享相关
          window._bd_share_config = {
            "common": {
              "bdSnsKey": {
                "tsina": "s000000000000",
                "tqq": "s000000000000",
                "t163": "s000000000000",
                "tsohu": "s000000000000 "
              },
              "bdText": this.activityData.title,
              "bdMini": "2",
              "bdMiniList": false,
              "bdPic": this.activityData.cover,
              "bdStyle": "2",
              "bdSize": "16",
              'bdUrl': 'http://activity.dream-town.cn:3001/html/share/activity.html?id=' + this.id+'&app=2',
              'bdDesc': this.activityData.brief
            },
            "share": {}
          };
          let url = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=';
          let script = document.createElement('script')
          script.setAttribute('src', url)
          document.getElementsByTagName('head')[0].appendChild(script);


          $('#activityContent').load(this.activityData.content + ' article');
          if(this.activityData.guests && this.activityData.guests.length == 0){
            this.guestsShow = false;
          }
          if(this.activityData.guests && this.activityData.guests.length <= 5){
            this.swiperBtnShow = false;
          }
          if(this.activityData.process && this.activityData.process.length == 0){
            this.processShow = false;
          }
        })
      },
      getEnrollList(){
        activityApi.activity.postEnrollListBrief({"id": this.id}).then(res =>{
          this.enrollList = res.data;
          if(res.data && res.data.length == 0){
            this.enrollListShow = false;
          }
        })
      },
      getCommentList(params){
        activityApi.activity.postActivityCommentList(params).then(res =>{
          this.commentIndex = res.data.index;
          this.commentTotal = res.data.total;
          console.log(this.commentTotal);
          this.moreCommentText = res.data.total>10?'加载更多':'全部加载完毕';
          this.commentData = res.data.items;
          for(let i = 0; i < this.commentData.length; i++){
            this.commentData[i].accountname = this.commentData[i].account.name
            if(this.commentData[i].account.avatar){
              this.commentData[i].accountavatar = this.commentData[i].account.avatar;
            }else{
              this.commentData[i].accountavatar = 'http://121.196.233.212:3001/images/user_avatar-default2.png';
            }

            let commentUnix = functionApi.moment.getUnix(this.commentData[i].created);
            let nowUnix = functionApi.moment.getUnix(new Date());
            let howlong = nowUnix - commentUnix;

            if(howlong <= 60){
              this.commentData[i].created = '刚刚';
            }else if(howlong <= 59 * 60){
              this.commentData[i].created = Math.floor(howlong / (60)) + '分钟前';
            }else if(howlong <= 24 * 60 * 60){
              this.commentData[i].created = Math.floor(howlong / (60 * 60)) + '小时前';
            }else if(howlong <= 7 * 24 * 60 * 60){
              this.commentData[i].created = Math.floor(howlong / (24 * 60 * 60)) + '天前';
            }else if(howlong <= 365 * 24 * 60 * 60){
              this.commentData[i].created = functionApi.moment.getMDDate(this.commentData[i].created);
            }else{
              this.commentData[i].created = functionApi.moment.getYMDDate(this.commentData[i].created);
            }

            if(this.commentData[i].checks[0]&&this.commentData[i].checks[0].state == '0'){
              this.commentData[i].praiseText = '赞'
            }else if(this.commentData[i].checks[0]&&this.commentData[i].checks[0].state == '1'){
              this.commentData[i].praiseText = '取消赞'
            }
            this.commentData[i].praiseCount =  this.commentData[i].actions[0].count;

            if(localStorage.getItem('huicyeuser')){
              let accountId = JSON.parse(localStorage.getItem('huicyeuser')).id;
              if(this.commentData[i].account.id == accountId){
                this.commentData[i].delText = '删除';
              }else{
                this.commentData[i].delText = '举报';
              }
            }else{
              this.commentData[i].delText = '举报'
            }
            
          }
        })
      },
      getRecommentList(){
        activityApi.activity.postActivityRecomment().then(res =>{
          this.recommendData = res.data.data.activityList;
          console.log(this.recommendData)
          this.recommentCover = this.recommendData[0].cover;
          if(this.recommendData.length < 6){
            this.recommentMoreShow = false;
          }else{
            this.recommentMoreShow = true;
          }
        })
      }
    },
    mounted() {
      if(localStorage.getItem('huicyeuser') && JSON.parse(localStorage.getItem('huicyeuser')).profile.avatar){
        this.userAvatar = JSON.parse(localStorage.getItem('huicyeuser')).profile.avatar;
      }else{
        this.userAvatar = 'http://121.196.233.212:3001/images/user_avatar-default2.png';
      }
      this.getActivityDetail();
      this.getEnrollList();
      let filterData = {"id": this.id, "filter": {"limit": 10}};
      this.getCommentList(filterData);
      this.getRecommentList();
    }
  }
</script>

<style lang="scss" scoped>
	.activitydetail{background:#f3f7f9; padding:25px 0 60px 0;
		.m-top{width:1198px; background:#fff; margin:0 auto; border-radius:6px; box-shadow: 0 0 12px rgba(0, 0, 0, 0.05); border:1px solid #e3e9ee;
      .m-section{position:relative; padding:29px;
        .m-img{position:relative;
          .cover{width:183px; height:251px;}
          .tag{position:absolute; top:5px; left:5px; z-index:99;}
        }
        .content{margin-left:30px; text-align:left;
          h3{font-size: 24px;color: #3b4857;max-height: 80px;line-height: 40px;font-weight: bold;max-width: 660px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical; -webkit-line-clamp: 2;}
          .keywords{margin:25px 0 45px 0;
            span{font-size:14px; color:#c51e60; padding:4px 15px; background:#fbeff4; border:1px solid #febad4; border-radius:8px; margin-right:7px;}
          }
          .time, .address, .sponsor{ font-size:14px; color:#3b4857; line-height:22px; margin-bottom:18px; max-width:680px;
            .pos{ display:inline-block; font-size:12px; font-style:normal; color:#475469; width:50px; height:22px; text-align:center; margin-right:10px;background:url(images/activity-detail-tag.png) no-repeat; }
            .sign{color:#5771e6; font-weight:normal;}
            .a-time{ margin-right:30px; }
          }
        }
        .action{position:relative;
          .enroll{display:block; float:right;  width:145px;padding-left:15px; height:50px; font-size:16px; color:#fff; font-weight:bold; line-height:50px; text-align:center; margin-top:5px; margin-right:27px;
            &.hui{background:#ccc;}
            &.goenrolling  {
              background:url(images/goenroll.png) no-repeat center;
            }
            &.cancelenrolling  {
              background:url(images/cancelbtn.png) no-repeat center;
            }
            &.goenrollinghui  {
              background:url(images/hui.png) no-repeat center;
            }
          }
          .actionlist{margin-top:180px; margin-right:-9px;
            li{float:left; width:76px; height:48px; border-right:1px solid #e3e9ee;
              &:last-child{border:none;}
              .icon{display:block; background:url('images/activityIcon.png') no-repeat;; width:20px; height:20px; margin-left:28px;
                &.favor{background-position:0 0;
                  &.active{background-position:0 -372px;}
                }
                &.share{background-position:0 -29px;}
                &.report{background-position:0 -60px;}
              }
              .name{font-size:12px; color:#324057; width:76px; text-align:center; margin-top:14px;}
              .m-share{position:relative;
                .shareKuang{display:none; position:absolute; left:-80px; top:-30px; width:95px; height:132px; border:1px solid #e3e9ee; background:#fff; z-index:99; box-shadow:0 0 12px rgba(0, 0, 0, 0.05);
                  .head{background:#fafafa; padding:5px; font-size:14px; color:#324057;}
                  .bdshare-button-style2-16 a, .bdshare-button-style2-16 .bds_more{position:relative; background-image:url(images/shareIcon.png)!important}
                  .bdsharebuttonbox{padding:13px; position:relative;}
                }
                &:hover{
                  .shareKuang{display:block;}
                }
              }
            }
          }
        }
        .load-down{position:absolute; left:50%; margin-left:-10px; bottom:16px; width:20px; height:10px; cursor:pointer; background:url('images/activityIcon.png') no-repeat 0 -85px;
          &.load-up{background-position:0 -301px;}
        }
      }
    }
    .m-detailwrap{width:1200px; margin:10px auto 0 auto;
      .m-pagecontent{width:928px; margin-right:10px; box-shadow: 0 0 12px rgba(0, 0, 0, 0.05); border:1px solid #e3e9ee; border-radius:6px;
        .m-activitydetail{
          li{
            .paperblock{background:#f8fafb; font-size:16px; color:#3b4857; font-weight:bold; border-top:1px solid #e3e9ee; border-bottom:1px solid #e3e9ee; height:22px; line-height:22px; padding:15px 0;
              p{ padding-left:50px;  
              }
            }
            .papercontent{position:relative; background:#fff;
              .c-detail{padding:20px 50px 35px 50px; font-size:16px; color:#8a929a; text-align:justify; line-height:35px;}
              .c-content{padding:20px 50px 35px 50px; line-height:1.8; text-align:justify;}
              .load-down{position:absolute; left:50%; margin-left:-10px; bottom:16px; width:20px; height:10px; cursor:pointer; background:url('images/activityIcon.png') no-repeat 0 -85px;}
              .load-up{position:absolute; left:50%; margin-left:-10px; bottom:16px; width:20px; height:10px; cursor:pointer; background:url('images/activityIcon.png') no-repeat 0 -301px;}
              .swiper-area{padding:30px 50px 40px 50px;padding-bottom:0;
                .pic{display:block; width:140px; height:190px;}
                .name{font-size:16px; line-height:36px; color:#3b4857; width:140px; text-align:center; margin-top:10px;}
                .position{font-size:12px; line-height:12px; color:#99a9be; width:140px; text-align:center;height:12px;overflow: hidden;}
                .swiper-slide{ position:relative;height:280px;
                  .mask{position:absolute; bottom:0; left:0; width:140px; height:280px; background:url('images/guesthover.png') no-repeat center bottom;
                  }
                  .mousehandle{position:absolute; bottom:0; left:0; width:140px; height:280px;z-index:99;}
                }
                .swiper-button-next, .swiper-button-prev{top:130px;}
                // .swiper-button-prev{background:#ccc url('images/guestPrev.png') no-repeat;}
                // .swiper-button-next{background:#ccc url('images/guestNext.png') no-repeat;}
              }
              .guestopenbox{width:817px;min-height:300px;border:4px solid #c0ccda;border-radius: 8px;margin-top:-4px;padding:50px 54px 50px 49px;margin-bottom:2px;
                .guesthovertop{border-bottom:1px dashed #d5dfe4;padding-bottom:30px;
                  span:nth-of-type(1){font-size:22px;font-weight: bold;color:#3b4857;padding-right:30px;}
                  span:nth-of-type(2){font-size:16px;color:#3b4857;}
                }
                .guesthoverbot{font-size:16px;color:#68737d;line-height: 36px;padding-top:20px;}

              }
              .process-area{padding:1px 50px 46px 46px;
                .line{width:192px; height:27px; border-right:3px solid #e9ecf2;}
                .item{border:1px solid #e9ecf2; background:#f8fafb; border-radius:7px; padding:19px 32px; overflow:hidden;position: relative;
                  .process-time{font-size:20px; color:#aab5c1; line-height:20px;height:20px;position: absolute;top:50%;margin-top:-10px;}
                  .process-content{font-size:16px; color:#3b4857; line-height:20px; 
                     width:400px; text-align:justify;margin-left:340px;
                  }
                  .process-timeicon{
                      position: absolute;top:50%;margin-top:-10px;left:182px;
                      content:'';display: block;float:left;height:20px;width:20px;
                      background:url(images/activityIcon.png) no-repeat center -232px;
                    }
                }
              }
              .person-area{padding:29px 30px 5px 30px; overflow:hidden;
                dd{ position:relative; width:77px; float:left; margin:0 10px 25px 0;
                  .avatar{display:block; width:67px; height:67px; border:4px solid #e9eff2; border-radius:54px;}
                  .name{font-size:16px; line-height:46px; color:#3b4857; width:77px; text-align:center; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}
                  .mask{display:none; position:absolute; width:99px; height:99px; border-radius:50px; top:4px; left:4px; background:rgba(0, 0, 0, 0.7); 
                    img{position:absolute; width:27px; height:27px; top:50%; left:50%; margin-top:-13.5px; margin-left:-13.5px;}
                  }
                  &:nth-child(10n){margin-right:0;}
                  // &:hover{
                  //   .mask{display:block;}
                  // }
                }
              }
              .comment-area{ padding:28px 28px 0px 48px; /*border-bottom:1px solid #e9ecf2;*/
                .j-comment{ overflow:hidden;
                  .isAvatar{
                    img{ display:block; width:60px; height:60px; border-radius:30px; }
                  }
                  .isComment{ position:relative; width:740px; height:156px; border:1px solid #e9eff2;  border-radius:20px; margin:1px 0 0 25px;
                    .c-txt{ width:698px; height:100px; border:none; font-size:14px; color:#3b4857; margin:19px; resize:none; }
                    .c-count{ position:absolute; left:20px; bottom:20px; font-size:12px; height:12px; line-height:12px; color:#aab5c1;
                      em{ color:#c51e60; font-style:normal; }
                    }
                    .c-button{ position:absolute; right:20px; bottom:20px; font-size:14px; color:#c51e60; height:14px; line-height:14px; }
                  }
                }
                .j-sort{ margin:30px 0 20px 85px;
                  .sort-btn{ font-size:14px; color:#68737d; height:38px; line-height:38px; border-radius:8px; padding:0 24px; margin-right:22px; 
                    &.active{ background:#c51e60; color:#f3f7f9;}
                  }
                }
                .j-commentList{
                  li{ margin-bottom:55px;
                    .u-avatar{
                      img{ display:block; width:60px; height:60px; border-radius:30px; }
                    }
                    .commentcontent{ margin-left:25px;
                      .info{ margin-top:4px;
                        .name{ font-size:14px; color:#aab5c1; line-height:14px; font-weight:bold; }
                        .time{ font-size:12px; color:#c5ced4; line-height:14px; margin-left:20px; }
                      }
                      .content{ font-size:16px; color:#3b4857; line-height:32px; max-width:678px; text-align:justify; }
                      .comment-option{ margin-top:18px; 
                        .option{ padding-left:24px; background:url(images/activityIcon.png) no-repeat; font-size:12px; line-height:16px; color:#3b4857; 
                          // &.reply{ background-position:0px -313px; }
                          // &.praise{ background-position:0px -331px; margin-left:35px;}
                          &.praise{background-position:0px -331px;
                            &.active{background-position:0 -350px;}
                          }
                        }
                        .delete{display:block; font-size:12px; line-height:16px; color:#3b4857; margin-left:15px;}
                      }
                      .replycomment{ position:relative; border-left:4px solid #f3f7f9; padding:25px 35px; margin-top:30px; margin-bottom:-25px;
                        dt{ margin-bottom:50px;
                          .replycontent{ margin-left:25px;
                            .content{ max-width:570px; text-align:justify; }
                          }
                          &:last-child{ margin-bottom:0; }
                        }
                        .replynum{ position:absolute; right:0; bottom:0; font-size:12px; color:#aab5c1; background:url(images/activityIcon.png) no-repeat 65px -82px; padding-right:20px;
                          em{ color:#5771e6; font-style:normal; }
                        }
                      }
                    }
                    &:last-child{ margin-bottom:35px; }
                  }
                }
              }
              .comment-more{ width:100%; padding-bottom:40px;
                .btn{height:74px;width:74px;margin:0 auto;border-radius:50%;
                  background:url(http://huicye.image.alimmdn.com/FED/huicye-webadvance/load.png) center center no-repeat;
                }
              }
            }
            &:first-child{
              .paperblock{border-top:none; border-top-left-radius:6px; border-top-right-radius:6px;}
            }
            &:last-child{
              .papercontent{border-bottom-left-radius:6px; border-bottom-right-radius:6px;}
            }
          }
        }
      }
      .m-pageside{width:258px; box-shadow: 0 0 12px rgba(0, 0, 0, 0.05); border:1px solid #e3e9ee; border-radius:6px;
        .m-recommentactivity{border-radius:6px;
          .ewmbox {
            height: 210px;
            width: 258px;
            background-color: #fff;
            margin-bottom: 10px;
            border-bottom: 1px solid #e3e9ee;
            overflow: hidden;
            #canvas {
              width: 165px!important;
              height: 165px!important;
              margin-left: 46px;
              margin-top: 5px;
            }
            img {
              display: block;
              width: 135px;
              height: 135px;
              margin: 20px auto;
            }
            .ewmInfo {
              font-size: 12px;
              height: 16px;
              line-height: 16px;
              width: 258px;
              text-align: center;
              text-indent: 17px;
              color: #3b4857;
              background: url('http://huicye.image.alimmdn.com/FED/huicye-webadvance/ewm.png') 25px center no-repeat;
            }
          }
          .paperblock{background:#f8fafb; font-size:16px; color:#3b4857; font-weight:bold; border-bottom:1px solid #e3e9ee; height:22px; line-height:22px; padding:15px 0; border-top-left-radius:6px; border-top-right-radius:6px;
            p{padding-left:50px;
              &.recomment{background-position:27px -209px;}
            }
          }
          .recomment-area{ position:relative; background:#fff; border-bottom-left-radius:6px; border-bottom-right-radius:6px;
            .m-img{padding:26px 34px 0px 37px; margin-bottom:-5px;
              img{display:block; width:183px; height:251px; border-radius:4px;}
            }
            ul{
              li.title{font-size:14px; color:#68737d; line-height:26px; padding:20px 30px; border-bottom:1px dashed #f1f5f7; cursor:pointer;
                &:last-child{border-bottom:none; border-bottom-left-radius:6px; border-bottom-right-radius:6px;}
                .icon{display:block; float:left; background:#aebac9; width:14px; height:14px; border-radius:4px; font-size:12px; color:#fff; line-height:14px; text-align:center; font-style:normal; margin-top:5px;
                  &.icon1{background:#d1c0a5;}
                  &.icon2{background:#b2bfd0;}
                  &.icon3{background:#efa254;}
                }
                .text{display:block; float:left; padding-left:14px; width:168px; text-align:justify; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; text-overflow:ellipsis; color:#68737d;
                  &.active, &:hover{color:#1f2d3d;}
                }
              }
            }
            .load-down{position:absolute; left:50%; margin-left:-20px; bottom:-35px; width:40px; height:35px; background:url(images/more-down.png) no-repeat; cursor:pointer; 
              &.load-up{background:url(images/more-up.png) no-repeat;}
            }
          }
        }
      }
    }
    .el-dialog__body{
      h3{background:#f7f8fa; padding:50px 50px 30px 50px; border-radius:6px 6px 0 0;}
      .el-form-item{background:#f7f8fa; margin:0; padding:0 50px 30px 50px;
        &.dialog-footer{background:#fff; padding:48px 0 40px 0; border-top:1px solid #e3e9ee; border-radius:0 0 6px 6px;
          .footer-btn{width:340px; margin:0 auto; text-align:center;
            .sure-btn{font-size:16px; color:#fff; width:138px; height:48px; background:#5771e6; text-align:center; line-height:48px; border:1px solid #ccd4f7; border-radius:6px; margin-right:11px; cursor:pointer;}
            .cancel-btn{font-size:16px; color:#5771e6; width:138px; height:48px; background:#eaeffc; text-align:center; line-height:48px; border:1px solid #ccd4f7; border-radius:6px; margin-right:10px; cursor:pointer;}
          }
        }
      }
    }
	}
  // .bdshare-button-style2-16 a,
  // .bdshare-button-style2-16 .bds_more{background-image:url(images/shareIcon.png)!important}
  // .bdsharebuttonbox{width:20px;height:30px;margin-left:30px;
  // }
  // .bdshare-button-style0-16 a, .bdshare-button-style0-16 .bds_more{margin-top:-48px; background-position:0 -18px;}
  // .activitydetail .m-top .m-section .action .actionlist li .icon[data-v-4c118cb0]{background-image:url(../../images/shareIcon.png) no-repeat;}
</style>