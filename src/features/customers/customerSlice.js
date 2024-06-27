import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    fullName: "",
    nationalId: "",
    createdAt: ""
}





const customerSlice = createSlice({
    initialState,
    name: "customer",
    reducers: {
        createCustomer: {
            prepare(fullName, nationalId) {
                return {
                    payload: {
                        fullName, nationalId
                    }
                }
            },

            reducer(state, action) {
                state.fullName = action.payload.fullName
                state.nationalId = action.payload.nationalId
                state.createdAt = new Date().toISOString()
            }
        },
        updateName(state, action) {
            state.fullName = action.payload

        }


    }

})


export default customerSlice.reducer
export const { createCustomer, updateName } = customerSlice.actions

