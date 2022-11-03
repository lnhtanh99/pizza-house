import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: '130px'
    },
    title: {
        margin: '40px 0',
        textAlign: 'center',
    },
    tableHeader: {
        fontWeight: 'bold',
        fontSize: '15px',
    },
    editIcon: {
        cursor: 'pointer'
    },
    clearIcon: {
        cursor: 'pointer'
    }
}));