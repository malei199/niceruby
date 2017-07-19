import axios from 'axios';
const globalPath = 'http://114.55.251.155:3099';
//const globalPath ='http://121.196.233.212:3000';
const token = localStorage.getItem('huicyeuser') ? JSON.parse(localStorage.getItem('huicyeuser')).token : '';

let Api = {
	pub: {
		getUploadUniqueKey: () => {
			return axios.post(`${globalPath}/news/getUploadUniqueKey?access_token=` + token);
		},
		getAllPark: () => {
			return axios.post(`${globalPath}/Activity/getAllPark`);
		}
	},
	user: {
		login: (params) => {
			return axios.post(`${globalPath}/Account/userLogin`, params).then(res => res.data);
		},
		checkPhone: (params) => {
			return axios.post(`${globalPath}/Account/checkPhone`, params).then(res => res.data);
		},
		getcode: (params) => {
			return axios.post(`${globalPath}/Account/getVerifyCodeForWeb`, params).then(res => res.data);
		},
		verifycode: (params) => {
			return axios.post(`${globalPath}/Account/codeVerify`, params).then(res => res.data);
		},
		createuser: (params) => {
			return axios.post(`${globalPath}/Account/createUserForWeb`, params).then(res => res.data);
		},
		getCodeforget: (params) => {
			return axios.post(`${globalPath}/Account/getVerifyCodeForReset`, params).then(res => res.data);
		},
		resetPwd: (params) => {
			return axios.post(`${globalPath}/Account/resetPassword`, params).then(res => res.data);
		},
		postPublishedList: (params) => {
			return axios.post(`${globalPath}/Account/getActivityPublished?access_token=` + token, params);
		},
		postEnrolledList: (params) => {
			return axios.post(`${globalPath}/Account/getActivityEnrolled?access_token=` + token, params);
		}
	},
	activity: {
		postCreate: (params) => {
			return axios.post(`${globalPath}/Activity/createActivity?access_token=` + token, params);
		},
		postCreateDraft: (params) => {
			return axios.post(`${globalPath}/Activity/createActivityDraft?access_token=` + token, params);
		},
		postCarouselList: (params) => {
			return axios.post(`${globalPath}/Activity/getCarouselListForWeb?access_token=` + token, params);
		},
		postList: (params) => {
			return axios.post(`${globalPath}/Activity/list?access_token=` + token, params);
		},
		postDetail: (params) => {
			return axios.post(`${globalPath}/Activity/find_detail?access_token=` + token, params);
		},
		postcancel: (params) => {
			return axios.post(`${globalPath}/Activity/cancel?access_token=` + token, params);
		},
		postDetailInfo: (params) => {
			return axios.post(`${globalPath}/Activity/saveActivityInfo?access_token=` + token, params);
		},
		postDetailUpdate: (params) => {
			return axios.post(`${globalPath}/Activity/updateActivity?access_token=` + token, params);
		},
		postDetailUpdateAndPublish: (params) => {
			return axios.post(`${globalPath}/Activity/updateActivityAndPublish?access_token=` + token, params);
		},
		postgetActivityFavorite: (params) => {
			return axios.post(`${globalPath}/Account/getActivityFavorite?access_token=` + token, params);
		},
		postOff: (params) => {
			return axios.post(`${globalPath}/Activity/offActivity?access_token=` + token, params);
		},
		postOn: (params) => {
			return axios.post(`${globalPath}/Activity/onActivity?access_token=` + token, params);
		},
		postPass: (params) => {
			return axios.post(`${globalPath}/Activity/pass?access_token=` + token, params);
		},
		postDel: (params) => {
			return axios.post(`${globalPath}/Activity/delActivity?access_token=` + token, params);
		},
		postEnrollList: (params) => {
			return axios.post(`${globalPath}/Activity/getEnrollList`, params);
		},
		postEnrollListBrief: (params) => {
			return axios.post(`${globalPath}/Activity/getEnrollListBrief`, params);
		},
		postDelEnroll: (params) => {
			return axios.post(`${globalPath}/Activity/delActivityEnrollment?access_token=` + token, params);
		},
		postActivityReviewInfo: (params) => {
			return axios.post(`${globalPath}/Activity/getActivityReviewInfo?access_token=` + token, params);
		},
		postReportList: (params) => {
			return axios.post(`${globalPath}/ActivityReport/list`, params);
		},
		postReportReview: (params) => {
			return axios.post(`${globalPath}/ActivityReport/review?access_token=` + token, params);
		},
		postReportDetail: (params) => {
			return axios.post(`${globalPath}/ActivityReport/getReport?access_token=` + token, params);
		},
		postOnline: (params) => {
			return axios.post(`${globalPath}/Activity/onActivity?access_token=` + token, params);
		},
		postEnroll: (params) => {
			return axios.post(`${globalPath}/Activity/enroll?access_token=` + token, params);
		},
		postCancelEnroll: (params) => {
			return axios.post(`${globalPath}/Activity/cancelEnroll?access_token=` + token, params);
		},
		activityreport: (params) => {
			return axios.post(`${globalPath}/Activity/report?access_token=` + token, params);
		},
		postActivityFavorite: (params) => {
			return axios.post(`${globalPath}/Activity/favorite?access_token=` + token, params);
		},
		postActivityComment: (params) => {
			return axios.post(`${globalPath}/Activity/comment?access_token=` + token, params);
		},
		postActivityCommentList: (params) => {
			return axios.post(`${globalPath}/Activity/find_comment_list?access_token=` + token, params);
		},
		postActivityCommentListNext: (params) => {
			return axios.post(`${globalPath}/Activity/find_comment_list_next?access_token=` + token, params);
		},
		postActivityCommentPraise: (params) => {
			return axios.post(`${globalPath}/Comment/praise?access_token=` + token, params);
		},
		postActivityCommentDelete: (params) => {
			return axios.post(`${globalPath}/Comment/delete?access_token=` + token, params);
		},
		postActivityCommentReport: (params) => {
			return axios.post(`${globalPath}/Report/report?access_token=` + token, params);
		},
		postActivityRecomment: () => {
			return axios.post(`${globalPath}/Activity/getRecommendActivityForWeb`);
		}
	},
	info: {
		pushSmsCreate: (params) => {
			return axios.post(`${globalPath}/SMS/createAndPublish?access_token=` + token, params);
		},
		pushSmsList: (params) => {
			return axios.post(`${globalPath}/SMS/list?access_token=` + token, params);
		},
		pushSmsDetail: (params) => {
			return axios.post(`${globalPath}/SMS/getSMS?access_token=` + token, params);
		},
		pushSmsWithdraw: (params) => {
			return axios.post(`${globalPath}/SMS/withdraw?access_token=` + token, params);
		},
		pushSmsReSend: (params) => {
			return axios.post(`${globalPath}/SMS/reSend?access_token=` + token, params);
		},
		pushRadioCreate: (params) => {
			return axios.post(`${globalPath}/Redio/createAndPublish?access_token=` + token, params);
		},
		pushRadioList: (params) => {
			return axios.post(`${globalPath}/Redio/list?access_token=` + token, params);
		},
		pushRadioDetail: (params) => {
			return axios.post(`${globalPath}/Redio/getRedio?access_token=` + token, params);
		},
		pushRadioWithdraw: (params) => {
			return axios.post(`${globalPath}/Redio/withdraw?access_token=` + token, params);
		},
		pushRadioReSend: (params) => {
			return axios.post(`${globalPath}/Redio/reSend?access_token=` + token, params);
		},
		pushMsgCreate: (params) => {
			return axios.post(`${globalPath}/MSG/createAndPublish?access_token=` + token, params);
		},
		pushMsgList: (params) => {
			return axios.post(`${globalPath}/MSG/list?access_token=` + token, params);
		},
		pushMsgDetail: (params) => {
			return axios.post(`${globalPath}/MSG/getMSG?access_token=` + token, params);
		},
		pushMsgWithdraw: (params) => {
			return axios.post(`${globalPath}/MSG/withdraw?access_token=` + token, params);
		},
		pushMsgReSend: (params) => {
			return axios.post(`${globalPath}/MSG/reSend?access_token=` + token, params);
		},
	},
	news: {
		postNewsList: (params) => {
			return axios.post(`${globalPath}/News/list`, params);
		},
		postDetail: (params) => {
			return axios.post(`${globalPath}/News/detail?access_token=` + token, params);
		},
		postLoop: () => {
			return axios.post(`${globalPath}/News/getLoopList`);
		},
		postPraise: (params) => {
			return axios.post(`${globalPath}/News/newsPraise?access_token=` + token, params);
		},
		postFavorite: (params) => {
			return axios.post(`${globalPath}/News/newsFavorite?access_token=` + token, params);
		},
		postReport: (params) => {
			return axios.post(`${globalPath}/News/newsReport?access_token=` + token, params);
		},
		postReportMsg: (params) => {
			return axios.post(`${globalPath}/NewsReport/getReport`, params);
		},
		postAuthor: (params) => {
			return axios.post(`${globalPath}/News/getAuthorInfo`, params);
		},
		postRecList: () => {
			return axios.post(`${globalPath}/News/getRecommendNewsList`);
		},
		postReadList: () => {
			return axios.post(`${globalPath}/News/getReadNewsList`);
		},
		postRecAppList: () => {
			return axios.post(`${globalPath}/News/getRecommendApp`);

		}
	},
}

export default Api
