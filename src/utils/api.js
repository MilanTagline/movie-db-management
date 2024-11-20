import axios from 'axios'
import Cookies from 'js-cookie'

const api = (
  method,
  urlEndPoint,
  data,
  isToken,
  isFile = false,
) =>
  new Promise((myResolve) => {
    let headers = {}
    const token = Cookies.get('token')
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
      url: urlEndPoint,
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
