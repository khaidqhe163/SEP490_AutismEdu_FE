import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Modal, Select, Stack, Typography, Grid } from '@mui/material';
import LoadingComponent from '~/components/LoadingComponent';
import services from '~/plugins/services';
import { enqueueSnackbar } from 'notistack';

function AssignExercise({ isOpen, setModalOpen, schedule, filterSchedule, setFilterSchedule, selectedKey }) {
    const [syllabusId, setSyllabusId] = useState('');
    const [exerciseType, setExerciseType] = useState('');
    const [exercise, setExercise] = useState('');
    const [listSyllabus, setListSyllabus] = useState([]);
    const [listExerciseType, setListExerciseType] = useState([]);
    const [listExercise, setListExercise] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const [isValidate, setValidate] = useState(true);

    // console.log(listSyllabus);
    // console.log(schedule);

    useEffect(() => {
        if (listSyllabus?.length !== 0 && schedule?.syllabusId && schedule?.exerciseType && schedule?.exercise) {
            const existSyllabus = listSyllabus.find((s) => s.id === schedule?.syllabusId);

            if (!existSyllabus) {
                const newSyllabus = {
                    id: schedule.syllabusId, 
                    ageFrom: schedule.ageFrom,
                    ageEnd: schedule.ageEnd,
                    exerciseTypes: [
                        {
                            id: schedule.exerciseType.id,
                            exerciseTypeName: schedule.exerciseType.exerciseTypeName,
                            exercises: [
                                {
                                    id: schedule.exercise.id,
                                    exerciseName: schedule.exercise.exerciseName,
                                    description: schedule.exercise.description,
                                    createdDate: schedule.exercise.createdDate,
                                    updatedDate: schedule.exercise.updatedDate,
                                },
                            ], 
                        },
                    ],
                };

                const newListSyllabus = [...listSyllabus, newSyllabus];

                setListSyllabus(newListSyllabus);
            } else {

                const existExerciseType = existSyllabus.exerciseTypes.find((t) => t.id === schedule?.exerciseType?.id);

                if (!existExerciseType) {
                    const newExerciseType = {
                        id: schedule.exerciseType.id,
                        exerciseTypeName: schedule.exerciseType.exerciseTypeName,
                        exercises: [
                            {
                                id: schedule.exercise.id,
                                exerciseName: schedule.exercise.exerciseName,
                                description: schedule.exercise.description,
                                createdDate: schedule.exercise.createdDate,
                                updatedDate: schedule.exercise.updatedDate,

                            },
                        ], 
                    };

                    const newListSyllabus = listSyllabus.map((s) => {
                        if (s.id === schedule.syllabusId) {
                            return {
                                ...s,
                                exerciseTypes: [...s.exerciseTypes, newExerciseType],
                            };
                        }
                        return s;
                    });

                    setListSyllabus(newListSyllabus);
                } else {
                    const existExercise = existExerciseType.exercises.find((e) => e.id === schedule?.exercise?.id);

                    if (!existExercise) {
                        const newExercise = {
                            id: schedule.exercise.id,
                            exerciseName: schedule.exercise.exerciseName,
                            description: schedule.exercise.description,
                            createdDate: schedule.exercise.createdDate,
                            updatedDate: schedule.exercise.updatedDate,

                        };

                        const newListSyllabus = listSyllabus.map((s) => {
                            if (s.id === schedule.syllabusId) {
                                return {
                                    ...s,
                                    exerciseTypes: s.exerciseTypes.map((et) => {
                                        if (et.id === schedule.exerciseType.id) {
                                            return {
                                                ...et,
                                                exercises: [...et.exercises, newExercise],
                                            };
                                        }
                                        return et;
                                    }),
                                };
                            }
                            return s;
                        });

                        setListSyllabus(newListSyllabus);
                    }
                }
            }
        }
    }, [listSyllabus, schedule]);


    useEffect(() => {
        handleGetAllSyllabus();
    }, []);

    useEffect(() => {
        if (schedule) {
            setSyllabusId(schedule.syllabusId || '');
            setExerciseType(schedule.exerciseType?.id || '');
            setExercise(schedule.exercise?.id || '');
            setInitialized(true);
        }
    }, [schedule]);

    useEffect(() => {
        if (syllabusId) {
            const eTypeData = listSyllabus.find((s) => s.id === syllabusId)?.exerciseTypes || [];
            setListExerciseType(eTypeData);

            if (!initialized) {
                setExerciseType('');
                setExercise('');
            }
        }
    }, [syllabusId, initialized, listSyllabus]);

    useEffect(() => {
        if (exerciseType) {
            const eData = listExerciseType.find((e) => e.id === exerciseType)?.exercises || [];
            setListExercise(eData);

            if (!initialized) {
                setExercise('');
            }
        }
    }, [exerciseType, initialized, listExerciseType]);

    console.log({
        syllabusId,
        exerciseType,
        exercise
    });

    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(":");
        return `${hours}:${minutes}`;
    }

    const onClose = () => {
        setSyllabusId('');
        setExerciseType('');
        setExercise('');
        setModalOpen(false);
    };


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
                { orderBy: 'ageFrom', sort: 'asc' }
            );
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = async () => {
        try {
            setLoading(true);
            await services.ScheduleAPI.updateAssignExercises(schedule?.id, {
                "id": schedule?.id,
                syllabusId,
                "exerciseId": exercise,
                "exerciseTypeId": exerciseType
            }, (res) => {
                if (res?.result) {
                    console.log(filterSchedule);

                    const updateData = filterSchedule[selectedKey].map((s) => {
                        if (s.id === res.result?.id) {
                            s = res.result;
                            return s;
                        } else {
                            return s;
                        }
                    });
                    console.log(updateData);

                    setFilterSchedule((prev) => ({ ...prev, [selectedKey]: updateData }));
                    enqueueSnackbar("Gán bài tập thành công!", { variant: 'success' });
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
    // console.log(schedule);

    useEffect(() => {
        if (schedule) {
            const isDisable = syllabusId === schedule?.syllabusId && exerciseType === schedule?.exerciseType?.id && exercise === schedule?.exercise?.id;
            setValidate(isDisable);
        }
    }, [syllabusId, exerciseType, exercise, schedule]);

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
                            <Typography variant='subtitle1'>{schedule.studentProfile?.studentCode}</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>Tên học sinh:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant='subtitle1'><em>{schedule.studentProfile?.name}</em></Typography>
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
                                    value={syllabusId}
                                    onChange={(e) => setSyllabusId(e.target.value)}
                                    sx={{ borderRadius: '8px' }}
                                >
                                    {listSyllabus?.map((s, index) => (
                                        <MenuItem value={s.id} key={index}>Từ {s.ageFrom} - {s.ageEnd}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="standard" fullWidth size="small" sx={{ mb: 2 }} disabled={!syllabusId}>
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
                    <Button variant="contained" color="primary" sx={{ px: 3 }} onClick={handleSubmit} disabled={isValidate}>Lưu</Button>
                </Stack>
            </Box>
        </Modal>
    );
}

export default AssignExercise;
