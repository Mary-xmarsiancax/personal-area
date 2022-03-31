import "./footer.css"
import React from "react";

const Footer: React.FC = (): React.ReactElement => {
    return (
        <div className={"footer-container"}>
            <ul>
                <li><b>КОНТАКТЫ</b></li>
                <li>Барочкина М.</li>
                <li>Skype: xmarsiancax</li>
                <li><a href="https://vk.com/xmarsiancax">vk.com/xmarsiancax</a></li>

            </ul>
        </div>
    )
}
export default Footer;