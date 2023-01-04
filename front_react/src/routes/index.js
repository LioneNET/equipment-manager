import Home from "../pages/Home";
import Login from "../pages/Login";
import EquipmentSearch from "../components/equipment/EquipmentSearch";
import {Navigate, Route} from "react-router-dom";
import React from "react";
import EquipmentForm from "../components/equipment/EquipmentForm";
import EquipmentEdit from "../components/equipment/EquipmentEdit";
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
      {
        path: 'search',
        component: <EquipmentSearch />,
        meta: {
          authRequired: true
        },
        children: [
        ]
      },
      {
        path: 'equipment',
        component: <EquipmentForm />,
        meta: {
          authRequired: true
        },
        children: [
        ]
      },
      {
        path: 'equipment/:id',
        component: <EquipmentEdit />,
        meta: {
          authRequired: true
        },
        children: [
        ]
      }
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
  {
    path: '*',
    component: <Navigate to={getToken() ? '/search' : '/login'} />,
    meta: {
      authRequired: false
    },
    children: [
    ]
  },
])

const routeTree = data => {
  return data.map(route => {
    return (
        <Route id={route.name} path={route.path} element={route.component} key={route.path}>
          {
            route.children.length ? routeTree(route.children) : null
          }
        </Route>
    )
  })
}

export {routeTree, routes}