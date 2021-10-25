import { Box } from '@material-ui/core'
import { useStyles } from './styles';

function Pizza() {
    const classes = useStyles();
    const categories = [
        {
            name: 'Hải sản',
            avatar: '../../assets/fried-shrimp_1f364.png'
        },

    ]
    return (
        <div className={classes.buttons}>
            Hello
        </div>
    )
}

export default Pizza
