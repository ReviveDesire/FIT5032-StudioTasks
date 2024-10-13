import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '../store';
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'

import AdminDashboardView from '../views/AdminDashboardView.vue';
import ProfessionalDashboardView from '../views/ProfessionalDashboardView.vue';
import UserDashboardView from '../views/UserDashboardView.vue';

import LogoutView from '../views/LogoutView.vue';

import AddBookView from '../views/AddBookView.vue';
import GetBookCountView from '../views/GetBookCountView.vue';
import WeatherView from '../views/WeatherView.vue';
import CountBookAPI from '../views/CountBookAPI.vue';
import GetAllBookAPI from '../views/GetAllBookAPI.vue';

const routes = [
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/logout',
    name: 'Logout',
    component: LogoutView
  },
  {
    path: '/professional-dashboard',
    name: 'Professional-dashboard',
    component: ProfessionalDashboardView
  },
  {
    path: '/user-dashboard',
    name: 'User-dashboard',
    component: UserDashboardView
  },
  {
    path: '/admin-dashboard',
    name: 'Admin-dashboard',
    component: AdminDashboardView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated.value) {
        next();
      } else {
        next({ name: 'AccessDenied' });
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/accessDenied',
    name: 'AccessDenied',
    component: AccessDeniedView
  }
]
const router = createRouter({
  history: createWebHistory("/"),
  routes
})
export default router