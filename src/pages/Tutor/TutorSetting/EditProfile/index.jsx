import { Grid, Stack, Typography, TextField, Button, Box, Modal, Paper } from '@mui/material';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ModalConfirm from './ModalConfirm';

function EditProfile() {
    const [profileData, setProfileData] = useState({
        fee: '',
        address: '',
        aboutMe: ''
    });

    const [openModal, setOpenModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value
        });
    };

    const handleQuillChange = (value) => {
        setProfileData({
            ...profileData,
            aboutMe: value
        });
    };

    const handleSubmit = () => {
        console.log('Thông tin hồ sơ cập nhật: ', profileData);
        setOpenModal(false);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    
    return (
        <Stack direction='column' sx={{
            width: "90%",
            margin: "auto",
            mt: "20px",
            gap: 2
        }}>
            <Typography variant='h4' my={2}>Chỉnh sửa hồ sơ</Typography>
            <Grid container spacing={3} component="form" onSubmit={(e) => e.preventDefault()}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Học phí"
                        variant="outlined"
                        name="fee"
                        value={profileData.fee || ''}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Địa chỉ"
                        variant="outlined"
                        name="address"
                        value={profileData.address || ''}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='h6' mb={2}>Giới thiệu về tôi</Typography>
                    <ReactQuill
                        value={profileData.aboutMe || ''}
                        onChange={handleQuillChange}
                        theme="snow"
                        style={{ height: '200px' }}
                    />
                </Grid>

                <Grid item xs={12} mt={5}>
                    <Box textAlign="center">
                        <Button variant="contained" color="primary" onClick={handleOpenModal}>
                            Lưu thay đổi
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <ModalConfirm openModal={openModal} handleCloseModal={handleCloseModal} handleSubmit={handleSubmit}/>
        </Stack>
    );
}

export default EditProfile;
