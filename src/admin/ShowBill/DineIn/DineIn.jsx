//material-ui
import { useStyles } from './styles';
import { Container, Typography, Table, TableContainer, Paper, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

//firebase
import { projectFirestore } from '../../../firebase/config';

//react
import { useEffect, useState } from 'react';

function ShowBill() {
    const classes = useStyles();
    const [userBill, setUserBill] = useState([]);

    const currencyFormat = (num) => {
        return Intl.NumberFormat('en-US').format(num);
    }

    const handleDelete = (id) => {
        if (window.confirm('Có chắc muốn xóa đơn hàng?')) {
            projectFirestore.collection('dinein').doc(id).delete();
        }
    }

    useEffect(() => {
        projectFirestore.collection('dinein')
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
            return () => {
                setUserBill([])// This worked for me
            };
    }, [setUserBill])

    return (
        <Container className={classes.container}>
            <Typography variant="h3" component="h1" className={classes.title}>
                Đơn hàng
            </Typography>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeader} align="center">Số bàn</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Thời gian đặt hàng</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Đơn hàng</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Tổng tiền</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Tình trạng đơn hàng</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userBill && userBill.map((bill) => (
                            <TableRow key={bill.id} className={bill.checked  ? classes.rowDone : ''}>
                                <TableCell align="center">{bill.userSeat}</TableCell>
                                <TableCell align="center">{bill.date}</TableCell>
                                <TableCell align="center">{bill.userCart[0].cart.map((cart, index) => (
                                    <div key={index}>
                                        {cart.name.includes('Pizza')
                                            ?
                                            <div className={classes.tableItem}>
                                                <Typography>
                                                    <span className={classes.itemName}>{cart.name}</span>
                                                </Typography>
                                                <Typography>
                                                    Đế bánh: <span className={classes.itemName}>{cart.base}</span> - Kích cỡ: <span className={classes.itemName}>{cart.size}</span> - Số lượng: <span className={classes.itemName}> {cart.quantity} </span>
                                                </Typography>
                                            </div>
                                            :
                                            <Typography>
                                                <span className={classes.itemName}>{cart.name}</span> - Số lượng: <span className={classes.itemName}> {cart.quantity} </span>
                                            </Typography>
                                        }
                                    </div>
                                ))}
                                </TableCell>
                                <TableCell align="center">{currencyFormat(bill.total)} đ</TableCell>
                                <TableCell align="center">{bill.checked ? 'Đã xác nhận' : 'Chưa xác nhận'}</TableCell>
                                <TableCell align="center">
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
