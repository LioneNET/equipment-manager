import React, {useEffect, useState} from 'react';
import SearchIcon from "../icons/SearchIcon";
import EquipmentTable from "./EquipmentTable";
import {useDispatch, useSelector} from "react-redux";
import {actions, states} from "../../store/slices";
import {EQUIPMENT_MODULE} from "../../store/const";
import Pagination from "./Pagination";

let equipmentFetchable = true
let searchTimer = null
const EquipmentSearch = () => {
  const dispatch = useDispatch()
  const {
    equipments,
    equipmentTypes
  } = useSelector(states[EQUIPMENT_MODULE.GET_EQUIPMENT_STATE])

  const [searchByEquipmentType, setSearchByEquipmentType] = useState('*')
  const [searchType, setSearchType] = useState('serial')
  const [query, setQuery] = useState({})
  const equipmentFetch = actions[EQUIPMENT_MODULE.FETCH_EQUIPMENT_LIST]
  const equipmentTypeFetch = actions[EQUIPMENT_MODULE.FETCH_EQUIPMENT_TYPE_LIST]
  const pageHandler = value => {
    dispatch(equipmentFetch({
      ...query, page: value
    }))
  }
  const searchHandler = value => {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(async () => {
      const querySearch = {
        ...(searchByEquipmentType !== '*' ? {equipment_id: searchByEquipmentType} : {})
      }
      querySearch[searchType] = value
      setQuery({...query, querySearch})
      await dispatch(equipmentFetch(querySearch))
    }, 450)
  }

  useEffect(() => {
    if(equipmentFetchable) {
      const fetch = async () => {
        await dispatch(equipmentFetch())
        await dispatch(equipmentTypeFetch())
        equipmentFetchable = true
      }
      equipmentFetchable = false
      fetch()
    }
  }, [])

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
                  <select className="form-select" onChange={({target}) => setSearchByEquipmentType(target.value)}>
                    <option value="*">Все</option>
                    {
                      equipmentTypes.data.map(type => (<option value={type.id} key={type.id}>{type.name}</option>))
                    }
                  </select>
                </div>

                <div className="input-group mb-3">
                  <label className="input-group-text">Тип поиска</label>
                  <select className="form-select" onChange={({target}) => setSearchType(target.value)}>
                    <option value="serial">Серийный номер</option>
                    <option value="note">Примечание</option>
                    <option value="id">Код оборудования (ID)</option>
                  </select>
                </div>

                <div className="input-group flex-nowrap  mb-3">
                  <span className="input-group-text" id="addon-wrapping"><SearchIcon/></span>
                  <input
                      onInput={({target}) => searchHandler(target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Поиск"/>
                </div>
              </div>
              <div className="search-items">
                {equipments.data.length ? (
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
                      {equipments.data.map(item => (<EquipmentTable item={item} key={item.id} />))}
                      </tbody>
                    </table>
                ) : (
                    <div className="empty-data">
                      <div className="alert alert-primary" role="alert">
                        Нет данных
                      </div>
                    </div>
                )}
              </div>
              {
                equipments.meta.total > equipments.meta.per_page? (
                    <div className="paginator">
                      <Pagination meta={equipments.meta} nextPage={pageHandler} />
                    </div>
                ) : null
              }
            </div>
          </div>
        </div>
      </div>
  );
};

export default EquipmentSearch;