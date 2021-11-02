import { useStyles } from './styles';
import { Grid, Typography, Card, CardMedia, CardContent } from '@material-ui/core';

import { useContext } from 'react';
import { PizzaContext } from '../../context/PizzaContext';

function Content({ pizzas, type, others }) {
    const classes = useStyles();
    const { isPizza } = useContext(PizzaContext);


    return (
        <Grid container spacing={4}>
            {isPizza ?
                pizzas && pizzas.filter(pizza => pizza.type === type).map(filteredPizza => (
                    <Grid item xs={12} sm={6} md={3} key={filteredPizza.name}>
                        <Card className={classes.card}>
                            <CardMedia
                                component="img"
                                image={filteredPizza.image.small}
                                className={classes.img}
                            />
                            <CardContent>
                                <Typography variant="h6" >
                                    <span className={classes.name}>{filteredPizza.name}</span>
                                </Typography>
                                <Typography variant="body2">
                                    <span className={classes.price}>{filteredPizza.price.small} đ</span>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
                :
                others && others.map(other => (
                    <Grid item xs={12} sm={6} md={3} key={other.name}>
                        <Card className={classes.card}>
                            <CardMedia
                                component="img"
                                image={other.image}
                                className={classes.img}
                            />
                            <CardContent>
                                <Typography variant="h6" >
                                    <span className={classes.name}>{other.name}</span>
                                </Typography>
                                <Typography variant="body2">
                                    <span className={classes.price}>{other.price} đ</span>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default Content
