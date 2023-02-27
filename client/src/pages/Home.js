import React, {useContext, useState, useEffect} from "react";
import { UserContext } from "../components/UserContext";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CategoryItem from "../components/CategoryItem";

function Home() {
    const {user} = useContext(UserContext);
    const [categories, setCategories] = useState([]);

    const history = useHistory();

    useEffect(() => {
        fetch('/budget_categories')
        .then(res => res.json())
        .then(data => setCategories(data));
    }, []);

    function handleAddCatButton() {
        history.push('/add_category');
    }

    function handleUpdateCategory(updatedCategory) {
        const updatedCategories = categories.map((category) => {
            if (updatedCategory.id === category.id) return updatedCategory;
            return category;
        });

        setCategories(updatedCategories);
    }

    const renderCategories = categories.map(category => {
        return (<CategoryItem 
            key={category.id}
            id={category.id}
            title={category.title}
            budget={category.budget}
            current={category.current_spent}
            onUpdateCategory={handleUpdateCategory}
        />)
    });

    return (
       <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h1 className="header">SUMMARY OF YOUR MONTH IN MONEY</h1>
                </Grid> 
                <Grid item xs={6}>
                    <Button onClick={handleAddCatButton} id="addButton" variant="contained" color="error">
                        Add a Category to Track
                    </Button>
                </Grid>
                {renderCategories}
            </Grid>
        </Box>
    );
}

export default Home;