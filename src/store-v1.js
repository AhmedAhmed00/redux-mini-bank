import { combineReducers, createStore } from "redux"


const initStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",

}

const inintialStateCustomer = {
    fullName: "",
    nationalId: "",
    createdAt: ""
}


// updating state by dispatching actions
// as son as we update the store all the react componentes that consume data from this store will be rerenderd
// redux is quite similar to combine useReducer with context api
// when we should actually use redux 


function customerReducer(state = inintialStateCustomer, action) {
    switch (action.type) {
        case "customer/create":
            return { ...state, fullName: action.payload.fullName, nationalId: action.payload.nationalId, createdAt: action.payload.createdAt }
        case "customer/updateName":
            return { ...state, fullName: action.payload }
        default:
            return state

    }

}



function accountReducer(state = initStateAccount, aciton) {
    switch (aciton.type) {
        case "account/deposit":
            return { ...state, balance: state.balance + aciton.payload }
        case "account/withdraw":
            return { ...state, balance: state.balance - aciton.payload }
        case "account/requestLoan":
            if (state.loan > 0) return state
            // LATER
            return { ...state, loan: aciton.payload.amount, loanPurpose: aciton.payload.purpose, balance: state.balance + aciton.payload.amount }
        case "account/loanBack":
            return { ...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan }
        default:
            return state
    }
}

// we should not use this exept learnign purpose


function depositeLoan(payload) {
    return { type: "account/deposit", payload: payload }
}

function withdraw(payload) {
    return {
        type: "account/withdraw", payload
    }
}
function requestLoan(amount, purpose) {
    return { type: "account/requestLoan", payload: { amount, purpose } }
}

function payLoan() {
    return { type: "account/loanBack" }
}




// CUSTOMER 
function createCustomer(fullName, nationalId) {
    return { type: "customer/create", payload: { fullName, nationalId, createdAt: new Date().toISOString() } }

}

function updateName(fullName) {
    return { type: "customer/updateName", payload: fullName }

}
const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
})


const store = createStore(rootReducer)

store.dispatch(depositeLoan(5000)) // dispatching action deposit
store.dispatch(withdraw(200)) // dispatching action deposit
store.dispatch(requestLoan(2000, 'مخدرات')) // dispatching action deposit
store.dispatch(payLoan()) // dispatching action deposit

console.log(store.getState());



store.dispatch(createCustomer("ahemd", 777))
store.dispatch(updateName("kom abo radi"))
console.log(store.getState()); 