import React, {useContext, useState, useEffect} from "react";
import { UserContext } from "../components/UserContext";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function Home() {
    const {user} = useContext(UserContext);
    const [categories, setCategories] = useState([]);

    const history = useHistory();

    useEffect(() => {
        fetch('/budget_categories')
        .then(res => res.json())
        .then(data => setCategories(data));
    }, []);

    console.log(categories)

    function handleAddCatButton() {
        history.push('/add_category');
    }

    return (
       <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h1 className="header">Summary of Your Month in Money</h1>
                </Grid> 
                <Grid item xs={6}>
                    <Button onClick={handleAddCatButton} id="addButton" variant="contained" color="error">
                        Add a Category to Track
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;