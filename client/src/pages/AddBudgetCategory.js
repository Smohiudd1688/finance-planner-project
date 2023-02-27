import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "../components/UserContext";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AddBudgetCategory () {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");
    const [budget, setBudget] = useState("");

    const history = useHistory();

    function handleAddCategory(event) {
        event.preventDefault();

        const budgetCategory = {
            title: title,
            budget: budget,
            current_spent: 0
        }

        console.log(budgetCategory)

        fetch('/budget_categories', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(budgetCategory)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    history.push('/');
                })
            } else {
                res.json().then(e => setErrors(e.errors))
            }
        });
    }

    const renderErrors = errors.map((error, index) => {
        return (
            <p className="errors" key={index}>* {error}</p>
        );
    });

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
            {errors.length !== 0 ? renderErrors : null}
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