import { Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
function AssessmentCreation() {
    const [point, setPoint] = useState(1);
    const [listAss, setListAss] = useState([]);
    const assessmentName = useRef();
    const assessmentDetail = useRef();
    const handleAddPoint = () => {
        console.log(assessmentDetail.current.value);
        const newAss = {
            point: point,
            optionText: assessmentDetail.current.value
        }
        setListAss([newAss, ...listAss])
    }

    const handleDelete = () => {
        
    }
    return (
        <Box sx={{
            height: (theme) => `calc(100vh - ${theme.myapp.adminHeaderHeight})`,
            width: "100%",
            position: "relative",
            marginTop: (theme) => theme.myapp.adminHeaderHeight
        }}>
            <Typography variant='h4'>Thêm đánh giá</Typography>
            <Grid container mt={3} rowSpacing={4}>
                <Grid item xs={2}><Typography variant='h6'>Tên đánh giá</Typography></Grid>
                <Grid item xs={10}>
                    <TextField
                        size='small'
                        sx={{ width: "70%" }}
                        ref={assessmentName}
                    />
                </Grid>
                <Grid item xs={2}><Typography variant='h6'>Chi tiết đánh giá</Typography></Grid>
                <Grid item xs={10}></Grid>
                <Grid item xs={2}>
                    <FormControl>
                        <InputLabel id="label-point">Điểm</InputLabel>
                        <Select
                            labelId="label-point"
                            value={point}
                            label="Point"
                            onChange={(e) => { setPoint(e.target.value) }}
                        >
                            <MenuItem value={1}>1 điểm</MenuItem>
                            <MenuItem value={1.5}>1.5 điểm</MenuItem>
                            <MenuItem value={2}>2 điểm</MenuItem>
                            <MenuItem value={2.5}>2.5 điểm</MenuItem>
                            <MenuItem value={3}>3 điểm</MenuItem>
                            <MenuItem value={3.5}>3.5 điểm</MenuItem>
                            <MenuItem value={4}>4 điểm</MenuItem>
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
                    />
                    <Box mt={3}>
                        <Button variant='contained' onClick={handleAddPoint}>Thêm</Button>
                    </Box>
                </Grid>
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
                                        <IconButton onClick={handleDelete}><DeleteIcon /></IconButton>
                                        <IconButton><EditIcon /></IconButton>
                                    </Stack>
                                </Grid>
                            </React.Fragment>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

export default AssessmentCreation
