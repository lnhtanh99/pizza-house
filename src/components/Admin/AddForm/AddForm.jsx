import { useState, useEffect } from 'react';
import useStorage from '../../../hooks/useStorage';
import { Container, FormControl, InputLabel, Typography, Box, TextField, Select, Button, MenuItem, Input, Checkbox, FormGroup, FormControlLabel, FormLabel } from '@material-ui/core'
import { useStyles } from './styles';
import { projectFirestore } from '../../../firebase/config';

function AddForm() {
    const [file, setFile] = useState('');
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [priceSmall, setPriceSmall] = useState('');
    const [priceMedium, setPriceMedium] = useState('');
    const [priceBig, setPriceBig] = useState('');
    const [filter, setFilter] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [isPizza, setIsPizza] = useState(false);

    useEffect(() => {
        setFile(file);
    }, [file])

    const types = ['image/png', 'image/jpeg', 'image/jpg'];
    const classes = useStyles();

    const handleUpload = (event) => {
        let selected = event.target.files[0];

        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            setFile('');
            setError('Please select an image file (png, jpeg, jpg)');
        }
    }

    const { url } = useStorage(file);

    const handleFilter = (event) => {
        setSelectedFilter(event.target.value);
        filter.push(selectedFilter);
    }

    const handleCategory = (event) => {
        setCategory(event.target.value);
        if (event.target.value === 'Pizza') {
            setIsPizza(true);
        } else {
            setIsPizza(false);
            setType(event.target.value);
        }
    }

    const handlePrice = (event) => {
        setPriceSmall(event.target.value);
        setPriceMedium(0);
        setPriceBig(0);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        projectFirestore.collection('menu').add({
            name,
            category,
            type,
            description,
            priceSmall,
            priceMedium,
            priceBig,
            image: url
        });
        setName('');
        setCategory('');
        setType('');
        setDescription('');
        setPriceSmall('');
        setPriceMedium('');
        setPriceBig('');
    }

    return (
        <Container className={classes.root}>
            <Typography variant="h4" className={classes.title}>
                Thêm sản phẩm
            </Typography>
            <Box className={classes.form}>
                <TextField
                    label="Tên sản phẩm"
                    fullWidth
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        onChange={handleCategory}
                    >
                        <MenuItem value="Pizza">Pizza</MenuItem>
                        <MenuItem value="Mì Ý">Mì Ý</MenuItem>
                        <MenuItem value="Món phụ">Món phụ</MenuItem>
                        <MenuItem value="Tráng miệng">Tráng miệng</MenuItem>
                        <MenuItem value="Nước uống">Nước uống</MenuItem>
                    </Select>
                </FormControl>
                {
                    category === 'Pizza' &&
                    <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        {isPizza &&
                            <Select
                                value={type}
                                onChange={(event) => setType(event.target.value)}
                            >
                                <MenuItem value="premium">Premium</MenuItem>
                                <MenuItem value="favorite">Favorite</MenuItem>
                                <MenuItem value="signature">Signature</MenuItem>
                            </Select>
                        }
                    </FormControl>
                }
                <TextField
                    label="Description"
                    multiline
                    fullWidth
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                {isPizza ?
                    <>
                        <Input
                            type="number"
                            fullWidth
                            placeholder="Price small"
                            className={classes.input}
                            value={priceSmall}
                            onChange={(event) => setPriceSmall(event.target.value)}
                        />
                        <Input
                            type="number"
                            fullWidth
                            placeholder="Price medium"
                            className={classes.input}
                            value={priceMedium}
                            onChange={(event) => setPriceMedium(event.target.value)}
                        />
                        <Input
                            type="number"
                            fullWidth
                            placeholder="Price big"
                            className={classes.input}
                            value={priceBig}
                            onChange={(event) => setPriceBig(event.target.value)}
                        />
                    </>

                    :
                    <Input
                        type="number"
                        fullWidth
                        placeholder="Price"
                        className={classes.input}
                        value={priceSmall}
                        onChange={handlePrice}
                    />
                }

                <FormControl fullWidth>
                    <FormLabel component="legend">Choose filter</FormLabel>
                    <FormGroup onChange={handleFilter}>
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Hải sản"
                            value="Hải sản"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Bò"
                            value="Bò"
                        />
                    </FormGroup>
                </FormControl>
                {error && <div>{error}</div>}
                <Input
                    type="file"
                    fullWidth
                    onChange={handleUpload}
                    className={classes.input}
                />
                <Button
                    className={classes.btn}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Add
                </Button>
            </Box>


        </Container>
    )
}

export default AddForm
