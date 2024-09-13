import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
        await dispatch(loginUser({ code, role }));
    };

    useEffect(() => {
        if (isSuccess) {
          navigate("/");
        }
    }, [isSuccess, navigate]);

    return (
        <div>
            <h1>Login</h1>
            <div className="login-form">
                <Box
                    component="form"
                    autoComplete="off"
                    style={{ width: '25%'}}
                    onSubmit={handleSubmit}
                >
                    <div className="text-field">
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
                {isError && (<p className="error-message">{error}</p>)}
                </Box>
            </div>
        </div>
    )
}