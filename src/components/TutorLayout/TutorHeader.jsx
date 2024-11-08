import { Logout } from '@mui/icons-material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Avatar, Badge, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import Cookies from "js-cookie";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTutorInformation, tutorInfor } from '~/redux/features/tutorSlice';
import PAGES from '~/utils/pages';
import Logo from '../Logo';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

import RechargeModal from '../PaymentModal/RechargeModal';
function TutorHeader({ openMenu, setOpenMenu }) {
    const nav = useNavigate();
    const tutorInfo = useSelector(tutorInfor);
    const [accountMenu, setAccountMenu] = useState();
    const dispatch = useDispatch();
    const openAccountMenu = Boolean(accountMenu);
    const [openModalPayment, setOpenModalPayment] = useState(false);

    useEffect(() => {
        if (tutorInfo === undefined) {
            nav(PAGES.TUTOR_LOGIN)
        }
    }, [tutorInfo])
    const handleOpenAccountMenu = (event) => {
        setAccountMenu(event.currentTarget);
    };
    const handleCloseAccountMenu = () => {
        setAccountMenu(null);
    };
    const handleOpenMenu = () => {
        setOpenMenu(!openMenu)
    }

    const handleLogout = () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        dispatch(setTutorInformation(null));
        nav(PAGES.TUTOR_LOGIN)
    }

    return (
        <Box sx={{
            position: "fixed",
            top: "0",
            width: "100vw",
            zIndex: 100,
            bgcolor: 'white'
        }}>
            <Stack direction='row' sx={{
                justifyContent: "space-between",
                height: "64px",
                alignItems: "center",
                px: "20px",
            }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <IconButton onClick={handleOpenMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Logo sizeLogo={30} sizeName={25} />
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <IconButton onClick={() => { nav(PAGES.STUDENT_CREATION) }}>
                        <AddOutlinedIcon />
                    </IconButton>
                    <Button startIcon={<KeyboardDoubleArrowUpIcon />} onClick={() => setOpenModalPayment(true)} variant='contained' size='small' sx={{
                        width: "130px", bgcolor: '#16ab65',
                        '&:hover': {
                            bgcolor: '#128a51', 
                        },
                    }}>
                        Nâng cấp
                    </Button>
                    <IconButton>
                        <Badge badgeContent={4} color="primary">
                            <NotificationsActiveIcon />
                        </Badge>
                    </IconButton>
                    
                    <Avatar alt='Khai Dao' src={tutorInfo?.imageUrl ? tutorInfo.imageUrl : '/'} sx={{
                        bgcolor: deepPurple[500], width: "30px",
                        height: "30px",
                        cursor: "pointer"
                    }} onClick={handleOpenAccountMenu} />

                    <Menu
                        anchorEl={accountMenu}
                        id="account-menu"
                        open={openAccountMenu}
                        onClose={handleCloseAccountMenu}
                        onClick={handleCloseAccountMenu}
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Stack>
            <Divider />
            <RechargeModal
                show={openModalPayment}
                handleClose={() => setOpenModalPayment(false)}
            />
        </Box>
    )
}

export default TutorHeader
