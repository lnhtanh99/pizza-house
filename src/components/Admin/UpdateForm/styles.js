import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 600,
        overflow: 'scroll',
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        textAlign: 'center',
        padding: '20px'
    },
    input: {
        margin: '10px 0'
    },
    btn: {
        marginTop: '30px',
        padding: '10px 30px'
    }
}));