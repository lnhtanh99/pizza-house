//material-ui
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import { Container, Typography, Table, TableContainer, Paper, TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination } from '@material-ui/core';
import { useStyles } from './styles';

//react
import { useState, useContext, useEffect } from 'react';

//firebase
import useFirestore from '../../hooks/useFirestore';
import { projectFirestore } from '../../firebase/config';

//context
import { AdminContext } from '../../context/AdminContext';
import UpdateForm from './UpdateForm/UpdateForm';

const AdminMenu = () => {
    const classes = useStyles();
    const { open, setOpen, documents, setDocuments } = useContext(AdminContext);
    // const { docs } = useFirestore('menu');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [docs, setDocs] = useState([])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const handleEdit = (doc) => {
        setOpen(true);
        setDocuments(doc);
    }

    const handleClear = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            projectFirestore.collection('menu').doc(id).delete();
        }
    }

    useEffect(() => {
        const unsub = projectFirestore.collection('menu')
            .orderBy('type', 'desc')
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({
                        ...doc.data(), 
                        id: doc.id
                    })
                });
                setDocs(documents)
            })
        return () => unsub();    
    },[]);

    return (
        <Container>
            <UpdateForm
                open={open}
                documents={documents}
                setOpen={setOpen}
            />
            <Typography variant="h3" component="h1" className={classes.title}>
                Danh mục sản phẩm
            </Typography>
            <TableContainer component={Paper} className={classes.container}>
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
                            <TableCell className={classes.tableHeader} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {docs && (rowsPerPage > 0
                            ? docs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : docs
                        ).map((doc) => (
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
                                <TableCell align="center">
                                    <EditIcon
                                        className={classes.editIcon}
                                        onClick={() => handleEdit(doc)}
                                    />
                                    <ClearIcon
                                        className={classes.clearIcon}
                                        onClick={() => handleClear(doc.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, docs.length]}
                                count={docs.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default AdminMenu