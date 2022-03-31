import "./content.css"
import Auth from "./auth/Auth";
import {Route, Routes, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import Users from "./users/Users";
import {useSelector} from "react-redux";
import {AppState} from "../../store/redux-store";

const Content: React.FC = (): React.ReactElement => {

    let username = useSelector<AppState>((state)=>state.authStore.username) as string;
    const navigate = useNavigate();
    useEffect(() => {
        if (username){
            navigate('/users', {replace: true})
        } else {
            navigate('/login', {replace: true})
        }
    }, [username])

    return (
        <div className={"content-container"}>
            <Routes>
                <Route path="/" element={<Auth registration={false}/>}/>
                <Route path="login" element={<Auth registration={false}/>}/>
                <Route path="registration" element={<Auth registration={true}/>}/>
                <Route path="users" element={<Users/>}/>
            </Routes>
        </div>
    )
}
export default Content;