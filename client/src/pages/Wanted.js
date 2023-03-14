import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import WantedItemCard from "../components/WantedItemCard";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function Wanted({wantedItems, setWantedItems, tags}) {
    const [filter, setFilter] = useState(null);
    const [filteredItems, setFilteredItems] = useState([]);

    const history = useHistory();

    function handleAddItemButton() {
        history.push('/add_item');
    }

    function handleUpdateWanted(updatedWanted) {
        const updatedWantedItems = wantedItems.map((wantedItem) => {
            if (updatedWanted.id === wantedItem.id) return updatedWanted;
            return wantedItem;
        });

        const updatedFilteredItems = filteredItems.map((wantedItem) => {
            if (updatedWanted.id === wantedItem.id) return updatedWanted;
            return wantedItem;
        });
        console.log(updatedFilteredItems)

        setWantedItems(updatedWantedItems);
        setFilteredItems(updatedFilteredItems);
    }

    function handleDeleteItem(deletedId) {
        const updatedWantedItems = wantedItems.filter(wantedItem => {
            return wantedItem.id !== deletedId;
        })

        setWantedItems(updatedWantedItems);
    }

    function handleFilter(value) {
        setFilter(value);
        
        if (value !== null) {
            fetch(`tags/${value.id}`)
            .then(res => res.json())
            .then(data => {
                setFilteredItems(data)
            })
        }
    }

    function renderWantedItems(items) {
        return items.map(item => {
            return (
                <WantedItemCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    amountSaved={item.amount_saved}
                    reason={item.reason}
                    importance={item.importance}
                    tags={item.tags}
                    onUpdateWanted={handleUpdateWanted}
                    onDeleteItem={handleDeleteItem}
                />
            )
        })
    }

    return (
       <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h1 id="head" className="header">WANTED ITEMS TRACKER</h1>
                </Grid> 
                <Grid item xs={6}>
                    <Button onClick={handleAddItemButton} id="addButtonItem" variant="contained" color="error">
                        Add an Item to Buy
                    </Button>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        disablePortal
                        id="autoWant"
                        options={tags}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField {...params} label="Filter by Tag" />}
                        onChange={(event, value) => handleFilter(value)}
                    />
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid><br></br>
            <Stack spacing={4}>
                {filter !== null ? renderWantedItems(filteredItems) : renderWantedItems(wantedItems)}
            </Stack><br></br><br></br><br></br>
        </Box>
    );
}

export default Wanted;