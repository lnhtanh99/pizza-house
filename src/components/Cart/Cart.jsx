import { Drawer, Toolbar, Typography, Box, IconButton } from '@material-ui/core';
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import images from '../../assets/empty-cart.svg';
import { useStyles } from './styles';

function Cart({ cartOpen, setCartOpen }) {
    const classes = useStyles();

    return (
        <Box xs={{ display: 'flex' }}>
            <Drawer
                anchor="right"
                variant="persistent"
                open={cartOpen}
                classes={{ paper: classes.drawer }}
            >
                <Toolbar />
                <Box
                    sx={{ overflow: 'auto' }}
                    className={classes.drawerWrapper}
                >
                    <IconButton
                        onClick={() => setCartOpen(false)}
                        className={classes.closeBtn}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        className={classes.drawerText}
                    >
                        Giỏ hàng chưa có sản phẩm.
                        <br />
                        Xin mời bạn mua hàng
                    </Typography>
                    <img src={images} alt="sad-cart" className={classes.image} />
                </Box>
            </Drawer>
        </Box>
    )
}

export default Cart
