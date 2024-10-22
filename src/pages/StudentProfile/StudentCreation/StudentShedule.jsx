import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Card, CardContent, Checkbox, Divider, FormControl, FormHelperText, IconButton, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import services from '~/plugins/services';
const days = [
    {
        id: 1,
        day: "Thứ 2"
    },
    {
        id: 2,
        day: "Thứ 3"
    },
    {
        id: 3,
        day: "Thứ 4"
    },
    {
        id: 4,
        day: "Thứ 5"
    },
    {
        id: 5,
        day: "Thứ 6"
    },
    {
        id: 6,
        day: "Thứ 7"
    },
    {
        id: 0,
        day: "Chủ nhật"
    }
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function StudentShedule({ childrenInfor, listSchedule, setListSchedule }) {
    const [dayOfWeek, setDayOfWeek] = useState([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [timeError, setTimeError] = useState("");
    const [disableDate, setDisableDate] = useState([]);
    const [existSchedule, setExistSchedule] = useState("");

    useEffect(() => {
        getExistSchedule();
    }, [])
    useEffect(() => {
        const disableArr = [];
        listSchedule.forEach((l) => {
            if (toMinutes(l.from) < toMinutes(endTime) && toMinutes(startTime) < toMinutes(l.to)
                && !disableArr.includes(l.weekday)) {
                disableArr.push(l.weekday);
            }
        })
        setDisableDate([...disableArr])
    }, [startTime, endTime])

    const getExistSchedule = async () => {
        try {
            await services.StudentProfileAPI.getTutorSchedule((res) => {
                console.log(res);
                setExistSchedule(res.result);
            }, (error) => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }
    const toMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setDayOfWeek(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleAddTime = () => {
        if (startTime === "" || endTime === "" || dayOfWeek.length === 0) {
            setTimeError("Nhập đầy đủ thông tin!");
            return;
        } else {
            const scheduleItem = dayOfWeek.map((d) => {
                return {
                    weekday: days.find((day) => day.day === d).id,
                    from: startTime,
                    to: endTime
                }
            })
            const sortedItem = scheduleItem.sort((a, b) => {
                return a.weekday - b.weekday
            })
            setListSchedule([...sortedItem, ...listSchedule])
            setTimeError("");
        }
    }

    const handleDeleteSchedule = (index) => {
        const filter = listSchedule.filter((l, i) => {
            return i !== index
        })
        setListSchedule([...filter]);
    }
    return (
        <Card sx={{ px: 2, mt: 3 }}>
            <CardContent sx={{ px: 0 }}>
                <Typography variant='h5'>Lịch học</Typography>
                <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
                    <Box>
                        <Typography>Giờ bắt đầu</Typography>
                        <TextField type='time' disabled={childrenInfor.length === 0} value={startTime}
                            onChange={(e) => setStartTime(e.target.value)} />
                    </Box>
                    <Box>
                        <Typography>Giờ kết thúc</Typography>
                        <TextField type='time' disabled={childrenInfor.length === 0}
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <Typography>Thứ trong tuần</Typography>
                        <FormControl sx={{ width: "240px" }}>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={dayOfWeek}
                                onChange={handleChange}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                disabled={childrenInfor.length === 0 || startTime === "" || endTime === ""}
                            >
                                {days.map((day) => (
                                    <MenuItem key={day.id} value={day.day} disabled={disableDate.includes(day.id)}>
                                        <Checkbox checked={dayOfWeek.includes(day.day)} />
                                        <ListItemText primary={day.day} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                {
                    timeError !== "" && (
                        <FormHelperText error>
                            {timeError}
                        </FormHelperText>
                    )
                }
                <Button variant='contained' sx={{ mt: 2 }} disabled={childrenInfor.length === 0} onClick={handleAddTime}>Thêm</Button>
                <Box sx={{ display: "flex", mt: 3, flexWrap: "wrap", gap: 3 }}>
                    {
                        listSchedule.length !== 0 && listSchedule.map((schedule, index) => {
                            return (
                                <Box sx={{
                                    display: "flex",
                                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                    p: 2,
                                    gap: 2, alignItems: "center"
                                }} key={index}>
                                    <Typography sx={{ fontSize: "12px" }}>{days.find((day) => day.id === schedule.weekday).day}</Typography>
                                    <Divider orientation='vertical' sx={{ bgcolor: "black" }} />
                                    <Typography sx={{ fontSize: "12px" }}>{schedule.from} - {schedule.to}</Typography>
                                    <IconButton onClick={() => handleDeleteSchedule(index)}>
                                        <CloseIcon sx={{ fontSize: "14px" }} />
                                    </IconButton>
                                </Box>
                            )
                        })
                    }
                </Box>
            </CardContent>
        </Card>
    )
}

export default StudentShedule
