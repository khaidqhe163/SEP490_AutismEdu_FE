import { Avatar, Box, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useEffect } from 'react';
import services from '~/plugins/services';

function StudentInformation({ studentProfile }) {
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
    return (
        <Stack direction='row' sx={{
            width: "100%",
            margin: "auto",
            mt: "20px",
            gap: 2,
            px: 5
        }}>
            <Box sx={{
                width: "60%",
                height: "100px",
            }}>
                <Typography variant='h4'>
                    Tình trạng ban đầu
                </Typography>
                <Typography mt={2} sx={{ whiteSpace: "break-spaces" }}>
                    {studentProfile?.initialCondition}
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
                            {studentProfile && studentProfile.initialAssessmentResults.map((assessment) => (
                                <TableRow
                                    key={assessment.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell >{assessment.question}</TableCell>
                                    <TableCell >{assessment.optionText}</TableCell>
                                    <TableCell align='right' sx={{ color: "red" }}>{assessment.point}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell><b>TỔNG THỂ</b></TableCell>
                                <TableCell>Tự kỷ nặng</TableCell>
                                <TableCell align='right'>15</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box sx={{
                background: `linear-gradient(to bottom, #c079ea, #4468f1)`,
                transition: 'height 0.5s ease',
                width: "40%",
                margin: "auto",
                borderRadius: "10px",
                py: "30px"
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
        </Stack>
    )
}

export default StudentInformation
