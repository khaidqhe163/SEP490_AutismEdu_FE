import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActionArea, CardContent, Grid, InputAdornment, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Pagination, Divider } from '@mui/material';
import { original } from '@reduxjs/toolkit';
import services from '~/plugins/services';
import { enqueueSnackbar } from 'notistack';
import LoadingComponent from '~/components/LoadingComponent';


function ExerciseCreation({ setExercises, exerciseType, open, handleClose }) {
    const [loading, setLoading] = useState(false);
    const [exerciseData, setExerciseData] = useState({
        exerciseName: "",
        description: "",
        exerciseTypeId: exerciseType?.id,
        originalId: 0
    });

    const handleChangeData = (e) => {
        const { name, value } = e.target;
        setExerciseData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await services.ExerciseManagementAPI.createExercise(exerciseData, (res) => {
                if (res?.result) {
                    const newExercise = res.result;
                    setExercises((prev) => [newExercise, ...prev]);
                    enqueueSnackbar("Tạo bài tập thành công!", { variant: 'success' })
                    handleClose();
                }
            }, (error) => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle variant='h5' textAlign={'center'}>Tạo bài tập</DialogTitle>
            <Divider />
            <DialogContent>
                {(
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
                                value={exerciseData.exerciseName}
                                onChange={handleChangeData}
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
                                value={exerciseData.description}
                                onChange={handleChangeData}
                            />
                        </Grid>
                    </Grid>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Hủy</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">Tạo</Button>
            </DialogActions>
            <LoadingComponent open={loading} setOpen={setLoading} />

        </Dialog>
    )
}

export default ExerciseCreation