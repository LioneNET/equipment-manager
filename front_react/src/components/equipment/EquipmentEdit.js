import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {actions, states} from "../../store/slices";
import {EQUIPMENT_MODULE, ALERT_MODULE} from "../../store/const";

let equipmentFetchable = true

const EquipmentEdit = () => {

  const [serialMask, setSerialMask] = useState('')
  const [serialNumber, setSerialNumber] = useState('')
  const [equipmentTypeID, setEquipmentTypeID] = useState(0)
  const [note, setNote] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()
  const {
    equipment,
    equipmentTypes,
    equipmentIsLoading
  } = useSelector(states[EQUIPMENT_MODULE.GET_EQUIPMENT_STATE])
  const fetchEquipment = actions[EQUIPMENT_MODULE.FETCH_EQUIPMENT]
  const putEquipment = actions[EQUIPMENT_MODULE.PUT_EQUIPMENT]
  const deleteEquipment = actions[EQUIPMENT_MODULE.DELETE_EQUIPMENT]
  const fetchEquipmentTypes = actions[EQUIPMENT_MODULE.FETCH_EQUIPMENT_TYPE_LIST]
  const addAlert = actions[ALERT_MODULE.ALERT_ADD_ACTION]

  useEffect(() => {
    if (equipmentFetchable) {
      const fetch = async () => {
        await dispatch(fetchEquipmentTypes())
        await dispatch(fetchEquipment(id))
        equipmentFetchable = true
      }
      equipmentFetchable = false
      fetch()
    }
  }, [])

  useEffect(() => {
    if (equipment.data) {
      const {
        id = null,
        equipment_type = [{serial_mask: null}],
        equipment_id = 0,
        serial = null,
        note = null
      } = equipment.data

      setSerialMask(equipment_type[0].serial_mask)
      setSerialNumber(serial)
      setNote(note)
      setEquipmentTypeID(Number(equipment_id))

      if(id === null) {
        navigate('/search')
      }
    }
  }, [equipment])

  const equipmentTypeInput = id => {
    setEquipmentTypeID(id)
    setSerialMask(equipmentTypes.data.find(i => i.id === id).serial_mask)
  }

  const sendMessage = data => {
    const key = Object.keys(data)[0]
    const message = data[key]
    dispatch(addAlert({
      id: Date.now(),
      type: `alert-${key}`,
      message: message,
      duration: 3000
    }))
    if(key === 'success') {
      navigate('search')
    }
  }

  const saveItems = async () => {
    const resp = await dispatch(putEquipment({
      id,
      form: {
        equipment_type_id: equipmentTypeID,
        serial: serialNumber,
        note
      }
    }))
    if(resp.payload) {
      sendMessage(resp.payload)
    }
  }

  const deleteItems = async () => {
    const resp = await dispatch(deleteEquipment(id))
    if(resp.payload) {
      sendMessage(resp.payload)
    }
  }

  return (
      <div className="row">
        <div className="col-md-12 p-3">

          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between">
              <span>Редактировать оборудование</span>
              <div className="btn-place d-flex">
                <button
                    disabled={equipmentIsLoading}
                    className="btn btn-outline-primary me-2"
                    type="button"
                    onClick={saveItems}>Сохранить</button>
                <button
                    disabled={equipmentIsLoading}
                    className="btn btn-outline-danger me-2"
                    type="button"
                    onClick={deleteItems}>Удалить</button>
              </div>
            </div>
            <div className="card-body">
              <div className="card mb-3">
                <div className="card-body">
                  <p>Создает регулярное выражение, согласно входной маске</p>
                  <p>N – цифра от 0 до 9</p>
                  <p>A – прописная буква латинского алфавита</p>
                  <p>a – строчная буква латинского алфавита</p>
                  <p>X – прописная буква латинского алфавита либо цифра от 0 до 9</p>
                  <p>Z – символ из списка: “-“, “_”, “@”.</p>
                </div>
              </div>
              <div className="input-group flex-wrap mb-3">
                <label className="input-group-text">Тип оборудования</label>
                <select
                    value={equipmentTypeID}
                    className="form-select"
                    onChange={({target}) => equipmentTypeInput(Number(target.value))}
                >
                  {
                    equipmentTypes.data.map(types => <option value={types.id} key={types.id}>{types.name}</option>)
                  }
                </select>
              </div>

              <div className="input-group flex-nowrap  mb-3">
                <span className="input-group-text">Серийный номер маска {serialMask}</span>
                <input
                    onInput={({target}) => setSerialNumber(target.value)}
                    defaultValue={serialNumber}
                    type="text"
                    className="form-control"
                    placeholder="Серийный номер"/>
              </div>

              <div className="input-group flex-nowrap  mb-3">
                <span className="input-group-text">Примечание</span>
                <input
                    onInput={({target}) => setNote(target.value)}
                    type="text"
                    defaultValue={note}
                    className="form-control"
                    placeholder="Примечание"/>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EquipmentEdit;