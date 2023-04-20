// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Portfolio from '../views/Portfolio.vue';
import CV from '../views/CV.vue';
import Contact from '../views/Contacts.vue';
import Layout from '../layouts/default/Default.vue';
import Cloud from '../views/portfolio/CloudPortfolio.vue';
import Telegram from '../views/portfolio/TelegramPortfolio.vue';
import Cluster from '../views/portfolio/TelegramCluster.vue';
import History from '../views/portfolio/TelegramHistory.vue';
import Geoportal from '../views/portfolio/Geoportal.vue';
import Sentiment from '../views/portfolio/TelegramSentiment.vue';
import Langchain from '../views/portfolio/LangchainExample.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Home,
      },
      {
        path: '/port',
        name: 'Portfolio',
        component: Portfolio,
      
      },
      {
        path: '/port/cloud',
        name: 'Cloud',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Cloud,
      },
      {
        path: '/port/telegram',
        name: 'Telegram',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Telegram,
      },
      {
        path: '/port/cluster',
        name: 'Cluster',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Cluster,
      },
      {
        path: '/port/history',
        name: 'History',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: History,
      },
      {
        path: '/port/geoportal',
        name: 'Geoportal',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Geoportal,
      },
      {
        path: '/port/sentiment',
        name: 'Sentiment',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Sentiment,
      },
      {
        path: '/port/langchain',
        name: 'Langchain',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Langchain,
      },
      {
        path: '/cv',
        name: 'CV',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: CV,
      },
      {
        path: '/contact',
        name: 'Contact',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Contact,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
