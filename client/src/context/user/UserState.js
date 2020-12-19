import React, { useReducer } from "react";
import axios from "axios";
import UserContext from "./userContext";
import UserReducer from "./userReducer";

import {
    AOI_FAIL,
    AOI_SUCCESS,
    AUTH_ERROR,
    EMAIL_FAIL,
    EMAIL_SENT,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    PASSWORD_CHANGED,
    PASSWORD_CHANGED_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED
} from "../type";
import setAuthToken from "../../utils/setAuthToken";
import { message } from "antd";

const UserState = (props) => {
    const initialState = {
        token: null,
        user: null,
        isAuth: false,
        allusers: null,
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
            console.log(process.env.REACT_APP_SERVER_URL)

            const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/auth/isAuth");
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
            const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/auth/register", formData, config);
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
            console.log(process.env.REACT_APP_SERVER_URL)
            const res = await axios.post(
                process.env.REACT_APP_SERVER_URL + "/auth/login",
                formData,
                config
            );
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
            // router.push({
            //   path: "http://localhost:5000/stateAdmin",
            // });
            loadUser();
        }
        catch (e) {
            dispatch({
                type: LOGIN_FAIL
            });
            message.error("Login Failed");
        }
    };
    //-----------Logout----------
    const logout = () => dispatch({ type: LOGOUT });

    //forgot password
    const forgetPass = async (formData) => {

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        };
        try {
            const res = await axios.put(`http://localhost:5000/api/user/forget-pass`, formData, config)
            dispatch({
                type: EMAIL_SENT,
                payload: res.data
            })

            console.log("email sent");
        } catch (e) {
            dispatch({
                type: EMAIL_FAIL,
                payload: e.response
            });
            console.log("email sent failed")
        }

    }

    const resetPass = async (formData, id) => {
        console.log(formData);
        console.log(id);
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        };

        try {
            const res = await axios.put(`http://localhost:5000/api/user/reset-pass/${id}`, formData, config)
            dispatch({
                type: PASSWORD_CHANGED,
                payload: res.data
            })
            console.log("password changed");
        } catch (e) {
            dispatch({
                type: PASSWORD_CHANGED_FAIL,
                payload: e.response
            })
            console.log(e.response)
        }
    }
    //-----GetAllAoi------
    const getAllAoi = async () => {
        // const config = {
        //   header: {
        //     "Content-Type": "application/json",
        //   },
        // };
        try {
            const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/aoi/getAllAoi");
            // console.log("this is admin status:" + res.data.superadmin.admin);

            dispatch({
                type: AOI_SUCCESS,
                payload: res.data,
            });

            console.log("getAoi success", state.Aoi);

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
                getAllAoi,
                forgetPass,
                resetPass

            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;
