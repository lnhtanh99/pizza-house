//material-ui
import { useStyles } from './styles';
import { Box, Button, Avatar, Container } from '@material-ui/core';

//react
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

//context
import { PizzaContext } from '../../../context/PizzaContext';

//components
import Pizza from './Pizza';
import Other from './Other';
import Modal from '../Modal/Modal';

//hooks
import useData from '../../../hooks/useData';


function Menu() {
    const { category } = useParams();
    const { isPizza, setIsPizzas, filters } = useContext(PizzaContext);

    const [menu, setMenu] = useState([]);
    const [chosenPizza, setChosenPizza] = useState([]);
    const [chosenOther, setChosenOther] = useState([]);

    const { docs } = useData(category);

    useEffect(() => {
        const fetchData = () => {
            setMenu(docs);
            if (category) {
                if (category === 'Pizza') {
                    setChosenPizza(docs);
                    setIsPizzas(true);
                } else {
                    setIsPizzas(false);
                    setChosenOther(docs);
                }
            } else {
                setChosenPizza(docs);
            }
        }
        fetchData();
    }, [category, setIsPizzas, docs]);

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
            <div className={classes.main}>
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
                    <Modal />
                </Container>
            </div>
        </Box>

    )
}

export default Menu
