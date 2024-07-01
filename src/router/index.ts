import { createRouter, createWebHistory } from 'vue-router';
import EventList from '../views/EventList.vue';
import EventDetails from '../views/event/Details.vue';
import EventLayout from '../views/event/Layout.vue';
import EventEdit from '../views/event/Edit.vue';
import EventRegister from '../views/event/Register.vue';
import NotFound from '../views/NotFound.vue';
import NetworkError from '../views/NetworkError.vue';
import store from '@/GlobalStore';

//Lazy loading
function About() {
  return import(/* webpackChunkName: "about" */ '../views/About.vue');
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: (route) => ({ page: parseInt(route.query.page) || 1 }),
    },
    {
      path: '/events/:id',
      name: 'event-layout',
      component: EventLayout,
      props: true,
      children: [
        {
          path: '',
          name: 'EventDetails',
          component: EventDetails,
        },
        {
          path: 'register',
          name: 'EventRegister',
          component: EventRegister,
        },
        {
          path: 'edit',
          name: 'EventEdit',
          component: EventEdit,
          meta: { requireAuth: true },
        },
      ],
    },
    {
      path: '/event/:afterEvent(.*)',
      redirect: (to) => {
        return { path: '/events/' + to.params.afterEvent };
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: NotFound,
      props: true,
    },
    {
      path: '/network-error',
      name: 'NetworkError',
      component: NetworkError,
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from) => {
  const notAuthorized = true;

  if (to.meta.requireAuth && notAuthorized) {
    store.flashMessage = 'Sorry, you are not authorized to view this page';

    setTimeout(() => {
      store.flashMessage = '';
    }, 3000);
    if (from.href) {
      return false;
    } else {
      return { path: '/' };
    }
  }
});

export default router;
