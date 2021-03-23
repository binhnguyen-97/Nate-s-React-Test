import React from 'react'
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import styled from 'styled-components';


const Wrapper = styled.p`
  font-size: 24px;
  ${props => props.addPadding ? `
    padding: 1rem 2rem;
  ` : ''};
  ${props => props.isActive ? `
    background-color: #cacaca;
    color: #000;
  ` : ''};
  cursor: pointer;
`

const Text = styled.span`
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
`

const TodoItem = ({ text, completed, onClick, isListingTodoList, label, id }) => {
  const params = useParams();
  const isActive = isListingTodoList && parseInt(params?.listId, 10) === parseInt(id, 10);

  return (
    <Wrapper onClick={onClick} isActive={isActive} addPadding={isListingTodoList}>
      {isListingTodoList ?
        <Text>{label}</Text> :
        <code>
          [{completed ? 'x' : '  '}] <Text completed={completed}>{text}</Text>
        </code>
      }
    </Wrapper>
  )
}

TodoItem.propTypes = {
  text: PropTypes.string,
  label: PropTypes.string,
  completed: PropTypes.bool,
  isListingTodoList: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
}

TodoItem.defaultProps = {
  text: '',
  label: '',
  completed: false,
  isListingTodoList: false,
}


export default TodoItem
