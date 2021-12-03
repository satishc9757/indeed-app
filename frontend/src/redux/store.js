import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import companyReducer from "./reducers/companyReducer";
import adminReducer from "./reducers/adminReducer";
import signupReducer from "./reducers/signupReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  company: companyReducer,
  admin: adminReducer,
  signUp: signupReducer,
});

const store = createStore(
  reducers,
  initialState,
  // compose(applyMiddleware(...middleware),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
