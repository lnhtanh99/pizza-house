import { useStyles } from './styles';
import { Button, Avatar, Typography, Grid, Container, Card, CardMedia, CardContent } from '@material-ui/core';

import shrimpImage from '../../../assets/fried-shrimp_1f364.png';
import meatImage from '../../../assets/cut-of-meat_1f969.png';
import chickenImage from '../../../assets/poultry-leg_1f357.png';
import porkImage from '../../../assets/bacon_1f953.png';
import vegImage from '../../../assets/leafy-green_1f96c.png';

import Title from './Title';

function Pizza({ pizzas }) {
    const classes = useStyles();
    const filters = [
        {
            name: 'Tất cả',
        },
        {
            name: 'Hải sản',
            icon: shrimpImage
        },
        {
            name: 'Bò',
            icon: meatImage
        },
        {
            name: 'Gà',
            icon: chickenImage
        },
        {
            name: 'Heo',
            icon: porkImage
        },
        {
            name: 'Chay',
            icon: vegImage
        }
    ]

    return (
        <div>
            {filters.map(filter => (
                <Button
                    key={filter.name}
                    startIcon={filter.name !== 'Tất cả' ? <Avatar src={filter.icon} /> : null}
                    className={classes.filter}
                    variant="outlined"
                >
                    {filter.name}
                </Button>
            ))}
            <Container className={classes.container}>
                <Title 
                    smallPrice="89.000"
                    mediumPrice="169.000"
                    bigPrice="259.000"
                    type="premium"
                />
                <Grid container spacing={4}>
                    {pizzas && pizzas.filter(pizza => pizza.type === 'premium').map(filteredPizza => (
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

                {
                    pizzas && pizzas.map(pizza => (
                        <div key={pizza.name}>{pizza.name}</div>
                    ))
                }
            </Container>
        </div>
    )
}

export default Pizza
