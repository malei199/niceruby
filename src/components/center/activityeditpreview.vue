<template>
	<div class="activitypreview">
		<div class="g-section">
			<p class="m-title f-cb">
				<span class="line f-db f-fl hcl"></span>
				<span class="name f-db f-fl">活动预览</span>
			</p>
			<div class="m-detailwrap">
				<div class="m-top">
					<div class="m-section f-cb">
						<div class="m-img f-fl">
							<img class="cover" :src="activityData.cover" />
						</div>
						<div class="content f-fl">
							<h3>{{activityData.title}}</h3>
							<p class="keywords">
								<span v-for="item in activityData.keywords">{{item}}</span>
							</p>
							<p class="time">
								<span class="a-time">
									<em class="pos">活动</em>{{activityData.timeOfActivity}}</span>
								<span class="r-time">
									<em class="pos">报名</em>{{activityData.timeOfEnrollment}}</span>
							</p>
							<p class="address indent">
								<em class="pos">地址</em>{{activityData.location}}</p>
							<p class="sponsor indent">
								<em class="pos">主办</em>{{activityData.sponsor}}</p>
							<p class="sponsor indent" style="display:none;">
								<em class="pos">协办</em>{{activityData.coSponsor}}</p>
						</div>
					</div>
				</div>
				<div class="m-pagecontent">
					<ul class="m-activitydetail">
						<li>
							<div class="paperblock">
								<p class="detail">活动详情</p>
							</div>
							<div class="papercontent">
								<p class="c-content" id="activityContent0"></p>
							</div>
						</li>
						<li v-if="guestsShow">
							<div class="paperblock">
								<p class="guest">活动嘉宾</p>
							</div>
							<div class="papercontent" @mouseleave="guesthoverparenthide()">
								<div class="swiper-area">
									<swiper class="swiper" :options="Option">
										<swiper-slide v-for="(item,index) in activityData.guests" :key="item">
											<img class="pic" :src="item.pic?item.pic:'http://huicye.image.alimmdn.com/FED/huicye-dreamtown/body-icon.png'" />
											<p class="name">{{item.name}}</p>
											<p class="position" v-if="item.company == '' && item.job == ''">未填写</p>
											<p class="position" v-else>{{item.company}}{{item.job}}</p>
											<div class="mousehandle" @mouseenter="guestinfoshow(index)"></div>
											<div class="mask" v-if="nowguestindex == index">
												<p class="info"></p>
											</div>
										</swiper-slide>
									</swiper>
									<div v-if="swiperBtnShow">
										<div class="swiper-button-prev"></div>
										<div class="swiper-button-next"></div>
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
							</div>
						</li>
						<li v-if="processShow">
							<div class="paperblock">
								<p class="process">活动流程</p>
							</div>
							<div class="papercontent">
								<dl class="process-area">
									<dt v-for="(item, index) in activityData.process">
										<div class="line"></div>
										<div class="item">
											<p class="process-time f-fl">{{item.start}}-{{item.end}}</p>
											<p class="process-content f-fl">{{item.content}}</p>
										</div>
									</dt>
								</dl>
							</div>
						</li>
					</ul>
					<div class="conbottom">
						<button class="goback hbtn" @click="goback">返回</button>
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
export default {
	name: 'activitypreview',
	data() {
		return {
			activityData: {},
			infoShowMore: false,
			contentShow: false,
			guestsShow: true,
			swiperBtnShow: true,
			processShow: true,
			nowguestindex: '-1',
			enrollList: [],
			Option: {
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				watchSlidesProgress: true,
				watchSlidesVisibility: true,
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
		}
	},
	methods: {
		toggleContent() {
			this.contentShow = !this.contentShow;
		},
		toggelProcess() {
			this.processMore = !this.processMore;
		},
		goback() {
			let id = location.pathname.split('/')[5];
			this.$router.push({ path: '/nav1/active/activityedit/' + id });
		},
		guestinfoshow(index) {
			this.nowguestindex = index;
		},
		guesthoverparenthide() {
			this.nowguestindex = '-1';
		},
		getActivityDetail() {
			let id = location.pathname.split('/')[5];
			activityApi.activity.postDetail({ id: id }).then(res => {
				this.activityData = res.data;
				if (this.activityData.keywords) {
					this.activityData.keywords = this.activityData.keywords;
				} else {
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
				if (startOfActivityYear !== endOfActivityYear) {
					this.activityData.timeOfActivity = functionApi.moment.getYMDHMTime(this.activityData.startOfActivity) + ' ~ ' + functionApi.moment.getYMDHMTime(this.activityData.endOfActivity);
				} else {
					if (startOfActivityMonth == endOfActivityMonth && startOfActivityDay == endOfActivityDay) {
						this.activityData.timeOfActivity = functionApi.moment.getMDHMTime(this.activityData.startOfActivity) + ' ~ ' + functionApi.moment.getHMTime(this.activityData.endOfActivity);
					} else {
						this.activityData.timeOfActivity = functionApi.moment.getMDHMTime(this.activityData.startOfActivity) + ' ~ ' + functionApi.moment.getMDHMTime(this.activityData.endOfActivity);
					}
				}

				const startOfEnrollmentYear = functionApi.moment.getYear(this.activityData.startOfEnrollment);
				const startOfEnrollmentMonth = functionApi.moment.getMonth(this.activityData.startOfEnrollment);
				const startOfEnrollmentDay = functionApi.moment.getDay(this.activityData.startOfEnrollment);
				const endOfEnrollmentYear = functionApi.moment.getYear(this.activityData.endOfEnrollment);
				const endOfEnrollmentMonth = functionApi.moment.getMonth(this.activityData.endOfEnrollment);
				const endOfEnrollmentDay = functionApi.moment.getDay(this.activityData.endOfEnrollment);
				if (startOfEnrollmentYear !== endOfEnrollmentYear) {
					this.activityData.timeOfEnrollment = functionApi.moment.getYMDHMTime(this.activityData.startOfEnrollment) + ' ~ ' + functionApi.moment.getYMDHMTime(this.activityData.endOfEnrollment);
				} else {
					if (startOfEnrollmentMonth == endOfEnrollmentMonth && startOfEnrollmentDay == endOfEnrollmentDay) {
						this.activityData.timeOfEnrollment = functionApi.moment.getMDHMTime(this.activityData.startOfEnrollment) + ' ~ ' + functionApi.moment.getHMTime(this.activityData.endOfEnrollment);
					} else {
						this.activityData.timeOfEnrollment = functionApi.moment.getMDHMTime(this.activityData.startOfEnrollment) + ' ~ ' + functionApi.moment.getMDHMTime(this.activityData.endOfEnrollment);
					}
				}
				if (this.activityData.location) {
					this.activityData.location = this.activityData.location.province + ' · ' + this.activityData.location.city + ' · ' + this.activityData.location.area;
				}

				if (this.activityData.sponsor) {
					this.activityData.sponsor = this.activityData.sponsor.join('，');
				}

				if (this.activityData.coSponsor && this.activityData.coSponsor.length > 0) {
					this.activityData.coSponsor = this.activityData.coSponsor.join('，');
				} else {
					this.activityData.coSponsor = '未填写';
				}

				$('#activityContent0').load(this.activityData.content + ' article');
				if (this.activityData.guests && this.activityData.guests.length == 0) {
					this.guestsShow = false;
				}
				if (this.activityData.guests && this.activityData.guests.length <= 5) {
					this.swiperBtnShow = false;
				}
				if (this.activityData.process && this.activityData.process.length == 0) {
					this.processShow = false;
				}
			})
		}
	},
	mounted() {
		this.getActivityDetail();
	}
}
</script>

<style lang="scss" scoped>
.activitypreview {
	.g-section {
		width: 1000px;
		margin: 0 auto;
		padding: 25px 0;
		.m-title {
			height: 16px;
			.line {
				width: 5px;
				height: 16px;
				border-radius: 5px;
				background: #5771e6;
				margin-right: 9px;
			}
			.name {
				font-size: 16px;
				color: #3b4857;
				font-weight: bold;
				line-height: 16px;
			}
		}
		.m-detailwrap {
			margin-top: 30px;
			border-radius: 6px;
			.m-top {
				width: 998px;
				background: #fff;
				margin: 0 auto;
				border-radius: 6px;
				box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
				border: 1px solid #e3e9ee;
				.m-section {
					position: relative;
					padding: 29px;
					.m-img {
						position: relative;
						.cover {
							width: 183px;
							height: 251px;
						}
						.tag {
							position: absolute;
							top: -7px;
							left: -7px;
							z-index: 99;
						}
					}
					.content {
						margin-left: 30px;
						text-align: left;
						h3 {
							font-size: 24px;
							color: #3b4857;
							max-height: 80px;
							line-height: 40px;
							font-weight: bold;
							max-width: 660px;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
						}
						.keywords {
							margin: 25px 0 45px 0;
							span {
								font-size: 14px;
								color: #c51e60;
								padding: 6px 15px;
								background: #fbeff4;
								border: 1px solid #c51e60;
								border-radius: 8px;
								margin-right: 7px;
							}
						}
						.time,
						.address,
						.sponsor {
							font-size: 14px;
							color: #3b4857;
							line-height: 22px;
							margin-bottom: 18px;
							max-width: 680px;
							.pos {
								display: inline-block;
								font-size: 12px;
								font-style: normal;
								color: #475469;
								width: 50px;
								height: 22px;
								text-align: center;
								margin-right: 10px;
								background: url(../../images/activity-detail-tag.png) no-repeat;
							}
							.sign {
								color: #5771e6;
								font-weight: normal;
							}
							.a-time {
								margin-right: 30px;
							}
						}
						.indent {
							position: relative;
							padding-left: 60px;
							max-width: 620px;
							.pos {
								position: absolute;
								left: 0;
								top: 0;
							}
						}
					}
					.load-down {
						position: absolute;
						left: 50%;
						margin-left: -10px;
						bottom: 16px;
						width: 20px;
						height: 10px;
						cursor: pointer;
						background: url('../../images/activityIcon.png') no-repeat 0 -85px;
						&.load-up {
							background-position: 0 -301px;
						}
					}
				}
			}
			.m-pagecontent {
				width: 998px;
				margin-top: 20px;
				box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
				border: 1px solid #e3e9ee;
				border-radius: 6px;
				overflow: hidden;
				.m-activitydetail {
					li {
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
								background: url('../../images/activityIcon.png') no-repeat;
								padding-left: 50px;
								&.detail {
									background-position: 27px -96px;
								}
								&.guest {
									background-position: 27px -119px;
								}
								&.process {
									background-position: 27px -142px;
								}
								&.number {
									background-position: 27px -164px;
								}
								&.comments {
									background-position: 27px -187px;
								}
							}
						}
						.papercontent {
							position: relative;
							background: #fff;
							.c-detail {
								padding: 20px 50px 35px 50px;
								font-size: 16px;
								color: #8a929a;
								text-align: justify;
								line-height: 35px;
							}
							.c-content {
								padding: 20px 50px 35px 50px;
								line-height: 1.8;
								text-align: justify;
							}
							.load-down {
								position: absolute;
								left: 50%;
								margin-left: -10px;
								bottom: 16px;
								width: 20px;
								height: 10px;
								cursor: pointer;
								background: url('../../images/activityIcon.png') no-repeat 0 -85px;
							}
							.load-up {
								position: absolute;
								left: 50%;
								margin-left: -10px;
								bottom: 16px;
								width: 20px;
								height: 10px;
								cursor: pointer;
								background: url('../../images/activityIcon.png') no-repeat 0 -301px;
							}
							.swiper-area {
								padding: 30px 50px 40px 50px;
								.pic {
									display: block;
									width: 140px;
									height: 190px;
								}
								.name {
									font-size: 16px;
									line-height: 36px;
									color: #3b4857;
									width: 140px;
									text-align: center;
									margin-top: 10px;
								}
								.position {
									font-size: 12px;
									line-height: 12px;
									color: #99a9be;
									width: 140px;
									text-align: center;
								}
								.swiper-slide {
									position: relative;
									height: 280px;
									.mask {
										position: absolute;
										bottom: 0;
										left: 0;
										width: 140px;
										height: 280px;
										background: url('../../images/guesthover.png') no-repeat center bottom;
									}
									.mousehandle {
										position: absolute;
										bottom: 0;
										left: 0;
										width: 140px;
										height: 280px;
										z-index: 99;
									}
								}
								.swiper-container {
									margin-left: 20px;
								}
								.swiper-button-next,
								.swiper-button-prev {
									top: 130px;
								}
								/*.swiper-button-next{right:0px;}*/
							}
							.guestopenbox {
								width: 790px;
								min-height: 300px;
								border: 4px solid #c0ccda;
								border-radius: 8px;
								margin-top: -4px;
								padding: 50px 54px 50px 49px;
								margin-bottom: 2px;
								.guesthovertop {
									border-bottom: 1px dashed #d5dfe4;
									padding-bottom: 30px;
									span:nth-of-type(1) {
										font-size: 22px;
										font-weight: bold;
										color: #3b4857;
										padding-right: 30px;
									}
									span:nth-of-type(2) {
										font-size: 16px;
										color: #3b4857;
									}
								}
								.guesthoverbot {
									font-size: 16px;
									color: #68737d;
									line-height: 36px;
									padding-top: 20px;
								}
							}
							.process-area {
								padding: 1px 50px 46px 46px;
								.line {
									width: 192px;
									height: 27px;
									border-right: 3px solid #e9ecf2;
								}
								.item {
									border: 1px solid #e9ecf2;
									background: #f8fafb;
									border-radius: 7px;
									padding: 19px 32px;
									overflow: hidden;
									.process-time {
										font-size: 20px;
										color: #aab5c1;
										line-height: 20px;
									}
									.process-content {
										font-size: 16px;
										color: #3b4857;
										line-height: 20px;
										background: url(../../images/activityIcon.png) no-repeat 39px -232px;
										padding-left: 210px;
										width: 442px;
										text-align: justify;
									}
								}
							}
							.person-area {
								padding: 35px 49px 5px 50px;
								overflow: hidden;
								dd {
									position: relative;
									width: 107px;
									float: left;
									margin: 0 71px 25px 0;
									.avatar {
										display: block;
										width: 99px;
										height: 99px;
										border: 4px solid #e9eff2;
										border-radius: 54px;
									}
									.name {
										font-size: 16px;
										line-height: 46px;
										color: #3b4857;
										width: 107px;
										text-align: center;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}
									.mask {
										display: none;
										position: absolute;
										width: 99px;
										height: 99px;
										border-radius: 50px;
										top: 4px;
										left: 4px;
										background: rgba(0, 0, 0, 0.7);
										img {
											position: absolute;
											width: 27px;
											height: 27px;
											top: 50%;
											left: 50%;
											margin-top: -13.5px;
											margin-left: -13.5px;
										}
									}
									&:nth-child(5n) {
										margin-right: 0;
									}
								}
							}
						}
						&:first-child {
							.paperblock {
								border-top: none;
								border-top-left-radius: 6px;
								border-top-right-radius: 6px;
							}
						}
						&:last-child {
							.papercontent {
								border-bottom-left-radius: 6px;
								border-bottom-right-radius: 6px;
							}
						}
					}
				}
				.conbottom {
					width: 100%;
					height: 90px;
					background-color: #fff;
				}
				.goback {
					display: inline-block;
					width: 138px;
					height: 48px;
					font-size: 16px;
					line-height: 48px;
					text-align: center;
					border: 1px solid #ccd4f7;
					border-radius: 5px;
					margin: 0 0 0 430px;
					background: #5771e6;
					color: #fff;
				}
			}
		}
	}
}
</style>