import React, {useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Register from "./components/register";
import Login from "./components/login";
import Admin from "./components/admin";
import NavigationBar from "./components/navigation-bar";

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className={"bg-black min-vh-100 flex-row justify-content-center align-content-center"}>
            <Router>
                <NavigationBar token={token} onLogout={handleLogout}/>
                <Routes>
                    <Route path="/" element={<Register/>}/>
                    <Route path="/login" element={<Login setToken={setToken}/>}/>
                    <Route
                        path="/admin"
                        element={token ? <Admin token={token}/> : <Navigate to="/login"/>}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;