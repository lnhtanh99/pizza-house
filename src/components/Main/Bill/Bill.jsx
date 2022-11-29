import { useStyles } from './styles';
import { Container, Typography, Table, TableContainer, Box, TableBody, TableCell, TableHead, TableRow, TextField, Button, Grid } from '@material-ui/core'
import WeekendIcon from '@material-ui/icons/Weekend';

import { PizzaContext } from '../../../context/PizzaContext';

import { projectFirestore, projectAuth } from '../../../firebase/config';
import { useAuthState } from "react-firebase-hooks/auth";

import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Bill() {
    const classes = useStyles();
    const { userCart, currentCart, total } = useContext(PizzaContext);
    const {phone} = require('phone');

    const [userAddress, setUserAddress] = useState('');
    const [userNumber, setUserNumber] = useState(0);
    const [userSeat, setUserSeat] = useState(0);
    const [availableSeat, setAvailableSeat] = useState([]);
    const [seatID, setSeatID] = useState('');

    const history = useHistory();

    const [user] = useAuthState(projectAuth);

    const currencyFormat = (num) => {
        return Intl.NumberFormat('en-US').format(num);
    }

    const handleSeat = (id, number) => {
        setSeatID(id);
        setUserSeat(number);
    }

    const handleSubmitDineIn = (event) => {
        event.preventDefault();
        projectFirestore.collection('dinein').add({
            userSeat,
            userCart,
            total,
            checked: false,
            date: new Date().toLocaleString(),
            userEmail: user.email
        })
        projectFirestore.collection('seat').doc(seatID).update({
            total,
            available: false
        });
        setUserAddress('');
        setUserNumber('');
        history.push('/admin');
    }

    const handleSubmitDeliveries = (event) => {
        event.preventDefault();
        if(phone(userNumber, {country: 'VNM'}).isValid) {
            projectFirestore.collection('deliveries').add({
                userAddress,
                userNumber,
                userCart,
                total,
                checked: false,
                date: new Date().toLocaleString(),
                userEmail: user.email
            })
            setUserAddress('');
            setUserNumber('');
            history.push('/Pizzahouse/Pizza');
        } else {
            alert('Vui lòng nhập đúng số điện thoại!')
        }

    }

    useEffect(() => {
        projectFirestore.collection('seat')
            .orderBy('number', 'asc')
            .where('available', '==', true)
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({
                        ...doc.data(),
                        id: doc.id
                    })
                });
                setAvailableSeat(documents);
            })
        return () => {
            setAvailableSeat([]);
        };
    }, [setAvailableSeat])
    

    return (
        <Container className={classes.root}>
            <Typography
                variant="h4"
                component="h1"
                className={classes.title}
            >
                Hóa đơn mua hàng
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên sản phẩm</TableCell>
                            <TableCell>Số lượng</TableCell>
                            <TableCell>Giá tiền</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentCart.map((cart, index) => (
                            <TableRow key={index} >
                                <TableCell>{cart.name}</TableCell>
                                <TableCell>{cart.quantity}</TableCell>
                                <TableCell>{currencyFormat((cart.price * cart.quantity))} đ</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography
                variant="h6"
                component="h3"
                className={classes.total}
            >
                Tổng tiền: {currencyFormat(total)} đ
            </Typography>
            {localStorage.getItem('checkRole') === 'user' &&
                <Box className={classes.info}>
                    <Typography variant="h5" className={classes.formTitle}>
                        Vui lòng điền đầy đủ địa chỉ liên lạc
                    </Typography>
                    <Box className={classes.form}>
                        <TextField
                            label="Tên của bạn"
                            fullWidth
                            className={classes.input}
                            defaultValue={user.displayName}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            label="Nhập địa chỉ giao hàng"
                            fullWidth
                            value={userAddress}
                            onChange={(event) => setUserAddress(event.target.value)}
                        />
                        <TextField
                            label="Nhập số điện thoại liên lạc"
                            fullWidth
                            value={userNumber}
                            onChange={(event) => setUserNumber(event.target.value)}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={handleSubmitDeliveries}
                    >
                        Đặt hàng
                    </Button>
                </Box>
            }
            {(localStorage.getItem('checkRole') === 'admin' || localStorage.getItem('checkRole') === 'staff') &&
                <Box className={classes.info}>
                    <Typography variant="h5" className={classes.formTitle}>
                        Chọn bàn
                    </Typography>
                    <Grid container justifyContent="center" alignItems="center">
                        {availableSeat && availableSeat.map(seat =>
                            <Grid item xs={4} key={seat.id}>
                                <Button
                                    variant="contained"
                                    className={seat.available ? classes.buttonSeat : classes.buttonRed}
                                    startIcon={<WeekendIcon />}
                                    onClick={() => handleSeat(seat.id, seat.number)}
                                >
                                    Seat {seat.number}
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                    <Box className={classes.form}>
                        <TextField
                            label="Số bàn"
                            fullWidth
                            className={classes.input}
                            value={userSeat}
                            onChange={(event) => setUserSeat(event.target.value)}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={handleSubmitDineIn}
                    >
                        Gọi món
                    </Button>
                </Box>
            }
        </Container>
    )
}

export default Bill
