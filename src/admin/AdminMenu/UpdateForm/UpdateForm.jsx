import { Modal, Box, TextField, Button, Input, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useStyles } from './styles';

import { useState, useEffect } from 'react';

import { projectFirestore } from '../../../firebase/config';

function UpdateForm({open, documents, setOpen}) {
    const classes = useStyles();
    const {
        id,
        name,
        category,
        type,
        description,
        priceSmall,
        priceMedium,
        priceBig
    } = documents;
    const [newName, setNewName] = useState(name);
    const [newCategory, setNewCategory] = useState(category);
    const [newType, setNewType] = useState(type);
    const [newDescription, setNewDescription] = useState(description);
    const [newPriceSmall, setNewPriceSmall] = useState(priceSmall);
    const [newPriceMedium, setNewPriceMedium] = useState(priceMedium);
    const [newPriceBig, setNewPriceBig] = useState(priceBig);

    const [isPizza, setIsPizza] = useState(true);

    const handleCategory = (event) => {
        setNewCategory(event.target.value);
        if (event.target.value === 'Pizza') {
            setIsPizza(true);
        } else {
            setIsPizza(false);
            setNewType(event.target.value);
        }
    }

    useEffect(() => {
        setNewName(name);
        setNewCategory(category);
        setNewType(type);
        setNewDescription(description);
        setNewPriceSmall(priceSmall);
        setNewPriceMedium(priceMedium);
        setNewPriceBig(priceBig);
    }, [name, category, type, description, priceSmall, priceMedium, priceBig])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit');
        projectFirestore.collection('menu').doc(id).set({
            ...documents,
            name: newName,
            category: newCategory,
            type: newType,
            description: newDescription,
            priceSmall: newPriceSmall,
            priceMedium: newPriceMedium,
            priceBig: newPriceBig
        })
        setOpen(false);
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                {documents &&
                    <Box className={classes.box}>
                        <TextField
                            label="Tên sản phẩm"
                            fullWidth
                            value={newName}
                            onChange={(event) => setNewName(event.target.value)}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={newCategory}
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
                                        value={newType}
                                        onChange={(event) => setNewType(event.target.value)}
                                    >
                                        <MenuItem value="premium">Premium</MenuItem>
                                        <MenuItem value="favorite">Favorite</MenuItem>
                                        <MenuItem value="signature">Signature</MenuItem>
                                    </Select>
                                }
                            </FormControl>
                        }
                        <TextField
                            label="Mô tả sản phẩm"
                            fullWidth
                            value={newDescription}
                            onChange={(event) => setNewDescription(event.target.value)}
                            multiline
                        />
                        <Input
                            type="number"
                            fullWidth
                            placeholder="Price small"
                            className={classes.input}
                            value={newPriceSmall}
                            onChange={(event) => setNewPriceSmall(event.target.value)}
                        />
                        <Input
                            type="number"
                            fullWidth
                            placeholder="Price medium"
                            className={classes.input}
                            value={newPriceMedium}
                            onChange={(event) => setNewPriceMedium(event.target.value)}
                        />
                        <Input
                            type="number"
                            fullWidth
                            placeholder="Price big"
                            className={classes.input}
                            value={newPriceBig}
                            onChange={(event) => setNewPriceBig(event.target.value)}
                        />
                        <Button
                            className={classes.btn}
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Edit
                        </Button>
                    </Box>
                }
            </Modal>
        </div>
    )
}

export default UpdateForm
