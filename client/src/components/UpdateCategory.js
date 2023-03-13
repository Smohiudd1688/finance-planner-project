import React, {useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function UpdateCategory ({onAddMoney, setAnchorEl}) {
    const [current, setCurrent] = useState("");

    function handleAddMoney(event) {
        event.preventDefault();

        setAnchorEl(null);
        onAddMoney(current);
    }

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
            <TextField
                required
                id="current"
                label="Amount of money to add"
                onChange={event => setCurrent(event.target.value)}
            /><br></br><br></br>
            <Button id="addMoney" onClick={handleAddMoney} variant="outlined" color="error">
                Add
            </Button><br></br><br></br>
        </Box>
    )
}

export default UpdateCategory;