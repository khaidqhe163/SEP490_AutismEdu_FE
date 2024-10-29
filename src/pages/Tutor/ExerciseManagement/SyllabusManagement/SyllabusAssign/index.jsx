import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Stack, Typography, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Checkbox, FormControl, InputLabel, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExerciseAdd from '../SyllabusModal/ExerciseAdd';
import services from '~/plugins/services';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoadingComponent from '~/components/LoadingComponent';
import { enqueueSnackbar } from 'notistack';


export default function SyllabusAssign({ handleBack, selectedAssign, setListSyllabus }) {
    console.log(selectedAssign);

    const [loading, setLoading] = useState(false);

    const [exerciseTypes, setExerciseTypes] = useState([]);

    const [selectedList, setSelectedList] = useState([]);


    const [syllabusData, setSyllabusData] = useState({
        id: selectedAssign?.id,
        ageFrom: selectedAssign?.ageFrom,
        ageEnd: selectedAssign?.ageEnd,
        syllabusExercises: []
    });
    console.log(syllabusData);


    const [selectedClone, setSelectedClone] = useState([]);


    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        handleGetAllExerciseType()
    }, []);

    const handleGetAllExerciseType = async () => {
        try {
            await services.ExerciseManagementAPI.getAllExerciseType((res) => {
                if (res?.result) {
                    setExerciseTypes(res.result);
                }
            }, (error) => {
                console.log(error);

            }, { search: '', orderBy: 'createdDate', sort: 'desc' });
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    const handleSubmitSyllabus = async () => {
        console.log('Submited!');
        try {
            setLoading(true);
            const data = { ...syllabusData, syllabusExercises: [...selectedList] };
            await services.SyllabusManagementAPI.assignExerciseSyllabus(selectedAssign?.id, data, (res) => {
                if (res?.result) {
                    setListSyllabus((prev) => {
                        const updateData = prev.map((p) => {
                            if (p.id === res.result?.id) {
                                p.exerciseTypes = res.result?.exerciseTypes;
                                return p;
                            } else {
                                return p;
                            }
                        });
                        return updateData;
                    });
                }
                enqueueSnackbar("Gán bài tập thành công!", { variant: 'success' });
                setSelectedClone([]);
                setSelectedList([]);
                setSyllabusData({
                    id: selectedAssign?.id,
                    ageFrom: selectedAssign?.ageFrom,
                    ageEnd: selectedAssign?.ageEnd,
                    syllabusExercises: []
                });
            }, (error) => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    console.table(selectedClone);


    console.table(selectedList);

    return (
        <Stack direction={'column'} gap={3} sx={{ width: "80%", margin: "auto", padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
            <Typography variant='h4' my={2} textAlign="center" sx={{ fontWeight: 'bold' }}>Gán bài tập vào giáo trình</Typography>
            <Divider />
            <Grid container spacing={2} alignItems="center" mt={2}>
                <Grid item xs={4}>
                    <Typography variant='h6' sx={{ textAlign: 'right', pr: 2 }}>Độ tuổi:</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                disabled={syllabusData.ageFrom}
                                name='ageFrom'
                                label="Từ"
                                type="number"
                                size="small"
                                value={syllabusData.ageFrom}
                                fullWidth
                                InputLabelProps={{
                                    shrink: !!syllabusData.ageFrom,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                disabled={syllabusData.ageEnd}
                                name='ageEnd'
                                label="Đến"
                                type="number"
                                size="small"
                                value={syllabusData.ageEnd}
                                fullWidth
                                InputLabelProps={{
                                    shrink: !!syllabusData.ageFrom,
                                }}
                            />
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Typography variant='h6' sx={{ textAlign: 'right', pr: 2 }}>Thêm loại bài tập và bài tập</Typography>
                </Grid>
                <Grid item xs={8}>
                    <IconButton onClick={handleOpenModal} color="primary" sx={{ backgroundColor: '#f5f7f8', borderRadius: '50%', padding: 1 }}>
                        <AddIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    {selectedClone.length !== 0 && (
                        <Box sx={{ width: '85%', margin: 'auto' }} p={2} borderRadius={2} bgcolor={'#fff8e3'}>
                            <Typography variant='h6' mb={2}>Danh sách loại bài tập và bài tập:</Typography>
                            <Stack direction={'row'}>
                                <Stack sx={{ width: '90%' }} direction={'column'} gap={2}>
                                    {selectedClone?.map((s, index) => (
                                        <>
                                            <Stack direction={'row'} gap={2} sx={{ width: '100%%' }}>
                                                <Box sx={{ width: "5%" }}>
                                                    <CheckCircleIcon color='success' fontSize='medium' />
                                                </Box>
                                                <Box key={index} sx={{ width: '95%' }}>
                                                    <Typography variant='h6'>{`${index + 1}. `}{s.eType.exerciseTypeName}</Typography>
                                                    <Box ml={2}>
                                                        {s?.lsExercise?.map((l, index) => (
                                                            <Typography key={index} variant='body1'>{`${index + 1}. `}{l?.exerciseName}</Typography>
                                                        ))}
                                                    </Box>
                                                </Box>

                                            </Stack>

                                        </>
                                    ))}
                                </Stack>
                                <Box sx={{ width: "10%", display: "flex", alignItems: "end" }}>
                                    <img src='https://cdn-icons-png.freepik.com/256/4295/4295914.png?semt=ais_hybrid'
                                        style={{ width: "100%", objectFit: "cover", objectPosition: "center" }}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                    )}


                </Grid>
            </Grid>

            <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
                <Button color="primary" variant="outlined" onClick={handleBack}>Hủy</Button>
                <Button color="primary" variant="contained" sx={{ width: 100 }} onClick={handleSubmitSyllabus}>Lưu</Button>
            </Stack>

            <LoadingComponent open={loading} setOpen={setLoading} />

            {openModal && <ExerciseAdd openModal={openModal} handleCloseModal={handleCloseModal} exerciseTypes={exerciseTypes} selectedList={selectedList} setSelectedList={setSelectedList} selectedClone={selectedClone} setSelectedClone={setSelectedClone} />}
        </Stack>
    );
}