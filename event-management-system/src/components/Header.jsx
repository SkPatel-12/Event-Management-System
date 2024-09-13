import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../features/authSlice";


export default function Header () {
    const isAuthenticated = Boolean(localStorage.getItem('token'));
    const dispatch = useDispatch();
    const { isSuccess } = useSelector((state) => state.auth);

    return (
        <header className="header">
            <div className="logo-title">
                Event Management System
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to="/">Event</Link></li>
                    {(!isAuthenticated || !isSuccess) ? (<li><Link to="/login">Login</Link></li>) : (<li><Link><span className="logout" onClick={() => { dispatch(logoutUser()) }}>Logout</span></Link></li>)}
                </ul>
            </nav>
        </header>
    );
}