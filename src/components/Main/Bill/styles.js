import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
    },
    title: {
        margin: '50px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    total: {
        fontWeight: 'bold',
        margin: '30px',
        textAlign: 'right',
    }, 
    info: {
        marginBottom: '80px',
    },
    form: {
        width: '400px',
        margin: 'auto',
        paddingBottom: '30px'
    },
    button: {
        marginBottom: '120px',
    },
    formTitle: {
        fontWeight: 'bold',
    },
    buttonSeat: {
        padding: '10px 30px',
        margin: '30px',
        backgroundColor: theme.palette.primary.main,
        color: 'white'
    },
    buttonRed: {
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
        padding: '10px 30px',
        margin: '30px',
    }
}));