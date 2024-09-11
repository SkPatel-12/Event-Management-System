import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Box, Button } from "@mui/material";
import { loginUser } from "../features/authSlice.js";

export default function Auth () {
    const [formData, setFormData] = useState({
        code: '',
        role: ''
    });

    const { isSuccess, isError, error } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        const { code, role } = formData;
        e.preventDefault();
        dispatch(loginUser({ code, role }));
        if (isSuccess) {
            navigate("/");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <Box
                component="form"
                autoComplete="off"
                style={{ width: '25%'}}
                onSubmit={handleSubmit}
            >
                <div>
                    <TextField
                        fullWidth
                        id="code"
                        label="Code"
                        variant="outlined"
                        value={formData.code}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        fullWidth
                        id="role"
                        label="Role"
                        variant="outlined"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    />
                    
                    <Button variant="outlined" type="submit">Login</Button>
                </div>
            </Box>
        </div>
    )
}