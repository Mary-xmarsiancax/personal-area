import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";

function App() {
    return (
        <div className="App-container">
            <header>
                <Header/>
            </header>
            <div className={"content"}>
                <Content/>
            </div>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default App;
