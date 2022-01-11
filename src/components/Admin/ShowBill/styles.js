import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    tableHeader: {
        fontWeight: 'bold',
        fontSize: '15px',
    },
    title:{
        margin: '30px'
    },
    itemName: {
        fontWeight: 'bold',
    },
    icon: {
        cursor: 'pointer'
    }
}));