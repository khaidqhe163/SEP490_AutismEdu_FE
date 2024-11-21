import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Typography, Divider, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import services from '~/plugins/services';
import { enqueueSnackbar } from 'notistack';
import LoadingComponent from '~/components/LoadingComponent';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function ExerciseCreation({ setExercises, exerciseType, open, handleClose }) {
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
            exerciseName: "",
            description: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const exerciseData = {
                    ...values,
                    exerciseTypeId: exerciseType?.id,
                    originalId: 0
                };
                console.log(exerciseData);

                await services.ExerciseManagementAPI.createExercise(exerciseData, (res) => {
                    if (res?.result) {
                        const newExercise = res.result;
                        setExercises((prev) => [newExercise, ...prev]);
                        enqueueSnackbar("Tạo bài tập thành công!", { variant: 'success' });
                        handleClose();
                    }
                }
                , (error) => {
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
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle variant='h5' textAlign={'center'}>Tạo bài tập</DialogTitle>
            <Divider />
            <DialogContent sx={{ height: '500px' }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Typography variant="body1" fontWeight={600} textAlign={'right'}>Tên loại bài tập:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body1">{exerciseType?.exerciseTypeName}</Typography>
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
                        <Grid item xs={8} sx={{ height: '350px' }}>
                                <ReactQuill
                                    theme="snow"
                                    modules={{ toolbar: toolbarOptions }}
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
                <Button onClick={handleClose} color="primary" variant='outlined'>Hủy</Button>
                <Button onClick={formik.handleSubmit} color="primary" variant="contained" disabled={!formik.isValid || formik.isSubmitting}>Tạo</Button>
            </DialogActions>
            <LoadingComponent open={loading} setOpen={setLoading} />
        </Dialog>
    );
}

export default ExerciseCreation;
