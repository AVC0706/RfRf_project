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
    USER_LOADED
} from "../type";

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                ...action.payload,
                isAuth: true,
                user: action.payload.user,
            };

        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuth: true,
            };

        case AOI_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                Aoi: action.payload,

            };
        case AOI_FAIL:
            return {};

        case LOGIN_FAIL:
        case AUTH_ERROR:
            return {
                ...state,
                token: null,
                user: null,
                isAuth: false,
            };

        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuth: false,
                user: null,
            };

        case REGISTER_FAIL:
            return {
                ...state,
            };
        case EMAIL_SENT:
            return {
                ...state,
            };
        case EMAIL_FAIL :
            return {

                ...state
            };
        case PASSWORD_CHANGED :
            return {

                ...state
            };
        case PASSWORD_CHANGED_FAIL :
            return {

                ...state
            }

        case REGISTER_FAIL:
            return {
                ...state,
            };

        default:
            return state;
    }
};
