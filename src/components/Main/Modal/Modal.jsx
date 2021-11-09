import { Modal as MUIModal, Box, Typography } from '@material-ui/core';
import { PizzaContext } from '../../../context/PizzaContext';
import { useContext } from 'react';
import { useStyles } from './styles';
import axios from 'axios';

function Modal() {
    const { openModal, handleCloseModal, select } = useContext(PizzaContext);
    const classes = useStyles();

    return (
        <MUIModal
            open={openModal}
            onClose={handleCloseModal}
        >
            <Box className={classes.box}>
                <Typography variant="h6" component="h2" >
                    {select.name}
                </Typography>
                <Typography>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
        </MUIModal>
    )
}

export default Modal
