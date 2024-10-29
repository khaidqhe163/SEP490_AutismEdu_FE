import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActionArea, CardContent, Grid, InputAdornment, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Pagination, Divider } from '@mui/material';
import services from '~/plugins/services';


function ExerciseUpdateModal({ openEditDialog, handleCloseEditDialog, selectedExercise, setSelectedExercise, exerciseTypeName }) {
    const handleSave = async () => {
        try {
            // await services.ExerciseManagementAPI

        } catch (error) {
            console.log(error);
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
                            <Typography variant="body1">{exerciseTypeName}</Typography>
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
                <Button onClick={handleSave} color="primary" variant="contained">Lưu</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ExerciseUpdateModal