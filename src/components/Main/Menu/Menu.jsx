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

//carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import carousel1 from '../../../assets/carousel1.png';
import carousel2 from '../../../assets/carousel2.jpg';
import carousel3 from '../../../assets/carousel3.jpg';
import carousel4 from '../../../assets/carousel4.jpg';
import carousel5 from '../../../assets/carousel5.png';
import carousel6 from '../../../assets/carousel6.jpg';

function Menu() {
    const { category } = useParams();
    const [menu, setMenu] = useState([]);
    const { isPizza, setIsPizzas, filters } = useContext(PizzaContext);
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
            {/* <Carousel
                thumbWidth={200}
                autoPlay
                interval={2000}
                infiniteLoop
            >
                <img src={carousel1} alt="carousel1"/>
                <img src={carousel2} alt="carousel2"/>
                <img src={carousel3} alt="carousel3"/>
                <img src={carousel4} alt="carousel4"/>
                <img src={carousel5} alt="carousel5"/>
                <img src={carousel6} alt="carousel6"/>

            </Carousel> */}
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
