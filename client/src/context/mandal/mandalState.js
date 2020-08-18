import React, { useReducer } from "react";
import axios from "axios";
import MandalContext from "./mandalContext";
import MandalReducer from "./mandalReducer";

import{
    GETMANDALS_SUCCESS,
    MANDAL_SUCCESS,
    UPDATEMANDAL_SUCCESS,
    //DELETEMANDAL_SUCCESS,
    MANDAL_FAIL,
}from "../type";
import setAuthToken from "../../utils/setAuthToken";

const MandalState = (props) => {
    const initialState = {
      isAuth: false,
      allMandals=[],
      mandal=null,
      msg:'',
    };

    const [state, dispatch] = useReducer(MandalReducer, initialState);

    //---------Add MANDAL-------------
    const addMandal = async (formData) => {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const res = await axios.post(
          "/api/Mandals/addMandal",
          formData,
          config
        );

        dispatch({
          type: MANDAL_SUCCESS,
          payload: res.data,
        });
      } catch (e) {
        dispatch({
          type: MANDAL_FAIL,
        });
      }
    };

    //-----------Get All mandals---------------
    const getAllMandals = async () => {
      try {
        const res = await axios.get("/api/Mandals/getAllMandals");

        dispatch({
          type: GETMANDALS_SUCCESS,
          payload: res.data,
        });
        console.log(state.allmandals);
      } catch (e) {
        dispatch({
          type: MANDAL_FAIL,
          payload: e.response.data.msg,
        });
      }
    };

    //Update mandal
    const updateMandal = async (formData) => {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const res = await axios.post(
          "/api/Mandals/updateMandal",
          formData,
          config
        );

        dispatch({
          type: UPDATEMANDAL_SUCCESS,
          payload: res.data,
        });
        console.log("Mandal successfully updated");
      } catch (e) {
      console.log("Mandal update fail");
    }
  };

    return (
        <MandalContext.Provider
          value={{
            token: state.token,
            user: state.user,
            isAuth: state.isAuth,
            allmandals: state.allmandals,
            mandal: state.mandal,
            addMandal,
            getAllMandals,
            updateMandal,
          }}
        >
    
          {props.children}
        </MandalContext.Provider>
      );
}          

export default MandalState;

