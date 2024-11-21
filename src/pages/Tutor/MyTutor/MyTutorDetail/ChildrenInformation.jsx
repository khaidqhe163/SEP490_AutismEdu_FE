import { Avatar, Box, Chip, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

function ChildInformation({ studentProfile }) {
    const [status, setStatus] = useState(1);
    const [assessments, setAssessments] = useState([])
    useEffect(() => {
        if (studentProfile) {
            setAssessments(studentProfile?.initialAssessmentResults.assessmentResults)
        }
    }, [studentProfile])

    useEffect(() => {
        if (status === 2) {
            setAssessments(studentProfile?.finalAssessmentResults.assessmentResults)
        } else {
            setAssessments(studentProfile?.initialAssessmentResults.assessmentResults)
        }
    }, [status])
    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }
    console.log(studentProfile);
    return (
        <Stack sx={{ width: "100%" }} direction='row' justifyContent="center">
            <Stack direction='row' sx={{
                mt: "20px",
                gap: 5,
                width: "80%",
                justifyContent: "space-between"
            }}>
                <Box sx={{
                    width: "70%"
                }}>
                    {
                        studentProfile?.status === 0 && (
                            <Box my={3}>
                                <Chip label="Tình trạng ban đầu" variant={status === 1 ? "filled" : "outlined"}
                                    onClick={() => setStatus(1)}
                                    sx={{ cursor: "pointer", mr: 2 }}
                                />
                                <Chip label="Kết quả cuối cùng" variant={status === 2 ? "filled" : "outlined"}
                                    onClick={() => setStatus(2)}
                                    sx={{ cursor: "pointer", mr: 2 }} />
                            </Box>
                        )
                    }
                    <Typography variant='h3'>
                        {status === 1 ? "Tình trạng ban đầu" : "Kết quả cuối cùng"}
                    </Typography>
                    <Typography mt={2} sx={{ whiteSpace: "break-spaces" }}>
                        {status === 1 ? studentProfile?.initialAssessmentResults.condition : studentProfile?.finalAssessmentResults.condition}
                    </Typography>
                    <Typography variant='h3' mt={5}>
                        Bảng đánh giá
                    </Typography>
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Vấn đề</TableCell>
                                    <TableCell>Đánh giá</TableCell>
                                    <TableCell align='right'>Điểm</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {assessments.length !== 0 && assessments.map((assessment) => (
                                    <TableRow
                                        key={assessment.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell >{assessment.question}</TableCell>
                                        <TableCell >{assessment.optionText}</TableCell>
                                        <TableCell align='right' sx={{ color: "red" }}>{assessment.point}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box sx={{
                    background: `linear-gradient(to bottom, #c079ea, #4468f1)`,
                    transition: 'height 0.5s ease',
                    borderRadius: "10px",
                    py: "30px",
                    width: "30%",
                    maxHeight: "400px"
                }}>
                    <Avatar alt='Khai Dao' src={studentProfile?.imageUrlPath} sx={{
                        height: "150px",
                        width: "150px",
                        fontSize: "40px",
                        bgcolor: "#c2185b",
                        margin: "auto"
                    }} />
                    <Grid container sx={{ margin: "auto", color: "white", px: "40px", fontSize: "17px", mt: 2 }}
                        rowSpacing={1}
                        columnSpacing={2}
                    >
                        <Grid item xs={5} textAlign="right">Họ và tên:</Grid>
                        <Grid item xs={7}>{studentProfile?.name}</Grid>
                        <Grid item xs={5} textAlign="right">Giới tính:</Grid>
                        <Grid item xs={7}>{studentProfile?.isMale === true ? "Nam" : "Nữ"}</Grid>
                        <Grid item xs={5} textAlign="right">Ngày sinh:</Grid>
                        <Grid item xs={7}>{formatDate(studentProfile?.birthDate)}</Grid>
                    </Grid>
                </Box>
            </Stack>
        </Stack>
    )
}

export default ChildInformation
