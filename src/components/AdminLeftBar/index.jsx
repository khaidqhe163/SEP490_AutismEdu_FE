import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, SvgIcon, Typography } from '@mui/material'
import TrelloIcon from '~/assets/trello.svg?react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PAGES from '~/utils/pages';
import FeedIcon from '@mui/icons-material/Feed';
import TocIcon from '@mui/icons-material/Toc';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
function AdminLeftBar() {
    const [open, setOpen] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const location = useLocation();
    const handleClick = () => {
        setOpen(!open);
    };
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (location.pathname.includes("/dashboard")) {
            setSelectedIndex(0);
        } else if (location.pathname.includes("/user-management")) {
            setSelectedIndex(1);
        }
        else if (location.pathname.includes("/role-claim-management")) {
            setSelectedIndex(2);
        }
        else if (location.pathname.includes("/payment-package-management")) {
            setSelectedIndex(2);
        }
    }, [])
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <Box sx={{ bgcolor: "white", height: "100%", px: "15px", pt: "20px" }}>
                <List
                    sx={{ width: '100%' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <Link to="/admin/dashboard">
                        <ListItemButton
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </Link>
                    <Link to="/admin/user-management">
                        <ListItemButton
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tài Khoản" />
                        </ListItemButton>
                    </Link>
                    <Link to="/admin/role-claim-management">
                        <ListItemButton
                            selected={selectedIndex === 2}
                            onClick={(event) => handleListItemClick(event, 2)}>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Claims & Roles" />
                        </ListItemButton>
                    </Link>
                    <Link to={PAGES.TUTORREGISTRATIONMANAGEMENT}>
                        <ListItemButton
                            selected={selectedIndex === 3}
                            onClick={(event) => handleListItemClick(event, 3)}>
                            <ListItemIcon>
                                <FeedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Đơn Đăng Ký" />
                        </ListItemButton>
                    </Link>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <AssessmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Đánh giá" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Link to={PAGES.ASSESSMENT_MANAGEMENT}>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}
                                    selected={selectedIndex === 4}
                                    onClick={(event) => handleListItemClick(event, 4)}>
                                    <ListItemIcon>
                                        <TocIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Danh sách" />
                                </ListItemButton>
                            </List>
                        </Link>
                        <Link to={PAGES.ASSESSMENT_CREATION}>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}
                                    selected={selectedIndex === 5}
                                    onClick={(event) => handleListItemClick(event, 5)}>
                                    <ListItemIcon>
                                        <PlaylistAddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Thêm đánh giá" />
                                </ListItemButton>
                            </List>
                        </Link>
                    </Collapse>
                    <ListItemButton onClick={() => setOpenPayment(!openPayment)}>
                        <ListItemIcon>
                            <AttachMoneyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Thanh Toán" />
                        {openPayment ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openPayment} timeout="auto" unmountOnExit>
                        <Link to={PAGES.PAYMENT_PACKAGE_MANAGEMENT}>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}
                                    selected={selectedIndex === 6}
                                    onClick={(event) => handleListItemClick(event, 6)}>
                                    <ListItemIcon>
                                        <PointOfSaleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Gói Thanh Toán" />
                                </ListItemButton>
                            </List>
                        </Link>
                        <Link to={PAGES.ASSESSMENT_CREATION}>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}
                                    selected={selectedIndex === 5}
                                    onClick={(event) => handleListItemClick(event, 5)}>
                                    <ListItemIcon>
                                        <PlaylistAddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Thêm đánh giá" />
                                </ListItemButton>
                            </List>
                        </Link>
                    </Collapse>
                    <ListItemButton onClick={() => setOpenPayment(!openPayment)}>
                        <ListItemIcon>
                            <AttachMoneyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Thanh Toán" />
                        {openPayment ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openPayment} timeout="auto" unmountOnExit>
                        <Link to={PAGES.PAYMENT_PACKAGE_MANAGEMENT}>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}
                                    selected={selectedIndex === 6}
                                    onClick={(event) => handleListItemClick(event, 6)}>
                                    <ListItemIcon>
                                        <PointOfSaleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Gói Thanh Toán" />
                                </ListItemButton>
                            </List>
                        </Link>
                        <Link to={PAGES.ASSESSMENT_CREATION}>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}
                                    selected={selectedIndex === 5}
                                    onClick={(event) => handleListItemClick(event, 5)}>
                                    <ListItemIcon>
                                        <PlaylistAddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Thêm đánh giá" />
                                </ListItemButton>
                            </List>
                        </Link>
                    </Collapse>
                    <ListItemButton onClick={() => setOpenPayment(!openPayment)}>
                        <ListItemIcon>
                            <AttachMoneyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Thanh Toán" />
                        {openPayment ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openPayment} timeout="auto" unmountOnExit>
                        <Link to={PAGES.PAYMENT_PACKAGE_MANAGEMENT}>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}
                                    selected={selectedIndex === 6}
                                    onClick={(event) => handleListItemClick(event, 6)}>
                                    <ListItemIcon>
                                        <PointOfSaleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Gói Thanh Toán" />
                                </ListItemButton>
                            </List>
                        </Link>
                        <Link to={PAGES.ASSESSMENT_CREATION}>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}
                                    selected={selectedIndex === 5}
                                    onClick={(event) => handleListItemClick(event, 5)}>
                                    <ListItemIcon>
                                        <PlaylistAddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Thêm đánh giá" />
                                </ListItemButton>
                            </List>
                        </Link>
                    </Collapse>
                </List>
            </Box>
        </>
    )
}

export default AdminLeftBar
