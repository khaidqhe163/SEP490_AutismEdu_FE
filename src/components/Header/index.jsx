import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Logout from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonAdd from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import Settings from '@mui/icons-material/Settings';
import { Avatar, Badge, Box, Button, Divider, IconButton, InputAdornment, InputBase, ListItemIcon, Menu, MenuItem, Stack, Tab, Tabs, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setUserInformation, userInfor } from '~/redux/features/userSlice';
import PAGES from '~/utils/pages';
import ButtonComponent from '../ButtonComponent';
import Logo from '../Logo';
import NavigationMobile from './NavigationMobile';
import Cookies from 'js-cookie';
function Header() {
    const [tab, setTab] = useState("1");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [accountMenu, setAccountMenu] = React.useState(null);
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const nav = useNavigate();
    const userInfo = useSelector(userInfor);

    const openAccountMenu = Boolean(accountMenu);
    const [searchVal, setSearchVal] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();

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
        else if (location.pathname.includes("/test")) {
            setTab("5");
        }
    }, [location])
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

    const open1 = Boolean(anchorEl1);
    const handleClickListItem1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleMenuItemClick1 = (event, link) => {
        nav(link)
        setAnchorEl1(null);
    };

    const handleClose1 = () => {
        setAnchorEl1(null);
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
                <Tab sx={{ fontSize: "18px" }} value={"3"} label="Thông tin trẻ" onClick={() => { nav(PAGES.ROOT + PAGES.MY_CHILDREN) }} />
                <Tab sx={{ fontSize: "18px" }} value={"4"} label="Blog" />
                {/* <Tab sx={{ fontSize: "18px" }} value={"5"} label="Kiểm tra" onClick={() => { nav(PAGES.ROOT + PAGES.TEST) }} /> */}
                {userInfo && <Tab sx={{ fontSize: "18px" }} value={"5"} label="Kiểm tra" icon={<ExpandMoreIcon />} iconPosition="end" onClick={handleClickListItem1} />}

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
                <MenuItem onClick={(event) => handleMenuItemClick(event, PAGES.ROOT + PAGES.MY_TUTOR)}>
                    Gia sư của tôi
                </MenuItem>
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

            <Menu
                id="lock-menu"
                anchorEl={anchorEl1}
                open={open1}
                onClose={handleClose1}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
            >
                {/* <MenuItem onClick={(event) => handleMenuItemClick(event, PAGES.ROOT + PAGES.MY_TUTOR)}>
                    Gia sư của tôi
                </MenuItem> */}
                <MenuItem
                    onClick={(event) => handleMenuItemClick1(event, PAGES.ROOT + PAGES.TEST)}
                >
                    Danh sách bài kiểm tra
                </MenuItem>
                {(<MenuItem
                    onClick={(event) => handleMenuItemClick1(event, PAGES.ROOT + PAGES.TEST_HISTORY)}
                >
                    Lịch sử bài kiểm tra
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
                        <IconButton>
                            <Badge badgeContent={4} color="primary">
                                <NotificationsActiveIcon />
                            </Badge>
                        </IconButton>
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
