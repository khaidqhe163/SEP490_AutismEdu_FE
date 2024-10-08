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

export default function CreateCertificateDialog({ open, onClose, certificateData, setCertificateData, handleImageUpload, handleImageRemove }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [openImageDialog, setOpenImageDialog] = useState(false);

    // Handle image click to view details
    const handleImageClick = (image) => {
        setSelectedImage(image);
        setOpenImageDialog(true);
    };

    const handleCloseImageDialog = () => {
        setOpenImageDialog(false);
        setSelectedImage(null);
    };

    // Use Formik with Yup for validation
    const formik = useFormik({
        initialValues: {
            name: certificateData.name || '',
            issuer: certificateData.issuer || '',
            issueDate: certificateData.issueDate || '',
            expiryDate: certificateData.expiryDate || '',
            images: certificateData.images || [], // Track image list
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Tên chứng chỉ là bắt buộc'),
            issuer: Yup.string().required('Nơi cấp là bắt buộc'),
            issueDate: Yup.date().required('Ngày cấp là bắt buộc'),
            expiryDate: Yup.date().nullable(), // Optional
            images: Yup.array().min(1, 'Phải có ít nhất một ảnh'), // At least 1 image required
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2)); // Display entered info temporarily
        },
    });

    // Update image list on upload
    const handleImageUploadWrapper = (event) => {
        const files = event.target.files;
        const uploadedImages = [...certificateData.images]; // Keep previous image list

        // Create URL for uploaded images
        for (let i = 0; i < files.length; i++) {
            const url = URL.createObjectURL(files[i]);
            uploadedImages.push({ url });
        }

        // Update image list in state
        setCertificateData({ ...certificateData, images: uploadedImages });
        formik.setFieldValue('images', uploadedImages); // Update images in Formik
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
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
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
                                name="issuer"
                                value={formik.values.issuer}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.issuer && Boolean(formik.errors.issuer)}
                                helperText={formik.touched.issuer && formik.errors.issuer}
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
                                name="issueDate"
                                value={formik.values.issueDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.issueDate && Boolean(formik.errors.issueDate)}
                                helperText={formik.touched.issueDate && formik.errors.issueDate}
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
                                name="expiryDate"
                                value={formik.values.expiryDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
                                helperText={formik.touched.expiryDate && formik.errors.expiryDate}
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
                                {certificateData.images.map((image, index) => (
                                    <Box key={index} sx={{ position: 'relative', width: 100, height: 100, borderRadius: '8px', overflow: 'hidden', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
                                        <img src={image.url} alt="Chứng chỉ" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <IconButton
                                            size="small"
                                            sx={{ position: 'absolute', top: 0, right: 0 }}
                                            color="error"
                                            onClick={() => handleImageRemove(index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            sx={{ position: 'absolute', top: 0, left: 0 }}
                                            color="inherit"
                                            onClick={() => handleImageClick(image)}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'flex-end', paddingBottom: '16px' }}>
                    <Button onClick={onClose} color="inherit" variant='outlined'>Huỷ</Button>
                    <Button type="submit" variant="contained" color="primary" disabled={!formik.isValid || !formik.dirty || formik.values.images.length === 0}>
                        Tạo
                    </Button>
                </DialogActions>
            </form>

            {/* Image preview dialog */}
            <Dialog
                open={openImageDialog}
                onClose={handleCloseImageDialog}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{ textAlign: 'center', fontSize: '1.25rem', fontWeight: '500' }}>Hình ảnh chứng chỉ</DialogTitle>
                <DialogContent>
                    {selectedImage && (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={selectedImage.url} alt="Hình ảnh chứng chỉ" style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain' }} />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseImageDialog} color="inherit">Đóng</Button>
                </DialogActions>
            </Dialog>
        </Dialog>
    );
}
