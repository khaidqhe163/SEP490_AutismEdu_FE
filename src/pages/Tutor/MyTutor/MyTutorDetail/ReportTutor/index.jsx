import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Box, Button, FormControl, FormHelperText, IconButton, MenuItem, Modal, Select, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ButtonIcon from '~/components/ButtonComponent/ButtonIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import { enqueueSnackbar } from 'notistack';
import LoadingComponent from '~/components/LoadingComponent';
import axios from '~/plugins/axios';
import services from '~/plugins/services';

const IncompatibilityWithRequirement = 1;
const NoInappropriateAttitude = 2;
const NoGuaranteedClassSchedule = 3;
const LackOfCommunicationWithParents = 4;
const ViolationOfProfessionalEthics = 5;
const Other = 6
function ReportTutor({ studentProfile }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [images, setImages] = useState([]);
    const [openImage, setOpenImage] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) {
            formik.resetForm();
            setImages([]);
        }
    }, [open])
    const validate = (values) => {
        const errors = {}
        if (values.type === 0) {
            errors.type = "Vui lòng chọn lý do tố cáo"
        }
        if (!values.title) {
            errors.title = "Bắt buộc"
        } else if (values.title.length > 100) {
            errors.title = "Tiêu đề quá dài"
        }
        if (!values.description) {
            errors.description = "Bắt buộc"
        } else if (values.description.length > 5000) {
            errors.description = "Mô tả dưới 5000 ký tự"
        }
        return errors
    }

    useEffect(() => {
        setCurrentImage(0)
    }, [openImage])
    const formik = useFormik({
        initialValues: {
            type: 0,
            title: '',
            description: '',
        }, validate,
        onSubmit: async (values) => {
            if (images.length === 0) return;
            try {
                setLoading(true);
                const formData = new FormData();
                formData.append("ReportTutorType", values.type);
                formData.append("Title", values.title);
                formData.append("Description", values.description);
                formData.append("TutorId", studentProfile.tutor.userId);
                images.forEach((i) => {
                    formData.append("ReportMedias", i);
                })
                axios.setHeaders({ "Content-Type": "multipart/form-data", "Accept": "application/json, text/plain, multipart/form-data, */*" });
                await services.ReportManagementAPI.createTutorReport(formData, (res) => {
                    enqueueSnackbar("Gửi đơn tố cáo thành công!", { variant: "success" })
                    setOpen(false);
                }, (err) => {
                    console.log(err);
                    enqueueSnackbar(err.error[0], { variant: "error" })
                })
                axios.setHeaders({ "Content-Type": "application/json", "Accept": "application/json, text/plain, */*" });
            } catch (error) {
                enqueueSnackbar("Gửi đơn tố cáo thất bại!", { variant: "error" })
            } finally {
                setLoading(false);
            }
        }
    })
    const handleDeleteImage = (index) => {
        const filterArr = images.filter((image, i) => {
            return i !== index;
        })
        setImages(filterArr);
        setCurrentImage(0);
    }
    return (
        <div>
            <Button variant='contained' sx={{ height: "50px" }}
                startIcon={<PriorityHighIcon />} color="warning"
                onClick={handleOpen}
            >Tố cáo</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 800,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    maxHeight: "80vh",
                    overflow: "auto"
                }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Typography variant='h5'>Tố cáo gia sư</Typography>
                        <Typography mt={2}>Loại tố cáo:</Typography>
                        <FormControl fullWidth>
                            <Select placeholder='Vui lòng chọn kiểu tố cáo' value={formik.values.type}
                                name='type' onChange={formik.handleChange}>
                                <MenuItem value={0} disabled><i>Vui lòng chọn lý do tố cáo</i></MenuItem>
                                <MenuItem value={IncompatibilityWithRequirement}>
                                    Không đáp ứng đúng yêu cầu về chuyên môn
                                </MenuItem>
                                <MenuItem value={NoInappropriateAttitude}>
                                    Không có sự kiên nhẫn hoặc thái độ không phù hợp
                                </MenuItem>
                                <MenuItem value={NoGuaranteedClassSchedule}>
                                    Không đảm bảo lịch học đúng giờ
                                </MenuItem>

                                <MenuItem value={LackOfCommunicationWithParents}>
                                    Thiếu giao tiếp với phụ huynh
                                </MenuItem>

                                <MenuItem value={ViolationOfProfessionalEthics}>
                                    Có dấu hiệu không trung thực hoặc vi phạm đạo đức nghề nghiệp
                                </MenuItem>
                                <MenuItem value={Other}>Vấn đề khác</MenuItem>
                            </Select>
                        </FormControl>
                        {
                            formik.errors.type && (
                                <FormHelperText error>
                                    {formik.errors.type}
                                </FormHelperText>
                            )
                        }
                        <Typography mt={2}>Tiêu đề:</Typography>
                        <TextField fullWidth name='title' value={formik.values.title} onChange={formik.handleChange} />
                        {
                            formik.errors.title && (
                                <FormHelperText error>
                                    {formik.errors.title}
                                </FormHelperText>
                            )
                        }
                        <Typography mt={2}>Mô tả chi tiết: </Typography>
                        <TextField fullWidth multiline rows={8} name='description' value={formik.values.description} onChange={formik.handleChange} />
                        {
                            formik.errors.description && (
                                <FormHelperText error>
                                    {formik.errors.description}
                                </FormHelperText>
                            )
                        }
                        <Typography mt={2}>Hình ảnh bằng chứng: </Typography>
                        <TextField fullWidth type='file' inputProps={{
                            multiple: true,
                            accept: "image/png, image/jpeg"
                        }} onChange={(e) => setImages(Array.from(e.target.files))} />
                        {
                            images.length === 0 && (
                                <FormHelperText error>
                                    Bắt buộc
                                </FormHelperText>
                            )
                        }
                        <Stack direction='row' gap={3} mt={2}>
                            {
                                images && images.length !== 0 && images.map((image, index) => {
                                    return (
                                        <Box key={index} sx={{
                                            backgroundImage: `url(${URL.createObjectURL(image)})`, backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            width: "100px",
                                            height: "100px",
                                            cursor: "pointer",
                                            "&:hover .hoverContent": {
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                bgcolor: "#4589c4bf"
                                            },
                                        }}>
                                            <Box className="hoverContent" sx={{
                                                width: "100%",
                                                height: "100%",
                                                display: "none",
                                            }}>
                                                <IconButton>
                                                    <RemoveRedEyeIcon
                                                        onClick={() => { setOpenImage(true); setCurrentImage(index) }} />
                                                </IconButton>
                                                <IconButton>
                                                    <DeleteIcon
                                                        onClick={() => handleDeleteImage(index)} />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    )
                                })
                            }
                        </Stack>
                        <Stack direction='row' gap={3} justifyContent="end">
                            <Button variant='contained' type='submit'>Tố cáo</Button>
                            <Button onClick={() => setOpen(false)}>Huỷ bỏ</Button>
                        </Stack>
                    </form>
                    <LoadingComponent open={loading} />
                </Box>
            </Modal >
            {
                images[currentImage] && images.length !== 0 !== null && openImage && (
                    <Modal open={openImage} onClose={() => setOpenImage(false)}>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="100vh"
                            bgcolor="rgba(0, 0, 0, 0.8)"
                            position="relative"
                        >
                            <img
                                src={URL.createObjectURL(images[currentImage])}
                                alt="large"
                                style={{ maxWidth: '90%', maxHeight: '90%' }}
                            />

                            <IconButton
                                onClick={() => setOpenImage(false)}
                                style={{ position: 'absolute', top: 20, right: 20, color: 'white' }}
                            >
                                <HighlightOffIcon />
                            </IconButton>
                            <IconButton
                                style={{ position: 'absolute', left: 20, color: 'white' }}
                                onClick={() => setCurrentImage(currentImage === 0 ? 0 : currentImage - 1)}
                            >
                                <ArrowBackIosIcon />
                            </IconButton>
                            <IconButton
                                style={{ position: 'absolute', right: 20, color: 'white' }}
                                onClick={() => setCurrentImage(currentImage === images.length - 1 ? currentImage : currentImage + 1)}
                            >
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Box>
                    </Modal>
                )
            }
        </div >
    )
}

export default ReportTutor