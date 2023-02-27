import React, {useState} from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

function CategoryItem() {
    const title = "Entertainment"
    const budget = 2000;
    const current = 500;

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
            <Button color="error" size="small">Add Money</Button>
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