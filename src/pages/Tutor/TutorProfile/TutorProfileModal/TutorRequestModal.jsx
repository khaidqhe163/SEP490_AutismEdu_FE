import React, { useState } from 'react';
import { Box, Button, Modal, Typography, TextField, MenuItem, Select, FormControl, Grid, Divider } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

const childData = [
    { id: 1, name: 'Nguyễn Văn A', gender: 'Nam', birthDate: new Date('2008-10-05') },
    { id: 2, name: 'Nguyễn Văn B', gender: 'Nữ', birthDate: new Date('2009-11-15') },
];

function TutorRequestModal() {
    const [open, setOpen] = useState(false);
    const [selectedChild, setSelectedChild] = useState(childData[0]); // Default to the first child

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '10px',
    };

    const calculateAge = (birthDate) => {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    // Validation schema for the form
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
                <Box sx={style}>
                    <Typography textAlign={'center'} variant='h5' mb={2} id="modal-modal-title">Gửi yêu cầu cho gia sư</Typography>
                    <Divider />
                    <Grid container spacing={2} mt={2}>
                        {/* Chọn trẻ của bạn */}
                        <Grid item xs={12} container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <Typography>Chọn trẻ của bạn:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <FormControl fullWidth margin="dense">
                                    <Select
                                        value={selectedChild.id}
                                        onChange={(e) => {
                                            const selected = childData.find(child => child.id === e.target.value);
                                            setSelectedChild(selected);
                                        }}
                                    >
                                        {childData.map(child => (
                                            <MenuItem key={child.id} value={child.id}>
                                                {child.name}
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
                                <Typography>{selectedChild.phone || '0338581585'}</Typography>
                            </Grid>
                        </Grid>

                        {/* Tên trẻ */}
                        <Grid item xs={12} container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <Typography>Tên trẻ:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>{selectedChild.name}</Typography>
                            </Grid>
                        </Grid>

                        {/* Giới tính */}
                        <Grid item xs={12} container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <Typography>Giới tính:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>{selectedChild.gender}</Typography>
                            </Grid>
                        </Grid>

                        {/* Ngày sinh */}
                        <Grid item xs={12} container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <Typography>Ngày sinh:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>{selectedChild.birthDate.toLocaleDateString()}</Typography>
                            </Grid>
                        </Grid>

                        {/* Tính tuổi */}
                        <Grid item xs={12} container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <Typography>Tuổi:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>{calculateAge(selectedChild.birthDate)}</Typography>
                            </Grid>
                        </Grid>

                        {/* Ghi chú tới gia sư */}
                        <Grid item xs={12} container spacing={2} alignItems="center">
                            <Grid item xs={4} >
                                <Typography>Ghi chú tới gia sư:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Formik
                                    initialValues={{ note: '' }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        console.log({ selectedChild, ...values });
                                        handleClose(); // Close the modal after submission
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
                                        </Form>
                                    )}
                                </Formik>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Box mt={3} display="flex" justifyContent="right">
                        <Button variant="contained" color="inherit" onClick={handleClose} sx={{ mr: 2 }}>
                            Hủy
                        </Button>
                        <Button variant="contained" color="primary" type="submit" form="note-form">
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default TutorRequestModal;
