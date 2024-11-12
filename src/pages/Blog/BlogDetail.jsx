import { Box, Breadcrumbs, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PAGES from '~/utils/pages'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import services from '~/plugins/services';
import { enqueueSnackbar } from 'notistack';
import LoadingComponent from '~/components/LoadingComponent';
import '~/assets/css/texteditor.css';
function BlogDetail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState(null);
    useEffect(() => {
        handleGetBlog();
    }, [])

    const handleGetBlog = async () => {
        try {
            setLoading(true);
            await services.BlogAPI.getBlogDetail(id, (res) => {
                setBlog(res.result)
            }, (err) => {
                console.log(err);
            })
            setLoading(false);
        } catch (error) {
            enqueueSnackbar("Lỗi hệ thống", { variant: "error" });
            setLoading(false);
        }
    }
    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
    }
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
                <Typography sx={{ textAlign: "center" }} variant='h4'>{blog?.title}</Typography>
                <Stack direction='row' mt={2} gap={2} justifyContent="center">
                    <AccessTimeIcon /> <Typography>{formatDate(blog?.publishDate)}</Typography>
                </Stack>
                <img src={blog?.urlImageDisplay}
                    style={{ width: "100%", marginTop: "30px" }} />
                <Box sx={{ mt: 5 }} dangerouslySetInnerHTML={{ __html: blog?.content }} />
            </Paper>
            <LoadingComponent open={loading} />
        </Box>
    )
}

export default BlogDetail
