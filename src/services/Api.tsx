import axios, {AxiosResponse} from "axios";
import {User} from "./api-types";

export const authAPI = {

}

export const usersAPI = {
    getUsers(): Promise<AxiosResponse<Array<User>>> {
        return axios.get(` http://localhost:3000/users`)
    }
}
