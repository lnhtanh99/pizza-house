import { useStyles } from './styles';
import { Grid, Typography, Card, CardMedia, CardContent } from '@material-ui/core'

function Content({pizzas, type}) {
    const classes = useStyles();

    return (
        <Grid container spacing={4}>
            {pizzas && pizzas.filter(pizza => pizza.type === type).map(filteredPizza => (
                <Grid item xs={12} sm={6} md={3} key={filteredPizza.name}>
                    <Card className={classes.card}>
                        <CardMedia
                            component="img"
                            image={filteredPizza.image.small}
                            className={classes.pizzaImg}
                        />
                        <CardContent>
                            <Typography variant="h6" >
                                <span className={classes.pizzaName}>{filteredPizza.name}</span>
                            </Typography>
                            <Typography variant="body2">
                                <span className={classes.pizzaPrice}>{filteredPizza.price.small} đ</span>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default Content
