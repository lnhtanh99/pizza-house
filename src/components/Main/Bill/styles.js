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
    }
}));