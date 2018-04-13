import Vue from 'vue'
import Router from 'vue-router'
import All from 'components/alist/all'
import Good from 'components/alist/good'
import Job from 'components/alist/job'
import Ask from 'components/alist/ask'
import Share from 'components/alist/share'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/all'
    }, {
        path: '/all',
        component: All
    }, {
        path: '/good',
        component: Good
    }, {
        path: '/ask',
        component: Ask
    }, {
        path: '/share',
        component: Share
    }, {
        path: '/job',
        component: Job
    }]
})