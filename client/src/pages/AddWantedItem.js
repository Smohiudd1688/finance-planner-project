import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function AddWantedItem () {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [importance, setImportance] = useState("");
    const [reason, setReason] = useState("");

    const tags = ['Entertainment', 'Rent', 'Reading'];

    const history = useHistory();

    function handleAddCategory(event) {
        event.preventDefault();

        const wantedItem = {
            title: title,
            price: price,
            importance: importance,
            reason: reason,
            amount_saved: 0
        }

        fetch('/wanted_items', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(wantedItem)
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
            <h2 className="header">Add an Item to Save For</h2>
            {errors.length !== 0 ? renderErrors : null}
            <TextField
                required
                id="title"
                label="Name of item (e.g. Macbook Pro)"
                variant="standard"
                onChange={event => setTitle(event.target.value)}
            /><br></br><br></br>
            <TextField
                required
                id="price"
                label="Price of item (e.g. 1500)"
                variant="standard"
                onChange={event => setPrice(event.target.value)}
            /><br></br><br></br>
            <TextField
                required
                id="reason"
                label="Reason you want this item"
                variant="standard"
                onChange={event => setReason(event.target.value)}
            /><br></br><br></br>
            <Typography component="legend">Importance of Item</Typography>
            <Rating
                name="simple-controlled"
                id="rating"
                value={importance}
                onChange={(event, newValue) => {
                    setImportance(newValue);
                }}
            /><br></br><br></br>
            <Button onClick={handleAddCategory} variant="outlined" color="error">
                Add Item
            </Button><br></br><br></br>
        </Box>
    )
}

export default AddWantedItem;