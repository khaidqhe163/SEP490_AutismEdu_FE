import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingComponent from '~/components/LoadingComponent';
import services from '~/plugins/services';
import { listStudent } from '~/redux/features/listStudent';
import { tutorInfor } from '~/redux/features/tutorSlice';
import AssignExercise from './CalendarModal/AssignExercise';
import Evaluate from './CalendarModal/Evaluate';
// const [schedule] = useState({
//     id: 1,
//     scheduleDate: "2024-11-02T14:46:57.843071",
//     start: "14:46:00",
//     end: "16:46:00",
//     attendanceStatus: 2,
//     passingStatus: 2,
//     createdDate: "2024-11-01T14:46:57.843173",
//     updatedDate: null,
//     studentProfile: {
//         id: 2,
//         tutorId: "e4652daf-cbac-4f12-93d9-c48d352bd89e",
//         childId: 2,
//         name: "Linux",
//         studentCode: "L2",
//         isMale: true,
//         birthDate: "2022-01-12T00:00:00",
//         imageUrlPath: "https://sep490g50v1.blob.core.windows.net/logos-public/41b0ad52-5852-43a9-8cf2-408c233968af.jpg",
//         initialCondition: "Dinh cua chop",
//         address: null,
//         phoneNumber: null,
//         status: 1,
//         initialAssessmentResults: [],
//         scheduleTimeSlots: [],
//         createdDate: "2024-11-01T14:46:57.759574"
//     }
// });
function Calendar() {
    const { id } = useParams();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEvaluateModalOpen, setEvaluateModalOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState('');
    const [aSchedule, setASchedule] = useState(null);
    const tutorInformation = useSelector(tutorInfor);
    const [weekInYears, setWeekInYears] = useState([]);
    const [listYears, setListYears] = useState([]);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentWeek, setCurrentWeek] = useState(0);
    const [schedules, setSchedule] = useState([]);
    const [filterSchedule, setFilterSchedule] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(0);
    const listStudents = useSelector(listStudent);
    useEffect(() => {
        if (weekInYears.length !== 0) {
            getSchedule();
        }
    }, [weekInYears])

    const getSchedule = async () => {
        try {
            setLoading(true);
            await services.ScheduleAPI.getSchedule((res) => {
                console.log(res.result);
                organizeSchedulesByDay(res.result)
                setSchedule(res.result)
            }, (err) => {
                console.log(err);
            }, {
                studentProfileId: currentStudent,
                startDate: weekInYears[currentWeek].monday,
                endDate: weekInYears[currentWeek].sunday
            })
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            setCurrentStudent(id);
        }
    }, [id])
    useEffect(() => {
        if (tutorInformation) {
            const startYear = new Date(tutorInformation.createdDate).getFullYear();
            const currentYear = new Date().getFullYear();
            const years = [];
            for (let year = startYear; year <= currentYear; year++) {
                years.push(year);
            }
            years.reverse();
            setListYears(years);
        }
    }, [tutorInformation])
    useEffect(() => {
        const year = new Date().getFullYear();
        const weeks = generateMondaysAndSundays(year);
        setWeekInYears(weeks);
        const today = new Date();
        setCurrentWeek(weeks.findIndex(week => today >= week.monday && today <= week.sunday));
        if (id) {
            setCurrentStudent(id);
        }
    }, [])

    useEffect(() => {
        if (weekInYears.length !== 0) {
            getSchedule();
        }
    }, [currentStudent, weekInYears, currentWeek])

    function generateMondaysAndSundays(year) {
        const result = [];
        let date = new Date(year, 0, 1);
        while (date.getDay() !== 0) {
            date.setDate(date.getDate() + 1);
        }
        let monday = new Date(date);
        monday.setDate(monday.getDate() - 6);

        while (monday.getFullYear() === year || (monday.getFullYear() < year && monday.getMonth() === 11)) {
            const sunday = new Date(monday);
            sunday.setDate(monday.getDate() + 6);
            result.push({
                monday: new Date(monday), sunday: new Date(sunday),
                mondayText: `${String(monday.getDate()).padStart(2, '0')}/${String(monday.getMonth() + 1).padStart(2, '0')}`,
                sundayText: `${String(sunday.getDate()).padStart(2, '0')}/${String(sunday.getMonth() + 1).padStart(2, '0')}`
            });
            monday.setDate(monday.getDate() + 7);
        }
        return result;
    }

    function organizeSchedulesByDay(listSchedule) {
        const days = {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
        };

        listSchedule.forEach(schedule => {
            const day = new Date(schedule.scheduleDate).getDay();
            switch (day) {
                case 1:
                    days.monday.push(schedule);
                    break;
                case 2:
                    days.tuesday.push(schedule);
                    break;
                case 3:
                    days.wednesday.push(schedule);
                    break;
                case 4:
                    days.thursday.push(schedule);
                    break;
                case 5:
                    days.friday.push(schedule);
                    break;
                case 6:
                    days.saturday.push(schedule);
                    break;
                case 0:
                    days.sunday.push(schedule);
                    break;
                default:
                    break;
            }
        });
        console.log(days);
        setFilterSchedule(days)
    }

    const formatTime = (timeString) => {
        if (!timeString) {
            return ""
        }
        const [hours, minutes] = timeString.split(':');
        const formattedTime = `${hours}:${minutes}`;
        return formattedTime;
    };

    console.log(filterSchedule);
    const handleAssign = (f, keys) => {
        console.log(f);
        console.log(keys);
        setSelectedKey(keys);
        setASchedule(f);
        setModalOpen(true);
    };

    const handleOpenEvaluate = (f, keys) => {
        console.log(f);
        console.log(keys);
        setSelectedKey(keys);
        setASchedule(f);
        setEvaluateModalOpen(true);
    };

    const passStatus = (value) => {
        return value === 2 ? 'Chưa có dữ liệu' : value === 1 ? "Đạt" : "Chưa đạt"
    };
    const attendanceStatus = (value) => {
        return value === 2 ? 'Chưa có dữ liệu' : value === 1 ? "Có mặt" : "Vắng"
    };

    return (
        <>
            <Box p="30px" sx={{ width: "100%", height: "calc(100vh - 64px)" }}>
                <Stack direction='row' alignItems="center" gap={3}>
                    {
                        !id && (
                            <FormControl sx={{ mb: 1, width: 300 }}>
                                <Select value={currentStudent}
                                    onChange={(e) => setCurrentStudent(e.target.value)}
                                >
                                    <MenuItem value={0}>Tất cả học sinh</MenuItem>
                                    {
                                        listStudents && listStudents.length !== 0 && listStudents.map((s) => {
                                            return (
                                                <MenuItem value={s.id} key={s.id}>{s.name} - {s.studentCode}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        )
                    }

                    <FormControl sx={{ mb: 1, width: 100 }}>
                        <InputLabel id="year">Năm</InputLabel>
                        <Select
                            labelId="year"
                            value={currentYear}
                            label="Năm"
                            onChange={(e) => {
                                setCurrentYear(e.target.value)
                                const weeks = generateMondaysAndSundays(e.target.value);
                                const today = new Date();
                                const index = weeks.findIndex(week => today >= week.monday && today <= week.sunday);
                                setWeekInYears(weeks)
                                setCurrentWeek(index === -1 ? 0 : index);
                            }}
                        >
                            {
                                listYears.map((l) => {
                                    return (
                                        <MenuItem key={l} value={l}>{l}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl sx={{ mb: 1, width: 180 }}>
                        <InputLabel id="week">Tuần</InputLabel>
                        <Select
                            labelId="week"
                            value={currentWeek}
                            label="Tuần"
                            onChange={(e) => setCurrentWeek(e.target.value)}
                        >
                            {
                                weekInYears.map((w, index) => {
                                    return (
                                        <MenuItem key={index} value={index}>{w.mondayText} - {w.sundayText}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction="row" sx={{ width: "100%", minHeight: "90%" }}>
                    {currentWeek >= 0 && weekInYears[currentWeek] && (
                        <>
                            {Array.from({ length: 7 }, (_, i) => {
                                const day = new Date(weekInYears[currentWeek].monday);
                                day.setDate(day.getDate() + i);
                                const today = new Date();
                                const dayName = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'][i];
                                const keys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"][i];
                                return (
                                    <Box key={i} sx={{
                                        width: "14%", minHeight: "80%",
                                        borderTopLeftRadius: i === 0 ? "10px" : "0px",
                                        borderBottomLeftRadius: i === 0 ? "10px" : "0px",
                                        border: "2px solid #d8d8d8",
                                        borderLeft: i !== 0 && "none",
                                        pt: 2,
                                        px: 1,
                                        borderTopRightRadius: i === 6 ? "10px" : "0px",
                                        borderBottomRightRadius: i === 6 ? "10px" : "0px"
                                    }}>
                                        <Typography sx={{ fontSize: "16px", textAlign: "center" }}>{dayName}</Typography>
                                        <Box sx={{
                                            width: "40px", height: "40px", margin: "auto",
                                            borderRadius: "50%",
                                            backgroundColor: today.getDate() === day.getDate() && today.getMonth() === day.getMonth() && "#1a73e8",
                                            color: today.getDate() === day.getDate() && today.getMonth() === day.getMonth() && "white"
                                        }}>
                                            <Typography sx={{ fontSize: "22px", textAlign: "center", lineHeight: "40px" }}>{day.getDate()}</Typography>
                                        </Box>
                                        {
                                            filterSchedule && filterSchedule[keys].length !== 0 && filterSchedule[keys].map((f, index) => {
                                                return (
                                                    <Box key={f.id} sx={{
                                                        minHeight: "150px", width: "100%", bgcolor: "#eee9ff", p: 2,
                                                        mb: 1, borderRadius: '10px',
                                                        mt: 2,
                                                    }}>
                                                        <Typography sx={{ color: "#7850d4" }}>Mã: {f.studentProfile?.studentCode}</Typography>
                                                        <Typography sx={{ color: "#7850d4", fontWeight: "bold" }}>({formatTime(f.start)} - {formatTime(f.end)})</Typography>
                                                        <Typography sx={{ color: "#7850d4", fontSize: "12px" }}>Đánh giá: {passStatus(f.passingStatus)}</Typography>
                                                        <Typography sx={{ color: "green", fontSize: "12px" }} >({attendanceStatus(f.attendanceStatus)})</Typography>
                                                        <Button variant='contained' color='primary' sx={{ mt: 2, fontSize: "12px" }} onClick={() => handleAssign(f, keys)}>Gán bài tập</Button>
                                                        <Button variant='contained' color='secondary' sx={{ mt: 2, fontSize: "12px" }} onClick={() => handleOpenEvaluate(f, keys)}>Đánh giá</Button>
                                                    </Box>
                                                )
                                            })
                                        }
                                    </Box>
                                );
                            })}
                        </>
                    )}

                </Stack>
                {isModalOpen && selectedKey && aSchedule && <AssignExercise isOpen={isModalOpen} setModalOpen={setModalOpen} schedule={aSchedule} filterSchedule={filterSchedule} setFilterSchedule={setFilterSchedule} selectedKey={selectedKey} />}
                {isEvaluateModalOpen && aSchedule && <Evaluate isOpen={isEvaluateModalOpen} setModalOpen={setEvaluateModalOpen} schedule={aSchedule} selectedKey={selectedKey} filterSchedule={filterSchedule} setFilterSchedule={setFilterSchedule} />}
                <LoadingComponent open={loading} />
            </Box>
        </>
    )
}

export default Calendar