import { useStyles } from './styles';
import { Typography, Grid } from '@material-ui/core';
import { Star } from '@material-ui/icons';

function Title({ smallPrice, mediumPrice, bigPrice, type }) {
    const classes = useStyles();
    return (
        <div>
            <Typography
                variant="h2"
                className={classes.title}
            >
                <Star className={classes.starIcon} />{type}<Star className={classes.starIcon} />
            </Typography>
            <Grid container spacing={0} style={{ marginBottom: '50px' }}>
                <Grid item xs={3} className={classes.size}>
                    <img src="../../../assets/pizza-small.svg" alt="small-pizza" />
                    <Typography>
                        <span className={classes.sizeText}>Nhỏ(7''') :</span> <br/> {smallPrice} đ
                    </Typography>
                </Grid>
                <Grid item xs={3} className={classes.size}>
                    <img src="../../../assets/pizza-medium.svg" alt="medium-pizza" />
                    <Typography>
                        <span className={classes.sizeText}>Vừa(9''') :</span> <br/> {mediumPrice} đ
                    </Typography>
                </Grid>
                <Grid item xs={3} className={classes.size}>
                    <img src="../../../assets/pizza-big.svg" alt="big-pizza" />
                    <Typography>
                        <span className={classes.sizeText}>Lớn(12''') :</span> <br/> {bigPrice} đ
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default Title
