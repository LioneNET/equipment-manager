import Home from "../pages/Home";
import Login from "../pages/Login";
const getToken = () => localStorage.getItem('token')

const isAuth = (data) => {
  const filteredRoutes = [];
  for(const route of data) {
    let testRoute = {...route}
    if(!getToken() && route.meta.authRequired) {
      continue
    }
    if(getToken() && route.path === '/login') {
      continue
    }
    if(route?.children.length) {
      testRoute.children = isAuth(route.children)
    }
    filteredRoutes.push(testRoute)
  }
  return filteredRoutes
}

const routes = isAuth([
  {
    path: '/',
    component: <Home />,
    meta: {
      authRequired: true
    },
    children: [
    ]
  },
  {
    path: '/login',
    component: <Login />,
    meta: {
      authRequired: false
    },
    children: [
    ]
  },
])

const defaultRoute = getToken() ? '/' : '/login'

export {routes, defaultRoute}