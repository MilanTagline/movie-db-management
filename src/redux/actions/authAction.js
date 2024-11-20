import api from "@/utils/api";
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../constants/authConstant";
import Cookies from "js-cookie"; 
import toast from "react-hot-toast";

export const login = (payload, router) => {
  return async (dispatch) => {
    try {
      const { data } = await api("post", "/api/auth", payload, false);

      if (data?.token) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data.user, 
        });
        Cookies.set("token", data?.token);
        toast.success("User logged-in successfully");
        router.push("/movie")
      }
    } catch (error) {
      
      dispatch({
        type: LOGIN_FAILURE,
        payload: error?.response?.data?.message || error.message, 
      });
      console.error(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };
};
