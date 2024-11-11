import { Box, Breadcrumbs, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import PAGES from '~/utils/pages'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
function BlogDetail() {
    return (
        <Box>
            <Box sx={{
                background: `linear-gradient(to bottom, #f4f4f6, transparent),linear-gradient(to right, #4468f1, #c079ea)`,
                transition: 'height 0.5s ease',
                paddingX: "140px",
                pt: "50px",
                pb: "10px",
                height: "300px"
            }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 5 }}>
                    <Link underline="hover" color="inherit" href="/">
                        Trang chủ
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        to={PAGES.ROOT + PAGES.BLOG_LIST}
                    >
                        Danh sách blog
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>Bài viết</Typography>
                </Breadcrumbs>
            </Box >
            <Paper variant='elevation' sx={{
                width: "70%", position: "relative", top: "-100px", margin: "auto",
                py: "70px", px: 2
            }}>
                <Typography sx={{ textAlign: "center" }} variant='h4'>Bộ trưởng Y tế: Có cán bộ chưa dám nghĩ, dám làm trong đấu thầu thuốc</Typography>
                <Stack direction='row' mt={2} gap={2} justifyContent="center">
                    <AccessTimeIcon /> <Typography>20-02-2025</Typography>
                </Stack>
                <img src='https://cdnphoto.dantri.com.vn/2hjdwA-daDVJ6wjV1ziw00UFwYw=/zoom/1692_1128/2024/11/11/009d8c3cab5d1003494c-1731313407357.jpg'
                    style={{ width: "100%", marginTop: "30px" }} />
            </Paper>
        </Box>
    )
}

export default BlogDetail
