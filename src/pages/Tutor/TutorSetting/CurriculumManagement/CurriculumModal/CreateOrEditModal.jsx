import { Box, Button, Grid, Modal, TextField, Typography, Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function CreateOrEditModal({ open, handleClose, handleSubmit, initialData, isEditing }) {
    const [formData, setFormData] = useState({
        ageFrom: initialData?.ageFrom || '',
        ageEnd: initialData?.ageEnd || '',
        description: initialData?.description || '',
    });


    const validationSchema = Yup.object({
        ageFrom: Yup.number().required('Độ tuổi bắt đầu là bắt buộc').positive('Độ tuổi phải là số dương').min(1, 'Độ tuổi bắt đầu phải lớn hơn 0')
        .max(14, 'Độ tuổi bắt đầu phải nhỏ hơn 14'),
        ageEnd: Yup.number()
            .required('Độ tuổi kết thúc là bắt buộc')
            .positive('Độ tuổi phải là số dương')
            .moreThan(Yup.ref('ageFrom'), 'Độ tuổi kết thúc phải lớn hơn độ tuổi bắt đầu')
            .max(15, 'Độ tuổi kết thúc phải nhỏ hơn 15'),
        description: Yup.string().required('Nội dung chương trình học là bắt buộc').test('is-not-empty', 'Không được để trống', value => value !== '<p><br></p>' || value !== '<p> </p>'),
    });



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


    const handleFormSubmit = (values) => {
        console.log(values);

        if (isEditing) {
            console.log(initialData.id);
            const data = initialData.originalCurriculum ? initialData.originalCurriculum.id : initialData.id;
            handleSubmit(values, data);
        } else {
            handleSubmit(values);
        }
        handleClose();
    };


    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography textAlign={'center'} variant="h4" mb={2}>
                    {isEditing ? "Chỉnh sửa khung chương trình" : "Tạo khung chương trình"}
                </Typography>
                <Divider />
                <Formik
                    initialValues={formData}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                    enableReinitialize
                >
                    {({ setFieldValue, values, errors, touched }) => (
                        <Form>
                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" mb={1}>Độ tuổi của trẻ:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        label="Từ"
                                        type="number"
                                        fullWidth
                                        name="ageFrom"
                                        value={values.ageFrom}
                                        error={touched.ageFrom && Boolean(errors.ageFrom)}
                                        helperText={touched.ageFrom && errors.ageFrom}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        label="Đến"
                                        type="number"
                                        fullWidth
                                        name="ageEnd"
                                        value={values.ageEnd}
                                        error={touched.ageEnd && Boolean(errors.ageEnd)}
                                        helperText={touched.ageEnd && errors.ageEnd}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ height: '300px' }}>
                                    <Typography variant="subtitle1" mb={1}>Nội dung chương trình học:</Typography>
                                    <ReactQuill
                                        theme="snow"
                                        value={values.description}
                                        onChange={(content) => setFieldValue('description', content)}
                                    />
                                    {touched.description && errors.description && (
                                        <Typography color="error" variant="body2" mt={1}>{errors.description}</Typography>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} justifyContent="center" mt={8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Grid item>
                                    <Button variant="outlined" onClick={handleClose}>Hủy</Button>
                                </Grid>
                                <Grid item>
                                    {/* {(initialData && isEditing) ? <Button disabled={false} variant="contained" color="primary" onClick={handleFormSubmit}>
                                        Cập nhật
                                    </Button> : <Button variant="contained" color="primary" onClick={handleFormSubmit}>
                                        Tạo
                                    </Button>} */}
                                    <Button variant="contained" color="primary" type="submit">
                                        {isEditing ? "Cập nhật" : "Tạo"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
}

export default CreateOrEditModal;
