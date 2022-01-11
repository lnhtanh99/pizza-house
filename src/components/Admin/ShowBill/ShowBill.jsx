import { useStyles } from './styles';
import { Container, Typography, Table, TableContainer, Paper, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';

import { projectFirestore } from '../../../firebase/config';

import { useEffect, useState } from 'react';

function ShowBill() {
    const classes = useStyles();
    const [userBill, setUserBill] = useState([]);

    const currencyFormat = (num) => {
        return Intl.NumberFormat('en-US').format(num);
    }

    const handleAccept = (id) => {
        if (window.confirm('Xác nhận đơn hàng?')) {
            projectFirestore.collection('bill').doc(id).update("checked", true);
        }
    }

    const handleDeny = (id) => {
        if (window.confirm('Không xác nhận đơn hàng?')) {
            projectFirestore.collection('bill').doc(id).update("checked", false);
        }
    }

    const handleDelete = (id) => {
        if (window.confirm('Có chắc muốn xóa đơn hàng?')) {
            projectFirestore.collection('bill').doc(id).delete();
        }
    }

    useEffect(() => {
        projectFirestore.collection('bill')
            .orderBy('checked', 'asc')
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
    }, [setUserBill])

    return (
        <Container>
            <Typography variant="h3" component="h1" className={classes.title}>
                Đơn hàng
            </Typography>
            <TableContainer component={Paper} className={classes.container}>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeader} align="center">Tên khách hàng</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Email</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Địa chỉ</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Số điện thoại</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Thời gian đặt hàng</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Đơn hàng</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Tổng tiền</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Tình trạng đơn hàng</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userBill && userBill.map((bill) => (
                            <TableRow key={bill.id}>
                                <TableCell align="center">{bill.userName}</TableCell>
                                <TableCell align="center">{bill.userEmail}</TableCell>
                                <TableCell align="center">{bill.userAddress}</TableCell>
                                <TableCell align="center">{bill.userNumber}</TableCell>
                                <TableCell align="center">{bill.date}</TableCell>
                                <TableCell align="center">{bill.userCart.map(cart => (
                                    <div key={cart.id}>
                                        {cart.name.includes('Pizza')
                                            ?
                                            <Typography>
                                                <span className={classes.itemName}>{cart.name}</span> x {cart.base} x {cart.size} x Số lượng: {cart.quantity}
                                            </Typography>
                                            :
                                            <Typography>
                                                <span className={classes.itemName}>{cart.name}</span> x Số lượng: {cart.quantity}
                                            </Typography>
                                        }
                                    </div>
                                ))}</TableCell>
                                <TableCell align="center">{currencyFormat(bill.billTotal)} đ</TableCell>
                                <TableCell align="center">{bill.checked ? 'Đã xác nhận' : 'Chưa xác nhận'}</TableCell>
                                <TableCell align="center">
                                    {bill.checked
                                        ?
                                        <ClearIcon
                                            className={classes.icon}
                                            onClick={() => handleDeny(bill.id)}
                                        />
                                        :
                                        <CheckIcon
                                            className={classes.icon}
                                            onClick={() => handleAccept(bill.id)}
                                        />
                                    }
                                    <DeleteIcon
                                        className={classes.icon}
                                        onClick={() => handleDelete(bill.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default ShowBill
