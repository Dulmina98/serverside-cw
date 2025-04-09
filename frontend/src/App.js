import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from "./components/register";
import Login from "./components/login";
import Admin from "./components/admin";
import NavigationBar from "./components/navigation-bar";

function App() {
    const [token, setToken] = useState('');

    return (
        <div className={"bg-black min-vh-100 flex-row justify-content-center align-content-center"}>
            <NavigationBar/>
            <Router>
                <Routes>
                    <Route path="/" element={<Register/>}/>
                    <Route path="/login" element={<Login setToken={setToken}/>}/>
                    <Route path="/admin" element={<Admin token={token}/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;