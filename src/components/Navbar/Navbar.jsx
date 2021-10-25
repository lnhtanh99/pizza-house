import { AppBar, Toolbar, Typography, Link as MaterialLink, Box, IconButton, Badge, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { LocalPizza, ShoppingCart, AccountCircle } from '@material-ui/icons';
import MenuIcon from "@material-ui/icons/Menu";
import { useStyles } from './styles';

import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Cart from '../Cart/Cart';
import MiniNav from './MiniNav/MiniNav';

function Navbar() {
    const [cartOpen, setCartOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = ['Thực đơn', 'Khuyến Mãi', 'Theo dõi đơn hàng'];
    const classes = useStyles();
    return (
        <>
            <AppBar
                elevation={0}
                className={classes.root}
                position="static"
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
                        {
                            navLinks && navLinks.map((nav, index) => (
                                <MaterialLink
                                    underline="none"
                                    color="inherit"
                                    key={index}
                                    className={classes.links}
                                    component={RouterLink} to={`/${nav}`}
                                >
                                    {nav}
                                </MaterialLink>
                            ))
                        }
                    </div>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box>
                        <IconButton
                            aria-label="show cart number"
                            color="inherit"
                            className={classes.iconButtons}
                            onClick={() => setCartOpen(!cartOpen)}
                        >
                            <Badge badgeContent={2} color="error">
                                <ShoppingCart className={classes.icons} />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            className={classes.iconButtons}
                            color="inherit"
                        >
                            <AccountCircle className={classes.icons} />
                        </IconButton>
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
                    <Box >
                        <List >
                            {
                                navLinks && navLinks.map((nav, index) => (
                                    <ListItem key={index}>
                                        <MaterialLink
                                            underline="none"
                                            color="inherit"
                                            component={RouterLink} to={`/menu/${nav}`}
                                        >
                                            <ListItemText>
                                                <span className={classes.drawerText}>{nav}</span>
                                            </ListItemText>
                                        </MaterialLink>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Box>
                </Toolbar>
            </Drawer>
            <Cart cartOpen={cartOpen} setCartOpen={setCartOpen}/>
            <MiniNav cartOpen={cartOpen} />
        </ >
    )
}

export default Navbar
