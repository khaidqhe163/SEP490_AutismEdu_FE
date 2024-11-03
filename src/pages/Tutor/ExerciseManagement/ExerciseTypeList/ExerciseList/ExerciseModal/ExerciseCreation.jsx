import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, Typography, Divider } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import services from '~/plugins/services';
import { enqueueSnackbar } from 'notistack';
import LoadingComponent from '~/components/LoadingComponent';

function ExerciseCreation({ setExercises, exerciseType, open, handleClose }) {
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object({
        exerciseName: Yup.string()
            .required("Tên bài tập là bắt buộc")
            .min(3, "Tên bài tập phải có ít nhất 3 ký tự"),
        description: Yup.string()
            .required("Nội dung là bắt buộc")
            .min(5, "Nội dung phải có ít nhất 5 ký tự"),
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
                await services.ExerciseManagementAPI.createExercise(exerciseData, (res) => {
                    if (res?.result) {
                        const newExercise = res.result;
                        setExercises((prev) => [newExercise, ...prev]);
                        enqueueSnackbar("Tạo bài tập thành công!", { variant: 'success' });
                        handleClose();
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
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle variant='h5' textAlign={'center'}>Tạo bài tập</DialogTitle>
            <Divider />
            <DialogContent>
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
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                size="small"
                                multiline
                                rows={4}
                                name='description'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Hủy</Button>
                <Button onClick={formik.handleSubmit} color="primary" variant="contained">Tạo</Button>
            </DialogActions>
            <LoadingComponent open={loading} setOpen={setLoading} />
        </Dialog>
    );
}

export default ExerciseCreation;
