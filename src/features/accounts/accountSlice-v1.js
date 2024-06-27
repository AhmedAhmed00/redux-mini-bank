const initStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false

}



export default function accountReducer(state = initStateAccount, aciton) {
    switch (aciton.type) {
        case "account/deposit":
            return { ...state, isLoading: false, balance: state.balance + aciton.payload, }
        case "account/withdraw":
            return { ...state, balance: state.balance - aciton.payload }
        case "account/requestLoan":
            if (state.loan > 0) return state

            return { ...state, loan: aciton.payload.amount, loanPurpose: aciton.payload.purpose, balance: state.balance + aciton.payload.amount }
        case "account/loanBack":
            return { ...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan }
        case "account/convertingCurr":
            return { ...state, isLoading: true }
        default:
            return state
    }
}


// acttion creator




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

export function withdraw(payload) {
    return {
        type: "account/withdraw", payload
    }
}
export function requestLoan(amount, purpose) {
    return { type: "account/requestLoan", payload: { amount, purpose } }
}

export function payLoan() {
    return { type: "account/loanBack" }
}

