import React, { useState } from 'react';
import { Box, Button, Modal, Typography, TextField, MenuItem, Select, FormControl, Grid, Divider } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { useSelector } from 'react-redux';
import { userInfor } from '~/redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import services from '~/plugins/services';
import { enqueueSnackbar } from 'notistack';

function TutorRequestModal() {
    const [open, setOpen] = useState(false);
    const [childData, setChildData] = useState([]);
    const [selectedChild, setSelectedChild] = useState({});
    const [description, setDescription] = useState('');
    const userInf = useSelector(userInfor);
    const nav = useNavigate();

    console.log('description: ', description);


    const handleOpen = async () => {
        if (!userInf) {
            nav('/autismedu/login');
        } else {
            await handleGetChildInformation();
            setOpen(true);
        }
    };
    const handleClose = () => setOpen(false);

    const handleGetChildInformation = async () => {
        try {
            await services.ChildrenManagementAPI.listChildren(userInf?.id, (res) => {
                setChildData(res.result);
                setSelectedChild(res.result[0]);
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveRequest = async () => {
        const requestData = {
            tutorId: userInf?.id,
            childId: selectedChild?.id,
            description: description
        };
        try {
            await services.TutorRequestAPI.createTutorRequest(requestData, (res) => {
                setChildData([]);
                handleClose();
                enqueueSnackbar("Gửi yêu cầu tới gia sư thành công!", { variant: "success" });
            }, (error) => {
                enqueueSnackbar("Gửi yêu cầu tới gia sư thất bại!", { variant: "error" });
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    };

    const validationSchema = Yup.object({
        note: Yup.string().required('Vui lòng nhập ghi chú'),
    });

    return (
        <>
            <Button onClick={handleOpen} startIcon={<ForwardToInboxIcon />} variant='contained' color='primary' size='large'>
                Gửi yêu cầu
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
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
                    borderRadius: '10px',
                }}>
                    <Typography textAlign={'center'} variant='h5' mb={2} id="modal-modal-title">Gửi yêu cầu cho gia sư</Typography>
                    <Divider />
                    <Grid container spacing={2} mt={2}>
                        <Grid item xs={12} container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <Typography>Chọn trẻ của bạn:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <FormControl fullWidth margin="dense">
                                    <Select
                                        value={selectedChild?.id}
                                        onChange={(e) => {
                                            const selected = childData?.find(child => child?.id === e.target.value);
                                            setSelectedChild(selected);
                                        }}
                                    >
                                        {childData?.map(child => (
                                            <MenuItem key={child?.id} value={child?.id}>
                                                {child?.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        {/* Số điện thoại */}
                        <Grid item xs={12} container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <Typography>Số điện thoại:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>{userInf?.phoneNumber || '0338581585'}</Typography>
                            </Grid>
                        </Grid>

                        {/* Tên trẻ */}
                        <Grid item xs={12} container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <Typography>Tên trẻ:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>{selectedChild?.name}</Typography>
                            </Grid>
                        </Grid>

                        {/* Giới tính */}
                        <Grid item xs={12} container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <Typography>Giới tính:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>{selectedChild?.gender && (selectedChild?.gender === 'Male' ? 'Nam' : 'Nữ')}</Typography>
                            </Grid>
                        </Grid>

                        {/* Ngày sinh */}
                        <Grid item xs={12} container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <Typography>Ngày sinh:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                {/* <Typography>{selectedChild?.birthDate?.toLocaleDateString()}</Typography> */}
                                <Typography>{selectedChild?.birthDate}</Typography>
                            </Grid>
                        </Grid>

                        {/* Tính tuổi */}
                        <Grid item xs={12} container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <Typography>Tuổi:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                {/* <Typography>{calculateAge(selectedChild.birthDate)}</Typography> */}
                                <Typography>8</Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <Typography>Ghi chú tới gia sư:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Formik
                                    initialValues={{ note: '' }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        setDescription(values.note);
                                        handleSaveRequest(); // Call handleSaveRequest on form submit
                                    }}
                                >
                                    {({ values, errors, touched, handleChange }) => (
                                        <Form>
                                            <TextField
                                                name="note"
                                                label="Ghi chú tới gia sư"
                                                multiline
                                                rows={6}
                                                value={values.note}
                                                onChange={handleChange}
                                                error={touched.note && Boolean(errors.note)}
                                                helperText={touched.note && errors.note}
                                                fullWidth
                                            />
                                            <Box mt={3} display="flex" justifyContent="right">
                                                <Button variant="contained" color="inherit" onClick={handleClose} sx={{ mr: 2 }}>
                                                    Hủy
                                                </Button>
                                                <Button variant="contained" color="primary" type="submit">
                                                    Lưu
                                                </Button>
                                            </Box>
                                        </Form>
                                    )}
                                </Formik>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
}

export default TutorRequestModal;
