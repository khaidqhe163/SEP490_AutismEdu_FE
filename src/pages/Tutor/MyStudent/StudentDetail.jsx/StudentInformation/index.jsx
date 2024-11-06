import { Avatar, Box, Chip, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import CompleteTutoring from '../CompleteTutoring';
import { useEffect, useState } from 'react';

function StudentInformation({ studentProfile, setStudentProfile }) {
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

    const formatAddress = (address) => {
        if (!address) {
            return "";
        }
        const addressParts = address.split('|');
        const formattedAddress = `${addressParts[3]} - ${addressParts[2]} - ${addressParts[1]} - ${addressParts[0]}`;
        return formattedAddress;
    }
    console.log(studentProfile);
    return (
        <Box sx={{ px: 5 }}>
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
            <Stack direction='row' sx={{
                width: "100%",
                margin: "auto",
                mt: "20px",
                gap: 2,
            }}>
                <Box sx={{
                    width: "60%",
                    height: "100px",
                }}>
                    <Typography variant='h4'>
                        {status === 1 ? "Tình trạng ban đầu" : "Kết quả cuối cùng"}
                    </Typography>
                    <Typography mt={2} sx={{ whiteSpace: "break-spaces" }}>
                        {status === 1 ? studentProfile?.initialAssessmentResults.condition : studentProfile?.finalAssessmentResults.condition}
                    </Typography>
                    <Typography variant='h4' mt={2}>
                        Bảng đánh giá
                    </Typography>
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell >Vấn đề</TableCell>
                                    <TableCell >Đánh giá</TableCell>
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
                                        <TableCell
                                            align="right"
                                            sx={{
                                                color:
                                                    assessment.point === 1 || assessment.point === 1.5 ? "red" :
                                                        assessment.point === 2 || assessment.point === 2.5 ? "orange" :
                                                            assessment.point === 3 || assessment.point === 3.5 ? "green" :
                                                                assessment.point === 4 ? "blue" : "inherit"
                                            }}
                                        >
                                            {assessment.point}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box sx={{ width: "40%" }}>
                    <Box sx={{
                        background: `linear-gradient(to bottom, #c079ea, #4468f1)`,
                        transition: 'height 0.5s ease',
                        margin: "auto",
                        borderRadius: "10px",
                        py: "30px",
                        mb: "20px"
                    }}>
                        <Avatar alt={studentProfile?.name} src={studentProfile?.imageUrlPath} sx={{
                            height: "150px",
                            width: "150px",
                            fontSize: "40px",
                            bgcolor: "#c2185b",
                            margin: "auto"
                        }} />
                        <Grid container sx={{ margin: "auto", color: "white", px: "40px", fontSize: "17px", mt: 2 }}
                            rowSpacing={1}>
                            <Grid item xs={4}>Họ và tên:</Grid>
                            <Grid item xs={8}>{studentProfile?.name}</Grid>
                            <Grid item xs={4}>Giới tính:</Grid>
                            <Grid item xs={8}>{studentProfile?.isMale === true ? "Nam" : "Nữ"}</Grid>
                            <Grid item xs={4}>Ngày sinh:</Grid>
                            <Grid item xs={8}>{formatDate(studentProfile?.birthDate)}</Grid>
                            <Grid item xs={4}>Số điện thoại:</Grid>
                            <Grid item xs={8}>{studentProfile?.phoneNumber}</Grid>
                            <Grid item xs={4}>Địa chỉ:</Grid>
                            <Grid item xs={8}>{formatAddress(studentProfile?.address)}</Grid>
                        </Grid>
                    </Box>
                    {
                        studentProfile?.status === 1 && (
                            <CompleteTutoring studentProfile={studentProfile} setStudentProfile={setStudentProfile}/>
                        )
                    }
                </Box>
            </Stack>
        </Box>
    )
}

export default StudentInformation
