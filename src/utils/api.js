import axios from 'axios'

const api = (
  method,
  urlEndPoint,
  data,
  isToken,
  isFile = false,
) =>
  new Promise((myResolve) => {
    let headers = {}
    const token = ""
    if (isToken) {
      headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }
    if (isFile) {
      headers = {
        ...headers,
        'Content-Type': 'multipart/form-data',
      }
    }
    axios({
      method,
      url: process.env.REACT_APP_API_URL + urlEndPoint,
      data,
      headers,
    })
      .then((response) => {
        return myResolve({
          data: response?.data?.data,
          statusCode: response?.data?.status_code,
          token: response?.data?.token,
        })
      })
      .catch((err) => {
        return myResolve({
          statusCode: err?.response?.data?.status_code
        })
      })
  })

export default api