export type User = {
    surname: string,
    name: string,
    age: number,
    city: string,
    id: number
}

export type ResponseAuthData = {
    id: number | null,
    username: string
}

export type AuthData = {
    userName: string,
    password: string
}

// export type UserResponseData = {
//     id: number,
//     username: string,
//     token: string
// }
