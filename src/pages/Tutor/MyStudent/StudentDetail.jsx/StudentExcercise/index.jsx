import { Box, IconButton, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import services from '~/plugins/services';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
function StudentExcercise({ studentProfile }) {
    const [schedules, setSchedules] = useState([]);
    useEffect(() => {
        handleGetSchedules();
    }, [])
    const handleGetSchedules = async () => {
        try {
            await services.ScheduleAPI.getAssignSchedule((res) => {
                setSchedules(res.result.schedules);
            }, (err) => {
                console.log(err);
            }, {
                studentProfileId: studentProfile.id
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getStatus = (index) => {
        const now = Date.now();
        const scheduleDate = new Date(schedules[index].scheduleDate);
        if (scheduleDate > now) {
            return 3;
        } else {
            return schedules[index].passingStatus;
        }
    }

    console.log(schedules);
    return (
        <Box sx={{ px: 5, py: 3 }}>
            <Typography variant='h4'>Lịch sử học tập của trẻ</Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>STT</TableCell>
                            <TableCell sx={{ maxWidth: "200px", fontWeight: "bold" }}>Tên bài tập</TableCell>
                            <TableCell sx={{ maxWidth: "200px", fontWeight: "bold" }}>Loại bài tập</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Ngày học</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Trạng thái</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }} align='center'>Xem nhận xét</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            schedules.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: "200px" }}>{row.exercise.exerciseName}</TableCell>
                                    <TableCell sx={{ maxWidth: "200px" }}>{row.exerciseType.exerciseTypeName}</TableCell>
                                    <TableCell>{format(new Date(row.scheduleDate), "dd-MM-yyyy")}</TableCell>
                                    <TableCell>
                                        <span
                                            style={{
                                                backgroundColor: getStatus(index) === 3 ? '#d1ecf1' : getStatus(index) === 2 ? '#fff3cd' : getStatus(index) === 1 ? '#d4edda' : '#f8d7da',
                                                color: getStatus(index) === 3 ? 'blue' : getStatus(index) === 2 ? "orange" : getStatus(index) === 1 ? "green" : "red",
                                                padding: '4px 8px',
                                                borderRadius: '8px',
                                                fontWeight: 'bold',
                                                display: 'inline-block',
                                            }}
                                        >
                                            {getStatus(index) === 3 ? "Chưa học" : getStatus(index) === 2 ? "Không có đánh giá" : getStatus(index) === 1 ? "Đạt" : "Không đạt"}
                                        </span>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <IconButton>
                                            <RemoveRedEyeIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default StudentExcercise
