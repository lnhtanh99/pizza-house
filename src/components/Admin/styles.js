import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
    },
    container: {
        marginBottom: '70px'
    },
    title: {
        margin: '40px 0',
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