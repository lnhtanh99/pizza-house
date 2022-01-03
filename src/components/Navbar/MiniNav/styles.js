import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'white',
        color: 'black',
        fontFamily: 'Montserrat',
        borderBottom: '1px solid black',
        marginTop: '84px',
    },
    cartOpen: {
        width: 'calc(100% - 470px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartClose: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    links: {
        padding: '21px',
        margin: '0 25px',
        fontWeight: 'bold',
        "&:hover": {
            borderBottom: '3px solid red'
        },
        fontSize: '15px'
    }
}));