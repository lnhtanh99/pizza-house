import { AppBar, Avatar, Toolbar, Typography, Link as MaterialLink, Box, IconButton, Badge, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { LocalPizza, ShoppingCart, AccountCircle } from '@material-ui/icons';
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useStyles } from './styles';

import { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Cart from '../Main/Cart/Cart';
import MiniNav from './MiniNav/MiniNav';

import firebase from 'firebase/app';
import { projectAuth } from '../../firebase/config';
import { useAuthState } from "react-firebase-hooks/auth";

import { PizzaContext } from '../../context/PizzaContext';


function Navbar() {
    const [cartOpen, setCartOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { userCart } = useContext(PizzaContext);

    const [user] = useAuthState(projectAuth);

    const classes = useStyles();

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        projectAuth.signInWithPopup(provider);
    }

    const handleSignOut = () => {
        if (window.confirm('Are you sure you want to signout?')) {
            projectAuth.signOut();
        }

    }

    return (
        <>
            <AppBar
                elevation={0}
                className={classes.root}
                position="fixed"
            >
                <Toolbar className={classes.wrapper}>
                    <Typography
                        variant="h5"
                        component="h1"
                        className={classes.title}
                    >
                        <LocalPizza className={classes.logo} /> PizzaHouse
                    </Typography>
                    <div className={classes.show}>
                        <MaterialLink
                            underline="none"
                            color="inherit"
                            className={classes.links}
                            component={RouterLink} to={`/Pizzahouse/Pizza`}
                        >
                            Thực đơn
                        </MaterialLink>
                        <MaterialLink
                            underline="none"
                            color="inherit"
                            className={classes.links}
                            component={RouterLink} to={`/Order`}
                        >
                            Theo dõi đơn hàng
                        </MaterialLink>
                    </div>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box>
                        <IconButton
                            aria-label="show cart number"
                            color="inherit"
                            className={classes.iconButtons}
                            onClick={() => setCartOpen(!cartOpen)}
                        >
                            <Badge badgeContent={userCart.length} color="error">
                                <ShoppingCart className={classes.icons} />
                            </Badge>
                        </IconButton>
                        {!user ?
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                className={classes.iconButtons}
                                color="inherit"
                                onClick={signInWithGoogle}
                            >
                                <AccountCircle className={classes.icons} />
                            </IconButton>

                            :
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                className={classes.iconButtons}
                                color="inherit"
                                onClick={handleSignOut}
                            >
                                <Avatar
                                    alt="account avatar"
                                    src={user.photoURL}
                                />
                            </IconButton>

                        }
                        <IconButton
                            aria-label="open drawer"
                            edge="start"
                            className={`${classes.menu} ${classes.iconButtons}`}
                            onClick={() => setMenuOpen(!menuOpen)}
                            color="inherit"
                        >
                            <MenuIcon className={classes.icons} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                open={menuOpen}
                classes={{
                    paper: classes.drawer
                }}
            >
                <Toolbar className={classes.drawerWrapper}>
                    <IconButton
                        onClick={() => setMenuOpen(false)}
                        className={classes.closeBtn}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                    <Box >
                        <List >
                            <ListItem>
                                <ListItemText>
                                    <MaterialLink
                                        underline="none"
                                        color="inherit"
                                        component={RouterLink} to={`/Pizzahouse/Pizza`}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <span className={classes.drawerText}>Thực đơn</span>
                                    </MaterialLink>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <MaterialLink
                                        underline="none"
                                        color="inherit"
                                        onClick={() => setMenuOpen(false)}
                                        component={RouterLink} to={`/Order`}
                                    >
                                        <span className={classes.drawerText}>Theo dõi đơn hàng</span>
                                    </MaterialLink>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Box>
                </Toolbar>
            </Drawer>
            <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
            <MiniNav cartOpen={cartOpen} />
        </ >
    )
}

export default Navbar
