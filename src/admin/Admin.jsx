import { Container } from '@material-ui/core'

import { useStyles } from './styles';

import DineIn from "./ShowBill/DineIn/DineIn";

function Admin() {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <DineIn />
        </Container>
    )
}

export default Admin
