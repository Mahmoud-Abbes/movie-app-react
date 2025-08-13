import { movies } from "../DataBase";
import { ADD_MOVIE, CHANGE_CURRENT_PAGE, DELETE_MOVIE, EDIT_MOVIE } from "./actionTypes";

const initialState = {
  movies: movies,
  currentPage : "",
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case EDIT_MOVIE:
      return {
        ...state,
        movies: state.movies.map((el) => (el.id === payload.id ? payload : el)),
      };

    case ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, payload],
      };

    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((el) => el.id !== payload),
      };
    
    case CHANGE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      }

    default:
      return state;
  }
};

export default reducer;
