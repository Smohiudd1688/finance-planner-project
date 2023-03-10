import React, {useState} from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import PopoverForm from "./PopoverForm";

function CategoryItem({id, title, budget, current, onUpdateCategory}) {
    const [error, setError] = useState("");

    function handleAddMoney(newCurrent) {
        if (parseInt(newCurrent) === NaN || parseInt(newCurrent).toString().length !== newCurrent.length || parseInt(newCurrent) <= 0) {
            setError("Please enter a valid number greater than zero.") 
        } else {
            const updatedCurrent = parseFloat(current) + parseFloat(newCurrent);

            fetch(`/budget_categories/${id}`, {
                method: "PATCH",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    current_spent: updatedCurrent
                })
            })
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        onUpdateCategory(data);
                        setError("");
                    })
                } else {
                    res.json().then(e => setError(e.errors))
                }
            });
        }

    }

    const card = (
        <React.Fragment>
          <CardContent>
            {error !== "" ? <p className="errors" >* {error}</p> : null}
            <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
              {title}
            </Typography>
            
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Amount Spent:
            </Typography>
            <LinearProgress id="progress" color="error" variant="determinate" value={current/budget * 100} />
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              ${current} out of ${budget}
            </Typography>
          </CardContent>
          <PopoverForm onAddMoney={handleAddMoney} label="Add Money"/>
        </React.Fragment>
      );

    return (
        <Grid item xs={4}>
            <Card className="cat" variant="outlined">{card}</Card>
        </Grid>
    );
}

export default CategoryItem;