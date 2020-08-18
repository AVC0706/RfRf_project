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
  AOI_SUCCESS,
  AOI_FAIL,
  LOGOUT,
} from "../type";
import setAuthToken from "../../utils/setAuthToken";

const UserState = (props) => {
  const initialState = {
    token: null,
    user: null,
    isAuth: false,
    allusers: null,
    user: null,
    Aoi: []
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
      const res = await axios.get("http://localhost:5000/api/auth/isAuth");
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });

      //end
    } catch (e) {
      dispatch({
        type: AUTH_ERROR,
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
      const res = await axios.post("http://localhost:5000/api/auth/register", formData, config);
      // console.log("this is admin status:" + res.data.superadmin.admin);

      dispatch({
        type: REGISTER_SUCCESS,
      });
      console.log("login success");
    } catch (e) {
      dispatch({
        type: REGISTER_FAIL,
        payload: e.response.data.msg,
      });
      console.log("login fail");
    }
  };

  //--------Login----------
  const login = async (formData, router) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "/api/auth/login",
        formData,
        config
      );
      // console.log("this is admin status:" + res.data.superadmin.admin);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      console.log("login success");
      // router.push({
      //   path: "http://localhost:3000/stateAdmin",
      // });
      loadUser();
    } catch (e) {
      console.log(e.response, "dasda");
      dispatch({
        type: LOGIN_FAIL,
        payload: e.response,
      });
      console.log("login fail");
    }
  };

  //-----------Logout----------
  const logout = () => dispatch({ type: LOGOUT });


//-----GetAllAoi------
  const getAllAoi = async () => {
    // const config = {
    //   header: {
    //     "Content-Type": "application/json",
    //   },
    // };
    try {
      const res = await axios.get("http://localhost:5000/api/aoi/getAllAoi");
      // console.log("this is admin status:" + res.data.superadmin.admin);

      dispatch({
        type: AOI_SUCCESS,
        payload: res.data,
      });

      console.log("getAoi success" , state.Aoi );
      
    } catch (e) {
      dispatch({
        type: AOI_FAIL,
      });
      console.log("AOI fail");
    }
  };


  return (
    <UserContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuth: state.isAuth,
        Aoi: state.Aoi,
        login,
        register,
        loadUser,
        logout,
        getAllAoi
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
