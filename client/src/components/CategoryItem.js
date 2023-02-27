import React, {useState} from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Popover from '@mui/material/Popover';
import UpdateCategory from "../UpdateCategory";

function CategoryItem({id, title, budget, current, onUpdateCategory}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [error, setError] = useState("");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const check = open ? 'simple-popover' : undefined;

    function handleAddMoney(newCurrent) {
        setAnchorEl(null);

        fetch(`/budget_categories/${id}`, {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                current_spent: current + newCurrent
            })
        })
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    onUpdateCategory(data);
                })
            } else {
                res.json().then(e => setError(e.errors))
            }
        });
    }

    const card = (
        <React.Fragment>
          <CardContent>
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
          <CardActions>
            <Button onClick={handleClick} color="error" size="small">Add Money</Button>
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
                <UpdateCategory onAddMoney={handleAddMoney} />
            </Popover>
          </CardActions>
        </React.Fragment>
      );

    return (
        <Grid item xs={4}>
            <Card className="cat" variant="outlined">{card}</Card>
        </Grid>
    );
}

export default CategoryItem;