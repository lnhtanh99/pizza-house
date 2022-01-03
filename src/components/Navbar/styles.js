import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'center',
        justifyContent: 'center',
    },
    title: {
        flexGrow: '1',
        fontSize: '35px',
        padding: '20px',
        paddingLeft: '30px',
        textAlign: 'left',
    },
    logo: {
        fontSize: '35px',
    },
    links: {
        margin: '0 10px',
        padding: '30px',
        fontSize: '20px',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        cursor: 'pointer',
        "&:hover": {
            backgroundColor: '#686de0'
        },
       
    },
    iconButtons: {
        "&:hover": {
            backgroundColor: '#686de0'
        },
        margin: '0 10px',
    },
    icons: {
        fontSize: '35px',
    },
    show: {
        '@media (max-width: 1212px)': {
            display: 'none'
        }
    },
    menu: {
        cursor: 'pointer',
        '@media (min-width: 1213px)': {
            display: 'none'
        }
    },
    drawer:{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawerWrapper: {
        marginTop: '100px',
    },
    drawerText: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }
}));