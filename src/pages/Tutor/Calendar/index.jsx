import { Box, Button, FormControl, IconButton, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AssignExercise from './CalendarModal/AssignExercise';
import Evaluate from './CalendarModal/Evaluate';
function Calendar() {
    const [schedule] = useState({
        id: 1,
        scheduleDate: "2024-11-02T14:46:57.843071",
        start: "14:46:00",
        end: "16:46:00",
        attendanceStatus: 2,
        passingStatus: 2,
        createdDate: "2024-11-01T14:46:57.843173",
        updatedDate: null,
        studentProfile: {
            id: 2,
            tutorId: "e4652daf-cbac-4f12-93d9-c48d352bd89e",
            childId: 2,
            name: "Linux",
            studentCode: "L2",
            isMale: true,
            birthDate: "2022-01-12T00:00:00",
            imageUrlPath: "https://sep490g50v1.blob.core.windows.net/logos-public/41b0ad52-5852-43a9-8cf2-408c233968af.jpg",
            initialCondition: "Dinh cua chop",
            address: null,
            phoneNumber: null,
            status: 1,
            initialAssessmentResults: [],
            scheduleTimeSlots: [],
            createdDate: "2024-11-01T14:46:57.759574"
        }
    });

    const [isModalOpen, setModalOpen] = useState(false);
    const [isEvaluateModalOpen, setEvaluateModalOpen] = useState(false);
    return (
        <>
            <Box p="30px" sx={{ width: "100%", height: "calc(100vh - 64px)" }}>
                <Stack direction='row' alignItems="center" justifyContent="space-between">
                    <FormControl sx={{ mb: 1, width: 200 }} size="small">
                        <Select
                        >
                            <MenuItem value={50}>Tất cả học sinh</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <Stack direction='row' alignItems="center" gap={3}>
                        <IconButton>
                            <KeyboardArrowLeftIcon />
                        </IconButton>
                        <Typography>10/10 - 20/10, 2024</Typography>
                        <IconButton>
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    </Stack>
                    <Box sx={{ width: "100px" }}>

                    </Box>
                </Stack>
                <Stack direction="row" sx={{ width: "100%", minHeight: "90%" }}>
                    <Box sx={{
                        width: "14%", minHeight: "80%", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px",
                        border: "2px solid #d8d8d8",
                        pt: 2,
                        px: 1
                    }}>
                        <Typography sx={{ fontSize: "16px", textAlign: "center" }}>Thứ 2</Typography>
                        <Typography sx={{ fontSize: "22px", textAlign: "center" }}>7</Typography>
                        <Box sx={{ minHeight: "150px", width: "100%", bgcolor: "#eee9ff", p: 2, mb: 1, borderRadius: '10px' }}>
                            <Typography sx={{ color: "#7850d4" }}>Mã: MKKS</Typography>
                            <Typography sx={{ color: "#7850d4", fontWeight: "bold" }}>(11:00 - 12:00)</Typography>
                            <Typography sx={{ color: "#7850d4", fontSize: "12px" }}>Đánh giá: Chưa đạt</Typography>
                            <Typography sx={{ color: "#7850d4", fontSize: "12px" }}>TT: Chưa học</Typography>
                            <Button variant='contained' color='primary' sx={{ mt: 2, fontSize: "12px" }} onClick={() => setModalOpen(true)}>
                                Gán bài tập
                            </Button>
                            <Button variant='contained' color='secondary' sx={{ mt: 2, fontSize: "12px" }} onClick={(() => setEvaluateModalOpen(true))}>Đánh giá</Button>
                        </Box>
                        <Box sx={{ minHeight: "150px", width: "100%", bgcolor: "#e9f4ee", p: 2, borderRadius: '10px' }}>
                            <Typography sx={{ color: "#58ad74" }}>Mã: MKKS</Typography>
                            <Typography sx={{ color: "#58ad74", fontWeight: "bold" }}>(11:00 - 12:00)</Typography>
                            <Typography sx={{ color: "#58ad74", fontSize: "12px" }}>Đánh giá: Chưa đạt</Typography>
                            <Typography sx={{ color: "#58ad74", fontSize: "12px" }}>TT: Chưa học</Typography>
                            <Button variant='contained' sx={{ mt: 2, fontSize: "12px" }}>Cập nhật</Button>

                        </Box>
                    </Box>
                    <Box sx={{
                        width: "14%", minHeight: "80%",
                        border: "2px solid #d8d8d8",
                        borderLeft: "none",
                        pt: 2
                    }}>
                        <Typography sx={{ fontSize: "16px", textAlign: "center" }}>Thứ 3</Typography>
                        <Typography sx={{ fontSize: "22px", textAlign: "center" }}>7</Typography>
                    </Box>
                    <Box sx={{
                        width: "14%", minHeight: "80%",
                        border: "2px solid #d8d8d8",
                        borderLeft: "none",
                        pt: 2
                    }}>
                        <Typography sx={{ fontSize: "16px", textAlign: "center" }}>Thứ 3</Typography>
                        <Typography sx={{ fontSize: "22px", textAlign: "center" }}>7</Typography>
                    </Box>
                    <Box sx={{
                        width: "14%", minHeight: "80%",
                        border: "2px solid #d8d8d8",
                        borderLeft: "none",
                        pt: 2
                    }}>
                        <Typography sx={{ fontSize: "16px", textAlign: "center" }}>Thứ 3</Typography>
                        <Typography sx={{ fontSize: "22px", textAlign: "center" }}>7</Typography>
                    </Box>
                    <Box sx={{
                        width: "14%", minHeight: "80%",
                        border: "2px solid #d8d8d8",
                        borderLeft: "none",
                        pt: 2
                    }}>
                        <Typography sx={{ fontSize: "16px", textAlign: "center" }}>Thứ 3</Typography>
                        <Typography sx={{ fontSize: "22px", textAlign: "center" }}>7</Typography>
                    </Box>
                    <Box sx={{
                        width: "14%", minHeight: "80%",
                        border: "2px solid #d8d8d8",
                        borderLeft: "none",
                        pt: 2
                    }}>
                        <Typography sx={{ fontSize: "16px", textAlign: "center" }}>Thứ 3</Typography>
                        <Typography sx={{ fontSize: "22px", textAlign: "center" }}>7</Typography>
                    </Box>
                    <Box sx={{
                        width: "14%", minHeight: "80%",
                        border: "2px solid #d8d8d8",
                        borderLeft: "none",
                        pt: 2,
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px"
                    }}>
                        <Typography sx={{ fontSize: "16px", textAlign: "center" }}>Thứ 3</Typography>
                        <Typography sx={{ fontSize: "22px", textAlign: "center" }}>7</Typography>
                    </Box>
                </Stack>
            </Box>
            {isModalOpen && <AssignExercise isOpen={isModalOpen} setModalOpen={setModalOpen} schedule={schedule} />}
            {isEvaluateModalOpen && <Evaluate isOpen={isEvaluateModalOpen} setModalOpen={setEvaluateModalOpen} schedule={schedule} />}
        </>
    )
}

export default Calendar