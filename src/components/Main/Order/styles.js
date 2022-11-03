import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    container: {
        textAlign: 'center',
    },
    title: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: '30px',
        margin: '30px 0'
    },
    tableHeader:{
        fontWeight: 'bold',
    }
}));