import { Modal as MUIModal, Box, Typography, Card, CardMedia, CardContent, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Button } from '@material-ui/core';
import { PizzaContext } from '../../../context/PizzaContext';
import { useContext } from 'react';
import { useStyles } from './styles';

function Modal() {
    const { openModal, handleCloseModal, select, isPizza } = useContext(PizzaContext);
    const classes = useStyles();

    return (
        <MUIModal
            open={openModal}
            onClose={handleCloseModal}
        >
            <Box className={classes.box}>
                <Card className={classes.card}>
                    <CardMedia
                        component="img"
                        image={select.image}
                        className={classes.image}
                    />
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography variant="h5" component="h2" className={classes.title}>
                            {select.name}
                        </Typography>
                        <Typography variant="body1" >
                            {select.description}
                        </Typography>
                        {isPizza &&
                            <>
                                <FormControl fullWidth>
                                    <FormLabel
                                        component="legend"
                                        className={classes.radioTitle}
                                    >
                                        Chọn đế bánh
                                    </FormLabel>
                                    <RadioGroup
                                        aria-label="gender"
                                        defaultValue="Đế vừa"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="Đế dày xốp" control={<Radio />} label="Đế dày xốp" />
                                        <FormControlLabel value="Đế vừa" control={<Radio />} label="Đế vừa" />
                                        <FormControlLabel value="Đế mỏng" control={<Radio />} label="Đế mỏng" />
                                    </RadioGroup>
                                </FormControl>
                                <FormControl fullWidth>
                                    <FormLabel
                                        component="legend"
                                        className={classes.radioTitle}
                                    >
                                        Chọn cỡ bánh
                                    </FormLabel>
                                    <RadioGroup
                                        aria-label="gender"
                                        defaultValue="Cỡ 9 inch"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="Cỡ 7 inch" control={<Radio />} label="Cỡ 7 inch" />
                                        <FormControlLabel value="Cỡ 9 inch" control={<Radio />} label="Cỡ 9 inch" />
                                        <FormControlLabel value="Cỡ 12 inch" control={<Radio />} label="Cỡ 12 inch" />
                                    </RadioGroup>
                                </FormControl>
                                <FormControl fullWidth>
                                    <FormLabel
                                        component="legend"
                                        className={classes.radioTitle}
                                    >
                                        Chọn cỡ bánh
                                    </FormLabel>
                                    <RadioGroup
                                        aria-label="gender"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="Thêm phomai" control={<Radio />} label="Thêm phomai" />
                                        <FormControlLabel value="Gấp đôi phomai" control={<Radio />} label="Gấp đôi phomai" />
                                        <FormControlLabel value="Gấp ba phomai" control={<Radio />} label="Gấp ba phomai" />
                                    </RadioGroup>
                                </FormControl>
                            </>
                        }
                    </CardContent>
                    <Button
                        className={classes.btn}
                        variant="contained"
                        color="secondary"
                    >
                        Thêm vào giỏ hàng
                    </Button>
                </Card>
            </Box>
        </MUIModal>
    )
}

export default Modal
