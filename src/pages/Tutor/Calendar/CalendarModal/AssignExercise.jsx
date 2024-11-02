import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Modal, Select, Stack, Typography, Grid } from '@mui/material';
import LoadingComponent from '~/components/LoadingComponent';
import services from '~/plugins/services';

function AssignExercise({ isOpen, setModalOpen, schedule }) {
    const [ageGroup, setAgeGroup] = useState('');
    const [exerciseType, setExerciseType] = useState('');
    const [exercise, setExercise] = useState('');
    const [listSyllabus, setListSyllabus] = useState([]);
    const [listExerciseType, setListExerciseType] = useState([]);
    const [listExercise, setListExercise] = useState([]);
    const [loading, setLoading] = useState(false);

    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(":");
        return `${hours}:${minutes}`;
    }

    const onClose = () => {
        setAgeGroup('');
        setExerciseType('');
        setExercise('');
        setModalOpen(false);
    };

    useEffect(() => {
        handleGetAllSyllabus();
    }, []);

    const handleGetAllSyllabus = async () => {
        try {
            setLoading(true);
            await services.SyllabusManagementAPI.getListSyllabus(
                (res) => {
                    if (res?.result) {
                        setListSyllabus(res.result);
                    }
                },
                (error) => console.log(error),
                { orderBy: 'ageFrom', sort: 'asc', pageNumber: 1 }
            );
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (ageGroup) {
            const eTypeData = listSyllabus.find((s) => s.ageFrom === ageGroup)?.exerciseTypes || [];
            setListExerciseType(eTypeData);
            setExerciseType('');
            setExercise('');
        }
    }, [ageGroup]);

    useEffect(() => {
        if (exerciseType) {
            const eData = listExerciseType.find((e) => e.id === exerciseType)?.exercises || [];
            setListExercise(eData);
            setExercise('');
        }
    }, [exerciseType]);

    const handleSubmit = () => {
        console.log({
            "id": schedule?.id,
            ageGroup,
            "exerciseId": exercise,
            "exerciseTypeId": exerciseType
        });
    }

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 500, bgcolor: 'background.paper', p: 4, boxShadow: 24, borderRadius: 2,
            }}>
                {loading && (
                    <LoadingComponent open={loading} />
                )}
                <Typography variant="h5" sx={{ mb: 1, textAlign: 'center' }}>Gán bài tập</Typography>
                <Divider />
                <Stack spacing={2} sx={{ my: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={5}>
                            <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>Mã học sinh:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant='subtitle1'>{schedule.studentProfile.studentCode}</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>Tên học sinh:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant='subtitle1'><em>{schedule.studentProfile.name}</em></Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>Ngày học:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant='subtitle1'>{new Date(schedule.scheduleDate).toLocaleDateString()}</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>Khung thời gian:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant='subtitle1'>{formatTime(schedule.start)} - {formatTime(schedule.end)}</Typography>
                        </Grid>
                        <Grid item xs={12} mt={1}>
                            <FormControl variant="standard" fullWidth size="small" sx={{ mb: 2 }}>
                                <InputLabel>Độ tuổi</InputLabel>
                                <Select
                                    value={ageGroup}
                                    onChange={(e) => setAgeGroup(e.target.value)}
                                    sx={{ borderRadius: '8px' }}
                                >
                                    {listSyllabus?.map((s, index) => (
                                        <MenuItem value={s.ageFrom} key={index}>Từ {s.ageFrom} - {s.ageEnd}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="standard" fullWidth size="small" sx={{ mb: 2 }} disabled={!ageGroup}>
                                <InputLabel>Loại bài tập</InputLabel>
                                <Select
                                    value={exerciseType}
                                    onChange={(e) => setExerciseType(e.target.value)}
                                    sx={{ borderRadius: '8px' }}
                                >
                                    {listExerciseType?.map((t, index) => (
                                        <MenuItem value={t.id} key={index}>{t.exerciseTypeName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="standard" fullWidth size="small" disabled={!exerciseType}>
                                <InputLabel>Bài tập</InputLabel>
                                <Select
                                    value={exercise}
                                    onChange={(e) => setExercise(e.target.value)}
                                    sx={{ borderRadius: '8px' }}
                                >
                                    {listExercise?.map((e, index) => (
                                        <MenuItem value={e.id} key={index}>{e.exerciseName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Stack>

                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                    <Button variant="outlined" onClick={onClose} sx={{ px: 3 }}>Huỷ</Button>
                    <Button variant="contained" color="primary" disabled={!exercise} sx={{ px: 3 }} onClick={handleSubmit}>Lưu</Button>
                </Stack>
            </Box>
        </Modal>
    );
}

export default AssignExercise;
