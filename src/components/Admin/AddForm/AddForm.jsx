import { useState } from 'react';
import { Container, FormControl, InputLabel, Typography, Box, TextField, Select, Button, MenuItem, Input, Checkbox, FormGroup, FormControlLabel, FormLabel } from '@material-ui/core'
import { useStyles } from './styles';
import { projectFirestore, projectStorage } from '../../../firebase/config';

function AddForm() {
    const [fileURL, setFileURL] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [priceSmall, setPriceSmall] = useState('');
    const [priceMedium, setPriceMedium] = useState('');
    const [priceBig, setPriceBig] = useState('');
    const filter = [
        {
            name: 'Bò'
        },
        {
            name: 'Gà'
        },
        {
            name: 'Heo'
        },
        {
            name: 'Hải sản'
        },
        {
            name: 'Chay'
        },
    ];
    const [selectedFilter, setSelectedFilter] = useState([]);
    const [isPizza, setIsPizza] = useState(false);

    const classes = useStyles();

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        const storageRef = projectStorage.ref(file.name);
        await storageRef.put(file);
        setFileURL(await storageRef.getDownloadURL());
    }

    const handleFilter = (name) => {
        let selected = selectedFilter
        let find = selected.indexOf(name)

        if (find > -1) {
            selected.splice(find, 1)
        } else {
            selected.push(name)
        }

        if (isPizza) {
            setSelectedFilter(selected);
        } else {
            setSelectedFilter([]);
        }


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
            image: fileURL,
            filter: selectedFilter,
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
            <Typography variant="h5" className={classes.subtitle}>
                Vui lòng điền đủ thông tin sản phẩm
            </Typography>
            <Box className={classes.form}>
                <InputLabel>Chọn ảnh</InputLabel>
                <Input
                    type="file"
                    fullWidth
                    onChange={handleUpload}
                    className={classes.input}
                />
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
                {
                    category !== 'Nước uống' &&
                    <TextField
                        label="Mô tả sản phẩm"
                        multiline
                        fullWidth
                        placeholder="Mô tả sản phẩm"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                }

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
                {isPizza &&
                    <FormControl fullWidth>
                        <FormLabel component="legend">Choose filter</FormLabel>
                        <FormGroup>
                            {
                                filter.map(item => {
                                    return (

                                        <FormControlLabel
                                            key={item.name}
                                            control={<Checkbox />}
                                            label={item.name}
                                            value={item.name}
                                            selected={selectedFilter.includes(item.name)}
                                            onChange={() => handleFilter(item.name)}
                                        />
                                    )
                                })
                            }
                        </FormGroup>
                    </FormControl>
                }
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
