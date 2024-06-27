import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false

}





const accountSlice = createSlice({
    initialState,
    name: "account",
    reducers: {
        deposit(state, action) {
            state.balance = state.balance + action.payload
        },
        withdraw(state, action) {
            state.balance = state.balance - action.payload
        },
        requestLoan:

        {
            prepare(amount, purpose) {
                return {
                    payload: { amount, purpose }
                }
            },
            reducer(state, action) {
                if (state.loan > 0) return
                state.loan = action.payload.amount
                state.loanPurpose = action.payload.purpose
                state.balance = state.balance + action.payload.amount
            }

        },
        payLoan(state, action) {
            state.balance = state.balance - state.loan
            state.loan = 0
            state.loanPurpose = ''
        }
    }

})



export function deposit(amount, currency) {
    if (currency === 'USD') return { type: "account/deposit", payload: amount }
    return async function (disptach, getState) {
        //api call
        // disptach({ type: "account/convertingCurr" })
        const res = await fetch(`https://www.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
        const data = await res.json()
        console.log(data);
        const convertedAmount = data.rates.USD
        // dispatch action action 
        disptach({ type: "account/deposit", payload: convertedAmount })
    }
}


export default accountSlice.reducer
export const { payLoan, requestLoan, withdraw } = accountSlice.actions