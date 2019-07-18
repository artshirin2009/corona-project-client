import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signin from './components/account/Signin'
import Signup from './components/account/Signup'
import Signout from './components/account/Signout'
import Courses from './views/Courses'
import Profile from './components/account/Profile'
import Categories from './views/Categories'
import Users from './views/Users'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signout',
      name: 'Signout',
      component: Signout
    },
    {
      path: '/products',
      name: 'Courses',
      component: Courses
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path:'/categories',
      name: 'Categories',
      component: Categories
    }
  ]
})
