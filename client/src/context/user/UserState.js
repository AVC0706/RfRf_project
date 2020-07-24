import React, { useReducer } from "react";
import axios from "axios";
import UserContext from "./userContext";
import UserReducer from "./userReducer";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../type";
import setAuthToken from "../../utils/setAuthToken";

const UserState = (props) => {
  const initialState = {
    token: null,
    user: null,
    isAuth: false,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);


  // Load User
  const loadUser = async () => {
    //start

    //load token to global
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }

    try {
      const res = await axios.get("/api/user/isAuth");
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });

      //end
    } catch (e) {
      dispatch({
        type: AUTH_ERROR,
        payload: e.response.data.msg,
      });
    }
  };


  //--------Register----------
  const register = async (formData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/auth/register", formData, config);
      // console.log("this is admin status:" + res.data.superadmin.admin);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      console.log("login success");
      loadUser();
    } catch (e) {
      dispatch({
        type: REGISTER_FAIL,
        payload: e.response.data.msg,
      });
      console.log("login fail");
    }
  };



  //--------Login----------
  const login = async (formData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/auth/login", formData, config);
      // console.log("this is admin status:" + res.data.superadmin.admin);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      console.log("login success");
      loadUser();
    } catch (e) {
      dispatch({
        type: LOGIN_FAIL,
        payload: e.response.data.msg,
      });
      console.log("login fail");
    }
  };



  //-----------Logout----------
  const logout = () => dispatch({ type: LOGOUT });



  return (
    <UserContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuth: state.isAuth,
        login,
        register,
        loadUser,
        logout,
      }}
    >

      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
