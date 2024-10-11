import { Box, Button, Grid, Modal, TextField, Typography, Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';

function CreateOrEditModal({ open, handleClose, handleSubmit, initialData, isEditing }) {
    // Consolidating into a single formData object
    const [formData, setFormData] = useState({
        ageFrom: '',
        ageEnd: '',
        description: ''
    });

    // Update formData when modal is opened for editing
    useEffect(() => {
        if (isEditing && initialData) {
            setFormData({
                ageFrom: initialData.ageFrom,
                ageEnd: initialData.ageEnd,
                description: initialData.contentCurriculum, 
            });
        } else {
            setFormData({
                ageFrom: '',
                ageEnd: '',
                description: ''
            });
        }
    }, [isEditing, initialData]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '10px'
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle ReactQuill input changes for description
    const handleDescriptionChange = (content) => {
        setFormData({
            ...formData,
            description: content
        });
    };

    const handleFormSubmit = () => {
        handleSubmit(formData);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography textAlign={'center'} variant="h2" mb={2}>
                    {isEditing ? "Chỉnh sửa khung chương trình" : "Tạo khung chương trình"}
                </Typography>
                <Divider />
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" mb={1}>Độ tuổi của trẻ</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Từ"
                            type="number"
                            fullWidth
                            name="ageFrom"
                            value={formData.ageFrom}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Đến"
                            type="number"
                            fullWidth
                            name="ageEnd"
                            value={formData.ageEnd}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" mb={1}>Nội dung chương trình học</Typography>
                        <ReactQuill theme="snow" value={formData.description} onChange={handleDescriptionChange} style={{height:'200px'}}/>
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center" mt={5} sx={{display:'flex', justifyContent:'flex-end'}}>
                    <Grid item>
                        <Button variant="outlined" onClick={handleClose}>Hủy</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={handleFormSubmit}>
                            {isEditing ? "Cập nhật" : "Tạo mới"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}

export default CreateOrEditModal;
