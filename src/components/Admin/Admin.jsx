import AddForm from "./AddForm/AddForm"
import { Container, Typography, Table, TableContainer, Paper, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { useStyles } from './styles';
import useFirestore from '../../hooks/useFirestore';

function Admin() {
    const classes = useStyles();
    const { docs } = useFirestore('menu');

    return (
        <Container className={classes.root}>
            <Typography variant="h3" component="h1" className={classes.title}>
                Menu Table
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeader} align="center">ID</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Name</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Category</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Type</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Description</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Image</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Price small</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Price medium</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Price big</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {docs && docs.map((doc) => (
                            <TableRow key={doc.id}>
                                <TableCell align="center">{doc.id}</TableCell>
                                <TableCell align="center">{doc.name}</TableCell>
                                <TableCell align="center">{doc.category}</TableCell>
                                <TableCell align="center">{doc.type}</TableCell>
                                <TableCell align="center">{doc.description}</TableCell>
                                <TableCell align="center">
                                    <img src={doc.image} width="100" height="100" alt="menu" />
                                </TableCell>
                                <TableCell align="center">{doc.priceSmall}</TableCell>
                                <TableCell align="center">{doc.priceMedium}</TableCell>
                                <TableCell align="center">{doc.priceBig}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddForm />
        </Container>
    )
}

export default Admin
