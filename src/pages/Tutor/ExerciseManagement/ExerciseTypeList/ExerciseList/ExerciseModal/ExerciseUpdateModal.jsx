import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActionArea, CardContent, Grid, InputAdornment, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Pagination, Divider } from '@mui/material';
import services from '~/plugins/services';
import { enqueueSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';


function ExerciseUpdateModal({ exercises, setExercises, openEditDialog, handleCloseEditDialog, selectedExercise, setSelectedExercise, exerciseTypeName, selectedExerciseType }) {
    console.log(selectedExercise);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        try {
            setLoading(true);
            const dataUpdate = {
                exerciseName: selectedExercise?.exerciseName,
                description: selectedExercise?.description,
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
            })

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    const handleChangeExercise = (e) => {
        const { name, value } = e.target;
        setSelectedExercise((prev) => ({ ...prev, [name]: value }));
    }
    return (
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
            <DialogTitle variant='h5' textAlign={'center'}>Chỉnh sửa bài tập</DialogTitle>
            <Divider />
            <DialogContent>
                {selectedExercise && (
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
                                value={selectedExercise.exerciseName}
                                onChange={handleChangeExercise}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="body1" fontWeight={600} textAlign={'right'}>Nội dung:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                name='description'
                                size="small"
                                multiline
                                rows={4}
                                value={selectedExercise.description}
                                onChange={handleChangeExercise}
                            />
                        </Grid>
                    </Grid>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseEditDialog} color="primary">Hủy</Button>
                <LoadingButton
                    onClick={handleSave}
                    loading={loading}
                    variant="contained"
                    color='primary'
                >
                    Lưu
                </LoadingButton>
                {/* <Button onClick={handleSave} color="primary" variant="contained">{loading ? '' : 'Lưu'}</Button> */}
            </DialogActions>
        </Dialog>
    )
}

export default ExerciseUpdateModal