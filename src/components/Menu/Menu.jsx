import { useStyles } from './styles';
import { Box, Button, Avatar, Container } from '@material-ui/core';

import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { PizzaContext } from '../../context/PizzaContext';

import Pizza from './Pizza';
import Other from './Other';

function Menu() {
    const { category } = useParams();
    const [menu, setMenu] = useState([]);
    const { isPizza, setIsPizzas, filters } = useContext(PizzaContext);
    const [chosenPizza, setChosenPizza] = useState([]);
    const [chosenOther, setChosenOther] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (category) {
                try {
                    const { data } = await axios.get(`http://localhost:8080/menu/?category=${category}`);
                    setMenu(data);
                    if (category === 'Pizza') {
                        setChosenPizza(data);
                        setIsPizzas(true);
                    } else {
                        setIsPizzas(false);
                        setChosenOther(data);
                    }
                }
                catch (err) {
                    console.error(err);
                }
            } else {
                try {
                    const { data } = await axios.get(`http://localhost:8080/menu/?category=Pizza`);
                    setMenu(data);
                    setChosenPizza(data);
                }
                catch (err) {
                    console.error(err);
                }
            }

        }

        fetchData();
    }, [category, setIsPizzas]);

    const classes = useStyles();

    const handleFilter = (event) => {
        if (event.currentTarget.value === 'Tất cả') {
            setChosenPizza(menu);
        } else {
            const FilterPizzas = menu.filter(item => item.filter.includes(event.currentTarget.value));
            setChosenPizza(FilterPizzas);
        }
    }

    return (
        <Box className={classes.root}>
            <>
                {isPizza ? filters.map(filter => (
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
                )) : null}
                <Container className={classes.container}>
                    {isPizza ? <Pizza chosenPizza={chosenPizza} />
                        : <Other others={chosenOther} />
                    }
                </Container>
            </>
        </Box>
    )
}

export default Menu
