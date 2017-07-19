<template>
	<div class="activitycreate">
		<div class="g-section">
			<p class="m-title f-cb">
				<span class="line f-db f-fl hcl"></span>
				<span class="name f-db f-fl">编辑活动</span>
			</p>
			<div class="m-detailwrap">
				<el-form ref="form" :model="form" :rules="rules" label-width="193px" label="right" class="publishForm">
					<p class="model">基本信息</p>
					<el-form-item label="活动标题" prop="title" style="margin-top:28px;">
						<el-input class="m-ipt" v-model="form.title" placeholder="请填写活动标题"></el-input>
					</el-form-item>
					<el-form-item label="活动地点" required>
						<el-col :span="7" class="m-sipt">
							<el-form-item prop="location">
								<el-cascader class="" expand-trigger="hover" :options="area" v-model="form.location"></el-cascader>
							</el-form-item>
						</el-col>
						<el-col :span="17" class="m-mipt m-left">
							<el-form-item prop="address">
								<el-input v-model="form.address" placeholder="请填写详细地址"></el-input>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-form-item label="开始时间" required>
						<el-col :span="10" class="m-sipt">
							<el-form-item prop="activityStartTimeDate">
								<el-date-picker v-model="form.activityStartTimeDate" type="date" placeholder="年-月-日" :picker-options="pickerOptions"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="10" class="m-sipt m-left">
							<el-form-item prop="activityStartTimeTime">
								<el-time-picker v-model="form.activityStartTimeTime" format="HH:mm" placeholder="时:分">
								</el-time-picker>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-form-item label="结束时间" required>
						<el-col :span="10" class="m-sipt">
							<el-form-item prop="activityEndTimeDate">
								<el-date-picker v-model="form.activityEndTimeDate" type="date" placeholder="年-月-日" :picker-options="pickerOptions"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="10" class="m-sipt m-left">
							<el-form-item prop="activityEndTimeTime">
								<el-time-picker v-model="form.activityEndTimeTime" format="HH:mm" placeholder="时:分">
								</el-time-picker>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-form-item>
						<el-checkbox v-model="form.setEnrollEndTime" label="设置报名截止时间"></el-checkbox>
					</el-form-item>
					<el-form-item label="报名截止时间:" required style="width:855px;" v-if="form.setEnrollEndTime">
						<el-col :span="10" class="m-sipt m-left">
							<el-form-item prop="enrollEndTimeDate">
								<el-date-picker v-model="form.enrollEndTimeDate" type="date" placeholder="年-月-日"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="10" class="m-sipt m-left">
							<el-form-item prop="enrollEndTimeTime">
								<el-time-picker v-model="form.enrollEndTimeTime" format="HH:mm" placeholder="时:分">
								</el-time-picker>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-form-item label="活动海报" prop="coverImg" required style="height:386px;">
						<el-row>
							<input type="file" @change="onFileChange" id="coverImg" class="hide" />
							<div class="thumbset">
								<div class="thumbImg">
									<a href="javascript:void(0)" class="reselect" v-if="form.coverImg !== ''" @click="clearthumb('coverImg')">×</a>
									<img :src="form.coverImg" />
								</div>
								<div class="thumb-uploader-icon">
									<img class="icon" src="../../images/uploadIcon.png" />
								</div>
							</div>
							<div class="upload f-cb">
								<a href="javascript:void(0)" class="m-btn" @click="uploadthumb('coverImg')">上传
									<img src="http://huicye.image.alimmdn.com/FED/huicye-webadvance/upload.png" />
								</a>
								<a href="javascript:void(0)" class="poster">没有准备海报?可选择
									<span @click="imageDialogVisible = true" class="hfcl">精选海报</span>
								</a>
							</div>
							<div class="m-tip">点击“上传”选择图片，图片必须为 jpg、gif、png、bmp 格式，
								<br>尺寸200px*280px</div>
						</el-row>
						<el-dialog title="选择一张图片作为海报：" v-model="imageDialogVisible" size="small" style="min-width:672px;">
							<div class="posterContent">
								<ul>
									<li v-for="(item, index) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]">
										<a href="javascript:void(0)" :id="'poster' + index" @click="choosePoster(index)">
											<img :src="'http://121.196.233.212:3001/images/activityCover/'+ item +'.png'" />
										</a>
									</li>
								</ul>
							</div>
							<span slot="footer" class="dialog-footer">
								<el-button type="primary" @click="surePoster">确 定</el-button>
								<el-button @click="imageDialogVisible = false">取消</el-button>
							</span>
						</el-dialog>
					</el-form-item>
					<el-form-item label="活动人数" prop="num" required id="activityNum">
						<el-input class="m-num" v-model="form.num" :disabled="form.numLimit" style="float:left;"></el-input>
						<el-checkbox class="m-left" v-model="form.numLimit" @change="formNumErr">不限制</el-checkbox>
					</el-form-item>
					<el-form-item label="活动主题" prop="subject" required>
						<el-select class="m-sipt" v-model="form.subject" placeholder="请选择" :options="form.subject">
							<el-option v-for="(item, index) in activitySubject" :label="item" :value="item" :key="index"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="活动形式" prop="pattern" required>
						<el-select class="m-sipt" v-model="form.pattern" placeholder="请选择">
							<el-option v-for="(item, index) in activityPattern" :label="item" :value="item" :key="index"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="主办单位" prop="sponsorTags" required>
						<el-tag :key="tag" v-for="tag in form.sponsorTags" :closable="true" :close-transition="false" @close="handleClose(tag, 'sponsorTags')">{{tag}}</el-tag>
						<el-input class="m-sipt" v-if="sponsorInput" v-model="sponsorInputValue" ref="sponsorInput" @keyup.enter.native="handleSponsorInput" @blur="handleSponsorInput"></el-input>
						<el-button v-else @click="showInput('sponsorInput')">+新增主办单位</el-button>
					</el-form-item>
					<el-form-item label="协办单位" id="coDisable" hidden>
						<!-- <el-tag :key="tag" v-for="tag in form.coSponsorTags" :closable="true" :close-transition="false" @close="handleClose(tag, 'coSponsorTags')">{{tag}}</el-tag> -->
						<el-input class="m-sipt" v-if="coSponsorInput" v-model="coSponsorInputValue" ref="coSponsorInput" @keyup.enter.native="handleCoSponsorInput" @blur="handleCoSponsorInput"></el-input>
						<!-- <el-button v-else @click="showInput('coSponsorInput')">+新增协办单位</el-button> -->
						<el-button v-else>+新增协办单位</el-button>
					</el-form-item>
					<el-form-item label="活动详情" style="width:883px;height:268px;" prop='content' required>
						<div id="activityContent" style="height:260px;"></div>
					</el-form-item>
					<el-form-item label="活动嘉宾">
						<el-col :span="4" class="guestsuploadimg">
							<input type="file" @change="onFileChange" id="guestAvatar" class="hide" />
							<div class="thumbset">
								<div class="thumbImg">
									<a href="javascript:void(0)" class="reselect" v-if="form.guestAvatar !== ''" @click="clearthumb('guestAvatar')">×</a>
									<img class="guestAvatar" :src="form.guestAvatar" />
								</div>
								<div class="thumb-uploader-icon guest-icon">
									<img class="icon" src="../../images/uploadIcon.png" />
								</div>
							</div>
							<div class="upload f-cb">
								<a href="javascript:void(0)" class="m-btn" @click="uploadthumb('guestAvatar')">上传
									<span class="size">(140px*190px)</span>
									<img class="guestImg" src="http://huicye.image.alimmdn.com/FED/huicye-webadvance/upload.png" />
								</a>
							</div>
						</el-col>
						<el-col :span="18" class="guest-info m-left">
							<el-row>
								<el-col :span="7" class="s-ipt">
									<el-input v-model="form.guestName" placeholder="请填写姓名"></el-input>
								</el-col>
								<el-col :span="7" class="s-ipt m-left">
									<el-input v-model="form.guestPosition" placeholder="请填写职位"></el-input>
								</el-col>
								<el-col :span="7" class="s-lipt m-left">
									<el-input v-model="form.guestCompany" placeholder="请填写单位简称"></el-input>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="23" class="s-textarea">
									<el-input :rows="8" type="textarea" v-model="form.guestInfo" placeholder="请填写嘉宾简介"></el-input>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="2" class="guest-save m-left">
							<a class="btn" href="javascript:void(0)" @click="addGuest()">保存</a>
						</el-col>
					</el-form-item>
					<el-form-item v-for="(guest, index) in guestLists" :key="guest">
						<div class="guestLists f-cb">
							<div class="guestimg f-fl">
								<img :src="guest.pic" />
							</div>
							<div class="guestinfo f-fl">
								<p class="name">{{guest.name}}</p>
								<div class="info f-cb">
									<p class="position f-fl" v-if="guest.job != ''">
										<i class="icon1"></i>{{guest.job}}</p>
									<p class="position f-fl" v-else>
										<i class="icon1"></i>未填写</p>
									<p class="company f-fl" v-if="guest.company != ''">
										<i class="icon2"></i>{{guest.company}}</p>
									<p class="company f-fl" v-else>
										<i class="icon2"></i>未填写</p>
								</div>
								<div class="summary">{{guest.info}}</div>
								<div class="option">
									<a href="javascript:void(0)" class="edit" @click="modifyGuest(index)">编辑</a>
									<a href="javascript:void(0)" class="delete" @click="deleteGuest(index)">删除</a>
								</div>
							</div>
						</div>
						<el-dialog size="guestDialog" v-model="guestModifyDialog">
							<el-form class="guest-form">
								<el-form-item label="活动嘉宾">
									<el-col :span="4" class="guestsuploadimg">
										<input type="file" @change="onFileChange" id="guestAvatar0" class="hide" />
										<div class="thumbset">
											<div class="thumbImg">
												<a href="javascript:void(0)" class="reselect" v-if="form.guestAvatar0 !== ''" @click="clearthumb('guestAvatar0')">×</a>
												<img class="guestAvatar" :src="form.guestAvatar0" />
											</div>
											<div class="thumb-uploader-icon guest-icon">
												<img class="icon" src="../../images/uploadIcon.png" />
											</div>
										</div>
										<div class="upload f-cb">
											<a href="javascript:void(0)" class="m-btn" @click="uploadthumb('guestAvatar0')">上传
												<span class="size">(140px*190px)</span>
												<img class="guestImg" src="../../images/upload.png" />
											</a>
										</div>
									</el-col>
									<el-col :span="18" class="guest-info m-left">
										<el-row>
											<el-col :span="7" class="s-ipt">
												<el-input v-model="form.guestName0" placeholder="请填写姓名"></el-input>
											</el-col>
											<el-col :span="7" class="s-ipt m-left">
												<el-input v-model="form.guestPosition0" placeholder="请填写职位"></el-input>
											</el-col>
											<el-col :span="7" class="s-lipt m-left">
												<el-input v-model="form.guestCompany0" placeholder="请填写单位简称"></el-input>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="23" class="s-textarea">
												<el-input :rows="8" type="textarea" v-model="form.guestInfo0" placeholder="请填写嘉宾简介"></el-input>
											</el-col>
										</el-row>
									</el-col>
								</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer f-cb">
								<div class="sure-btn f-fl hbtn" @click="modifyGuestSure">确 定</div>
								<div class="cancel-btn f-fl hcbtn" @click="guestModifyDialog = false">取消</div>
							</div>
						</el-dialog>
					</el-form-item>
					<el-form-item label="活动流程" style="height:36px;overflow: hidden;">
						<div class="m-process f-cb">
							<div class="f-fl">
								<el-time-picker class="process-start" v-model="form.processStarttime" format="HH:mm" placeholder="时:分"></el-time-picker>
							</div>
							<div class="process-line f-fl">-</div>
							<div class="f-fl">
								<el-time-picker class="process-end" v-model="form.processEndtime" format="HH:mm" :picker-options="{minTime:form.processStarttime}" placeholder="时:分"></el-time-picker>
							</div>
							<div class="process-content f-fl m-left">
								<el-input v-model="form.processContent"></el-input>
							</div>
							<div class="process-save f-fl m-left">
								<a class="btn" href="javascript:void(0)" @click="addProcess()">保存</a>
							</div>
						</div>
					</el-form-item>
					<el-form-item v-for="(item, index) in processLists" :key="item">
						<div class="m-process-list f-cb">
							<div class="time f-fl">{{item.start}}-{{item.end}}</div>
							<div class="content f-fl">{{item.content}}</div>
							<div class="option f-fl">
								<a class="edit" href="javascript:void(0)" @click="modifyProcess(index)">编辑</a>
							</div>
							<a href="javascript:void(0)" class="delete" @click="deleteProcess(index)"></a>
						</div>
						<el-dialog size="small" v-model="processModifyDialog">
							<el-form>
								<el-form-item>
									<div class="m-process f-cb edi-process">
										<div class="f-fl">
											<el-time-picker class="process-start" v-model="form.processStarttime0" format="HH:mm" placeholder="时:分"></el-time-picker>
										</div>
										<div class="process-line f-fl">-</div>
										<div class="f-fl">
											<el-time-picker class="process-end" v-model="form.processEndtime0" format="HH:mm" :picker-options="{minTime:form.processStarttime0}" placeholder="时:分"></el-time-picker>
										</div>
										<div class="process-content f-fl m-left">
											<el-input v-model="form.processContent0"></el-input>
										</div>
									</div>
								</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer f-cb">
								<div class="sure-btn f-fl hbtn" @click="modifyProcessSure">确 定</div>
								<div class="cancel-btn f-fl hcbtn" @click="processModifyDialog = false">取消</div>
							</div>
						</el-dialog>
					</el-form-item>
					<el-form-item label="活动联系人" prop="contact" required>
						<el-input class="m-siptx" v-model="form.contact" placeholder="请填写此活动联系人姓名"></el-input>
					</el-form-item>
					<el-form-item label="联系方式" prop="phonenumber" required>
						<el-input class="m-siptx" v-model="form.phonenumber" placeholder="请填写此活动联系人电话"></el-input>
					</el-form-item>
					<p class="model b-top">报名表单</p>
					<div class="m-enrollform">
						<div class="sign-item f-cb" v-for="item in enrollform">
							<div class="name f-fl">
								<el-form-item :label="item.label" required></el-form-item>
							</div>
							<div class="ipt f-fl">
								<el-input :placeholder="item.placeholder" disabled></el-input>
							</div>
							<div class="check m-left f-fl">
								<el-checkbox v-model="item.require" disabled></el-checkbox>
								<span>&nbsp;必填</span>
							</div>
						</div>
					</div>
					<p class="model b-top">活动设置</p>
					<el-form-item label="活动类型" class="m-cost" prop="cost" required>
						<el-radio-group v-model="form.cost">
							<el-radio label="0">免费活动</el-radio>
							<el-radio label="1">收费活动</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item class="m-cost-tip" label="">
						<p class="tip">暂不支持线上收款，如是收费活动请在活动详情注明收费方式。</p>
					</el-form-item>
					<el-form-item class="m-privacy" label="隐私设置">
						<el-checkbox v-model="form.privacy">设为私密活动</el-checkbox>
					</el-form-item>
					<el-form-item class="m-cost-tip">
						<p class="tip">本活动为内部活动，将不会在【梦想小镇】网站公开展示</p>
					</el-form-item>
					<div class="bottom-btn">
						<a href="javascript:void(0)" class="btn hcbtn" @click.prevent="onSubmit">立即发布</a>
						<a href="javascript:void(0)" class="btn hcbtn" @click.prevent="onSubmit">存为草稿</a>
						<a href="javascript:void(0)" class="btn hcbtn" @click.prevent="onSubmit">预览</a>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import activityApi from '@/js/api.js';
import areaList from '@/js/area.js';
import functionApi from '@/js/function.js';
import axios from 'axios';
import $ from 'jquery';
export default {
	name: 'activitypublish',
	data() {
		var validateDate = (rule, value, callback) => {
			var startOfActivity = functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(this.form.activityStartTimeDate) + ' '
				+ functionApi.moment.getHMTime(this.form.activityStartTimeTime));
			var endOfActivity = functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(this.form.activityEndTimeDate) + ' ' + functionApi.moment.getHMTime(this.form.activityEndTimeTime));
			var startOfActivityUnix = functionApi.moment.getUnix(startOfActivity);
			var endOfActivityUnix = functionApi.moment.getUnix(endOfActivity);
			console.log(startOfActivityUnix);
			console.log(endOfActivityUnix);
			if (this.form.activityStartTimeDate != '' && this.form.activityStartTimeTime != '' && this.form.activityEndTimeDate != '' && this.form.activityEndTimeTime != '' && startOfActivityUnix >= endOfActivityUnix) {
				callback(new Error('结束时间要晚于开始时间'));
			} else {
				callback();
			}
		};
		var validateEnroll = (rule, value, callback) => {
			var startOfActivity = functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(this.form.activityStartTimeDate) + ' '
				+ functionApi.moment.getHMTime(this.form.activityStartTimeTime));
			var enrollOfActivity = functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(this.form.enrollEndTimeDate) + ' '
				+ functionApi.moment.getHMTime(this.form.enrollEndTimeTime));

			var startOfActivityUnix = functionApi.moment.getUnix(startOfActivity);
			var enrollOfActivityUnix = functionApi.moment.getUnix(enrollOfActivity);
			if (this.form.activityStartTimeDate != '' && this.form.activityStartTimeTime != '' && this.form.enrollEndTimeDate != '' && this.form.enrollEndTimeTime != '' && startOfActivityUnix < enrollOfActivityUnix) {
				callback(new Error('报名截止时间要早于活动开始时间'));
			} else {
				callback();
			}
		};
		var validateNum = (rule, value, callback) => {
			if (this.form.numLimit == true) {
				callback();
			} else {
				if (!value) {
					callback(new Error('请填写活动人数，或选择不限制活动人数'))
				} else {
					if (!(/^[1-9]\d*$/.test(value))) {
						callback(new Error('请输入正整数'));
					} else {
						callback();
					}
				}
			}
		};
		var validatePhone = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入手机号'));
			} else if (!value.match(/^13\d{9}$|^14\d{9}$|^15\d{9}$|^16\d{9}$|^17\d{9}$|^18\d{9}$/) && !value.match(/^\d{3}-\d{8}|\d{4}-\d{7}$/)) {
				callback(new Error('请输入正确格式的电话或手机号'));
			} else {
				callback();
			}
		};
		return {
			activityId: location.pathname.split('/')[4],
			enrollform: [
				{ name: 'name', label: '姓名', need: true, require: true, placeholder: '报名者的昵称或真实姓名' },
				{ name: 'company', label: '公司', need: true, require: true, placeholder: '报名者的工作单位' },
				{ name: 'phone', label: '电话', need: true, require: true, placeholder: '报名者的手机号码' }
			],
			form: {
				title: '',
				location: [],
				address: '',
				activityStartTimeDate: '',
				activityStartTimeTime: '',
				activityEndTimeDate: '',
				activityEndTimeTime: '',
				setEnrollEndTime: false,
				enrollEndTimeDate: '',
				enrollEndTimeTime: '',
				coverImg: '',
				num: '',
				numLimit: false,
				subject: '',
				pattern: '',
				sponsorTags: [],
				coSponsorTags: [],
				content: '',
				guestAvatar: '',
				guestName: '',
				guestCompany: '',
				guestPosition: '',
				guestInfo: '',
				guestAvatar0: '',
				guestName0: '',
				guestCompany0: '',
				guestPosition0: '',
				guestInfo0: '',
				processStarttime: '',
				processEndtime: '',
				processContent: '',
				processStarttime0: '',
				processEndtime0: '',
				processContent0: '',
				contact: '',
				phonenumber: '',
				cost: '0',
				privacy: false
			},
			temp: {
				content: ''
			},
			rules: {
				title: [
					{ required: true, message: '请输入活动标题', trigger: 'blur' }
				],
				location: [
					{ type: 'array', required: true, message: '请选择省/市', trigger: 'change' }
				],
				activityStartTimeDate: [
					{ type: 'date', required: true, message: '请选择活动开始日期', trigger: 'change' }
				],
				activityStartTimeTime: [
					{ type: 'date', required: true, message: '请选择活动开始时刻', trigger: 'change' }
				],
				activityEndTimeDate: [
					{ type: 'date', required: true, message: '请选择活动结束日期', trigger: 'change' }
				],
				activityEndTimeTime: [
					{ type: 'date', required: true, message: '请选择活动结束时刻', trigger: 'change' },
					{ validator: validateDate, trigger: 'blur, change' }
				],
				address: [
					{ required: true, message: '请填写详细地址', trigger: 'blur' }
				],
				enrollEndTimeDate: [
					{ type: 'date', required: true, message: '请选择报名截止日期', trigger: 'change' }
				],
				enrollEndTimeTime: [
					{ type: 'date', required: true, message: '请选择报名截止时刻', trigger: 'change' },
					{ validator: validateEnroll, trigger: 'blur, change' }
				],
				coverImg: [
					{ required: true, message: '请上传海报', trigger: 'change' }
				],
				num: [
					{ validator: validateNum, trigger: 'blur' }
				],
				subject: [
					{ required: true, message: '请选择活动主题', trigger: 'change' }
				],
				pattern: [
					{ required: true, message: '请选择活动形式', trigger: 'change' }
				],
				sponsorTags: [
					{ type: 'array', required: true, message: '请添加主办单位', trigger: 'blur' }
				],
				content: [
					{ required: true, message: '活动详情不能为空！', trigger: 'blur' }
				],
				contact: [
					{ required: true, message: '活动联系人不能为空！', trigger: 'blur' }
				],
				phonenumber: [
					{ validator: validatePhone, trigger: 'blur' }
				],
				cost: [
					{ required: true, message: '请选择活动类型！', trigger: 'change' }
				]
			},
			area: [],
			activityArea: [],
			uploadUrl: '',
			imageDialogVisible: false,
			activitySubject: ['创业', '金融', '互联网', '科技', '教育', '运动', '公益', '营销', '音乐', '电影', '读书', '时尚', '健康', '职场', '艺术', '旅行'],
			activityPattern: ['会议', '课程', '论坛', '讲座', '沙龙', '派对', '聚会', '展览', '分享会', '发布会'],
			sponsorInput: false,
			sponsorInputValue: '',
			coSponsorInput: false,
			coSponsorInputValue: '',
			guestLists: [],
			processLists: [],
			processModifyDialog: false,
			guestModifyDialog: false,
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() < Date.now() - 8.64e7;
				}
			}
		}
	},
	methods: {
		getArea() {
			this.area = areaList().area;
			for (let i = 0; i < this.area.length; i++) {
				this.area[i].value = this.area[i].label;
				for (let j = 0; j < this.area[i].children.length; j++) {
					this.area[i].children[j].value = this.area[i].children[j].label;
					this.area[i].children[j].children = '';
				}
			}
		},
		setContent(html, text) {
			this.form.content = html;
			this.temp.content = text;
		},
		onFileChange(e) {
			var files = e.target.files || e.dataTransfer.files;
			var fileObj = files[0];
			var vm = this;
			var name = e.target.getAttribute('id');
			functionApi.upload(e,'activityfile',function(percent, result){
				console.log(result);
				vm.form[name] = result.url;
			});
		},
		formNumErr() {
			var errorEL = $('#activityNum').find('.el-form-item__error');
			if (errorEL) {
				if (errorEL.is(':hidden')) {
					errorEL.show();
				} else {
					errorEL.hide();
				}
			}
		},
		uploadthumb(imgId) {
			var fileInput = document.getElementById(imgId);
			document.getElementById(imgId).value = '';
			fileInput.click();
		},
		clearthumb(imgSrc) {
			var vm = this;
			vm.form[imgSrc] = '';
		},
		choosePoster(index) {
			for (let i = 0; i < 16; i++) {
				document.getElementById('poster' + i).removeAttribute('class');
			}
			document.getElementById('poster' + index).setAttribute('class', 'select');
			localStorage.setItem('posterIndex', index);
		},
		surePoster() {
			this.imageDialogVisible = false;
			let index = localStorage.getItem('posterIndex');
			this.form.coverImg = 'http://121.196.233.212:3001/images/activityCover/' + index + '.png';
		},
		handleClose(tag, tags) {
			this.form[tags].splice(this.form[tags].indexOf(tag), 1);
		},
		showInput(input) {
			this[input] = true;
			this.$nextTick(_ => {
				this.$refs[input].$refs.input.focus();
			});
		},
		handleSponsorInput() {
			let sponsorInputValue = this.sponsorInputValue;
			if (sponsorInputValue) {
				this.form.sponsorTags.push(sponsorInputValue);
			}
			this.sponsorInput = false;
			this.sponsorInputValue = '';
		},
		handleCoSponsorInput() {
			let coSponsorInputValue = this.coSponsorInputValue;
			if (coSponsorInputValue) {
				this.form.coSponsorTags.push(coSponsorInputValue);
			}
			this.coSponsorInput = false;
			this.coSponsorInputValue = '';
		},
		addGuest() {
			var vm = this;
			if (vm.form.guestName.replace(/\s/g, "").length == 0 || vm.form.guestInfo.replace(/\s/g, "").length == 0) {
				this.$message.error('嘉宾图像、姓名、简介为必填项');
				return;
			}
			if (vm.form.guestAvatar !== '' && vm.form.guestName !== '' && vm.form.guestInfo !== '') {
				var list = {
					pic: vm.form.guestAvatar,
					name: vm.form.guestName,
					company: vm.form.guestCompany,
					job: vm.form.guestPosition,
					info: vm.form.guestInfo
				};
				vm.guestLists.push(list);
				vm.form.guestAvatar = '';
				vm.form.guestName = '';
				vm.form.guestCompany = '';
				vm.form.guestPosition = '';
				vm.form.guestInfo = '';
			} else {
				this.$message.error('嘉宾图像、姓名、简介为必填项');
				return false;
			}
		},
		modifyGuest(index) {
			let vm = this;
			localStorage.setItem('guestIndex', index);
			vm.form.guestAvatar0 = vm.guestLists[index].pic;
			vm.form.guestName0 = vm.guestLists[index].name;
			vm.form.guestCompany0 = vm.guestLists[index].company;
			vm.form.guestPosition0 = vm.guestLists[index].job;
			vm.form.guestInfo0 = vm.guestLists[index].info;
			this.guestModifyDialog = true;
		},
		modifyGuestSure() {
			let vm = this;
			const index = localStorage.getItem('guestIndex');
			if (vm.form.guestAvatar0 !== '' && vm.form.guestName0 !== '' && vm.form.guestInfo0 !== '') {
				vm.guestLists[index].pic = vm.form.guestAvatar0;
				vm.guestLists[index].name = vm.form.guestName0;
				vm.guestLists[index].company = vm.form.guestCompany0;
				vm.guestLists[index].job = vm.form.guestPosition0;
				vm.guestLists[index].info = vm.form.guestInfo0;
				this.guestModifyDialog = false;
			} else {
				this.$message.error('嘉宾图像、姓名、简介为必填项');
				return false;
			}
		},
		deleteGuest(index) {
			let vm = this;
			vm.guestLists.splice(index, 1);
		},
		addProcess() {
			let vm = this;
			let starttime = functionApi.moment.getUnix(vm.form.processStarttime);
			let endtime = functionApi.moment.getUnix(vm.form.processEndtime);
			if (vm.form.processStarttime !== '' && vm.form.processEndtime !== '' && vm.form.processContent !== '' && starttime < endtime) {
				var list = {
					start: functionApi.moment.getHMTime(vm.form.processStarttime),
					end: functionApi.moment.getHMTime(vm.form.processEndtime),
					content: vm.form.processContent
				};
				vm.processLists.push(list);
				vm.form.processStarttime = '';
				vm.form.processEndtime = '';
				vm.form.processContent = '';
			} else if (vm.form.processStarttime !== '' && vm.form.processEndtime !== '' && vm.form.processContent !== '' && starttime >= endtime) {
				this.$message.error('结束时间要晚于开始时间');
				return false;
			} else {
				this.$message.error('请填写完整的活动流程');
				return false;
			}
		},
		modifyProcess(index) {
			let vm = this;
			localStorage.setItem('processIndex', index);
			vm.form.processStarttime0 = functionApi.moment.toGMTFormate('2017-05-02 ' + vm.processLists[index].start);
			vm.form.processEndtime0 = functionApi.moment.toGMTFormate('2017-05-02 ' + vm.processLists[index].end);
			vm.form.processContent0 = vm.processLists[index].content;
			this.processModifyDialog = true;
		},
		modifyProcessSure() {
			let vm = this;
			const index = localStorage.getItem('processIndex');
			let starttime = functionApi.moment.getUnix(vm.form.processStarttime0);
			let endtime = functionApi.moment.getUnix(vm.form.processEndtime0);
			if (vm.form.processStarttime0 !== '' && vm.form.processEndtime0 !== '' && vm.form.processContent0 !== '' && starttime < endtime) {
				vm.processLists[index].start = functionApi.moment.getHMTime(vm.form.processStarttime0);
				vm.processLists[index].end = functionApi.moment.getHMTime(vm.form.processEndtime0);
				vm.processLists[index].content = vm.form.processContent0;
				this.processModifyDialog = false;
			} else if (vm.form.processStarttime0 !== '' && vm.form.processEndtime0 !== '' && vm.form.processContent0 !== '' && starttime >= endtime) {
				this.$message.error('结束时间要晚于开始时间');
				return false;
			} else {
				this.$message.error('请填写完整的活动流程');
				return false;
			}
		},
		deleteProcess(index) {
			var vm = this;
			vm.processLists.splice(index, 1);
		},
		onSubmit(e) {
			var quick = this;
			if (this.quickClick) {
				return;
			}
			this.quickClick = true;
			setTimeout(function () {
				quick.quickClick = false;
			}, 2000);
			let vm = this;
			let option = e.target.innerText;
			let postdata = {
				id: location.pathname.split('/')[4],
				title: vm.form.title,
				location: { province: vm.form.location[0], city: vm.form.location[1], area: vm.form.address },
				startOfActivity: functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(vm.form.activityStartTimeDate) + ' ' +
					functionApi.moment.getHMTime(vm.form.activityStartTimeTime)),
				endOfActivity: functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(vm.form.activityEndTimeDate) + ' ' +
					functionApi.moment.getHMTime(vm.form.activityEndTimeTime)),
				endOfEnrollment: vm.form.setEnrollEndTime ? functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(vm.form.enrollEndTimeDate) + ' ' +
					functionApi.moment.getHMTime(vm.form.enrollEndTimeTime)) : functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(vm.form.activityStartTimeDate) + ' ' +
						functionApi.moment.getHMTime(vm.form.activityStartTimeTime)),
				cover: vm.form.coverImg,
				numberOfExpected: vm.form.numLimit ? -1 : vm.form.num,
				subject: vm.form.subject,
				pattern: vm.form.pattern,
				sponsor: vm.form.sponsorTags,
				coSponsor: vm.form.coSponsorTags,
				guests: vm.guestLists,
				process: vm.processLists,
				contact: vm.form.contact,
				phonenumber: vm.form.phonenumber,
				cost: vm.form.cost,
				privacy: vm.form.privacy == true ? '1' : '0',
				brief: vm.temp.content.substring(0, 53),
				verify: '1'
			};
			let activityForm = {};
			for (let i = 0; i < vm.enrollform.length; i++) {
				let name = vm.enrollform[i].name
				activityForm[name] = {
					need: vm.enrollform[i].need == true ? '1' : '0',
					require: vm.enrollform[i].require == true ? '1' : '0',
					placeholder: vm.enrollform[i].placeholder
				}
			}
			postdata.activityForm = activityForm;
			const header = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="edge"/><meta name="renderer" content="webkit"><meta http-equiv="Content-Script-Type" content="text/javascript"/><meta name="format-detection" content="telephone=no"/><meta name="viewport" content="width=device-width,user-scalable=no"><title>Document</title></head><body style="margin:0;"><article>';
			const footer = '</article></body></html>';
			let editorcontent = header + $('.wangEditor-txt')[0].innerHTML + footer;
			let blob = new Blob([editorcontent], { 'type': 'text/html' });
			let formData = new FormData();
			formData.append('upfile', blob, 'uploadfile.html');
			if (option == '立即发布') {
				if (this.form.content == '' && $('.wangEditor-txt')[0].innerText != '') {
					this.form.content = $('.wangEditor-txt')[0].innerText;
				}
				this.$refs['form'].validate((valid) => {
					if (valid) {
						if (!this.temp.content) {
							if ((this.form.content.indexOf('<iframe') == -1 || this.form.content.indexOf('</iframe>') == -1) && (this.form.content.indexOf('<img') == -1) || $('.wangEditor-txt')[0].innerHTML == '') {
								this.$message.error('活动详情不能为空！');
								return;
							}
						}
						axios.post(this.uploadUrl + '?action=uploadHTML', formData).then(res => {
							postdata.content = res.data.url;
							activityApi.activity.postDetailUpdateAndPublish(postdata).then(res => {
								// this.$message.success('成功发布了一个活动!');
								setTimeout(() => {
									window.location.pathname = '/activitycreate/success'
								}, 1000)
							})
						})
					} else {
						this.$message.error('请填写必需的表单信息!');
						return false;
					}
				})
			} else if (option == '存为草稿') {
				delete this.rules.address;
				delete this.rules.enrollEndTimeDate;
				delete this.rules.enrollEndTimeTime;
				delete this.rules.num;
				delete this.rules.subject;
				delete this.rules.pattern;
				delete this.rules.sponsorTags;
				delete this.rules.content;
				delete this.rules.contact;
				delete this.rules.phonenumber;
				delete this.rules.cost;
				delete this.rules.coverImg;
				this.$refs['form'].validate((valid) => {
					if (valid) {
						axios.post(this.uploadUrl + '?action=uploadHTML', formData).then(res => {
							postdata.content = res.data.url;
							activityApi.activity.postDetailUpdate(postdata).then(res => {
								this.$message.success('存为草稿成功!');
								setTimeout(() => {
									window.location.pathname = '/nav1/active/activitylist/draft'
								}, 1000)
							})
						})
					} else {
						this.$message.error('请填写必需的表单信息!');
						return false;
					}
				})
			} else if (option == '预览') {
				axios.post(this.uploadUrl + '?action=uploadHTML', formData).then(res => {
					postdata.content = res.data.url;
					activityApi.activity.postDetailUpdate(postdata).then(res => {
						this.$router.push({ path: '/nav1/active/activityedit/preview/' + res.data.data.id });
					})
				})
			}
		}
	},
	mounted() {
		this.getArea();
		var time = functionApi.moment.getTimeName(new Date());
		activityApi.pub.getUploadUniqueKey().then(res => {
			let self = this;
			self.uploadUrl = res.data.queryURL;
			let editor = new wangEditor('activityContent');
			// editor.config.uploadImgFileName = 'upfile';
			// editor.config.uploadImgUrl = self.uploadUrl + '?action=uploadImg';
			var picurl = 'http://upload.media.aliyun.com/api/proxy/upload?Authorization=UPLOAD_AK_TOP MjM4ODY4MTI6ZXlKa1pYUmxZM1JOYVcxbElqb2lNU0lzSW1sdWMyVnlkRTl1YkhraU9pSXdJaXdpYm1GdFpYTndZV05sSWpvaWFIVnBZM2xsSWl3aVpYaHdhWEpoZEdsdmJpSTZMVEY5Ojc5NWMzMmM5YzRhOWEwN2JjYTkzMmJkMTYxZDE3NzQ2MTcyZWZlYmY&UserAgent=ALIMEDIASDK_WORKSTATION';
			editor.config.uploadImgUrl = picurl;
			//editor.config.uploadImgUrl = self.uploadUrl + '?action=uploadImg';
			editor.config.uploadParams = {
				time:time,
				dir:'activityfile'
			}
			editor.onchange = function () {
				let text = editor.$txt.text().replace(/(^\s*)|(\s*$)/g, ""),
					html = editor.$txt.html();
				self.setContent(html, text);
			};
			editor.create();
			activityApi.activity.postDetail({ id: this.activityId }).then(res => {
				let vm = this;
				console.log(res)
				this.form.title = res.data.title;
				this.form.location = [res.data.location.province, res.data.location.city];
				this.form.address = res.data.location.area;
				this.form.activityStartTimeDate = functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(res.data.startOfActivity));
				this.form.activityStartTimeTime = functionApi.moment.toGMTFormate('2017-05-23' + ' ' + functionApi.moment.getHMTime(res.data.startOfActivity));
				this.form.activityEndTimeDate = functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(res.data.endOfActivity));
				this.form.activityEndTimeTime = functionApi.moment.toGMTFormate('2017-05-23' + ' ' + functionApi.moment.getHMTime(res.data.endOfActivity));
				if (res.data.endOfEnrollment) {
					this.form.setEnrollEndTime = true;
				}
				this.form.enrollEndTimeDate = functionApi.moment.toGMTFormate(functionApi.moment.getDateFormate(res.data.endOfEnrollment));
				this.form.enrollEndTimeTime = functionApi.moment.toGMTFormate('2017-05-23' + ' ' + functionApi.moment.getHMTime(res.data.endOfEnrollment));
				this.form.coverImg = res.data.cover;
				if (res.data.numberOfExpected == -1) {
					this.form.numLimit = true;
				} else {
					this.form.num = res.data.numberOfExpected;
				}
				this.form.subject = res.data.subject;
				this.form.pattern = res.data.pattern;
				this.form.sponsorTags = res.data.sponsor;
				this.form.coSponsorTags = res.data.coSponsor;
				$('#activityContent').load(res.data.content + " article", function () {
					let initHtml = $('article').html();
					let initText = $('article').text();
					vm.setContent(initHtml, initText);
				});
				setTimeout(() => {
					this.guestLists = res.data.guests ? res.data.guests : [];
					if (res.data.process) {
						this.processLists = res.data.process;
					} else {
						this.processLists = [];
					}
				}
					, 1000);
				//this.guestLists = res.data.guests ? res.data.guests : [];
				this.form.contact = res.data.contact;
				this.form.phonenumber = res.data.phonenumber;

				if (res.data.activityForm) {
					this.enrollform = [
						{
							name: 'name',
							label: '姓名',
							need: res.data.activityForm.name.need == '1' ? true : false,
							require: res.data.activityForm.name.require == '1' ? true : false,
							placeholder: res.data.activityForm.name.placeholder
						},
						{
							name: 'phone',
							label: '电话',
							need: res.data.activityForm.phone.need == '1' ? true : false,
							require: res.data.activityForm.phone.require == '1' ? true : false,
							placeholder: res.data.activityForm.phone.placeholder
						},
						{
							name: 'company',
							label: '公司',
							need: res.data.activityForm.company.need == '1' ? true : false,
							require: res.data.activityForm.company.require == '1' ? true : false,
							placeholder: res.data.activityForm.company.placeholder
						}
					]
				}

				this.form.cost = res.data.cost;
				if (res.data.privacy == 1) {
					this.form.privacy = true;
				} else {
					this.form.privacy = false;
				}
			})
		});
	}
}
</script>

<style lang="scss" scoped>
.activitycreate {
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
			border: 1px solid #e3e9ee;
			box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
			border-radius: 6px;
			background: #fff;
			overflow: hidden;
			.publishForm {
				.model {
					font-size: 14px;
					color: #334056;
					line-height: 48px;
					padding: 0 28px;
					background: #fbfdff;
					border-bottom: 1px solid #e3e9ee;
					border-top-left-radius: 6px;
					border-top-right-radius: 6px;
					font-weight: bold;
					&.b-top {
						border-top: 1px solid #e3e9ee;
					}
				}
				.m-left {
					margin-left: 10px;
				}
				.m-ipt {
					width: 690px;
				}
				.m-sipt {
					width: 190px;
				}
				.m-siptx {
					width: 288px;
				}
				.m-mipt {
					width: 490px;
				}
				.m-num {
					width: 138px;
				}
				#coDisable {
					button {
						background: #ccc;
						color: #fff;
						cursor: not-allowed;
					}
				}
				.thumbset {
					overflow: hidden;
					.thumbImg {
						text-align: center;
						position: absolute;
						z-index: 99;
						.reselect {
							display: none;
							position: absolute;
							top: -9px;
							right: -9px;
							font-size: 14px;
							font-weight: bold;
							width: 18px;
							height: 18px;
							line-height: 18px;
							text-align: center;
							border-radius: 9px;
							background-color: #f74c4c;
							color: #fff;
							text-decoration: none;
						}
						img {
							display: block;
							width: 200px;
							height: 280px;
							&.guestAvatar {
								width: 138px;
								height: 192px;
							}
						}
						&:hover {
							.reselect {
								display: block;
							}
						}
					}
					.thumb-uploader-icon {
						position: relative;
						width: 200px;
						height: 280px;
						background: #fbfdff;
						&.guest-icon {
							width: 138px;
							height: 192px;
						}
						.icon {
							position: absolute;
							top: 50%;
							left: 50%;
							margin-left: -15px;
							margin-top: -15px;
							width: 30px;
							height: 30px;
						}
					}
				}
				.upload {
					margin-top: 10px;
					width: 100%;
					a {
						display: block;
						float: left;
						&.m-btn {
							position: relative;
							font-size: 14px;
							color: #c51e60;
							width: 138px;
							height: 34px;
							text-align: center;
							line-height: 34px;
							border: 1px solid #edbbcf;
							border-radius: 3px;
							img {
								position: absolute;
								top: 10px;
								left: 44px;
								&.guestImg {
									left: 5px;
								}
							}
							.size {
								font-size: 12px;
							}
						}
						&.poster {
							margin-left: 22px;
							font-size: 12px;
							color: #475469;
							span {
								color: #5771e6;
							}
						}
					}
				}
				.m-tip {
					font-size: 12px;
					color: #99a9be;
					line-height: 26px;
					margin-top: 13px;
					margin-bottom: -5px;
				}
				.guestsuploadimg {
					width: 138px;
					height: 242px;
				}
				.guest-info {
					width: 540px;
					.s-ipt {
						width: 140px;
					}
					.s-lipt {
						width: 240px;
					}
					.s-textarea {
						width: 540px;
						margin-top: 22px;
					}
				}
				.guest-form {
					background: #f7f8fa;
					padding: 50px 30px;
					border-radius: 6px 6px 0 0;
				}
				.guest-save {
					width: 48px;
					height: 34px;
					border: 1px solid #c51e60;
					border-radius: 3px;
					background: #fdf6f9;
					.btn {
						display: block;
						font-size: 14px;
						color: #c51e60;
						text-align: center;
						line-height: 34px;
						&:hover {
							background: #c51e60;
							color: #fff;
						}
					}
				}
				.guestLists {
					border: 1px solid #c51e60;
					border-radius: 3px;
					width: 690px;
					.guestimg {
						width: 165px;
						height: 228px;
						img {
							display: block;
							width: 124px;
							height: 167px;
							border-radius: 2px;
							margin-top: 30px;
							margin-left: 13px;
						}
					}
					.guestinfo {
						position: relative;
						width: 510px;
						.name {
							font-size: 20px;
							color: #324057;
							font-weight: bold;
							margin-top: 30px;
						}
						.info {
							font-size: 12px;
							color: #8895ab;
							border-bottom: 1px solid #e3e9ee;
							padding-bottom: 8px;
							.position {
								margin-right: 20px;
								.icon1 {
									display: inline-block;
									background: url('../../images/editIcon.png') no-repeat 0 0;
									width: 20px;
									height: 12px;
								}
							}
							.company {
								.icon2 {
									display: inline-block;
									background: url('../../images/editIcon.png') no-repeat 0 -15px;
									width: 20px;
									height: 12px;
								}
							}
						}
						.summary {
							font-size: 14px;
							color: #8895ab;
							text-align: justify;
							line-height: 26px;
						}
						.option {
							position: absolute;
							top: 10px;
							right: 0px;
							.edit {
								font-size: 14px;
								color: #c51e60;
								background: url('../../images/editIcon.png') no-repeat 0 -30px;
								padding-left: 16px;
								margin-right: 20px;
							}
							.delete {
								font-size: 14px;
								color: #c51e60;
								background: url('../../images/editIcon.png') no-repeat 0 -50px;
								padding-left: 16px;
								margin-right: 20px;
							}
						}
					}
				}
				.m-process {
					.process-start,
					.process-end {
						width: 138px;
					}
					.process-line {
						width: 12px;
						text-align: center;
					}
					.process-content {
						width: 392px;
					}
					.process-save {
						width: 48px;
						height: 34px;
						border: 1px solid #c51e60;
						border-radius: 3px;
						background: #fdf6f9;
						.btn {
							display: block;
							font-size: 14px;
							color: #c51e60;
							text-align: center;
							line-height: 34px;
							&:hover {
								background: #c51e60;
								color: #fff;
							}
						}
					}
				}
				.edi-process {
					margin: 50px 0 0 58px;
				}
				.m-process-list {
					position: relative;
					background: #fdf6f9;
					border: 1px solid #edbbcf;
					border-radius: 3px;
					width: 686px;
					.time {
						padding-left: 20px;
					}
					.content {
						padding-left: 50px;
						width: 460px;
						text-align: justify;
					}
					.option {
						.edit {
							background: url('../../images/editIcon.png') no-repeat 0 -30px;
							padding-left: 16px;
							color:#c51e60;
						}
					}
					.delete {
						display: block;
						width: 14px;
						height: 14px;
						position: absolute;
						top: 0;
						right: 0;
						background: url('../../images/editIcon.png') no-repeat 0 -75px;
					}
				}
				.m-enrollform {
					padding: 40px 0;
					.name {}
					.ipt {
						width: 628px;
					}
					.check {
						margin-top: 5px;
					}
				}
				.m-cost {
					margin-top: 30px;
				}
				.m-cost-tip {
					margin-top: -25px;
					.tip {
						font-size: 14px;
						color: #b2bfd0;
					}
				}
				.m-privacy {
					margin-top: -5px;
				}
				.bottom-btn {
					width: 100%;
					text-align: center;
					padding: 24px 0 58px 0;
					.btn {
						display: inline-block;
						width: 138px;
						height: 48px;
						font-size: 16px;
						color: #5771e6;
						line-height: 48px;
						text-align: center;
						border: 1px solid #ccd4f7;
						border-radius: 5px;
						margin-right: 18px;
						&:hover {
							background: #5771e6;
							color: #fff;
						}
					}
				}
			}
		}
	}
	.posterContent {
		margin-top: 10px;
		margin-left: 5px;
		margin-bottom: -20px;
		ul {
			margin: 0;
			padding: 0;
			overflow: hidden;
			li {
				list-style: none;
				float: left;
				margin-right: 10px;
				margin-bottom: 10px;
				a {
					display: block;
					width: 103px;
					height: 144px;
					-moz-box-sizing: border-box;
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
					img {
						width: 100%;
						height: 100%;
					}
					&.select {
						border: 5px solid #ff4949;
					}
				}
			}
		}
	}
	.dialog-footer {
		width: 302px;
		margin: 0 auto;
		text-align: center;
		.sure-btn {
			font-size: 16px;
			color: #fff;
			width: 138px;
			height: 48px;
			background: #5771e6;
			text-align: center;
			line-height: 48px;
			border: 1px solid #ccd4f7;
			border-radius: 6px;
			margin-right: 11px;
		}
		.cancel-btn {
			font-size: 16px;
			color: #5771e6;
			width: 138px;
			height: 48px;
			background: #eaeffc;
			text-align: center;
			line-height: 48px;
			border: 1px solid #ccd4f7;
			border-radius: 6px;
			margin-right: 10px;
		}
	}
}
</style>