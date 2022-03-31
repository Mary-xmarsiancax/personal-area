import "./auth.css"
import {NavLink} from "react-router-dom";
import React from "react";
import {useForm} from "react-hook-form";
import {AuthData} from "../../../services/api-types";
import {authAPI} from "../../../services/Api";
import {useDispatch} from "react-redux";
import {setUsersName} from "../../../store/auth-reducer";

type AuthProps = { registration: boolean }

const Auth: React.FC<AuthProps> = (props): React.ReactElement => {
    let dispatch = useDispatch()
    const {register, handleSubmit} = useForm<AuthData>()

    const onSubmit = handleSubmit((data: AuthData) => {
            if (props.registration) {
                const newUserNameRegister = authAPI.registration(data)
                dispatch(setUsersName(newUserNameRegister))
            } else {
                const userIsRegisterName = authAPI.login(data)
                if (userIsRegisterName) {
                    dispatch(setUsersName(userIsRegisterName))
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
                            <input name="passwordRepeat" type="password" className="input password"
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
        </div>
    )
}
export default Auth;