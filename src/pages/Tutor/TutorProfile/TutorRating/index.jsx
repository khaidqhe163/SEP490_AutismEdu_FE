import { Avatar, Box, Button, DialogActions, IconButton, Menu, MenuItem, Pagination, Rating, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingComponent from '~/components/LoadingComponent';
import DeleteConfirmationModal from './RatingModal/DeleteConfirmationModal';
function TutorRating({ tutorId, userInfo }) {
    const [idDelete, setIdDelete] = useState(-1);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [reviewContent, setReviewContent] = useState("Day.js is a minimalist JavaScript library that parses, validates, manipulates, and displays dates and times for modern browsers with a largely Moment.js-compatible API. If you use Moment.js, you already know how to use Day.js.");
    const [rating, setRating] = useState(4);
    const [tempRating, setTempRating] = useState(rating);
    const [tempContent, setTempContent] = useState(reviewContent);
    const [pagination, setPagination] = React.useState({
        pageNumber: 1,
        pageSize: 10,
        total: 10,
    });
    const [ratingData, setRatingData] = useState({
        rateScore: 0,
        description: '',
        tutorId: tutorId
    });
    const [anchorEl, setAnchorEl] = useState(null);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        handleCloseMenu();
    };

    const handleSaveEdit = () => {
        setReviewContent(tempContent);
        setRating(tempRating);
        setIsEditing(false);
    };

    const handleClickOpen = (id) => {
        setIdDelete(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setIsSaveDisabled(tempRating === rating && tempContent === reviewContent);
    }, [tempRating, tempContent, rating, reviewContent]);

    const handlePageChange = (event, value) => {
        setPagination({ ...pagination, pageNumber: value });
    };

    const totalPages = Math.ceil(pagination.total / pagination.pageSize);

    dayjs.extend(relativeTime);
    return (
        <Box sx={{ width: "100%" }}>
            <Stack direction='row' gap={3}>
                <Box sx={{ bgcolor: "#e4e9fd", px: 2, py: 3, width: "40%", borderRadius: "5px" }}>
                    <Typography variant='h6'>Đánh giá trung bình về gia sư</Typography>
                    <Typography><b style={{ fontWeight: "black", fontSize: '30px' }}>4.3</b>/5
                        <Rating name="half-rating-read" defaultValue={4.7} precision={0.1} readOnly />
                    </Typography>
                    <small>3 lượt đánh giá</small>
                </Box>
                <Box sx={{ width: "60%" }}>
                    <Typography variant='h6'>Phân tích đánh giá</Typography>
                    <Stack direction='row' sx={{ alignItems: "center", gap: 1, width: "100%" }}>
                        <Typography sx={{ width: "2%" }}>5</Typography>
                        <StarIcon />
                        <Box sx={{ height: "15px", width: "60%", bgcolor: '#5cb85c', borderRadius: "10px" }}>
                        </Box>
                        <Typography>5</Typography>
                    </Stack>
                    <Stack direction='row' sx={{ alignItems: "center", gap: 1, width: "100%" }}>
                        <Typography sx={{ width: "2%" }}>4</Typography>
                        <StarIcon />
                        <Box sx={{ height: "15px", width: "60%", borderRadius: "10px", overflow: "hidden", boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset" }}>
                            <Box sx={{ bgcolor: "#428bca", width: "80%", height: "15px" }}></Box>
                        </Box>
                        <Typography>5</Typography>
                    </Stack>
                    <Stack direction='row' sx={{ alignItems: "center", gap: 1, width: "100%" }}>
                        <Typography sx={{ width: "2%" }}>3</Typography>
                        <StarIcon />
                        <Box sx={{ height: "15px", width: "60%", borderRadius: "10px", overflow: "hidden", boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset" }}>
                            <Box sx={{ bgcolor: "#5bc0de", width: "60%", height: "15px" }}></Box>
                        </Box>
                        <Typography>5</Typography>
                    </Stack>
                    <Stack direction='row' sx={{ alignItems: "center", gap: 1, width: "100%" }}>
                        <Typography sx={{ width: "2%" }}>2</Typography>
                        <StarIcon />
                        <Box sx={{ height: "15px", width: "60%", borderRadius: "10px", overflow: "hidden", boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset" }}>
                            <Box sx={{ bgcolor: "#f0ad4e", width: "40%", height: "15px" }}></Box>
                        </Box>
                        <Typography>5</Typography>
                    </Stack>
                    <Stack direction='row' sx={{ alignItems: "center", gap: 1, width: "100%" }}>
                        <Typography sx={{ width: "2%" }}>1</Typography>
                        <StarIcon />
                        <Box sx={{ height: "15px", width: "60%", borderRadius: "10px", overflow: "hidden", boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset" }}>
                            <Box sx={{ bgcolor: "#d9534f", width: "20%", height: "15px" }}></Box>
                        </Box>
                        <Typography>5</Typography>
                    </Stack>
                </Box>
            </Stack>
            <Typography mt={3} variant='h4'>Đánh giá</Typography>
            {userInfo && <Stack direction='row' mt={3} sx={{ alignItems: "start" }}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    width: "30%"
                }}>
                    <Avatar alt="Remy Sharp"
                        sx={{
                            width: "50px",
                            height: "50px"
                        }}
                        src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-1/268142468_3035907700072578_4829229204736514171_n.jpg?stp=cp0_dst-jpg_s40x40&_nc_cat=100&ccb=1-7&_nc_sid=6738e8&_nc_eui2=AeFe_w7HSGpqFDepgviEP4pyq9KSuRzAWe6r0pK5HMBZ7pEuCwmHx3H-gP4TXxRF640CJIZj8zT62i8cDsbhFZrr&_nc_ohc=bFMv_CKAR0wQ7kNvgFHuqae&_nc_ht=scontent.fhan2-4.fna&_nc_gid=AGqxW37Vosru_hqYPbyxMG4&oh=00_AYBPmeiE9kQ9b7WqaSmV3ZgyMf5UJ_NkTcJz_inkboLHyQ&oe=66ED5045" />
                    <Typography variant='h6'>Khải Đào</Typography>
                </Box>
                <Stack direction='column' sx={{
                    width: "70%",
                    gap: 3
                }}>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Đánh giá"
                        multiline
                        rows={4}
                        sx={{ width: "100%" }}
                        defaultValue=""
                    />
                    <Button variant='contained'>Đăng</Button>
                </Stack>
            </Stack>}
            <Box bgcolor="#e4e9fd" p={2} sx={{ borderRadius: "5px", mt: 3 }}>
                <Stack direction='row' mb={2} sx={{ justifyContent: "space-between", alignItems: 'center' }}>
                    <Stack direction='row' width={'85%'} sx={{ alignItems: "center", gap: 2 }}>
                        <Avatar alt="Remy Sharp" sx={{ width: "50px", height: "50px" }} />
                        <Box>
                            <Typography variant='h6'>Khải Đào</Typography>
                            <Stack direction="row" alignItems="center">
                                {isEditing ? (
                                    <Rating
                                        value={tempRating}
                                        onChange={(e, newRating) => setTempRating(newRating)}
                                    />
                                ) : (
                                    <Rating value={rating} readOnly />
                                )}
                            </Stack>
                        </Box>
                    </Stack>
                    <IconButton onClick={handleOpenMenu}>
                        <MoreHorizIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                        <MenuItem onClick={handleEditClick}>
                            <EditIcon fontSize="small" color='primary' sx={{ mr: 1 }} />
                            Chỉnh sửa
                        </MenuItem>
                        <MenuItem onClick={() => handleClickOpen(1)}>
                            <DeleteIcon fontSize="small" color='error' sx={{ mr: 1 }} />
                            Xoá
                        </MenuItem>
                    </Menu>
                </Stack>

                {isEditing ? (
                    <TextField
                        multiline
                        fullWidth
                        value={tempContent}
                        onChange={(e) => setTempContent(e.target.value)}
                        sx={{ mt: 1 }}
                    />
                ) : (
                    <Typography variant='subtitle1'>{reviewContent}</Typography>
                )}

                {isEditing && (
                    <DialogActions>
                        <Button onClick={() => setIsEditing(false)}>Hủy</Button>
                        <Button
                            onClick={handleSaveEdit}
                            color="primary"
                            variant="contained"
                            disabled={isSaveDisabled}
                        >
                            Lưu
                        </Button>
                    </DialogActions>
                )}

            </Box>
            {open && <DeleteConfirmationModal id={idDelete} open={open} handleClose={handleClose} ratingList={[]} />}
            <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                <Pagination
                    count={totalPages}
                    page={pagination.pageNumber}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Stack>
            <LoadingComponent open={loading} setOpen={setLoading} />
        </Box>
    )
}

export default TutorRating;
