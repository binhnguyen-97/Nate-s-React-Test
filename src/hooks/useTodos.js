import { useEffect, useReducer } from 'react'
import syncStorage from 'helpers/syncStoreHelper';
import { reducer, initialState } from "modules/todosReducer";
import { READ_STORAGE, CREATE_TODO, FILTER_BY_STATUS, TOGGLE_COMPLETE, CREATE_LIST_TODOS } from "modules/constants";

function useTodos() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { listTodos } = state

  useEffect(() => {
    dispatch({ type: READ_STORAGE })
  }, [dispatch])

  useEffect(() => {
    syncStorage({ listTodos })
  }, [listTodos])

  const createTodo = (text, listId) => dispatch({ type: CREATE_TODO, text, listId })
  const toggleComplete = (id, listId) => dispatch({ type: TOGGLE_COMPLETE, id, listId })
  const filterByStatus = (status, listId) => dispatch({ type: FILTER_BY_STATUS, status, listId })
  const createListTodos = (text) => dispatch({ type: CREATE_LIST_TODOS, text })

  return { listTodos, createTodo, toggleComplete, filterByStatus, createListTodos }
}

export default useTodos
