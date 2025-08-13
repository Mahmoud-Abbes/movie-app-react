import {
  ADD_USER,
  CHANGE_USER_IMAGE,
  CHANGE_USER_NAME,
  LOG_OUT,
  RESET_PASSWORD,
  SET_CURRENT_USER,
} from "./actionTypes";

const initialState = {
  userList: [
    {
      name: "Super Admin",
      email: "admin@gmail.com",
      password: "adminadmin",
      role: "Admin",
      imageURL: "",
      blocked: false,
    },
    {
      name: "Mahmoud",
      email: "mah@gmail.com",
      password: "mah",
      role: "User",
      imageURL: "",
      blocked: false,
    },
  ],
  currentUser: {
    name: "Mahmoud",
    email: "mah@gmail.com",
    password: "mah",
    role: "User",
    imageURL: "",
    blocked: false,
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

    default:
      return state;
  }
};

export default userReducer;
