import React, { useState } from 'react';
import { Box, Button, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

function AvailableTimeManagement() {
    //from 1 to 7, representing Monday to Sunday
    const [schedule, setSchedule] = useState(1);

    const [availability, setAvailability] = useState([
        { date: 1, times: ['08:30 - 09:00', '13:00 - 13:30', '15:00 - 15:30', '16:00 - 16:30'] },
        { date: 2, times: ['08:00 - 08:30', '12:00 - 12:30'] },
        { date: 3, times: ['9:00 - 9:30', '14:00 - 14:30'] },
        { date: 4, times: [] },
        { date: 5, times: ['10:00 - 10:30'] },
        { date: 6, times: [] },
        { date: 7, times: [] },
    ]);

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSave = () => {
        if (!startTime || !endTime) return;

        const newTime = `${startTime} - ${endTime}`;

        const updatedAvailability = availability.map((day) => {
            if (day.date === schedule) {
                if (!day.times.includes(newTime)) {
                    return { ...day, times: [...day.times, newTime] };
                } else {
                    alert('Khoảng thời gian đã tồn tại!');
                }
            }
            return day;
        });

        setAvailability(updatedAvailability);
        setStartTime('');
        setEndTime('');
    };


    const handleDeleteTime = (timeToDelete) => {
        const updatedAvailability = availability.map((day) => {
            if (day.date === schedule) {
                return { ...day, times: day.times.filter(time => time !== timeToDelete) };
            }
            return day;
        });
        setAvailability(updatedAvailability);
    };

    const handleDateChange = (date) => {
        setSchedule(date);
    };

    const renderWeekButtons = () => {
        const weekDays = [
            { date: 1, label: 'Thứ 2' },
            { date: 2, label: 'Thứ 3' },
            { date: 3, label: 'Thứ 4' },
            { date: 4, label: 'Thứ 5' },
            { date: 5, label: 'Thứ 6' },
            { date: 6, label: 'Thứ 7' },
            { date: 7, label: 'Chủ Nhật' }
        ];

        return weekDays.map((day) => (
            <Button
                key={day.date}
                variant={schedule === day.date ? 'contained' : 'outlined'}
                color={schedule === day.date ? 'primary' : 'inherit'}
                onClick={() => handleDateChange(day.date)}
                sx={{ mx: 1, my: 1 }}
            >
                {day.label}
            </Button>
        ));
    };

    const renderTimeButtons = () => {
        const selectedDay = availability.find(day => day.date === schedule) || { times: [] };

        const getStartTime = (time) => {
            const [startTime] = time.split(' - '); 
            return startTime;
        };

        const sortedTimes = [...selectedDay.times].sort((a, b) => {
            const startA = getStartTime(a);
            const startB = getStartTime(b);

            const dateA = new Date(`1970-01-01T${startA}:00`);
            const dateB = new Date(`1970-01-01T${startB}:00`);

            return dateA - dateB;
        });

        return sortedTimes.map((time, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ mb: 1 }}>
                <Box
                    sx={{
                        border: '1px solid lightgray',
                        borderRadius: '4px',
                        p: 1,
                        textAlign: 'center',
                        backgroundColor: '#f5f5f5',
                    }}
                    display={"flex"}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={1}
                >
                    <Typography variant="body1">{time}</Typography>
                    <IconButton onClick={() => handleDeleteTime(time)}>
                        <CancelIcon color='error' />
                    </IconButton>
                </Box>
            </Grid>
        ));
    };


    return (
        <Stack direction='column' sx={{
            width: "90%",
            margin: "auto",
            mt: "20px",
            gap: 2
        }}>
            <Typography variant='h4' my={2}>Thiết lập thời gian rảnh</Typography>
            <Box>
                <Stack direction={'column'} gap={1}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {renderWeekButtons()}
                    </Box>
                    <Stack direction={'row'} gap={2} mt={2}>
                        <Box>
                            <Typography variant='body1' mb={2}>Thời gian bắt đầu</Typography>
                            <TextField
                                id="outlined-basic1"
                                variant="outlined"
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <Typography variant='body1' mb={2}>Thời gian kết thúc</Typography>
                            <TextField
                                id="outlined-basic2"
                                variant="outlined"
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </Box>
                    </Stack>
                    <Box my={1}>
                        <Button color='primary' variant='contained' onClick={handleSave}>
                            Lưu
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                        <Typography variant='h6'>{`Thứ ${schedule}`}</Typography>
                        <Grid container spacing={1} sx={{ mt: 1 }}>
                            {renderTimeButtons()}
                        </Grid>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    );
}

export default AvailableTimeManagement;
