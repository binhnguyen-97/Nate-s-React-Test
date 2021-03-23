const syncStorage = (state) => {
  if (window && window.localStorage) {
    window.localStorage.setItem('appState', JSON.stringify(state))
  }
}

export default syncStorage
