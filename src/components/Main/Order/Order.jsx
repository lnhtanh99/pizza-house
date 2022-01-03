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

    useEffect(() => {
        if (user) {
            projectFirestore.collection('bill')
                .where('uid', '==', user.uid)
                .onSnapshot((snap) => {
                    let documents = [];
                    snap.forEach(doc => {
                        documents.push({
                            ...doc.data(),
                            id: doc.id
                        })
                    });
                    setUserBill(documents);
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
                            <TableCell className={classes.tableHeader} align="center">Tình trạng đơn hàng</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userBill && userBill.map(bill => (
                            <TableRow key={bill.id}>
                                <TableCell align="center">{bill.id}</TableCell>
                                <TableCell align="center">{bill.checked ? 'Đơn hàng đã được xác nhận' : 'Đơn hàng chưa được xác nhận'}</TableCell>
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
