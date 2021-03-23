import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

import TodoItem from './TodoItem'

const Wrapper = styled.div`
display: flex;
flex-direction: column;
`
const TodoList = ({ items, onClick, isListingTodoList }) => (
  <Wrapper>
    {items.map(item => {
      const handleOnClick = e => {
        onClick(item.id)
      }
      return <TodoItem key={item.id} {...item} onClick={handleOnClick} isListingTodoList={isListingTodoList} />
    })}
  </Wrapper>
)

TodoList.propTypes = {
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  isListingTodoList: PropTypes.bool,
}

TodoList.defaultProps = {
  isListingTodoList: false
}

export default TodoList
