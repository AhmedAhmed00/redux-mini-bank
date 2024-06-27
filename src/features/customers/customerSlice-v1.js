
const inintialStateCustomer = {
    fullName: "",
    nationalId: "",
    createdAt: ""
}


export default function customerReducer(state = inintialStateCustomer, action) {
    switch (action.type) {
        case "customer/create":
            return { ...state, fullName: action.payload.fullName, nationalId: action.payload.nationalId, createdAt: action.payload.createdAt }
        case "customer/updateName":
            return { ...state, fullName: action.payload }
        default:
            return state

    }

}

// CUSTOMER 
export function createCustomer(fullName, nationalId) {
    return { type: "customer/create", payload: { fullName, nationalId, createdAt: new Date().toISOString() } }

}

export function updateName(fullName) {
    return { type: "customer/updateName", payload: fullName }

}