import {
  ADD_MOVIE,
  ADD_USER,
  CHANGE_CURRENT_PAGE,
  CHANGE_USER_BLOCK,
  CHANGE_USER_IMAGE,
  CHANGE_USER_NAME,
  CHANGE_USER_ROLE,
  DELETE_MOVIE,
  EDIT_MOVIE,
  LOG_OUT,
  REMOVE_USER,
  RESET_PASSWORD,
  SET_CURRENT_USER,
  SET_FAVORITE_MOVIE,
} from "./actionTypes";

// ---------------------- Movie Actions ---------------------- //

export const editMovie = (movie) => {
  return {
    type: EDIT_MOVIE,
    payload: movie,
  };
};

export const addMovie = (movie) => {
  return {
    type: ADD_MOVIE,
    payload: movie,
  };
};

export const deleteMovie = (id) => {
  return {
    type: DELETE_MOVIE,
    payload: id,
  };
};

export const changeCurrentPage = (page) => {
  return {
    type: CHANGE_CURRENT_PAGE,
    payload: page,
  };
};

// ---------------------- User Actions ---------------------- //

export const addUser = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

export const setCureentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: LOG_OUT,
    payload: null,
  };
};

export const changeUserName = (name) => {
  return {
    type: CHANGE_USER_NAME,
    payload: name,
  };
};

export const resetPassword = (newPassword) => {
  return {
    type: RESET_PASSWORD,
    payload: newPassword,
  };
};

export const changeUserImage = (newImage) => {
  return {
    type: CHANGE_USER_IMAGE,
    payload: newImage,
  };
};

export const changeUserRole = (user) => {
  return {
    type: CHANGE_USER_ROLE,
    payload: user,
  };
};

export const changeUserBlock = (email) => {
  return {
    type: CHANGE_USER_BLOCK,
    payload: email,
  };
};

export const removeUser = (email) => {
  return{
    type: REMOVE_USER,
    payload: email,
  }
}

export const setFavoriteMovie = (id) => {
  return{
    type: SET_FAVORITE_MOVIE,
    payload: id,
  }
}