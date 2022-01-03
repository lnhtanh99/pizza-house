import { Drawer, Typography, Box, IconButton, Card, CardContent, Button, Link as MaterialLink } from '@material-ui/core';
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import images from '../../../assets/empty-cart.svg';
import { useStyles } from './styles';
import ClearIcon from '@material-ui/icons/Clear';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';


import { projectFirestore, projectAuth } from '../../../firebase/config';
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from 'firebase/app'

import { PizzaContext } from '../../../context/PizzaContext';

import { useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';

function Cart({ cartOpen, setCartOpen }) {
    const [user] = useAuthState(projectAuth);
    const classes = useStyles();
    const { userCart, setUserCart } = useContext(PizzaContext);

    const handleClear = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            projectFirestore.collection('cart').doc(id).delete();
        }
    }

    const getTotal = () => {
        let total = 0;
        userCart.forEach(cart => {
            total += parseInt(cart.price) * (cart.quantity);
        })

        return total;
    }

    const increase = (id) => {
        projectFirestore.collection('cart').doc(id).update("quantity", firebase.firestore.FieldValue.increment(1));

    }
    const decrease = (id, quantity) => {
        if (quantity > 1) {
            projectFirestore.collection('cart').doc(id).update("quantity", firebase.firestore.FieldValue.increment(-1));
        }
    }

    const currencyFormat = (num) => {
        return Intl.NumberFormat('en-US').format(num);
    }


    useEffect(() => {
        if (user) {
            projectFirestore.collection('cart')
                .where('uid', '==', user.uid)
                .onSnapshot((snap) => {
                    let documents = [];
                    snap.forEach(doc => {
                        documents.push({
                            ...doc.data(),
                            id: doc.id
                        })
                    });
                    setUserCart(documents);
                })
        }
    }, [user, setUserCart]);
    return (
        <Box xs={{ display: 'flex' }}>
            <Drawer
                anchor="right"
                variant="persistent"
                open={cartOpen}
                classes={{ paper: classes.drawer }}
            >
                <Box
                    sx={{ overflow: 'auto' }}
                    className={classes.drawerWrapper}
                >
                    <IconButton
                        onClick={() => setCartOpen(false)}
                        className={classes.closeBtn}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                    {!user || userCart.length === 0 ?
                        <>
                            <Typography
                                variant="h6"
                                className={classes.drawerText}
                            >
                                Giỏ hàng chưa có sản phẩm.
                                <br />
                                Xin mời bạn mua hàng
                            </Typography>
                            <img src={images} alt="sad-cart" className={classes.image} />
                        </>
                        :
                        <>
                            <Typography
                                variant="h6"
                                className={classes.drawerText}
                            >
                                Giỏ hàng
                            </Typography>
                            {userCart.map(cart => (
                                <Card key={cart.id} className={classes.cartContainer}>
                                    <CardContent>
                                        <Typography className={classes.cartName}>
                                            {cart.name}
                                        </Typography>
                                        <Typography>
                                            {currencyFormat(parseInt(cart.price) * cart.quantity)} đ
                                        </Typography>
                                        <Typography>
                                            Số lượng:
                                            <IconButton
                                                color="secondary"
                                                className={classes.quantityButton}
                                                onClick={() => decrease(cart.id, cart.quantity)}
                                            >
                                                <ExposureNeg1Icon />
                                            </IconButton>
                                            <span className={classes.cartQuantity}>
                                                {cart.quantity}
                                            </span>
                                            <IconButton
                                                color="primary"
                                                className={classes.quantityButton}
                                                onClick={() => increase(cart.id)}
                                            >
                                                <ExposurePlus1Icon />
                                            </IconButton>
                                        </Typography>
                                        <IconButton
                                            className={classes.clearIcon}
                                            onClick={() => handleClear(cart.id)}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </CardContent>
                                </Card>
                            ))}
                        </>
                    }
                </Box>
                {userCart.length > 0 &&
                    <Button
                        className={classes.total}
                        color="primary"
                        variant="contained"
                    >
                        <MaterialLink
                            color="inherit"
                            underline="none"
                            component={RouterLink} to='/Bill'
                            onClick={() => setCartOpen(false)}
                        >
                            Thực hiện thanh toán: {currencyFormat(getTotal())} đ
                        </MaterialLink>
                    </Button>
                }
            </Drawer>
        </Box>
    )
}

export default Cart
