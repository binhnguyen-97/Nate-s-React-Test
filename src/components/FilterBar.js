import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TODO_STATUS } from "helpers/constants";

const Wrapper = styled.div`
  display: flex;
`;

const FilterButton = styled.span`
  display: inline-block;
  padding: .2em .5em;
  text-align: center;
  cursor: pointer;
  color: ${props => props.isActive ? '#000' : '#fff'};
  background-color: ${props => props.isActive ? '#fff' : '#000'};
  &:hover {
    color: ${props => props.isActive ? '#fff' : '#000'};
    background-color: ${props => props.isActive ? '#000' : '#fff'};
  }
`

const FilterListWrapper = styled.div`
  flex: 1;
  margin-left: 1em;
  display: flex;
  justify-content: space-evenly;
`;

const FilterBar = ({ currentFilter, onClickFilter }) => {
  return (
    <Wrapper>
      Filter by Status:
      <FilterListWrapper>
        {
          TODO_STATUS.map(state => {
            return <FilterButton
              key={state}
              isActive={state === currentFilter}
              onClick={() => onClickFilter(state)}
            >{state}
            </FilterButton>
          })
        }
      </FilterListWrapper>
    </Wrapper>
  )
};

FilterBar.propTypes = {
  currentFilter: PropTypes.string,
  onClickFilter: PropTypes.func.isRequired,
};

FilterBar.defaultProps = {
  currentFilter: 'all'
}

export default FilterBar;
