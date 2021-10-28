import { useStyles } from './styles';
import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core'
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Pizza from './Pizza/Pizza';
import Other from './Other/Other';

function Menu() {
    const { category } = useParams();
    const [ pizzas, setPizzas ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if(category){
                try{
                    const { data } = await axios.get(`http://localhost:8080/menu/?category=${category}`);
                    setPizzas(data);
                } 
                catch(err){
                    console.error(err);
                }
            } else {
                try{
                    const { data } = await axios.get(`http://localhost:8080/menu/?category=Pizza`);
                    setPizzas(data);
                } 
                catch(err){
                    console.error(err);
                }
            }

        }

        fetchData();
    }, [category]);

    const classes = useStyles();
    return (
        <Box className={classes.root}>
            { !category || category === 'Pizza' ? <Pizza pizzas={pizzas}/> : <Other/> }
        </Box>
    )
}

export default Menu
