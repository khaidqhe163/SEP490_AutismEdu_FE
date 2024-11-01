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
import services from '~/plugins/services';
import { enqueueSnackbar } from 'notistack';
function TutorRating({ tutorId, userInfo }) {

    const [idDelete, setIdDelete] = useState(-1);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [tempRating, setTempRating] = useState(0);
    const [tempContent, setTempContent] = useState('');

    const [dataReviewStats, setDataReviewStats] = useState(null);
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

    useEffect(() => {
        handleGetDataReviewStats();
    }, []);

    useEffect(() => {
        if (selectedReview) {
            setTempRating(selectedReview?.rateScore);
            setTempContent(selectedReview?.description);
        }
    }, [selectedReview]);
    console.log(dataReviewStats);




    const handleChangeRatingData = (e) => {
        const { name, value } = e.target;
        setRatingData((prev) => ({ ...prev, [name]: value }));
    }

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleEditClick = (r) => {
        // console.log(r);
        setSelectedReview(r);
        setIsEditing(true);
        handleCloseMenu();
    };

    const handleClickOpen = (id) => {
        setIdDelete(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancle = () => {
        setSelectedReview(null);
        setIsEditing(false);
    };

    const handlePageChange = (event, value) => {
        setPagination({ ...pagination, pageNumber: value });
    };

    useEffect(() => {
        if (selectedReview) {
            setIsSaveDisabled(tempRating === selectedReview.rateScore && tempContent === selectedReview.description);
        }
    }, [tempRating, tempContent, selectedReview]);

    const handleGetDataReviewStats = async () => {
        try {
            await services.ReviewManagementAPI.getReviewStats(tutorId, (res) => {
                if (res?.result) {
                    console.log(res.result);
                    setDataReviewStats(res.result);
                }
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitRating = async () => {
        try {
            setLoading(true);
            await services.ReviewManagementAPI.createReview(ratingData, (res) => {
                if (res?.result) {
                    const addData = [res.result, ...dataReviewStats.reviews];
                    setDataReviewStats((prev) => ({ ...prev, reviews: addData }));
                    enqueueSnackbar("Đánh giá đã được đăng thành công!", { variant: 'success' });
                }
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    };

    const handleSaveEdit = async () => {
        try {
            const updateData = {
                rateScore: tempRating,
                description: tempContent
            };
            setLoading(true);
            await services.ReviewManagementAPI.updateReview(selectedReview?.id, updateData, (res) => {
                if (res?.result) {
                    const updatedReviews = dataReviewStats?.reviews?.map((r) =>
                        r.id === res.result.id ? res.result : r
                    );
                    setDataReviewStats((prev) => ({ ...prev, reviews: updatedReviews }));
                    enqueueSnackbar('Cập nhật đánh giá thành công!', { variant: 'success' });
                }
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        } finally {
            setSelectedReview(null);
            setIsEditing(false);
            setLoading(false);
        }
    };

    const handleDeleteReview = async () => {

    }

    const totalPages = Math.ceil(pagination.total / pagination.pageSize);

    dayjs.extend(relativeTime);

    return (
        dataReviewStats && (
            <Box sx={{ width: "100%" }}>
                <Stack direction='row' gap={3}>
                    <Box sx={{ bgcolor: "#e4e9fd", px: 2, py: 3, width: "40%", borderRadius: "5px" }}>
                        <Typography variant='h6'>Đánh giá trung bình về gia sư</Typography>
                        <Typography><b style={{ fontWeight: "black", fontSize: '30px' }}>{dataReviewStats?.averageScore}</b>/5
                            <Rating name="text-feedback"
                                value={dataReviewStats?.averageScore}
                                readOnly
                                precision={0.1} />
                            {/* <Rating name="half-rating-read" value={} precision={0.1} readOnly /> */}
                        </Typography>
                        <small>{dataReviewStats?.totalReviews} lượt đánh giá</small>
                    </Box>
                    <Box sx={{ width: "60%" }}>
                        <Typography variant='h6'>Phân tích đánh giá</Typography>
                        {dataReviewStats?.scoreGroups?.map((s, index) => {
                            if (s.scoreRange === '5') {
                                return (
                                    <Stack direction='row' sx={{ alignItems: "center", gap: 1, width: "100%" }} key={index}>
                                        <Typography sx={{ width: "2%" }}>5</Typography>
                                        <StarIcon />
                                        <Box sx={{ height: "15px", width: "60%", borderRadius: "10px", overflow: "hidden", boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset" }}>
                                            <Box sx={{
                                                height: "15px",
                                                width: `calc(${(s.reviewCount / dataReviewStats?.totalReviews) * 100}%)`,
                                                bgcolor: '#5cb85c',
                                                borderRadius: "10px"
                                            }} />
                                        </Box>

                                        <Typography>{s.reviewCount}</Typography>
                                    </Stack>
                                );
                            } else if (s.scoreRange === '4') {
                                return (
                                    <Stack direction='row' sx={{ alignItems: "center", gap: 1, width: "100%" }} key={index}>
                                        <Typography sx={{ width: "2%" }}>4</Typography>
                                        <StarIcon />
                                        <Box sx={{ height: "15px", width: "60%", borderRadius: "10px", overflow: "hidden", boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset" }}>
                                            <Box sx={{ bgcolor: "#428bca", width: `calc(${(s.reviewCount / dataReviewStats?.totalReviews) * 100}%)`, height: "15px" }} />
                                        </Box>
                                        <Typography>{s.reviewCount}</Typography>
                                    </Stack>
                                );
                            } else if (s.scoreRange === '3') {
                                return (
                                    <Stack direction='row' sx={{ alignItems: "center", gap: 1, width: "100%" }} key={index}>
                                        <Typography sx={{ width: "2%" }}>3</Typography>
                                        <StarIcon />
                                        <Box sx={{ height: "15px", width: "60%", borderRadius: "10px", overflow: "hidden", boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset" }}>
                                            <Box sx={{ bgcolor: "#5bc0de", width: `calc(${(s.reviewCount / dataReviewStats?.totalReviews) * 100}%)`, height: "15px" }} />
                                        </Box>
                                        <Typography>{s.reviewCount}</Typography>
                                    </Stack>
                                );
                            } else if (s.scoreRange === '2') {
                                return (
                                    <Stack direction='row' sx={{ alignItems: "center", gap: 1, width: "100%" }} key={index}>
                                        <Typography sx={{ width: "2%" }}>2</Typography>
                                        <StarIcon />
                                        <Box sx={{ height: "15px", width: "60%", borderRadius: "10px", overflow: "hidden", boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset" }}>
                                            <Box sx={{ bgcolor: "#f0ad4e", width: `calc(${(s.reviewCount / dataReviewStats?.totalReviews) * 100}%)`, height: "15px" }} />
                                        </Box>
                                        <Typography>{s.reviewCount}</Typography>
                                    </Stack>
                                );
                            } else {
                                return (
                                    <Stack direction='row' sx={{ alignItems: "center", gap: 1, width: "100%" }} key={index}>
                                        <Typography sx={{ width: "2%" }}>1</Typography>
                                        <StarIcon />
                                        <Box sx={{ height: "15px", width: "60%", borderRadius: "10px", overflow: "hidden", boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset" }}>
                                            <Box sx={{ bgcolor: "#d9534f", width: `calc(${(s.reviewCount / dataReviewStats?.totalReviews) * 100}%)`, height: "15px" }} />
                                        </Box>
                                        <Typography>{s.reviewCount}</Typography>
                                    </Stack>
                                );
                            }
                        }

                        )}
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
                            src={userInfo?.imageUrl} />
                        <Typography variant='h6'>{userInfo?.fullName}</Typography>
                    </Box>
                    <Stack direction='column' sx={{
                        width: "70%",
                        gap: 3
                    }}>
                        <Rating
                            name="rateScore"
                            value={ratingData.rateScore}
                            onChange={handleChangeRatingData}
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Đánh giá"
                            name='description'
                            multiline
                            rows={4}
                            sx={{ width: "100%" }}
                            value={ratingData.description || ''}
                            onChange={handleChangeRatingData}
                        />
                        <Button variant='contained' disabled={!ratingData.rateScore || !ratingData.description} onClick={handleSubmitRating}>Đăng</Button>
                    </Stack>
                </Stack>}

                {(dataReviewStats && dataReviewStats?.reviews?.length !== 0) ? dataReviewStats?.reviews?.map((r, index) => (
                    <Box bgcolor="#e4e9fd" p={2} sx={{ borderRadius: "5px", mt: 3 }} key={index}>
                        <Stack direction='row' mb={2} sx={{ justifyContent: "space-between", alignItems: 'center' }}>
                            <Stack direction='row' width={'80%'} sx={{ alignItems: "center", gap: 2 }}>
                                <Avatar src={r?.parent?.imageUrl || ''} alt="Remy Sharp" sx={{ width: "50px", height: "50px" }} />
                                <Box>
                                    <Typography variant='h6'>{r?.parent?.fullName || 'Khai XYZ'}</Typography>
                                    <Stack direction="row" alignItems="center">
                                        {isEditing && (r?.id === selectedReview?.id) ? (
                                            <Rating
                                                value={tempRating}
                                                onChange={(e, newRating) => setTempRating(newRating)}
                                            />
                                        ) : (
                                            <Rating value={r?.rateScore} readOnly />
                                        )}
                                    </Stack>
                                </Box>
                            </Stack>
                            <Typography width={'15%'} textAlign={'right'}><small>{dayjs(new Date(r?.createdDate)).fromNow()}</small></Typography>
                            {/* {userInfo?.id === r?.parent?.id && ( */}
                            {userInfo?.id === r?.parentId && (
                                <>
                                    <IconButton onClick={handleOpenMenu} size='medium'>
                                        <MoreHorizIcon />
                                    </IconButton>
                                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                                        <MenuItem onClick={() => handleEditClick(r)}>
                                            <EditIcon fontSize="small" color='primary' sx={{ mr: 1 }} />
                                            Chỉnh sửa
                                        </MenuItem>
                                        <MenuItem onClick={() => handleClickOpen(r?.id)}>
                                            <DeleteIcon fontSize="small" color='error' sx={{ mr: 1 }} />
                                            Xoá
                                        </MenuItem>
                                    </Menu></>
                            )}
                            {/* <IconButton onClick={handleOpenMenu}>
                        <MoreHorizIcon />
                    </IconButton> */}

                        </Stack>

                        {isEditing && (r?.id === selectedReview?.id) ? (
                            <TextField
                                multiline
                                fullWidth
                                value={tempContent}
                                onChange={(e) => setTempContent(e.target.value)}
                                sx={{ mt: 1 }}
                            />
                        ) : (
                            <Typography variant='subtitle1'>{r?.description}</Typography>
                        )}

                        {(isEditing && (r?.id === selectedReview?.id)) && (
                            <DialogActions>
                                <Button onClick={handleCancle}>Hủy</Button>
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

                )) : 'Hiện tại chưa có đánh giá nào về gia sư.'}

                {open && <DeleteConfirmationModal id={idDelete} open={open} handleClose={handleClose} dataReviewStats={dataReviewStats} setDataReviewStats={setDataReviewStats} />}
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
    )
}

export default TutorRating;
