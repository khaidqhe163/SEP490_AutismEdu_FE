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
import { format } from 'date-fns';

function TutorRequestModal({ rejectChildIds, tutorId, calculateAge }) {
    const [open, setOpen] = useState(false);
    const [childData, setChildData] = useState([]);
    const [selectedChild, setSelectedChild] = useState({});
    const userInf = useSelector(userInfor);
    const nav = useNavigate();

    const menuProps = {
        PaperProps: {
            style: {
                maxHeight: 200,
                overflowY: 'auto',
            },
        },
    };

    const handleOpen = async () => {
        if (!userInf) {
            nav('/autismedu/login', { state: { tutorId } });
        } else {
            await handleGetChildInformation();
            setOpen(true);
        }
    };
    const handleClose = () => setOpen(false);

    const handleGetChildInformation = async () => {
        try {
            await services.ChildrenManagementAPI.listChildren(userInf?.id, (res) => {
                if (res?.result?.length === 0) {
                    nav('/autismedu/my-childlren');
                } else {
                    setChildData(res.result);
                    const x = res?.result?.find((r) => (!rejectChildIds.includes(r?.id)))
                    setSelectedChild(x);
                }
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    };


    const handleSaveRequest = async (note) => {
        const requestData = {
            tutorId: tutorId,
            childId: selectedChild?.id,
            description: note
        };

        try {
            await services.TutorRequestAPI.createTutorRequest(requestData, (res) => {
                setChildData([]);
                enqueueSnackbar("Gửi yêu cầu tới gia sư thành công!", { variant: "success" });
                handleClose();
            }, (error) => {
                enqueueSnackbar("Gửi yêu cầu tới gia sư thất bại!", { variant: "error" });
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const validationSchema = Yup.object({
        note: Yup.string().min(10, 'Phải nhập tối thiểu 10 ký tự').required('Vui lòng nhập ghi chú'),
    });

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd/MM/yyyy');
    };

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
                                        MenuProps={menuProps}
                                        value={selectedChild?.id}
                                        onChange={(e) => {
                                            const selected = childData?.find(child => child?.id === e.target.value);
                                            setSelectedChild(selected);
                                        }}
                                    >
                                        {childData?.map(child => (
                                            <MenuItem
                                                key={child?.id}
                                                value={child?.id}
                                                disabled={rejectChildIds?.includes(child?.id)}
                                            >
                                                {child?.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <Typography>Số điện thoại:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>{userInf?.phoneNumber || '0338581585'}</Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <Typography>Tên trẻ:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>{selectedChild?.name}</Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <Typography>Giới tính:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>{selectedChild?.gender && (selectedChild?.gender === 'Male' ? 'Nam' : 'Nữ')}</Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <Typography>Ngày sinh:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>{selectedChild?.birthDate && formatDate(selectedChild?.birthDate)}</Typography>
                            </Grid>
                        </Grid>

                        {/* Tính tuổi */}
                        <Grid item xs={12} container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <Typography>Tuổi:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>{selectedChild?.birthDate && calculateAge(new Date(selectedChild?.birthDate))}</Typography>
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
                                        handleSaveRequest(values.note); // Passing the note value here
                                    }}
                                >
                                    {({ values, errors, touched, handleChange, handleBlur }) => (
                                        <Form>
                                            <TextField
                                                name="note"
                                                label="Ghi chú tới gia sư"
                                                multiline
                                                rows={6}
                                                value={values.note}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
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
