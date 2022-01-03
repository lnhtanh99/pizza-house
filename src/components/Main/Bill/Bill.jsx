import { useStyles } from './styles';
import { Container, Typography, Table, TableContainer, Box, TableBody, TableCell, TableHead, TableRow, TextField, Button } from '@material-ui/core'

import { PizzaContext } from '../../../context/PizzaContext';

import { projectFirestore, projectAuth } from '../../../firebase/config';
import { useAuthState } from "react-firebase-hooks/auth";

import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Bill() {
    const classes = useStyles();
    const { userCart } = useContext(PizzaContext);
    const [userName, setUserName] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userNumber, setUserNumber] = useState('');
    const [billTotal, setBillTotal] = useState('');

    const history = useHistory();

    const [user] = useAuthState(projectAuth);

    const currencyFormat = (num) => {
        return Intl.NumberFormat('en-US').format(num);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        projectFirestore.collection('bill').add({
            userName,
            userAddress,
            userNumber,
            userCart,
            billTotal,
            checked: false,
            date: new Date().toString(),
            uid: user.uid,
            userEmail: user.email
        })
        setUserName('');
        setUserAddress('');
        setUserNumber('');
        history.push('/Pizzahouse/Pizza');
    }

    useEffect(() => {
        const getTotal = () => {
            let total = 0;
            userCart.forEach(cart => {
                total += parseInt(cart.price) * (cart.quantity);
            })
            setBillTotal(total);
        }

        getTotal();
    }, [billTotal, userCart])

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
                        {userCart.map(cart => (
                            <TableRow key={cart.id} >
                                <TableCell>{cart.name}</TableCell>
                                <TableCell>{cart.quantity}</TableCell>
                                <TableCell>{currencyFormat(parseInt(cart.price) * cart.quantity)} đ</TableCell>
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
                Tổng tiền: {currencyFormat(billTotal)} đ
            </Typography>
            <Typography variant="h5" className={classes.formTitle}>
                Vui lòng điền đầy đủ địa chỉ liên lạc
            </Typography>
            <Box className={classes.form}>
                <TextField
                    label="Tên của bạn"
                    fullWidth
                    className={classes.input}
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
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
                onClick={handleSubmit}
            >
                Đặt hàng
            </Button>
        </Container>
    )
}

export default Bill
