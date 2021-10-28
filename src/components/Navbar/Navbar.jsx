import { AppBar, Toolbar, Typography, Link as MaterialLink, Box, IconButton, Badge, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { LocalPizza, ShoppingCart, AccountCircle } from '@material-ui/icons';
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useStyles } from './styles';

import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Cart from '../Cart/Cart';
import MiniNav from './MiniNav/MiniNav';

function Navbar() {
    const [cartOpen, setCartOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        {
            name: 'Menu',
            display: 'Thực đơn'
        },
        {
            name: 'Promotions',
            display: 'Khuyến Mãi'
        },
        {
            name: 'Order',
            display: 'Theo dõi đơn hàng'
        }
    ];
    const classes = useStyles();
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
                        {
                            navLinks.map(nav => (
                                <MaterialLink
                                    underline="none"
                                    color="inherit"
                                    key={nav.name}
                                    className={classes.links}
                                    component={RouterLink} to={`/${nav.name}`}
                                >
                                    {nav.display}
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
                    <IconButton
                        onClick={() => setMenuOpen(false)}
                        className={classes.closeBtn}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                    <Box >
                        <List >
                            {
                                navLinks.map((nav, index) => (
                                    <ListItem key={index}>
                                        <MaterialLink
                                            underline="none"
                                            color="inherit"
                                            component={RouterLink} to={`/${nav.name}`}
                                        >
                                            <ListItemText>
                                                <span className={classes.drawerText}>{nav.display}</span>
                                            </ListItemText>
                                        </MaterialLink>
                                    </ListItem>
                                ))
                            }
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
