import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import PopoverForm from "../components/PopoverForm";

function AddWantedItem () {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [importance, setImportance] = useState(0);
    const [reason, setReason] = useState("");
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        setErrors([]);

        fetch(`/tags`).then((res) => {
            if (res.ok) {
               res.json().then((data) => {
                  setTags(data)
                });
               } else {
                alert("Error retrieving tags");
               }
            });
    }, []);

    const history = useHistory();

    function handleAddItem(event) {
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

    function handleAddTag() {

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
            <h2 className="header">ADD AN ITEM TO SAVE FOR</h2>
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
            <Autocomplete
                    multiple
                    id="tags-standard"
                    options={tags}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Tags"
                            placeholder="Select Tags"
                        />
                    )}
                    onChange={(event, value) => setSelectedTags(value)}
            />
            <PopoverForm label="+ Add New Tag" /><br></br>
            <Typography component="legend">Importance of Item</Typography>
            <Rating
                name="simple-controlled"
                id="rating"
                value={importance}
                onChange={(event, value) => {
                    setImportance(value);
                }}
            /><br></br><br></br>
            <Button onClick={handleAddItem} variant="contained" color="error">
                Add Item
            </Button><br></br><br></br>
        </Box>
    )
}

export default AddWantedItem;