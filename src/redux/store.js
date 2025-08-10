    import { combineReducers, createStore } from "redux";
    import reducer from "./reducer";
    import userReducer from "./userReducer";

    const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
    const store = createStore(
        combineReducers({ reducer,userReducer })
        ,devTools
    );

    export default store;