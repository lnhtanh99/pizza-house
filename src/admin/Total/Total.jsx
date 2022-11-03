//material-ui
import { Container, TextField, MenuItem, Typography } from '@material-ui/core';
import { useStyles } from './styles';

//react
import { useState } from 'react';

//comp
import TotalDeliveries from './TotalDeliveries';
import TotalDineIn from './TotalDineIn';
const Total = () => {
    const classes = useStyles();
    const [status, setStatus] = useState('dinein');

    const options = [
        {
            label: 'Dine In',
            value: 'dinein',
        },
        {
            label: 'Vận chuyển',
            value: 'deliveries',
        },
    ]

    return (
        <Container className={classes.container}>
            <Typography variant="h3" component="h1" className={classes.title}>
                Doanh thu
            </Typography>
            <TextField
                variant="outlined"
                fullWidth
                select
                label="Loại đơn hàng"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            { status && (status === 'dinein' ? <TotalDineIn /> : <TotalDeliveries/>)}
        </Container>
    )
}

export default Total