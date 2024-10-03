import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Avatar, Badge, Box, Divider, IconButton, Stack } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import Logo from '../Logo';
function TutorHeader({ openMenu, setOpenMenu }) {
    const handleOpenMenu = () => {
        setOpenMenu(!openMenu)
    }
    return (
        <Box sx={{
            position: "fixed",
            top: "0",
            width: "100vw"
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
                    <IconButton>
                        <AddOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <Badge badgeContent={4} color="primary">
                            <NotificationsActiveIcon />
                        </Badge>
                    </IconButton>
                    <Avatar alt='Khai Dao' src='/' sx={{
                        bgcolor: deepPurple[500], width: "30px",
                        height: "30px"
                    }} />
                </Box>
            </Stack>
            <Divider />
        </Box>
    )
}

export default TutorHeader
