import AddForm from "./AddForm/AddForm"
import { Container, Typography, Table, TableContainer, Paper, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { useStyles } from './styles';

function Admin() {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Typography variant="h3" component="h1">
                Menu Table
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <AddForm />
        </Container>
    )
}

export default Admin
