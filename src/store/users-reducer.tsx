import {User} from "../services/api-types";
import {InferActionsTypes} from "./redux-store";
import {usersAPI} from "../services/Api";

export const actions = {
    setUsers: (users: Array<User>) => ({type: "SET_USERS", users} as const)
}


type UsersActionsType = InferActionsTypes<typeof actions>
type UsersState = { users: Array<User> }

let initialState: UsersState = {
    users: []
}
const usersReducer = (state = initialState, action: UsersActionsType) => {
    switch (action.type) {
        case "SET_USERS": {
            let copyState = {...state}
            let copyUsers = [...state.users]
            copyUsers = action.users
            copyState.users = copyUsers
            return copyState
        }

        default:
            return state;
    }
}
//thunks
export const setUsers = () => (dispatch: any) => {
    usersAPI.getUsers()
        .then((resp) => {
                dispatch(actions.setUsers(resp.data))
        })

}
export default usersReducer;