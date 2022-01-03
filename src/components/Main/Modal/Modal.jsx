import { Modal as MUIModal, Box, Typography, Card, CardMedia, CardContent, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Button } from '@material-ui/core';
import { PizzaContext } from '../../../context/PizzaContext';
import { useContext, useState, useEffect } from 'react';
import { useStyles } from './styles';

import firebase from 'firebase/app';
import { projectFirestore, projectAuth } from '../../../firebase/config';
import { useAuthState } from "react-firebase-hooks/auth";

function Modal() {
    const { openModal, setOpenModal, handleCloseModal, select, isPizza } = useContext(PizzaContext);
    const [user] = useAuthState(projectAuth);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [size, setSize] = useState('Cỡ 7 inch');
    const [price, setPrice] = useState('');
    const [base, setBase] = useState('Đế vừa');

    const classes = useStyles();

    const handleSubmit = (event) => {
        event.preventDefault();
        setName(select.name);
        setDescription(select.description);
        if (user) {
            if (isPizza) {
                projectFirestore.collection('cart').add({
                    name,
                    description,
                    size,
                    price,
                    base,
                    quantity: 1,
                    uid: user.uid,
                })
            } else {
                projectFirestore.collection('cart').add({
                    name,
                    description,
                    price,
                    quantity: 1,
                    uid: user.uid,
                })
            }
        } else {
            const provider = new firebase.auth.GoogleAuthProvider();
            projectAuth.signInWithPopup(provider);
        }

        setOpenModal(false);
    }

    const currencyFormat = (num) => {
        return Intl.NumberFormat('en-US').format(num);
    }

    useEffect(() => {
        setName(select.name);
        setDescription(select.description);
        setPrice(select.priceSmall);
        if (size === 'Cỡ 9 inch') {
            setPrice(select.priceMedium);
        } else if (size === 'Cỡ 12 inch') {
            setPrice(select.priceBig);
        } else {
            setPrice(select.priceSmall);
        }

    }, [select, size]);
    return (
        <MUIModal
            open={openModal}
            onClose={handleCloseModal}
        >
            <Box className={classes.box}>
                <Card className={classes.card}>
                    <CardMedia
                        component="img"
                        image={select.image}
                        className={classes.image}
                    />
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography variant="h5" component="h2" className={classes.title}>
                            {select.name}
                        </Typography>
                        <Typography variant="body1" >
                            {select.description}
                        </Typography>
                        {isPizza &&
                            <>
                                <FormControl fullWidth>
                                    <FormLabel
                                        component="legend"
                                        className={classes.radioTitle}
                                    >
                                        Chọn đế bánh
                                    </FormLabel>
                                    <RadioGroup
                                        aria-label="gender"
                                        name="radio-buttons-group"
                                        value={base}
                                        onChange={(event) => setBase(event.target.value)}
                                    >
                                        <FormControlLabel value="Đế dày xốp" control={<Radio />} label="Đế dày xốp" />
                                        <FormControlLabel value="Đế vừa" control={<Radio />} label="Đế vừa" />
                                        <FormControlLabel value="Đế mỏng" control={<Radio />} label="Đế mỏng" />
                                    </RadioGroup>
                                </FormControl>
                                <FormControl fullWidth>
                                    <FormLabel
                                        component="legend"
                                        className={classes.radioTitle}
                                    >
                                        Chọn cỡ bánh
                                    </FormLabel>
                                    <RadioGroup
                                        aria-label="gender"
                                        name="radio-buttons-group"
                                        onChange={(event) => setSize(event.target.value)}
                                        value={size}
                                    >
                                        <FormControlLabel value="Cỡ 7 inch" control={<Radio />} label="Cỡ 7 inch" />
                                        <FormControlLabel value="Cỡ 9 inch" control={<Radio />} label="Cỡ 9 inch" />
                                        <FormControlLabel value="Cỡ 12 inch" control={<Radio />} label="Cỡ 12 inch" />
                                    </RadioGroup>
                                </FormControl>
                            </>
                        }
                        <Typography className={classes.price}>
                            Giá tiền: {currencyFormat(price)} đ
                        </Typography>
                    </CardContent>
                    <Button
                        className={classes.btn}
                        variant="contained"
                        color="secondary"
                        onClick={handleSubmit}
                    >
                        Thêm vào giỏ hàng
                    </Button>
                </Card>
            </Box>
        </MUIModal>
    )
}

export default Modal
