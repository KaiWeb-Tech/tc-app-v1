import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ProfileView from "@/views/ProfileView.vue";
import CategoriesView from "@/views/CategoriesView.vue";
import CardsView from "@/views/CardsView.vue";
import TranslatorView from "@/views/TranslatorView.vue";
import TrainingView from "@/views/TrainingView.vue";
import decodeAndCheckToken from "@/utils/JWTDecode.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView,
      meta: { requiresAuth: false, showHeader: false },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false, showHeader: false },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true, showHeader: false },
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView,
      meta: { requiresAuth: true, showHeader: false },
    },
    {
      path: '/categories/:id/cards',
      name: 'cards',
      component: CardsView,
      meta: { requiresAuth: true, showHeader: false },
    },
    {
      path: '/translator',
      name: 'translator',
      component: TranslatorView,
      meta: { requiresAuth: true, showHeader: false },
    },
    {
      path: '/training',
      name: 'training',
      component: TrainingView,
      meta: { requiresAuth: true, showHeader: false },
    },
  ],
})

router.beforeEach((to, from, next) => {
  try {
    const token = localStorage.getItem('tc_token') as string;
    const isAuthenticated = decodeAndCheckToken(token);

    if (to.meta.requiresAuth && !isAuthenticated) {
      return next({ name: 'login', query: { redirect: to.fullPath } });
    }

    if (to.name === 'home' || to.name === 'login' && isAuthenticated) {
      return next({ name: 'categories' });
    }

    next();
  } catch (error) {
    console.error('Erreur lors de la navigation:', error);
    next({ name: 'not_found' });
  }
});

export default router
