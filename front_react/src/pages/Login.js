import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {actions, states} from "../store/slices";
import {AUTH_MODULE} from "../store/const";
import Alert from "../components/Alert";
import {useForm} from "react-hook-form";

const Login = () => {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const dispatch = useDispatch()
  const {
    isLoading
  } = useSelector(states[AUTH_MODULE.AUTH_GET_STATE])

  const loginHandler = actions[AUTH_MODULE.POST_AUTH_LOGIN_ACTION]

  return (
      <div className="login-place">
        <div className="card">
          <h5 className="card-header">Авторизация</h5>
          <div className="card-body">
            <Alert/>
            <form onSubmit={handleSubmit(data => dispatch(loginHandler(data)))}>
              <div className="row">
                <label className="col-sm-2 form-label">Email</label>
                <div className="col-sm-10 valid-filed">
                  <input
                      {...register("email", {required: true})}
                      type="text"
                      className={`${errors.email ? 'is-invalid' : ''} form-control`}/>
                  {
                    errors.email && (
                        <div className="invalid-feedback d-block">
                          <p>Обязательно для заполнения</p>
                        </div>
                    )
                  }
                </div>
              </div>
              <div className="row">
                <label className="col-sm-2 form-label">Пароль</label>
                <div className="col-sm-10 valid-filed">
                  <input
                      {...register("password", {required: true})}
                      type="password"
                      className={`${errors.password ? 'is-invalid' : ''} form-control`}/>
                  {
                    errors.password && (
                        <div className="invalid-feedback d-block">
                          <p>Обязательно для заполнения</p>
                        </div>
                    )
                  }
                </div>
              </div>
              <div className="row-auto">
                <button type="submit" className="btn btn-primary">
                  {isLoading ?
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/> : null}
                  Войти
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Login;