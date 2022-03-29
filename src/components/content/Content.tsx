import "./content.css"
import Auth from "./auth/Auth";
import {Route, Routes} from "react-router-dom";

const Content = () => {
    return (
        <div className={"content-container"}>
            <Routes>
                <Route path="login" element={<Auth registration={false}/>}/>
                <Route path="registration" element={<Auth registration={true}/>}/>

            </Routes>
        </div>
    )
}
export default Content;