import { createRouter, createWebHistory } from 'vue-router'
const getToken = () => localStorage.getItem('token')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        isAuth: true
      },
      component: () => import('../components/equipments/EquipmentSearch.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/equipment',
      name: 'equipment',
      meta: {
        isAuth: true
      },
      component: () => import('../components/equipments/EquipmentForm.vue')
    },
    {
      path: '/equipment/:id',
      name: 'equipmentid',
      meta: {
        isAuth: true
      },
      component: () => import('../components/equipments/EquipmentEdit.vue')
    }
  ]
})

router.beforeEach( (to, from, next) => {
  const requiredAuth = to.matched.some(m => m.meta.isAuth)
  if(!getToken() && requiredAuth) {
    return next('/login')
  }
  if(getToken() && to.path === '/login') {
    return  next('/')
  }
  return next()
})

export default router
