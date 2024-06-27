import { applyMiddleware, combineReducers, createStore } from "redux"

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { thunk } from "redux-thunk";


// middleware is a function that sets between dispatching an action and reaching the store
// allows us to run code after dispatching an acti on but before reaching the store

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
})


const store = createStore(rootReducer, applyMiddleware(thunk))

export default store


