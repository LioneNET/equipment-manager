import React, {useEffect} from 'react';
import {actions, states} from "../store/slices";
import {ALERT_MODULE} from "../store/const";
import {useDispatch, useSelector} from "react-redux";

const Alert = () => {
  const dispatch = useDispatch()
  const {
    alerts
  } = useSelector(states[ALERT_MODULE.ALERT_GET_STATE])

  useEffect(() => {
    const ids = Object.keys(alerts)
    for(const id of ids) {
      setTimeout(() => {
        if(alerts[id]) {
          dispatch(actions[ALERT_MODULE.ALERT_DELETE_ACTION](id))
        }
      }, alerts[id].duration)
    }
  }, [alerts])

  const closeAlertHandler = (id) => {
    dispatch(actions[ALERT_MODULE.ALERT_DELETE_ACTION](id))
  }

  return (
    <div className='row'>
      <div className='col-12'>
      {Object.values(alerts).map(alert => (
        <div className={`${alert.type} alert d-flex justify-content-between`} key={alert.id}>
          <span>{ alert.message }</span>
          <button type="button" className="btn-close" onClick={() => closeAlertHandler(alert.id)}/>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Alert;