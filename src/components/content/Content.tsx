import "./content.css"
import Auth from "./auth/Auth";
import {Route, Routes} from "react-router-dom";
import React from "react";
import Users from "./users/Users";

const Content:React.FC = ():React.ReactElement => {

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