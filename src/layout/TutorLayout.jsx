import { Box, Divider, IconButton, Stack } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import TutorHeader from '~/components/TutorLayout/TutorHeader';
import TutorSideBar from '~/components/TutorLayout/TutorSideBar';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
function TutorLayout() {
    const [openMenu, setOpenMenu] = useState(true);
    return (
        <Box>
            <TutorHeader setOpenMenu={setOpenMenu} openMenu={openMenu} />
            <Box marginTop={"65px"} component="main">
                <Stack direction="row">
                    <TutorSideBar openMenu={openMenu} />
                    <Outlet />
                </Stack>
            </Box>
            <Box sx={{ position: "fixed", zIndex: 100, bottom: "50px", right: "100px" }}>
                <IconButton sx={{
                    bgcolor: "#b660ec", width: "70px", height: "70px", color: 'white',
                    boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                    ':hover': {
                        bgcolor: "#c992ec"
                    }
                }}>
                    <MessageOutlinedIcon />
                </IconButton>
            </Box>
        </Box >
    )
}

export default TutorLayout
