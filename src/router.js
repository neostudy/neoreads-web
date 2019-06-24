import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/top/Home.vue'
import Library from './components/top/Library.vue'
import Reviews from './components/top/Reviews.vue'
import News from './components/top/News.vue'
import Works from './components/top/Works.vue'
import Friends from './components/top/Friends.vue'
import Book from './components/book/Book.vue'
import Reader from './components/book/Reader.vue'
import Notes from './components/book/Notes.vue'

Vue.use(Router)

const routes = [
    {
        path: '/',
        redirects: '/home',
        component: Home
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/library',
        component: Library
    },
    {
        path: '/reiviews',
        component: Reviews
    },
    {
        path: '/news',
        component: News
    },
    {
        path: '/works',
        component: Works
    },
    {
        path: '/notes',
        component: Notes
    },
    {
        path: '/friends',
        component: Friends
    },
    {
        path: '/book/:id',
        component: Book
    },
    {
        path: '/reader/:id',
        component: Reader
    }
]

export default new Router({
    routes
});