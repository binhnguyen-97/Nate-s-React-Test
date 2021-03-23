import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Input = styled.input`
  background: #3b4049;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 18px;
  font-size: 24px;
  height: 40px;
  width: 500px;
  margin-bottom: 16px;

  &::placeholder {
    color: #8d96a8;
  }
`

const AddTodo = ({ onAddTodo, placeHolder }) => {
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      onAddTodo(e.target.value)
      e.target.value = '';
    }
  }

  return (
    <Input
      type='text'
      onKeyPress={handleKeyPress}
      placeholder={placeHolder || 'Add new todo...'}
    />
  )
};

AddTodo.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
};

AddTodo.defaultProps = {
  placeHolder: 'Add new todo...'
};

export default AddTodo
