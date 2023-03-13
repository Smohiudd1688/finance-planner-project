import React, {useContext, useState, useEffect} from "react";
import { UserContext } from "../components/UserContext";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function Wanted({wantedItem, setWantedItem}) {
    const {user} = useContext(UserContext);

    const history = useHistory();

    function handleAddItemButton() {
        history.push('/add_item');
    }



    return (
       <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h1 className="header">WANTED ITEMS TRACKER</h1>
                </Grid> 
                <Grid item xs={6}>
                    <Button onClick={handleAddItemButton} id="addButtonItem" variant="contained" color="error">
                        Add an Item to Buy
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Wanted;