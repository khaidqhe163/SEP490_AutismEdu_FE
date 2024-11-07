import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Stack, Typography, TextField, IconButton, Dialog, Divider, Icon } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import ExerciseAdd from '../SyllabusModal/ExerciseAdd';
import services from '~/plugins/services';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoadingComponent from '~/components/LoadingComponent';
import DeleteIcon from '@mui/icons-material/Delete';
import { enqueueSnackbar } from 'notistack';

export default function SyllabusCreation({ handleBack, setListSyllabus }) {
    const [loading, setLoading] = useState(false);
    const [exerciseTypes, setExerciseTypes] = useState([]);
    const [selectedList, setSelectedList] = useState([]);
    const [selectedClone, setSelectedClone] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const [ageFrom, setAgeFrom] = useState('');
    const [ageEnd, setAgeEnd] = useState('');


    useEffect(() => {
        handleGetAllExerciseType();
    }, []);

    useEffect(() => {
        formik.setFieldValue('ageFrom', ageFrom);
        formik.setFieldValue('ageEnd', ageEnd);
        formik.validateForm();
    }, [ageFrom, ageEnd]);


    const handleGetAllExerciseType = async () => {
        try {
            await services.ExerciseManagementAPI.getAllExerciseType(
                (res) => {
                    if (res?.result) {
                        setExerciseTypes(res.result);
                    }
                },
                (error) => console.log(error),
                { search: '', orderBy: 'createdDate', sort: 'desc' }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // Formik setup
    const formik = useFormik({
        initialValues: {
            ageFrom: ageFrom,
            ageEnd: ageEnd,
            syllabusExercises: selectedList,
        },
        validationSchema: Yup.object({
            ageFrom: Yup.number()
                .required('Bắt buộc phải nhập')
                .min(0, 'Tuổi phải lớn hơn 0'),
            ageEnd: Yup.number()
                .required('Bắt buộc phải nhập')
                .test(
                    'greater-than-ageFrom',
                    'Tuổi kết thúc phải lớn hơn tuổi bắt đầu',
                    function (value) {
                        const { ageFrom } = this.parent;
                        return value > ageFrom;
                    }
                ),
            syllabusExercises: Yup.array()
                .min(1, 'Phải có ít nhất 1 loại bài tập và bài tập'),
        }),

        onSubmit: async (values) => {
            try {
                setLoading(true);
                const data = { ...values, syllabusExercises: [...selectedList] };
                await services.SyllabusManagementAPI.createSyllabus(data, (res) => {
                    if (res?.result) {
                        setListSyllabus((prev) => [...prev, res.result].sort((a, b) => a.ageFrom - b.ageFrom));
                        enqueueSnackbar("Tạo giáo trình thành công!", { variant: 'success' });
                        setAgeFrom('');
                        setAgeEnd('');
                        setSelectedClone([]);
                        setSelectedList([]);
                        formik.resetForm();
                    }
                }, (error) => console.log(error));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        },
        enableReinitialize: true,
    });

    const handleAgeFromChange = (value) => {
        setAgeFrom(parseInt(value));
    };

    const handleAgeEndChange = (value) => {
        setAgeEnd(parseInt(value));
    };

    const handleDeleteItem = (id) => {
        console.log(id);

        const newList = selectedList.filter((s) => s.exerciseTypeId !== id);
        const newListClone = selectedClone.filter((s) => s.eType.id !== id);
        console.table(newListClone);

        setSelectedList(newList);
        setSelectedClone(newListClone);
    };

    return (
        <Stack direction="column" gap={3} sx={{ width: "80%", margin: "auto", padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h4" my={2} textAlign="center" sx={{ fontWeight: 'bold' }}>Tạo giáo trình</Typography>
            <Divider />
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2} alignItems="center" mt={2}>
                    <Grid item xs={4}>
                        <Typography variant="h6" sx={{ textAlign: 'right', pr: 2 }}>Độ tuổi:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    name="ageFrom"
                                    label="Từ"
                                    type="number"
                                    value={ageFrom}
                                    onChange={(e) => handleAgeFromChange(e.target.value)}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.ageFrom && Boolean(formik.errors.ageFrom)}
                                    helperText={formik.touched.ageFrom && formik.errors.ageFrom}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    name="ageEnd"
                                    label="Đến"
                                    type="number"
                                    value={ageEnd}
                                    onChange={(e) => handleAgeEndChange(e.target.value)}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.ageEnd && Boolean(formik.errors.ageEnd)}
                                    helperText={formik.touched.ageEnd && formik.errors.ageEnd}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography variant="h6" sx={{ textAlign: 'right', pr: 2 }}>Thêm loại bài tập và bài tập</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <IconButton onClick={handleOpenModal} color="primary" sx={{ backgroundColor: '#f5f7f8', borderRadius: '50%', padding: 1 }}>
                            <AddIcon />
                        </IconButton>
                        {formik.errors.syllabusExercises && (
                            <Typography color="error" variant="body2">
                                {formik.errors.syllabusExercises}
                            </Typography>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        {selectedClone.length > 0 && (
                            <Box sx={{ width: '85%', margin: 'auto' }} p={2} borderRadius={2} bgcolor={'#fff8e3'}>
                                <Typography variant="h6" mb={2}>Danh sách loại bài tập và bài tập:</Typography>
                                <Stack direction="row" gap={3}>
                                    <Stack sx={{ width: '90%' }} direction="column" gap={2}>
                                        {selectedClone.map((s, index) => (
                                            <Stack direction="row" gap={2} sx={{ width: '100%' }} key={index}>
                                                <Box sx={{ width: "5%" }}>
                                                    <CheckCircleIcon color="success" fontSize="medium" />
                                                </Box>
                                                <Box sx={{ width: '95%' }}>
                                                    <Typography variant="h6">{`${index + 1}. ${s.eType.exerciseTypeName}`}</Typography>
                                                    <Box ml={2}>
                                                        {s.lsExercise.map((l, idx) => (
                                                            <Typography key={idx} variant="body1">{`${idx + 1}. ${l.exerciseName}`}</Typography>
                                                        ))}
                                                    </Box>
                                                </Box>
                                                <Box sx={{ width: '5%' }}>
                                                    <IconButton color='error' onClick={() => handleDeleteItem(s.eType.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </Stack>
                                        ))}
                                    </Stack>
                                    <Box sx={{ width: "10%", display: "flex", alignItems: "end" }}>
                                        <img src="https://cdn-icons-png.freepik.com/256/4295/4295914.png?semt=ais_hybrid" style={{ width: "100%", objectFit: "cover", objectPosition: "center" }} />
                                    </Box>
                                </Stack>
                            </Box>
                        )}
                    </Grid>
                </Grid>

                <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
                    <Button color="primary" variant="outlined" onClick={handleBack}>Hủy</Button>
                    <Button type="submit" color="primary" variant="contained" sx={{ width: 100 }} disabled={!formik.isValid}>Lưu</Button>
                </Stack>
            </form>

            <LoadingComponent open={loading} setOpen={setLoading} />
            {openModal && <ExerciseAdd openModal={openModal} handleCloseModal={handleCloseModal} exerciseTypes={exerciseTypes} selectedList={selectedList} setSelectedList={setSelectedList} selectedClone={selectedClone} setSelectedClone={setSelectedClone} />}
        </Stack>
    );
}
