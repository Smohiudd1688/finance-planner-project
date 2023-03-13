import React, {useState} from "react";
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import UpdateCategory from "./UpdateCategory";
import AddTagForm from "./AddTagForm";

function PopoverForm({label, onAddMoney, onAddTag}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const check = open ? 'simple-popover' : undefined;

    return (
        <CardActions>
            <Button onClick={handleClick} id={label === "+ Add New Tag" ? "tagPopover" : null} color="error" size="small">{label}</Button>
            <Popover
                id={check}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
            >
                {label === "Add Money" ? 
                <UpdateCategory setAnchorEl={setAnchorEl} onAddMoney={onAddMoney} /> :
                 <AddTagForm setAnchorEl={setAnchorEl} onAddTag={onAddTag} />}
            </Popover>
          </CardActions>
    );
}

export default PopoverForm;