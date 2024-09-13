import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../features/eventSlice.js";
import {
    Container,
    TextField,
    Grid,
    Checkbox,
    FormControlLabel,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    ButtonGroup
  } from "@mui/material";

export default function Events () {

    const dispatch = useDispatch();
    const { isSuccess, isError } = useSelector((state) => state.event);

    const [formData, setFormData] = useState({
        eventName: "",
        eventFormat: "",
        type: "",
        status: "",
        payment: "",
        hours: "",
        date: "",
        fromTime: "",
        toTime: "",
        noOfParticipants: "",
        court: [],
        totalWorkers: "",
        totalWorkerHours: "",
        employeeSalary: "",
        amount: "",
        gender: "",
        ageGroup: [],
        paymentStatus: "",
        food: [],
        foodCost: "",
        description: "",
        contactPerson: "",
        contactNumber: "",
        contactEmail: "",
        needPhotographer: false,
        sendSurvey: false,
        surveyQuestion: "",
        adminRemark: "",
        lead: ""
    });

    const [courtName, setCourtName] = useState([])
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    const handleChange = (name, val) => {
        const field = name;
        setFormData({...formData, [field]: val });
    }

    const handleDateTimeChange = (name, val) => {
        const field = name;
        const date = formData.date
        const [year, month, day] = date.split('-');
        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${val}:00`;
        const isoString = new Date(formattedDate).toISOString();
        setFormData({...formData, [field]: isoString });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addEvent(formData));
    }
    
    return (
        <div>
            <h1>Create Events</h1>
            <Container>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Event Name"
                                name="eventName"
                                value={formData.eventName}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel>Event Formate</InputLabel>
                            <ButtonGroup variant="outlined" aria-label="Basic button group">
                                <Button onClick={() => {handleChange('eventFormat','Public')}}>Public</Button>
                                <Button onClick={() => {handleChange('eventFormat','Global')}}>Global</Button>
                                <Button onClick={() => {handleChange('eventFormat','Local')}}>Local</Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel>Event Type</InputLabel>
                                <Select
                                    value={formData.type}
                                    name="type"
                                    onChange={handleInputChange}
                                    required
                                >
                                    <MenuItem value="Private">Private</MenuItem>
                                    <MenuItem value="Public">Public</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel>Event Status</InputLabel>
                                <Select
                                    value={formData.status}
                                    name="status"
                                    onChange={handleInputChange}
                                    required
                                >
                                    <MenuItem value="Contract">Contract</MenuItem>
                                    <MenuItem value="Active">Active</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                type="date"
                                fullWidth
                                label="Event Date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        {formData.date && (
                            <>
                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        type="time"
                                        label="From Time"
                                        name="fromTime"
                                        onChange={(e) => {handleDateTimeChange('fromTime', e.target.value)}}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        type="time"
                                        label="To Time"
                                        name="toTime"
                                        onChange={(e) => {handleDateTimeChange('toTime', e.target.value)}}
                                        required
                                    />
                                </Grid>
                            </>
                        )}
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                value={formData.gender}
                                name="gender"
                                onChange={handleInputChange}
                                required
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                            <InputLabel>Age Group</InputLabel>
                            <Select
                                multiple
                                value={formData.ageGroup}
                                onChange={(e) => {handleChange('ageGroup', e.target.value)}}
                                required
                            >
                                <MenuItem value="16-18">16-18</MenuItem>
                                <MenuItem value="18-30">18-30</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Number of Participants"
                                name="noOfParticipants"
                                value={formData.noOfParticipants}
                                onChange={handleInputChange}
                                type="number"
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                            <InputLabel>courtName</InputLabel>
                            <Select
                                multiple
                                value={courtName}
                                onChange={(e) => { setCourtName(e.target.value);}}
                                required
                            >
                                <MenuItem value={'Gold 1'}>Gold 1</MenuItem>
                                <MenuItem value={'Gold 2'}>Gold 2</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                        {courtName.map((item) => (
                            <Grid item xs={6} key={item}>
                                <TextField
                                    fullWidth
                                    label={`No. of workers for ${item}`}
                                    name="noOfWorkers"
                                    onChange={(e) => { handleChange('court', [{name: item, noOfWorkers: e.target.value}])}}
                                    type="number"
                                    required
                                />
                            </Grid> 
                        ))}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Payment Method"
                                name="payment"
                                value={formData.payment}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel>Payment Method</InputLabel>
                            <ButtonGroup variant="outlined" aria-label="Basic button group">
                                <Button onClick={() => {handleChange('payment','Online')}}>Online</Button>
                                <Button onClick={() => {handleChange('payment','Offline')}}>Offline</Button>
                                <Button onClick={() => {handleChange('payment','Free')}}>Free</Button>
                            </ButtonGroup>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                            <InputLabel>Payment Status</InputLabel>
                            <Select
                                value={formData.paymentStatus}
                                name="paymentStatus"
                                onChange={handleInputChange}
                                required
                            >
                                <MenuItem value="Paid">Paid</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                type="number"
                                required
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Average payment per participant"
                                name="amount"
                                value={100}
                                disabled
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                            <InputLabel>Food</InputLabel>
                            <Select
                                multiple
                                value={formData.food}
                                name="food"
                                onChange={handleInputChange}
                                required
                            >
                                <MenuItem value="Snacks">Snacks</MenuItem>
                                <MenuItem value="Combo(no-alcohol)">Combo(no-alcohol)</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>    
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                multiline
                                rows={4}
                                required
                            />
                        </Grid> 
                        <Grid item xs={12}>
                            <InputLabel>Actual hours in the place</InputLabel>
                            <ButtonGroup variant="outlined" aria-label="Basic button group">
                                <Button onClick={() => {handleChange('hours','1-2')}}>1-2</Button>
                                <Button onClick={() => {handleChange('hours','2-3')}}>2-3</Button>
                                <Button onClick={() => {handleChange('hours','3-4')}}>3-4</Button>
                                <Button onClick={() => {handleChange('hours','4-5')}}>4-5</Button>
                            </ButtonGroup>
                        </Grid> 
                        <Grid item xs={12}>
                            <FormControlLabel
                            control={
                                <Checkbox
                                checked={formData.needPhotographer}
                                onChange={handleCheckboxChange}
                                name="needPhotographer"
                                />
                            }
                            label="Need Photographer?"
                            />
                        </Grid>   
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Contact Person"
                                name="contactPerson"
                                value={formData.contactPerson}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Contact Number"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                type="phone"
                                required
                            />
                        </Grid> 
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Contact Email"
                                name="contactEmail"
                                value={formData.contactEmail}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid> 
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                            <InputLabel>How did you find our lead?</InputLabel>
                            <Select
                                value={formData.lead}
                                name="lead"
                                onChange={handleInputChange}
                                required
                            >
                                <MenuItem value="Instagram">Instagram</MenuItem>
                                <MenuItem value="Faceboo">Facebook</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>   
                        <Grid item xs={12}>
                            <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.sendSurvey}
                                    onChange={handleCheckboxChange}
                                    name="sendSurvey"
                                />
                            }
                            label="Send Survey?"
                            />
                        </Grid> 
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Survey Question"
                                name="surveyQuestion"
                                value={formData.surveyQuestion}
                                onChange={handleInputChange}
                                disabled={!formData.sendSurvey}
                            />
                        </Grid> 
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Remark"
                                name="adminRemark"
                                value={formData.adminRemark}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Total Workers"
                                name="totalWorkers"
                                value={formData.totalWorkers}
                                onChange={handleInputChange}
                                type="number"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Total Worker Hours"
                                name="totalWorkerHours"
                                value={formData.totalWorkerHours}
                                onChange={handleInputChange}
                                type="number"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Employee Salary"
                                name="employeeSalary"
                                value={formData.employeeSalary}
                                onChange={handleInputChange}
                                type="number"
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Food Cost"
                                name="foodCost"
                                value={formData.foodCost}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button fullWidth variant="contained" type="submit">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>

            {isSuccess && (<p className="success-message">Event Created successfully</p>)}
            {isError && (<p className="error-message">Something went wrong</p>)}
        </div>
    )
}