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
        padding: '20px 0'
    },
    rowDone: {
        backgroundColor: '#bdbdbd'
    },
    tableItem: {
        paddingBottom: '10px'
    },
    itemQuantity: {
        paddingBottom: '60px',
        paddingTop: '20px',
    },
    icon: {
        cursor: 'pointer'
    },
    container: {
        marginBottom: '250px'
    }
}));