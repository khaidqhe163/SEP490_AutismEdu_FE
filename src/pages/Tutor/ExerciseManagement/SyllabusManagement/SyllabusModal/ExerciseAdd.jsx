import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Checkbox, FormControl, InputLabel, Stack, Typography } from '@mui/material';
import services from '~/plugins/services';

function ExerciseAdd({ openModal, handleCloseModal, exerciseTypes, selectedList, setSelectedList, selectedClone, setSelectedClone }) {
    const [newData, setNewData] = useState({
        exerciseTypeId: 0,
        exerciseIds: []
    });

    console.log(newData);


    const [exercises, setExercises] = useState([]);

    console.log(exerciseTypes);

    useEffect(() => {

        if (exerciseTypes.length > 0 && !newData.exerciseTypeId) {
            const exist = selectedList?.find((s) => s.exerciseTypeId === exerciseTypes[29].id);
            if (exist) {
                setNewData({
                    exerciseTypeId: exerciseTypes[29].id,
                    exerciseIds: exist.exerciseIds
                });
            } else {
                setNewData(prev => ({
                    ...prev,
                    exerciseTypeId: exerciseTypes[29].id
                }));
            }

        }
    }, [exerciseTypes]);

    useEffect(() => {
        if (newData.exerciseTypeId !== 0) {
            const exist = selectedList?.find((s) => s.exerciseTypeId === newData.exerciseTypeId);
            if (exist) {
                setNewData((prev) => ({
                    ...prev,
                    exerciseIds: exist.exerciseIds
                }));
            }
            handleGetExerciseByType();

        }
    }, [newData.exerciseTypeId]);

    const handleGetExerciseByType = async () => {
        try {
            await services.ExerciseManagementAPI.getExerciseByType(newData.exerciseTypeId, (res) => {
                if (res?.result) {
                    setExercises(res.result);
                }
            }, (error) => {
                console.log(error);
            }, { search: '', orderBy: 'createdDate', sort: 'desc' });
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeData = (e) => {
        const { name, value, checked } = e.target;

        if (name === 'exerciseTypeId') {
            setNewData({ [name]: value, exerciseIds: [] });
        } else if (name === 'exerciseIds') {
            const exerciseId = parseInt(value);

            setNewData((prev) => {
                const { exerciseIds } = prev;

                if (checked) {
                    return { ...prev, exerciseIds: [...exerciseIds, exerciseId] };
                } else {
                    return { ...prev, exerciseIds: exerciseIds.filter(id => id !== exerciseId) };
                }
            });
        }
    };

    const handleAdd = () => {
        const checkExist = selectedList.some((s) => s.exerciseTypeId === newData.exerciseTypeId);
        if (checkExist) {
            const indexOfExist = selectedList.findIndex((s) => s.exerciseTypeId === newData.exerciseTypeId);
            const newList = selectedList.map((s) => {
                if (s.exerciseTypeId === newData.exerciseTypeId) {
                    s.exerciseIds = newData.exerciseIds;
                    const newEIds = exercises.filter((e) => newData.exerciseIds.includes(e.id));
                    const newListClone = selectedClone.map((s, index) => {
                        if (index === indexOfExist) {
                            s.lsExercise = newEIds;
                            return s;
                        } else {
                            return s;
                        }
                    });
                    setSelectedClone(newListClone);
                    return s;
                } else {
                    return s;
                }
            });
            // const newC = selectedClone?.map((s, index) => {
            //     if (index === indexOfExist) {
            //         s.lsExercise
            //     }
            // })
            // const newClone = newList.map((l, index) => {
            //     const eType = exerciseTypes.find((e) => e.id === l.exerciseTypeId);
            //     const lsExercise = exercises.filter((e) => l.exerciseIds.includes(e.id));
            //     return {
            //         eType,
            //         lsExercise
            //     };
            // });
            // setSelectedClone(newClone);
            setSelectedList(newList);
        } else {
            const eType = exerciseTypes.find((e) => e.id === newData.exerciseTypeId);
            const lsExercise = exercises.filter((e) => newData.exerciseIds.includes(e.id));
            setSelectedClone((prev) => ([...prev, { eType, lsExercise }]));
            setSelectedList((prev) => ([...prev, newData]))
        }

        setNewData({
            exerciseTypeId: 0,
            exerciseIds: []
        });
        handleCloseModal();
    };

    return (
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
            <DialogTitle>Thêm loại bài tập và bài tập</DialogTitle>
            <DialogContent>
                <Stack spacing={3} mt={2}>
                    <FormControl fullWidth>
                        <InputLabel>Loại bài tập</InputLabel>
                        <Select
                            name="exerciseTypeId"
                            value={newData.exerciseTypeId}
                            onChange={handleChangeData}
                            label="Loại bài tập"
                            sx={{ backgroundColor: '#f3f4f6', borderRadius: 1 }}
                        >
                            {exerciseTypes.map((type) => (
                                <MenuItem key={type.id} value={type.id}>
                                    {type.exerciseTypeName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box>
                        <Typography variant="h6">Bài tập:</Typography>
                        {exercises.length === 0 ? 'Hiện không có bài tập nào!' : exercises.map(exercise => (
                            <Stack key={exercise.id} direction="row" alignItems="center">
                                <Checkbox
                                    name="exerciseIds"
                                    value={exercise.id}
                                    checked={newData.exerciseIds.includes(exercise.id)}
                                    onChange={handleChangeData}
                                />
                                <Typography>{exercise.exerciseName}</Typography>
                            </Stack>
                        ))}
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal} color="primary">Hủy</Button>
                <Button color="primary" variant="contained" onClick={handleAdd}>Thêm</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ExerciseAdd;
