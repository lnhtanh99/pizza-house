import { useStyles } from './styles';
import { Button, Avatar, Container } from '@material-ui/core';

import shrimpImage from '../../../assets/fried-shrimp_1f364.png';
import meatImage from '../../../assets/cut-of-meat_1f969.png';
import chickenImage from '../../../assets/poultry-leg_1f357.png';
import porkImage from '../../../assets/bacon_1f953.png';
import vegImage from '../../../assets/leafy-green_1f96c.png';

import Title from './Title';
import Content from './Content';

import { useState, useEffect } from 'react';

function Pizza({ pizzas }) {
    const classes = useStyles();
    const [chosenPizza, setChosenPizza] = useState([]);

    useEffect(() => {
        setChosenPizza(pizzas);
    }, [pizzas]);

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

    const handleFilter = (event) => {
        if (event.currentTarget.value === 'Tất cả') {
            setChosenPizza(pizzas);
        } else {
            const FilterPizzas = pizzas.filter(item => item.filter.includes(event.currentTarget.value));
            setChosenPizza(FilterPizzas);
        }
    }
    return (
        <>
            {filters.map(filter => (
                <Button
                    key={filter.name}
                    startIcon={filter.name !== 'Tất cả' ? <Avatar src={filter.icon} /> : null}
                    className={classes.filter}
                    variant="outlined"
                    onClick={handleFilter}
                    value={filter.name}
                >
                    {filter.name}
                </Button>
            ))}
            <Container className={classes.container}>
                <>
                    {chosenPizza.filter(pizza => pizza.type === 'premium').length > 0 ?
                        <>
                            <Title
                                smallPrice="89.000"
                                mediumPrice="169.000"
                                bigPrice="259.000"
                                type="premium"
                            />
                            <Content
                                pizzas={chosenPizza}
                                type="premium"
                            />
                        </>
                        : null
                    }
                </>
                <>
                    {chosenPizza.filter(pizza => pizza.type === 'favorite').length > 0 ?
                        <>
                            <Title
                                smallPrice="69.000"
                                mediumPrice="139.000"
                                bigPrice="209.000"
                                type="favorite"
                            />
                            <Content
                                pizzas={chosenPizza}
                                type="favorite"
                            />
                        </>
                        : null
                    }

                </>
                <>
                    {chosenPizza.filter(pizza => pizza.type === 'signature').length > 0 ?
                        <>
                            <Title
                                smallPrice="129.000"
                                mediumPrice="229.000"
                                bigPrice="329.000"
                                type="signature"
                            />
                            <Content
                                pizzas={chosenPizza}
                                type="signature"
                            />
                        </>
                        : null 
                    }

                </>
            </Container>
        </>
    )
}

export default Pizza
