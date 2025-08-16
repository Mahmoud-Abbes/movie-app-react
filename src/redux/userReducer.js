import {
  ADD_USER,
  CHANGE_USER_BLOCK,
  CHANGE_USER_IMAGE,
  CHANGE_USER_NAME,
  CHANGE_USER_ROLE,
  LOG_OUT,
  REMOVE_USER,
  RESET_PASSWORD,
  SET_CURRENT_USER,
  SET_FAVORITE_MOVIE,
} from "./actionTypes";

const initialState = {
  userList: [
    {
      name: "Super D Admin",
      email: "admin0@gmail.com",
      password: "adminadmin",
      role: "Manager",
      imageURL: "",
      blocked: true,

      favoriteMovies: [],
    },
    {
      name: "Mahmoud",
      email: "mah@gmail.com",
      password: "mah",
      role: "User",
      imageURL: "",
      blocked: false,
      favoriteMovies: [],
    },
    {
      name: "Super Admin",
      email: "admin1@gmail.com",
      password: "adminadmin",
      role: "Admin",
      imageURL: "",
      blocked: false,
      favoriteMovies: [],
    },
    {
      name: "Super Admin",
      email: "admin2@gmail.com",
      password: "adminadmin",
      role: "Admin",
      imageURL: "",
      blocked: false,
      favoriteMovies: [],
    },
  ],
  currentUser: {
    name: "Mahmoud",
    email: "mah@gmail.com",
    password: "mah",
    role: "User",
    imageURL: "",
    blocked: false,
    favoriteMovies: [],
  },
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_USER:
      return { ...state, userList: [...state.userList, payload] };

    case SET_CURRENT_USER:
      return { ...state, currentUser: payload };

    case LOG_OUT:
      return { ...state, currentUser: null };

    case CHANGE_USER_NAME:
      return {
        ...state,
        userList: state.userList.map((el) =>
          el.email === state.currentUser.email ? { ...el, name: payload } : el
        ),
        currentUser: { ...state.currentUser, name: payload },
      };

    case CHANGE_USER_ROLE:
      return {
        ...state,
        userList: state.userList.map((el) =>
          el.email === payload.email ? payload : el
        ),
      };

    case CHANGE_USER_BLOCK:
      return {
        ...state,
        userList: state.userList.map((el) =>
          el.email === payload ? { ...el, blocked: !el.blocked } : el
        ),
      };

    case RESET_PASSWORD:
      return {
        ...state,
        userList: state.userList.map((el) =>
          el.email === state.currentUser.email
            ? { ...el, password: payload }
            : el
        ),
        currentUser: { ...state.currentUser, password: payload },
      };

    case CHANGE_USER_IMAGE:
      return {
        ...state,
        userList: state.userList.map((el) =>
          el.email === state.currentUser.email
            ? { ...el, imageURL: payload }
            : el
        ),
        currentUser: { ...state.currentUser, imageURL: payload },
      };

    case REMOVE_USER:
      return {
        ...state,
        userList: state.userList.filter((el) => el.email !== payload),
      };

    case SET_FAVORITE_MOVIE:
      return {
        ...state,
        userList: state.userList.map((el) =>
          el.email === state.currentUser.email
            ? {
                ...el,
                favoriteMovies: el.favoriteMovies.includes(payload)
                  ? el.favoriteMovies.filter((elt) => elt !== payload)
                  : [...el.favoriteMovies, payload],
              }
            : el
        ),
        currentUser: {
          ...state.currentUser,
          favoriteMovies: state.currentUser.favoriteMovies.includes(payload)
            ? state.currentUser.favoriteMovies.filter((elt) => elt !== payload)
            : [...state.currentUser.favoriteMovies, payload],
        },
      };

    default:
      return state;
  }
};

export default userReducer;
