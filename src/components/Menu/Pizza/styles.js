import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    filter: {
        margin: '30px 20px 0px',
        width: '130px',
        height: '60px',
    },
    container: {
        textAlign: 'center',
    },
    title: {
        textTransform: 'uppercase',
        fontSize: '35px',
        paddingTop: '50px',
        fontWeight: 'bold',
    },
    starIcon: {
        fontSize: '30px',
        margin: '0 10px',
    },
    size: {
        margin: 'auto',
        paddingTop: '20px',
    },
    sizeText: {
        fontWeight: 'bold',
    },
    card: {
        height: '350px',
        position: 'relative',
        '@media (max-width: 960px)': {
            height: '420px',
        }, 
        '@media (max-width: 600px)': {
            height: '500px',
        },
        cursor: 'pointer'
    },
    pizzaImg:{
        transition: '0.3s linear',
        "&:hover": {
            transform: 'scale(1.1)'
        },
    },
    pizzaName: {
        fontWeight: 'bold',
    },
    pizzaPrice: {
        position: 'absolute',
        bottom: '10px',
        fontSize: '30px',
        right: '20px',
    }
}));