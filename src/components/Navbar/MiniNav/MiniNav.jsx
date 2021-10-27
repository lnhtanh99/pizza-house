import { useStyles } from './styles';
import { AppBar, Toolbar, Link as MaterialLink, Box } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

function MiniNav({ cartOpen }) {
    const classes = useStyles();
    const categories = ['Pizza', 'Mì Ý', 'Món phụ', 'Tráng miệng', 'Nước uống']

    return (
        <Box>
            <AppBar
                elevation={0}
                className={classes.root}
                position="static"
            >
                <Toolbar className={cartOpen ? classes.cartOpen : classes.cartClose}>
                    <>
                        {
                            categories && categories.map((category, index) => (
                                <MaterialLink
                                    underline="none"
                                    color="inherit"
                                    key={index}
                                    component={RouterLink} to={`/Pizzahouse/${category}`}
                                    className={classes.links}
                                >
                                    {category}
                                </MaterialLink>
                            ))
                        }
                    </>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default MiniNav
