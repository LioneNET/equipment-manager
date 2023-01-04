import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import Alert from "./Alert";
import {actions} from "../store/slices";
import {AUTH_MODULE, EQUIPMENT_MODULE} from "../store/const";
import {useDispatch} from "react-redux";

const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fetchLogout = actions[AUTH_MODULE.POST_AUTH_LOGOUT_ACTION]

  const handleLogout = async () => {
    await dispatch(fetchLogout())
    navigate('/')
  }
  return (
      <header>
        <div className="wrapper">
          <nav className="navbar navbar-light bg-light">
            <form className="container-fluid justify-content-end">
              <Link to="/search" className="btn btn-outline-primary me-2" type="button">
                Поиск
              </Link>
              <Link to="/equipment" className="btn btn-outline-primary me-2" type="button">
                Добавить
              </Link>
              <button className="btn btn-outline-primary me-2" type="button" onClick={handleLogout}>
                Выход
              </button>
            </form>
          </nav>
          <Alert/>
        </div>
      </header>
  );
};

export default Header;