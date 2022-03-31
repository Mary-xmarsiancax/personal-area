import axios, {AxiosResponse} from "axios";
import {AuthData, User} from "./api-types";


export const authAPI = {
    registration(data: AuthData) {
        if (!localStorage.getItem("registeredList")) {
            localStorage.setItem("registeredList", JSON.stringify([
                    {
                        userName: data.userName,
                        password: data.password
                    }
                ]
            ))
            return data.userName
        } else {
            const list = localStorage.getItem("registeredList")
            if (list) {
                const listArr = JSON.parse(list)
                listArr.push({
                    userName: data.userName,
                    password: data.password
                })
                localStorage.setItem("registeredList", JSON.stringify(listArr))
            }
        }
        return data.userName
    },
    login(data: AuthData): string | null {
        const list = localStorage.getItem("registeredList")
        if (list) {

            const listArr = JSON.parse(list)
            const userIsRegister = listArr.find((obj: AuthData) => {
                return obj.userName === data.userName && obj.password === data.password
            })
            if (userIsRegister) {
                return userIsRegister.userName
            } else {
                return null
            }
        } else {
            return null
        }
    }
}

export const usersAPI = {
    getUsers(): Promise<AxiosResponse<Array<User>>> {
        return axios.get(` http://localhost:3000/users`)
    },

    setUser(user: User): Promise<AxiosResponse<User>> {
        return axios.post(` http://localhost:3000/users`, user)
    },
    deleteUser(id: number): Promise<AxiosResponse<User>> {
        return axios.delete(` http://localhost:3000/users/${id}`)
    }

}
