import Vue from 'vue'
import Router from 'vue-router'
import All from 'components/alist/all'
import Good from 'components/alist/good'
import Job from 'components/alist/job'
import Ask from 'components/alist/ask'
import Share from 'components/alist/share'
import Article from 'components/article/article'
import Person from 'components/person/person'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/all'
    }, {
        path: '/all',
        name: 'all',
        component: All
    }, {
        path: '/good',
        name: 'good',
        component: Good
    }, {
        path: '/ask',
        name: 'ask',
        component: Ask
    }, {
        path: '/share',
        name: 'share',
        component: Share
    }, {
        path: '/job',
        name: 'job',
        component: Job
    }, {
        path: '/article/:id',
        name: 'article',
        component: Article
    }, {
        path: '/me',
        name: 'me',
        component: Person
    }]
})