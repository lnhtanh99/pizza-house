import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        margin: '50px auto',
        border: '2px solid black',
        maxWidth: '600px',
    },
    title: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        paddingTop: '30px'
    },
    subtitle: {
        fontSize: '13px',
        paddingBottom: '30px'
    },
    form: {
        width: '400px',
        margin: 'auto',
        paddingBottom: '30px'
    },
    input: {
        margin: '10px 0'
    },
    btn: {
        marginTop: '30px',
        padding: '10px 30px'
    }
}));