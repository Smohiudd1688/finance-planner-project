import React, {useContext, useState, useEffect} from "react";
import { UserContext } from "../components/UserContext";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function Home() {
    const {user} = useContext(UserContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/budget_categories')
        .then(res => res.json())
        .then(data => setCategories(data));
    }, [])

    return (
       <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h1 className="header">Summary of Your Month in Money</h1>

                </Grid> 
            </Grid>
        </Box>
    );
}

export default Home;