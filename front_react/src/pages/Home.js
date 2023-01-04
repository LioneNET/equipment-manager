import React, {useEffect} from 'react';
import {useNavigate, Outlet, useLocation} from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  const link = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if(link.pathname === '/') {
      navigate('/search')
    }
  }, [])

  return (
      <>
        <Header />
        <Outlet />
      </>
  );
};

export default Home;