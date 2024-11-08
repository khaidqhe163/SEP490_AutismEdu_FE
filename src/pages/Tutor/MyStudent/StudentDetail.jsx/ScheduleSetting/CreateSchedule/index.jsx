import { Box, Button, Checkbox, Divider, FormControl, FormHelperText, IconButton, ListItemText, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import services from '~/plugins/services';
import CloseIcon from '@mui/icons-material/Close';
import { enqueueSnackbar } from 'notistack';
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
function CreateSchedule({ setListTimeSlots, id, listTimeSlots }) {
    const [open, setOpen] = useState(false);
    const [dayOfWeek, setDayOfWeek] = useState([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [timeError, setTimeError] = useState("");
    const [disableDate, setDisableDate] = useState([]);
    const [existSchedule, setExistSchedule] = useState([]);
    const [listSchedule, setListSchedule] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        getExistSchedule();
    }, [listTimeSlots])
    useEffect(() => {
        getExistSchedule();
    }, [])
    useEffect(() => {
        if (!open) {
            setStartTime("");
            setEndTime("");
        }
    }, [open])
    useEffect(() => {
        const disableArr = [];
        existSchedule.forEach((l) => {
            if (toMinutes(l.from) < toMinutes(endTime) && toMinutes(startTime) < toMinutes(l.to)
                && !disableArr.includes(l.weekday)) {
                disableArr.push(l.weekday);
            }
        })
        setDisableDate([...disableArr]);
        setDayOfWeek([])
    }, [startTime, endTime])

    const getExistSchedule = async () => {
        try {
            await services.StudentProfileAPI.getTutorSchedule((res) => {
                const arr = [];
                res.result.forEach((a) => {
                    a.scheduleTimeSlots.forEach((s) => {
                        arr.push(s);
                    })
                })
                setExistSchedule(arr);
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
            const updatedSchedule = [...scheduleItem, ...listSchedule];
            const sortedItem = updatedSchedule.sort((a, b) => {
                return a.weekday - b.weekday
            })
            setListSchedule(sortedItem);
            setExistSchedule([...existSchedule, ...sortedItem])
            setDayOfWeek([]);
            setTimeError("");
            setStartTime("");
            setEndTime("")
        }
    }

    const handleDeleteSchedule = (index) => {
        const filter = listSchedule.filter((l, i) => {
            return i !== index
        })
        setListSchedule([...filter]);
    }

    const handleCreateTimeSlot = async () => {
        try {
            await services.TimeSlotAPI.createTimeSlot(id, listSchedule,
                (res) => {
                    const updateTimeSlot = [...listTimeSlots, ...res.result]
                    const sortedItem = updateTimeSlot.sort((a, b) => {
                        return a.weekday - b.weekday
                    })
                    setOpen(false);
                    setListTimeSlots(sortedItem);
                    setListSchedule([]);
                }, (error) => {
                    enqueueSnackbar(error.error[0], { variant: "error" })
                }
            )
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Button variant='contained' onClick={handleOpen}>Thêm khung giờ mới</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4
                }}>
                    <Typography variant='h5'>Thêm khung giờ mới</Typography>
                    <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
                        <Box>
                            <Typography>Giờ bắt đầu</Typography>
                            <TextField type='time' value={startTime}
                                onChange={(e) => setStartTime(e.target.value)} />
                        </Box>
                        <Box>
                            <Typography>Giờ kết thúc</Typography>
                            <TextField type='time'
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <Typography>Thứ trong tuần</Typography>
                            <FormControl sx={{ width: "240px" }}>
                                <Select
                                    multiple
                                    value={dayOfWeek}
                                    onChange={handleChange}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                    disabled={startTime === "" || endTime === ""}
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
                    <Button variant='contained' sx={{ mt: 2 }} disabled={startTime === "" || endTime === ""} onClick={handleAddTime}>Thêm</Button>
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
                    <Button variant='contained' sx={{ mt: 5 }} onClick={handleCreateTimeSlot}>Thêm khung giờ</Button>
                </Box>
            </Modal>
        </>
    )
}

export default CreateSchedule
