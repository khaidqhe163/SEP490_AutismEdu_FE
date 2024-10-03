import { Grid, Stack, Typography, TextField, Button, Box, Modal, Paper } from '@mui/material';
import React, { useState } from 'react';

function ModalConfirm({ openModal, handleCloseModal, handleSubmit }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-title" variant="h6" component="h2">
                    Xác nhận lưu thay đổi
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                    Bạn có chắc chắn muốn lưu các thay đổi này?
                </Typography>
                <Box mt={4} display="flex" justifyContent="flex-end" columnGap={2}>
                    <Button variant="outlined" color="inherit" onClick={handleCloseModal}>
                        Hủy
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Đồng ý
                    </Button>

                </Box>
            </Box>
        </Modal>
    )
}

export default ModalConfirm