import { Logout } from '@mui/icons-material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Avatar, Badge, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Paper, Stack, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import Cookies from "js-cookie";
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setTutorInformation, tutorInfor } from '~/redux/features/tutorSlice';
import PAGES from '~/utils/pages';
import Logo from '../Logo';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { SignalRContext } from '~/Context/SignalRContext';
import services from '~/plugins/services';
import * as signalR from '@microsoft/signalr';
function TutorHeader({ openMenu, setOpenMenu }) {
    dayjs.extend(relativeTime);
    const nav = useNavigate();
    const tutorInfo = useSelector(tutorInfor);
    const [accountMenu, setAccountMenu] = useState();
    const dispatch = useDispatch();
    const openAccountMenu = Boolean(accountMenu);
    const [openNotification, setOpenNotification] = useState(false);
    const { connection } = useContext(SignalRContext);
    const [notifications, setNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const notificationRef = useRef(null);
    const notificationIconRef = useRef(null);
    const [unreadNoti, setUnreadNoti] = useState(0);
    useEffect(() => {
        if (tutorInfo === undefined) {
            nav(PAGES.TUTOR_LOGIN)
        }
        if (tutorInfo) {
            handleGetNotification();
        }
    }, [tutorInfo])

    useEffect(() => {
        if (connection && tutorInfo) {
            const startConnection = async () => {
                if (connection.state !== signalR.HubConnectionState.Disconnected) {
                    await connection.stop();
                }
                try {
                    console.log('Kết nối SignalR thành công!');
                    connection.on(`Notifications-${tutorInfo.id}`, (notification) => {
                        setNotifications((preNotifications) => [notification, ...preNotifications]);
                        setUnreadNoti(pre => pre + 1);
                    });
                } catch (error) {
                    console.error('Kết nối SignalR thất bại:', error.message);
                }
            };

            startConnection();
            return () => {
                if (connection.state !== signalR.HubConnectionState.Disconnected) {
                    connection.stop();
                }
            };
        }
    }, [connection, tutorInfo]);
    const handleGetNotification = async () => {
        try {
            await services.NotificationAPI.getAllPaymentPackage((res) => {
                const filterArr = res.result.result.filter((r, index) => {
                    return index <= 10
                })
                setNotifications([...notifications, ...filterArr]);
                setUnreadNoti(res.result.totalUnRead);
            }, (error) => {
                console.log(error);
            }, {
                pageNumber: notifications.length === 0 ? 1 : 2,
                pageSize: notifications.length <= 10 ? 10 : notifications.length
            })
        } catch (error) {
            console.log(error);
        }
    }
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

    const handleClickOutside = (event) => {
        if (
            notificationRef.current &&
            notificationIconRef.current &&
            !notificationRef.current.contains(event.target) &&
            !notificationIconRef.current.contains(event.target)
        ) {
            setOpenNotification(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleReadOne = async (id) => {
        try {
            await services.NotificationAPI.readAPaymentPackage(id, {}, (res) => {
                const selectedNoti = notifications.find((n) => {
                    return n.id === id;
                })
                selectedNoti.isRead = true;
                setNotifications([...notifications]);
                setUnreadNoti(unreadNoti - 1);
            }, (error) => {
                console.log(error);
            }, {
                pageNumber: currentPage
            })
        } catch (error) {
            console.log(error);
        }
    }
    const handleReadAll = async () => {
        try {
            await services.NotificationAPI.readAllPaymentPackage({}, (res) => {
                notifications.forEach((n) => {
                    n.isRead = true;
                })
                setNotifications([...notifications]);
                setUnreadNoti(0)
            }, (error) => {
                console.log(error);
            }, {
                pageNumber: currentPage
            })
        } catch (error) {
            console.log(error);
        }
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
                    <Box sx={{ position: "relative" }}>
                        <IconButton sx={{ color: "#ff7900" }}
                            onClick={() => setOpenNotification(!openNotification)} ref={notificationIconRef}>
                            <Badge badgeContent={unreadNoti} color="primary">
                                <NotificationsActiveIcon />
                            </Badge>
                        </IconButton>
                        {
                            openNotification && (
                                <Paper variant='elevation' sx={{
                                    position: "absolute", top: "50px",
                                    right: "0px", width: "400px", overflow: 'auto', maxHeight: "70vh", bgcolor: "#f1f1f1"
                                }} ref={notificationRef}>
                                    <Typography variant='h4' p={2}>Thông báo</Typography>
                                    <Button sx={{ p: 2 }} onClick={handleReadAll}>Đánh dấu đọc tất cả</Button>
                                    {
                                        notifications.length !== 0 && notifications.map((n) => {
                                            return (
                                                <Link to={n.urlDetail} key={n.id}>
                                                    <Box sx={{
                                                        display: "flex", alignItems: "center", justifyContent: 'space-between',
                                                        p: 2, cursor: "pointer",
                                                        ":hover": {
                                                            bgcolor: "white"
                                                        }
                                                    }} onClick={() => handleReadOne(n.id)}>
                                                        <Box sx={{ width: "90%" }}>
                                                            <Typography>
                                                                {n.message}
                                                            </Typography>
                                                            <Typography color={"#556cd6"} fontSize={"12px"}>{dayjs(new Date(n.createdDate)).fromNow()}</Typography>
                                                        </Box>
                                                        {
                                                            !n.isRead && (
                                                                <Box sx={{ borderRadius: "50%", width: "15px", height: "15px", bgcolor: "#556cd6" }}>
                                                                </Box>
                                                            )
                                                        }
                                                    </Box>
                                                </Link>
                                            )
                                        })
                                    }
                                    <Box textAlign="center">
                                        <Button onClick={handleGetNotification}>Xem thêm</Button>
                                    </Box>
                                </Paper>
                            )
                        }
                    </Box>
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
        </Box>
    )
}

export default TutorHeader
