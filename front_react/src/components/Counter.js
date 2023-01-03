import React from 'react';
import {COUNTER_MODULE} from '../store/const'
import {actions, states} from "../store/slices"
import { useSelector, useDispatch } from 'react-redux'

const Counter = () => {
  const dispatch = useDispatch()
  const {
    value,
    status
  } = useSelector(states[COUNTER_MODULE.COUNTER_COUNT_STATE])

  const incrementHandler = actions[COUNTER_MODULE.COUNTER_INCREMENT]
  const decrementHandler = actions[COUNTER_MODULE.COUNTER_DECREMENT]
  const incrementAsyncHandler = actions[COUNTER_MODULE.COUNTER_INCREMENT_ASYNC]

  return (
      <div>
        <span>{value}</span>
        <span>{status}</span>
        <button onClick={() => dispatch(incrementHandler())}>Добавить</button>
        <button onClick={() => dispatch(decrementHandler())}>Убрать</button>
        <button onClick={() => dispatch(incrementAsyncHandler(15))}>Добавить асинхронно</button>
      </div>
  );
};

export default Counter;