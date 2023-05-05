// Composables
import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios';
const Home = () => import('../views/Home.vue');
import Portfolio from'../views/Portfolio.vue'
const CV = () => import('../views/CV.vue');
const Contact = () => import('../views/Contacts.vue');
import Layout from'../layouts/default/Default.vue'
const Cloud = () => import('../views/portfolio/CloudPortfolio.vue');
const Telegram = () => import('../views/portfolio/TelegramPortfolio.vue');
const Cluster = () => import('../views/portfolio/TelegramCluster.vue');
const History = () => import('../views/portfolio/TelegramHistory.vue');
const Geoportal = () => import('../views/portfolio/Geoportal.vue');
const Sentiment = () => import('../views/portfolio/TelegramSentiment.vue');
const Langchain = () => import('../views/portfolio/LangchainExample.vue');
const Chat = () => import('../views/portfolio/langchainChat.vue');

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: '/portfolio',
        name: 'Portfolio',
        component: Portfolio,
      },
      {
        path: '/portfolio/cloud',
        name: 'Cloud',
        component: Cloud,
      },
      {
        path: '/portfolio/telegram',
        name: 'Telegram',
        component: Telegram,
      },
      {
        path: '/portfolio/cluster',
        name: 'Cluster',
        component: Cluster,
      },
      {
        path: '/portfolio/history',
        name: 'History',
        component: History,
      },
      {
        path: '/portfolio/geoportal',
        name: 'Geoportal',
        component: Geoportal,
      },
      {
        path: '/portfolio/sentiment',
        name: 'Sentiment',
        component: Sentiment,
      },
      {
        path: '/portfolio/langchain',
        name: 'Langchain',
        component: Langchain,
      },
      {
        path: '/portfolio/chat',
        name: 'Chat',
        component: Chat,
      },
      {
        path: '/cv',
        name: 'CV',
        component: CV,
      },
      {
        path: '/contact',
        name: 'Contact',
        component: Contact,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.afterEach((to, from) => {/*
  try{
    axios({
      method: "post",
      url: "https://portfolio-backend-8tl9.onrender.com",
      data: {
        uuid: localStorage.getItem("uuid"),
        from: from.path,
        to: to.path,
        timestamp: new Date().toLocaleString()
      },
      headers:{
        'Content-Type': 'application/json'
      }
    })
  } catch{
  }*/
})


export default router
