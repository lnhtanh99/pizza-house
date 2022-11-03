import { useStyles } from './styles';
import { AppBar, Toolbar, Link as MaterialLink, Box, Menu, MenuItem } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { useState } from 'react'

function MiniNav({ cartOpen }) {
    const classes = useStyles();
    const categories = ['Pizza', 'Mì Ý', 'Món phụ', 'Tráng miệng', 'Nước uống'];
    const orders = [
        {
            name: 'Dine in',
            action: 'dine-in',
        },
        {
            name: 'Đơn vận chuyển',
            action: 'deliveries',
        },
    ];
    const items = [
        {
            name: 'Danh mục sản phẩm',
            action: 'menu'
        },
        {
            name: 'Thêm món',
            action: 'add-menu'
        },
    ]
    const members = [
        {
            name: 'Quản lý nhân viên',
            action: 'staff'
        },
        {
            name: 'Quản lý người dùng',
            action: 'users'
        }
    ]


    const [anchorElFirst, setAnchorElFirst] = useState(null);
    const [anchorElSecond, setAnchorElSecond] = useState(null);
    const [anchorElThird, setAnchorElThird] = useState(null);

    const openFirst = Boolean(anchorElFirst);
    const openSecond = Boolean(anchorElSecond);
    const openThird = Boolean(anchorElThird);

    return (
        <Box>
            <AppBar
                elevation={0}
                className={classes.root}
                position="static"
            >
                <Toolbar className={cartOpen ? classes.cartOpen : classes.cartClose}>
                    <>
                        {(localStorage.getItem('checkRole') === 'user' || (localStorage.getItem('checkRole') === 'null')) ?
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
                            :
                            <>
                                <MaterialLink
                                    onClick={(event) => setAnchorElFirst(event.currentTarget)}
                                    underline="none"
                                    color="inherit"
                                    className={classes.links}
                                >
                                    Đơn hàng
                                </MaterialLink>
                                <Menu
                                    anchorEl={anchorElFirst}
                                    open={openFirst}
                                    onClose={() => setAnchorElFirst(null)}
                                >
                                    {
                                        orders && orders.map((order, index) => (
                                            <MenuItem
                                                key={index}
                                            >
                                                <MaterialLink
                                                    underline="none"
                                                    color="inherit"
                                                    component={RouterLink} to={`/admin/${order.action}`}
                                                    className={classes.links}
                                                    onClick={() => setAnchorElFirst(null)}
                                                >
                                                    {order.name}
                                                </MaterialLink>
                                            </MenuItem>
                                        ))
                                    }
                                </Menu>
                                {localStorage.getItem('checkRole') === 'admin' &&
                                    <>
                                        <MaterialLink
                                            onClick={(event) => setAnchorElSecond(event.currentTarget)}
                                            underline="none"
                                            color="inherit"
                                            className={classes.links}
                                        >
                                            Menu
                                        </MaterialLink>
                                        <Menu
                                            anchorEl={anchorElSecond}
                                            open={openSecond}
                                            onClose={() => setAnchorElSecond(null)}
                                        >
                                            {
                                                items && items.map((item, index) => (
                                                    <MenuItem
                                                        key={index}
                                                    >
                                                        <MaterialLink
                                                            underline="none"
                                                            color="inherit"

                                                            component={RouterLink} to={`/admin/${item.action}`}
                                                            className={classes.links}
                                                            onClick={() => setAnchorElSecond(null)}
                                                        >
                                                            {item.name}
                                                        </MaterialLink>
                                                    </MenuItem>
                                                ))
                                            }
                                        </Menu>
                                        <MaterialLink
                                            onClick={(event) => setAnchorElThird(event.currentTarget)}
                                            underline="none"
                                            color="inherit"
                                            className={classes.links}
                                        >
                                           Thành viên
                                        </MaterialLink>
                                        <Menu
                                            anchorEl={anchorElThird}
                                            open={openThird}
                                            onClose={() => setAnchorElThird(null)}
                                        >
                                            {
                                                members && members.map((member, index) => (
                                                    <MenuItem
                                                        key={index}
                                                    >
                                                        <MaterialLink
                                                            underline="none"
                                                            color="inherit"
                                                            component={RouterLink} to={`/admin/${member.action}`}
                                                            className={classes.links}
                                                            onClick={() => setAnchorElThird(null)}
                                                        >
                                                            {member.name}
                                                        </MaterialLink>
                                                    </MenuItem>
                                                ))
                                            }
                                        </Menu>
                                        <MaterialLink
                                            underline="none"
                                            color="inherit"
                                            component={RouterLink} to={`/admin/role-change`}
                                            className={classes.links}
                                        >
                                            Phân quyền
                                        </MaterialLink>
                                    </>
                                }

                                <MaterialLink
                                    underline="none"
                                    color="inherit"
                                    component={RouterLink} to={`/admin/total`}
                                    className={classes.links}
                                >
                                    Doanh thu
                                </MaterialLink>
                                <MaterialLink
                                    underline="none"
                                    color="inherit"
                                    component={RouterLink} to={`/admin/seat`}
                                    className={classes.links}
                                >
                                    Chỗ ngồi
                                </MaterialLink>
                            </>
                        }
                    </>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default MiniNav
