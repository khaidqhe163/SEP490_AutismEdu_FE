import { Box, Button, Grid, Modal, TextField, Typography, Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';

function CreateOrEditModal({ open, handleClose, handleSubmit, initialData, isEditing }) {
    const [ageFrom, setAgeFrom] = useState('');
    const [ageTo, setAgeTo] = useState('');
    const [programContent, setProgramContent] = useState('');

    // Cập nhật dữ liệu khi mở modal chỉnh sửa
    useEffect(() => {
        if (isEditing && initialData) {
            setAgeFrom(initialData.ageFrom);
            setAgeTo(initialData.ageTo);
            setProgramContent(initialData.contentCurriculum);
        } else {
            setAgeFrom('');
            setAgeTo('');
            setProgramContent('');
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

    const handleFormSubmit = () => {
        handleSubmit(ageFrom, ageTo, programContent);
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
                            value={ageFrom}
                            onChange={(e) => setAgeFrom(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Đến"
                            type="number"
                            fullWidth
                            value={ageTo}
                            onChange={(e) => setAgeTo(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" mb={1}>Nội dung chương trình học</Typography>
                        <ReactQuill theme="snow" value={programContent} onChange={setProgramContent} />
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center" mt={3} sx={{display:'flex', justifyContent:'flex-end'}}>
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
