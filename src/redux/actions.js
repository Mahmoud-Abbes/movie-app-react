import { ADD_MOVIE, ADD_USER, DELETE_MOVIE, EDIT_MOVIE, LOG_OUT, SET_CURRENT_USER } from "./actionTypes";

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
        payload: id
    }
}

// ---------------------- User Actions ---------------------- //

export const addUser = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  }
}

export const setCureentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  }
}

export const logout = () => {
  return{
    type: LOG_OUT,
    payload: null,
  }
}