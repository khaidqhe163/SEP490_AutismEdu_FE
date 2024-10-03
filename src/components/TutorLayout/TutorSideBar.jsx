import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Avatar, Divider, Drawer } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';

export default function TutorSideBar({ openMenu }) {
    const [openStudent, setOpenStudent] = React.useState(true);
    const [openSetting, setOpenSetting] = React.useState(true);

    const textStyle = {
        opacity: openMenu ? 1 : 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        transition: 'opacity 0.3s'
    }

    const listIconStyle = {
        minWidth: openMenu ? '56px' : '40px',
        justifyContent: "center",
        transition: 'min-width 0.3s ease'
    }

    React.useEffect(() => {
        if (!openMenu) {
            setOpenSetting(false);
        }
    }, [openMenu])
    const handleOpenSetting = () => {
        setOpenSetting(!openSetting);
    };
    const handleOpenStudent = () => {
        setOpenStudent(!openStudent);
    };

    return (
        <Drawer variant="permanent" open={openMenu} sx={{
            width: openMenu ? 300 : 80,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: openMenu ? 300 : 80,
                top: 65,
                height: `calc(100vh - 64px)`,
                transition: 'width 0.3s'
            },
        }}>
            <List
                sx={{
                    width: `${openMenu ? "100%" : "76px"}`,
                    maxWidth: 300,
                    height: "calc(100vh - 65px)",
                    bgcolor: 'background.paper'
                }}
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton>
                    <ListItemIcon sx={listIconStyle}>
                        <HomeOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Trang chủ"
                        sx={textStyle}
                    />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon sx={listIconStyle}>
                        <CalendarMonthOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Lịch dạy"
                        sx={textStyle}
                    />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon sx={listIconStyle}>
                        <ContactPageOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Yêu cầu dạy"
                        sx={textStyle}
                    />
                </ListItemButton>
                <Divider />
                <ListItemButton onClick={handleOpenStudent}>
                    <ListItemIcon sx={listIconStyle}>
                        <GroupOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Học sinh" style={textStyle} />
                    {openMenu && (openStudent ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
                <Collapse in={openStudent && openMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton>
                            <ListItemIcon sx={listIconStyle}>
                                <Avatar alt='Khai Dao' src='/' sx={{ background: "black", width: "30px", height: "30px" }} />
                            </ListItemIcon>
                            <ListItemText primary="NGTT - Nguyễn Việt Quân" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <Divider />
                <ListItemButton>
                    <ListItemIcon sx={listIconStyle}>
                        <MenuBookOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Bài tập" style={textStyle} />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon sx={listIconStyle}>
                        <QuizOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Bài kiểm tra" style={textStyle} />
                </ListItemButton>
                <Divider />
                <ListItemButton onClick={handleOpenSetting}>
                    <ListItemIcon sx={listIconStyle}>
                        <SettingsOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cài đặt" style={textStyle} />
                </ListItemButton>
            </List>
        </Drawer>
    );
}