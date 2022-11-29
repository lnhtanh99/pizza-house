import { useStyles } from './styles';
import { useEffect, useState } from 'react'

import { Box, Button, Avatar, Container, Grid, Typography } from '@material-ui/core';
import WeekendIcon from '@material-ui/icons/Weekend';

import { projectFirestore } from '../../firebase/config';
const Seat = () => {
    const classes = useStyles();
    const [userBill, setUserBill] = useState([]);

    const [seatState, setSeatState] = useState([]);


    const currencyFormat = (num) => {
        return Intl.NumberFormat('en-US').format(num);
    }

    const handleSeat = (available, number, id) => {
        const seatTotal = userBill.find(seat => parseInt(seat.userSeat) === number);
        if (seatTotal) {
            if (available === true) {
                projectFirestore.collection('seat').doc(id).update({
                    total: seatTotal.total,
                    available: false
                });
            } else {
                if (window.confirm('Thanh toán đơn hàng?')) {
                    projectFirestore.collection('seat').doc(id).update({
                        total: 0,
                        available: true
                    });
                    projectFirestore.collection('dinein').doc(seatTotal.id).update({
                        checked: true
                    });
                }
            }

        }
    }

    useEffect(() => {
        projectFirestore.collection('dinein')
            .where('checked', '==', false)
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

        projectFirestore.collection('seat')
            .orderBy('number', 'asc')
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({
                        ...doc.data(),
                        id: doc.id
                    })
                });
                setSeatState(documents);
            })

        return () => {
            setSeatState([]); 
            setUserBill([])
        };
    }, [setSeatState, setUserBill]);

    return (
        <Container className={classes.root}>
            <Typography variant="h3" component="h1" className={classes.title}>
                Quản lý chỗ ngồi
            </Typography>
            <Grid container justifyContent="center" alignItems="center">
                {seatState && seatState.map(seat =>
                    <Grid item xs={4} key={seat.id}>
                        <Button
                            variant="contained"
                            className={seat.available ? classes.button : classes.buttonRed}
                            startIcon={<WeekendIcon />}
                            onClick={() => handleSeat(seat.available, seat.number, seat.id)}
                        >
                            Seat {seat.number} -
                            Tổng {currencyFormat(seat.total)} đ
                        </Button>
                    </Grid>
                )}
            </Grid>
        </Container>
    )
}

export default Seat