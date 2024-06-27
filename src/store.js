
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { configureStore } from "@reduxjs/toolkit";




// all we need is to call configure stoer and pass our reducers to it

const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer
    },
})

export default store


