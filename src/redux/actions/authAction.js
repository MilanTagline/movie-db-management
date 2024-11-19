import api from '@/utils/api';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants/authConstant';

export const login = (payload) => async (dispatch) => {
  try {
    const { data } = await api('post', 'sign-in', payload, false)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message,
    });
  }
};


