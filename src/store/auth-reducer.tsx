import {InferActionsTypes} from "./redux-store";

export const actions = {
    setUsersName: (name: string) => ({type: "SET_USERS_NAME", name} as const),
    // setRegistrationErrorsText: (text: string) => ({type: "SET_REGISTRATION_ERRORS_TEXT", text} as const),
    // setLoading: (loadingStatus: boolean) => ({type: "SET_LOADING", loadingStatus} as const),
}
type AuthActionsType = InferActionsTypes<typeof actions>

type UsersName = {
    username: string | null
}

type Errors = {
    registrationTextError: string
}
type IsLoading = {
    isLoading: boolean
}

let initialState: UsersName & Errors & IsLoading = {
    username: localStorage.getItem("currentUserName"),
    registrationTextError: "",
    isLoading: false
}

const authReducer = (state = initialState, action: AuthActionsType) => {
    switch (action.type) {
        case "SET_USERS_NAME": {
            let copyState = {...state}
            copyState.username = action.name
            return copyState
        }

        default:
            return state;
    }

}

//thunks

export const setUsersName = (name: string) => (dispatch: any) => {
    dispatch(actions.setUsersName(name))
    localStorage.setItem("currentUserName", name.toString())
}
export default authReducer;