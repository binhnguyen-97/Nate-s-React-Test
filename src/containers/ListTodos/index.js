import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useHistory } from "react-router-dom";
import styled from 'styled-components'

import useTodos from 'hooks/useTodos'

import TodoList from 'components/TodoList'
import AddTodo from 'components/AddTodo'
import FilterBar from 'components/FilterBar'

import { TODO_STATUS } from 'modules/constants';


const ListTodosWrapper = styled.div`
  padding-top: 15rem;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
`

const TodosWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`

const ListTodos = () => {
  const history = useHistory();
  const params = useParams();
  const { listTodos, createTodo, toggleComplete, filterByStatus, createListTodos } = useTodos();
  const [selectedListItem, setSelectedListItem] = useState({});

  const memorizeGetListItem = useCallback(
    () => {
      if (listTodos.length <= 0) return [];
      return listTodos.find(list => parseInt(list.id, 10) === parseInt(params.listId, 10)) || []
    },
    [params.listId, listTodos],
  )

  useEffect(() => {
    setSelectedListItem(() => {
      return memorizeGetListItem();
    })
  }, [memorizeGetListItem, params.listId])

  const handleChangeListTodos = (id) => {
    history.push(`/${id}`)
  }

  const handleCreateTodo = (text) => {
    createTodo(text, params.listId)
  }

  const handleFilterByStatus = (status) => {
    filterByStatus(status, params.listId)
  }

  const handleToggle = (id) => {
    toggleComplete(id, params.listId)
  }

  const todoList = selectedListItem.currentFilter !== TODO_STATUS.all ? selectedListItem.filterList : selectedListItem.todos;

  return (
    <ListTodosWrapper >
      <TodosWrapper>
        <AddTodo onAddTodo={createListTodos} placeHolder="Add new Todo list" />
        <TodoList items={listTodos} onClick={handleChangeListTodos} isListingTodoList />
      </TodosWrapper>
      {params.listId && Object.keys(selectedListItem).length > 0 && (<TodosWrapper>
        <AddTodo onAddTodo={handleCreateTodo} />
        <FilterBar onClickFilter={handleFilterByStatus} currentFilter={selectedListItem.currentFilter} />
        <TodoList items={todoList} onClick={handleToggle} />
      </TodosWrapper>)}
    </ListTodosWrapper>
  )
}

export default ListTodos
