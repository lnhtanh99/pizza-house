import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        paddingBottom: '100px'
    },
    title:{
        margin: '20px 0',
    },
    button: {
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