import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Typography, Divider, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import services from '~/plugins/services';
import { enqueueSnackbar } from 'notistack';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function ExerciseUpdateModal({ exercises, setExercises, openEditDialog, handleCloseEditDialog, selectedExercise, setSelectedExercise, exerciseTypeName, selectedExerciseType }) {
    const [loading, setLoading] = useState(false);

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
    ];

    const quillEditorStyle = {
        height: '250px',
        marginBottom: '100px'
    };

    const validationSchema = Yup.object({
        exerciseName: Yup.string()
            .required("Tên bài tập là bắt buộc")
            .min(3, "Tên bài tập phải có ít nhất 3 ký tự"),
        description: Yup.string()
            .required("Nội dung là bắt buộc")
            .test(
                'is-not-empty',
                'Nội dung phải có ít nhất 5 ký tự',
                (value) => {
                    const strippedContent = (value || '').replace(/<(.|\n)*?>/g, '').trim();
                    return strippedContent.length >= 5;
                }
            ),
    });

    const formik = useFormik({
        initialValues: {
            exerciseName: selectedExercise?.exerciseName || '',
            description: selectedExercise?.description || '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const dataUpdate = {
                    exerciseName: values.exerciseName,
                    description: values.description,
                    exerciseTypeId: selectedExerciseType.id,
                    originalId: selectedExercise?.id
                };
                await services.ExerciseManagementAPI.createExercise(dataUpdate, (res) => {
                    if (res?.result) {
                        const indexExercise = exercises.findIndex((e) => e.id === selectedExercise.id);
                        exercises.splice(indexExercise, 1, res.result);
                        enqueueSnackbar("Chỉnh sửa bài tập thành công!", { variant: 'success' });
                        handleCloseEditDialog();
                    }
                }, (error) => {
                    console.log(error);
                });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
            <DialogTitle variant='h5' textAlign={'center'}>Chỉnh sửa bài tập</DialogTitle>
            <Divider />
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Typography variant="body1" fontWeight={600} textAlign={'right'}>Tên loại bài tập:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body1">{selectedExerciseType?.exerciseTypeName}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1" fontWeight={600} textAlign={'right'}>Tên bài tập:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                size="small"
                                name='exerciseName'
                                value={formik.values.exerciseName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.exerciseName && Boolean(formik.errors.exerciseName)}
                                helperText={formik.touched.exerciseName && formik.errors.exerciseName}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="body1" fontWeight={600} textAlign={'right'}>Nội dung:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <ReactQuill
                                theme="snow"
                                modules={{ toolbar: toolbarOptions }}
                                style={quillEditorStyle}
                                value={formik.values.description}
                                onChange={(value) => formik.setFieldValue('description', value)}
                                onBlur={() => formik.setFieldTouched('description', true)}
                            />
                            {formik.touched.description && formik.errors.description && (
                                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                    {formik.errors.description}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseEditDialog} color="primary">Hủy</Button>
                <LoadingButton
                    onClick={formik.handleSubmit}
                    loading={loading}
                    variant="contained"
                    color="primary"
                    disabled={!formik.dirty || !formik.isValid}
                >
                    Lưu
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}

export default ExerciseUpdateModal;
