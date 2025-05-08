import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ProfileView from "@/views/ProfileView.vue";
import CategoriesView from "@/views/CategoriesView.vue";
import CardsView from "@/views/CardsView.vue";
import TranslatorView from "@/views/TranslatorView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView,
    },
    {
      path: '/categories/:id/cards',
      name: 'cards',
      component: CardsView,
    },
    {
      path: '/translator',
      name: 'translator',
      component: TranslatorView,
    },
  ],
})

export default router
