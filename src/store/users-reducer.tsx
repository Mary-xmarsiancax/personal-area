import {User} from "../services/api-types";
import {InferActionsTypes} from "./redux-store";
import {usersAPI} from "../services/Api";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export const actions = {
    setUsers: (users: Array<User>) => ({type: "SET_USERS", users} as const),
    setSelectedId: (id: number) => ({type: "SET_SELECTED_ID", id} as const)
}

type UsersActionsType = InferActionsTypes<typeof actions>
type Selected = { selectedId: number | null }
type Users = { users: Array<User> }
type UsersState = Users & Selected


let initialState: UsersState = {
    users: [],
    selectedId: null
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
        case "SET_SELECTED_ID": {
            let copyState = {...state}
            copyState.selectedId = action.id
            return copyState
        }

        default:
            return state;
    }
}
//thunks
export const setUsers = () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    usersAPI.getUsers()
        .then((resp) => {
            dispatch(actions.setUsers(resp.data))
        })

}
export const addUser = (user: User) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    usersAPI.setUser(user)
        .then(resp => {
            usersAPI.getUsers()
                .then((resp) => {
                    dispatch(actions.setUsers(resp.data))
                })
        })
}

export const updateUser = (user: User) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    usersAPI.updateUser(user)
        .then(resp => {
            usersAPI.getUsers()
                .then((resp) => {
                    dispatch(actions.setUsers(resp.data))
                })
        })
}

export const setSelectedId = (id: number) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actions.setSelectedId(id))
}
export const userDelete = (id: number) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    usersAPI.deleteUser(id)
        .then(resp => {
            usersAPI.getUsers()
                .then((resp) => {
                    dispatch(actions.setUsers(resp.data))
                })
        })
}

export default usersReducer;