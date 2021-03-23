import getFilterArray from '../getFilterArray';

const list = [
  {
    id: 1,
    completed: true,
  },
  {
    id: 2,
    completed: true,
  },
  {
    id: 3,
    completed: false,
  },
];

describe('getFilterArray method', () => {
  test('should return empty array', () => {
    expect(getFilterArray()).toEqual([])
  })
  test('should return correct output', () => {
    expect(getFilterArray(list, "completed")).toEqual([
      {
        id: 1,
        completed: true,
      },
      {
        id: 2,
        completed: true,
      },
    ])

    expect(getFilterArray(list, "active")).toEqual([
      {
        id: 3,
        completed: false,
      },
    ])

    expect(getFilterArray(list, "all")).toEqual([
      {
        id: 1,
        completed: true,
      },
      {
        id: 2,
        completed: true,
      },
      {
        id: 3,
        completed: false,
      },
    ])

    expect(getFilterArray(list)).toEqual([
      {
        id: 1,
        completed: true,
      },
      {
        id: 2,
        completed: true,
      },
      {
        id: 3,
        completed: false,
      },
    ])
  })
})
