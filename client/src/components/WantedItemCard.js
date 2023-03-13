import React, {useState} from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import PopoverForm from "./PopoverForm";
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';


function WantedItemCard({id, title, price, amountSaved, importance, reason, tags, onUpdateWanted, onDeleteItem}) {
    const [error, setError] = useState("");

    const renderTags = tags.map(tag => {
        return (
            <Button id="wantButton" key={tag.id} variant="contained" disabled>
                {tag.title}
            </Button>
        )
    });

    function handleAddWantedMoney(newSaved) {
        if (parseInt(newSaved) === NaN || parseInt(newSaved).toString().length !== newSaved.length || parseInt(newSaved) <= 0) {
            setError("Please enter a valid number greater than zero.") 
        } else {
            const updatedSaved = parseFloat(amountSaved) + parseFloat(newSaved);

            fetch(`/wanted_items/${id}`, {
                method: "PATCH",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    amount_saved: updatedSaved
                })
            })
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        onUpdateWanted(data);
                        setError("");
                    })
                } else {
                    res.json().then(e => setError(e.errors))
                }
            });
        }
    }

    function handleDelete() {
        fetch(`/wanted_items/${id}`, {
            method: "DELETE"
        })
        .then(res => onDeleteItem(id))
    }

    return (
        <Card id="want" variant="outlined">
          <CardContent>
            {error !== "" ? <p className="errors" >* {error}</p> : null}
            <Typography sx={{ fontSize: 28 }} color="text.secondary" gutterBottom>
              <strong>{title}</strong>
            </Typography>
            {renderTags}
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom><strong>Importance of Item:</strong></Typography>
            <Rating name="read-only" value={importance} readOnly /><br></br>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              <strong>Reason you want this item:</strong> {reason}
            </Typography>  
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              <strong>Amount Saved:</strong>
            </Typography>
            <LinearProgress id="progressWant" color="error" variant="determinate" value={amountSaved/price * 100} />
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              ${amountSaved} out of ${price}
            </Typography>
            <Button onClick={handleDelete} variant="contained" color="error">
                Delete Item
            </Button>
            <PopoverForm onAddMoney={handleAddWantedMoney} label="Add Money"/>
          </CardContent>
        </Card>
    );
}

export default WantedItemCard;