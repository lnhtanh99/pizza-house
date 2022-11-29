//material-ui
import { AppBar, Avatar, Toolbar, Typography, Link as MaterialLink, Box, IconButton, Badge, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { LocalPizza, ShoppingCart, AccountCircle } from '@material-ui/icons';
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useStyles } from './styles';

//react
import { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';

//components
import Cart from '../Main/Cart/Cart';
import MiniNav from './MiniNav/MiniNav';

//firebase
import firebase from 'firebase/app';
import { projectAuth } from '../../firebase/config';
import { useAuthState } from "react-firebase-hooks/auth";
import { projectFirestore } from '../../firebase/config';

//context
import { PizzaContext } from '../../context/PizzaContext';

//hooks
import useFirestore from '../../hooks/useFirestore';
import AdminMiniNav from './MiniNav/AdminMiniNav';

function Navbar() {
    const [cartOpen, setCartOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const { currentCart } = useContext(PizzaContext);

    const { docs } = useFirestore('users');
    const [user] = useAuthState(projectAuth);

    const classes = useStyles();

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        projectAuth.signInWithPopup(provider)
            .then(({ user }) => {
                const check = docs.find(doc => doc.uid === user.uid);
                if (check) {
                    localStorage.setItem('currentUser', JSON.stringify(check));
                    if (check.role === 'admin') {
                        localStorage.setItem('checkRole', 'admin'); //
                    } else if (check.role === 'staff') {
                        localStorage.setItem('checkRole', 'staff');
                    } else {
                        localStorage.setItem('checkRole', 'user');
                    }
                } else {
                    user.role = 'user';
                    projectFirestore.collection('users').add({
                        name: user.displayName,
                        uid: user.uid,
                        email: user.email,
                        role: user.role,
                    })

                    localStorage.setItem('checkRole', 'user');
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleSignOut = () => {
        if (window.confirm('Are you sure you want to signout?')) {
            projectAuth.signOut()
                .then(() => {
                    localStorage.setItem('currentUser', null);
                    localStorage.setItem('checkRole', null);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <>
            <AppBar
                elevation={0}
                className={classes.root}
                position="fixed"
                style={{ backgroundColor: '#004666' }}
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
                            {localStorage.getItem('checkRole') === 'user' ? 'Thực đơn' : 'Trang chủ'}
                        </MaterialLink>

                        {localStorage.getItem('checkRole') === 'user' &&
                            <MaterialLink
                                underline="none"
                                color="inherit"
                                className={classes.links}
                                component={RouterLink} to={`/Order`}
                            >
                                Theo dõi đơn hàng
                            </MaterialLink>
                        }

                        {(localStorage.getItem('checkRole') === 'admin' || localStorage.getItem('checkRole') === 'staff') &&
                            <MaterialLink
                                underline="none"
                                color="inherit"
                                className={classes.links}
                                component={RouterLink} to={`/admin`}
                            >
                                Trang Admin
                            </MaterialLink>
                        }

                    </div>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box>
                        {user &&
                            <IconButton
                                aria-label="show cart number"
                                color="inherit"
                                className={classes.iconButtons}
                                onClick={() => setCartOpen(!cartOpen)}
                            >
                                <Badge badgeContent={currentCart.length} color="error">
                                    <ShoppingCart className={classes.icons} />
                                </Badge>
                            </IconButton>
                        }

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
                                        onClick={() => { setMenuOpen(false) }}
                                    >
                                        <span className={classes.drawerText}>{localStorage.getItem('checkRole') === 'false' ? 'Thực đơn' : 'Trang chủ'}</span>
                                    </MaterialLink>
                                </ListItemText>
                            </ListItem>

                            {localStorage.getItem('checkRole') === 'user' &&
                                <ListItem>
                                    <ListItemText>
                                        <MaterialLink
                                            underline="none"
                                            color="inherit"
                                            onClick={() => { setMenuOpen(false) }}
                                            component={RouterLink} to={`/Order`}
                                        >
                                            <span className={classes.drawerText}>Theo dõi đơn hàng</span>
                                        </MaterialLink>
                                    </ListItemText>
                                </ListItem>
                            }

                            {(localStorage.getItem('checkRole') === 'admin' || localStorage.getItem('checkRole') === 'staff') &&
                                <ListItem>
                                    <ListItemText>
                                        <MaterialLink
                                            underline="none"
                                            color="inherit"
                                            onClick={() => setMenuOpen(false)}
                                            component={RouterLink} to={`/admin`}
                                        >
                                            <span className={classes.drawerText}>Trang Admin</span>
                                        </MaterialLink>
                                    </ListItemText>
                                </ListItem>
                            }

                        </List>
                    </Box>
                </Toolbar>
            </Drawer>
            <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
            {(localStorage.getItem('checkRole') === 'user' || localStorage.getItem('checkRole') === 'null') 
            ?
                <MiniNav cartOpen={cartOpen} /> 
            :
                <>
                    <MiniNav cartOpen={cartOpen} />
                    <AdminMiniNav cartOpen={cartOpen} />
                </>
            }

        </ >
    )
}

export default Navbar
