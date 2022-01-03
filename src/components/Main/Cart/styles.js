import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    drawer:{
        width: '500px',
        '@media (max-width: 950px)': {
            width: '100%',
        }
    },
    drawerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: '25px'
    },
    image: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    cartContainer: {
        margin: '15px',
        position: 'relative',
    },
    cartName: {
        fontWeight: 'bold',
        fontSize: '15px',
        width: '400px'
    },
    cartQuantity:{
        fontSize: '20px',
        fontWeight: 'bold',
        margin: '0 10px',
    },
    total: {
        fontSize: '20px',
        fontWeight: 'bold',
        margin: '0 30px',
    },
    clearIcon: {
        position: 'absolute',
        right: '0',
        top: '20px'
    }
}));