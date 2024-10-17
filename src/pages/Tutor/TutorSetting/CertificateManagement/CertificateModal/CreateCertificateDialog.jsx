import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
    Grid
} from '@mui/material';

export default function CreateCertificateDialog({ open, onClose, certificateData, setCertificateData, handleSubmitCertificate }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [openImageDialog, setOpenImageDialog] = useState(false);
    const [listImg, setListImg] = useState([]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setOpenImageDialog(true);
    };

    const handleCloseImageDialog = () => {
        setOpenImageDialog(false);
        setSelectedImage(null);
    };

    const handleImageRemove = (idx) => {
        const updatedImages = listImg.filter((_, index) => index !== idx);
        setListImg(updatedImages);
        const updatedMedias = certificateData.Medias.filter((_, index) => index !== idx);
        setCertificateData({ ...certificateData, Medias: updatedMedias });
        formik.setFieldValue('Medias', updatedImages);
    };

    const formik = useFormik({
        initialValues: {
            CertificateName: certificateData.CertificateName,
            IssuingInstitution: certificateData.IssuingInstitution,
            IdentityCardNumber: certificateData.IdentityCardNumber,
            IssuingDate: certificateData.IssuingDate,
            ExpirationDate: certificateData.ExpirationDate,
            Medias: certificateData.Medias,
        },
        validationSchema: Yup.object({
            CertificateName: Yup.string().required('Tên chứng chỉ là bắt buộc'),
            IssuingInstitution: Yup.string().required('Nơi cấp là bắt buộc'),
            IssuingDate: Yup.date().required('Ngày cấp là bắt buộc'),
            ExpirationDate: Yup.date().nullable(),
            Medias: Yup.array().min(1, 'Phải có ít nhất một ảnh'),
        }),
        onSubmit: () => {
            handleSubmitCertificate();  
            onClose();                
        },
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCertificateData({
            ...certificateData,
            [name]: value,
        });

        formik.setFieldValue(name, value);
    };

    const handleImageUploadWrapper = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files);
        const uploadedImages = fileArray.map((file) => {
            return { url: URL.createObjectURL(file) };
        });
        setListImg(uploadedImages);
        setCertificateData({ ...certificateData, Medias: fileArray });
        formik.setFieldValue('Medias', uploadedImages);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>Tạo chứng chỉ</DialogTitle>
                <DialogContent>
                    {/* Input fields */}
                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={4}>
                            <Typography sx={{ mt: 1, fontWeight: '500', textAlign: 'right' }}>Tên chứng chỉ:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                name="CertificateName"
                                value={certificateData.CertificateName}
                                onChange={handleInputChange}
                                error={formik.touched.CertificateName && Boolean(formik.errors.CertificateName)}
                                helperText={formik.touched.CertificateName && formik.errors.CertificateName}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={4}>
                            <Typography sx={{ mt: 1, fontWeight: '500', textAlign: 'right' }}>Nơi cấp:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                name="IssuingInstitution"
                                value={certificateData.IssuingInstitution}
                                onChange={handleInputChange}
                                error={formik.touched.IssuingInstitution && Boolean(formik.errors.IssuingInstitution)}
                                helperText={formik.touched.IssuingInstitution && formik.errors.IssuingInstitution}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={4}>
                            <Typography sx={{ mt: 1, fontWeight: '500', textAlign: 'right' }}>Ngày cấp:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                type="date"
                                name="IssuingDate"
                                value={certificateData.IssuingDate}
                                onChange={handleInputChange}
                                error={formik.touched.IssuingDate && Boolean(formik.errors.IssuingDate)}
                                helperText={formik.touched.IssuingDate && formik.errors.IssuingDate}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={4}>
                            <Typography sx={{ mt: 1, fontWeight: '500', textAlign: 'right' }}>Ngày hết hạn (Không bắt buộc):</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                type="date"
                                name="ExpirationDate"
                                value={certificateData.ExpirationDate}
                                onChange={handleInputChange}
                                error={formik.touched.ExpirationDate && Boolean(formik.errors.ExpirationDate)}
                                helperText={formik.touched.ExpirationDate && formik.errors.ExpirationDate}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" mb={2}>
                        <Grid item xs={4}>
                            <Typography sx={{ fontWeight: '500', textAlign: 'right' }}>Hình ảnh chứng chỉ:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<PhotoCameraIcon />}
                                sx={{ padding: '6px 16px', fontWeight: '500' }}
                            >
                                Tải lên hình ảnh
                                <input
                                    hidden
                                    accept="image/*"
                                    multiple
                                    type="file"
                                    onChange={handleImageUploadWrapper}
                                />
                            </Button>
                        </Grid>
                    </Grid>
                    {/* Display images */}
                    <Grid container>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={8}>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                {listImg?.map((image, index) => (
                                    <Box key={index} sx={{ position: 'relative', width: 100, height: 100, borderRadius: '8px', overflow: 'hidden', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
                                        <img src={image.url} alt="Chứng chỉ" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <IconButton
                                            sx={{ position: 'absolute', top: 5, right: 5, color: 'red', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                                            size="small"
                                            onClick={() => handleImageRemove(index)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            sx={{ position: 'absolute', top: 5, left: 5, color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                                            size="small"
                                            onClick={() => handleImageClick(image.url)}
                                        >
                                            <VisibilityIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="inherit" variant='outlined'>Hủy</Button>
                    <Button type="submit" color="primary" variant='contained'>Lưu</Button>
                </DialogActions>
            </form>
            <Dialog open={openImageDialog} onClose={handleCloseImageDialog} maxWidth="md" fullWidth>
                <DialogContent>
                    {selectedImage && (
                        <Box sx={{ textAlign: 'center' }}>
                            <img src={selectedImage} alt="Chứng chỉ" style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain' }} />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseImageDialog} color="inherit" variant='outlined'>Đóng</Button>
                </DialogActions>
            </Dialog>
        </Dialog>
    );
}
