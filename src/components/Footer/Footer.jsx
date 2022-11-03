import { useStyles } from './styles';
import { AppBar, Toolbar, Typography, Container, Grid } from '@material-ui/core';
import { LocalPizza, Phone } from '@material-ui/icons';
function Footer() {
    const classes = useStyles();

    return (
        <AppBar position="fixed" style={{ backgroundColor: '#004666' }} className={classes.footer}>
            <Toolbar className={classes.root}>
                <Container>
                    <Grid container justifyContent="center">
                        <Grid item sm={12} md={6} className={classes.wrapper}>
                            <Typography>
                                <LocalPizza className={classes.logo} />
                                <span className={classes.text}>Welcome to PizzaHouse!</span>
                                <LocalPizza className={classes.logo} />
                            </Typography>
                        </Grid>
                        <Grid item sm={12} md={6} className={classes.wrapper}>
                            <Typography>
                                <Phone className={classes.logo} />
                                <span className={classes.text}>Hotline đặt hàng: 1900 000có</span>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default Footer
