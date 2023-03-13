import React, {useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AddTagForm({onAddTag, setAnchorEl}) {
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState([]);

    function handleAddMoney(event) {
        event.preventDefault();

        fetch('/tags', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                title: title
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    onAddTag(data);
                    setAnchorEl(null);
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
                '& .MuiTextField-root': { m: 1, width: '24ch' },
            }}
            className="form"
            noValidate
            autoComplete="off"
        >
            {errors.length !== 0 ? renderErrors : null}
            <TextField
                required
                id="tag"
                label="Title of new tag"
                onChange={event => setTitle(event.target.value)}
            /><br></br><br></br>
            <Button id="addMoney" onClick={handleAddMoney} variant="outlined" color="error">
                Add
            </Button><br></br><br></br>
        </Box>
    )
}

export default AddTagForm;