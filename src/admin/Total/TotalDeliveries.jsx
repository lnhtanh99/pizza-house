//material-ui
import { Typography, Table, TableContainer, Paper, TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination } from '@material-ui/core';
import { useStyles } from './styles';

//react
import { useState, useEffect } from 'react';

//firebase
import { projectFirestore } from '../../firebase/config';

const TotalDeliveries = () => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [docs, setDocs] = useState([]);
    const [bigTotal, setBigTotal] = useState(0);

    const currencyFormat = (num) => {
        return Intl.NumberFormat('en-US').format(num);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        projectFirestore.collection('deliveries')
            .where('checked', '==', true)
            .orderBy('date', 'desc')
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({
                        ...doc.data(),
                        id: doc.id
                    })
                });
                setDocs(documents);
                if (documents.length > 0) {
                    setBigTotal(documents.reduce((n, {total}) => n + (parseInt(total)), 0))
                }
            })

    }, [setDocs, setBigTotal])

    return (
        <>
            <Typography style={{ marginTop: '30px' }}>
                Tổng doanh thu: { currencyFormat(bigTotal) } đ
            </Typography>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeader} align="center">ID </TableCell>
                            <TableCell className={classes.tableHeader} align="center">Date</TableCell>
                            <TableCell className={classes.tableHeader} align="center">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {docs && (rowsPerPage > 0
                            ? docs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : docs
                        ).map((doc) => (
                            <TableRow key={doc.id}>
                                <TableCell align="center">{doc.id}</TableCell>
                                <TableCell align="center">{doc.date}</TableCell>
                                <TableCell align="center">{currencyFormat(doc.total)} đ</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
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
        </>
    )
}

export default TotalDeliveries