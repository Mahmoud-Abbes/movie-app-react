import { ADD_USER, LOG_OUT, SET_CURRENT_USER } from "./actionTypes";

const initialState = {
  userList: [
    { email: "admin@gmail.com", password: "adminadmin", role: "Admin" },
  ],
  currentUser: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_USER:
      return { ...state, userList: [...state.userList, payload] };

    case SET_CURRENT_USER:
      return { ...state, currentUser: payload };

    case LOG_OUT:
      return { ...state, currentUser: null };

    default:
      return state;
  }
};

export default userReducer;
