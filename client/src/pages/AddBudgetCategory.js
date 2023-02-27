import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "../components/UserContext";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

function AddBudgetCategory () {
    const {user, setUser} = useContext(UserContext);
    const [errors, setErrors] = useState(false);
    const [title, setTitle] = useState("");
    const [budget, setBudget] = useState("");

    function handleAddCategory(event) {
        event.preventDefault();
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '35%' },
            }}
            className="form"
            noValidate
            autoComplete="off"
        >
            <h2>Add a Category</h2>
            <TextField
                required
                id="title"
                label="Category for the Budget (e.g. Entertainment)"
                variant="standard"
                onChange={event => setTitle(event.target.value)}
            /><br></br><br></br>
            <TextField
                required
                id="budget"
                label="Amount allowed per month (e.g. 150)"
                variant="standard"
                onChange={event => setBudget(event.target.value)}
            /><br></br><br></br>
            <Button onClick={handleAddCategory} variant="outlined" color="error">
                Add Category
            </Button><br></br><br></br>
        </Box>
    )
}

export default AddBudgetCategory;