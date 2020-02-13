/* eslint-disable */
import {
  LOGOUT,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS
} from "../types";

import ax, { setAuthToken } from "../../services/api";
import React, { useReducer } from "react";
import AuthReducer from "./AuthReducer";
import AuthContext from "./AuthContext";

const AuthState = props => {
  const initialState = {
    loading: true,
    isAuthenticated: null,
    token: localStorage.getItem("token")
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load User
  const loadUser = async () => {
    // Load token as global header
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      let { data } = await ax.get("/api/auth");
      dispatch({ type: USER_LOADED, payload: data });
    } catch ({ response }) {
      dispatch({ type: AUTH_ERROR });
      Toast.fire({ icon: "error", title: "Unauthenticated" });
    }
  };

  // Register User
  const register = async formData => {
    try {
      const { data } = await ax.post("/api/users/register", formData);
      Toast.fire({ icon: "success", title: data.message });

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data
      });

      Toast.fire({ icon: "success", title: data.message });
      //   loadUser();
    } catch ({ response }) {
      dispatch({ type: REGISTER_FAILED });
      Toast.fire({ icon: "error", title: response.data.message });
    }
  };

  // Login User
  const login = async formData => {
    try {
      const { data } = await ax.post("/api/auth", formData);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data
      });
      Toast.fire({ icon: "success", title: data.message });
      //   loadUser();
    } catch ({ response }) {
      dispatch({ type: LOGIN_FAILED });
      Toast.fire({ icon: "error", title: response.data.message });
    }
  };

  // Logout User
  const logout = () => dispatch({ type: LOGOUT });

  return (
    <AuthContext.Provider
      value={{
        // Methods
        login,
        logout,
        register,
        loadUser,
        // State values
        user: state.user,
        token: state.token,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
