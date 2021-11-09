import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    drawer:{
        width: '470px',
        '@media (max-width: 950px)': {
            width: '100%',
        }
    },
    drawerText: {
        textAlign: 'center'
    },
    image: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
}));