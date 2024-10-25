import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActionArea, CardContent, Grid, InputAdornment, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Pagination, Divider } from '@mui/material';


function ExerciseCreation({ open, handleClose, id = 0 }) {

    const [exerciseData, setExerciseData] = useState({
        exerciseTypeId: id,
        exerciseName: "",
        exerciseContent: ""
    });

    const handleChangeData = (e) => {
        const { name, value } = e.target;
        setExerciseData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = () => {
        console.log(exerciseData);
        console.log('Tạo thành công!');
        setTimeout(() => handleClose(), 2000);
    }

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
                            <Typography variant="body1">Nay trẻ học gì</Typography>
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
                                name='exerciseContent'
                                value={exerciseData.exerciseContent}
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
        </Dialog>
    )
}

export default ExerciseCreation