import Vue from 'vue'
import Router from 'vue-router'

import Main from 'components/main/main'
import All from 'components/alist/all'
import Good from 'components/alist/good'
import Job from 'components/alist/job'
import Ask from 'components/alist/ask'
import Share from 'components/alist/share'
import Article from 'components/article/article'
import Person from 'components/person/person'
import Msg from 'components/message/msg'
import { getCookie } from "common/js/util"
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/main/all'
        },
        {
            path: '/main',
            name: 'main',
            component: Main,
            redirect: '/main/all',
            children: [{
                path: 'all',
                name: 'all',
                component: All
            }, {
                path: 'good',
                name: 'good',
                component: Good
            }, {
                path: 'ask',
                name: 'ask',
                component: Ask
            }, {
                path: 'share',
                name: 'share',
                component: Share
            }, {
                path: 'job',
                name: 'job',
                component: Job
            }, {
                path: 'article/:id',
                name: 'article',
                component: Article
            }]
        },
        {
            path: '/me',
            name: 'me',
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
            component: Person
        },
        {
            path: '/msg',
            name: 'msg',
            meta: {
                requireAuth: true,
            },
            component: Msg
        }
    ]
})