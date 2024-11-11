import { Box, Breadcrumbs, Button, Card, CardActions, CardContent, CardMedia, Divider, FormControl, IconButton, InputAdornment, InputBase, InputLabel, OutlinedInput, Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import PAGES from '~/utils/pages';
function Blog() {
    const nav = useNavigate();
    return (
        <Box>
            <Box sx={{
                background: `linear-gradient(to bottom, #f4f4f6, transparent),linear-gradient(to right, #4468f1, #c079ea)`,
                transition: 'height 0.5s ease',
                paddingX: "140px",
                pt: "50px",
                pb: "10px",
                height: "500px"
            }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 5 }}>
                    <Link underline="hover" color="inherit" href="/">
                        Trang chủ
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>Danh sách blog</Typography>
                </Breadcrumbs>
                <Typography variant='h2' mt={5}>Blog</Typography>
            </Box >
            <Stack direction='row' sx={{ width: "80%", margin: "auto", position: "relative", top: "-200px" }} justifyContent="space-between">
                <Box sx={{ width: '60%' }}>
                    <Card sx={{
                        height: "700px",
                        paddingBottom: '20px',
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        '&:hover': {
                            transform: "scale(1.02) translateY(-10px)",
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                            cursor: "pointer"
                        }
                    }}>
                        <CardMedia
                            component="img"
                            sx={{ height: "70%" }}
                            image="https://rainbowthemes.net/themes/histudy/wp-content/uploads/2023/12/girl-looking-laptop-1.webp"
                            alt="Live from space album cover"
                        />
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h4">
                                Difficult Things About Education.
                            </Typography>
                            <Stack direction='row' mt={2} gap={2}>
                                <AccessTimeIcon /> <Typography>20-02-2025</Typography>
                            </Stack>
                        </CardContent>
                        <CardActions>
                            <Button sx={{ fontSize: "20px" }} endIcon={<ArrowForwardIcon />}
                                onClick={() => nav(PAGES.ROOT + PAGES.BLOG_LIST + "/1")}
                            >Tìm hiểu thêm </Button>
                        </CardActions>
                    </Card>
                    <Card sx={{
                        display: 'flex', height: "200px",
                        mt: 5,
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        '&:hover': {
                            cursor: "pointer",
                            transform: "scale(1.02) translateY(-10px)",
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"
                        }
                    }}>
                        <CardMedia
                            component="img"
                            sx={{ width: "40%" }}
                            image="https://rainbowthemes.net/themes/histudy/wp-content/uploads/2023/12/image-1-1-150x150.webp"
                            alt="Live from space album cover"
                        />
                        <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
                            <CardContent>
                                <Typography component="div" variant="h5">
                                    Live From Space
                                </Typography>
                                <Button sx={{ fontSize: "20px" }} endIcon={<ArrowForwardIcon />}>Tìm hiểu thêm </Button>
                            </CardContent>
                        </Box>
                    </Card>
                </Box>
                <Box sx={{
                    border: "5px solid #c09de8", width: "30%",
                    backgroundColor: "white", borderRadius: "5px",
                    p: 2,
                    alignSelf: 'flex-start'
                }}>
                    <FormControl sx={{ width: '100%' }} variant="outlined">
                        <OutlinedInput
                            placeholder='Tìm kiếm ...'
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Typography variant='h5' mt={5}>Bài viết gần đây</Typography>
                    <Divider sx={{ width: "100%", mt: 2, backgroundColor: "gray" }} />
                    <Stack direction='row' gap={2} sx={{ cursor: "pointer", mt: 2 }}>
                        <Box sx={{
                            backgroundImage: "url('https://rainbowthemes.net/themes/histudy/wp-content/uploads/2023/12/girl-looking-laptop-1.webp')",
                            width: "70px",
                            height: "70px",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: "10px"
                        }}>
                        </Box>
                        <Box sx={{ width: "70%" }}>
                            <Typography sx={{
                                fontSize: "16px", display: '-webkit-box',
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
                                Understand The Background Of lms.dddddddddddddddddddđ
                            </Typography>
                            <Stack direction='row' mt={1} gap={2} alignItems="center" >
                                <AccessTimeIcon sx={{ fontSize: "15px" }} /> <Typography sx={{ fontSize: "12px" }}>20-02-2025</Typography>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default Blog
