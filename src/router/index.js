import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/routerview/home.vue'
import Activity from '@/components/activity/activity.vue'
import ActivityDetail from '@/components/activity/activitydetail.vue'
import ActivityCreate from '@/components/center/activitycreate.vue'
import Appointment from '@/components/recept/appointment.vue'
import DataReceptData from '@/components/datastatistics/recept-data.vue'
import DataReceptFlow from '@/components/datastatistics/recept-flow.vue'
import News from '@/components/news/news.vue'
import NewsDetail from '@/components/news/newsDetail.vue'
import NewsReport from '@/components/news/report.vue'
import newsReportSuccess from '@/components/news/reportSuccess.vue'
import Content from '@/components/routerview/content'
import Login from '@/components/login/login.vue'
import Center from '@/components/routerview/center.vue'
import ActivityList from '@/components/center/activitylist'
import ActivityListPublished from '@/components/center/activitylist-published.vue'
import ActivityListCancel from '@/components/center/activitylist-cancel'
import ActivityListDraft from '@/components/center/activitylist-draft'
import ActivityEnroll from '@/components/center/activityenroll'
import ActivityManage from '@/components/activity/activitymanage'
import ActivityPreview from '@/components/center/activitypreview'
import ActivityCreateSuccess from '@/components/center/activitycreate-success'
import ActivityFavor from '@/components/center/activityfavor'
import ActivityEnrollDetail from '@/components/activity/activity-enrolldetail'
import ActivityReport from '@/components/activity/activityreport'
import ActivityReportsuccess from '@/components/activity/activityreport-success'
import ActivityEdit from '@/components/center/activityedit'
import ActivityEditPreview from '@/components/center/activityeditpreview'
import Personal from '@/components/center/personal'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '',
      redirect: to => { return '/activity'; },
      hidden: true
    },
    {
      path: '/',
      component: Content,
      hidden: true,
      children: [
        { path: '/login', component: Login, name: '登录', hidden: true },
      ]
    },
    {
      path: '/activity',
      component: Home,
      hidden: true,
      children: [
        {
          path: '', component: Activity, hidden: true
        },
        {
          path: '/activitydetail/:id', component: ActivityDetail, hidden: true
        },
        { path: '/activityreport/:id', component: ActivityReport, name: '活动举报', hidden: true },
        { path: '/activityreport-success/:id', component: ActivityReportsuccess, name: '举报成功', hidden: true }
      ]
    },
    {
      path: '/news',
      component: Home,
      hidden: true,
      children: [
        {
          path: '', component: News, hidden: true
        },
        {
          path: '/newsdetail/:id', component: NewsDetail, hidden: true,
        },
        {
          path: '/report/:id', component: NewsReport, hidden: true,
        }
        ,
        {
          path: '/newsReportSuccess/:id', component: newsReportSuccess, hidden: true,
        }
      ]
    },
    {
      path: '/nav1',
      name: '活动导航',
      component: Center,
      children: [
        {
          path: '',
          redirect: to => { return 'per'; },
          component: Content,
          hidden: true
        },
        {
          path: 'per',
          name: '个人中心',
          icon: '1',
          component: Content,
          leaf: true,
          children: [
            {
              path: '',
              redirect: to => { return 'personstation' },
              hidden: true
            },
            {
              path: 'personstation',
              name: '个人中心',
              component: Content
            }
          ]
        },
        {
          path: 'active',
          name: '我的活动',
          icon: '2',
          component: Content,
          children: [
            { path: '', redirect: to => { return 'create'; }, hidden: true },
            { path: 'create', name: '创建活动', component: ActivityCreate },
            {
              path: 'activitylist',
              name: '我的发布',
              component: ActivityList,
              children: [
                { path: '', redirect: to => { return 'published'; }, hidden: true },
                { path: 'published', name: '我的发布已发布', component: ActivityListPublished, hidden: true },
                { path: 'cancel', name: '我的发布已取消', component: ActivityListCancel, hidden: true },
                { path: 'draft', name: '我的发布草稿', component: ActivityListDraft, hidden: true }
              ]
            },
            { path: 'enroll', name: '我的参与', component: ActivityCreate }
          ]
        },
        {
          path: 'col',
          name: '我的收藏',
          icon: '3',
          component: Content,
          leaf: true,
          children: [
            {
              path: '',
              redirect: to => { return 'mycollect' },
              hidden: true
            },
            {
              path: 'mycollect',
              name: '我的收藏',
              component: Content
            }
          ]
        },
        {
          path: 'fol',
          name: '我的关注',
          icon: '4',
          component: Content,
          leaf: true,
          children: [
            {
              path: '',
              redirect: to => { return 'myfollow' },
              hidden: true
            },
            {
              path: 'myfollow',
              name: '我的关注',
              component: Content
            }
          ]
        },
        {
          path: 'acc',
          name: '账户设置',
          icon: '5',
          component: Content,
          leaf: true,
          children: [
            {
              path: '',
              redirect: to => { return 'accountset' },
              hidden: true
            },
            {
              path: 'accountset',
              name: '账户设置',
              component: Content
            }
          ]
        },
        {
          path: 'info',
          name: '消息中心',
          icon: '6',
          component: Content,
          leaf: true,
          children: [
            {
              path: '',
              redirect: to => { return 'infostation' },
              hidden: true
            },
            {
              path: 'infostation',
              name: '消息中心',
              component: Content
            }
          ]
        }
      ]
    }
  ]
})
