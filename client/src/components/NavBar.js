import React, {useContext, useState, useEffect} from 'react';
import { UserContext } from './UserContext';
import { useHistory } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { red, grey } from '@mui/material/colors';

const pages = ['Home', 'Wanted Items Tracker', 'Charts'];

function NavBar() {
  const {user} = useContext(UserContext);
  const [initial, setInitial] = useState("");
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const history = useHistory();

  useEffect(() => {
    if(user.first_name !== undefined && initial === ""){
      setInitial(user.first_name[0]);
    }
  }, [user]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function handleOpenAccountPage() {
    history.push('/account')
  }

  function handleNavigate(page) {
    if (page === 'Home') {
      history.push('/');
    } else if (page === 'Wanted Items Tracker') {
      history.push('/wanted')
    }
  }

  return (
    <AppBar sx={{ bgcolor: grey[600] }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            onClick={() => handleNavigate('Home')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img className='logo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZrnlQmSbgl4R5e25kQg5LdU0Uvb81MfukfjjkHaBZcni2UlpDe_adwqapb-zD87tgKnM&usqp=CAU" />
            FINANCE YOUR FUTURE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography onClick={() => handleNavigate(page)} textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            onClick={() => handleNavigate('Home')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img className='logo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZrnlQmSbgl4R5e25kQg5LdU0Uvb81MfukfjjkHaBZcni2UlpDe_adwqapb-zD87tgKnM&usqp=CAU" />
            FINANCE YOUR FUTURE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigate(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open account information">
              <IconButton onClick={handleOpenAccountPage} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: red[900] }}>{initial}</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;