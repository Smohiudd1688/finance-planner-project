import React, {useState, useContext} from 'react';
import { UserContext } from '../components/UserContext';
import { useHistory } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/signup">
        Finance Your Future
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

function SignUp({setIsLogged, setOn, setCategories, setWantedItems}) {
    const {setUser} = useContext(UserContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [income, setIncome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
 
        const user = {
            first_name: firstName,
            last_name: lastName,
            monthly_income: income,
            email: email,
            password: password
        };

        fetch('/users', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(user)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(user => {
                    setIsLogged(true);
                    setUser(user);
                    setCategories(user.budget_categories);
                    setWantedItems(user.wanted_items);
                    history.push('/');
                })
            } else {
                res.json().then(e => setErrors(e.errors))
            }
        });

    };

    const renderErrors = errors.map((error, index) => {
        return (
            <p className="errors" key={index}>* {error}</p>
        );
    });

    return (
        <ThemeProvider theme={darkTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: red[900] }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            {errors.length !== 0 ? renderErrors : null}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(event) => setFirstName(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    onChange={(event) => setLastName(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="income"
                    label="Monthly Income"
                    name="income"
                    onChange={(event) => setIncome(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(event) => setPassword(event.target.value)}
                    />
                </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign Up
                </Button>
                <Grid container>
                <Grid item>
                    <Link className='signLink' onClick={() => setOn(false)} variant="body2">
                        Already have an account? Sign in
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
        </ThemeProvider>
    );
}

export default SignUp;