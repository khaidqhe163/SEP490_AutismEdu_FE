import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

function AssessmentCreation() {
    const [point, setPoint] = useState(1);
    const [listAss, setListAss] = useState([]);
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
                    />
                    <Box mt={3}>
                        <Button variant='contained'>Thêm</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AssessmentCreation
