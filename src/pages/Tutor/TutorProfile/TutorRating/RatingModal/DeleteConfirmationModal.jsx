import { Box, Button, Modal, Typography, Divider } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import services from '~/plugins/services';

function DeleteConfirmationModal({ id, open, handleClose, dataReviewStats, setDataReviewStats }) {

    const handleDelete = async () => {
        try {
            await services.ReviewManagementAPI.deleteReview(id, (res) => {
                console.log('delete hello');
                
                const newData = dataReviewStats?.reviews?.filter((r) => r?.id !== id);
                setDataReviewStats((prev) => ({ ...prev, reviews: newData }));
                enqueueSnackbar("Xoá đánh giá thành công", { variant: 'success' });
            }, (error) => {
                console.log(error);
            })
            // await services.CertificateAPI.deleteCertificate(id, {}, (res) => {
            //     const newListCerti = certificateList.filter((c) => c.id !== id);
            //     setCertificateList(newListCerti);
            //     enqueueSnackbar("Xoá thành công!", { variant: 'success' });
            //     handleClose();
            // }, (error) => {
            //     console.log(error);
            // })
        } catch (error) {
            console.log(error);
        } finally {
            handleClose();
        }
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '10px'
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography textAlign={'center'} variant="h5" mb={2}>
                    Xác nhận xoá
                </Typography>
                <Divider />
                <Typography mt={2} mb={4}>
                    Bạn có chắc chắn muốn xoá đánh giá này không?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="outlined" onClick={handleClose}>Huỷ</Button>
                    <Button variant="contained" color="primary" onClick={handleDelete}>Xoá</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default DeleteConfirmationModal;
