import "./header.css"
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <div className={"header-container"}>
            <div className={"text"}>
                ЛИЧНЫЙ КАБИНЕТ
            </div>
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


        </div>
    )
}
export default Header;