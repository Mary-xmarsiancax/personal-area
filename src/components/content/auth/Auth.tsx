import "./auth.css"
import {NavLink} from "react-router-dom";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {AuthData} from "../../../services/api-types";
import {authAPI} from "../../../services/Api";
import {useDispatch} from "react-redux";
import {setUsersName} from "../../../store/auth-reducer";
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";

type AuthProps = { registration: boolean }

const Auth: React.FC<AuthProps> = (props): React.ReactElement => {
    let dispatch = useDispatch()
    const {register, handleSubmit} = useForm<AuthData>()
    const [message, setMessage] = useState("")

    const onSubmit = handleSubmit((data: AuthData) => {
            if (data.passwordRepeat) {
                if (data.password === data.passwordRepeat) {
                    const newUserNameRegister = authAPI.registration(data)
                    dispatch(setUsersName(newUserNameRegister))
                } else {
                    setMessage("Пароли не совпадают")
                }
            } else {
                    const userIsRegisterName = authAPI.login(data)
                    if (userIsRegisterName) {
                        dispatch(setUsersName(userIsRegisterName))
                    } else {
                        setMessage("Неверные имя пользователя или пароль")
                    }
                }
        }
    )

    return (
        <div>
            {props.registration
                ?
                <div className="auth-container">
                    <form onSubmit={onSubmit} name="login-form" className="login-form">
                        <div className="header">
                            <h1>Регистрация</h1>
                            <span>Введите ваши регистрационные данные для регистрации в личном кабинете. </span>
                        </div>
                        <div className="content">
                            <input {...register("userName")} name="userName" type="text" className="input username"
                                   placeholder="логин"/>
                            <input {...register("password")} name="password" type="password" className="input password"
                                   placeholder="пароль"/>
                            <input {...register("passwordRepeat")} name="passwordRepeat" type="password"
                                   className="input password"
                                   placeholder="пароль"/>
                        </div>
                        <div className="footer content-center">
                            <input type="submit" name="submit" value="Регистрация" className="button"
                                   onClick={onSubmit}/>
                        </div>
                    </form>
                </div>
                :
                <div className="auth-container">
                    <form onSubmit={onSubmit} name="login-form" className="login-form" action="">
                        <div className="header">
                            <h1>Авторизация</h1>
                            <span>Введите ваши регистрационные данные для входа в ваш личный кабинет. </span>
                        </div>
                        <div className="content">
                            <input {...register("userName")} name="userName" type="text" className="input username"
                                   placeholder="логин"/>
                            <input {...register("password")} name="password" type="password" className="input password"
                                   placeholder="пароль"/>
                        </div>
                        <div className="footer">
                            <input type="submit" name="submit" value="ВОЙТИ" className="button"
                                   onClick={onSubmit}/>
                            <NavLink to="/registration" className={"link"}>
                                <input type="submit" name="submit" value="Регистрация" className="register"/>
                            </NavLink>
                        </div>
                    </form>
                </div>
            }
            <Dialog open={!!message} onClose={() => setMessage("")}>
                <form onSubmit={onSubmit}>
                    <DialogTitle>{message}</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => setMessage("")}>Ок</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}
export default Auth;