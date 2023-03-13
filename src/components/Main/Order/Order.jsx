import image from '../../../assets/stock-stracking.png';
import { Container, Typography, Table, TableContainer, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import { useStyles } from './styles';

import { useEffect, useState } from 'react';

import { projectFirestore, projectAuth } from '../../../firebase/config';
import { useAuthState } from "react-firebase-hooks/auth";

function Order() {
    const classes = useStyles();
    const [user] = useAuthState(projectAuth);
    const [userBill, setUserBill] = useState([]);
    const [userBillID, setUserBillID] = useState('');

    useEffect(() => {
        if (user) {
            projectFirestore.collection('deliveries')
                .where('userEmail', '==', user.email)
                .onSnapshot((snap) => {
                    let documents = [];
                    snap.forEach(doc => {
                        documents.push({
                            ...doc.data(),
                            id: doc.id
                        })
                    });
                    setUserBill(documents);
                    if (documents.length > 0) {
                        setUserBillID(documents[0].userCart[0].uid);
                    }
                })
        }
    }, [user, setUserBill]);

    return (
        <Container className={classes.container}>
            <Typography className={classes.title}>
                Tình trạng đơn hàng
            </Typography>
            <TableContainer className={classes.box}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeader} align="center">Mã đơn hàng</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Thông tin khách hàng</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Thông tin đơn hàng</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Tình trạng đơn hàng</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userBill && userBill.map(bill => (
                            <TableRow key={bill.id}>
                                <TableCell align="center">{bill.id}</TableCell>
                                <TableCell align="center">
                                    <Typography >
                                        Tên: {bill.userCart[0].name} 
                                    </Typography>
                                    <Typography>
                                        Số điện thoại: {bill.userNumber}
                                    </Typography>
                                    <Typography>
                                        Địa chỉ: {bill.userAddress}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    {bill.userCart[0].cart.map((item, index) => (
                                        <div key={index}>
                                            <Typography>
                                                {item.name} x {item.quantity}
                                            </Typography>
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell align="center">{bill.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <img src={image} alt="dd" width="500" height="500" />

            </TableContainer>
        </Container>
    )
}

export default Order
