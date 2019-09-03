import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/top/Home.vue'
import Library from './components/top/Library.vue'
import Reviews from './components/top/Reviews.vue'
import News from './components/top/News.vue'

import Works from './components/top/Works.vue'
import Articles from './components/works/Articles.vue'
import Collections from './components/works/Collections.vue'
import Books from './components/works/Books.vue'
import Public from './components/works/Public.vue'
import Write from "./components/works/Write.vue"

import Friends from './components/top/Friends.vue'
import Dev from './components/top/Dev.vue'
import Book from './components/book/Book.vue'
import Reader from './components/book/Reader.vue'
import Notes from './components/book/Notes.vue'
import Login from './components/user/Login.vue'
import Register from './components/user/Register.vue'

import ReviewBook from "./components/reviews/ReviewBook.vue"
import ReviewPlan from "./components/reviews/ReviewPlan.vue"
import ReviewChapter from "./components/reviews/ReviewChapter.vue"

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
    path: '/reviews',
    component: Reviews
  },
  {
    path: '/news',
    component: News
  },
  {
    path: '/works',
    component: Works,
    children: [
      {
        path: '',
        component: Articles
      },
      {
        path: 'articles',
        component: Articles
      },
      {
        path: 'collections',
        component: Collections 
      },
      {
        path: 'books',
        component: Books 
      },
      {
        path: 'public',
        component: Public 
      },
      {
        path: 'write',
        component: Write
      },
      {
        path: 'write/:artid',
        component: Write
      }
    ]
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
    path: '/reader/:bookid',
    component: Reader
  },
  {
    path: '/reader/:bookid/:chapid',
    component: Reader
  },
  {
    path: '/user/register',
    component: Register
  },
  {
    path: '/user/login',
    component: Login
  },
  {
    path: '/dev',
    component: Dev
  },
  {
    path: '/review/book/:bookid',
    component: ReviewBook
  },
  {
    path: '/review/plan/:bookid',
    component: ReviewPlan
  },
  {
    path: '/review/chapter/:bookid/:chapid',
    component: ReviewChapter
  },
  {
    path: '/review/chapter/:bookid/:chapid/:sentid',
    component: ReviewChapter
  },
]

const router = new Router({
  routes
});

export default router;