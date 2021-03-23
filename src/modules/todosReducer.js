import { READ_STORAGE, CREATE_TODO, CREATE_LIST_TODOS, FILTER_BY_STATUS, TOGGLE_COMPLETE, TODO_STATUS } from "./constants";
import getFilterArray from "helpers/getFilterArray";

const initialState = {
  listTodos: [
    {
      label: "React Testing",
      id: 1,
      filterList: [],
      currentFilter: TODO_STATUS.all,
      todos: [
        {
          id: 1,
          completed: false,
          text: 'Read README'
        },
        {
          id: 2,
          completed: false,
          text: 'Add one todo'
        },
        {
          id: 3,
          completed: false,
          text: 'Add filters'
        },
        {
          id: 4,
          completed: false,
          text: 'Add multiple lists'
        },
        {
          id: 5,
          completed: false,
          text: 'Optional: add tests'
        }
      ]
    }
  ]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_STORAGE:
      if (window && window.localStorage) {
        const savedState = window.localStorage.getItem('appState')
        if (savedState && savedState !== 'undefined') {
          return {
            ...state,
            ...JSON.parse(savedState)
          }
        }
      }
      return {
        ...state,
      }
    case CREATE_LIST_TODOS: {
      const { text } = action
      const item = {
        label: text,
        id: state.listTodos.length + 1,
        filterList: [],
        currentFilter: TODO_STATUS.all,
        todos: []
      }

      const listTodos = state.listTodos.concat(item)

      return {
        ...state,
        listTodos,
      }
    }
    case CREATE_TODO: {
      const { text, listId } = action

      const listTodos = state.listTodos.map(list => {
        if (parseInt(list.id, 10) === parseInt(listId, 10)) {

          const item = {
            completed: false,
            text,
            id: list.todos.length + 1
          }

          const todos = list.todos.concat(item)
          const filterList = getFilterArray(todos, list.currentFilter);

          return {
            ...list,
            filterList,
            todos,
          }
        }
        return list;
      })

      return {
        ...state,
        listTodos
      }
    }
    case TOGGLE_COMPLETE: {
      const { id, listId } = action

      const listTodos = state.listTodos.map(list => {
        if (parseInt(list.id, 10) === parseInt(listId, 10)) {

          const todos = list.todos.map(item => {
            if (parseInt(item.id, 10) === parseInt(id, 10)) {
              return {
                ...item,
                completed: !item.completed
              }
            }
            return item
          });
          const filterList = getFilterArray(todos, list.currentFilter);

          return {
            ...list,
            filterList,
            todos,
          }
        }
        return list;
      })

      return {
        ...state,
        listTodos,
      }
    }

    case FILTER_BY_STATUS: {
      const { status, listId } = action;

      const listTodos = state.listTodos.map(list => {
        if (parseInt(list.id, 10) === parseInt(listId, 10)) {
          if (status === list.currentFilter && status !== TODO_STATUS.all) {
            return {
              ...list,
              currentFilter: TODO_STATUS.all,
              filterList: [],
            }
          }

          const filterList = getFilterArray(list.todos, status);

          return {
            ...list,
            currentFilter: status,
            filterList,
          }
        }
        return list;
      })

      return {
        ...state,
        listTodos,
      }
    }
    default:
      return state;
  }
}

export { reducer, initialState }
