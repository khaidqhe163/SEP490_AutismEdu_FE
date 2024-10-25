import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActionArea, CardContent, Grid, InputAdornment, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingComponent from '~/components/LoadingComponent';
import ExerciseUpdateModal from './ExerciseModal/ExerciseUpdateModal';
import DeleteConfirmationModal from './ExerciseModal/DeleteConfirmationModal';
import ExerciseCreation from './ExerciseModal/ExerciseCreation';

function ExerciseList({ selectedExerciseType, setShowExerciseList }) {
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedContent, setSelectedContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [openCreation, setOpenCreation] = useState(false);
    const [currentDeleteIndex, setCurrentDeleteIndex] = useState(null);

    const [pagination, setPagination] = useState({
        pageNumber: 1,
        pageSize: 10,
        totalPages: 10,
    });

    const exercises = [
        { ExerciseId: 1, ExerciseName: 'Bài tập phát âm 1', ExerciseTypeId: 1, ExerciseContent: 'Nội dung bài tập 1', TutorId: 1, CreatedDate: '2023-01-01', UpdatedDate: '2023-01-10' },
        { ExerciseId: 2, ExerciseName: 'Bài tập phát âm 2', ExerciseTypeId: 1, ExerciseContent: 'Nội dung bài tập 2', TutorId: 2, CreatedDate: '2023-02-01', UpdatedDate: '2023-02-10' },
        { ExerciseId: 3, ExerciseName: 'Bài tập nghe 1', ExerciseTypeId: 1, ExerciseContent: 'Nội dung bài tập nghe 1', TutorId: 1, CreatedDate: '2023-03-01', UpdatedDate: '2023-03-10' }
    ];

    useEffect(() => {
        const filtered = exercises
            .filter(exercise => exercise.ExerciseTypeId === selectedExerciseType.id && exercise.ExerciseName.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => (sortOrder === 'asc' ? new Date(a.CreatedDate) - new Date(b.CreatedDate) : new Date(b.CreatedDate) - new Date(a.CreatedDate)));
        setFilteredExercises(filtered);
    }, [search, sortOrder, selectedExerciseType]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleOpenDialog = (content) => {
        setSelectedContent(content);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedContent('');
    };

    const handleOpenEditDialog = (exercise) => {
        setSelectedExercise(exercise);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setSelectedExercise(null);
    };

    const handlePageChange = (event, value) => {
        setPagination({ ...pagination, pageNumber: value });
    };

    const handleOpenDelete = (index) => {
        setCurrentDeleteIndex(index);
        setOpenDeleteConfirm(true);
    }

    const handleDeleteExercise = () => {
        const newExercise = filteredExercises.filter((exercise) => exercise.ExerciseId !== currentDeleteIndex);
        setFilteredExercises(newExercise);
        console.table(newExercise)
        console.log('Xoá thành công!');
        setOpenDeleteConfirm(false);
    }

    const totalPages = Math.ceil(pagination.totalPages / pagination.pageSize);

    return (
        <Stack direction='column' sx={{ width: "90%", margin: "auto", gap: 2 }}>
            <Box sx={{ display: 'flex' }}>
                <Button mb={2} variant='contained' startIcon={<ArrowBackIcon />} onClick={() => setShowExerciseList(false)}>Quay lại</Button>
            </Box>
            <Typography variant='h4' textAlign={'center'} my={2}>Danh sách bài tập</Typography>

            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mb={2}>
                <TextField
                    size='small'
                    label="Tìm kiếm"
                    value={search}
                    onChange={handleSearch}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ backgroundColor: '#fff', borderRadius: '4px', width: '50%' }}
                />

                <Box sx={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }} gap={2}>
                    <FormControl fullWidth size='small' sx={{ width: '40%' }}>
                        <InputLabel id="sort-select-label">Thứ tự</InputLabel>
                        <Select
                            value={sortOrder}
                            onChange={handleSortChange}
                            size='small'
                            label='Thứ tự'
                            sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                        >
                            <MenuItem value="asc">Tăng dần theo ngày</MenuItem>
                            <MenuItem value="desc">Giảm dần theo ngày</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant='contained' color='primary' onClick={() => setOpenCreation(true)}>Tạo bài tập</Button>
                </Box>

            </Box>

            <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>STT</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Tên bài tập</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nội dung</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Ngày tạo</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredExercises.map((exercise, index) => (
                            <TableRow key={exercise.ExerciseId} hover>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{exercise.ExerciseName}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                                        <Box sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: 350
                                        }}>
                                            {exercise.ExerciseContent}
                                        </Box>
                                        {exercise.ExerciseContent.length > 55 && (
                                            <Button
                                                variant="text"
                                                size="small"
                                                onClick={() => handleOpenDialog(exercise.ExerciseContent)}
                                                sx={{ textTransform: 'none', color: 'primary.main' }}
                                            >
                                                Xem thêm
                                            </Button>
                                        )}
                                    </Box>
                                </TableCell>
                                <TableCell>{new Date(exercise.CreatedDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" aria-label="chỉnh sửa" onClick={() => handleOpenEditDialog(exercise)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" aria-label="xoá" onClick={() => handleOpenDelete(exercise.ExerciseId)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                <Pagination
                    count={totalPages}
                    page={pagination.pageNumber}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Stack>

            <LoadingComponent open={loading} setOpen={setLoading} />

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle textAlign={'center'}>Nội dung bài tập</DialogTitle>
                <DialogContent>
                    <Typography>{selectedContent}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Đóng</Button>
                </DialogActions>
            </Dialog>

            <ExerciseCreation open={openCreation} handleClose={() => setOpenCreation(false)} />
            <ExerciseUpdateModal openEditDialog={openEditDialog} handleCloseEditDialog={handleCloseEditDialog} selectedExercise={selectedExercise} />
            <DeleteConfirmationModal open={openDeleteConfirm} handleClose={() => { setOpenDeleteConfirm(false) }} handleDelete={handleDeleteExercise} />
        </Stack>
    );
}

export default ExerciseList;
