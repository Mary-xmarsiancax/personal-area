import "./auth.css"
import {NavLink} from "react-router-dom";
import React from "react";

type AuthProps = { registration: boolean }

const Auth: React.FC<AuthProps> = (props): React.ReactElement => {

    return (
        <div>
            {props.registration
                ?
                <div className="auth-container">
                    <form name="login-form" className="login-form" action="">
                        <div className="header">
                            <h1>Регистрация</h1>
                            <span>Введите ваши регистрационные данные для регистрации в личном кабинете. </span>
                        </div>
                        <div className="content">
                            <input name="username" type="text" className="input username" value="Логин"/>
                            <input name="password" type="password" className="input password" value="Пароль"/>
                            <input name="passwordRepeat" type="password" className="input password" value="Пароль"/>
                        </div>
                        <div className="footer content-center">
                            <input type="submit" name="submit" value="Регистрация" className="button"/>
                        </div>
                    </form>
                </div>
                :
                <div className="auth-container">
                    <form name="login-form" className="login-form" action="">
                        <div className="header">
                            <h1>Авторизация</h1>
                            <span>Введите ваши регистрационные данные для входа в ваш личный кабинет. </span>
                        </div>
                        <div className="content">
                            <input name="username" type="text" className="input username" value="Логин"/>
                            <input name="password" type="password" className="input password" value="Пароль"/>
                        </div>
                        <div className="footer">
                            <input type="submit" name="submit" value="ВОЙТИ" className="button"/>
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