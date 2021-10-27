import { useStyles } from './styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Pizza from './Pizza/Pizza';
import Other from './Other/Other';

function Menu() {
    const { category } = useParams();
    const [ pizzas, setPizzas ] = useState([]);

    console.log(category);
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
                    console.log(data);
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
        <>
            { category === 'Pizza' ? <Pizza pizzas={pizzas}/> : <Other/> }
        </>
    )
}

export default Menu
