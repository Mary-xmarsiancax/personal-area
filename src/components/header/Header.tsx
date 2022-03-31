import "./header.css"
import {NavLink} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/redux-store";
import {setUsersName} from "../../store/auth-reducer";

const Header: React.FC = (): React.ReactElement => {
    const username = useSelector<AppState>((state) => state.authStore.username) as string;
    const dispatch =useDispatch()
    const currentUserNameDelete = () => {
        localStorage.removeItem("currentUserName")
        dispatch(setUsersName(""))
    }

    return (
        <div className={"header-container"}>
            <div className={"text"}>
                ЛИЧНЫЙ КАБИНЕТ
            </div>
            {!username ?
                <div className={"registration-text"}>
                <span>
                    <NavLink to="/login" className={"link"}>
                        ВОЙТИ
                    </NavLink>
                </span>
                    <span className={"divider"}>
                /
                </span>
                    <span>
                    <NavLink to="/registration" className={"link"}>
                             РЕГИСТРАЦИЯ
                    </NavLink>
                </span>
                </div>
                :
                <div className={"registration-text"}>
                    <div className={"username"}>Имя пользователя: {username}</div>
                    <button className={"exit-button"} onClick={currentUserNameDelete}>ВЫЙТИ</button>
                </div>

            }
        </div>
    )
}
export default Header;