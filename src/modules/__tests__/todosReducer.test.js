import { reducer, initialState } from "modules/todosReducer";
import { CREATE_LIST_TODOS, TODO_STATUS, CREATE_TODO, TOGGLE_COMPLETE, FILTER_BY_STATUS } from "modules/constants";

describe('reducer testing', () => {
  test('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  test('should successfull create new list', () => {
    const expectedValue = {
      listTodos: [
        ...initialState.listTodos, {
          currentFilter: TODO_STATUS.all,
          filterList: [],
          todos: [],
          label: "Testing now",
          id: 2
        },
      ]
    }
    expect(reducer(initialState, {
      type: CREATE_LIST_TODOS, text: "Testing now"
    })).toEqual(expectedValue)
  })

  test('should successfull add new todo into list', () => {
    const newTodosList = [...initialState.listTodos[0].todos,
    {
      id: 6,
      completed: false,
      text: 'Testing now'
    }
    ];
    const expectedValue = {
      listTodos: [
        {
          ...initialState.listTodos[0],
          filterList: newTodosList,
          todos: newTodosList,
        }
      ]
    }
    expect(reducer(initialState, {
      type: CREATE_TODO, text: "Testing now", listId: 1
    })).toEqual(expectedValue)
  })

  test('should successfull toggle completed status', () => {
    const expectedValue = JSON.parse(JSON.stringify(initialState))
    expectedValue.listTodos[0].todos[4].completed = true;
    expectedValue.listTodos[0].filterList = expectedValue.listTodos[0].todos;

    expect(reducer(initialState, {
      type: TOGGLE_COMPLETE, id: 5, listId: 1
    })).toEqual(expectedValue)
  })

  test('should successful filter completed status', () => {
    const mockInitialState = JSON.parse(JSON.stringify(initialState))
    mockInitialState.listTodos[0].todos[4].completed = true;

    const expectedValue = JSON.parse(JSON.stringify(mockInitialState))
    expectedValue.listTodos[0].filterList = [expectedValue.listTodos[0].todos[4]];
    expectedValue.listTodos[0].currentFilter = "completed";


    expect(reducer(mockInitialState, {
      type: FILTER_BY_STATUS, status: "completed", listId: 1
    })).toEqual(expectedValue)
  })

  test('should successful filter active status', () => {
    const mockInitialState = JSON.parse(JSON.stringify(initialState))
    mockInitialState.listTodos[0].todos[4].completed = true;

    const expectedValue = JSON.parse(JSON.stringify(mockInitialState))
    expectedValue.listTodos[0].filterList = expectedValue.listTodos[0].todos.slice(0, 4);
    expectedValue.listTodos[0].currentFilter = "active";

    expect(reducer(mockInitialState, {
      type: FILTER_BY_STATUS, status: "active", listId: 1
    })).toEqual(expectedValue)
  })
})

