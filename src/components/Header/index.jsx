import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Logout from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonAdd from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import Settings from '@mui/icons-material/Settings';
import { Avatar, Badge, Box, Button, Divider, IconButton, InputAdornment, InputBase, ListItemIcon, Menu, MenuItem, Paper, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setUserInformation, userInfor } from '~/redux/features/userSlice';
import PAGES from '~/utils/pages';
import ButtonComponent from '../ButtonComponent';
import Logo from '../Logo';
import NavigationMobile from './NavigationMobile';
import Cookies from 'js-cookie';
import { SignalRContext } from '~/Context/SignalRContext';
import services from '~/plugins/services';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
function Header() {
    const [tab, setTab] = useState("1");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [accountMenu, setAccountMenu] = React.useState(null);
    const nav = useNavigate();
    const userInfo = useSelector(userInfor);

    const openAccountMenu = Boolean(accountMenu);
    const [searchVal, setSearchVal] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();
    const [openNotification, setOpenNotification] = useState(false);
    const { connection } = useContext(SignalRContext);
    const [notifications, setNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const notificationRef = useRef(null);
    const notificationIconRef = useRef(null);
    const [unreadNoti, setUnreadNoti] = useState(0);
    dayjs.extend(relativeTime);
    useEffect(() => {
        if (location.pathname === "/autismedu") {
            setTab("1");
        } else if (location.pathname.includes("/list-tutor")) {
            setTab("2");
        } else if (location.pathname.includes("/my-tutor")) {
            setTab("2");
        } else if (location.pathname.includes("/request-history")) {
            setTab("2");
        }
        else if (location.pathname.includes("/my-childlren")) {
            setTab("3");
        }
        else if (location.pathname.includes("/list-blogs")) {
            setTab("3");
        }
    }, [location])

    useEffect(() => {
        if (userInfo === undefined) {
            nav(PAGES.ROOT)
        }
        if (userInfo) {
            handleGetNotification();
        }
    }, [userInfo])

    useEffect(() => {
        if (connection && userInfo) {
            connection
                .start()
                .then(() => {
                    console.log('Kết nối SignalR thành công!');

                    connection.on(`Notifications-${userInfo.id}`, (notification) => {
                        console.log(notification);
                        setNotifications((preNotifications) => [notification, ...preNotifications]);
                    });
                })
                .catch((error) => console.error('Kết nối SignalR thất bại:', error));
            return () => {
                connection.stop();
            };
        }
    }, [connection, userInfo]);
    const handleGetNotification = async () => {
        try {
            await services.NotificationAPI.getAllPaymentPackage((res) => {
                setNotifications(res.result.result);
                setUnreadNoti(res.result.totalUnRead)
            }, (error) => {
                console.log(error);
            }, {
                pageNumber: currentPage
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

    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, link) => {
        nav(link)
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        dispatch(setUserInformation(null))
        nav(PAGES.ROOT)
    };

    const handleSearch = () => {
        nav('/autismedu/list-tutor', { state: { searchVal } });
        setSearchVal('');
    };
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
                setUnreadNoti(unreadNoti - 1)
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
        <Stack
            direction="row"
            spacing={3}
            sx={{
                justifyContent: "space-between", alignItems: "center", position: "fixed", top: "0px",
                height: "80px", width: "100vw", px: "20px",
                zIndex: "10",
                bgcolor: "white",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            }}>
            <Logo sizeLogo="50px" sizeName="35px" />
            <Tabs value={tab} sx={{
                display: {
                    lg: "block",
                    xs: "none"
                }
            }}>
                <Tab sx={{ fontSize: "18px" }} value={"1"} label="Trang chủ" onClick={() => { nav(PAGES.ROOT) }} />
                <Tab sx={{ fontSize: "18px" }} value={"2"} label="Gia sư" icon={<ExpandMoreIcon />} iconPosition="end" onClick={handleClickListItem} />
                {
                    userInfo && (
                        <Tab sx={{ fontSize: "18px" }} value={"3"} label="Thông tin trẻ" onClick={() => { nav(PAGES.ROOT + PAGES.MY_CHILDREN) }} />
                    )
                }
                <Tab sx={{ fontSize: "18px" }} value={"4"} label="Blog" onClick={() => { nav(PAGES.ROOT + PAGES.BLOG_LIST) }} />
            </Tabs>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
            >
                {
                    userInfo && (
                        <MenuItem onClick={(event) => handleMenuItemClick(event, PAGES.ROOT + PAGES.MY_TUTOR)}>
                            Gia sư của tôi
                        </MenuItem>
                    )
                }
                <MenuItem
                    onClick={(event) => handleMenuItemClick(event, PAGES.ROOT + PAGES.LISTTUTOR)}
                >
                    Danh sách gia sư
                </MenuItem>
                {userInfo && (<MenuItem
                    onClick={(event) => handleMenuItemClick(event, PAGES.ROOT + PAGES.TUTOR_REQUEST_HISTORY)}
                >
                    Lịch sử yêu cầu
                </MenuItem>)}
            </Menu>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={2}>
                <TextField
                    variant="outlined"
                    placeholder="Hãy tên gia sư mà bạn muốn tìm..."
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleSearch}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: {
                            width: '350px',
                            height: '45px',
                            borderRadius: '999px',
                            backgroundColor: '#fff',
                        },
                    }}
                />

                {
                    userInfo && (
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
                                            <Button>Xem thêm</Button>
                                        </Box>
                                    </Paper>
                                )
                            }
                        </Box>
                    )
                }
                {
                    !userInfo ? (
                        <>
                            <Box sx={{
                                display: {
                                    xs: "none",
                                    lg: "block",
                                }
                            }}>
                                <Link to={PAGES.ROOT + PAGES.LOGIN_OPTION}><ButtonComponent text="Đăng nhập" height="40px" /></Link>
                            </Box>
                            <Link to={PAGES.ROOT + PAGES.REGISTER_OPTION}><Button variant='outlined' sx={{
                                display: {
                                    xs: "none",
                                    lg: "block"
                                },
                                width: '100px',
                                height: "40px"
                            }}>Đăng ký</Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Avatar alt="Remy Sharp" src={userInfo.imageUrl}
                                onClick={handleOpenAccountMenu} sx={{ cursor: "pointer" }} />
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
                                <MenuItem onClick={() => { handleCloseAccountMenu; nav(PAGES.ROOT + PAGES.PARENT_PROFILE) }}>
                                    <Avatar src={userInfo.imageUrl} alt={userInfo.fullName} /> Thông tin cá nhân
                                </MenuItem>
                                <Divider />
                                {
                                    userInfo.userType === "ApplicationUser" && (
                                        <MenuItem onClick={() => { handleCloseAccountMenu; nav(PAGES.ROOT + PAGES.CHANGE_PASSWORD) }}>
                                            <ListItemIcon>
                                                <Settings fontSize="small" />
                                            </ListItemIcon>
                                            Đổi mật khẩu
                                        </MenuItem>
                                    )
                                }
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Đăng xuất
                                </MenuItem>
                            </Menu>
                        </>
                    )
                }
                <NavigationMobile />
            </Stack>
        </Stack>
    )
}

export default Header
