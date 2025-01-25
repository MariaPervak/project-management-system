const getToken = () => {
  return localStorage.getItem("token") || '';
}

const clearToken = () => {
  localStorage.removeItem("token");
}


export {getToken, clearToken}