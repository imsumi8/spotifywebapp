import rootReducer from "../../redux/reducers/index";
import ITEM_TYPE from "../../constants/types";

const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(ITEM_TYPE);

    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

// persist store code
const saveItems = (state) => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem(ITEM_TYPE, serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const persistedState = loadState();

// This persistedState is included at the time of store creation as initial value
const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunkMiddleware)
);

// This is actually call every time when store saved
store.subscribe(() => {
  saveItems(store.getState());
});

export default store;
