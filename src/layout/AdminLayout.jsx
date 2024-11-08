import { Box, Stack } from '@mui/material'
import { Outlet } from 'react-router-dom';
import AdminHeader from '~/components/AdminHeader';
import AdminLeftBar from '~/components/AdminLeftBar';
function AdminLayout() {
    return (
        <Box>
            <AdminHeader />
            <Box marginTop={"65px"} component="main">
                <Stack direction="row" sx={{ bgcolor: "#f5f5f9" }}>
                    <Box width={"17%"} >
                        <AdminLeftBar />
                    </Box>
                    <Box width={"83%"} padding={5}>
                        <Outlet />
                    </Box>
                </Stack>
            </Box >
        </Box >
    )
}

export default AdminLayout
