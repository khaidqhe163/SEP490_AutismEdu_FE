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
import QuizIcon from '@mui/icons-material/Quiz';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useSelector } from 'react-redux';
import { adminInfor } from '~/redux/features/adminSlice';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SortIcon from '@mui/icons-material/Sort';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ReportIcon from '@mui/icons-material/Report';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function AdminLeftBar() {
    const [open, setOpen] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const [openArtical, setOpenArtical] = useState(false);
    const [openInformation, setOpenInformation] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const location = useLocation();
    const adminInformation = useSelector(adminInfor);
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
        else if (location.pathname.includes("/assessment_score_range")) {
            setSelectedIndex(2);
        } else if (location.pathname.includes("/test-management")) {
            setSelectedIndex(8);
        } else if (location.pathname.includes("/exercise-type-management")) {
            setSelectedIndex(13);
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
                    <Link to="/admin/test-management">
                        <ListItemButton
                            selected={selectedIndex === 8}
                            onClick={(event) => handleListItemClick(event, 8)}>
                            <ListItemIcon>
                                <QuizIcon />
                            </ListItemIcon>
                            <ListItemText primary="Bài kiểm tra" />
                        </ListItemButton>
                    </Link>
                    <Link to="/admin/exercise-type-management">
                        <ListItemButton
                            selected={selectedIndex === 13}
                            onClick={(event) => handleListItemClick(event, 13)}>
                            <ListItemIcon>
                                <MenuBookIcon />
                            </ListItemIcon>
                            <ListItemText primary="Loại bài tập" />
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

                        <Link to={PAGES.SCORE_RANGE}>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}
                                    selected={selectedIndex === 7}
                                    onClick={(event) => handleListItemClick(event, 7)}>
                                    <ListItemIcon>
                                        <AssignmentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Đánh giá chung" />
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
                    <Collapse
                        in={openPayment} timeout="auto" unmountOnExit>
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
                                    <ListItemText primary="Lịch sử thanh toán" />
                                </ListItemButton>
                            </List>
                        </Link>
                    </Collapse>
                    <ListItemButton onClick={() => setOpenArtical(!openArtical)}>
                        <ListItemIcon>
                            <NewspaperIcon />
                        </ListItemIcon>
                        <ListItemText primary="Bài viết" />
                        {openArtical ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openArtical} timeout="auto" unmountOnExit>
                        <Link to={PAGES.BLOG_MANAGEMENT}>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}
                                    selected={selectedIndex === 6}
                                    onClick={(event) => handleListItemClick(event, 6)}>
                                    <ListItemIcon>
                                        <SortIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Danh sách bài viết" />
                                </ListItemButton>
                            </List>
                        </Link>
                        <Link to={PAGES.BLOG_CREATION}>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}
                                    selected={selectedIndex === 5}
                                    onClick={(event) => handleListItemClick(event, 5)}>
                                    <ListItemIcon>
                                        <PostAddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Tạo bài viết" />
                                </ListItemButton>
                            </List>
                        </Link>
                    </Collapse>
                    <ListItemButton onClick={() => setOpenReport(!openReport)}>
                        <ListItemIcon>
                            <ReportIcon />
                        </ListItemIcon>
                        <ListItemText primary="Đơn tố cáo" />
                        {openReport ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openReport} timeout="auto" unmountOnExit>
                        <Link to={PAGES.REPORT_TUTOR_MANAGEMENT}>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}
                                    selected={selectedIndex === 6}
                                    onClick={(event) => handleListItemClick(event, 6)}>
                                    <ListItemText primary="Tố cáo gia sư" />
                                </ListItemButton>
                            </List>
                        </Link>
                        <Link to={PAGES.BLOG_CREATION}>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}
                                    selected={selectedIndex === 5}
                                    onClick={(event) => handleListItemClick(event, 5)}>
                                    <ListItemText primary="Tố cáo đánh giá" />
                                </ListItemButton>
                            </List>
                        </Link>
                    </Collapse>
                    <ListItemButton onClick={() => setOpenInformation(!openInformation)}>
                        <ListItemIcon>
                            <PermContactCalendarIcon />
                        </ListItemIcon>
                        <ListItemText primary="Thông tin cá nhân" />
                        {openInformation ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openInformation} timeout="auto" unmountOnExit>
                        <Link to={PAGES.PERSONAL_INFORMATION}>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}
                                    selected={selectedIndex === 9}
                                    onClick={(event) => handleListItemClick(event, 9)}>
                                    <ListItemIcon>
                                        <SortIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Cập nhật thông tin" />
                                </ListItemButton>
                            </List>
                        </Link>
                        <Link to={PAGES.CERTIFICATE_MANAGEMENT}>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}
                                    selected={selectedIndex === 10}
                                    onClick={(event) => handleListItemClick(event, 10)}>
                                    <ListItemIcon>
                                        <PostAddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Chứng chỉ" />
                                </ListItemButton>
                            </List>
                        </Link>
                        <Link to={PAGES.CURRICULUM_MANAGEMENT}>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}
                                    selected={selectedIndex === 11}
                                    onClick={(event) => handleListItemClick(event, 11)}>
                                    <ListItemIcon>
                                        <PostAddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Khung chương trình" />
                                </ListItemButton>
                            </List>
                        </Link>
                        <Link to={PAGES.WORK_EXPERIENCE_MANAGEMENT}>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}
                                    selected={selectedIndex === 12}
                                    onClick={(event) => handleListItemClick(event, 12)}>
                                    <ListItemIcon>
                                        <PostAddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Kinh nghiệm làm việc" />
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
