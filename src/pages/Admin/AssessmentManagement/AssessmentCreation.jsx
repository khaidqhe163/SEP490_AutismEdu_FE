import { Box, Button, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { enqueueSnackbar } from 'notistack';
import services from '~/plugins/services';
import LoadingComponent from '~/components/LoadingComponent';
function AssessmentCreation() {
    const pointArr = [1, 1.5, 2, 2.5, 3, 3.5, 4]
    const [point, setPoint] = useState(1);
    const [listAss, setListAss] = useState([]);
    const assessmentName = useRef();
    const assessmentDetail = useRef();
    const [selectedPoint, setSelectedPoint] = useState([]);
    const [contentError, setContentErr] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleAddPoint = () => {
        if (assessmentDetail.current.value.trim() === "") {
            setContentErr(true);
            return;
        }
        const newAss = {
            point: point,
            optionText: assessmentDetail.current.value
        }
        const sortedList = [newAss, ...listAss].sort((firstItem, secondItem) => {
            return firstItem.point - secondItem.point
        })
        setListAss(sortedList)
        setSelectedPoint([...selectedPoint, point]);
        for (let i = 0; i < pointArr.length; i++) {
            if (![...selectedPoint, point].includes(pointArr[i])) {
                setPoint(pointArr[i]);
                break;
            }
        }
        setContentErr(false);
        assessmentDetail.current.value = "";
    }

    const handleDelete = (index) => {
        const deletedItem = listAss.find((l, i) => {
            return i === index
        });
        const filterPoint = selectedPoint.filter((s, i) => {
            return s !== deletedItem.point
        })
        const deletedList = listAss.filter((l, i) => {
            return i !== index;
        })
        setListAss(deletedList);
        setSelectedPoint(filterPoint);
        if (selectedPoint.length === 7) {
            setPoint(deletedItem.point);
        }
        if (deletedItem.point < point && selectedPoint.length < 7) {
            setPoint(deletedItem.point)
        }
    }

    const handleSubmit = async () => {
        if (assessmentName.current.value.trim() === "") {
            setTitleError(true);
            enqueueSnackbar("Bạn chưa nhập tên đánh giá", { variant: "error" })
            return;
        }
        try {
            setLoading(true);
            await services.AssessmentManagementAPI.createAssessment({
                question: assessmentName.current.value.trim(),
                assessmentOptions: listAss
            }, (res) => {
                console.log(res);
                setListAss([]);
                setSelectedPoint([]);
                assessmentName.current.value = ""
            }, (err) => {
                console.log(err);
            })
            setTitleError(false);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Paper variant="elevation" sx={{
            p: 3
        }}>
            <Typography variant='h4'>Thêm đánh giá</Typography>
            <Grid container mt={3} rowSpacing={4}>
                <Grid item xs={2}><Typography variant='h6'>Tên đánh giá</Typography></Grid>
                <Grid item xs={10}>
                    <TextField
                        size='small'
                        sx={{ width: "70%" }}
                        inputRef={assessmentName}
                    />
                    {
                        titleError && (
                            <FormHelperText error>
                                Nhập tên đánh giá
                            </FormHelperText>
                        )
                    }
                </Grid>
                <Grid item xs={2}><Typography variant='h6'>Chi tiết đánh giá</Typography></Grid>
                <Grid item xs={10}></Grid>
                {
                    selectedPoint.length < 7 && (
                        <>
                            <Grid item xs={2}>
                                <FormControl sx={{ width: "80%" }}>
                                    <InputLabel id="label-point">Điểm</InputLabel>
                                    <Select
                                        labelId="label-point"
                                        value={point}
                                        label="Point"
                                        onChange={(e) => { setPoint(e.target.value) }}
                                    >
                                        {
                                            pointArr.map((p) => {
                                                return (
                                                    <MenuItem value={p} disabled={selectedPoint.includes(p)} key={p}>{p} điểm</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    size='small'
                                    multiline
                                    rows={4}
                                    sx={{ width: "70%" }}
                                    inputRef={assessmentDetail}
                                    label="Nội dung"
                                    variant='outlined'
                                />
                                {
                                    contentError && (
                                        <FormHelperText error id="accountId-error">
                                            Nhập nội dung
                                        </FormHelperText>
                                    )
                                }
                                <Box mt={3}>
                                    <Button variant='contained' onClick={handleAddPoint}>Thêm</Button>
                                </Box>
                            </Grid>
                        </>
                    )
                }
                {
                    listAss.length !== 0 && listAss.map((l, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Grid item xs={2}>
                                    <Typography>{l.point} điểm</Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Stack direction='row' alignItems="center">
                                        <Typography sx={{ width: "60%" }}>{l.optionText}</Typography>
                                        <IconButton onClick={() => { handleDelete(index) }}><DeleteIcon /></IconButton>
                                        <IconButton><EditIcon /></IconButton>
                                    </Stack>
                                </Grid>
                            </React.Fragment>
                        )
                    })
                }
                <Button variant='contained' sx={{ mt: 5, mb: 3 }} onClick={handleSubmit}>Tạo đánh giá</Button>
            </Grid>
            <LoadingComponent open={loading} />
        </Paper>
    )
}

export default AssessmentCreation
