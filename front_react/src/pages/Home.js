import React from 'react';
import SearchIcon from "../components/icons/SearchIcon";

const Home = () => {
  return (
      <div className="row">
        <div className="col-md-12 p-3">
          <div className="card">
            <div className="card-header">
              Поиск
            </div>
            <div className="card-body">
              <div className="search-form">
                <div className="input-group flex-wrap mb-3">
                  <label className="input-group-text">Тип оборудования</label>
                  <select className="form-select" id="inputGroupSelect02">
                    <option value="*">Все</option>
                    <option value="item.id" key="item.id">11</option>
                  </select>
                </div>

                <div className="input-group mb-3">
                  <label className="input-group-text">Тип поиска</label>
                  <select className="form-select">
                    <option value="serial">Серийный номер</option>
                    <option value="note">Примечание</option>
                    <option value="id">Код оборудования (ID)</option>
                  </select>
                </div>

                <div className="input-group flex-nowrap  mb-3">
                  <span className="input-group-text" id="addon-wrapping"><SearchIcon/></span>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Поиск"/>
                </div>
              </div>

              <div className="search-items">
                <table className="table table-hover">
                  <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Тип</th>
                    <th scope="col">Серийный</th>
                    <th scope="col">Маска</th>
                    <th scope="col">Примечание</th>
                    <th scope="col">Изменить</th>
                  </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
                <div className="empty-data">
                  <div className="alert alert-primary" role="alert">
                    Нет данных
                  </div>
                </div>
              </div>

              <div className="paginator">

              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Home;