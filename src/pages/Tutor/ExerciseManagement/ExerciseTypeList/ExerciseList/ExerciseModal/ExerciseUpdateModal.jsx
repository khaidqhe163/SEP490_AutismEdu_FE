import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActionArea, CardContent, Grid, InputAdornment, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Pagination, Divider } from '@mui/material';


function ExerciseUpdateModal({openEditDialog, handleCloseEditDialog, selectedExercise, setSelectedExercise}) {
  return (
    <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
    <DialogTitle variant='h5' textAlign={'center'}>Chỉnh sửa bài tập</DialogTitle>
    <Divider/>
    <DialogContent>
        {selectedExercise && (
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
                        value={selectedExercise.ExerciseName}
                        onChange={(e) => setSelectedExercise({ ...selectedExercise, ExerciseName: e.target.value })}
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
                        value={selectedExercise.ExerciseContent}
                        onChange={(e) => setSelectedExercise({ ...selectedExercise, ExerciseContent: e.target.value })}
                    />
                </Grid>
            </Grid>
        )}
    </DialogContent>
    <DialogActions>
        <Button onClick={handleCloseEditDialog} color="primary">Hủy</Button>
        <Button onClick={() => console.log(selectedExercise)} color="primary" variant="contained">Lưu</Button>
    </DialogActions>
</Dialog>
  )
}

export default ExerciseUpdateModal