import { useStyles } from './styles';
import { Grid, Typography, Card, CardMedia, CardContent } from '@material-ui/core';

import { useContext } from 'react';
import { PizzaContext } from '../../../context/PizzaContext';

function Content({ pizzas, type, others }) {
    const classes = useStyles();
    const { isPizza, setSelect, handleOpenModal } = useContext(PizzaContext);

    return (
        <Grid container spacing={4}>
            {isPizza ?
                pizzas && pizzas.filter(pizza => pizza.type === type).map(filteredPizza => (
                    <Grid item xs={12} sm={6} md={3} key={filteredPizza.name}>
                        <div onClick={handleOpenModal}>
                            <Card className={classes.card} onClick={() => setSelect(filteredPizza)}>
                                <CardMedia
                                    component="img"
                                    image={filteredPizza.image}
                                    className={classes.img}
                                />
                                <CardContent>
                                    <Typography variant="h6" >
                                        <span className={classes.name}>{filteredPizza.name}</span>
                                    </Typography>
                                    <Typography variant="body2">
                                        <span className={classes.price}>{filteredPizza.priceSmall} đ</span>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>

                    </Grid>
                ))
                :
                others && others.map(other => (
                    <Grid item xs={12} sm={6} md={3} key={other.name}>
                        <div onClick={handleOpenModal}>
                            <Card className={classes.card} onClick={() => setSelect(other)}>
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
                                        <span className={classes.price}>{other.priceSmall} đ</span>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default Content
