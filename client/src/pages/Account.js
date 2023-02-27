import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "../components/UserContext";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

function Account ({setIsLogged}) {
    const {user, setUser} = useContext(UserContext);
    const [error, setError] = useState(false);
    const [monthlyIncome, setMonthlyIncome] = useState("");

    useEffect(() => {
        if (user.monthly_income !== undefined && monthlyIncome === "") {
            setMonthlyIncome(user.monthly_income);
        }
    }, [user])

    function handleUpdateUser() {
        if (parseInt(monthlyIncome) === NaN || parseInt(monthlyIncome).toString().length !== monthlyIncome.length || parseInt(monthlyIncome) <= 0) {
            setError(true) 
        } else {
            fetch(`/users/${user.id}`, {
                method: "PATCH",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    monthly_income: monthlyIncome
                })
            })
            .then(res => res.json())
            .then(data => {
                setUser(data)
                setError(false);
            });
        }
    }

    function handleLogout() {
        fetch('/logout', {
            method: "DELETE"
        })
        .then((r) => {
            if (r.ok) {
              setUser(null);
              setIsLogged(false);
            }
        })
    }
       

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '35%' },
            }}
            className="form"
            noValidate
            autoComplete="off"
        >
            <InputLabel htmlFor="outlined-adornment-amount">First Name</InputLabel>
            <TextField
                disabled
                id="fname"
                value={user.first_name}
                variant="standard"
            /><br></br>
            <InputLabel htmlFor="outlined-adornment-amount">Last Name</InputLabel>
            <TextField
                disabled
                id="lname"
                value={user.last_name}
                variant="standard"
            /><br></br>
            <InputLabel htmlFor="email">Email</InputLabel>
            <TextField
                disabled
                id="email"
                value={user.email}
                variant="standard"
            /><br></br>
            <InputLabel htmlFor="income">Monthly Income</InputLabel>
            <TextField
                error={error}
                id="income"
                value={monthlyIncome}
                variant="standard"
                helperText={error ? "Please enter a valid number" : null}
                onChange={(event) => setMonthlyIncome(event.target.value)}
            /><br></br><br></br>
            <Button onClick={handleUpdateUser} variant="outlined" color="error">
                Update
            </Button><br></br><br></br>
            <Button onClick={handleLogout}  variant="contained" color="error">
                Logout
            </Button>
        </Box>
    )
}

export default Account;