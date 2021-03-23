import { TODO_STATUS } from "modules/constants";

const getFilterArray = (list, status) => {
  if (!Array.isArray(list) || list.length <= 0) return [];
  return list.filter(listItem => {
    switch (status) {
      case TODO_STATUS.completed:
        return listItem.completed
      case TODO_STATUS.active:
        return !listItem.completed
      default:
        return true
    }
  })
}

export default getFilterArray
