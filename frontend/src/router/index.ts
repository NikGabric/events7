import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import AddEventView from '@/views/AddEventView.vue';
import EditEventView from '@/views/EditEventView.vue';
import NotFoundViewVue from '../views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardView
    },
    {
      path: '/add-event',
      name: 'Add event',
      component: AddEventView
    },
    {
      path: '/edit-event/:id',
      name: 'Add event',
      component: EditEventView
    },
    {
      path: '/:catchAll(.*)',
      name: 'Not found',
      component: NotFoundViewVue
    }
  ]
});

export default router;
